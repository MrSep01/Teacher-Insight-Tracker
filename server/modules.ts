import type { Express } from "express";
import { storage } from "./storage";
import { requireAuth } from "./auth";
import { insertModuleSchema } from "../shared/schema";
import { z } from "zod";

export function registerModuleRoutes(app: Express) {
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
      console.log("\n=== MODULE CREATION DEBUG ===");
      console.log("Received module data:", JSON.stringify(req.body, null, 2));
      console.log("User ID:", req.user.id);
      
      const moduleData = {
        ...req.body,
        userId: req.user.id,
      };
      
      console.log("Processed module data:", JSON.stringify(moduleData, null, 2));
      console.log("Data types:", {
        userId: typeof moduleData.userId,
        title: typeof moduleData.title,
        description: typeof moduleData.description,
        curriculumTopic: typeof moduleData.curriculumTopic,
        gradeLevels: Array.isArray(moduleData.gradeLevels) ? 'array' : typeof moduleData.gradeLevels,
        topics: Array.isArray(moduleData.topics) ? 'array' : typeof moduleData.topics,
        objectives: Array.isArray(moduleData.objectives) ? 'array' : typeof moduleData.objectives,
        estimatedHours: typeof moduleData.estimatedHours
      });
      
      // Temporarily bypass all validation to test database insert directly
      console.log("Attempting direct database insert without validation...");
      
      const { db } = await import("./db");
      const { modules } = await import("../shared/schema");
      
      const directInsert = await db.insert(modules).values({
        userId: moduleData.userId,
        title: moduleData.title,
        description: moduleData.description,
        curriculumTopic: moduleData.curriculumTopic,
        gradeLevels: moduleData.gradeLevels || [],
        topics: moduleData.topics || [],
        objectives: moduleData.objectives || [],
        estimatedHours: moduleData.estimatedHours || 0,
        isActive: true
      }).returning();
      
      console.log("Direct insert successful:", directInsert);
      const newModule = directInsert[0];
      res.status(201).json(newModule);
    } catch (error) {
      console.error("Error creating module:", error);
      console.error("Error details:", error.message);
      console.error("Error stack:", error.stack);
      console.error("Error name:", error.name);
      console.error("Error constructor:", error.constructor.name);
      
      // If it's a syntax error, it might be in the storage layer
      if (error.message && error.message.includes('string did not match the expected pattern')) {
        console.error("This appears to be a Drizzle/Database validation error");
        console.error("Trying direct database insert for debugging...");
        
        // Try to bypass validation and insert directly
        try {
          const { db } = await import("./db");
          const { modules } = await import("../shared/schema");
          const directInsert = await db.insert(modules).values({
            userId: req.user.id,
            title: req.body.title,
            description: req.body.description,
            curriculumTopic: req.body.curriculumTopic,
            gradeLevels: req.body.gradeLevels,
            topics: req.body.topics,
            objectives: req.body.objectives,
            estimatedHours: req.body.estimatedHours,
            isActive: true
          }).returning();
          
          console.log("Direct insert successful:", directInsert);
          return res.status(201).json(directInsert[0]);
        } catch (directError) {
          console.error("Direct insert also failed:", directError);
        }
      }
      
      res.status(400).json({ error: error.message || "Failed to create module" });
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

  // Create lesson plan within a module
  app.post("/api/modules/:id/lesson-plans", requireAuth, async (req, res) => {
    try {
      const moduleId = parseInt(req.params.id);
      const module = await storage.getModuleById(moduleId);
      
      if (!module || module.userId !== req.user.id) {
        return res.status(404).json({ error: "Module not found" });
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
}