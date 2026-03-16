import { isNestedBlockKey, isVariantsKey } from './constants'
import type { RawStyleBlock, RawTree, RawVariants } from './types'

export function parse(input: unknown): RawTree {
  return parseDeclarations(input)
}

function parseDeclarations(input: unknown): RawStyleBlock {
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

function parseVariants(input: unknown): RawVariants {
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
