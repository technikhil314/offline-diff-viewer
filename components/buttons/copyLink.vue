<template>
  <div>
    <button
      type="button"
      class="inline-flex items-center justify-center gap-1 p-2 text-sm transition-transform transform rounded-md shadow outline-none  justify-self-end focus:ring-4 active:scale-y-75 hover:scale-105 hover:shadow-lg copy-uri-button"
      aria-label="Click here to copy url to clipboard"
      id="copyLinkButton"
      :class="{
        'bg-blue-500 text-white': !copied,
        'bg-green-500 text-gray-800': copied,
      }"
      @click="clickHandler"
    >
      <span v-show="copied" class="inline">
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          ></path>
        </svg>
      </span>
      <span v-show="copied" class="hidden md:inline-block">Copied</span>
      <span v-show="!copied" class="inline">
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          ></path>
        </svg>
      </span>
      <span v-show="!copied" class="hidden md:inline-block">Copy link</span>
    </button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    clickHandler: {
      type: Function,
      required: true,
    },
    copied: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
