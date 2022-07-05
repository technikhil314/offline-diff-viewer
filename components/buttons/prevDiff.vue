<template>
  <div id="prevDiffSection" class="inline-flex items-center gap-1">
    <button
      id="prevDiff"
      class="inline-flex items-center justify-center px-1 py-1 text-sm text-gray-600 transition-transform transform bg-gray-300 border border-gray-800 rounded-sm outline-none  dark:border-gray-400 dark:text-white dark:bg-gray-800 align-center focus:ring-4 active:scale-y-75 hover:scale-105 hover:shadow-lg"
      aria-label="Go to previous diff"
      type="button"
      @click="clickHandler"
    >
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
          d="M8 7l4-4m0 0l4 4m-4-4v18"
        ></path>
      </svg>
      Previous diff
    </button>
  </div>
</template>
<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    clickHandler: {
      type: Function,
      required: true,
    },
  },
})
</script>
