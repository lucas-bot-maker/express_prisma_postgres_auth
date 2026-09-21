import { Router } from "express";


import {
  getAllOfferings,
  getOfferingById,
  createOffering,
  updateOffering,
  deleteOffering,
  getOfferingEnrollments,
} from "../controllers/courseOfferingController.js";




export const courseOfferingRoutes = Router();






// GET all course offering
courseOfferingRoutes.get("/", getAllOfferings);

// GET a single course offering
courseOfferingRoutes.get("/:id", getOfferingById);

// CREATE a course offering
courseOfferingRoutes.post("/createOffering", createOffering);

// UPDATE a course offering
courseOfferingRoutes.put("/:id", updateOffering);

// DELETE a course offering
courseOfferingRoutes.delete("/:id", deleteOffering);

// GET all enrollments for an offering
courseOfferingRoutes.get("/:id/enrollments", getOfferingEnrollments);
