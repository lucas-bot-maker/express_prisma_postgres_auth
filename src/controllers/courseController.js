import { prisma } from "../config/db.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: { department: true },
    });
    res.status(200).json(courses);
  } catch (err) {
    console.error("getAllCourses error:", err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.findUnique({
      where: { id },
      include: { department: true, offerings: true },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (err) {
    console.error("getCourseById error:", err);
    res.status(500).json({ message: "Failed to fetch course" });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { code, title,  departmentId } = req.body;
       const unit = Number(req.body.unit);

    if (Number.isNaN(unit)) {
      return res.status(400).json({ message: "unit must be a valid number" });
    }


    const course = await prisma.course.create({
      data: { code, title, unit, departmentId },
    });
    res.status(201).json(course);
  } catch (err) {
    console.error("createCourse error:", err);
    res.status(500).json({ message: "Failed to create course" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, title, departmentId } = req.body;
     const unit = Number(req.body.unit);

    if (Number.isNaN(unit)) {
      return res.status(400).json({ message: "unit must be a valid number" });
    }

    const course = await prisma.course.update({
      where: { id },
      data: { code, title, unit, departmentId },
    });

    res.status(200).json(course);
  } catch (err) {
    console.error("updateCourse error:", err);
    res.status(500).json({ message: "Failed to update course" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.course.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error("deleteCourse error:", err);
    res.status(500).json({ message: "Failed to delete course" });
  }
};
