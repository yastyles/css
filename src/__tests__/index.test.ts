import { createTheme } from '../runtime'

const css = createTheme({})

const button = css({
  width: 10,
  height: 10,

  '::before': {
    content: '',
    inset: 0,
  },
})

console.log(button)
