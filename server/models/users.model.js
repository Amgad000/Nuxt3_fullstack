import mongoose from "mongoose";
const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    name: { type: String },
    email: { type: String },
    password: { type: String },
    image: { type: String },
    emailVerified: { type: Date },
  },
  { timestamps: true }
);

// define the model
export default mongoose.model("Users", usersSchema);
