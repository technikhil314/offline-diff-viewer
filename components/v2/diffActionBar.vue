<template>
  <section
    class="
      flex
      items-center
      justify-between
      px-4
      py-2
      mb-4
      top-[70px]
      dark:bg-gray-700
      bg-gray-300 bg-opacity-50
      rounded-md
      shadow-lg
      border border-gray-500
      w-full
    "
  >
    <div class="flex gap-4">
      <NextDiff :click-handler="goToNextDiff" />
      <PrevDiff :click-handler="goToPreviousDiff" />
    </div>
    <div class="flex gap-4 items-center">
      <DiffStyle :click-handler="toggleDiffFashion" />
      <CopyLink :click-handler="copyUrlToClipboard" :copied="copied"></CopyLink>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import CopyLink from '../buttons/copyLink.vue'
import DiffStyle from '../buttons/diffStyle.vue'
import NextDiff from '../buttons/nextDiff.vue'
import PrevDiff from '../buttons/prevDiff.vue'
import { SIMPLE_DIFF_CHARACTER_LIMIT } from '~/constants/constants'
import {
  E2E_LINK_GENERATION_ERROR,
  E2E_LINK_GENERATION_SUCCESS,
  LINK_COPY_SUCCESS,
} from '~/constants/messages'
import {
  getEncryptedData,
  getEncryptionKey,
  getExtractedEncryptionKey,
} from '~/helpers/encrypt'
import { DiffActionBarData } from '~/helpers/types'
import { getRandomDiffId, putToClipboard } from '~/helpers/utils'
export default Vue.extend({
  components: {
    PrevDiff,
    NextDiff,
    CopyLink,
    DiffStyle,
  },
  props: {
    diffNavigator: {
      type: Object,
      required: true,
    },
    onDiffFashion: {
      type: Function,
      required: true,
    },
  },
  data(): DiffActionBarData {
    return {
      copied: false,
      comparator: null,
      comparer: null,
      treeWalker: null,
      e2eLink: null,
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
      const isCurrentUrlExceedsCharacterLimit =
        window.location.href.length > SIMPLE_DIFF_CHARACTER_LIMIT
      if (isCurrentUrlExceedsCharacterLimit && this.e2eLink) {
        putToClipboard(this.e2eLink, LINK_COPY_SUCCESS, this.$store)
      } else if (isCurrentUrlExceedsCharacterLimit) {
        this.copyE2eUrlToClipboard()
      } else {
        putToClipboard(window.location.href, LINK_COPY_SUCCESS, this.$store)
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 5000)
      }
    },
    async copyE2eUrlToClipboard() {
      try {
        this.copied = null
        const id = getRandomDiffId()
        const keyBuffer = await getEncryptionKey()
        const encryptedDataText = await getEncryptedData(
          window.location.hash.replace(/^#/, ''),
          keyBuffer
        )
        const extractedEncryptionKey = await getExtractedEncryptionKey(
          keyBuffer
        )
        const response = await fetch('/api/createLink', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: encryptedDataText,
            id,
          }),
        })
        const data = await response.json()
        if (!data.success) {
          throw new Error(E2E_LINK_GENERATION_ERROR)
        }
        const newUrl = new URL(window.location.origin)
        newUrl.pathname = '/v2/diff'
        newUrl.hash = `#${extractedEncryptionKey}`
        newUrl.searchParams.set('id', id)
        putToClipboard(
          newUrl.toString(),
          E2E_LINK_GENERATION_SUCCESS,
          this.$store
        )
        this.e2eLink = newUrl.toString()
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 5000)
      } catch (error: any) {
        this.showErrorToast(E2E_LINK_GENERATION_ERROR)
      } finally {
        setTimeout(() => {
          this.copied = false
        }, 5000)
      }
    },
    goToNextDiff() {
      this.diffNavigator.next()
    },
    goToPreviousDiff() {
      this.diffNavigator.previous()
    },
    toggleDiffFashion(value: boolean) {
      this.onDiffFashion(value)
    },
    showErrorToast(content: string) {
      this.$store.commit('toast/show', {
        show: true,
        content,
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          `,
        theme: 'error',
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
