<template>
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
          checked
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
        <span v-show="!copied" class="hidden md:inline-block">Copy link</span>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      copied: this.copied,
    }
  },
  beforeCreate() {
    this.copied = false
  },
  mounted() {
    const lhsDiffNode = document.getElementById('lhsDiff')
    const rhsDiffNode = document.getElementById('rhsDiff')
    if (lhsDiffNode && rhsDiffNode) {
      const isLHSBigger =
        lhsDiffNode.children.length > rhsDiffNode.children.length
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
    toggleInSyncScroll() {
      this.$store.commit('scrollInSync/toggle')
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
