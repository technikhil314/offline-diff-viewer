export default function () {
  const cookies = document.cookie.split(';')
  const cookieMap: {
    isSkipTutorial?: string
  } = {
    isSkipTutorial: 'false',
  }
  cookies.forEach((element) => {
    const [name, val] = element.split('=')
    const trimmedName = name.trim()
    if (trimmedName === 'isSkipTutorial') {
      cookieMap[trimmedName] = val
    }
  })
  return cookieMap.isSkipTutorial === 'true'
}
