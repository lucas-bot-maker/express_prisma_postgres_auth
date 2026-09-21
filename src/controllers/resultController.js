import { prisma } from "../config/db.js";

const calculateGrade = (totalScore) => {
  if (totalScore >= 70) return { grade: "A", gradePoint: 5.0 };
  if (totalScore >= 60) return { grade: "B", gradePoint: 4.0 };
  if (totalScore >= 50) return { grade: "C", gradePoint: 3.0 };
  if (totalScore >= 45) return { grade: "D", gradePoint: 2.0 };
  if (totalScore >= 40) return { grade: "E", gradePoint: 1.0 };
  return { grade: "F", gradePoint: 0.0 };
};

export const getAllResults = async (req, res) => {
  try {
    const results = await prisma.result.findMany({
      include: {
        enrollment: {
          include: { student: true, offering: { include: { course: true } } },
        },
      },
    });
    res.status(200).json(results);
  } catch (err) {
    console.error("getAllResults error:", err);
    res.status(500).json({ message: "Failed to fetch results" });
  }
};

export const getResultById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.result.findUnique({
      where: { id },
      include: {
        enrollment: {
          include: { student: true, offering: { include: { course: true } } },
        },
      },
    });

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("getResultById error:", err);
    res.status(500).json({ message: "Failed to fetch result" });
  }
};



export const createResult = async (req, res) => {
  try {
    const { enrollmentId } = req.body;
    const caScore = Number(req.body.caScore);
    const examScore = Number(req.body.examScore);

    if (Number.isNaN(caScore) || Number.isNaN(examScore)) {
      return res.status(400).json({ message: "caScore and examScore must be valid numbers" });
    }

    const totalScore = caScore + examScore;
    const { grade, gradePoint } = calculateGrade(totalScore);

    const result = await prisma.result.create({
      data: { enrollmentId, caScore, examScore, totalScore, grade, gradePoint },
    });

    res.status(201).json(result);
  } catch (err) {
    console.error("createResult error:", err);
    res.status(500).json({ message: "Failed to create result" });
  }
};

export const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
     const caScore = Number(req.body.caScore);
    const examScore = Number(req.body.examScore);

    if (Number.isNaN(caScore) || Number.isNaN(examScore)) {
      return res.status(400).json({ message: "caScore and examScore must be valid numbers" });
    }
   
    const totalScore = caScore + examScore;
    const { grade, gradePoint } = calculateGrade(totalScore);

    const result = await prisma.result.update({
      where: { id },
      data: { caScore, examScore, totalScore, grade, gradePoint, status: "PENDING" },
    });

    res.status(200).json(result);
  } catch (err) {
    console.error("updateResult error:", err);
    res.status(500).json({ message: "Failed to update result" });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.result.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error("deleteResult error:", err);
    res.status(500).json({ message: "Failed to delete result" });
  }
};

export const approveResult = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.result.update({
      where: { id },
      data: { status: "APPROVED" },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error("approveResult error:", err);
    res.status(500).json({ message: "Failed to approve result" });
  }
};

export const rejectResult = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.result.update({
      where: { id },
      data: { status: "REJECTED" },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error("rejectResult error:", err);
    res.status(500).json({ message: "Failed to reject result" });
  }
};

export const getStudentSemesterResults = async (req, res) => {
  try {
    const { studentId, semesterId } = req.params;

    const results = await prisma.result.findMany({
      where: {
        enrollment: {
          studentId,
          offering: { semesterId },
        },
      },
      include: {
        enrollment: { include: { offering: { include: { course: true } } } },
      },
    });

    res.status(200).json(results);
  } catch (err) {
    console.error("getStudentSemesterResults error:", err);
    res.status(500).json({ message: "Failed to fetch results" });
  }
};
