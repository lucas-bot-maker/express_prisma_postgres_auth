import { Router } from "express";

import {
  getAllFaculties,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from "../controllers/facultyController.js";

import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authMiddleware.js";



export const facultyRoutes = Router();
facultyRoutes.use(authenticate)

facultyRoutes.get("/", getAllFaculties);

facultyRoutes.get("/:id", getFacultyById);

facultyRoutes.post("/", authorize("ADMIN"),  createFaculty);

facultyRoutes.patch("/:id", authorize("ADMIN"),   updateFaculty);

facultyRoutes.delete("/:id", authorize("ADMIN"), deleteFaculty);
