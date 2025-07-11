import { Express } from "express";
import { storage } from "./storage";
import { requireAuth } from "./auth";

export function registerCurriculumRoutes(app: Express) {
  // Get all curriculum topics
  app.get("/api/curriculum/topics", requireAuth, async (req, res) => {
    try {
      const topics = await storage.getCurriculumTopics();
      res.json(topics);
    } catch (error) {
      console.error('Error fetching curriculum topics:', error);
      res.status(500).json({ error: 'Failed to fetch curriculum topics' });
    }
  });

  // Get curriculum topic by ID
  app.get("/api/curriculum/topics/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const topic = await storage.getCurriculumTopicById(id);
      if (!topic) {
        return res.status(404).json({ error: 'Topic not found' });
      }
      res.json(topic);
    } catch (error) {
      console.error('Error fetching curriculum topic:', error);
      res.status(500).json({ error: 'Failed to fetch curriculum topic' });
    }
  });

  // Get subtopics for a topic
  app.get("/api/curriculum/topics/:id/subtopics", requireAuth, async (req, res) => {
    try {
      const topicId = parseInt(req.params.id);
      const subtopics = await storage.getCurriculumSubtopicsByTopicId(topicId);
      res.json(subtopics);
    } catch (error) {
      console.error('Error fetching curriculum subtopics:', error);
      res.status(500).json({ error: 'Failed to fetch curriculum subtopics' });
    }
  });

  // Get objectives for a subtopic
  app.get("/api/curriculum/subtopics/:id/objectives", requireAuth, async (req, res) => {
    try {
      const subtopicId = parseInt(req.params.id);
      const objectives = await storage.getCurriculumObjectivesBySubtopicId(subtopicId);
      res.json(objectives);
    } catch (error) {
      console.error('Error fetching curriculum objectives:', error);
      res.status(500).json({ error: 'Failed to fetch curriculum objectives' });
    }
  });

  // Get objectives by codes (for module creation)
  app.post("/api/curriculum/objectives/by-codes", requireAuth, async (req, res) => {
    try {
      const { codes } = req.body;
      if (!Array.isArray(codes)) {
        return res.status(400).json({ error: 'Codes must be an array' });
      }
      const objectives = await storage.getCurriculumObjectivesByCodes(codes);
      res.json(objectives);
    } catch (error) {
      console.error('Error fetching curriculum objectives by codes:', error);
      res.status(500).json({ error: 'Failed to fetch curriculum objectives' });
    }
  });

  // Get complete hierarchy for a topic (topic + subtopics + objectives)
  app.get("/api/curriculum/topics/:id/hierarchy", requireAuth, async (req, res) => {
    try {
      const topicId = parseInt(req.params.id);
      
      // Get topic
      const topic = await storage.getCurriculumTopicById(topicId);
      if (!topic) {
        return res.status(404).json({ error: 'Topic not found' });
      }

      // Get subtopics
      const subtopics = await storage.getCurriculumSubtopicsByTopicId(topicId);
      
      // Get objectives for each subtopic
      const subtopicsWithObjectives = await Promise.all(
        subtopics.map(async (subtopic) => {
          const objectives = await storage.getCurriculumObjectivesBySubtopicId(subtopic.id);
          return {
            ...subtopic,
            objectives
          };
        })
      );

      res.json({
        topic,
        subtopics: subtopicsWithObjectives
      });
    } catch (error) {
      console.error('Error fetching curriculum hierarchy:', error);
      res.status(500).json({ error: 'Failed to fetch curriculum hierarchy' });
    }
  });
}