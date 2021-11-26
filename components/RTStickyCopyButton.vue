<template>
  <div class="sticky top-0 text-right z-1">
    <button
      @click="handleClick"
      class="absolute top-0 right-0 p-2 transition-all transform rounded-full shadow  z-1 hover:shadow-lg hover:scale-110 hover:rotate-12"
      v-bind:class="{
        'bg-gray-100 dark:bg-gray-600': !copied,
        'bg-green-500': copied,
      }"
    >
      <svg
        v-show="!copied"
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        ></path>
      </svg>
      <svg
        v-show="copied"
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['clickHandler'],
  data() {
    return {
      copied: false,
    }
  },
  methods: {
    handleClick(e) {
      this.copied = true
      this.clickHandler(e)
      setTimeout(() => {
        this.copied = false
      }, 5000)
    },
  },
}
</script>
