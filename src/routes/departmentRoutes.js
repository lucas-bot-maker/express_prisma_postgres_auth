import { Router } from "express";
import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";




export const departmentRoutes = Router();

departmentRoutes.use(authenticate)


departmentRoutes.get("/", getAllDepartments);

departmentRoutes.get("/:id", getDepartmentById);

departmentRoutes.post("/", authorize("ADMIN"), createDepartment);

departmentRoutes.patch("/:id", authorize("ADMIN"), updateDepartment);

departmentRoutes.delete("/:id", authorize("ADMIN"), deleteDepartment);
