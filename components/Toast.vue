<template>
  <div id="toast" class="fixed right-[20px] top-24 z-11">
    <div
      class="
        absolute
        top-0
        right-[20px]
        flow-root
        p-4
        transition-transform
        rounded-md
        shadow-md
        w-72
      "
      :class="{
        '-translate-y-screen': !toastState.show,
        'translate-y-0': toastState.show,
        'bg-green-400 text-gray-800': toastState.theme === 'success',
        'bg-red-400 text-white': toastState.theme === 'error',
        'bg-blue-400 text-gray-800': toastState.theme === 'info',
      }"
    >
      <div class="flex items-center justify-between gap-2">
        <div v-html="toastState.iconHTML"></div>
        <h1>{{ toastState.content }}</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    toastState() {
      return this.$store.state.toast
    },
  },
})
</script>
