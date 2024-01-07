<template>
  <main>
    <div>
      <div class="mb-4">
        <p class="text-3xl">Data:session</p>
        <pre>{{ data }}</pre>
      </div>
      <div class="mb-4">
        <p class="text-3xl">status</p>
        <pre>{{ status }}</pre>
      </div>
      <div class="mb-4">
        <p class="text-3xl">lastRefreshedAt</p>
        <pre>{{ lastRefreshedAt }}</pre>
      </div>
    </div>

    <ul class="flex flex-wrap justify-center items-center gap-4 md:gap-10">
      <li class="py-4 px-20 bg-sky-400 rounded-sm">
        <NuxtLink to="/crud/books">Books</NuxtLink>
      </li>
      <li class="py-4 px-20 bg-sky-400 rounded-sm">
        <NuxtLink to="/crud/authors">Authors</NuxtLink>
      </li>
    </ul>
    <NuxtPage />
  </main>
</template>

<script setup>
const {
  status,
  data,
  lastRefreshedAt,
  getCsrfToken,
  getProviders,
  getSession,
} = useAuth();
// console.log(await getProviders());
// console.log(await getSession());
// console.log(await getCsrfToken());
</script>
