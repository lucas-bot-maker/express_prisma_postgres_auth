import { Router } from "express";

import {
  getAllEnrollments,
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
} from "../controllers/enrollmentController.js";


export const enrollmentRoutes = Router();


enrollmentRoutes.get("/", getAllEnrollments);

enrollmentRoutes.get("/:id", getEnrollmentById);

enrollmentRoutes.post("/", createEnrollment);

enrollmentRoutes.put("/:id", updateEnrollment);

enrollmentRoutes.delete("/:id", deleteEnrollment);


