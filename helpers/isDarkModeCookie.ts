export default function () {
  const cookies = document.cookie.split(';')
  const cookieMap: {
    darkMode?: string
  } = {}
  cookies.forEach((element) => {
    const [name, val] = element.split('=')
    const trimmedName = name.trim()
    if (trimmedName === 'darkMode') {
      cookieMap[trimmedName] = val
    }
  })
  if (cookieMap.darkMode) {
    return cookieMap.darkMode === 'true'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}
