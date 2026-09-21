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
import { auth_middleware } from "../middlewares/authMiddleware.js";

export const resultRoutes = Router();

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
resultRoutes.post("/createResult", createResult);

// UPDATE result
resultRoutes.put("/:id", auth_middleware, updateResult);

// APPROVE result
resultRoutes.patch("/:id/approve", auth_middleware, approveResult);

// REJECT result
resultRoutes.patch("/:id/reject", auth_middleware, rejectResult);

// DELETE result
resultRoutes.delete("/:id", auth_middleware, deleteResult);
