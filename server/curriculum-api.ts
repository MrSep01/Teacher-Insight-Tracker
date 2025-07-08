import type { Express } from "express";
import { requireAuth } from "./auth";
import CurriculumService from "./curriculum-data";

export function registerCurriculumRoutes(app: Express) {
  // Get all available curricula
  app.get("/api/curriculum", requireAuth, async (req, res) => {
    try {
      const curricula = CurriculumService.getAllCurricula();
      res.json(curricula);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch curricula" });
    }
  });

  // Get curriculum by name (with URL encoding support)
  app.get("/api/curriculum/:name", requireAuth, async (req, res) => {
    try {
      const { name } = req.params;
      const decodedName = decodeURIComponent(name);
      const curriculum = CurriculumService.getCurriculumByName(decodedName);
      
      if (!curriculum) {
        console.log(`Curriculum not found: ${decodedName}`);
        console.log(`Available curricula: ${CurriculumService.getAllCurricula().map(c => c.name).join(', ')}`);
        return res.status(404).json({ error: "Curriculum not found" });
      }
      
      res.json(curriculum);
    } catch (error) {
      console.error("Error fetching curriculum:", error);
      res.status(500).json({ error: "Failed to fetch curriculum" });
    }
  });

  // Get topics for a specific curriculum
  app.get("/api/curriculum/:curriculumName/topics", requireAuth, async (req, res) => {
    try {
      const { curriculumName } = req.params;
      const decodedName = decodeURIComponent(curriculumName);
      const topics = CurriculumService.getTopicsByCurriculum(decodedName);
      res.json(topics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch topics" });
    }
  });

  // Get subtopics for a specific topic
  app.get("/api/curriculum/:curriculumName/topics/:topicId/subtopics", requireAuth, async (req, res) => {
    try {
      const { curriculumName, topicId } = req.params;
      const decodedName = decodeURIComponent(curriculumName);
      const subtopics = CurriculumService.getSubtopicsByTopic(decodedName, topicId);
      res.json(subtopics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subtopics" });
    }
  });

  // Get learning objectives for a specific subtopic
  app.get("/api/curriculum/:curriculumName/topics/:topicId/subtopics/:subtopicId/objectives", requireAuth, async (req, res) => {
    try {
      const { curriculumName, topicId, subtopicId } = req.params;
      const decodedName = decodeURIComponent(curriculumName);
      const objectives = CurriculumService.getObjectivesBySubtopic(decodedName, topicId, subtopicId);
      res.json(objectives);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch objectives" });
    }
  });

  // Get all objectives for a curriculum and grade
  app.get("/api/curriculum/:curriculumName/objectives", requireAuth, async (req, res) => {
    try {
      const { curriculumName } = req.params;
      const { grade, difficulty } = req.query;
      const decodedName = decodeURIComponent(curriculumName);
      
      let objectives;
      if (grade) {
        objectives = CurriculumService.getObjectivesByGrade(decodedName, grade as string);
      } else {
        objectives = CurriculumService.getAllObjectivesByCurriculum(decodedName);
      }

      if (difficulty) {
        objectives = objectives.filter(obj => obj.difficulty === difficulty);
      }

      res.json(objectives);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch objectives" });
    }
  });

  // Get assessment structure for curriculum
  app.get("/api/curriculum/:curriculumName/assessment-structure", requireAuth, async (req, res) => {
    try {
      const { curriculumName } = req.params;
      const decodedName = decodeURIComponent(curriculumName);
      const structure = CurriculumService.getAssessmentStructure(decodedName);
      res.json(structure);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch assessment structure" });
    }
  });
}