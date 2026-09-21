import { prisma } from "../config/db.js";

export const getAllLecturers = async (req, res) => {
  try {
    const lecturers = await prisma.lecturer.findMany({
      include: { department: true, user: { select: { email: true, name: true } } },
    });
    res.status(200).json(lecturers);
  } catch (err) {
    console.error("getAllLecturers error:", err);
    res.status(500).json({ message: "Failed to fetch lecturers" });
  }
};

export const getLecturerById = async (req, res) => {
  try {
    const { id } = req.params;
    const lecturer = await prisma.lecturer.findUnique({
      where: { id },
      include: { department: true, user: { select: { email: true, name: true } } },
    });

    if (!lecturer) {
      return res.status(404).json({ message: "Lecturer not found" });
    }

    res.status(200).json(lecturer);
  } catch (err) {
    console.error("getLecturerById error:", err);
    res.status(500).json({ message: "Failed to fetch lecturer" });
  }
};

export const createLecturer = async (req, res) => {
  try {
    const { userId, departmentId } = req.body;
    const lecturer = await prisma.lecturer.create({
      data: { userId, departmentId },
    });
    res.status(201).json(lecturer);
  } catch (err) {
    console.error("createLecturer error:", err);
    res.status(500).json({ message: "Failed to create lecturer" });
  }
};

export const updateLecturer = async (req, res) => {
  try {
    const { id } = req.params;
    const { departmentId } = req.body;

    const lecturer = await prisma.lecturer.update({
      where: { id },
      data: { departmentId },
    });

    res.status(200).json(lecturer);
  } catch (err) {
    console.error("updateLecturer error:", err);
    res.status(500).json({ message: "Failed to update lecturer" });
  }
};

export const deleteLecturer = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.lecturer.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error("deleteLecturer error:", err);
    res.status(500).json({ message: "Failed to delete lecturer" });
  }
};

export const getLecturerOfferings = async (req, res) => {
  try {
    const { id } = req.params;
    const offerings = await prisma.courseOffering.findMany({
      where: { lecturerId: id },
      include: { course: true, semester: { include: { session: true } } },
    });
    res.status(200).json(offerings);
  } catch (err) {
    console.error("getLecturerOfferings error:", err);
    res.status(500).json({ message: "Failed to fetch offerings" });
  }
};
