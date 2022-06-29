<template>
  <button
    class="fixed p-4 text-gray-800 bg-gray-300 border border-gray-500 rounded-md  w-52 z-11 top-6 left-6 dark:bg-gray-700 dark:text-gray-50"
    @click="focusOnMain"
  >
    Skip to main content
  </button>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    focusOnMain() {
      document.getElementsByTagName('main')[0].focus()
    },
  },
})
</script>

<style scoped lang="scss">
button {
  opacity: 0;
  pointer-events: none;
}
button:focus {
  opacity: 1;
  pointer-events: all;
}
</style>
