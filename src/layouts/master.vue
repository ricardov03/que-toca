<template>
  <main class="text-center text-gray-700 dark:text-gray-200 bg-white dark:bg-black h-full">
    <Navegation />
    <Suspense>
      <template #fallback>
        <div>
          Loading ...
        </div>
      </template>
      <template #default>
        <router-view />
      </template>
    </Suspense>
  </main>
</template>
