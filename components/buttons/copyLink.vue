<template>
  <button
    id="copyLinkButton"
    type="button"
    class="inline-flex gap-1 justify-center justify-self-end items-center p-2 text-sm rounded-md shadow transition-transform transform  focus-visible:ring-4 active:scale-y-75 hover:scale-105 hover:shadow-lg copy-uri-button"
    aria-label="Click here to copy url to clipboard"
    :class="{
      'bg-blue-500 text-white': !copied,
      'bg-green-500 text-gray-800': copied === true,
      'pointer-events-none': copied === null || copied === true,
    }"
    :disabled="copied === null || copied === true"
    @click="clickHandler"
  >
    <span
      class="inline-flex gap-1 justify-center items-center"
      aria-live="assertive"
      role="status"
    >
      <span v-show="copied" class="inline" aria-hidden="true">
        <Copied />
      </span>
      <span v-show="copied" class="hidden md:inline-block">Copied</span>
      <span
        v-show="!copied"
        class="inline"
        aria-hidden="true"
        :class="{
          'animate animate-wiggle': copied === null,
        }"
      >
        <Link />
      </span>
      <span v-show="!copied" class="hidden md:inline-block">{{
        copied === null ? 'Generating...' : 'Copy link'
      }}</span>
    </span>
  </button>
</template>
<script lang="ts">
import Vue from 'vue'
import Copied from '~/components/icons/copied.vue'
import Link from '~/components/icons/link.vue'
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
