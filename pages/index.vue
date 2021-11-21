<template>
  <form @submit="checkForm">
    <textarea id="lhs" cols="30" rows="10"></textarea>
    <textarea id="rhs" cols="30" rows="10"></textarea>
    <button>submit</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { urlEncode } from '../helpers/utils'
export default Vue.extend({
  methods: {
    checkForm: (e: any) => {
      e.preventDefault()
      const lhsTextArea: HTMLTextAreaElement = document.getElementById(
        'lhs'
      ) as HTMLTextAreaElement
      const lhs: string = lhsTextArea?.value || ''
      const rhsTextArea: HTMLTextAreaElement = document.getElementById(
        'rhs'
      ) as HTMLTextAreaElement
      const rhs: string = rhsTextArea?.value || ''
      this.$router.push({
        path: `/diff/${urlEncode(lhs)}/${urlEncode(rhs)}`,
      })
    },
  },
})
</script>
