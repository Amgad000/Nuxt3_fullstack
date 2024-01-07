import bookModel from "~/server/models/Book.model";

export default defineEventHandler(async (event) => {
  // get the body and id
  const body = await readBody(event);
  const id = event.context.params.id;

  // update the book
  try {
    await bookModel.findByIdAndUpdate(id, body);
    return { message: "the book updated" };
  } catch (e) {
    throw createError({ message: e.message });
  }
});
