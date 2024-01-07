import { getServerSession } from "#auth";
import usersModel from "~/server/models/users.model";

export default defineEventHandler(async (event) => {


  const session = await getServerSession(event);

  // if no user logged in
  if (!session) {
    return { status: "Unauthenticated" };
  }

  // if there is a user logged in
  const user = usersModel.find({email:session.user.email});

  return user;
});
