<template>
  <div class="page-contents">
    <Navbar :show-back-button="true" />
    <main class="outline-none" tabindex="0">
      <DiffActionBar />
      <section
        class="flex items-stretch w-full gap-4 font-mono text-gray-800  dark:text-gray-50"
      >
        <SingleDiff
          :id="'lhsDiff'"
          :is-sroll-in-sync-enabled="isSrollInSyncEnabled"
          :modified-class-string="'bg-red-200 dark:bg-red-800'"
          :label="lhsLabel"
          :diff="lhsDiff"
        />
        <SingleDiff
          :id="'rhsDiff'"
          :is-sroll-in-sync-enabled="isSrollInSyncEnabled"
          :modified-class-string="'bg-green-200 dark:bg-green-700'"
          :label="rhsLabel"
          :diff="rhsDiff"
        />
      </section>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import pako from 'pako'
import { undoUrlSafeBase64, escapeHtml } from '../../helpers/utils'
import showTutorials from '../../helpers/driverjsTutorials'
export default Vue.extend({
  layout: 'main',
  data() {
    return {
      lhsDiff: this.lhsDiff || [],
      rhsDiff: this.rhsDiff || [],
      rhsLabel: this.rhsLabel || '',
      lhsLabel: this.lhsLabel || '',
      isSrollInSyncEnabled: this.isSrollInSyncEnabled,
    }
  },
  beforeCreate() {
    const _diff = this.$route.hash
    if (_diff) {
      const gunzip = pako.ungzip(
        Buffer.from(undoUrlSafeBase64(_diff), 'base64')
      )
      const diffData = JSON.parse(Buffer.from(gunzip).toString('utf8'))
      const { diff, lhsLabel, rhsLabel } = diffData
      this.lhsLabel = lhsLabel
      this.rhsLabel = rhsLabel
      this.lhsDiff = diff
        .map((item) => {
          const hunkState = item[0]
          if (hunkState === -1 || hunkState === 0) {
            const className =
              hunkState === -1 ? 'isModified bg-red-300 dark:bg-red-500' : ''
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
              hunkState === 1 ? 'isModified bg-green-400 dark:bg-green-900' : ''
            return `<span class="break-all inline p-0 m-0 ${className}">${escapeHtml(
              item[1]
            )}</span>`
          }
          return false
        })
        .filter(Boolean)
        .join('')
        .split('\n')
    }
  },
  mounted() {
    const isLHSBigger = this.lhsDiff.length > this.rhsDiff.length
    const maxLineCount = isLHSBigger ? this.lhsDiff.length : this.rhsDiff.length
    document.documentElement.style.setProperty(
      '--max-line-number-characher',
      `${`${maxLineCount}`.split('').length}ch`
    )
    showTutorials(this.$cookies, this.$route.path, this.$cookies.isDarkMode)
  },
})
</script>
