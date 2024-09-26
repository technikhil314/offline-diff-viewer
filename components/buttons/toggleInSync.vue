<template>
  <div id="toggleScrollInSyncSection" class="inline-flex items-center gap-1">
    <label
      id="toggleScrollInSyncLabel"
      for="toggleScrollInSync"
      class="text-gray-800 select-none dark:text-gray-50"
      aria-controls="toggleScrollInSync"
    >
      Scroll in sync
    </label>
    <input
      id="toggleScrollInSync"
      aria-labelledby="toggleScrollInSyncLabel"
      type="checkbox"
      :checked="isEnabled"
      class="form-checkbox"
      @click="toggleInSyncScroll"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    isEnabled() {
      return this.$store.state.scrollInSync.isEnabled
    },
  },
  methods: {
    toggleInSyncScroll() {
      this.$store.commit('scrollInSync/toggle')
    },
  },
})
</script>
