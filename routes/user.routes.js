import express from "express";

import User from "../models/user.model.js";
import Post from "../models/post.model.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await User.find()
    .select("name")
    .populate({
      path: "posts",
      select: "content -author",
      options: { sort: { content: 1 } },
    });

  // const arr = [];

  // for await (const u of users) {
  //   const posts = await Post.find({ author: u._id });
  //   const currUser = { ...u._doc };
  //   currUser.posts = posts;
  //   arr.push(currUser);
  // }

  res.json({ message: "Get one user", users });
});

router.post("/users", async (req, res) => {
  const newUser = new User({
    name: "Ali",
    email: "A",
    profile: { bio: "Software Engineer" },
  });

  await newUser.save();

  res.json({ message: "Added User!" });
});

router.patch("/users", (req, res) => {});

router.delete("/users", (req, res) => {});

export default router;
