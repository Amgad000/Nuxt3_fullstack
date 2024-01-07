<template>
  <div class="bg-gray-50 dark:bg-gray-900 shadow py-10 px-3 my-10 rounded-xl">
    <h1 class="text-xl text-center mt-12 mb-4">
      {{ $route.params.request == "create" ? "Create" : "Update" }} Author
    </h1>
    <form @submit.prevent="subAndNav">
      <!-- name input  -->
      <div class="mb-6">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >author name</label
        >
        <input
          id="name"
          v-bind="name"
          class="shadow-md text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-300 dark:focus:border-blue-300 border-none" />
        <span class="text-red-700 text-lg">{{ errors.name }}</span>
      </div>
      <div class="flex justify-end items-center">
        <button
          type="submit"
          class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">
          {{ $route.params.request == "create" ? "Create" : "Update" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

const { defineInputBinds, setValues, values, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      name: yup.string().min(3).required(),
    })
  ),
});

const name = defineInputBinds("name");

// to reach the route
const route = useRoute();
// to reach authorPiniaState
import { useAuthorStore } from "~/stores/authorStore";
const store = useAuthorStore();
await store.getAll();

if (route.params.request != "create") {
  const author = store.authors.filter(
    (author) => author._id == route.params.request
  );
  setValues({
    name: author[0].name,
  });
}

// toast
const { $showToast } = useNuxtApp();
// Handle form submit
const subAndNav = handleSubmit(async () => {
  //Post or Put
  if (route.params.request == "create") {
    await store.postAuthor({ name: values.name });
  } else {
    await store.updateAuthor(route.params.request, { name: values.name });
  }

  $showToast("Done!!", "info");

  // go back
  return navigateTo("/crud/authors");
  // console.log("submission ended!");
});
</script>
<style scoped>
input#name {
  color: black !important;
}
</style>
