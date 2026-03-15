import { createTheme } from '../runtime'

const css = createTheme({
  props: {
    color: {
      primary: '#000',
    },
    font: {
      headingL: '24px Arial, sans-serif',
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

const text = css({
  color: 'primary',

  variants: {
    variant: {
      heading: {
        font: 'headingL',
      },
    },
  },
})

console.log(button)
console.log(text({ variant: 'heading' }))
