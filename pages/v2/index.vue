<template>
  <div class="page-contents">
    <Navbar />
    <!-- Following hidden input is hacky way to update monaco editor theme when user changes theme manually -->
    <input
      type="hidden"
      inert
      :value="onThemeChange"
      class="invisible none"
      aria-hidden="true"
    />
    <main class="text-gray-800 outline-none dark:text-gray-50" tabindex="0">
      <section>
        <header>
          <h1 class="mb-2 w-full text-center text-md">
            Find difference in any two text blocks and get easy sharable link
          </h1>
          <h2 class="mb-2 w-full text-sm text-center">
            Don’t worry, We don’t store any of your data
          </h2>
        </header>
      </section>
      <form class="flex flex-col gap-4 w-full" @submit="checkForm">
        <section class="flex gap-4 w-full editor-wrapper">
          <div class="flex relative flex-col gap-4 w-1/2">
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
            <div
              id="lhs"
              name="lhs"
              class="p-2 h-screen rounded-md border border-gray-600 editor"
            ></div>
            <button
              aria-label="Beautify entered text"
              type="button"
              title="Beautify"
              class="absolute right-3 top-16 p-2 rounded-sm transition-all  aspect-square dark:hover:bg-slate-600 dark:bg-slate-600/50 hover:bg-slate-300 bg-gray-300/50"
              @click="
                lhsEditor.trigger('editor', 'editor.action.formatDocument')
              "
            >
              <PrettyCode class="w-4 h-4" />
            </button>
          </div>
          <div class="flex relative flex-col gap-4 w-1/2">
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
            <div
              id="rhs"
              name="rhs"
              class="p-2 h-screen rounded-md border border-gray-600 editor"
            ></div>
            <button
              aria-label="Beautify entered text"
              type="button"
              title="Beautify"
              class="absolute right-3 top-16 p-2 rounded-sm transition-all  aspect-square dark:hover:bg-slate-600 dark:bg-slate-600/50 hover:bg-slate-300 bg-gray-300/50"
              @click="
                rhsEditor.trigger('editor', 'editor.action.formatDocument')
              "
            >
              <PrettyCode class="w-4 h-4" />
            </button>
          </div>
        </section>
        <div class="flex relative flex-grow-0 gap-4 justify-center mt-4 w-full">
          <button
            id="submitButton"
            class="inline-flex gap-4 justify-center items-center px-4 py-2 w-40 text-gray-50 bg-blue-600 rounded-md shadow-lg transition-transform transform outline-none  focus:ring-4 active:scale-y-75 group"
            aria-label="Click here to compare the inputted text blocks"
          >
            Compare
            <span class="w-4 aspect-square group-hover:animate-linear-bounce">
              <Forward />
            </span>
          </button>
          <button
            class="inline-flex absolute right-0 gap-4 justify-center items-center px-4 py-2 text-gray-800 bg-yellow-300 rounded-md shadow-lg transition-transform transform outline-none  focus:ring-4 active:scale-y-75 group"
            aria-label="Click here to clear all the inputs"
            type="button"
            @click="clear"
          >
            <span class="w-4 aspect-square group-hover:animate-wiggle">
              <Bin />
            </span>
            Clear
          </button>
        </div>
      </form>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import pako from 'pako'
import loader from '@monaco-editor/loader'
import {
  doUrlSafeBase64,
  getMonacoEditorDefaultOptions,
} from '../../helpers/utils'
import showTutorials from '../../helpers/driverjsTutorials'
import Navbar from '~/components/v2/navbar.vue'
import Footer from '~/components/v2/footer.vue'
import Bin from '~/components/icons/bin.vue'
import Forward from '~/components/icons/forward.vue'
import PrettyCode from '~/components/icons/prettyCode.vue'
import { DIFF_USER_BLANK_SIDE_ERROR } from '~/constants/messages'
export default Vue.extend({
  components: { Navbar, Footer, Bin, Forward, PrettyCode },
  layout: 'main',
  data() {
    return {
      ...this.$store.state.data,
      lhsEditor: null,
      rhsEditor: null,
    }
  },
  computed: {
    onThemeChange() {
      const theme = this.$store.state.theme.darkMode ? 'vs-dark' : 'light'
      this.lhsEditor?.updateOptions({ theme })
      this.rhsEditor?.updateOptions({ theme })
      return this.$store.state.theme.darkMode
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleCtrlEnter)
    // Hover on each property to see its docs!
    const lhs = document.getElementById('lhs')
    const rhs = document.getElementById('rhs')
    const theme = this.$cookies.isDarkMode ? 'vs-dark' : 'light'
    const monacoEditorOptions = getMonacoEditorDefaultOptions(theme)
    loader.init().then((monaco) => {
      showTutorials(this.$cookies, this.$route.path, this.$cookies.isDarkMode)
      if (lhs) {
        this.lhsEditor = monaco.editor.create(lhs, {
          ...monacoEditorOptions,
          value: this.lhs || '',
          wordWrap: 'on',
        })
      }
      if (rhs) {
        this.rhsEditor = monaco.editor.create(rhs, {
          ...monacoEditorOptions,
          value: this.rhs || '',
          wordWrap: 'on',
        })
      }
    })
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleCtrlEnter)
  },
  methods: {
    handleCtrlEnter(event: KeyboardEvent) {
      const { metaKey, ctrlKey, key } = event
      if ((metaKey || ctrlKey) && key === 'Enter') {
        const button: HTMLButtonElement = document.getElementById(
          'submitButton'
        ) as HTMLButtonElement
        button.click()
      }
    },
    checkForm(e: Event) {
      e.preventDefault()
      const formData = new FormData(e.currentTarget as HTMLFormElement)
      const originalLhs = this.lhsEditor.getValue()
      const originalRhs = this.rhsEditor.getValue()
      const lhsLabel = formData.get('lhsLabel') as string
      const rhsLabel = formData.get('rhsLabel') as string
      if (!originalLhs || !originalRhs) {
        this.showError()
        return
      }
      const lhs = originalLhs.trim()
      const rhs = originalRhs.trim()
      this.$store.commit('data/set', {
        lhs: originalLhs,
        rhs: originalRhs,
        lhsLabel,
        rhsLabel,
      })
      const gzip = Buffer.from(
        pako.gzip(
          JSON.stringify({
            lhs,
            rhs,
            lhsLabel,
            rhsLabel,
          })
        )
      ).toString('base64')
      this.$router.push({
        path: '/v2/diff',
        hash: `#${doUrlSafeBase64(gzip)}`,
      })
    },
    showError() {
      this.$store.commit('toast/show', {
        show: true,
        content: DIFF_USER_BLANK_SIDE_ERROR,
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
    clear() {
      this.lhsEditor.getModel().setValue('')
      this.rhsEditor.getModel().setValue('')
    },
  },
})
</script>

<style scoped>
main {
  @apply grid gap-2;

  margin-top: 1rem;
  grid-template-rows: 100px 1fr;
  @media screen and (min-width: 768px) {
    grid-template-rows: 60px 1fr;
  }
}
.editor,
.editor-wrapper {
  max-height: max(500px, calc(100vh - 18rem));
}
</style>
