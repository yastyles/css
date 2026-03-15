import { createTheme } from '../runtime'

const css = createTheme({
  props: {
    color: {
      primary: '#000',
    },
  },
})

const button = css({
  width: 10,
  height: 10,

  color: 'primary',

  '::before': {
    content: '',
    inset: 0,
  },
})

console.log(button)
