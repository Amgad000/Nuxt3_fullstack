import bookModel from "~/server/models/Book.model";

export default defineEventHandler(async (event) => {
  // get the body
  const body = await readBody(event);

  // create the book
  try {
    await bookModel.create(body);
    return { message: "a book created" };
  } catch (e) {
    throw createError({ message: e.message });
  }
});
