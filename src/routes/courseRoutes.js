import { Router } from "express";





import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

export const courseRoutes = Router();



// GET  all courses
courseRoutes.get("/", getAllCourses);

// GET course by ID
courseRoutes.get("/:id", getCourseById);

// CREATE course
courseRoutes.post("/createCourse", createCourse);

// UPDATE course
courseRoutes.put("/:id", updateCourse);

// DELETE course
courseRoutes.delete("/:id", deleteCourse);


