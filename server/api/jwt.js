import { getToken } from "#auth";

export default eventHandler(async (event) => {
  const token = await getToken({ event });

  if (!token) {
    return "No token found , Are you logged in ?";
  }

  return token;
});
