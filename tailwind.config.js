module.exports = {
  mode: 'jit',
  darkMode: 'class',
  variants: {
    extend: {
      boxShadow: ['dark'],
    },
  },
  theme: {
    extend: {
      keyframes: {
        'linear-bounce': {
          '0%, 100%': {
            transform: 'translateX(25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateX(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
      },
    },
    maxHeight: {
      'screen--nav': 'calc(100vh - 7rem)',
    },
    container: {
      center: true,
    },
    animation: {
      'linear-bounce': 'linear-bounce 1s linear infinite',
      wiggle: 'wiggle 1s linear infinite',
      bounce: 'bounce 1s linear infinite',
    },
    zIndex: {
      1: 1,
      2: 2,
      10: 10,
      11: 11,
    },
    minHeight: {
      80: '20rem',
    },
    translate: {
      '-screen': '-100vh',
    },
    boxShadow: {
      DEFAULT:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      dark: '0 5px 10px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
      none: 'none',
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
