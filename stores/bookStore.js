import { defineStore } from "pinia";

export const useBookStore = defineStore("book", () => {
  const books = ref([]);

  async function getAll() {
    await $fetch("/api/books").then((data) => {
      books.value = data;
    });
  }

  /**Post request */
  async function postBook(body) {
    await $fetch("/api/books/create", {
      method: "POST",
      body,
    });
  }

  /**Put request */
  async function updateBook(id, body) {
    await $fetch(`/api/books/${id}`, { method: "PUT", body });
  }

  /**Delete request */
  async function deleteBook(id) {
    const data = await $fetch(`/api/books/${id}`, { method: "DELETE" });
    getAll();

    return data;
  }

  return { books, getAll, postBook, updateBook, deleteBook };
});
