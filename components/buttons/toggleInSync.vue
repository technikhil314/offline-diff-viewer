<template>
  <div id="toggleScrollInSyncSection" class="inline-flex items-center gap-1">
    <label
      for="toggleScrollInSync"
      class="text-gray-800 select-none dark:text-gray-50"
      id="toggleScrollInSyncLabel"
      aria-controls="toggleScrollInSync"
    >
      Scroll in sync
    </label>
    <input
      aria-labelledby="toggleScrollInSyncLabel"
      id="toggleScrollInSync"
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
