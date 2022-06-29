<template>
  <div id="nextDiffSection" class="inline-flex items-center gap-1">
    <button
      id="nextDiff"
      class="inline-flex items-center justify-center px-1 py-1 text-sm text-gray-600 transition-transform transform bg-gray-300 border border-gray-800 rounded-sm outline-none dark:border-gray-400 dark:text-white dark:bg-gray-800 align-center focus:ring-4 active:scale-y-75 hover:scale-105 hover:shadow-lg"
      aria-label="Go to next diff"
      type="button"
      @click="clickHandler"
    >
      Next diff
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
          d="M16 17l-4 4m0 0l-4-4m4 4V3"
        ></path>
      </svg>
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
      },
    })
  </script>
</template>
