<template>
  <button
    id="copyLinkButton"
    type="button"
    class="inline-flex items-center justify-center gap-1 p-2 text-sm transition-transform transform rounded-md shadow  justify-self-end focus-visible:ring-4 active:scale-y-75 hover:scale-105 hover:shadow-lg copy-uri-button"
    aria-label="Click here to copy url to clipboard"
    :class="{
      'bg-blue-500 text-white': !copied,
      'bg-green-500 text-gray-800': copied,
    }"
    @click="clickHandler"
  >
    <span
      class="inline-flex items-center justify-center gap-1"
      aria-live="assertive"
      role="status"
    >
      <span v-show="copied" class="inline" aria-hidden="true">
        <Copied />
      </span>
      <span v-show="copied" class="hidden md:inline-block">Copied</span>
      <span v-show="!copied" class="inline" aria-hidden="true">
        <Link />
      </span>
      <span v-show="!copied" class="hidden md:inline-block">Copy link</span>
    </span>
  </button>
</template>
<script lang="ts">
import Vue from 'vue'
import Link from '~/components/icons/link.vue'
import Copied from '~/components/icons/copied.vue'
export default Vue.extend({
  components: { Link, Copied },
  props: {
    clickHandler: {
      type: Function,
      required: true,
    },
    copied: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
