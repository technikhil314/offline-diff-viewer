module.exports = {
  mode: 'jit',
  theme: {
    maxHeight: {
      'screen--nav': 'calc(100vh - 7rem)',
    },
    container: {
      center: true,
    },
    zIndex: {
      '1': 1,
      '2': 2
    },
    minHeight: {
      '80': '20rem'
    },
    translate: {
      '-screen': '-100vh',
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
