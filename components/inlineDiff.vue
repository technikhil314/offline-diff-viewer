<template>
  <div class="w-full" v-html="diff"></div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    lhsDiff: {
      required: true,
      type: Array,
    },
    rhsDiff: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      diff: '',
    }
  },
  beforeMount() {
    this.diff = (this.lhsDiff as Array<string>).reduce(
      (acc: string, item, index): string => {
        return `${acc}<p class="${
          item.includes('isModified') ? 'bg-red-800' : ''
        }">${item}</p><p class="${
          (this.rhsDiff[index] as string).includes('isModified')
            ? 'bg-green-800'
            : ''
        }">${this.rhsDiff[index]}</p>`
      },
      ''
    )
  },
})
</script>
