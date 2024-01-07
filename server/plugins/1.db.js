// connect to the DB before initiating the app
import mongoose from "mongoose";

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig();

  mongoose
    .connect(config.mongoUri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((e) => console.log(e));
});
