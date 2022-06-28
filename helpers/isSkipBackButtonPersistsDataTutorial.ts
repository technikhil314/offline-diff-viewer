export default function () {
  const cookies = document.cookie.split(';')
  const cookieMap: {
    isSkipBackButtonPersistsDataTutorial?: string
  } = {
    isSkipBackButtonPersistsDataTutorial: 'false',
  }
  cookies.forEach((element) => {
    const [name, val] = element.split('=')
    const trimmedName = name.trim()
    if (trimmedName === 'isSkipBackButtonPersistsDataTutorial') {
      cookieMap[trimmedName] = val
    }
  })
  return cookieMap.isSkipBackButtonPersistsDataTutorial === 'true'
}
