export type RawPropertyValue = string | number

export type RawNestedBlock = {
  selector: string
  block: RawStyleBlock
}

export type RawVariants = {
  [axis: string]: {
    [value: string]: RawStyleBlock
  }
}

export type RawStyleBlock = {
  props: Record<string, RawPropertyValue>
  blocks: RawNestedBlock[]
  variants?: RawVariants
}

export type RawTree = RawStyleBlock
