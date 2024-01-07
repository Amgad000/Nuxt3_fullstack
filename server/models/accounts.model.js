import mongoose from "mongoose";
const { Schema } = mongoose;

const accountsSchema = new Schema(
  {
    type: { type: String },
    provider: { type: String },
    providerAccountId: { type: String },
    refresh_token: { type: String },
    access_token: { type: String },
    expires_at: { type: Number },
    token_type: { type: String },
    scope: { type: String },
    id_token: { type: String },
    session_state: { type: String },

    userId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

// define the model
export default mongoose.model("Accounts", accountsSchema);
