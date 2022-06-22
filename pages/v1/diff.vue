<template>
  <div class="page-contents">
    <Navbar :show-back-button="true" />
    <main class="outline-none" tabindex="0">
      <section
        class="
          flex
          items-center
          justify-between
          px-4
          py-2
          mb-4
          sticky
          top-[80px]
          dark:bg-gray-700
          bg-gray-300
          dark:bg-opacity-50
          bg-opacity-50
          backdrop-blur-sm
          rounded-md
          shadow-lg
          border border-gray-500
          w-full
          z-10
        "
      >
        <div class="flex gap-4">
          <div
            id="toggleScrollInSyncSection"
            class="inline-flex items-center gap-1"
          >
            <label
              for="toggleScrollInSync"
              class="text-gray-800 select-none dark:text-gray-50"
            >
              Scroll in sync
            </label>
            <input
              id="toggleScrollInSync"
              type="checkbox"
              :checked="isSrollInSyncEnabled"
              class="form-checkbox"
              @click="toggleInSyncScroll"
            />
          </div>
          <div id="nextDiffSection" class="inline-flex items-center gap-1">
            <button
              id="nextDiff"
              class="inline-flex items-center justify-center px-1 py-1 text-sm text-gray-600 transition-transform transform bg-gray-300 border border-gray-800 rounded-sm outline-none  dark:border-gray-400 dark:text-white dark:bg-gray-800 align-center focus:ring-4 active:scale-y-75"
              aria-label="Go to next diff"
              type="button"
              @click="goToNextDiff"
            >
              Next diff
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 17l-4 4m0 0l-4-4m4 4V3"
                ></path>
              </svg>
            </button>
          </div>
          <div id="prevDiffSection" class="inline-flex items-center gap-1">
            <button
              id="prevDiff"
              class="inline-flex items-center justify-center px-1 py-1 text-sm text-gray-600 transition-transform transform bg-gray-300 border border-gray-800 rounded-sm outline-none  dark:border-gray-400 dark:text-white dark:bg-gray-800 align-center focus:ring-4 active:scale-y-75"
              aria-label="Go to previous diff"
              type="button"
              @click="goToPreviousDiff"
            >
              Previous diff
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7l4-4m0 0l4 4m-4-4v18"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-1 p-2 text-sm transition-transform transform rounded-md shadow outline-none  justify-self-end focus:ring-4 active:scale-y-75"
            aria-label="Copy url to clipboard"
            :class="{
              'bg-blue-500 text-white': !copied,
              'bg-green-500 text-gray-800': copied,
            }"
            @click="copyUrlToClipboard"
          >
            <span v-show="copied" class="inline">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                ></path>
              </svg>
            </span>
            <span v-show="copied" class="hidden md:inline-block">Copied</span>
            <span v-show="!copied" class="inline">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                ></path>
              </svg>
            </span>
            <span v-show="!copied" class="hidden md:inline-block"
              >Copy link</span
            >
          </button>
        </div>
      </section>
      <section
        class="flex items-stretch w-full gap-4 font-mono text-gray-800  dark:text-gray-50"
      >
        <div class="flex flex-col w-1/2 gap-2">
          <p class="flex-grow-0 text-lg font-bold text-center capitalize">
            {{ lhsLabel }}
          </p>
          <div
            id="lhsDiff"
            class="relative flex-1 px-4 py-2 border-2 rounded-md  dark:border-gray-500 line-number-gutter min-h-80"
            :class="{
              'overflow-y-auto max-h-screen--nav': !isSrollInSyncEnabled,
            }"
          >
            <RTStickyCopyButton
              :aria-label="'Copy the content to clipboard'"
              :click-handler="copyTextToClipboard"
            />
            <div
              v-for="(lineDiff, index) in lhsDiff"
              :key="index"
              :class="{
                'bg-red-200 dark:bg-red-800 rounded-sm':
                  lineDiff.includes('isModified'),
              }"
            >
              <p class="break-all whitespace-pre-wrap" v-html="lineDiff"></p>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-1/2 gap-2">
          <p class="flex-grow-0 text-lg font-bold text-center capitalize">
            {{ rhsLabel }}
          </p>
          <div
            id="rhsDiff"
            class="relative flex-1 px-4 py-2 border-2 rounded-md  dark:border-gray-500 line-number-gutter min-h-80"
            :class="{
              'overflow-y-auto max-h-screen--nav': !isSrollInSyncEnabled,
            }"
          >
            <RTStickyCopyButton
              :click-handler="copyTextToClipboard"
              :aria-label="'Copy the content to clipboard'"
            />
            <div
              v-for="(lineDiff, index) in rhsDiff"
              :key="index"
              :class="{
                'bg-green-200 dark:bg-green-700 rounded-sm':
                  lineDiff.includes('isModified'),
              }"
            >
              <p class="break-all whitespace-pre-wrap" v-html="lineDiff"></p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import pako from 'pako'
import { undoUrlSafeBase64, escapeHtml } from '../../helpers/utils'
export default {
  layout: 'main',
  data() {
    const _diff = this.$route.hash
    if (_diff) {
      const gunzip = pako.ungzip(
        Buffer.from(undoUrlSafeBase64(_diff), 'base64')
      )
      const diffData = JSON.parse(Buffer.from(gunzip).toString('utf8'))
      const { diff, lhsLabel, rhsLabel } = diffData
      this.lhsLabel = lhsLabel
      this.rhsLabel = rhsLabel
      this.isSrollInSyncEnabled = true
      this.lhsDiff = diff
        .map((item) => {
          const hunkState = item[0]
          if (hunkState === -1 || hunkState === 0) {
            const className =
              hunkState === -1 ? 'isModified bg-red-300 dark:bg-red-500' : ''
            return `<span class="break-all inline p-0 m-0 ${className}">${escapeHtml(
              item[1]
            )}</span>`
          }
          return false
        })
        .filter(Boolean)
        .join('')
        .split('\n')
      this.rhsDiff = diff
        .map((item) => {
          const hunkState = item[0]
          if (hunkState === 1 || hunkState === 0) {
            const className =
              hunkState === 1 ? 'isModified bg-green-400 dark:bg-green-900' : ''
            return `<span class="break-all inline p-0 m-0 ${className}">${escapeHtml(
              item[1]
            )}</span>`
          }
          return false
        })
        .filter(Boolean)
        .join('')
        .split('\n')
    }
    return {
      lhsDiff: this.lhsDiff,
      rhsDiff: this.rhsDiff,
      rhsLabel: this.rhsLabel,
      lhsLabel: this.lhsLabel,
      copied: false,
      isSrollInSyncEnabled: this.isSrollInSyncEnabled,
      isDarkMode: this.$isDarkMode,
      isSkipScrollInSyncTutorial: this.$isSkipScrollInSyncTutorial,
    }
  },
  async mounted() {
    const isLHSBigger = this.lhsDiff.length > this.rhsDiff.length
    const maxLineCount = isLHSBigger ? this.lhsDiff.length : this.rhsDiff.length
    document.documentElement.style.setProperty(
      '--max-line-number-characher',
      `${`${maxLineCount}`.split('').length}ch`
    )
    const lhsDiffNode = document.getElementById('lhsDiff')
    const rhsDiffNode = document.getElementById('rhsDiff')
    let comparator, comparer
    if (isLHSBigger) {
      comparer = lhsDiffNode
      comparator = rhsDiffNode
    } else {
      comparer = rhsDiffNode
      comparator = lhsDiffNode
    }
    this.comparator = comparator
    this.treeWalker = document.createTreeWalker(
      comparer,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode: (node) => {
          return (
            node.classList.contains('bg-red-200') ||
            node.classList.contains('bg-green-200')
          )
        },
      }
    )
    const { default: Driver } = await import('driver.js')
    const driver = new Driver({
      closeBtnText: 'Skip',
      className: 'dark:filter dark:invert',
      stageBackground: this.isDarkMode
        ? 'hsl(221deg 50% 90% / 0.5)'
        : '#ffffff',
      onReset: () => {
        document.cookie =
          'isSkipScrollInSyncTutorial=true; max-age=31536000; path=/;'
      },
    })
    if (!this.isSkipScrollInSyncTutorial) {
      driver.defineSteps([
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
            description:
              'Now you can move between next and previous diff hunks.',
          },
        },
        {
          element: '#prevDiffSection',
          popover: {
            title: 'Travel through diff hunks',
            description:
              'Now you can move between next and previous diff hunks.',
          },
        },
      ])
      driver.start()
    }
  },
  methods: {
    putToClipboard(textToPut, toastContent) {
      navigator.clipboard.writeText(textToPut)
      this.$store.commit('toast/show', {
        show: true,
        content: toastContent,
        iconHTML: `
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        `,
        theme: 'success',
      })
    },
    copyUrlToClipboard() {
      this.putToClipboard(window.location.href, 'Link copied to your clipboard')
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 5000)
    },
    copyTextToClipboard(e) {
      this.putToClipboard(
        e.currentTarget.parentNode.parentNode.innerText
          .split('\n\n')
          .join('\n'),
        'Text copied to your clipboard'
      )
    },
    toggleInSyncScroll() {
      this.isSrollInSyncEnabled = !this.isSrollInSyncEnabled
    },
    goToNextDiff() {
      const currentNode = this.treeWalker.currentNode
      const nextNode = this.treeWalker.nextNode()
      if (nextNode) {
        const currentNodeIndex = Array.prototype.indexOf.call(
          currentNode.parentElement.children,
          currentNode
        )
        const nextNodeIndex = Array.prototype.indexOf.call(
          nextNode.parentElement.children,
          nextNode
        )
        const comparatorCurrentNode = this.comparator.children[currentNodeIndex]
        const comparatorNextNode = this.comparator.children[nextNodeIndex]
        currentNode.querySelector('p').classList.remove('selected')
        comparatorCurrentNode.querySelector('p').classList.remove('selected')
        nextNode.querySelector('p').classList.add('selected')
        comparatorNextNode.querySelector('p').classList.add('selected')
        nextNode.scrollIntoView()
        comparatorNextNode.scrollIntoView()
      }
    },
    goToPreviousDiff() {
      const currentNode = this.treeWalker.currentNode
      const prevNode = this.treeWalker.previousNode()
      if (prevNode) {
        const currentNodeIndex = Array.prototype.indexOf.call(
          currentNode.parentElement.children,
          currentNode
        )
        const prevNodeIndex = Array.prototype.indexOf.call(
          prevNode.parentElement.children,
          prevNode
        )
        const comparatorCurrentNode = this.comparator.children[currentNodeIndex]
        const comparatorPrevNode = this.comparator.children[prevNodeIndex]
        currentNode.querySelector('p').classList.remove('selected')
        comparatorCurrentNode.querySelector('p').classList.remove('selected')
        prevNode.querySelector('p').classList.add('selected')
        comparatorPrevNode.querySelector('p').classList.add('selected')
        prevNode.scrollIntoView()
        comparatorPrevNode.scrollIntoView()
      }
    },
  },
}
</script>

<style lang="scss">
::selection {
  @apply bg-gray-800 text-gray-300 dark:bg-gray-200 dark:text-gray-800;
}
.copy-uri-button:hover {
  @apply shadow-lg;
  svg {
    @apply scale-110 rotate-12;
  }
}

/* line numbers in diff view */
.line-number-gutter {
  counter-reset: line-numbers;

  --line-number-gutter-width: calc(var(--max-line-number-characher) + 10px);
  &::before {
    content: '';
    width: var(--line-number-gutter-width);
    @apply bg-gray-300 dark:bg-gray-700 inline-block left-0 top-0 bottom-0 absolute text-sm;
  }
  @apply relative;
  p {
    padding-left: calc(var(--line-number-gutter-width) - 10px);
    line-height: 1.65;
    @apply relative;
    &.selected {
      @apply dark:bg-blue-800 bg-blue-200;
    }
    &:hover {
      @apply bg-gray-200 dark:bg-gray-600;
      & > span {
        @apply dark:mix-blend-hard-light dark:bg-blend-multiply;
      }
    }
    &::before {
      counter-increment: line-numbers;
      content: counter(line-numbers);
      width: var(--line-number-gutter-width);
      @apply absolute left-0 top-0 -mx-4 bg-gray-200 dark:bg-gray-700 dark:text-gray-50 text-gray-500 inline-flex justify-center items-center text-sm h-full;
    }
  }
}
</style>
