<template>
  <div class="contents">
    <Navbar show-back-button="true">
      <template v-slot:right>
        <button
          type="button"
          @click="copyUrlToClipboard"
          class="inline-flex justify-center px-4 py-2 text-white transition-transform transform rounded-md shadow-lg outline-none  copy-uri-button align-center focus:ring-4 active:scale-y-75"
          v-bind:class="{
            'bg-blue-600 text-white': !copied,
            'bg-green-500 text-black': copied,
          }"
        >
          <span class="inline-flex justify-center" v-show="copied">
            <svg
              class="inline-block w-6 h-6 mr-2 ml-[-4px]"
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
            <span>Copied</span>
          </span>
          <span class="inline-flex justify-center" v-show="!copied">
            <svg
              class="w-6 h-6 mr-2"
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
            <span>Copy link</span>
          </span>
        </button>
      </template>
    </Navbar>
    <main class="h-full xl:container">
      <div class="flex gap-4 mt-5">
        <div
          class="relative flex-1 px-4 py-2 overflow-y-auto border-2 rounded-sm  max-h-screen--nav line-numbers min-h-80"
        >
          <RTStickyCopyButton :clickHandler="copyTextToClipboard" />
          <p v-for="(lineDiff, index) in lhsDiff" :key="index">
            <span v-html="lineDiff"></span>
          </p>
        </div>
        <div
          class="relative flex-1 px-4 py-2 overflow-y-auto border-2 rounded-sm  min-h-80 line-numbers max-h-screen--nav"
        >
          <RTStickyCopyButton :clickHandler="copyTextToClipboard" />
          <p v-for="(lineDiff, index) in rhsDiff" :key="index">
            <span v-html="lineDiff"></span>
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import pako from 'pako'
import { undoUrlSafeBase64 } from '../../helpers/utils'
export default {
  layout: 'main',
  mounted() {
    const { diff: _diff } = this.$route.params
    const gunzip = pako.ungzip(Buffer.from(undoUrlSafeBase64(_diff), 'base64'))
    const diff = JSON.parse(Buffer.from(gunzip).toString('utf8'))
    this.lhsDiff = diff
      .map((lineDiff) => {
        return lineDiff
          .map((item) => {
            if (item[0] === -1 || item[0] === 0) {
              const className = item[0] === -1 ? 'bg-red-300' : ''
              return `<span class="whitespace-pre-wrap font-mono break-all inline mr-[-4px] p-0 m-0 ${className}">${item[1]}</span>`
            }
            return ''
          })
          .filter(Boolean)
          .join('\n')
      })
      .filter(Boolean)
    this.rhsDiff = diff
      .map((lineDiff) => {
        return lineDiff
          .map((item) => {
            if (item[0] === 1 || item[0] === 0) {
              const className = item[0] === 1 ? 'bg-green-300' : ''
              return `<span class="whitespace-pre-wrap font-mono break-all inline mr-[-4px] p-0 m-0 ${className}">${item[1]}</span>`
            }
            return ''
          })
          .filter(Boolean)
          .join('\n')
      })
      .filter(Boolean)
    const maxLineCount =
      this.lhsDiff.length > this.rhsDiff.length
        ? this.lhsDiff.length
        : this.rhsDiff.length
    document.documentElement.style.setProperty(
      '--max-line-number-characher',
      `${`${maxLineCount}`.split('').length}ch`
    )
  },
  data() {
    return {
      lhsDiff: this.lhsDiff,
      rhsDiff: this.rhsDiff,
      copied: false,
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
.line-numbers {
  counter-reset: line-numbers;
  @apply relative;
  p {
    padding-left: calc(var(--max-line-number-characher) - 4px);
    @apply relative;
    &:hover {
      @apply bg-gray-200;
    }
    &::before {
      counter-increment: line-numbers;
      content: counter(line-numbers);
      width: calc(var(--max-line-number-characher) + 4px);
      @apply absolute left-0 top-0 -mx-4 bottom-0 text-center bg-gray-200 text-gray-500 flex justify-center items-center text-sm;
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
