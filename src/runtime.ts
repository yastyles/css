import type { CreateTheme } from './interfaces'

// @ts-expect-error
export const createTheme: CreateTheme = () => {
  return () => ''
}
