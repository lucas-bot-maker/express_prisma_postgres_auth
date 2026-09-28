import { Router } from "express";





import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

export const courseRoutes = Router();

courseRoutes.use(authenticate)

// GET  all courses
courseRoutes.get("/", getAllCourses);

// GET course by ID
courseRoutes.get("/:id", getCourseById);

// CREATE course
courseRoutes.post("/", authorize("ADMIN"), createCourse);

// UPDATE course
courseRoutes.patch("/:id", authorize("ADMIN"), updateCourse);

// DELETE course
courseRoutes.delete("/:id", authorize("ADMIN"), deleteCourse);


