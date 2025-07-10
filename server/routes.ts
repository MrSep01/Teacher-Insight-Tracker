import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAssessmentSchema, insertStudentSchema, insertStudentScoreSchema, insertClassSchema, insertCourseSchema, insertCourseModuleSchema } from "@shared/schema";
import { aiEngine } from "./ai-recommendations";
import { aiAssessmentGenerator } from "./ai-assessment-generator";
import { enhancedLessonGenerator } from "./enhanced-lesson-generator";
import { enhancedAssessmentGenerator } from "./enhanced-assessment-generator";
import { comprehensiveLessonGenerator } from "./comprehensive-lesson-generator";
import { setupAuth, requireAuth } from "./auth";
import { registerModuleRoutes } from "./modules";
import { registerCurriculumRoutes } from "./curriculum-api";
import { emailService } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Register module routes
  registerModuleRoutes(app);

  // Register curriculum routes
  registerCurriculumRoutes(app);

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

  // Courses routes (protected)
  app.get("/api/courses", requireAuth, async (req, res) => {
    try {
      const teacherId = req.user.id;
      const courses = await storage.getCoursesByTeacherId(teacherId);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  app.post("/api/courses", requireAuth, async (req, res) => {
    try {
      const teacherId = req.user.id;
      console.log("Creating course with data:", req.body);
      const courseData = insertCourseSchema.parse({ ...req.body, teacherId });
      const newCourse = await storage.createCourse(courseData);
      res.json(newCourse);
    } catch (error) {
      console.error("Course creation error:", error);
      res.status(400).json({ error: "Failed to create course", details: error.message });
    }
  });

  app.patch("/api/courses/:id", requireAuth, async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      const teacherId = req.user.id;
      
      // Verify the course belongs to the teacher
      const existingCourse = await storage.getCourseById(courseId);
      if (!existingCourse || existingCourse.teacherId !== teacherId) {
        return res.status(404).json({ error: "Course not found" });
      }
      
      const courseData = insertCourseSchema.partial().parse(req.body);
      const updatedCourse = await storage.updateCourse(courseId, courseData);
      res.json(updatedCourse);
    } catch (error) {
      res.status(400).json({ error: "Failed to update course" });
    }
  });

  app.delete("/api/courses/:id", requireAuth, async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      const teacherId = req.user.id;
      
      // Verify the course belongs to the teacher
      const existingCourse = await storage.getCourseById(courseId);
      if (!existingCourse || existingCourse.teacherId !== teacherId) {
        return res.status(404).json({ error: "Course not found" });
      }
      
      const deleted = await storage.deleteCourse(courseId);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Course not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete course" });
    }
  });

  // Course module management routes (protected)
  app.get("/api/courses/:id/modules", requireAuth, async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      const teacherId = req.user.id;
      
      // Verify the course belongs to the teacher
      const existingCourse = await storage.getCourseById(courseId);
      if (!existingCourse || existingCourse.teacherId !== teacherId) {
        return res.status(404).json({ error: "Course not found" });
      }
      
      const modules = await storage.getCourseModules(courseId);
      res.json(modules);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch course modules" });
    }
  });

  app.post("/api/courses/:id/modules", requireAuth, async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      const teacherId = req.user.id;
      
      // Verify the course belongs to the teacher
      const existingCourse = await storage.getCourseById(courseId);
      if (!existingCourse || existingCourse.teacherId !== teacherId) {
        return res.status(404).json({ error: "Course not found" });
      }
      
      const { moduleId, sequenceOrder } = req.body;
      const courseModuleData = insertCourseModuleSchema.parse({
        courseId,
        moduleId,
        sequenceOrder: sequenceOrder || 1
      });
      
      const newCourseModule = await storage.addModuleToCourse(courseModuleData);
      res.json(newCourseModule);
    } catch (error) {
      res.status(400).json({ error: "Failed to add module to course" });
    }
  });

  app.get("/api/courses/:id/available-modules", requireAuth, async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      const teacherId = req.user.id;
      
      // Verify the course belongs to the teacher
      const existingCourse = await storage.getCourseById(courseId);
      if (!existingCourse || existingCourse.teacherId !== teacherId) {
        return res.status(404).json({ error: "Course not found" });
      }
      
      const availableModules = await storage.getAvailableModulesForCourse(courseId, teacherId);
      res.json(availableModules);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch available modules" });
    }
  });

  app.delete("/api/courses/:id/modules/:moduleId", requireAuth, async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      const moduleId = parseInt(req.params.moduleId);
      const teacherId = req.user.id;
      
      // Verify the course belongs to the teacher
      const existingCourse = await storage.getCourseById(courseId);
      if (!existingCourse || existingCourse.teacherId !== teacherId) {
        return res.status(404).json({ error: "Course not found" });
      }
      
      const deleted = await storage.removeModuleFromCourse(courseId, moduleId);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Module not found in course" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to remove module from course" });
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

  // AI Assessment Generation Routes
  app.post("/api/assessments/generate-objectives", requireAuth, async (req, res) => {
    try {
      const { topics, curriculum, gradeLevel } = req.body;
      const objectives = await aiAssessmentGenerator.generateObjectivesFromTopics(topics, curriculum, gradeLevel);
      res.json({ objectives });
    } catch (error) {
      console.error("Error generating objectives:", error);
      res.status(500).json({ error: "Failed to generate learning objectives" });
    }
  });

  app.post("/api/assessments/suggest-topics", requireAuth, async (req, res) => {
    try {
      const { moduleId } = req.body;
      const module = await storage.getModuleById(moduleId);
      if (!module) {
        return res.status(404).json({ error: "Module not found" });
      }
      const topics = await aiAssessmentGenerator.suggestTopicsFromModule(module);
      res.json({ topics });
    } catch (error) {
      console.error("Error suggesting topics:", error);
      res.status(500).json({ error: "Failed to suggest topics" });
    }
  });

  app.post("/api/assessments/generate", requireAuth, async (req, res) => {
    try {
      const generatedAssessment = await aiAssessmentGenerator.generateAssessment(req.body);
      
      // Create the assessment in the database
      const assessmentData = {
        title: generatedAssessment.title,
        description: generatedAssessment.description,
        subjectId: req.body.subjectId,
        moduleId: req.body.moduleId,
        classId: req.body.classId,
        topics: req.body.topics,
        objectives: req.body.objectives.map((obj: any) => obj.objective),
        assessmentType: req.body.assessmentType,
        difficulty: req.body.difficulty,
        questionTypes: req.body.questionTypes,
        totalPoints: generatedAssessment.totalPoints,
        estimatedDuration: generatedAssessment.estimatedDuration,
        instructions: generatedAssessment.instructions,
        markingScheme: JSON.stringify(generatedAssessment.markingScheme),
        aiGenerated: true,
        date: new Date(),
      };

      const newAssessment = await storage.createAssessment(assessmentData);
      
      res.json({
        assessment: newAssessment,
        generatedContent: generatedAssessment
      });
    } catch (error) {
      console.error("Error generating assessment:", error);
      res.status(500).json({ error: "Failed to generate assessment" });
    }
  });

  // Assessments routes
  app.get("/api/assessments", requireAuth, async (req, res) => {
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

  // Enhanced Lesson Creation Routes
  app.post("/api/lessons/ai-generate", requireAuth, async (req, res) => {
    try {
      const result = await enhancedLessonGenerator.generateAILesson(req.body);
      res.json(result);
    } catch (error) {
      console.error('Error generating AI lesson:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/lessons/manual-create", requireAuth, async (req, res) => {
    try {
      const result = await enhancedLessonGenerator.createManualLesson(req.body);
      res.json(result);
    } catch (error) {
      console.error('Error creating manual lesson:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Comprehensive Lesson Generation Routes
  app.post("/api/lessons/comprehensive-generate", requireAuth, async (req, res) => {
    try {
      const result = await comprehensiveLessonGenerator.generateFullLesson(req.body);
      res.json(result);
    } catch (error) {
      console.error('Error generating comprehensive lesson:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get student performance data for lesson differentiation
  app.get("/api/lessons/student-performance/:moduleId", requireAuth, async (req, res) => {
    try {
      const moduleId = parseInt(req.params.moduleId);
      const teacherId = req.user.id;
      
      // Get all students for this teacher
      const allStudents = await storage.getStudentsWithScores();
      
      // Get student performance data for differentiation
      const studentPerformanceData = await Promise.all(
        allStudents.map(async (student) => {
          const patterns = aiEngine.analyzeLearningPatterns(student);
          return {
            studentId: student.id,
            name: student.name,
            averageScore: student.averageScore || 0,
            strengths: patterns.strengths || [],
            weaknesses: patterns.weaknesses || [],
            learningStyle: patterns.learningStyle || "mixed",
          };
        })
      );
      
      res.json(studentPerformanceData);
    } catch (error) {
      console.error('Error fetching student performance data:', error);
      res.status(500).json({ error: "Failed to fetch student performance data" });
    }
  });

  // Get lesson with full content including multimedia and teacher guide
  app.get("/api/lessons/:id/full-content", requireAuth, async (req, res) => {
    try {
      const lessonId = parseInt(req.params.id);
      const lesson = await storage.getLessonPlanById(lessonId);
      
      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      
      // Parse the AI suggestions to get full lesson content
      let fullContent = null;
      if (lesson.aiSuggestions) {
        try {
          fullContent = JSON.parse(lesson.aiSuggestions);
        } catch (parseError) {
          console.error('Error parsing AI suggestions:', parseError);
        }
      }
      
      // Parse the full lesson content JSON
      let fullLessonContent = null;
      if (lesson.fullLessonContent) {
        try {
          fullLessonContent = JSON.parse(lesson.fullLessonContent);
        } catch (parseError) {
          console.error('Error parsing full lesson content:', parseError);
        }
      }
      
      const responseData = {
        ...lesson,
        fullContent: fullLessonContent || fullContent,
        studentWorksheet: lesson.studentWorksheet,
        teachingScript: lesson.teachingScript,
        assessmentQuestions: lesson.assessmentQuestions
      };
      
      // Debug logging
      console.log('Sending lesson data with comprehensive content:', {
        id: lesson.id,
        title: lesson.title,
        hasFullContent: !!responseData.fullContent,
        hasStudentWorksheet: !!responseData.studentWorksheet,
        hasTeachingScript: !!responseData.teachingScript,
        hasAssessmentQuestions: !!responseData.assessmentQuestions
      });
      
      res.json(responseData);
    } catch (error) {
      console.error('Error fetching full lesson content:', error);
      res.status(500).json({ error: "Failed to fetch lesson content" });
    }
  });

  // AI generation for individual lesson sections
  app.post("/api/lessons/ai-generate-section", requireAuth, async (req, res) => {
    try {
      const { section, currentContent, moduleObjectives, lessonTopic } = req.body;
      
      if (!section || !lessonTopic) {
        return res.status(400).json({ error: "Section and lesson topic are required" });
      }

      const aiContent = await aiLessonGenerator.generateLessonSection({
        section,
        currentContent,
        moduleObjectives: moduleObjectives || [],
        lessonTopic,
        curriculum: "IGCSE Chemistry Edexcel",
        gradeLevels: ["10", "11"]
      });

      res.json({ content: aiContent });
    } catch (error) {
      console.error('Error generating AI section:', error);
      res.status(500).json({ error: error.message || "Failed to generate AI content" });
    }
  });

  // Create manual lesson with structured template
  app.post("/api/lessons/manual-create", requireAuth, async (req, res) => {
    try {
      const userId = req.user!.id;
      const lessonData = req.body;
      
      // Validate required fields
      if (!lessonData.title || !lessonData.moduleId || !lessonData.objectives?.length) {
        return res.status(400).json({ error: "Title, module ID, and objectives are required" });
      }

      // Create structured lesson content from manual form data
      const structuredContent = {
        starter: lessonData.starter || {},
        mainLesson: lessonData.mainLesson || {},
        practice: lessonData.practice || {},
        review: lessonData.review || {},
        exitTicket: lessonData.exitTicket || {},
        additionalInfo: {
          resources: lessonData.resources || [],
          equipment: lessonData.equipment || [],
          safetyNotes: lessonData.safetyNotes,
          homework: lessonData.homework,
          nextLessonPreview: lessonData.nextLessonPreview,
          teacherNotes: lessonData.teacherNotes
        }
      };

      // Save lesson to database
      const lessonPlanData: InsertLessonPlan = {
        moduleId: lessonData.moduleId,
        title: lessonData.title,
        description: lessonData.description,
        lessonType: lessonData.lessonType,
        objectives: lessonData.objectives,
        activities: [
          lessonData.starter?.hookActivity,
          lessonData.mainLesson?.iDoContent,
          lessonData.mainLesson?.weDoContent,
          lessonData.mainLesson?.youDoContent,
          lessonData.practice?.guidedPractice,
          lessonData.practice?.independentPractice,
          lessonData.review?.keyPointsReview,
          lessonData.exitTicket?.content
        ].filter(Boolean),
        resources: lessonData.resources || [],
        equipment: lessonData.equipment || [],
        safetyNotes: lessonData.safetyNotes,
        duration: lessonData.duration,
        difficulty: lessonData.difficulty,
        prerequisites: [],
        assessmentCriteria: [],
        differentiation: lessonData.practice?.differentiation || "",
        homework: lessonData.homework || "",
        aiGenerated: false,
        sequenceOrder: 1,
        targetStudents: ["all"],
        aiSuggestions: JSON.stringify(structuredContent),
      };

      const savedLesson = await storage.createLessonPlan(lessonPlanData);
      res.json(savedLesson);
    } catch (error) {
      console.error('Error creating manual lesson:', error);
      res.status(500).json({ error: error.message || "Failed to create lesson" });
    }
  });

  // Enhanced Assessment Creation Routes
  app.post("/api/assessments/ai-generate", requireAuth, async (req, res) => {
    try {
      const result = await enhancedAssessmentGenerator.generateAIAssessment(req.body);
      res.json(result);
    } catch (error) {
      console.error('Error generating AI assessment:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/assessments/manual-create", requireAuth, async (req, res) => {
    try {
      const result = await enhancedAssessmentGenerator.createManualAssessment(req.body);
      res.json(result);
    } catch (error) {
      console.error('Error creating manual assessment:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/assessments/question-types", requireAuth, async (req, res) => {
    try {
      const questionTypes = enhancedAssessmentGenerator.getAvailableQuestionTypes();
      res.json(questionTypes);
    } catch (error) {
      console.error('Error fetching question types:', error);
      res.status(500).json({ error: "Failed to fetch question types" });
    }
  });

  // Module-specific assessments endpoint
  app.get("/api/modules/:id/assessments", requireAuth, async (req, res) => {
    try {
      const moduleId = parseInt(req.params.id);
      const assessments = await storage.getAssessmentsByModuleId(moduleId);
      res.json(assessments);
    } catch (error) {
      console.error('Error fetching module assessments:', error);
      res.status(500).json({ error: "Failed to fetch module assessments" });
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

  // Contact form endpoint (public)
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, organization, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      
      // Log the contact request
      console.log('Contact form submission:', {
        name,
        email,
        organization,
        message,
        timestamp: new Date().toISOString()
      });
      
      // Send email notification to sep.alamouti@sepalamouti.com
      try {
        await emailService.sendContactFormNotification(
          'sep.alamouti@sepalamouti.com',
          { name, email, organization, message }
        );
      } catch (emailError) {
        console.error('Failed to send contact form email:', emailError);
        // Don't fail the request if email fails, just log it
      }
      
      res.json({ 
        success: true, 
        message: "Thank you for contacting us! We'll get back to you soon." 
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
