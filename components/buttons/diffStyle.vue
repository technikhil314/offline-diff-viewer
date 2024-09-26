<template>
  <button
    class="inline-flex items-center justify-center px-1 py-1 text-sm text-gray-600 transition-transform transform bg-gray-300 border border-gray-800 rounded-sm  dark:border-gray-400 dark:text-white dark:bg-gray-800 align-center focus-visible:ring-4 active:scale-y-75"
    role="button"
    :aria-label="label"
    :title="label"
    @click="handleClick"
  >
    <span
      aria-live="assertive"
      role="status"
      :class="{
        'inline-block transition-transform bg-gray-100': true,
        'rotate-90': sideBySide,
      }"
    >
      <DiffStyle class="w-6 h-6" />
    </span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import DiffStyle from '~/components/icons/diffStyle.vue'
export default Vue.extend({
  components: { DiffStyle },
  props: {
    clickHandler: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      sideBySide: true,
    }
  },
  computed: {
    label() {
      if (this.sideBySide) {
        return 'Switch unified diff layout'
      }
      return 'Switch to split diff layout'
    },
  },
  methods: {
    handleClick() {
      this.sideBySide = !this.sideBySide
      this.clickHandler(this.sideBySide === true)
    },
  },
})
</script>
