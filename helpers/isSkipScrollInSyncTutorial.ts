export default function () {
  const cookies = document.cookie.split(';')
  const cookieMap: {
    isSkipScrollInSyncTutorial?: string
  } = {
    isSkipScrollInSyncTutorial: 'false',
  }
  cookies.forEach((element) => {
    const [name, val] = element.split('=')
    const trimmedName = name.trim()
    if (trimmedName === 'isSkipScrollInSyncTutorial') {
      cookieMap[trimmedName] = val
    }
  })
  return cookieMap.isSkipScrollInSyncTutorial === 'true'
}
