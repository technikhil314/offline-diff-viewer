<template>
  <div class="contents">
    <div class="page-contents">
      <Navbar :show-back-button="true">
        <template #right>
          <button
            type="button"
            class="inline-flex justify-center px-4 py-2 transition-transform transform rounded-md shadow outline-none  copy-uri-button align-center focus:ring-4 active:scale-y-75"
            :class="{
              'bg-blue-500 text-white': !copied,
              'bg-green-500 text-gray-800': copied,
            }"
            @click="copyUrlToClipboard"
          >
            <span v-show="copied" class="inline-flex justify-center">
              <svg
                class="inline-block w-6 h-6 ml-[-4px]"
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
              <span class="hidden ml-2 md:inline-block">Copied</span>
            </span>
            <span v-show="!copied" class="inline-flex justify-center">
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
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                ></path>
              </svg>
              <span class="hidden ml-2 md:inline-block">Copy link</span>
            </span>
          </button>
        </template>
      </Navbar>
      <main class="outline-none" tabindex="0">
        <div
          class="flex items-stretch w-full gap-4 font-mono text-gray-800  dark:text-gray-50"
        >
          <div
            class="relative flex-1 px-4 py-2 overflow-y-auto border-2 rounded-md  dark:border-gray-500 max-h-screen--nav line-number-gutter min-h-80"
          >
            <RTStickyCopyButton :click-handler="copyTextToClipboard" />
            <div
              v-for="(lineDiff, index) in lhsDiff"
              :key="index"
              :class="{
                'bg-red-200 dark:bg-red-800': lineDiff.includes('isModified'),
              }"
            >
              <p class="break-all whitespace-pre-wrap" v-html="lineDiff"></p>
            </div>
          </div>
          <div
            class="relative flex-1 px-4 py-2 overflow-y-auto border-2 rounded-md  dark:border-gray-500 min-h-80 line-number-gutter max-h-screen--nav"
          >
            <RTStickyCopyButton :click-handler="copyTextToClipboard" />
            <div
              v-for="(lineDiff, index) in rhsDiff"
              :key="index"
              :class="{
                'bg-green-200 dark:bg-green-700':
                  lineDiff.includes('isModified'),
              }"
            >
              <p class="break-all whitespace-pre-wrap" v-html="lineDiff"></p>
            </div>
          </div>
        </div>
      </main>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import pako from 'pako'
import { undoUrlSafeBase64, escapeHtml } from '../helpers/utils'
export default Vue.extend({
  layout: 'main',
  data() {
    return {
      lhsDiff: [],
      rhsDiff: [],
      copied: false,
    }
  },
  mounted() {
    const _diff = this.$route.hash
    const gunzip = pako.ungzip(Buffer.from(undoUrlSafeBase64(_diff), 'base64'))
    const diff = JSON.parse(Buffer.from(gunzip).toString('utf8'))
    this.lhsDiff = diff
      .map((item: Array<string | number>) => {
        const hunkState = item[0]
        if (hunkState === -1 || hunkState === 0) {
          const className =
            hunkState === -1 ? 'isModified bg-red-300 dark:bg-red-500' : ''
          return `<span class="break-all inline p-0 m-0 ${className}">${escapeHtml(
            item[1] as string
          )}</span>`
        }
        return false
      })
      .filter(Boolean)
      .join('')
      .split('\n')
    this.rhsDiff = diff
      .map((item: Array<string | number>) => {
        const hunkState = item[0]
        if (hunkState === 1 || hunkState === 0) {
          const className =
            hunkState === 1 ? 'isModified bg-green-400 dark:bg-green-900' : ''
          return `<span class="break-all inline p-0 m-0 ${className}">${escapeHtml(
            item[1] as string
          )}</span>`
        }
        return false
      })
      .filter(Boolean)
      .join('')
      .split('\n')
    const maxLineCount =
      this.lhsDiff.length > this.rhsDiff.length
        ? this.lhsDiff.length
        : this.rhsDiff.length
    document.documentElement.style.setProperty(
      '--max-line-number-characher',
      `${`${maxLineCount}`.split('').length}ch`
    )
  },
  methods: {
    putToClipboard(textToPut: string, toastContent: string) {
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
    copyTextToClipboard(e: Event) {
      const copyTextButton = e.currentTarget as HTMLButtonElement
      this.putToClipboard(
        (copyTextButton.parentNode?.parentNode as HTMLElement).innerText
          .split('\n\n')
          .join('\n'),
        'Text copied to your clipboard'
      )
    },
  },
})
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
    &:hover {
      @apply bg-gray-200 dark:bg-gray-600;
      span {
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
