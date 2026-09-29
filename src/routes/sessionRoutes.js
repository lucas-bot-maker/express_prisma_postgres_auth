import { Router } from "express";

import { getAllSessions, getSessionById, createSession, updateSession, deleteSession } from "../controllers/sessionController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";


export const sessionRoutes = Router();

sessionRoutes.use(authenticate)

// GET all sessions
sessionRoutes.get("/", authorize("ADMIN", "LECTURER"), getAllSessions);

// GET a single session
sessionRoutes.get("/:id", authorize("ADMIN", "LECTURER"), getSessionById);

// CREATE a session
sessionRoutes.post("/", authorize("ADMIN"), createSession);

// UPDATE a session
sessionRoutes.patch("/:id", authorize("ADMIN"), updateSession);

// DELETE a session
sessionRoutes.delete("/:id", authorize("ADMIN"), deleteSession);