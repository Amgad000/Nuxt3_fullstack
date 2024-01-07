import mongoose from "mongoose";

const config = useRuntimeConfig();

const connectToMongo = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    return mongoose.connection.getClient();
  } catch (error) {
    throw error;
  }
};

const mongoClient: Promise<any> = connectToMongo();

export default mongoClient;
