import { Router } from "express";

import {
  getAllEnrollments,
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
} from "../controllers/enrollmentController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";


export const enrollmentRoutes = Router();

enrollmentRoutes.use(authenticate)

enrollmentRoutes.get("/", getAllEnrollments);

enrollmentRoutes.get("/:id", getEnrollmentById);

enrollmentRoutes.post("/", authorize("ADMIN"), createEnrollment);

enrollmentRoutes.patch("/:id", authorize("ADMIN"), updateEnrollment);

enrollmentRoutes.delete("/:id", authorize("ADMIN"), deleteEnrollment);


