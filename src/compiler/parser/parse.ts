import type { Conditions, PropertyValue, Rule } from '../ir/types'
import { isNestedBlockKey, isVariantsKey } from './constants'
import type { RawPropertyValue, RawStyleBlock, RawVariants } from './types'

export function parse(input: unknown) {
  const block = parseDeclarations(input)
  const ir = createIR(block)

  return ir
}

function parseDeclarations(input: unknown) {
  if (!isPlainObject(input)) {
    throw new Error('Style block must be a plain object')
  }

  const props: Record<string, string | number> = {}
  const blocks: { selector: string; block: RawStyleBlock }[] = []

  let variants: RawVariants | undefined

  for (const key of Object.keys(input)) {
    const value = input[key]

    if (isVariantsKey(key)) {
      if (variants !== undefined) {
        throw new Error('Duplicate "variants" key')
      }

      variants = parseVariants(value)
      continue
    }

    if (isNestedBlockKey(key)) {
      blocks.push({ selector: key, block: parseDeclarations(value) })
      continue
    }

    if (typeof value === 'string' || typeof value === 'number') {
      props[key] = value
      continue
    }

    throw new Error(
      `Invalid value for property "${key}": expected string or number, got ${typeof value}`,
    )
  }

  return { props, blocks, variants }
}

function parseVariants(input: unknown) {
  if (!isPlainObject(input)) {
    throw new Error('"variants" must be a plain object')
  }

  const result: RawVariants = {}

  for (const variant of Object.keys(input)) {
    const variantValue = input[variant]

    if (!isPlainObject(variantValue)) {
      throw new Error(`variants["${variant}"] must be a plain object`)
    }

    result[variant] = {}

    for (const valueKey of Object.keys(variantValue)) {
      result[variant][valueKey] = parseDeclarations(variantValue[valueKey])
    }
  }

  return result
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function toPropertyValue(value: RawPropertyValue) {
  return { type: 'literal', value } satisfies PropertyValue
}

function blockToRules(
  block: RawStyleBlock,
  selectorPrefix: string[],
  baseConditions: Conditions | undefined,
): Rule[] {
  const rules: Rule[] = []

  if (Object.keys(block.props).length > 0) {
    const properties: Record<string, PropertyValue> = {}

    for (const [key, raw] of Object.entries(block.props)) {
      properties[key] = toPropertyValue(raw)
    }

    rules.push({
      selectors: [...selectorPrefix],
      properties,
      conditions:
        baseConditions && Object.keys(baseConditions).length > 0
          ? { ...baseConditions }
          : undefined,
    })
  }

  for (const { selector, block: nested } of block.blocks) {
    rules.push(...blockToRules(nested, [...selectorPrefix, selector], baseConditions))
  }

  return rules
}

function createIR(block: RawStyleBlock, baseConditions?: Conditions) {
  const rules = blockToRules(block, [], baseConditions)

  if (block.variants === undefined || Object.keys(block.variants).length === 0) {
    return { rules }
  }

  for (const [axis, values] of Object.entries(block.variants)) {
    const valuesMap = values as Record<string, RawStyleBlock>

    for (const [valueKey, valueBlock] of Object.entries(valuesMap)) {
      const subConditions: Conditions = {
        ...(baseConditions ?? {}),
        [axis]: valueKey,
      }
      const subIR = createIR(valueBlock, subConditions)
      rules.push(...subIR.rules)
    }
  }

  return { rules }
}
