import { defineStore } from "pinia";

export const useAuthorStore = defineStore("author", () => {
  const authors = ref([]);

  /**Get request */
  async function getAll() {
    /**[1] This one is Working */
    // await $fetch("/api/authors").then((data) => {
    //   authors.value = data;
    // });

    /**[2] This one is not Working , now I don't know why*/
    const data = await $fetch("/api/authors");
    authors.value = data;
  }

  /**Post request */
  async function postAuthor(body) {
    await $fetch("/api/authors/create", {
      method: "POST",
      body,
    });
  }

  /**Put request */
  async function updateAuthor(id, body) {
    await $fetch(`/api/authors/${id}`, {
      method: "PUT",
      body,
    });
  }

  /**Delete request */
  async function deleteAuthor(id) {
    const response = await $fetch(`/api/authors/${id}`, { method: "DELETE" });
    getAll();
    return response;
  }

  return { authors, getAll, postAuthor, deleteAuthor, updateAuthor };
});
