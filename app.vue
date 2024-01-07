<template>
  <div class="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white">
    <header class="flex justify-between items-center md:container md:mx-auto">
      <div class="flex justify-center items-center">
        <IconBook class="text-sky-500 text-7xl" />
      </div>
      <div class="flex justify-end gap-4">
        <ul class="flex items-center justify-end gap-4">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/crud">CRUD</NuxtLink></li>
        </ul>
        <!-- the auth  -->
        <button
          class="inline-block px-8 py-2 bg-yellow-200 text-gray-700 cursor-pointer font-medium"
          v-if="loggedIn"
          @click="handleLogout">
          Logout
        </button>
        <button
          class="inline-block px-8 py-2 bg-yellow-200 text-gray-700 cursor-pointer font-medium"
          v-else
          @click="handleLogin">
          Login
        </button>
        <div
          class="theme-switcher text-xl px-4 py-2 hover:text-sky-500 hover:bg-slate-600 rounded-lg">
          <button @click="toggleTheme">
            <IconMoon v-if="!dark" />
            <IconSun v-if="dark" />
          </button>
        </div>
      </div>
    </header>

    <div class="md:container md:mx-auto min-h-[40rem] py-16">
      <NuxtPage />
    </div>

    <footer class="bg-white rounded-t-lg shadow-lg dark:bg-gray-800">
      <div
        class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between md:container md:mx-auto">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
          >© {{ new Date().getFullYear() }}
          <IconBook class="text-sky-500 text-4xl inline-block" />
          All Rights Reserved.
        </span>
        <ul
          class="flex flex-wrap gap-5 items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about">About</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/crud">CRUD</NuxtLink>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup>
// the useAuth
const { status, signIn, signOut } = useAuth();
const loggedIn = computed(() => status.value === "authenticated");
async function handleLogout() {
  await signOut();
}
async function handleLogin() {
  await signIn();
}

useHead({
  // titleTemplate: "%s Learnin Nuxt 3",
  titleTemplate: (commonTitle) => {
    return commonTitle ? `${commonTitle}  Learning Nuxt 3` : "Learning Nxut 3";
  },
});
useSeoMeta({
  ogTitle: "Learning Nuxt 3 ",
  description: "Learning Nuxt 3 from the offical documentation",
  ogDescription: "Learning Nuxt 3 from the offical documentation",
});

const dark = ref(false);

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  dark.value = !dark.value;
}
</script>

<style lang="scss">
a {
  font-weight: 500;
  &.router-link-exact-active {
    @apply text-stone-600;
  }
}
</style>
