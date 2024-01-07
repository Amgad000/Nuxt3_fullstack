import usersModel from "~/server/models/users.model";

export default defineEventHandler(async (event) => {
  // get the posted data
  const body = await readBody(event);

  const user = await usersModel.findOne({ email: body.email });

  if (user) {
    return {
      message: "This email has been already created!",
    };
  }

  try {
    const newUser = await usersModel.create(body);
    return { message: "A new user has been created, Now try to login" };
  } catch (e) {
    throw createError({ message: e.message });
  }
});
