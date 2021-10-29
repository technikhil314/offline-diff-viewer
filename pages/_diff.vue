<template>
  <p>{{ demo }} {{ diff }}</p>
</template>

<script>
export default {
  data() {
    return {
      demo: 'demo',
      diff: this.$route.params.diff,
    }
  },
}
</script>
