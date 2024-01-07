import AuthorModel from "~/server/models/Author.model";

export default defineEventHandler(async (event) => {
  // get the body
  const body = await readBody(event);

  // create the author
  try {
    const author = await AuthorModel.create(body);
    return {
      message: "a new author created",
      _id: author._id,
    };
  } catch (e) {
    throw createError({ message: e.message });
  }
});
