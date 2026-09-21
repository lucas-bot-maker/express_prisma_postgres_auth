import { Router } from "express";
import { createStudent, deleteStudent, getAllStudents, getStudentById, updateStudent } from "../controllers/studentController.js";




export const studentRoutes = Router();

studentRoutes.get("/", getAllStudents)

studentRoutes.get("/:id", getStudentById)

studentRoutes.post("/createStudent", createStudent)

studentRoutes.put  ("/:id", updateStudent)

studentRoutes.delete("/:id", deleteStudent)