import { Router } from "express";

import Post from "../models/post.model.js";
import User from "../models/user.model.js";

const router = Router();

router.get("/posts", async (req, res) => {
  const posts = await Post.find().populate("author");
  res.json({ message: "Get all posts", posts });
});

router.get("/posts/:id", (req, res) => {
  res.json({ message: "Get single post" });
});

router.post("/posts", async (req, res) => {
  const postData = req.body;

  const post = new Post(postData);

  await post.save();

  res.json({ message: "created post!" });
});

export default router;
