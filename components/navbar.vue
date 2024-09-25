<template>
  <nav
    class="
      sticky
      top-0
      left-0
      right-0
      z-10
      text-gray-800
      shadow-lg
      dark:shadow-dark
      bg-gray-50
      dark:bg-gray-900 dark:text-gray-50
    "
  >
    <div class="container flex items-center py-4 m-auto">
      <div
        v-if="showBackButton"
        id="backToDataLink"
        class="hidden mr-4 md:block hover:scale-110 filter hover:drop-shadow-md"
      >
        <NuxtLink to="/">
          <Back />
        </NuxtLink>
      </div>
      <div class="flex-shrink-0 mr-6">
        <NuxtLink to="/">
          <Brand />
        </NuxtLink>
      </div>

      <div class="flex items-center justify-between flex-1">
        <div class="items-center w-1/2">
          <a
            href="https://github.com/technikhil314/offline-diff-viewer/stargazers"
            title="github stars on this open source project"
          >
            <img
              src="https://img.shields.io/github/stars/technikhil314/offline-diff-viewer?style=social"
              alt=""
            />
          </a>
          <slot name="left" />
        </div>
        <div class="flex items-center justify-end w-1/2 gap-4">
          <slot name="right" />
          <button
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              ml-4
              bg-transparent
              border-2 border-gray-700
              rounded-full
              shadow-lg
              w-9
              h-9
              active:scale-y-75
              hover:scale-105 hover:shadow-lg
            "
            aria-label="Toggle Dark Mode"
            @click="toggleDarkMode"
          >
            <Sun v-if="darkMode" />
            <Moon v-if="!darkMode" />
          </button>
        </div>
      </div>
      <!-- buttons -->
      <nav class="contents">
        <ul class="flex items-center justify-end">
          <li class="relative inline-block ml-2 lg:ml-4">
            <a
              href="https://github.com/technikhil314/offline-diff-viewer"
              title="go to github repository of this open source project"
            >
              <Github />
            </a>
          </li>
          <li class="relative inline-block ml-2 lg:ml-4">
            <a
              href="https://github.com/sponsors/technikhil314"
              title="If you like and enjoy using this product then please considering sponsoring my work."
            >
              <Sponsor />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import Github from '~/components/icons/github.vue'
import Back from '~/components/icons/back.vue'
import Sun from '~/components/icons/sun.vue'
import Moon from '~/components/icons/moon.vue'
import Brand from '~/components/icons/brand.vue'
import Sponsor from '~/components/icons/sponsor.vue'
let darkMode: Boolean | null = null
export default Vue.extend({
  components: { Github, Sun, Moon, Back, Brand, Sponsor },
  props: {
    showBackButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      darkMode,
    }
  },
  mounted() {
    if (darkMode === null) {
      darkMode = this.$cookies.isDarkMode
      if (darkMode) {
        document.documentElement.classList.add('dark')
        document.cookie = `darkMode=${darkMode}; Secure; max-age=31536000; path=/;`
      }
    }
    document.documentElement.classList.remove('hidden')
  },
  methods: {
    toggleDarkMode() {
      darkMode = !darkMode
      document.documentElement.classList[darkMode ? 'add' : 'remove']('dark')
      document.cookie = `darkMode=${darkMode}; Secure; max-age=31536000; path=/;`
    },
  },
})
</script>
