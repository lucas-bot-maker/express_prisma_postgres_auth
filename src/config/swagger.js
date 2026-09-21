export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Result Collation API",
    version: "1.0.0",
    description: "API for managing faculties, departments, students, lecturers, courses, enrollments, and results",
  },
 servers: [{ url: "http://localhost:5001" }],
  tags: [
    { name: "Auth" },
    { name: "Faculties" },
    { name: "Departments" },
    { name: "Students" },
    { name: "Lecturers" },
    { name: "Sessions" },
    { name: "Semesters" },
    { name: "Courses" },
    { name: "Offerings" },
    { name: "Enrollments" },
    { name: "Results" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Error: {
        type: "object",
        properties: { message: { type: "string" } },
      },
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          role: { type: "string", enum: ["ADMIN", "LECTURER", "STUDENT"] },
        },
      },
      Faculty: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
        },
      },
      Department: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          facultyId: { type: "string" },
        },
      },
      Student: {
        type: "object",
        properties: {
          id: { type: "string" },
          userId: { type: "string" },
          matricNo: { type: "string" },
          departmentId: { type: "string" },
          level: { type: "integer" },
        },
      },
      Lecturer: {
        type: "object",
        properties: {
          id: { type: "string" },
          userId: { type: "string" },
          departmentId: { type: "string" },
        },
      },
      Session: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string", example: "2025/2026" },
        },
      },
      Semester: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string", example: "First" },
          sessionId: { type: "string" },
        },
      },
      Course: {
        type: "object",
        properties: {
          id: { type: "string" },
          code: { type: "string", example: "CSC301" },
          title: { type: "string" },
          unit: { type: "integer" },
          departmentId: { type: "string" },
        },
      },
      CourseOffering: {
        type: "object",
        properties: {
          id: { type: "string" },
          courseId: { type: "string" },
          lecturerId: { type: "string" },
          semesterId: { type: "string" },
        },
      },
      Enrollment: {
        type: "object",
        properties: {
          id: { type: "string" },
          studentId: { type: "string" },
          offeringId: { type: "string" },
        },
      },
      Result: {
        type: "object",
        properties: {
          id: { type: "string" },
          enrollmentId: { type: "string" },
          caScore: { type: "number" },
          examScore: { type: "number" },
          totalScore: { type: "number" },
          grade: { type: "string" },
          gradePoint: { type: "number" },
          status: { type: "string", enum: ["PENDING", "APPROVED", "REJECTED"] },
          createdAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
  paths: {
    // ===== AUTH =====
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                  role: { type: "string", enum: ["ADMIN", "LECTURER", "STUDENT"] },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "User created", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
          400: { description: "Missing fields or user already exists" },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Log in and receive a JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
            content: { "application/json": { schema: { type: "object", properties: { token: { type: "string" } } } } },
          },
          400: { description: "Invalid credentials" },
        },
      },
    },
    "/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get the authenticated user's profile",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Current user", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
          401: { description: "Not authenticated" },
          404: { description: "User not found" },
        },
      },
    },
    "/auth/change_password": {
      patch: {
        tags: ["Auth"],
        summary: "Change the authenticated user's password",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["password"], properties: { password: { type: "string" } } },
            },
          },
        },
        responses: {
          200: { description: "Password changed" },
          400: { description: "Password field is required" },
          401: { description: "Not authenticated" },
        },
      },
    },

    // ===== FACULTIES =====
    "/faculties": {
      get: {
        tags: ["Faculties"],
        summary: "Get all faculties",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "List of faculties", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Faculty" } } } } } },
      },
      post: {
        tags: ["Faculties"],
        summary: "Create a faculty",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object", required: ["name"], properties: { name: { type: "string" } } } } },
        },
        responses: { 201: { description: "Faculty created", content: { "application/json": { schema: { $ref: "#/components/schemas/Faculty" } } } } },
      },
    },
    "/faculties/{id}": {
      get: {
        tags: ["Faculties"],
        summary: "Get a faculty by ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Faculty found" }, 404: { description: "Faculty not found" } },
      },
      patch: {
        tags: ["Faculties"],
        summary: "Update a faculty",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          content: { "application/json": { schema: { type: "object", properties: { name: { type: "string" } } } } },
        },
        responses: { 200: { description: "Faculty updated" } },
      },
      delete: {
        tags: ["Faculties"],
        summary: "Delete a faculty",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 204: { description: "Faculty deleted" } },
      },
    },

    // ===== DEPARTMENTS =====
    "/departments": {
      get: {
        tags: ["Departments"],
        summary: "Get all departments",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "List of departments", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Department" } } } } } },
      },
      post: {
        tags: ["Departments"],
        summary: "Create a department",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["name", "facultyId"], properties: { name: { type: "string" }, facultyId: { type: "string" } } },
            },
          },
        },
        responses: { 201: { description: "Department created" } },
      },
    },
    "/departments/{id}": {
      get: {
        tags: ["Departments"],
        summary: "Get a department by ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Department found" }, 404: { description: "Department not found" } },
      },
      patch: {
        tags: ["Departments"],
        summary: "Update a department",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          content: { "application/json": { schema: { type: "object", properties: { name: { type: "string" }, facultyId: { type: "string" } } } } },
        },
        responses: { 200: { description: "Department updated" } },
      },
      delete: {
        tags: ["Departments"],
        summary: "Delete a department",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 204: { description: "Department deleted" } },
      },
    },

    // ===== STUDENTS =====
    "/students": {
      get: {
        tags: ["Students"],
        summary: "Get all students",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "List of students", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Student" } } } } } },
      },
      post: {
        tags: ["Students"],
        summary: "Create a student profile",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["userId", "matricNo", "departmentId", "level"],
                properties: {
                  userId: { type: "string" },
                  matricNo: { type: "string" },
                  departmentId: { type: "string" },
                  level: { type: "integer" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Student created" } },
      },
    },
    "/students/{id}": {
      get: {
        tags: ["Students"],
        summary: "Get a student by ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Student found" }, 404: { description: "Student not found" } },
      },
      patch: {
        tags: ["Students"],
        summary: "Update a student",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          content: {
            "application/json": {
              schema: { type: "object", properties: { matricNo: { type: "string" }, departmentId: { type: "string" }, level: { type: "integer" } } },
            },
          },
        },
        responses: { 200: { description: "Student updated" } },
      },
      delete: {
        tags: ["Students"],
        summary: "Delete a student",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 204: { description: "Student deleted" } },
      },
    },
    "/students/{id}/results": {
      get: {
        tags: ["Students"],
        summary: "Get all results for a student",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Student's results", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Result" } } } } } },
      },
    },

    // ===== LECTURERS =====
    "/lecturers": {
      get: {
        tags: ["Lecturers"],
        summary: "Get all lecturers",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "List of lecturers", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Lecturer" } } } } } },
      },
      post: {
        tags: ["Lecturers"],
        summary: "Create a lecturer profile",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["userId", "departmentId"], properties: { userId: { type: "string" }, departmentId: { type: "string" } } },
            },
          },
        },
        responses: { 201: { description: "Lecturer created" } },
      },
    },
    "/lecturers/{id}": {
      get: {
        tags: ["Lecturers"],
        summary: "Get a lecturer by ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Lecturer found" }, 404: { description: "Lecturer not found" } },
      },
      patch: {
        tags: ["Lecturers"],
        summary: "Update a lecturer",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          content: { "application/json": { schema: { type: "object", properties: { departmentId: { type: "string" } } } } },
        },
        responses: { 200: { description: "Lecturer updated" } },
      },
      delete: {
        tags: ["Lecturers"],
        summary: "Delete a lecturer",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 204: { description: "Lecturer deleted" } },
      },
    },
    "/lecturers/{id}/offerings": {
      get: {
        tags: ["Lecturers"],
        summary: "Get all course offerings taught by a lecturer",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Lecturer's offerings", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/CourseOffering" } } } } } },
      },
    },

    // ===== SESSIONS =====
    "/sessions": {
      get: {
        tags: ["Sessions"],
        summary: "Get all sessions",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "List of sessions", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Session" } } } } } },
      },
      post: {
        tags: ["Sessions"],
        summary: "Create a session",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object", required: ["name"], properties: { name: { type: "string", example: "2025/2026" } } } } },
        },
        responses: { 201: { description: "Session created" } },
      },
    },
    "/sessions/{id}": {
      get: {
        tags: ["Sessions"],
        summary: "Get a session by ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Session found" }, 404: { description: "Session not found" } },
      },
      patch: {
        tags: ["Sessions"],
        summary: "Update a session",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          content: { "application/json": { schema: { type: "object", properties: { name: { type: "string" } } } } },
        },
        responses: { 200: { description: "Session updated" } },
      },
      delete: {
        tags: ["Sessions"],
        summary: "Delete a session",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 204: { description: "Session deleted" } },
      },
    },

    // ===== SEMESTERS =====
    "/semesters": {
      get: {
        tags: ["Semesters"],
        summary: "Get all semesters",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "List of semesters", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Semester" } } } } } },
      },
      post: {
        tags: ["Semesters"],
        summary: "Create a semester",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["name", "sessionId"], properties: { name: { type: "string", example: "First" }, sessionId: { type: "string" } } },
            },
          },
        },
        responses: { 201: { description: "Semester created" } },
      },
    },
    "/semesters/{id}": {
      get: {
        tags: ["Semesters"],
        summary: "Get a semester by ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Semester found" }, 404: { description: "Semester not found" } },
      },
      patch: {
        tags: ["Semesters"],
        summary: "Update a semester",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          content: { "application/json": { schema: { type: "object", properties: { name: { type: "string" }, sessionId: { type: "string" } } } } },
        },
        responses: { 200: { description: "Semester updated" } },
      },
      delete: {
        tags: ["Semesters"],
        summary: "Delete a semester",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 204: { description: "Semester deleted" } },
      },
    },

    // ===== COURSES =====
    "/courses": {
      get: {
        tags: ["Courses"],
        summary: "Get all courses",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "List of courses", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Course" } } } } } },
      },
      post: {
        tags: ["Courses"],
        summary: "Create a course",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["code", "title", "unit", "departmentId"],
                properties: {
                  code: { type: "string", example: "CSC301" },
                  title: { type: "string" },
                  unit: { type: "integer" },
                  departmentId: { type: "string" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Course created" }, 400: { description: "unit must be a valid number" } },
      },
    },
    "/courses/{id}": {
      get: {
        tags: ["Courses"],
        summary: "Get a course by ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Course found" }, 404: { description: "Course not found" } },
      },
      patch: {
        tags: ["Courses"],
        summary: "Update a course",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          content: {
            "application/json": {
              schema: { type: "object", properties: { code: { type: "string" }, title: { type: "string" }, unit: { type: "integer" }, departmentId: { type: "string" } } },
            },
          },
        },
        responses: { 200: { description: "Course updated" }, 400: { description: "unit must be a valid number" } },
      },
      delete: {
        tags: ["Courses"],
        summary: "Delete a course",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 204: { description: "Course deleted" } },
      },
    },

    // ===== OFFERINGS =====
    "/offerings": {
      get: {
        tags: ["Offerings"],
        summary: "Get all course offerings",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "List of offerings", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/CourseOffering" } } } } } },
      },
      post: {
        tags: ["Offerings"],
        summary: "Create a course offering",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["courseId", "lecturerId", "semesterId"],
                properties: { courseId: { type: "string" }, lecturerId: { type: "string" }, semesterId: { type: "string" } },
              },
            },
          },
        },
        responses: { 201: { description: "Offering created" }, 409: { description: "This course is already offered for that semester" } },
      },
    },
    "/offerings/{id}": {
      get: {
        tags: ["Offerings"],
        summary: "Get a course offering by ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Offering found" }, 404: { description: "Course offering not found" } },
      },
      patch: {
        tags: ["Offerings"],
        summary: "Update a course offering's lecturer",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          content: { "application/json": { schema: { type: "object", properties: { lecturerId: { type: "string" } } } } },
        },
        responses: { 200: { description: "Offering updated" } },
      },
      delete: {
        tags: ["Offerings"],
        summary: "Delete a course offering",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 204: { description: "Offering deleted" } },
      },
    },
    "/offerings/{id}/enrollments": {
      get: {
        tags: ["Offerings"],
        summary: "Get all enrollments for a course offering",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Offering's enrollments", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Enrollment" } } } } } },
      },
    },

    // ===== ENROLLMENTS =====
    "/enrollments": {
      get: {
        tags: ["Enrollments"],
        summary: "Get all enrollments",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "List of enrollments", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Enrollment" } } } } } },
      },
      post: {
        tags: ["Enrollments"],
        summary: "Enroll a student in a course offering",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["studentId", "offeringId"], properties: { studentId: { type: "string" }, offeringId: { type: "string" } } },
            },
          },
        },
        responses: { 201: { description: "Enrollment created" } },
      },
    },
    "/enrollments/{id}": {
      get: {
        tags: ["Enrollments"],
        summary: "Get an enrollment by ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Enrollment found" }, 404: { description: "Enrollment not found" } },
      },
      patch: {
        tags: ["Enrollments"],
        summary: "Update an enrollment",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object", required: ["studentId", "offeringId"], properties: { studentId: { type: "string" }, offeringId: { type: "string" } } },
            },
          },
        },
        responses: { 200: { description: "Enrollment updated" }, 400: { description: "studentId and offeringId are required" } },
      },
      delete: {
        tags: ["Enrollments"],
        summary: "Delete an enrollment",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 204: { description: "Enrollment deleted" } },
      },
    },

    // ===== RESULTS =====
    "/results": {
      get: {
        tags: ["Results"],
        summary: "Get all results",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "List of results", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Result" } } } } } },
      },
      post: {
        tags: ["Results"],
        summary: "Submit a result",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["enrollmentId", "caScore", "examScore"],
                properties: { enrollmentId: { type: "string" }, caScore: { type: "number" }, examScore: { type: "number" } },
              },
            },
          },
        },
        responses: { 201: { description: "Result created" }, 400: { description: "caScore and examScore must be valid numbers" } },
      },
    },
    "/results/{id}": {
      get: {
        tags: ["Results"],
        summary: "Get a result by ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Result found" }, 404: { description: "Result not found" } },
      },
      patch: {
        tags: ["Results"],
        summary: "Update a result's scores (resets status to PENDING)",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        requestBody: {
          content: { "application/json": { schema: { type: "object", properties: { caScore: { type: "number" }, examScore: { type: "number" } } } } },
        },
        responses: { 200: { description: "Result updated" }, 400: { description: "caScore and examScore must be valid numbers" } },
      },
      delete: {
        tags: ["Results"],
        summary: "Delete a result",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 204: { description: "Result deleted" } },
      },
    },
    "/results/{id}/approve": {
      patch: {
        tags: ["Results"],
        summary: "Approve a result",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Result approved" }, 404: { description: "Result not found" } },
      },
    },
    "/results/{id}/reject": {
      patch: {
        tags: ["Results"],
        summary: "Reject a result",
        security: [{ bearerAuth: [] }],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Result rejected" }, 404: { description: "Result not found" } },
      },
    },
    "/results/student/{studentId}/semester/{semesterId}": {
      get: {
        tags: ["Results"],
        summary: "Get a student's results for a specific semester",
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: "path", name: "studentId", required: true, schema: { type: "string" } },
          { in: "path", name: "semesterId", required: true, schema: { type: "string" } },
        ],
        responses: { 200: { description: "Student's results for that semester", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Result" } } } } } },
      },
    },
  },
};