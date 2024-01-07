<template>
  <!-- Addig button  -->
  <div class="my-4 flex justify-end">
    <NuxtLink to="/crud/authors/create">
      <button
        type="button"
        class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
        Add New Author
      </button>
    </NuxtLink>
  </div>
  <!-- the table of authors  -->
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Author Name</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="author in storeAuthors"
          :key="author._id"
          class="bg-white capitalize border-b dark:bg-gray-900 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ author.name }}
          </th>

          <td class="px-6 py-4">
            <div class="flex justify-start items-center gap-3">
              <NuxtLink :to="`/crud/authors/${author._id}`"
                ><IconEdit class="text-xl cursor-pointer"
              /></NuxtLink>
              <IconDelete
                @click="delAuthor(author._id)"
                class="text-xl cursor-pointer" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// get authors from pinia store
import { useAuthorStore } from "~/stores/authorStore";
const store = useAuthorStore();
const storeAuthors = computed(() => store.authors);
await store.getAll();

// Using vue-toastification plugin
const { $showToast } = useNuxtApp();

function delAuthor(id) {
  store.deleteAuthor(id).then((response) => {
    // console.log(response);
    $showToast(response.message, "info");
  });
}
</script>
