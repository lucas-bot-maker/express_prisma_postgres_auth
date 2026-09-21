import { prisma } from "../config/db.js";

export const getAllOfferings = async (req, res) => {
  try {
    const offerings = await prisma.courseOffering.findMany({
      include: {
        course: true,
        lecturer: { include: { user: { select: { name: true } } } },
        semester: { include: { session: true } },
      },
    });
    res.status(200).json(offerings);
  } catch (err) {
    console.error("getAllOfferings error:", err);
    res.status(500).json({ message: "Failed to fetch offerings" });
  }
};

export const getOfferingById = async (req, res) => {
  try {
    const { id } = req.params;
    const offering = await prisma.courseOffering.findUnique({
      where: { id },
      include: {
        course: true,
        lecturer: { include: { user: { select: { name: true } } } },
        semester: { include: { session: true } },
      },
    });

    if (!offering) {
      return res.status(404).json({ message: "Course offering not found" });
    }

    res.status(200).json(offering);
  } catch (err) {
    console.error("getOfferingById error:", err);
    res.status(500).json({ message: "Failed to fetch offering" });
  }
};

export const createOffering = async (req, res) => {
  try {
    const { courseId, lecturerId, semesterId } = req.body;


    const courseOffering = await prisma.courseOffering.create({
      data: { courseId, lecturerId, semesterId },
    });
    res.status(201).json(courseOffering);
  } catch (err) {
    console.error("createOffering error:", err);
    res.status(500).json({ message: "Failed to create offering" });
  }
};

export const updateOffering = async (req, res) => {
  try {
    const { id } = req.params;
    const { lecturerId } = req.body;

    const offering = await prisma.courseOffering.update({
      where: { id },
      data: { lecturerId },
    });

    res.status(200).json(offering);
  } catch (err) {
    console.error("updateOffering error:", err);
    res.status(500).json({ message: "Failed to update offering" });
  }
};

export const deleteOffering = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.courseOffering.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error("deleteOffering error:", err);
    res.status(500).json({ message: "Failed to delete offering" });
  }
};

export const getOfferingEnrollments = async (req, res) => {
  try {
    const { id } = req.params;
    const enrollments = await prisma.enrollment.findMany({
      where: { offeringId: id },
      include: { student: { include: { user: { select: { name: true } } } } },
    });
    res.status(200).json(enrollments);
  } catch (err) {
    console.error("getOfferingEnrollments error:", err);
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
};
