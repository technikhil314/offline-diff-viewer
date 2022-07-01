export interface Cookies {
  isDarkMode: boolean
  isSkipTutorial: boolean
  isSkipScrollInSyncTutorial: boolean
  isSkipBackButtonPersistsDataTutorial: boolean
  isSkipSubmitKbdShortcutTutorial: boolean
  isSkipCopyLinkShortcutTutorial: boolean
}

export interface Tutorial {
  element: string
  popover: {
    title: string
    description: string
  }
}

export interface TutorialMetadata {
  tutorial: Tutorial[]
  cookieName: keyof Cookies
}

export type TutorialsMetadata = Record<string, TutorialMetadata[]>

export interface DiffActionBarData {
  comparator: HTMLElement | null
  comparer: HTMLElement | null
  copied: Boolean
  treeWalker: TreeWalker | null
}
