import { prisma } from "../config/db.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: { department: true, user: { select: { email: true, name: true } } },
    });
    res.status(200).json(students);
  } catch (err) {
    console.error("getAllStudents error:", err);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { id: studentId } = req.params;

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { department: true, user: { select: { email: true, name: true } } },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (err) {
    console.error("getStudentById error:", err);
    res.status(500).json({ message: "Failed to fetch student" });
  }
};
export const createStudent = async (req, res) => {
  try {
    const { userId, matricNo, departmentId, level } = req.body;

    const student = await prisma.student.create({
      data: { userId, matricNo, departmentId,  level: parseInt(level, 10) },
    });

    res.status(201).json({ message: "created", data: student });
  } catch (err) {
    console.error("createStudent error:", err);
    res.status(500).json({ message: "Failed to create student" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { matricNo, departmentId, level } = req.body;

    const student = await prisma.student.update({
      where: { id },
      data: { matricNo, departmentId, level },
    });

    res.status(200).json(student);
  } catch (err) {
    console.error("updateStudent error:", err);
    res.status(500).json({ message: "Failed to update student" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.student.delete({ where: { id } });

    res.status(204).send();
  } catch (err) {
    console.error("deleteStudent error:", err);
    res.status(500).json({ message: "Failed to delete student" });
  }
};

export const getStudentResults = async (req, res) => {
  try {
    const { id } = req.params;

    const results = await prisma.result.findMany({
      where: { enrollment: { studentId: id } },
      include: {
        enrollment: {
          include: {
            offering: {
              include: { course: true, semester: { include: { session: true } } },
            },
          },
        },
      },
    });

    res.status(200).json(results);
  } catch (err) {
    console.error("getStudentResults error:", err);
    res.status(500).json({ message: "Failed to fetch results" });
  }
};
