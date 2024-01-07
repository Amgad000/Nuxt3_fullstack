<template>
  <div class="flex justify-center items-center">
    <div
      class="flex flex-col items-center justify-center rounded-lg border-solid border-1 border-zinc-300 dark:border-zinc-950 bg-zinc-200 dark:bg-zinc-900 w-fit py-8 px-6">
      <GithubSign />
      <CredentialsSign />
    </div>
  </div>
</template>

<script setup>
// Make the page a guests' page
definePageMeta({
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
    // navigateAuthenticatedTo: "/",
  },
});
</script>
