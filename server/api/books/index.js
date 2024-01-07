import bookModel from "~/server/models/Book.model";

export default defineEventHandler(async (event) => {
  return await bookModel.find().populate("author");
});
