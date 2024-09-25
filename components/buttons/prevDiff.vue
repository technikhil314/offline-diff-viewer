<template>
  <div id="prevDiffSection" class="inline-flex items-center gap-1">
    <button
      id="prevDiff"
      class="
        inline-flex
        items-center
        justify-center
        px-1
        py-1
        text-sm text-gray-600
        transition-transform
        transform
        bg-gray-300
        border border-gray-800
        rounded-sm
        outline-none
        dark:border-gray-400 dark:text-white dark:bg-gray-800
        align-center
        focus:ring-4
        active:scale-y-75
        hover:scale-105 hover:shadow-lg
      "
      aria-label="Go to previous diff"
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
