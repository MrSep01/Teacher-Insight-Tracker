import type { Express } from "express";
import { storage } from "./storage";
import { requireAuth } from "./auth";
import { insertModuleSchema } from "../shared/schema";

export function registerModuleRoutes(app: Express) {
  // Library routes - must come before parameterized routes to avoid conflicts
  app.get("/api/modules/all", requireAuth, async (req, res) => {
    try {
      const teacherId = req.user.id;
      const modules = await storage.getAllModulesByTeacherId(teacherId);
      res.json(modules);
    } catch (error) {
      console.error("Error fetching all modules:", error);
      res.status(500).json({ error: "Failed to fetch modules" });
    }
  });

  app.get("/api/lessons/all", requireAuth, async (req, res) => {
    try {
      const teacherId = req.user.id;
      const lessons = await storage.getAllLessonsByTeacherId(teacherId);
      res.json(lessons);
    } catch (error) {
      console.error("Error fetching all lessons:", error);
      res.status(500).json({ error: "Failed to fetch lessons" });
    }
  });

  app.get("/api/assessments/all", requireAuth, async (req, res) => {
    try {
      const teacherId = req.user.id;
      const assessments = await storage.getAllAssessmentsByTeacherId(teacherId);
      res.json(assessments);
    } catch (error) {
      console.error("Error fetching all assessments:", error);
      res.status(500).json({ error: "Failed to fetch assessments" });
    }
  });

  // Get all modules for the authenticated user
  app.get("/api/modules", requireAuth, async (req, res) => {
    try {
      const modules = await storage.getModulesByUserId(req.user.id);
      res.json(modules);
    } catch (error) {
      console.error("Error fetching modules:", error);
      res.status(500).json({ error: "Failed to fetch modules" });
    }
  });

  // Create a new module
  app.post("/api/modules", requireAuth, async (req, res) => {
    try {
      const moduleData = {
        ...req.body,
        userId: req.user.id,
      };
      
      // Validate the data against the schema
      const validationResult = insertModuleSchema.safeParse(moduleData);
      if (!validationResult.success) {
        console.error("Validation failed:", validationResult.error.errors);
        return res.status(400).json({ 
          error: "Validation failed", 
          details: validationResult.error.errors 
        });
      }
      
      const newModule = await storage.createModule(validationResult.data);
      res.status(201).json(newModule);
    } catch (error) {
      console.error("Error creating module:", error);
      res.status(500).json({ error: "Failed to create module" });
    }
  });

  // Get a specific module with lesson plans
  app.get("/api/modules/:id", requireAuth, async (req, res) => {
    try {
      const moduleId = parseInt(req.params.id);
      const module = await storage.getModuleById(moduleId);
      
      if (!module || module.userId !== req.user.id) {
        return res.status(404).json({ error: "Module not found" });
      }
      
      const lessonPlans = await storage.getLessonPlansByModuleId(moduleId);
      res.json({ ...module, lessonPlans });
    } catch (error) {
      console.error("Error fetching module:", error);
      res.status(500).json({ error: "Failed to fetch module" });
    }
  });

  // Update a module
  app.put("/api/modules/:id", requireAuth, async (req, res) => {
    try {
      const moduleId = parseInt(req.params.id);
      const module = await storage.getModuleById(moduleId);
      
      if (!module || module.userId !== req.user.id) {
        return res.status(404).json({ error: "Module not found" });
      }
      
      const updatedModule = await storage.updateModule(moduleId, req.body);
      res.json(updatedModule);
    } catch (error) {
      console.error("Error updating module:", error);
      res.status(500).json({ error: "Failed to update module" });
    }
  });

  // Delete a module
  app.delete("/api/modules/:id", requireAuth, async (req, res) => {
    try {
      const moduleId = parseInt(req.params.id);
      const module = await storage.getModuleById(moduleId);
      
      if (!module || module.userId !== req.user.id) {
        return res.status(404).json({ error: "Module not found" });
      }
      
      await storage.deleteModule(moduleId);
      res.json({ message: "Module deleted successfully" });
    } catch (error) {
      console.error("Error deleting module:", error);
      res.status(500).json({ error: "Failed to delete module" });
    }
  });

  // Get lessons for a module
  app.get("/api/modules/:id/lessons", requireAuth, async (req, res) => {
    try {
      const moduleId = parseInt(req.params.id);
      const module = await storage.getModuleById(moduleId);
      
      if (!module || module.userId !== req.user.id) {
        return res.status(404).json({ error: "Module not found" });
      }
      
      const lessons = await storage.getLessonsByModule(moduleId);
      res.json(lessons);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      res.status(500).json({ error: "Failed to fetch lessons" });
    }
  });

  // Create lesson plan within a module
  app.post("/api/modules/:id/lessons", requireAuth, async (req, res) => {
    try {
      const moduleId = parseInt(req.params.id);
      const module = await storage.getModuleById(moduleId);
      
      if (!module || module.userId !== req.user.id) {
        return res.status(404).json({ error: "Module not found" });
      }
      
      // Check if module has objectives
      if (!module.objectives || module.objectives.length === 0) {
        return res.status(400).json({ 
          error: "Module must have at least one objective before creating lessons" 
        });
      }
      
      // Validate that lesson objectives exist in module objectives
      if (req.body.objectives && req.body.objectives.length > 0) {
        const invalidObjectives = req.body.objectives.filter((obj: string) => 
          !module.objectives.includes(obj)
        );
        
        if (invalidObjectives.length > 0) {
          return res.status(400).json({ 
            error: `Invalid objectives. Please use only module objectives: ${invalidObjectives.join(", ")}` 
          });
        }
      }
      
      const lessonPlanData = {
        ...req.body,
        moduleId,
      };
      
      const newLessonPlan = await storage.createLessonPlan(lessonPlanData);
      res.status(201).json(newLessonPlan);
    } catch (error) {
      console.error("Error creating lesson plan:", error);
      res.status(500).json({ error: "Failed to create lesson plan" });
    }
  });

  // Generate AI lesson plan
  app.post("/api/modules/:id/lessons/generate", requireAuth, async (req, res) => {
    try {
      const moduleId = parseInt(req.params.id);
      const module = await storage.getModuleById(moduleId);
      
      if (!module || module.userId !== req.user.id) {
        return res.status(404).json({ error: "Module not found" });
      }
      
      // Check if module has objectives
      if (!module.objectives || module.objectives.length === 0) {
        return res.status(400).json({ 
          error: "Module must have at least one objective before generating lessons" 
        });
      }
      
      const { lessonType, topic, duration, difficulty } = req.body;
      
      // Import AI lesson generator
      const { aiLessonGenerator } = await import("./ai-lesson-generator");
      
      const generatedLesson = await aiLessonGenerator.generateLesson({
        moduleId,
        lessonType,
        topic,
        duration,
        difficulty,
        curriculum: module.curriculumTopic,
        gradeLevels: module.gradeLevels,
        moduleTopics: module.topics,
        moduleObjectives: module.objectives,
      });
      
      res.status(201).json(generatedLesson);
    } catch (error) {
      console.error("Error generating AI lesson:", error);
      res.status(500).json({ error: "Failed to generate lesson" });
    }
  });

  // Update lesson plan
  app.put("/api/modules/:id/lessons/:lessonId", requireAuth, async (req, res) => {
    try {
      const moduleId = parseInt(req.params.id);
      const lessonId = parseInt(req.params.lessonId);
      
      const module = await storage.getModuleById(moduleId);
      if (!module || module.userId !== req.user.id) {
        return res.status(404).json({ error: "Module not found" });
      }
      
      const updatedLesson = await storage.updateLessonPlan(lessonId, req.body);
      res.json(updatedLesson);
    } catch (error) {
      console.error("Error updating lesson:", error);
      res.status(500).json({ error: "Failed to update lesson" });
    }
  });

  // Delete lesson plan
  app.delete("/api/modules/:id/lessons/:lessonId", requireAuth, async (req, res) => {
    try {
      const moduleId = parseInt(req.params.id);
      const lessonId = parseInt(req.params.lessonId);
      
      const module = await storage.getModuleById(moduleId);
      if (!module || module.userId !== req.user.id) {
        return res.status(404).json({ error: "Module not found" });
      }
      
      await storage.deleteLessonPlan(lessonId);
      res.json({ message: "Lesson deleted successfully" });
    } catch (error) {
      console.error("Error deleting lesson:", error);
      res.status(500).json({ error: "Failed to delete lesson" });
    }
  });

  // Get lesson plans for a module
  app.get("/api/modules/:id/lesson-plans", requireAuth, async (req, res) => {
    try {
      const moduleId = parseInt(req.params.id);
      const module = await storage.getModuleById(moduleId);
      
      if (!module || module.userId !== req.user.id) {
        return res.status(404).json({ error: "Module not found" });
      }
      
      const lessonPlans = await storage.getLessonPlansByModuleId(moduleId);
      res.json(lessonPlans);
    } catch (error) {
      console.error("Error fetching lesson plans:", error);
      res.status(500).json({ error: "Failed to fetch lesson plans" });
    }
  });

  // Get all lessons (for assessment dashboard)
  app.get("/api/lessons", requireAuth, async (req: Request, res: Response) => {
    try {
      const lessons = await storage.getAllLessons();
      res.json(lessons);
    } catch (error) {
      console.error("Error fetching all lessons:", error);
      res.status(500).json({ error: "Failed to fetch lessons" });
    }
  });
}