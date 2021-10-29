<template>
  <div class="relative mt-24 xl:container">
    <div
      class="absolute top-0 right-0 flow-root p-4 transition-transform rounded-md shadow-md  z-2"
      v-bind:class="{
        '-translate-y-screen': !toastState.show,
        '-translate-y-0': !toastState.show,
        'bg-green-400': toastState.theme === 'success',
        'bg-blue-400': toastState.theme !== 'success',
      }"
    >
      <div class="flex justify-between gap-2">
        <div v-html="toastState.iconHTML"></div>
        <h1>{{ toastState.content }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    toastState() {
      return this.$store.state.toast
    },
  },
}
</script>
