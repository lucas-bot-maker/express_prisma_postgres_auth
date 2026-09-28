import { Router } from "express";
import {
  getAllResults,
  getResultById,
  createResult,
  updateResult,
  deleteResult,
  approveResult,
  rejectResult,
  getStudentSemesterResults,
} from "../controllers/resultController.js";
import { auth_middleware, authenticate, authorize } from "../middlewares/authMiddleware.js";

export const resultRoutes = Router();

resultRoutes.use(authenticate)

// GET all results
resultRoutes.get("/", getAllResults);

// GET results for a specific student in a specific semester
resultRoutes.get(
  "/student/:studentId/semester/:semesterId",
  getStudentSemesterResults,
);


// GET a single result by Id
resultRoutes.get("/:id", getResultById);

// CREATE result
resultRoutes.post("/", authorize("ADMIN", "LECTURER"), createResult);

// UPDATE result
resultRoutes.put("/:id", authorize("ADMIN", "LECTURER"), auth_middleware, updateResult);

// APPROVE result
resultRoutes.patch("/:id/approve", authorize("ADMIN", "LECTURER"), auth_middleware, approveResult);

// REJECT result
resultRoutes.patch("/:id/reject", authorize("ADMIN", "LECTURER"), auth_middleware, rejectResult);

// DELETE result
resultRoutes.delete("/:id", authorize("ADMIN", "LECTURER"), auth_middleware, deleteResult);
