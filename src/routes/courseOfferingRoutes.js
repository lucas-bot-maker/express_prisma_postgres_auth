import { Router } from "express";


import {
  getAllOfferings,
  getOfferingById,
  createOffering,
  updateOffering,
  deleteOffering,
  getOfferingEnrollments,
} from "../controllers/courseOfferingController.js";

import { authenticate, authorize } from "../middlewares/authMiddleware.js";


export const courseOfferingRoutes = Router();




courseOfferingRoutes.use(authenticate); 

// GET all course offering
courseOfferingRoutes.get("/", getAllOfferings);

// GET a single course offering
courseOfferingRoutes.get("/:id", getOfferingById);

// CREATE a course offering
courseOfferingRoutes.post("/", authorize("ADMIN"), createOffering);

// UPDATE a course offering
courseOfferingRoutes.patch("/:id", authorize("ADMIN"), updateOffering);

// DELETE a course offering
courseOfferingRoutes.delete("/:id", authorize("ADMIN"), deleteOffering);

// GET all enrollments for an offering
courseOfferingRoutes.get("/:id/enrollments", getOfferingEnrollments);
