import { Router } from "express";
import {
  getAllSemesters,
  getSemesterById,
  createSemester,
  updateSemester,
  deleteSemester,
} from "../controllers/semesterController.js";



export const semesterRoutes = Router();

// GET all semesters
semesterRoutes.get("/", getAllSemesters);

// GET a single semester
semesterRoutes.get("/:id", getSemesterById);

// CREATE a semester
semesterRoutes.post("/createSemester", createSemester);

// UPDATE a semester
semesterRoutes.put("/:id", updateSemester);

// DELETE a semester
semesterRoutes.delete("/:id", deleteSemester);


