<template>
  <div>
    <p v-for="(lineDiff, index) in lhsDiff" :key="index">
      <span v-html="lineDiff"></span>
    </p>
    <p v-for="(lineDiff, index) in rhsDiff" :key="index">
      <span v-html="lineDiff"></span>
    </p>
  </div>
</template>

<script>
import DiffMatchPatch from 'diff-match-patch'
import { urlDecode } from '../../../helpers/utils'
const dmp = new DiffMatchPatch()
export default {
  lhs: '',
  rhs: '',
  diff: [],
  mounted() {
    const { lhs, rhs } = this.$route.params
    this.originalLhs = urlDecode(lhs).split('\n')
    this.originalRhs = urlDecode(rhs).split('\n')
    const diff = this.originalLhs.map((x, i) => {
      if (!this.originalRhs[i]) {
        this.originalRhs[i] = ''
      }
      return dmp.diff_main(x, this.originalRhs[i])
    })
    this.lhsDiff = diff.map((lineDiff) => {
      return lineDiff
        .map((item) => {
          if (item[0] === -1 || item[0] === 0) {
            const className = item[0] === -1 ? 'bg-red-300' : ''
            return `<pre class="inline mr-[-4px] p-0 m-0 ${className}">${item[1]}</pre>`
          }
          return ''
        })
        .filter(Boolean)
        .join('\n')
    })
    this.rhsDiff = diff.map((lineDiff) => {
      return lineDiff
        .map((item) => {
          if (item[0] === 1 || item[0] === 0) {
            const className = item[0] === 1 ? 'bg-green-300' : ''
            return `<pre class="inline mr-[-4px] p-0 m-0 ${className}">${item[1]}</pre>`
          }
          return ''
        })
        .filter(Boolean)
        .join('\n')
    })
    console.log(this.originalLhs, this.originalRhs, diff)
  },
  data() {
    return {
      diff: this.diff,
      originalRhs: this.originalRhs,
      originalLhs: this.originalLhs,
      lhsDiff: this.lhsDiff,
      rhsDiff: this.rhsDiff,
    }
  },
}
</script>
