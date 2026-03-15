import type { Properties } from 'csstype'

export type CSSValue = string | number
export type CustomProperty = `--${string}`

export type CSSProperties = Properties<CSSValue> & {
  [k: CustomProperty]: CSSValue
}

export type HasVariants<S> = S extends { variants?: infer V }
  ? V extends object
    ? [keyof V] extends [never]
      ? false
      : true
    : false
  : false

export type ThemeConfig = {
  props?: Partial<Record<keyof CSSProperties, Record<string, string>>>
}

export type ThemePropKeys<C extends ThemeConfig, K extends keyof CSSProperties> = C extends {
  props?: infer P
}
  ? P extends Record<K, infer V>
    ? V extends Record<string, string>
      ? keyof V & string
      : never
    : never
  : never

export type SelectorKey = `&${string}`

export type PseudoElementKey =
  | '::before'
  | '::after'
  | '::placeholder'
  | '::first-letter'
  | '::first-line'
  | '::selection'
  | '::marker'
  | '::file-selector-button'
  | '::backdrop'

export type UIStateKey =
  | ':hover'
  | ':focus'
  | ':focus-visible'
  | ':focus-within'
  | ':active'
  | ':disabled'
  | ':enabled'
  | ':checked'
  | ':indeterminate'
  | ':read-only'
  | ':read-write'
  | ':required'
  | ':optional'
  | ':invalid'
  | ':valid'
  | ':placeholder-shown'
  | ':autofill'
  | ':visited'
  | ':target'
  | ':empty'
  | ':default'

export type StyleBlockWithTheme<C extends ThemeConfig> = {
  [K in keyof CSSProperties]?: CSSProperties[K] | ThemePropKeys<C, K>
} & {
  [K in PseudoElementKey]?: StyleBlockWithTheme<C>
} & {
  [K in UIStateKey]?: StyleBlockWithTheme<C>
} & {
  [K in SelectorKey]?: StyleBlockWithTheme<C>
}

export type StyleDefinitionWithTheme<C extends ThemeConfig> = StyleBlockWithTheme<C>

export type StyleString = string

export type StyleReturnType = StyleString

export type StyleFunction<C extends ThemeConfig> = <S extends StyleDefinitionWithTheme<C>>(
  definition: S,
) => StyleReturnType

export type CreateTheme = <C extends ThemeConfig>(config: C) => StyleFunction<C>
