export default function () {
  const cookies = document.cookie.split(';')
  const cookieMap: {
    isSkipSubmitKbdShortcutTutorial?: string
  } = {
    isSkipSubmitKbdShortcutTutorial: 'false',
  }
  cookies.forEach((element) => {
    const [name, val] = element.split('=')
    const trimmedName = name.trim()
    if (trimmedName === 'isSkipSubmitKbdShortcutTutorial') {
      cookieMap[trimmedName] = val
    }
  })
  return cookieMap.isSkipSubmitKbdShortcutTutorial === 'true'
}
