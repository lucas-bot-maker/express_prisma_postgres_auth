import { Router } from "express";
import {
  getAllSemesters,
  getSemesterById,
  createSemester,
  updateSemester,
  deleteSemester,
} from "../controllers/semesterController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";


export const semesterRoutes = Router();

semesterRoutes.use(authenticate)

// GET all semesters
semesterRoutes.get("/",  authorize("ADMIN", "LECTURER"), getAllSemesters);

// GET a single semester
semesterRoutes.get("/:id",   authorize("ADMIN", "LECTURER"), getSemesterById);

// CREATE a semester
semesterRoutes.post("/",  authorize("ADMIN"), createSemester);

// UPDATE a semester
semesterRoutes.patch("/:id",  authorize("ADMIN"), updateSemester);

// DELETE a semester
semesterRoutes.delete("/:id",  authorize("ADMIN"), deleteSemester);


