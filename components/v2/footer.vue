<template>
  <footer
    class="sticky pt-4 pb-2 mt-2 text-center text-gray-800  top-full bg-inherit dark:text-gray-50 min-h-max"
  >
    Made with &hearts; using
    <a
      href="https://nuxtjs.org"
      title="nuxtjs a vuejs based framework inspired by nextjs"
      aria-label="nuxtjs a vuejs based framework inspired by nextjs"
    >
      <Nuxt />
    </a>
    <span>&</span>
    <a
      href="https://tailwindcss.com/"
      title="tailwind css"
      aria-label="tailwind css"
    >
      <Tailwind />
    </a>
    by &copy;
    <a
      href="https://technikhil314.netlify.app"
      class="hover:underline underline-offset-2"
      >Nikhil Mehta</a
    >
  </footer>
</template>
<script lang="ts">
import Vue from 'vue'
import Tailwind from '~/components/icons/tailwind.vue'
import Nuxt from '~/components/icons/nuxt.vue'
export default Vue.extend({
  components: { Tailwind, Nuxt },
})
</script>
