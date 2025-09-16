import express from "express";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

import userRoutes from "./routes/user.routes.js";
import coursesRoutes from "./routes/user.routes.js";
import postsRoutes from "./routes/posts.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.use(userRoutes);
app.use(coursesRoutes);
app.use(postsRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Server Error", errMessage: err.message });
});

mongoose
  .connect(
    "mongodb+srv://sanad:sanad1234@node-ca.vosqn34.mongodb.net/course_management_system?retryWrites=true&w=majority&appName=node-ca"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Running on port 3000");
    });
  })
  .catch((err) => console.log(err));
