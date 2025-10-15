<template>
  <div id="prevDiffSection" class="inline-flex gap-1 items-center">
    <button
      id="prevDiff"
      class="inline-flex justify-center items-center px-1 py-1 text-sm text-gray-600 bg-gray-300 rounded-sm border border-gray-800 transition-transform transform  focus-visible:ring-4 dark:border-gray-400 dark:text-white dark:bg-gray-800 align-center active:scale-y-75 hover:scale-105 hover:shadow-lg"
      aria-label="Go to previous diff"
      title="Go to previous diff"
      type="button"
      @click="clickHandler"
    >
      <Up />
      <span aria-hidden="true">Previous diff</span>
    </button>
  </div>
</template>
<script>
import Vue from 'vue'
import Up from '~/components/icons/up.vue'
export default Vue.extend({
  components: { Up },
  props: {
    clickHandler: {
      type: Function,
      required: true,
    },
  },
})
</script>
