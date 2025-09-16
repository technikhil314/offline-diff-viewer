<template>
  <div class="contents">
    <div class="page-contents">
      <!-- Following hidden input is hacky way to update monaco editor theme when user changes theme manually -->
      <input
        type="hidden"
        class="invisible none"
        aria-hidden="true"
        inert
        :value="onThemeChange"
      />
      <Navbar :show-back-button="true" />
      <main class="outline-none" tabindex="0">
        <DiffActionBar
          :diff-navigator="diffNavigator"
          :on-diff-fashion="toggleDiffFashion"
        />
        <section
          class="flex flex-wrap gap-4 items-stretch w-full font-mono text-gray-800  dark:text-gray-50"
        >
          <div
            :class="{
              'flex w-full gap-4 space-around transition-opacity': true,
              'opacity-0': !isSideBySideDiff,
            }"
          >
            <p
              class="flex-grow-0 flex-shrink-0 w-1/2 text-lg font-bold text-center capitalize break-all"
            >
              <span class="inline-block w-4/5">{{ lhsLabel }}</span>
            </p>
            <p
              class="flex-grow-0 flex-shrink-0 w-1/2 text-lg font-bold text-center capitalize break-all"
            >
              <span class="inline-block w-4/5">{{ rhsLabel }}</span>
            </p>
          </div>
          <div
            v-show="!e2eDataStatusText"
            id="monaco-diff-viewer"
            class="p-2 w-full h-screen rounded-md border border-gray-600 editor"
          ></div>
          <div
            v-if="e2eDataStatusText"
            role="alert"
            aria-busy="true"
            aria-live="polite"
            class="grid place-items-center p-2 w-full h-screen rounded-md border border-gray-600  editor"
          >
            <h1 class="text-xl font-bold text-center">
              {{ e2eDataStatusText }}
            </h1>
          </div>
        </section>
      </main>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import loader from '@monaco-editor/loader'
import pako from 'pako'
import Vue from 'vue'
import {
  getMonacoEditorDefaultOptions,
  undoUrlSafeBase64,
} from '../../helpers/utils'
import DiffActionBar from '~/components/v2/diffActionBar.vue'
import Footer from '~/components/v2/footer.vue'
import Navbar from '~/components/v2/navbar.vue'
import { getDecryptedText, getDepryctionKey } from '~/helpers/decrypt'
import { v2DiffData } from '~/helpers/types'
import {
  E2E_DATA_DECRYPTING_INFO,
  E2E_DATA_DECRYPTION_ERROR,
  E2E_DATA_FETCH_ERROR,
  E2E_DATA_FINALIZING_INFO,
  E2E_DATA_LOADING_INFO,
  E2E_DATA_NO_LONGER_AVAILABLE_ERROR,
} from '~/constants/messages'
import showTutorials from '~/helpers/driverjsTutorials'
export default Vue.extend({
  components: { DiffActionBar, Navbar, Footer },
  layout: 'main',
  data(): v2DiffData {
    return {
      lhs: '',
      rhs: '',
      rhsLabel: '',
      lhsLabel: '',
      monacoDiffEditor: {},
      diffNavigator: {},
      isSideBySideDiff: true,
      e2eDataStatusText: '',
    }
  },
  head() {
    return {
      title: 'Diff view | Diff Viewer',
    }
  },
  computed: {
    onThemeChange() {
      const theme = this.$store.state.theme.darkMode ? 'vs-dark' : 'light'
      this.monacoDiffEditor?.updateOptions?.({ theme })
      return this.$store.state.theme.darkMode
    },
  },
  beforeMount() {
    if (!window.location.search.includes('id=')) {
      const _diff = this.$route.hash
      if (_diff) {
        this.unzipCommitData(_diff)
      }
    }
  },
  mounted() {
    if (window.location.search.includes('id=')) {
      this.getE2EData().then((data: string | null) => {
        if (!data) {
          return
        }
        this.unzipCommitData(data)
        this.e2eDataStatusText = ''
        this.renderDiff()
      })
    } else {
      this.renderDiff()
    }
  },
  methods: {
    toggleDiffFashion(value: boolean) {
      this.monacoDiffEditor?.updateOptions?.({ renderSideBySide: value })
      this.isSideBySideDiff = value
    },
    async getE2EData() {
      this.e2eDataStatusText = E2E_DATA_LOADING_INFO
      const url = new URL(window.location.href)
      const id = url.searchParams.get('id')
      const key = url.hash.replace(/^#/, '')
      let response = null
      let data = null
      try {
        response = await fetch(`/api/getLink?id=${id}`)
        data = await response.json()
      } catch (error) {
        console.error(error)
        this.e2eDataStatusText = E2E_DATA_FETCH_ERROR
        return null
      }
      try {
        if (data.length === 0) {
          this.e2eDataStatusText = E2E_DATA_NO_LONGER_AVAILABLE_ERROR
          return null
        }
        this.e2eDataStatusText = E2E_DATA_DECRYPTING_INFO
        await new Promise((resolve) => setTimeout(resolve, 500))
        const { data: encryptedData } = data[0]
        const decryptionKey = await getDepryctionKey(key)
        const decryptedData = await getDecryptedText(
          encryptedData,
          decryptionKey
        )
        this.e2eDataStatusText = E2E_DATA_FINALIZING_INFO
        await new Promise((resolve) => setTimeout(resolve, 500))
        return decryptedData
      } catch (error) {
        console.error(error)
        this.e2eDataStatusText = E2E_DATA_DECRYPTION_ERROR
        return null
      }
    },
    renderDiff() {
      const monacoDiffViewerEl = document.getElementById('monaco-diff-viewer')
      const theme = this.$cookies.isDarkMode ? 'vs-dark' : 'light'
      const monacoEditorOptions = getMonacoEditorDefaultOptions(theme)
      loader.init().then((monaco) => {
        if (monacoDiffViewerEl) {
          this.monacoDiffEditor = monaco.editor.createDiffEditor(
            monacoDiffViewerEl,
            {
              ...monacoEditorOptions,
              readOnly: true,
              wordWrap: 'on',
              diffAlgorithm: 'advanced',
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
        showTutorials(this.$cookies, this.$route.path, this.$cookies.isDarkMode)
      })
    },
    unzipCommitData(data: string) {
      const gunzip = pako.ungzip(Buffer.from(undoUrlSafeBase64(data), 'base64'))
      const diffData = JSON.parse(Buffer.from(gunzip).toString('utf8'))
      const { lhs, rhs, lhsLabel, rhsLabel } = diffData
      this.lhsLabel = lhsLabel
      this.rhsLabel = rhsLabel
      this.lhs = lhs
      this.rhs = rhs
      this.$store.commit('data/set', {
        lhs: this.lhs,
        rhs: this.rhs,
        lhsLabel: this.lhsLabel,
        rhsLabel: this.rhsLabel,
      })
    },
  },
})
</script>

<style>
.editor {
  max-height: max(500px, calc(100vh - 17rem));
}
</style>
