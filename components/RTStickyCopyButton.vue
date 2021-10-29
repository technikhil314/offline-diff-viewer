<template>
  <div class="sticky top-0 text-right z-1">
    <button
      @click="clickHandler"
      class="absolute top-0 right-0 p-2 transition-all transform bg-gray-100 rounded-full shadow  z-1 hover:shadow-lg hover:scale-110 hover:rotate-12"
    >
      <svg
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
    </button>
  </div>
</template>

<script>
export default {
  props: ['clickHandler'],
}
</script>
