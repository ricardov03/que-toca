<script setup lang="ts">
import { useHead } from '@vueuse/head'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'El Toque',
  meta: [
    { name: 'description', content: '¿No tienes idea del horario del toque de queda? Yo tampoco, así que me ayudé con esto. espero que también te ayude a ti.' },
  ],
})
</script>

<template>
  <router-view />
</template>
