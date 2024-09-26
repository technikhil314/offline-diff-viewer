<template>
  <div class="page-root">
    <SkipToNav />
    <Toast />
    <Nuxt />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import SkipToNav from '~/components/buttons/skipToNav.vue'
export default Vue.extend({
  components: { SkipToNav },
})
</script>
