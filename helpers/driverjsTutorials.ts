import { Cookies, Tutorial, TutorialMetadata, TutorialsMetadata } from './types'
// Need this to keep track of latest value of cookie otherwise users sees same tutorial untill they refresh the page after the cookie is dropped
const _cookies: Partial<Cookies> = {}
const labelsTutorial: Tutorial[] = [
  {
    element: '#lhsLabel',
    popover: {
      title: 'New feature',
      description: 'Now you can add custom labels to text blocks',
    },
  },
  {
    element: '#rhsLabel',
    popover: {
      title: 'New feature',
      description: 'Now you can add custom labels to text blocks',
    },
  },
]

const submitShortcutTutorial: Tutorial[] = [
  {
    element: '#submitButton',
    popover: {
      title: 'New keyboard shortcut',
      description:
        'Now you can press <kbd>Cmd</kbd> + <kbd>Enter</kbd>/<kbd>Ctrl</kbd> + <kbd>Enter</kbd> to go to compare screen.',
    },
  },
]

const actionBarTutorial: Tutorial[] = [
  {
    element: '#toggleScrollInSyncSection',
    popover: {
      title: 'Scroll In Sync',
      description: 'Now you can choose to scroll both sides in sync.',
    },
  },
  {
    element: '#nextDiffSection',
    popover: {
      title: 'Travel through diff hunks',
      description: 'Now you can move between next and previous diff hunks.',
    },
  },
  {
    element: '#prevDiffSection',
    popover: {
      title: 'Travel through diff hunks',
      description: 'Now you can move between next and previous diff hunks.',
    },
  },
]

const backButtonTutorial: Tutorial[] = [
  {
    element: '#backToDataLink',
    popover: {
      title: 'Go back to edit screen',
      description:
        'Now your data persists between the page navigation. <br/> PS: Works only if you have clicked on "Compare" button',
    },
  },
]

const copyLinkShortcutTutorial: Tutorial[] = [
  {
    element: '#copyLinkButton',
    popover: {
      title: 'Copy link with ease',
      description:
        'Now you can press <kbd>Cmd</kbd>+<kbd>C</kbd>/<kbd>Ctrl</kbd>+<kbd>C</kbd> any time on this screen to copy link to this diff.',
    },
  },
]

const CopyE2ELinkTutorial: Tutorial[] = [
  {
    element: '#copyLinkButton',
    popover: {
      title: 'Copy E2E link',
      description: 'Now links for large data comparison are end-to-end encrytpted automatically. Read more about it on github repo.',
    },
  },
]

const diffV1Tutorials: TutorialMetadata[] = [
  {
    tutorial: actionBarTutorial,
    cookieName: 'isSkipScrollInSyncTutorial',
  },
  {
    tutorial: backButtonTutorial,
    cookieName: 'isSkipBackButtonPersistsDataTutorial',
  },
  {
    tutorial: copyLinkShortcutTutorial,
    cookieName: 'isSkipCopyLinkShortcutTutorial',
  },
  {
    tutorial: CopyE2ELinkTutorial,
    cookieName: 'isSkipCopyE2ELinkTutorial',
  }
]

const diffV2Tutorials: TutorialMetadata[] = [
  {
    tutorial: CopyE2ELinkTutorial,
    cookieName: 'isSkipCopyE2ELinkTutorial',
  },
  {
    tutorial: backButtonTutorial,
    cookieName: 'isSkipBackButtonPersistsDataTutorial',
  },
  {
    tutorial: copyLinkShortcutTutorial,
    cookieName: 'isSkipCopyLinkShortcutTutorial',
  },
]

const comparePageV1Tutorials: TutorialMetadata[] = [
  {
    tutorial: labelsTutorial,
    cookieName: 'isSkipTutorial',
  },
  {
    tutorial: submitShortcutTutorial,
    cookieName: 'isSkipSubmitKbdShortcutTutorial',
  },
]

const comparePageV2Tutorials: TutorialMetadata[] = [
  {
    tutorial: labelsTutorial,
    cookieName: 'isSkipTutorial',
  },
]

const tutorialsMetadata: TutorialsMetadata = {
  '/v1/diff': diffV1Tutorials,
  '/v2/diff': diffV2Tutorials,
  '/': comparePageV1Tutorials,
  '/v2': comparePageV2Tutorials,
}

export default async function showTutorials(
  cookies: Cookies,
  route: string,
  isDarkMode: boolean
) {
  const { default: Driver } = await import('driver.js')
  const possibleTutorialsToShow: TutorialMetadata[] = tutorialsMetadata[route]
  let finalTutorial: Tutorial[] = []
  const cookiesToSet: TutorialMetadata[] = []
  const driver = new Driver({
    closeBtnText: 'Skip',
    className: 'dark:filter dark:invert',
    stageBackground: isDarkMode ? 'hsl(221deg 50% 90% / 0.5)' : '#ffffff',
    onReset: () => {
      cookiesToSet.forEach((x: TutorialMetadata) => {
        _cookies[x.cookieName] = true
        document.cookie = `${x.cookieName}=true; max-age=31536000; path=/;`
      })
    },
  })
  possibleTutorialsToShow.forEach((x) => {
    if (!cookies[x.cookieName] && !_cookies[x.cookieName]) {
      finalTutorial = finalTutorial.concat(x.tutorial)
      cookiesToSet.push(x)
    }
  })
  if (finalTutorial.length) {
    driver.defineSteps(finalTutorial)
    driver.start()
  }
}
