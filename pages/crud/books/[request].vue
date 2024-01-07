<template>
  <div class="bg-gray-50 dark:bg-gray-900 shadow py-10 px-3 my-10 rounded-xl">
    <h1 class="text-xl text-center mt-12 mb-4">
      {{ $route.params.request == "create" ? "Create" : "Update" }} Book
    </h1>
    <form @submit.prevent="">
      <!-- title input  -->
      <div class="mb-6">
        <label
          for="title"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >book Title</label
        >
        <input
          required
          type="text"
          v-model="bookTitle"
          id="title"
          class="shadow-md text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-300 dark:focus:border-blue-300 border-none" />
      </div>
      <!-- pageCount input  -->
      <div class="mb-6">
        <label
          for="page-count"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Number Of Pages</label
        >
        <input
          required
          type="text"
          v-model.number="pageCount"
          id="page-count"
          class="shadow-md text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-300 dark:focus:border-blue-300 border-none" />
      </div>
      <!-- the authors  -->

      <div class="mb-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <h3 class="my-1">select from authors</h3>
          <HeadlessCombobox v-model="selectedPeople" multiple>
            <div class="relative mt-1">
              <div
                class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <HeadlessComboboxInput
                  class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  :displayValue="displayFunction"
                  @change="query = $event.target.value" />
                <HeadlessComboboxButton
                  class="absolute inset-y-0 right-0 flex items-center pr-2">
                  <IconExpand
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true" />
                </HeadlessComboboxButton>
              </div>
              <HeadlessTransitionRoot
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="query = ''">
                <HeadlessComboboxOptions
                  class="relative mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <div
                    v-if="filteredPeople.length === 0 && query !== ''"
                    class="relative cursor-default select-none">
                    <span
                      class="inline-block py-2 px-4 bg-teal-600 text-white cursor-pointer w-full h-full"
                      >Create " {{ query }} " as a new author</span
                    >
                  </div>
                  <HeadlessComboboxOption
                    v-for="person in filteredPeople"
                    as="template"
                    :key="person._id"
                    :value="person"
                    v-slot="{ selected, active }">
                    <li
                      class="relative cursor-default select-none py-2 pl-10 pr-4"
                      :class="{
                        'bg-teal-600 text-white': active,
                        'text-gray-900': !active,
                      }">
                      <span
                        class="block truncate"
                        :class="{
                          'font-medium': selected,
                          'font-normal': !selected,
                        }">
                        {{ person.name }}
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{
                          'text-white': active,
                          'text-teal-600': !active,
                        }">
                        <IconCheck class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </HeadlessComboboxOption>
                </HeadlessComboboxOptions>
              </HeadlessTransitionRoot>
            </div>
          </HeadlessCombobox>
        </div>

        <div>
          <h3 class="my-1">OR add a new author</h3>
          <div class="flex items-center gap-2">
            <input
              type="text"
              v-model="newAuthorName"
              id="new-author"
              placeholder="Enter the author name"
              class="shadow-md transition-all text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-300 block w-full p-2 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-300 dark:focus:border-blue-300 border-none" />
            <span
              @click="addNewAuthor"
              class="inline-block text-sm font-medium text-gray-900 dark:text-white cursor-pointer bg-sky-500 py-2 px-4"
              >Add+</span
            >
          </div>
        </div>
      </div>
      <div class="bg-sky-300 text-gray-900 py-2 mb-6">
        Your authors : {{ displayedPeople.join(" , ") }}
      </div>

      <div class="flex items-center justify-end">
        <button
          @click="subAndNav"
          class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">
          {{ $route.params.request == "create" ? "Create" : "Update" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
// HeadlessHeadlessCombobox to select authors
import { useAuthorStore } from "~/stores/authorStore";
const store = useAuthorStore();
await store.getAll();
const people = computed(() => store.authors);

// get bookstore
import { useBookStore } from "~/stores/bookStore";
const bookStore = useBookStore();
await bookStore.getAll();

//access the route
const route = useRoute();

const bookTitle = ref("");
const pageCount = ref(1);
const selectedPeople = ref([]);

// fill data for update page
if (route.params.request != "create") {
  const book = bookStore.books.filter((b) => b._id == route.params.request);

  bookTitle.value = book[0].title;
  pageCount.value = book[0].pageCount;
  selectedPeople.value = book[0].author;
}
const displayedPeople = computed(() => selectedPeople.value.map((e) => e.name));

/**Handle new authr */
const newAuthorName = ref("");
const newAuthorId = ref([]);
async function addNewAuthor() {
  if (newAuthorName.value != "") {
    selectedPeople.value.push({ name: newAuthorName.value });
    const { data } = await useFetch("/api/authors/create", {
      method: "POST",
      body: { name: newAuthorName.value },
    });
    newAuthorId.value.push(data.value._id);
    newAuthorName.value = "";
  }
}

let query = ref("");

let filteredPeople = computed(() =>
  query.value === ""
    ? people.value
    : people.value.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);
function displayFunction(array) {
  if (array.length == 0) {
    return "Select author/s";
  } else if (array.length == 1) {
    return array[0].name;
  } else {
    return array.map((element) => {
      return element.name;
    });
  }
}

/**Submit Function */
async function subAndNav() {
  // get authors
  const authorsArray =
    selectedPeople.value.length > 0
      ? selectedPeople.value.map((e) => e._id)
      : [];

  if (newAuthorId.value.length > 0) {
    authorsArray.push(...newAuthorId.value);
  }
  // the whole body object
  const bookBody = {
    title: bookTitle.value,
    pageCount: pageCount.value,
    author: authorsArray,
  };

  /**Post OR Put */
  if (route.params.request == "create") {
    await bookStore.postBook(bookBody);
  } else {
    await bookStore.updateBook(route.params.request, bookBody);
  }

  // use toast
  const { $showToast } = useNuxtApp();
  $showToast("Done!!!", "info");
  // go back
  return navigateTo("/crud/books");
}
</script>
<style scoped>
input#title,
input#page-count,
input#new-author {
  color: black !important;
}
</style>
