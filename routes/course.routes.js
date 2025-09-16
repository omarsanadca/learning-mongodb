import { Router } from "express";

import Course from "../models/course.model.js";

const router = Router();

router.get("/courses", async (req, res) => {
  const courses = await Course.find();

  res.json({ message: "Get all courses", courses });
});

router.get("/courses/:id", async (req, res) => {
  const courseId = req.params.id;

  if (!ObjectId.isValid(courseId)) throw new Error("Invalid id");

  // const course = await Course.findOne({ _id: new ObjectId(courseId) });
  const course = await Course.findById(courseId);

  res.json({ message: "Get all courses", course });
});

router.post("/courses/", async (req, res) => {
  const courseData = req.body;

  const course = new Course(courseData);

  const result = await course.save();

  res.status(201).json({ message: "added course!", result });
});

router.patch("/courses/:id", async (req, res) => {
  const courseId = req.params.id;
  const courseData = req.body;

  if (!ObjectId.isValid(courseId)) throw new Error("Invalid id");

  // const result = await Course.updateOne(
  //   { _id: new ObjectId(courseId) },
  //   {
  //     $set: courseData,
  //   }
  // );

  const result = await Course.findByIdAndUpdate(courseId, {
    $set: courseData,
  });

  res.json({ message: "Updated course!", result });
});

router.delete("/courses/:id", async (req, res) => {
  const courseId = req.params.id;

  if (!ObjectId.isValid(courseId)) throw new Error("Invalid id");

  const result = await Course.deleteOne({ _id: new ObjectId(courseId) });

  res.json({ message: "deleted course", result });
});

export default router;
