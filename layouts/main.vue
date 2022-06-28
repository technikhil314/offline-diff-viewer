<template>
  <div class="page-root">
    <SkipToNav />
    <Toast />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import SkipToNav from '~/components/buttons/skipToNav.vue'
export default {
  components: { SkipToNav },
}
</script>
