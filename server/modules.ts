import type { Express } from "express";
import { storage } from "./storage";
import { requireAuth } from "./auth";
import { insertModuleSchema } from "../shared/schema";

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