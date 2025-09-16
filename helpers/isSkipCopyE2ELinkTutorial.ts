export default function () {
  const cookies = document.cookie.split(';')
  const cookieMap: {
    isSkipCopyE2ELinkTutorial?: string
  } = {
    isSkipCopyE2ELinkTutorial: 'false',
  }
  cookies.forEach((element) => {
    const [name, val] = element.split('=')
    const trimmedName = name.trim()
    if (trimmedName === 'isSkipCopyE2ELinkTutorial') {
      cookieMap[trimmedName] = val
    }
  })
  return cookieMap.isSkipCopyE2ELinkTutorial === 'true'
}
