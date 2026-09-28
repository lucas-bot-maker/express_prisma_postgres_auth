import { Router } from "express";
import { createStudent, deleteStudent, getAllStudents, getStudentById, updateStudent } from "../controllers/studentController.js";

import { authenticate, authorize } from "../middlewares/authMiddleware.js";


export const studentRoutes = Router();

studentRoutes.use(authenticate)

studentRoutes.get("/", authorize("ADMIN", "LECTURER"), getAllStudents)

studentRoutes.get("/:id", authorize("ADMIN", "LECTURER"),  getStudentById)

studentRoutes.post("/", authorize("ADMIN"), createStudent)

studentRoutes.patch("/:id", authorize("ADMIN"), updateStudent)

studentRoutes.delete("/:id", authorize("ADMIN"), deleteStudent)