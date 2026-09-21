import { Router } from "express";

import {
  getAllLecturers,
  getLecturerById,
  createLecturer,
  updateLecturer,
  deleteLecturer,
  getLecturerOfferings,
} from "../controllers/lecturerController.js";


export const lecturerRoutes = Router();


// GET all lecturers
lecturerRoutes.get("/", getAllLecturers);

// GET all offerings for a lecturer
lecturerRoutes.get("/:id/offerings", getLecturerOfferings);

// GET a single lecturer
lecturerRoutes.get("/:id", getLecturerById);

// CREATE a lecturer
lecturerRoutes.post("/createLecturer", createLecturer);

// UPDATE a lecturer
lecturerRoutes.put("/:id", updateLecturer);

// DELETE a lecturer
lecturerRoutes.delete("/:id", deleteLecturer);


