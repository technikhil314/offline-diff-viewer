<template>
  <div class="flex flex-col w-1/2 gap-2">
    <p class="flex-grow-0 text-lg font-bold text-center capitalize">
      {{ label }}
    </p>
    <div
      :id="id"
      class="relative flex-1 px-4 py-2 border-2 rounded-md  dark:border-gray-500 line-number-gutter min-h-80"
      :class="{
        'overflow-y-auto max-h-screen--nav': !isSrollInSyncEnabled,
      }"
    >
      <StickyCopy
        :aria-label="'Copy the content to clipboard'"
        :click-handler="copyTextToClipboard"
      />
      <div
        v-for="(lineDiff, index) in diff"
        :key="index"
        :class="{
          [`${modifiedClassString} rounded-sm`]:
            lineDiff.includes('isModified'),
        }"
      >
        <p class="break-all whitespace-pre-wrap" v-html="lineDiff"></p>
      </div>
    </div>
  </div>
</template>

<script>
import StickyCopy from './buttons/stickyCopy.vue'
import { putToClipboard } from '~/helpers/utils'
export default {
  components: { StickyCopy },
  props: {
    diff: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    modifiedClassString: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    isSrollInSyncEnabled() {
      return this.$store.state.scrollInSync.isEnabled
    },
  },
  methods: {
    copyTextToClipboard(e) {
      putToClipboard(
        e.currentTarget.parentNode.parentNode.innerText
          .split('\n\n')
          .join('\n'),
        'Text copied to your clipboard',
        this.$store
      )
    },
  },
}
</script>

<style lang="scss" scoped>
/* line numbers in diff view */
.line-number-gutter {
  counter-reset: line-numbers;

  --line-number-gutter-width: calc(var(--max-line-number-characher) + 10px);
  &::before {
    content: '';
    width: var(--line-number-gutter-width);
    @apply bg-gray-300 dark:bg-gray-700 inline-block left-0 top-0 bottom-0 absolute text-sm;
  }
  @apply relative;
  p {
    padding-left: calc(var(--line-number-gutter-width) - 10px);
    line-height: 1.65;
    @apply relative;
    &.selected {
      @apply dark:bg-blue-800 bg-blue-200;
    }
    &:hover {
      @apply bg-gray-200 dark:bg-gray-600;
      & > span {
        @apply dark:mix-blend-hard-light dark:bg-blend-multiply;
      }
    }
    &::before {
      counter-increment: line-numbers;
      content: counter(line-numbers);
      width: var(--line-number-gutter-width);
      @apply absolute left-0 top-0 -mx-4 bg-gray-200 dark:bg-gray-700 dark:text-gray-50 text-gray-500 inline-flex justify-center items-center text-sm h-full;
    }
  }
}
</style>
