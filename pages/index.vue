<template>
  <div class="contents">
    <Navbar />
    <main class="flex flex-wrap h-full -mt-3 xl:container">
      <p class="w-full mb-2 text-xl text-center">Compare any text for diff</p>
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
              class="w-64 px-4 py-3 text-white transition-transform transform bg-blue-600 rounded-md shadow-lg outline-none  focus:ring-4 active:scale-y-75"
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
