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
      top-[70px]
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
      <ToggleInSync />
      <NextDiff :click-handler="goToNextDiff" />
      <PrevDiff :click-handler="goToPreviousDiff" />
    </div>
    <CopyLink :click-handler="copyUrlToClipboard" :copied="copied"></CopyLink>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import PrevDiff from './buttons/prevDiff.vue'
import ToggleInSync from './buttons/toggleInSync.vue'
import NextDiff from './buttons/nextDiff.vue'
import CopyLink from './buttons/copyLink.vue'
import { putToClipboard } from '~/helpers/utils'
import { DiffActionBarData } from '~/helpers/types'
export default Vue.extend({
  components: {
    PrevDiff,
    NextDiff,
    ToggleInSync,
    CopyLink,
  },
  data(): DiffActionBarData {
    return {
      copied: false,
      comparator: null,
      comparer: null,
      treeWalker: null,
    }
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
          acceptNode: (node: Node) => {
            if (
              (node as HTMLDivElement).classList.contains('bg-red-200') ||
              (node as HTMLDivElement).classList.contains('bg-green-200')
            ) {
              return NodeFilter.FILTER_ACCEPT
            }
            return NodeFilter.FILTER_REJECT
          },
        }
      )
      document.addEventListener('keydown', this.handleCtrlC)
    }
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleCtrlC)
  },
  methods: {
    handleCtrlC(event: KeyboardEvent) {
      const { metaKey, ctrlKey, key } = event
      if (
        (metaKey || ctrlKey) &&
        key === 'c' &&
        !window?.getSelection()?.toString()
      ) {
        const button: HTMLButtonElement = document.getElementById(
          'copyLinkButton'
        ) as HTMLButtonElement
        button.click()
      }
    },
    copyUrlToClipboard() {
      putToClipboard(
        window.location.href,
        'Link copied to your clipboard',
        this.$store
      )
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 5000)
    },
    goToNextDiff() {
      const currentNode = this.treeWalker?.currentNode
      const nextNode = this.treeWalker?.nextNode()
      if (nextNode) {
        const currentNodeIndex = Array.prototype.indexOf.call(
          currentNode?.parentElement?.children,
          currentNode
        )
        const nextNodeIndex = Array.prototype.indexOf.call(
          nextNode.parentElement?.children,
          nextNode
        )
        const comparatorCurrentNode =
          this.comparator?.children[currentNodeIndex]
        const comparatorNextNode = this.comparator?.children[nextNodeIndex]
        this.toggleDiffHunkAndScrollIntoView(
          [
            currentNode as HTMLDivElement,
            comparatorCurrentNode as HTMLDivElement,
          ],
          [nextNode as HTMLDivElement, comparatorNextNode as HTMLDivElement]
        )
      }
    },
    goToPreviousDiff() {
      const currentNode = this.treeWalker?.currentNode
      const prevNode = this.treeWalker?.previousNode()
      if (prevNode) {
        const currentNodeIndex = Array.prototype.indexOf.call(
          currentNode?.parentElement?.children,
          currentNode
        )
        const prevNodeIndex = Array.prototype.indexOf.call(
          prevNode.parentElement?.children,
          prevNode
        )
        const comparatorCurrentNode =
          this.comparator?.children[currentNodeIndex]
        const comparatorPrevNode = this.comparator?.children[prevNodeIndex]
        this.toggleDiffHunkAndScrollIntoView(
          [
            currentNode as HTMLDivElement,
            comparatorCurrentNode as HTMLDivElement,
          ],
          [prevNode as HTMLDivElement, comparatorPrevNode as HTMLDivElement]
        )
      }
    },
    toggleDiffHunkAndScrollIntoView(
      unselectedNodes: Array<HTMLDivElement | undefined> = [],
      selectedNodes: Array<HTMLDivElement | undefined> = []
    ) {
      unselectedNodes.forEach((element) => {
        element?.querySelector('p')?.classList.remove('selected')
      })
      selectedNodes.forEach((element) => {
        element?.querySelector('p')?.classList.add('selected')
        element?.scrollIntoView()
      })
    },
  },
})
</script>
<style lang="scss">
.copy-uri-button:hover svg {
  @apply rotate-12;
}
</style>
