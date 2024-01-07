import AuthorModel from "~/server/models/Author.model";

export default defineEventHandler(async (event) => {
  // get id and body
  const body = await readBody(event);
  const id = event.context.params.id;

  // update the author
  try {
    await AuthorModel.findByIdAndUpdate(id, body);
    return { message: "the author updated" };
  } catch (e) {
    throw createError({ message: e.message });
  }
});
