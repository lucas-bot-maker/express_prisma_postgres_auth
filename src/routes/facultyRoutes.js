import { Router } from "express";

import {
  getAllFaculties,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from "../controllers/facultyController.js";




export const facultyRoutes = Router();


facultyRoutes.get("/", getAllFaculties);

facultyRoutes.get("/:id", getFacultyById);

facultyRoutes.post("/", createFaculty);

facultyRoutes.put("/:id", updateFaculty);

facultyRoutes.delete("/:id", deleteFaculty);
