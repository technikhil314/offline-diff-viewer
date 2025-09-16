export interface Cookies {
  isDarkMode: boolean
  isSkipTutorial: boolean
  isSkipScrollInSyncTutorial: boolean
  isSkipBackButtonPersistsDataTutorial: boolean
  isSkipSubmitKbdShortcutTutorial: boolean
  isSkipCopyLinkShortcutTutorial: boolean
  isSkipCopyE2ELinkTutorial: boolean
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
  copied: Boolean | null
  e2eLink: string | null
  treeWalker: TreeWalker | null
}

export interface DiffData {
  lhs: any[]
  rhs: any[]
  rhsLabel: string
  lhsLabel: string
  monacoDiffEditor: any
  diffNavigator: any
}

export interface v2DiffData {
  lhs: string
  rhs: string
  rhsLabel: string
  lhsLabel: string
  monacoDiffEditor: any
  diffNavigator: any
  isSideBySideDiff: boolean
  e2eDataStatusText: string
}
