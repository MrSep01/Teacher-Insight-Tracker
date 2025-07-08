import OpenAI from "openai";
import { storage } from "./storage";
import type { InsertLessonPlan } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export interface LessonGenerationRequest {
  moduleId: number;
  lessonType: "lecture" | "practical" | "project" | "assessment" | "discussion" | "fieldwork";
  topic: string;
  duration: number;
  difficulty: "basic" | "intermediate" | "advanced";
  curriculum: string;
  gradeLevels: string[];
  moduleTopics: string[];
  moduleObjectives: string[];
}

export interface GeneratedLesson {
  title: string;
  description: string;
  lessonType: string;
  objectives: string[];
  activities: string[];
  resources: string[];
  equipment?: string[];
  safetyNotes?: string;
  duration: number;
  difficulty: string;
  prerequisites: string[];
  assessmentCriteria: string[];
  differentiation: string;
  homework: string;
  sequenceOrder: number;
}

export class AILessonGenerator {
  private openai: OpenAI;

  constructor() {
    this.openai = openai;
  }

  async generateLesson(request: LessonGenerationRequest): Promise<any> {
    try {
      const prompt = this.createLessonPrompt(request);
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are an expert chemistry teacher and curriculum designer specializing in Edexcel IGCSE and A Level Chemistry. Create comprehensive, engaging lesson plans that follow best practices in chemistry education."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 2000,
      });

      const aiResponse = JSON.parse(response.choices[0].message.content || "{}");
      const processedLesson = this.processAIResponse(aiResponse, request);
      
      // Save to database
      const lessonPlanData: InsertLessonPlan = {
        moduleId: request.moduleId,
        title: processedLesson.title,
        description: processedLesson.description,
        lessonType: processedLesson.lessonType as any,
        objectives: processedLesson.objectives,
        activities: processedLesson.activities,
        resources: processedLesson.resources,
        equipment: processedLesson.equipment || [],
        safetyNotes: processedLesson.safetyNotes,
        duration: processedLesson.duration,
        difficulty: processedLesson.difficulty as any,
        prerequisites: processedLesson.prerequisites,
        assessmentCriteria: processedLesson.assessmentCriteria,
        differentiation: processedLesson.differentiation,
        homework: processedLesson.homework,
        aiGenerated: true,
        sequenceOrder: processedLesson.sequenceOrder,
        targetStudents: ["all"], // Default to all students
        aiSuggestions: JSON.stringify(aiResponse),
      };

      const savedLesson = await storage.createLessonPlan(lessonPlanData);
      return savedLesson;
    } catch (error) {
      console.error("Error generating lesson:", error);
      throw new Error("Failed to generate lesson plan");
    }
  }

  private createLessonPrompt(request: LessonGenerationRequest): string {
    return `
Create a comprehensive ${request.lessonType} lesson plan for ${request.curriculum} chemistry.

**Context:**
- Topic: ${request.topic}
- Duration: ${request.duration} minutes
- Difficulty: ${request.difficulty}
- Grade Levels: ${request.gradeLevels.join(", ")}
- Module Topics: ${request.moduleTopics.join(", ")}
- Module Objectives: ${request.moduleObjectives.join(", ")}

**Lesson Type Specifications:**
${this.getLessonTypeSpecs(request.lessonType)}

**Requirements:**
1. Use ONLY the module objectives provided above - do not create new objectives
2. Select 1-3 relevant module objectives that align with this lesson topic
3. Design 4-6 engaging activities appropriate for the lesson type
4. List 5-8 resources including textbooks, digital tools, and materials
4. Include 3-4 prerequisites students should have
5. Provide 3-4 assessment criteria for measuring success
6. Write differentiation strategies for different ability levels
7. Suggest meaningful homework or follow-up activities

${request.lessonType === "practical" || request.lessonType === "fieldwork" ? `
**Safety Requirements:**
- List required equipment and materials
- Include important safety notes and precautions
- Specify any special safety equipment needed
` : ""}

**Output Format:**
Respond with a JSON object containing:
{
  "title": "Engaging lesson title",
  "description": "Brief description of the lesson",
  "objectives": ["objective1", "objective2", ...],
  "activities": ["activity1", "activity2", ...],
  "resources": ["resource1", "resource2", ...],
  ${request.lessonType === "practical" || request.lessonType === "fieldwork" ? `
  "equipment": ["equipment1", "equipment2", ...],
  "safetyNotes": "Important safety considerations",
  ` : ""}
  "prerequisites": ["prerequisite1", "prerequisite2", ...],
  "assessmentCriteria": ["criteria1", "criteria2", ...],
  "differentiation": "Strategies for different ability levels",
  "homework": "Follow-up activities and assignments"
}

Make the lesson engaging, practical, and aligned with Edexcel chemistry specifications.
    `;
  }

  private getLessonTypeSpecs(lessonType: string): string {
    const specs = {
      lecture: "Focus on clear explanations, interactive demonstrations, and student engagement. Include checks for understanding and opportunities for questions.",
      practical: "Design hands-on experiments with clear procedures, safety protocols, and data collection. Include pre-lab discussion and post-lab analysis.",
      project: "Create an extended learning experience with clear milestones, research components, and collaborative elements. Include project planning and presentation aspects.",
      assessment: "Design formative or summative evaluation with clear criteria, varied question types, and appropriate difficulty. Include feedback mechanisms.",
      discussion: "Facilitate collaborative learning with structured discussions, debate elements, and peer learning opportunities. Include discussion prompts and facilitation techniques.",
      fieldwork: "Plan off-site learning with clear objectives, safety protocols, and data collection activities. Include preparation and follow-up components."
    };
    return specs[lessonType as keyof typeof specs] || specs.lecture;
  }

  private processAIResponse(aiResponse: any, request: LessonGenerationRequest): GeneratedLesson {
    // Filter AI objectives to only include those from the module
    const aiObjectives = Array.isArray(aiResponse.objectives) ? aiResponse.objectives : [];
    const validObjectives = aiObjectives.filter((obj: string) => 
      request.moduleObjectives.some(moduleObj => 
        moduleObj.toLowerCase().includes(obj.toLowerCase()) || 
        obj.toLowerCase().includes(moduleObj.toLowerCase())
      )
    );

    // If no valid objectives found, use the first module objective
    const finalObjectives = validObjectives.length > 0 ? validObjectives : [request.moduleObjectives[0]];

    return {
      title: aiResponse.title || `${request.topic} - ${request.lessonType}`,
      description: aiResponse.description || `A ${request.lessonType} lesson on ${request.topic}`,
      lessonType: request.lessonType,
      objectives: finalObjectives,
      activities: Array.isArray(aiResponse.activities) ? aiResponse.activities : ["Interactive discussion"],
      resources: Array.isArray(aiResponse.resources) ? aiResponse.resources : ["Textbook", "Whiteboard"],
      equipment: Array.isArray(aiResponse.equipment) ? aiResponse.equipment : [],
      safetyNotes: aiResponse.safetyNotes || "",
      duration: request.duration,
      difficulty: request.difficulty,
      prerequisites: Array.isArray(aiResponse.prerequisites) ? aiResponse.prerequisites : [],
      assessmentCriteria: finalObjectives,
      differentiation: aiResponse.differentiation || "Provide support for different learning styles",
      homework: aiResponse.homework || "Review lesson notes and complete practice questions",
      sequenceOrder: 1, // Default to 1, can be updated later
    };
  }
}

export const aiLessonGenerator = new AILessonGenerator();