<template>
  <div class="page-contents">
    <Navbar />
    <main class="text-gray-800 outline-none dark:text-gray-50" tabindex="0">
      <section>
        <header>
          <h1 class="w-full mb-2 text-xl text-center">
            Find difference in any two text blocks and get easy sharable link
          </h1>
          <h2 class="w-full mb-2 text-center text-md">
            Don’t worry, We don’t store any of your data
          </h2>
        </header>
      </section>
      <form class="flex flex-col w-full gap-4" @submit="checkForm">
        <section class="flex w-full gap-4">
          <div class="flex flex-col w-1/2 gap-4">
            <label for="lhsLabel" class="relative">
              <input
                id="lhsLabel"
                name="lhsLabel"
                type="text"
                class="flex-1 flex-grow-0 w-full bg-transparent rounded-md"
                placeholder="Add label to this text block"
                :value="lhsLabel"
              />
              <span class="sr-only">Add label to this original text block</span>
            </label>
            <textarea
              id="lhs"
              rows="28"
              name="lhs"
              class="flex-1 w-full bg-transparent rounded-md resize-none  form-textarea"
              v-html="lhs"
            ></textarea>
          </div>
          <div class="flex flex-col w-1/2 gap-4">
            <label for="lhsLabel" class="relative">
              <input
                id="rhsLabel"
                name="rhsLabel"
                type="text"
                class="flex-1 flex-grow-0 w-full bg-transparent rounded-md"
                placeholder="Add label to this text block"
                :value="rhsLabel"
              />
              <span class="sr-only">Add label to this changed text block</span>
            </label>
            <textarea
              id="rhs"
              rows="28"
              name="rhs"
              class="flex-1 w-full bg-transparent rounded-md resize-none  form-textarea"
              v-html="rhs"
            >
            </textarea>
          </div>
        </section>
        <div class="self-end flex-grow-0 w-full text-center">
          <button
            class="inline-flex items-center justify-center w-48 px-4 py-2 transition-transform transform bg-blue-600 rounded-md shadow-lg outline-none  text-gray-50 focus:ring-4 active:scale-y-75"
            aria-label="Click here to compare the inputted text blocks"
            id="submitButton"
          >
            Compare
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<script lang="ts">
import DiffMatchPatch from 'diff-match-patch'
import Vue from 'vue'
import pako from 'pako'
import { doUrlSafeBase64 } from '../helpers/utils'
import showTutorials from '../helpers/driverjsTutorials'
const dmp = new DiffMatchPatch()
export default Vue.extend({
  layout: 'main',
  data() {
    return {
      ...this.$store.state.data,
    }
  },
  mounted() {
    showTutorials(this.$cookies, this.$route.path, this.$cookies.isDarkMode)
    document.addEventListener('keydown', (event) => {
      const { metaKey, ctrlKey, key } = event
      if ((metaKey || ctrlKey) && key === 'Enter') {
        const button: HTMLButtonElement = document.getElementById(
          'submitButton'
        ) as HTMLButtonElement
        button.click()
      }
    })
  },
  methods: {
    checkForm(e: Event) {
      e.preventDefault()
      const formData = new FormData(e.currentTarget as HTMLFormElement)
      const lhs = formData.get('lhs')
      const rhs = formData.get('rhs')
      const lhsLabel = formData.get('lhsLabel')
      const rhsLabel = formData.get('rhsLabel')
      if (!lhs || !rhs) {
        this.showError()
        return
      }
      const originalLhs = lhs
      const originalRhs = rhs
      this.$store.commit('data/set', {
        lhs,
        rhs,
        lhsLabel,
        rhsLabel,
      })
      const diff = dmp.diff_main(originalLhs, originalRhs)
      const gzip = Buffer.from(
        pako.gzip(
          JSON.stringify({
            diff,
            lhsLabel,
            rhsLabel,
          })
        )
      ).toString('base64')
      this.$router.push({
        path: '/v1/diff',
        hash: `#${doUrlSafeBase64(gzip)}`,
      })
    },
    showError() {
      this.$store.commit('toast/show', {
        show: true,
        content: 'Please enter some data on both sides to compare',
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

<style scoped>
main {
  @apply grid gap-4;

  grid-template-rows: 100px 1fr;
  @media screen and (min-width: 768px) {
    grid-template-rows: 60px 1fr;
  }
}
</style>
