import express from "express";
import { ObjectId } from "mongodb";

import { mongoConnect, getDb } from "./utils/db.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.get("/courses", async (req, res) => {
  const coursesCollection = getDb().collection("courses");

  const courses = await coursesCollection.find().toArray();

  res.json({ message: "Get all courses", courses });
});

app.get("/courses/:id", async (req, res) => {
  const courseId = req.params.id;

  if (!ObjectId.isValid(courseId)) throw new Error("Invalid id");

  const coursesCollection = getDb().collection("courses");

  const course = await coursesCollection.findOne({
    _id: new ObjectId(courseId),
  });

  res.json({ message: "Get all courses", course });
});

app.post("/courses/", async (req, res) => {
  const courseData = req.body;

  const coursesCollection = getDb().collection("courses");

  const result = await coursesCollection.insertOne(courseData);

  res.status(201).json({ message: "added course!", result });
});

app.patch("/courses/:id", async (req, res) => {
  const courseId = req.params.id;
  const courseData = req.body;

  if (!ObjectId.isValid(courseId)) throw new Error("Invalid id");

  const coursesCollection = getDb().collection("courses");

  const result = await coursesCollection.updateOne(
    {
      _id: new ObjectId(courseId),
    },
    {
      $set: courseData,
    }
  );

  res.json({ message: "Updated course!", result });
});

app.delete("/courses/:id", async (req, res) => {
  const courseId = req.params.id;

  if (!ObjectId.isValid(courseId)) throw new Error("Invalid id");

  const coursesCollection = getDb().collection("courses");

  const result = await coursesCollection.deleteOne({
    _id: new ObjectId(courseId),
  });

  res.json({ message: "deleted course", result });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Server Error", errMessage: err.message });
});

mongoConnect()
  .then(() => {
    app.listen(3000, () => {
      console.log("Running on port 3000");
    });
  })
  .catch();
