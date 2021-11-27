export default function () {
  const cookies = document.cookie.split(';')
  const cookieMap: {
    darkMode: string
  } = {}
  cookies.forEach((element) => {
    const [name, val] = element.split('=')
    if (name === 'darkMode') {
      cookieMap[name] = val
    }
  })
  return (
    window.matchMedia('(prefers-color-scheme: dark)').matches &&
    (cookieMap.darkMode === undefined || cookieMap.darkMode === 'true')
  )
}
