import express from "express";
import cors from "cors"
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { userRoute } from "./routes/userRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { logger } from "./middlewares/logger.js";
import { studentRoutes } from "./routes/studentRoutes.js";
import { facultyRoutes } from "./routes/facultyRoutes.js";
import { departmentRoutes } from "./routes/departmentRoutes.js";
import { sessionRoutes } from "./routes/sessionRoutes.js";
import { semesterRoutes } from "./routes/semesterRoutes.js";
import { courseRoutes } from "./routes/courseRoutes.js";
import { lecturerRoutes } from "./routes/lecturerRoutes.js";
import { courseOfferingRoutes } from "./routes/courseOfferingRoutes.js";
import { enrollmentRoutes } from "./routes/enrollmentRoutes.js";
import { resultRoutes } from "./routes/resultRoutes.js";
// import { auth_middleware } from "./middlewares/authMiddleware.js";

export const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
// app.use(auth_middleware);
app.use("/users", userRoute);
app.use("/auth", authRoutes);

app.use("/faculty", facultyRoutes)
app.use("/department", departmentRoutes)
app.use("/student", studentRoutes )
app.use("/session", sessionRoutes)
app.use("/semester", semesterRoutes)
app.use("/course", courseRoutes)
app.use("/lecturer", lecturerRoutes)
app.use("/offering", courseOfferingRoutes)
app.use("/enrollment", enrollmentRoutes)
app.use("/result", resultRoutes)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
