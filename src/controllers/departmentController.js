import { prisma } from "../config/db.js";

export const getAllDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      include: { faculty: true },
    });
    res.status(200).json(departments);
  } catch (err) {
    console.error("getAllDepartments error:", err);
    res.status(500).json({ message: "Failed to fetch departments" });
  }
};

export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await prisma.department.findUnique({
      where: { id },
      include: { faculty: true, courses: true },
    });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(department);
  } catch (err) {
    console.error("getDepartmentById error:", err);
    res.status(500).json({ message: "Failed to fetch department" });
  }
};

export const createDepartment = async (req, res) => {
  try {
    const { name, facultyId } = req.body;
    const department = await prisma.department.create({
      data: { name, facultyId },
    });
    res.status(201).json(department);
  } catch (err) {
    console.error("createDepartment error:", err);
    res.status(500).json({ message: "Failed to create department" });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, facultyId } = req.body;

    const department = await prisma.department.update({
      where: { id },
      data: { name, facultyId },
    });

    res.status(200).json(department);
  } catch (err) {
    console.error("updateDepartment error:", err);
    res.status(500).json({ message: "Failed to update department" });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.department.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error("deleteDepartment error:", err);
    res.status(500).json({ message: "Failed to delete department" });
  }
};
