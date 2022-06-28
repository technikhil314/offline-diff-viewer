interface Tutorial {
  element: string
  popover: {
    title: string
    description: string
  }
}

interface TutorialMetadata {
  tutorial: Tutorial[]
  cookieName: string
}

type TutorialsMetadata = Record<string, TutorialMetadata[]>

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
        'Now your data persists between the page navigation. Only if you have clicked on "Compare" button',
    },
  },
]

const tutorialsMetadata: TutorialsMetadata = {
  '/v1/diff': [
    {
      tutorial: actionBarTutorial,
      cookieName: 'isSkipScrollInSyncTutorial',
    },
    {
      tutorial: backButtonTutorial,
      cookieName: 'isSkipBackButtonPersistsDataTutorial',
    },
  ],
  '/': [
    {
      tutorial: labelsTutorial,
      cookieName: 'isSkipTutorial',
    },
  ],
}

export default async function showTutorials(
  cookies: Record<string, boolean>,
  route: string,
  isDarkMode: boolean
) {
  const { default: Driver } = await import('driver.js')
  const possibleTutorialsToShow = tutorialsMetadata[route]
  let finalTutorial: Tutorial[] = []
  const cookiesToSet: string[] = []
  const driver = new Driver({
    closeBtnText: 'Skip',
    className: 'dark:filter dark:invert',
    stageBackground: isDarkMode ? 'hsl(221deg 50% 90% / 0.5)' : '#ffffff',
    onReset: () => {
      cookiesToSet.forEach((x) => {
        document.cookie = `${x}=true; max-age=31536000; path=/;`
      })
    },
  })
  possibleTutorialsToShow.forEach((x) => {
    if (!cookies[x.cookieName]) {
      finalTutorial = finalTutorial.concat(x.tutorial)
      cookiesToSet.push(x.cookieName)
    }
  })
  driver.defineSteps(finalTutorial)
  driver.start()
}
