<template>
  <div id="swapDiffContentSection" class="inline-flex gap-1 items-center">
    <button
      id="swapDiffContent"
      class="inline-flex gap-1 justify-center items-center px-1 py-1 text-sm text-gray-600 bg-gray-300 rounded-sm border border-gray-800 transition-transform transform  focus-visible:ring-4 dark:border-gray-400 dark:text-white dark:bg-gray-800 align-center active:scale-y-75 hover:scale-105 hover:shadow-lg"
      aria-label="Swap content"
      title="Swap content"
      type="button"
      @click="clickHandler"
    >
      <Swap />
      <span aria-hidden="true">Swap</span>
    </button>
  </div>
</template>
<script>
import Vue from 'vue'
import Swap from '~/components/icons/swap.vue'
export default Vue.extend({
  components: { Swap },
  props: {
    clickHandler: {
      type: Function,
      required: true,
    },
  },
})
</script>
