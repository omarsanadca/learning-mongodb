import { Schema, model } from "mongoose";

const postSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default model("Post", postSchema);
