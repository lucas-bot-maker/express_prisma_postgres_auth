import {prisma} from "../config/db.js";

export const getAllFaculties = async (req, res) => {
  try {
    const faculties = await prisma.faculty.findMany({
      include: { departments: true },
    });
    res.status(200).json(faculties);
  } catch (err) {
    console.error("getAllFaculties error:", err);
    res.status(500).json({ message: "Failed to fetch faculties" });
  }
};

export const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await prisma.faculty.findUnique({
      where: { id },
      include: { departments: true },
    });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json(faculty);
  } catch (err) {
    console.error("getFacultyById error:", err);
    res.status(500).json({ message: "Failed to fetch faculty" });
  }
};

export const createFaculty = async (req, res) => {
  try {
    const { name } = req.body;
    const faculty = await prisma.faculty.create({ data: { name } });
    res.status(201).json(faculty);
  } catch (err) {
    console.error("createFaculty error:", err);
    res.status(500).json({ message: "Failed to create faculty" });
  }
};

export const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const faculty = await prisma.faculty.update({
      where: { id },
      data: { name },
    });

    res.status(200).json(faculty);
  } catch (err) {
    console.error("updateFaculty error:", err);
    res.status(500).json({ message: "Failed to update faculty" });
  }
};

export const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.faculty.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error("deleteFaculty error:", err);
    res.status(500).json({ message: "Failed to delete faculty" });
  }
};