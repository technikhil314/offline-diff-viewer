<template>
  <div class="page-contents">
    <Navbar :show-back-button="true" />
    <main class="outline-none" tabindex="0">
      <DiffActionBar :diff-navigator="diffNavigator" />
      <section
        class="flex items-stretch w-full gap-4 font-mono text-gray-800 dark:text-gray-50"
      >
        <div
          id="monaco-diff-viewer"
          class="w-full h-screen p-2 border border-gray-600 rounded-md editor"
        ></div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import pako from 'pako'
import loader from '@monaco-editor/loader'
import Vue from 'vue'
import { getMonacoEditorDefaultOptions, undoUrlSafeBase64 } from '../../helpers/utils'
import DiffActionBar from '~/components/v2/diffActionBar.vue'
import Navbar from '~/components/v2/navbar.vue'
import { v2DiffData } from '~/helpers/types'
export default Vue.extend({
  components: { DiffActionBar, Navbar },
  layout: 'main',
  data(): v2DiffData {
    return {
      lhs: "",
      rhs: "",
      rhsLabel: '',
      lhsLabel: '',
      monacoDiffEditor: {},
      diffNavigator: {},
    }
  },
  beforeMount() {
    const _diff = this.$route.hash
    if (_diff) {
      const gunzip = pako.ungzip(
        Buffer.from(undoUrlSafeBase64(_diff), 'base64')
      )
      const diffData = JSON.parse(Buffer.from(gunzip).toString('utf8'))
      const { lhs, rhs, lhsLabel, rhsLabel } = diffData
      this.lhsLabel = lhsLabel
      this.rhsLabel = rhsLabel
      this.lhs = lhs
      this.rhs = rhs
    }
  },
  mounted() {
    const monacoDiffViewerEl = document.getElementById('monaco-diff-viewer')
    const theme = this.$cookies.isDarkMode ? 'vs-dark' : 'light'
    const monacoEditorOptions = getMonacoEditorDefaultOptions(theme);
    loader.init().then((monaco) => {
      if (monacoDiffViewerEl) {
        this.monacoDiffEditor = monaco.editor.createDiffEditor(
          monacoDiffViewerEl,
          {
            ...monacoEditorOptions,
            readOnly: true,
            wordWrap: 'on'
          }
        ) as any
        if (this.monacoDiffEditor) {
          this.monacoDiffEditor.setModel({
            original: monaco.editor.createModel(this.lhs, 'javascript'),
            modified: monaco.editor.createModel(this.rhs, 'javascript'),
          })
          this.diffNavigator = monaco.editor.createDiffNavigator(
            this.monacoDiffEditor,
            {
              followsCaret: true,
              ignoreCharChanges: true,
              alwaysRevealFirst: true,
            }
          )
        }
      }
    })
  },
})
</script>

<style>
.editor {
  max-height: calc(100vh - 15rem);
}
</style>
