import AuthorModel from "~/server/models/Author.model";

export default defineEventHandler(async (event) => {
  // get id
  const id = event.context.params.id;

  // delete the author
  try {
    await AuthorModel.findByIdAndDelete(id);
    return { message: "the author deleted" };
  } catch (e) {
    throw createError({ message: e.message });
  }
});
