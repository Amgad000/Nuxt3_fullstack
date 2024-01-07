import mongoose from "mongoose";
const { Schema } = mongoose;

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// define the model
export default mongoose.model("Author", authorSchema);
