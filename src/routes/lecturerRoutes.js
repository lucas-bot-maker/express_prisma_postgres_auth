import { Router } from "express";

import {
  getAllLecturers,
  getLecturerById,
  createLecturer,
  updateLecturer,
  deleteLecturer,
  getLecturerOfferings,
} from "../controllers/lecturerController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";


export const lecturerRoutes = Router();

lecturerRoutes.use(authenticate)

// GET all lecturers
lecturerRoutes.get("/", getAllLecturers);

// GET all offerings for a lecturer
lecturerRoutes.get("/:id/offerings", getLecturerOfferings);

// GET a single lecturer
lecturerRoutes.get("/:id",  getLecturerById);

// CREATE a lecturer
lecturerRoutes.post("/", authorize("ADMIN"), createLecturer);

// UPDATE a lecturer
lecturerRoutes.patch("/:id", authorize("ADMIN"), updateLecturer);

// DELETE a lecturer
lecturerRoutes.delete("/:id", authorize("ADMIN"), deleteLecturer);


