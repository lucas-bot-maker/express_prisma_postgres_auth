import { prisma } from "../config/db.js";

export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: {
        student: true,
        offering: { include: { course: true, semester: true } },
      },
    });
    res.status(200).json(enrollments);
  } catch (err) {
    console.error("getAllEnrollments error:", err);
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
};

export const getEnrollmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      include: {
        student: true,
        offering: { include: { course: true, semester: true } },
        result: true,
      },
    });

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.status(200).json(enrollment);
  } catch (err) {
    console.error("getEnrollmentById error:", err);
    res.status(500).json({ message: "Failed to fetch enrollment" });
  }
};

// export const createEnrollment = async (req, res) => {
//   try {
//     const { studentId, offeringId } = req.body;
//     const enrollment = await prisma.enrollment.create({
//       data: { studentId, offeringId },
//     });
//     res.status(201).json(enrollment);
//   } catch (err) {
//     console.error("createEnrollment error:", err);
//     res.status(500).json({ message: "Failed to create enrollment" });
//   }
// };

export const createEnrollment = async (req, res) => {
  try {
    const { studentId, offeringId } = req.body;
     console.log("studentId:", JSON.stringify(studentId), "offeringId:", JSON.stringify(offeringId));

    const enrollment = await prisma.enrollment.create({
      data: {
        student: { connect: { id: studentId } },
        offering: { connect: { id: offeringId } },
      },
    });
    res.status(201).json(enrollment);
  } catch (err) {
    console.error("createEnrollment error:", err);
    if (err.code === "P2002") {
      return res.status(409).json({ message: "Student already enrolled in this course offering" });
    }
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Student or course offering not found" });
    }
    res.status(500).json({ message: "Failed to create enrollment" });
  }
};

// export const createEnrollment = async (req, res) => {
//   try {
//     const { studentId, offeringId } = req.body;

//     // 1. Validate that the required IDs are present
//     if (!studentId) {
//       return res.status(400).json({ 
//         message: "Both studentId and offeringId are required." 
//       });
//     }

//     // 2. Create the enrollment using relation connectors
//     const enrollment = await prisma.enrollment.create({
//       data: {
//         student: {
//           connect: { id: studentId }
//         },
//         offering: {
//           connect: { id: offeringId }
//         }
//       },
//     });

//     res.status(201).json(enrollment);
//   } catch (err) {
//     console.error("createEnrollment error:", err);
//     res.status(500).json({ message: "Failed to create enrollment" });
//   }
// };


export const updateEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, offeringId } = req.body;

    if (!studentId || !offeringId) {
      return res.status(400).json({
        message: "studentId and offeringId are required",
      });
    }

    const enrollment = await prisma.enrollment.update({
      where: { id },
      data: {
        studentId,
        offeringId,
      },
      include: {
        student: true,
        offering: {
          include: {
            course: true,
            semester: true,
          },
        },
        result: true,
      },
    });

    res.status(200).json(enrollment);
  } catch (err) {
    console.error("updateEnrollment error:", err);
    res.status(500).json({
      message: "Failed to update enrollment",
    });
  }
};


export const deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.enrollment.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error("deleteEnrollment error:", err);
    res.status(500).json({ message: "Failed to delete enrollment" });
  }
};
