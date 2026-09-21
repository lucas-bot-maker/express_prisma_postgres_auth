import { prisma } from "../config/db.js";

export const getAllSessions = async (req, res) => {
  try {
    const sessions = await prisma.session.findMany({
      include: { semesters: true },
    });
    res.status(200).json(sessions);
  } catch (err) {
    console.error("getAllSessions error:", err);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await prisma.session.findUnique({
      where: { id },
      include: { semesters: true },
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json(session);
  } catch (err) {
    console.error("getSessionById error:", err);
    res.status(500).json({ message: "Failed to fetch session" });
  }
};

export const createSession = async (req, res) => {
  try {
    const { name } = req.body;
    const session = await prisma.session.create({ data: { name } });
    res.status(201).json(session);
  } catch (err) {
    console.error("createSession error:", err);
    res.status(500).json({ message: "Failed to create session" });
  }
};

export const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const session = await prisma.session.update({
      where: { id },
      data: { name },
    });

    res.status(200).json(session);
  } catch (err) {
    console.error("updateSession error:", err);
    res.status(500).json({ message: "Failed to update session" });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.session.delete({ where: { id } });
    res.status(204).json({message:"session deleted"});
  } catch (err) {
    console.error("deleteSession error:", err);
    res.status(500).json({ message: "Failed to delete session" });
  }
};
