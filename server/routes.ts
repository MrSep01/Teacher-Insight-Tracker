import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAssessmentSchema, insertStudentSchema, insertStudentScoreSchema, insertClassSchema } from "@shared/schema";
import { aiEngine } from "./ai-recommendations";
import { setupAuth, requireAuth } from "./auth";
import { registerModuleRoutes } from "./modules";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Register module routes
  registerModuleRoutes(app);

  // Profile update routes (protected)
  app.put("/api/auth/update-profile", requireAuth, async (req, res) => {
    try {
      const userId = req.user.id;
      const { firstName, lastName, email } = req.body;
      
      const updatedUser = await storage.updateUser(userId, {
        firstName,
        lastName,
        email,
      });
      
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: "Failed to update profile" });
    }
  });

  app.put("/api/auth/update-curricula", requireAuth, async (req, res) => {
    try {
      const userId = req.user.id;
      const { curricula, gradeLevels } = req.body;
      
      const updatedUser = await storage.updateUser(userId, {
        curricula,
        gradeLevels,
      });
      
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: "Failed to update curricula" });
    }
  });

  // Classes routes (protected)
  app.get("/api/classes", requireAuth, async (req, res) => {
    try {
      const teacherId = req.user.id;
      const classes = await storage.getClassesByTeacherId(teacherId);
      res.json(classes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch classes" });
    }
  });

  app.post("/api/classes", requireAuth, async (req, res) => {
    try {
      const teacherId = req.user.id;
      const classData = insertClassSchema.parse({ ...req.body, teacherId });
      const newClass = await storage.createClass(classData);
      res.json(newClass);
    } catch (error) {
      res.status(400).json({ error: "Failed to create class" });
    }
  });

  app.put("/api/classes/:id", requireAuth, async (req, res) => {
    try {
      const classId = parseInt(req.params.id);
      const teacherId = req.user.id;
      
      // Verify the class belongs to the teacher
      const existingClass = await storage.getClassById(classId);
      if (!existingClass || existingClass.teacherId !== teacherId) {
        return res.status(404).json({ error: "Class not found" });
      }
      
      const classData = insertClassSchema.partial().parse(req.body);
      const updatedClass = await storage.updateClass(classId, classData);
      res.json(updatedClass);
    } catch (error) {
      res.status(400).json({ error: "Failed to update class" });
    }
  });

  app.delete("/api/classes/:id", requireAuth, async (req, res) => {
    try {
      const classId = parseInt(req.params.id);
      const teacherId = req.user.id;
      
      // Verify the class belongs to the teacher
      const existingClass = await storage.getClassById(classId);
      if (!existingClass || existingClass.teacherId !== teacherId) {
        return res.status(404).json({ error: "Class not found" });
      }
      
      const deleted = await storage.deleteClass(classId);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Class not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete class" });
    }
  });

  // Dashboard routes (protected)
  app.get("/api/dashboard/stats", requireAuth, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  app.get("/api/dashboard/students", async (req, res) => {
    try {
      const students = await storage.getStudentsWithScores();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch students with scores" });
    }
  });

  app.get("/api/dashboard/assessments/recent", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      const assessments = await storage.getRecentAssessments(limit);
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent assessments" });
    }
  });

  // Students routes
  app.get("/api/students", async (req, res) => {
    try {
      const search = req.query.search as string;
      if (search) {
        const students = await storage.searchStudents(search);
        res.json(students);
      } else {
        const students = await storage.getStudents();
        res.json(students);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch students" });
    }
  });

  app.get("/api/students/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const student = await storage.getStudentWithScores(id);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch student" });
    }
  });

  app.post("/api/students", async (req, res) => {
    try {
      const studentData = insertStudentSchema.parse(req.body);
      const student = await storage.createStudent(studentData);
      res.json(student);
    } catch (error) {
      res.status(400).json({ error: "Invalid student data" });
    }
  });

  app.put("/api/students/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const studentData = insertStudentSchema.partial().parse(req.body);
      const student = await storage.updateStudent(id, studentData);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      res.status(400).json({ error: "Invalid student data" });
    }
  });

  app.delete("/api/students/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteStudent(id);
      if (!success) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete student" });
    }
  });

  // Subjects routes
  app.get("/api/subjects", async (req, res) => {
    try {
      const subjects = await storage.getSubjects();
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subjects" });
    }
  });

  // Assessments routes
  app.get("/api/assessments", async (req, res) => {
    try {
      const assessments = await storage.getAssessments();
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch assessments" });
    }
  });

  app.get("/api/assessments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const assessment = await storage.getAssessmentWithDetails(id);
      if (!assessment) {
        return res.status(404).json({ error: "Assessment not found" });
      }
      res.json(assessment);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch assessment" });
    }
  });

  app.post("/api/assessments", async (req, res) => {
    try {
      const assessmentData = insertAssessmentSchema.parse(req.body);
      const assessment = await storage.createAssessment(assessmentData);
      res.json(assessment);
    } catch (error) {
      res.status(400).json({ error: "Invalid assessment data" });
    }
  });

  app.put("/api/assessments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const assessmentData = insertAssessmentSchema.partial().parse(req.body);
      const assessment = await storage.updateAssessment(id, assessmentData);
      if (!assessment) {
        return res.status(404).json({ error: "Assessment not found" });
      }
      res.json(assessment);
    } catch (error) {
      res.status(400).json({ error: "Invalid assessment data" });
    }
  });

  app.delete("/api/assessments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteAssessment(id);
      if (!success) {
        return res.status(404).json({ error: "Assessment not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete assessment" });
    }
  });

  // Student Scores routes
  app.post("/api/student-scores", async (req, res) => {
    try {
      const scoreData = insertStudentScoreSchema.parse(req.body);
      const score = await storage.createStudentScore(scoreData);
      res.json(score);
    } catch (error) {
      res.status(400).json({ error: "Invalid score data" });
    }
  });

  app.get("/api/students/:id/scores", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const scores = await storage.getStudentScoresByStudentId(id);
      res.json(scores);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch student scores" });
    }
  });

  // Lesson Recommendations routes
  app.get("/api/students/:id/recommendations", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const recommendations = await storage.getLessonRecommendationsByStudentId(id);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recommendations" });
    }
  });

  app.post("/api/students/:id/recommendations", async (req, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const { subjectId, title, description, priority } = req.body;
      
      const recommendation = await storage.createLessonRecommendation({
        studentId,
        subjectId,
        title,
        description,
        priority,
        isActive: true,
      });
      
      res.json(recommendation);
    } catch (error) {
      res.status(400).json({ error: "Invalid recommendation data" });
    }
  });

  // AI Recommendations routes
  app.get("/api/ai-recommendations/:studentId", async (req, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
      const student = await storage.getStudentWithScores(studentId);
      
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      const subjects = await storage.getSubjects();
      const allStudents = await storage.getStudentsWithScores();
      
      const recommendations = await aiEngine.generateDetailedRecommendations(
        student, 
        subjects, 
        allStudents
      );
      
      res.json(recommendations);
    } catch (error) {
      console.error('Error generating AI recommendations:', error);
      res.status(500).json({ error: "Failed to generate recommendations" });
    }
  });

  app.get("/api/ai-recommendations", async (req, res) => {
    try {
      const allStudents = await storage.getStudentsWithScores();
      const subjects = await storage.getSubjects();
      
      const allRecommendations = await Promise.all(
        allStudents.map(async (student) => {
          const recommendations = await aiEngine.generateDetailedRecommendations(
            student, 
            subjects, 
            allStudents
          );
          return {
            studentId: student.id,
            studentName: student.name,
            recommendations: recommendations.slice(0, 3) // Top 3 recommendations per student
          };
        })
      );
      
      res.json(allRecommendations);
    } catch (error) {
      console.error('Error generating bulk AI recommendations:', error);
      res.status(500).json({ error: "Failed to generate recommendations" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
