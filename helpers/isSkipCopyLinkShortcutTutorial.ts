export default function () {
  const cookies = document.cookie.split(';')
  const cookieMap: {
    isSkipCopyLinkShortcutTutorial?: string
  } = {
    isSkipCopyLinkShortcutTutorial: 'false',
  }
  cookies.forEach((element) => {
    const [name, val] = element.split('=')
    const trimmedName = name.trim()
    if (trimmedName === 'isSkipCopyLinkShortcutTutorial') {
      cookieMap[trimmedName] = val
    }
  })
  return cookieMap.isSkipCopyLinkShortcutTutorial === 'true'
}
