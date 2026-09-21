import { prisma } from "../config/db.js";

export const getAllSemesters = async (req, res) => {
  try {
    const semesters = await prisma.semester.findMany({
      include: { session: true },
    });
    res.status(200).json(semesters);
  } catch (err) {
    console.error("getAllSemesters error:", err);
    res.status(500).json({ message: "Failed to fetch semesters" });
  }
};

export const getSemesterById = async (req, res) => {
  try {
    const { id } = req.params;
    const semester = await prisma.semester.findUnique({
      where: { id },
      include: { session: true, offerings: true },
    });

    if (!semester) {
      return res.status(404).json({ message: "Semester not found" });
    }

    res.status(200).json(semester);
  } catch (err) {
    console.error("getSemesterById error:", err);
    res.status(500).json({ message: "Failed to fetch semester" });
  }
};

export const createSemester = async (req, res) => {
  try {
    const { name, sessionId } = req.body;
    const semester = await prisma.semester.create({
      data: { name, sessionId },
    });
    res.status(201).json(semester);
  } catch (err) {
    console.error("createSemester error:", err);
    res.status(500).json({ message: "Failed to create semester" });
  }
};

export const updateSemester = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sessionId } = req.body;

    const semester = await prisma.semester.update({
      where: { id },
      data: { name, sessionId },
    });
    res.status(200).json(semester);
  } catch (err) {
    console.error("updateSemester error:", err);
    res.status(500).json({ message: "Failed to update semester" });
  }
};

export const deleteSemester = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.semester.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error("deleteSemester error:", err);
    res.status(500).json({ message: "Failed to delete semester" });
  }
};
