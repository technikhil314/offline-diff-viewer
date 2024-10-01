<template>
  <svg
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="className"
  >
    <path
      d="M0 7.5h2m13 0h-2m-8 7H3.5a2 2 0 01-2-2v-10a2 2 0 012-2H5m5 14h1.5a2 2 0 002-2v-10a2 2 0 00-2-2H10"
      stroke="currentColor"
    ></path>
  </svg>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    className: {
      type: String,
      required: false,
    },
  },
})
</script>
