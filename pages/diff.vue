<template>
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
    <main>
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
              'bg-red-100 dark:bg-yellow-700': lineDiff.includes('isModified'),
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
              'bg-green-100 dark:bg-green-700': lineDiff.includes('isModified'),
            }"
          >
            <p class="break-all whitespace-pre-wrap" v-html="lineDiff"></p>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import pako from 'pako'
import { undoUrlSafeBase64, escapeHtml } from '../helpers/utils'
import footer from '~/components/footer.vue'
export default {
  components: { footer },
  layout: 'main',
  data() {
    return {
      lhsDiff: this.lhsDiff,
      rhsDiff: this.rhsDiff,
      copied: false,
    }
  },
  mounted() {
    const _diff = this.$route.hash
    const gunzip = pako.ungzip(Buffer.from(undoUrlSafeBase64(_diff), 'base64'))
    const diff = JSON.parse(Buffer.from(gunzip).toString('utf8'))
    this.lhsDiff = diff
      .map((item) => {
        const hunkState = item[0]
        if (hunkState === -1 || hunkState === 0) {
          const className =
            hunkState === -1 ? 'isModified bg-red-300 dark:bg-yellow-900' : ''
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
            hunkState === 1 ? 'isModified bg-green-300 dark:bg-green-900' : ''
          return `<span class="break-all inline p-0 m-0 ${className}">${escapeHtml(
            item[1]
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
  },
}
</script>

<style lang="scss">
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
    @apply bg-gray-200 dark:bg-gray-700 inline-block left-0 top-0 bottom-0 absolute text-sm;
  }
  @apply relative;
  p {
    padding-left: calc(var(--line-number-gutter-width) - 10px);
    line-height: 1.65;
    @apply relative;
    &:hover {
      @apply bg-gray-200 dark:bg-gray-700;
    }
    &::before {
      counter-increment: line-numbers;
      content: counter(line-numbers);
      width: var(--line-number-gutter-width);
      @apply absolute left-0 top-[2px] -mx-4 bottom-0 text-center bg-gray-200 dark:bg-gray-700 dark:text-gray-50 text-gray-500 flex justify-center text-sm;
    }
    &:first-of-type {
      &::before {
        @apply -mt-2 pt-2;
      }
    }
    &:last-of-type {
      &::before {
        @apply -mb-2 pb-2;
      }
    }
  }
}
</style>
