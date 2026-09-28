import { Router } from "express";

import { getAllSessions, getSessionById, createSession, updateSession, deleteSession } from "../controllers/sessionController.js";



export const sessionRoutes = Router();

// GET all sessions
sessionRoutes.get("/", getAllSessions);

// GET a single session
sessionRoutes.get("/:id", getSessionById);

// CREATE a session
sessionRoutes.post("/", createSession);

// UPDATE a session
sessionRoutes.patch("/:id", updateSession);

// DELETE a session
sessionRoutes.delete("/:id", deleteSession);