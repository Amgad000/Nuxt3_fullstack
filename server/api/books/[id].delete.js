import bookModel from "~/server/models/Book.model";

export default defineEventHandler(async (event) => {
  // get the id
  const id = event.context.params.id;

  // delete the book
  try {
    await bookModel.findByIdAndDelete(id);
    return { message: "the book deleted" };
  } catch (e) {
    throw createError({ message: e.message });
  }
});
