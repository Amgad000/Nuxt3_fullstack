import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: [
    {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
  ],
  published: {
    type: Date,
    default: Date.now(),
  },
  pageCount: {
    type: Number,
  },
});

// define the model
export default mongoose.model("Book", bookSchema);
