<template>
  <main>
    <h1>About!!!</h1>
    <button
      type="button"
      class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
      Dark
    </button>
    <button
      type="button"
      class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      @click="aboutCounter++">
      ++</button
    ><span>{{ aboutCounter }}</span
    ><button
      type="button"
      class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 ml-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      @click="aboutCounter--">
      --
    </button>

    <h3>{{ limit }}</h3>

    <hr />
    <NuxtLink to="/about/nested">
      <h3>Go nested!!!</h3>
    </NuxtLink>
    <NuxtLink to="/about/another">
      <h3>Go anoher!!!</h3>
    </NuxtLink>

    <NuxtPage :style="{ background: '#ccc' }" />
  </main>
</template>

<script setup>
// authenticated only
definePageMeta({
  middleware: "auth",
});

// useState
const aboutCounter = useCounter();
// composable
const limit = useLimit();

useHead({
  title: "About -",
});
</script>

<style lang="scss" scoped></style>
