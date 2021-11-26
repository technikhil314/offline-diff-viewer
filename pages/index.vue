<template>
  <div class="flow-root h-full page-root">
    <Navbar />
    <main class="flex flex-wrap h-full mt-20 xl:container">
      <h1 class="w-full mb-2 text-xl text-center">
        Find difference in any two text blocks and get easy sharable link
      </h1>
      <h2 class="w-full mb-2 text-center text-md">
        Dont worry, We dont store any of your data
      </h2>
      <form @submit="checkForm" class="w-full h-full">
        <div class="flex flex-wrap w-full h-full gap-4">
          <textarea
            id="lhs"
            class="flex-1 h-full max-h-full rounded-md resize-none  form-textarea"
          ></textarea>
          <textarea
            id="rhs"
            class="flex-1 h-full max-h-full rounded-md resize-none  form-textarea"
          ></textarea>
          <div class="self-end w-full text-center">
            <button
              class="inline-flex items-center justify-center w-48 px-4 py-2 text-white transition-transform transform bg-blue-600 rounded-md shadow-lg outline-none  focus:ring-4 active:scale-y-75"
            >
              Compare
            </button>
          </div>
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
const dmp = new DiffMatchPatch()
export default Vue.extend({
  layout: 'main',
  methods: {
    checkForm(e: any) {
      e.preventDefault()
      const lhsTextArea: HTMLTextAreaElement = document.getElementById(
        'lhs'
      ) as HTMLTextAreaElement
      const lhs: string = lhsTextArea?.value || ''
      const rhsTextArea: HTMLTextAreaElement = document.getElementById(
        'rhs'
      ) as HTMLTextAreaElement
      const rhs: string = rhsTextArea?.value || ''
      if (!lhs || !rhs) {
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
        return
      }
      const originalLhs = lhs.split('\n')
      const originalRhs = rhs.split('\n')
      const diff = originalLhs.map((x, i) => {
        if (!originalRhs[i]) {
          originalRhs[i] = ''
        }
        return dmp.diff_main(x, originalRhs[i])
      })
      if (originalLhs.length > originalRhs.length) {
        for (
          let i = originalLhs.length - diff.length;
          i < originalLhs.length;
          i++
        ) {
          diff.push([[-1, originalLhs[i]]])
        }
      }
      if (originalLhs.length < originalRhs.length) {
        for (
          let i = originalRhs.length - diff.length;
          i < originalRhs.length;
          i++
        ) {
          diff.push([[1, originalRhs[i]]])
        }
      }
      const gzip = Buffer.from(pako.gzip(JSON.stringify(diff))).toString(
        'base64'
      )
      this.$router.push({
        path: `/diff/${doUrlSafeBase64(gzip)}`,
      })
    },
  },
})
</script>
<style>
.page-root {
  max-height: calc(100% - 14rem);
}
</style>
