<template>
  <div id="nextDiffSection" class="inline-flex gap-1 items-center">
    <button
      id="nextDiff"
      class="inline-flex justify-center items-center px-1 py-1 text-sm text-gray-600 bg-gray-300 rounded-sm border border-gray-800 transition-transform transform  dark:border-gray-400 dark:text-white dark:bg-gray-800 align-center focus-visible:ring-4 active:scale-y-75 hover:scale-105 hover:shadow-lg"
      aria-label="Go to next diff"
      title="Go to next diff"
      type="button"
      @click="clickHandler"
    >
      <Down />
      <span aria-hidden="true">Next diff</span>
    </button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Down from '~/components/icons/down.vue'
export default Vue.extend({
  components: { Down },
  props: {
    clickHandler: {
      type: Function,
      required: true,
    },
  },
})
</script>
