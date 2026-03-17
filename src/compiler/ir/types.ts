export type PropertyValue = { type: 'literal'; value: string | number }

export type Conditions = Record<string, string>

export type Rule = {
  selectors: string[]
  properties: Record<string, PropertyValue>
  conditions?: Conditions
}

export type IR = {
  rules: Rule[]
}
