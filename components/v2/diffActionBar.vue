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
      <NextDiff :click-handler="goToNextDiff" />
      <PrevDiff :click-handler="goToPreviousDiff" />
    </div>
    <CopyLink :click-handler="copyUrlToClipboard" :copied="copied"></CopyLink>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import PrevDiff from '../buttons/prevDiff.vue'
import NextDiff from '../buttons/nextDiff.vue'
import CopyLink from '../buttons/copyLink.vue'
import { putToClipboard } from '~/helpers/utils'
import { DiffActionBarData } from '~/helpers/types'
export default Vue.extend({
  components: {
    PrevDiff,
    NextDiff,
    CopyLink,
  },
  props: {
    diffNavigator: {
      type: Object,
      required: true,
    },
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
    document.addEventListener('keydown', this.handleCtrlC)
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
      this.diffNavigator.next()
    },
    goToPreviousDiff() {
      this.diffNavigator.previous()
    },
  },
})
</script>
<style lang="scss">
.copy-uri-button:hover svg {
  @apply rotate-12;
}
</style>
