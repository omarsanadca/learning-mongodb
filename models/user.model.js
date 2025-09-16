import mongoose from "mongoose";

// const profileSchema = new mongoose.Schema(
//   {
//     bio: { type: String, required: true },
//   },
//   { _id: false }
// );

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  profile: { bio: { type: String, required: true } },
});

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

export default mongoose.model("User", userSchema);
