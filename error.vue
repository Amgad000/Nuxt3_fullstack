<template>
  <div>
    <h2>{{ error.statusCode }}</h2>
    <h2>{{ error.statusMessage }}</h2>
    <button @click="handleError">Clear Error | Home</button>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<style lang="scss" scoped></style>
