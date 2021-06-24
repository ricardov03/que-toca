<template>
  <div class="max-w-md w-4/5 xl:w-100 mt-8 lg:mt-0 mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <div class="flex items-center px-6 py-3 bg-blue-500 dark:bg-gray-900">
      <slot name="icon" />

      <h1 class="mx-3 text-lg font-semibold text-white" v-text="title" />
    </div>

    <div class="px-6 py-4">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['title'],
  computed: {
    cardIcon() {
      return `carbon-${icon}`
    },
  },
}
</script>
