import { Router } from "express";
import {
  change_password,
  login,
  me,
  register,
} from "../controllers/authControllers.js";
import { auth_middleware, authenticate} from "../middlewares/authMiddleware.js";

export const authRoutes = Router();


authRoutes.post("/register", register);

authRoutes.post("/login", login);

// protected route
authRoutes.get("/me", authenticate, auth_middleware, me);

authRoutes.post("/change-password", auth_middleware, change_password);


