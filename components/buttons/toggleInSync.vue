<template>
  <div id="toggleScrollInSyncSection" class="inline-flex items-center gap-1">
    <label
      for="toggleScrollInSync"
      class="text-gray-800 select-none dark:text-gray-50"
    >
      Scroll in sync
    </label>
    <input
      id="toggleScrollInSync"
      type="checkbox"
      checked
      class="form-checkbox"
      @click="clickHandler"
    />
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
