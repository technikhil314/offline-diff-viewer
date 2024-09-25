<template>
  <div id="nextDiffSection" class="inline-flex items-center gap-1">
    <button
      id="nextDiff"
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
      aria-label="Go to next diff"
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
