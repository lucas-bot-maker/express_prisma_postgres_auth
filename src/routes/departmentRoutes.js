import { Router } from "express";
import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";


import { auth_middleware } from "../middlewares/authMiddleware.js";

export const departmentRoutes = Router();


departmentRoutes.get("/", getAllDepartments);

departmentRoutes.get("/:id", getDepartmentById);

departmentRoutes.post("/createDepartment", createDepartment);

departmentRoutes.put("/:id", updateDepartment);

departmentRoutes.delete("/:id", deleteDepartment);
