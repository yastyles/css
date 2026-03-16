export const PSEUDO_ELEMENT_KEYS = new Set<string>([
  '::before',
  '::after',
  '::placeholder',
  '::first-letter',
  '::first-line',
  '::selection',
  '::marker',
  '::file-selector-button',
  '::backdrop',
])

export const UI_STATE_KEYS = new Set<string>([
  ':hover',
  ':focus',
  ':focus-visible',
  ':focus-within',
  ':active',
  ':disabled',
  ':enabled',
  ':checked',
  ':indeterminate',
  ':read-only',
  ':read-write',
  ':required',
  ':optional',
  ':invalid',
  ':valid',
  ':placeholder-shown',
  ':autofill',
  ':visited',
  ':target',
  ':empty',
  ':default',
])

export const VARIANTS_KEY = 'variants'

function isSelectorKey(key: string): boolean {
  if (PSEUDO_ELEMENT_KEYS.has(key) || UI_STATE_KEYS.has(key)) {
    return true
  }

  if (key.startsWith('&')) {
    return true
  }

  return false
}

export function isNestedBlockKey(key: string): boolean {
  return key !== VARIANTS_KEY && isSelectorKey(key)
}

export function isVariantsKey(key: string): boolean {
  return key === VARIANTS_KEY
}
