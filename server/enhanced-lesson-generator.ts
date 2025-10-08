import type OpenAI from "openai";
import { db } from "./db";
import { lessonPlans, lessonActivities, modules, InsertLessonPlan, InsertLessonActivity } from "../shared/schema";
import { eq } from "drizzle-orm";
import { getOpenAIClient, MissingOpenAIKeyError } from "./openai-client";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const sharedClient = getOpenAIClient();

// Enhanced lesson generation with industry-standard components
export interface EnhancedLessonRequest {
  moduleId: number;
  title: string;
  objectives: string[]; // Must be from module objectives
  lessonType: "lecture" | "practical" | "project" | "assessment" | "discussion" | "fieldwork";
  duration: number; // in minutes
  difficulty: "basic" | "intermediate" | "advanced";
  targetStudents: string[]; // student IDs or ["all"]
  studentData?: StudentPerformanceData[]; // For differentiation
}

export interface StudentPerformanceData {
  id: string;
  name: string;
  averageScore: number;
  strengths: string[];
  weaknesses: string[];
  learningStyle: "visual" | "auditory" | "kinesthetic" | "mixed";
}

export interface LessonComponent {
  id: string;
  title: string;
  description: string;
  type: "starter" | "main" | "plenary";
  componentType: "teacher_led" | "student_led" | "group_work" | "individual_work" | "discussion" | "practical";
  duration: number;
  instructions: string;
  materials: string[];
  resources: string[];
  difficultyLevel: "basic" | "intermediate" | "advanced" | "mixed";
  learningStyles: string[];
  adaptations: {
    struggling: string;
    onTrack: string;
    advanced: string;
  };
  assessmentCriteria: string[];
  successCriteria: string[];
}

export interface EnhancedLessonPlan {
  title: string;
  description: string;
  lessonType: string;
  objectives: string[];
  duration: number;
  difficulty: string;
  
  // Structured lesson components
  starterActivity: LessonComponent;
  mainActivities: LessonComponent[];
  plenaryActivity: LessonComponent;
  
  // Resources and materials
  resources: string[];
  equipment: string[];
  safetyNotes?: string;
  
  // Assessment and differentiation
  assessmentCriteria: string[];
  differentiation: string;
  homework: string;
  
  // Student adaptations
  studentAdaptations: {
    [studentId: string]: {
      modifications: string[];
      activities: string[];
      support: string[];
    };
  };
}

export class EnhancedLessonGenerator {
  private openai: OpenAI | null;

  constructor() {
    this.openai = sharedClient;
  }

  private requireClient(): OpenAI {
    if (!this.openai) {
      this.openai = getOpenAIClient();
    }

    if (!this.openai) {
      throw new MissingOpenAIKeyError();
    }

    return this.openai;
  }

  // Generate AI-powered lesson with differentiation
  async generateAILesson(request: EnhancedLessonRequest): Promise<any> {
    try {
      const module = await db.query.modules.findFirst({
        where: eq(modules.id, request.moduleId),
      });

      if (!module) {
        throw new Error("Module not found");
      }

      const prompt = this.createEnhancedLessonPrompt(request, module);
      
      const client = this.requireClient();
      const response = await client.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are an expert lesson planner specializing in IGCSE and A-Level Chemistry education. Create detailed, differentiated lessons with industry-standard components following best practices from top international schools."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 4000,
      });

      const aiResponse = JSON.parse(response.choices[0].message.content || '{}');
      const enhancedLesson = this.processAIResponse(aiResponse, request);

      // Save lesson to database
      const lessonData: InsertLessonPlan = {
        moduleId: request.moduleId,
        title: enhancedLesson.title,
        description: enhancedLesson.description,
        lessonType: request.lessonType,
        objectives: request.objectives,
        duration: request.duration,
        difficulty: request.difficulty,
        targetStudents: request.targetStudents,
        lessonStructure: JSON.stringify({
          starter: enhancedLesson.starterActivity,
          main: enhancedLesson.mainActivities,
          plenary: enhancedLesson.plenaryActivity
        }),
        resources: enhancedLesson.resources,
        equipment: enhancedLesson.equipment,
        safetyNotes: enhancedLesson.safetyNotes,
        assessmentCriteria: enhancedLesson.assessmentCriteria,
        differentiation: enhancedLesson.differentiation,
        homework: enhancedLesson.homework,
        creationMethod: "ai",
        aiGenerated: true,
        aiSuggestions: JSON.stringify(enhancedLesson.studentAdaptations),
      };

      const [savedLesson] = await db.insert(lessonPlans).values(lessonData).returning();

      // Save individual lesson activities
      await this.saveLessonActivities(savedLesson.id, enhancedLesson);

      return {
        success: true,
        lesson: savedLesson,
        lessonPlan: enhancedLesson
      };

    } catch (error) {
      console.error("Error generating AI lesson:", error);
      if (error instanceof MissingOpenAIKeyError) {
        throw error;
      }
      const message = error instanceof Error ? error.message : String(error);
      throw new Error("Failed to generate AI lesson: " + message);
    }
  }

  // Create manual lesson template
  async createManualLesson(request: EnhancedLessonRequest): Promise<any> {
    try {
      const module = await db.query.modules.findFirst({
        where: eq(modules.id, request.moduleId),
      });

      if (!module) {
        throw new Error("Module not found");
      }

      // Create template structure for manual completion
      const manualTemplate = this.createManualLessonTemplate(request, module);

      const lessonData: InsertLessonPlan = {
        moduleId: request.moduleId,
        title: request.title,
        description: `Manual lesson for ${request.objectives.join(", ")}`,
        lessonType: request.lessonType,
        objectives: request.objectives,
        duration: request.duration,
        difficulty: request.difficulty,
        targetStudents: request.targetStudents,
        lessonStructure: JSON.stringify(manualTemplate),
        resources: [],
        equipment: [],
        assessmentCriteria: [],
        differentiation: "",
        homework: "",
        creationMethod: "manual",
        aiGenerated: false,
      };

      const [savedLesson] = await db.insert(lessonPlans).values(lessonData).returning();

      return {
        success: true,
        lesson: savedLesson,
        template: manualTemplate
      };

    } catch (error) {
      console.error("Error creating manual lesson:", error);
      throw new Error("Failed to create manual lesson: " + error.message);
    }
  }

  private createEnhancedLessonPrompt(request: EnhancedLessonRequest, module: any): string {
    return `
Create a comprehensive ${request.lessonType} lesson plan for ${request.duration} minutes focusing on the following learning objectives:

${request.objectives.map(obj => `• ${obj}`).join('\n')}

Module Context:
- Title: ${module.title}
- Curriculum: ${module.curriculumTopic}
- Grade Levels: ${module.gradeLevels?.join(', ')}
- Difficulty: ${request.difficulty}

${request.studentData ? `
Student Performance Data:
${request.studentData.map(student => `
- ${student.name}: ${student.averageScore}% average, Learning Style: ${student.learningStyle}
  Strengths: ${student.strengths.join(', ')}
  Weaknesses: ${student.weaknesses.join(', ')}
`).join('')}
` : ''}

Lesson Requirements:
1. Follow the three-part structure: Starter (5-10 min), Main Activities (${request.duration - 20} min), Plenary (5-10 min)
2. Include differentiation for struggling, on-track, and advanced students
3. Provide specific materials, resources, and instructions
4. Include assessment criteria and success criteria
5. Add safety notes if practical work is involved
6. Create meaningful homework/extension activities

Response Format (JSON):
{
  "title": "Engaging lesson title",
  "description": "Brief lesson overview",
  "starterActivity": {
    "title": "Starter activity name",
    "description": "What students will do",
    "componentType": "teacher_led|student_led|group_work|individual_work|discussion|practical",
    "duration": 8,
    "instructions": "Step-by-step instructions",
    "materials": ["material1", "material2"],
    "resources": ["resource1", "resource2"],
    "difficultyLevel": "mixed",
    "learningStyles": ["visual", "auditory", "kinesthetic"],
    "adaptations": {
      "struggling": "Specific support for struggling students",
      "onTrack": "Standard activity expectations",
      "advanced": "Extension challenges"
    },
    "assessmentCriteria": ["criterion1", "criterion2"],
    "successCriteria": ["Students can...", "Students will..."]
  },
  "mainActivities": [
    {
      "title": "Main activity 1",
      "description": "Core learning activity",
      "componentType": "teacher_led|student_led|group_work|individual_work|discussion|practical",
      "duration": 20,
      "instructions": "Detailed instructions",
      "materials": ["materials needed"],
      "resources": ["resources needed"],
      "difficultyLevel": "intermediate",
      "learningStyles": ["visual", "kinesthetic"],
      "adaptations": {
        "struggling": "Scaffolded approach",
        "onTrack": "Standard expectations",
        "advanced": "Extended challenges"
      },
      "assessmentCriteria": ["How to assess learning"],
      "successCriteria": ["Learning outcomes"]
    }
  ],
  "plenaryActivity": {
    "title": "Plenary activity name",
    "description": "Consolidation activity",
    "componentType": "discussion|individual_work|group_work",
    "duration": 7,
    "instructions": "How to wrap up learning",
    "materials": ["exit tickets", "whiteboard"],
    "resources": ["summary sheet"],
    "difficultyLevel": "mixed",
    "learningStyles": ["visual", "auditory"],
    "adaptations": {
      "struggling": "Guided reflection",
      "onTrack": "Independent summary",
      "advanced": "Peer teaching opportunity"
    },
    "assessmentCriteria": ["Understanding demonstrated"],
    "successCriteria": ["Students can summarize key points"]
  },
  "resources": ["textbook pages", "online simulations", "video clips"],
  "equipment": ["laboratory equipment if needed"],
  "safetyNotes": "Safety considerations for practical work",
  "assessmentCriteria": ["Overall lesson assessment criteria"],
  "differentiation": "Summary of differentiation strategies",
  "homework": "Meaningful follow-up activities",
  "studentAdaptations": {
    "student_id": {
      "modifications": ["Specific modifications for individual students"],
      "activities": ["Tailored activities"],
      "support": ["Additional support needed"]
    }
  }
}

Ensure all activities are practical, engaging, and aligned with learning objectives. Focus on active learning strategies and real-world applications.
    `;
  }

  private createManualLessonTemplate(request: EnhancedLessonRequest, module: any): any {
    return {
      starter: {
        title: "Add Starter Activity",
        description: "5-10 minute engaging opening",
        componentType: "teacher_led",
        duration: 8,
        instructions: "Add detailed instructions for starter activity",
        materials: [],
        resources: [],
        difficultyLevel: "mixed",
        learningStyles: ["visual", "auditory", "kinesthetic"],
        adaptations: {
          struggling: "Add support for struggling students",
          onTrack: "Add standard expectations",
          advanced: "Add extension challenges"
        },
        assessmentCriteria: [],
        successCriteria: []
      },
      main: [
        {
          title: "Add Main Activity",
          description: "Core learning activity",
          componentType: "teacher_led",
          duration: request.duration - 20,
          instructions: "Add detailed instructions for main activity",
          materials: [],
          resources: [],
          difficultyLevel: request.difficulty,
          learningStyles: ["visual", "auditory", "kinesthetic"],
          adaptations: {
            struggling: "Add scaffolded approach",
            onTrack: "Add standard expectations",
            advanced: "Add extension challenges"
          },
          assessmentCriteria: [],
          successCriteria: []
        }
      ],
      plenary: {
        title: "Add Plenary Activity",
        description: "5-10 minute consolidation",
        componentType: "discussion",
        duration: 7,
        instructions: "Add instructions for lesson wrap-up",
        materials: [],
        resources: [],
        difficultyLevel: "mixed",
        learningStyles: ["visual", "auditory"],
        adaptations: {
          struggling: "Add guided reflection",
          onTrack: "Add independent summary",
          advanced: "Add peer teaching opportunity"
        },
        assessmentCriteria: [],
        successCriteria: []
      }
    };
  }

  private processAIResponse(aiResponse: any, request: EnhancedLessonRequest): EnhancedLessonPlan {
    return {
      title: aiResponse.title || request.title,
      description: aiResponse.description || `AI-generated lesson for ${request.objectives.join(", ")}`,
      lessonType: request.lessonType,
      objectives: request.objectives,
      duration: request.duration,
      difficulty: request.difficulty,
      starterActivity: aiResponse.starterActivity || {},
      mainActivities: aiResponse.mainActivities || [],
      plenaryActivity: aiResponse.plenaryActivity || {},
      resources: aiResponse.resources || [],
      equipment: aiResponse.equipment || [],
      safetyNotes: aiResponse.safetyNotes,
      assessmentCriteria: aiResponse.assessmentCriteria || [],
      differentiation: aiResponse.differentiation || "",
      homework: aiResponse.homework || "",
      studentAdaptations: aiResponse.studentAdaptations || {}
    };
  }

  private async saveLessonActivities(lessonId: number, lesson: EnhancedLessonPlan): Promise<void> {
    try {
      const activities: InsertLessonActivity[] = [];

      // Starter activity
      activities.push({
        lessonId,
        title: lesson.starterActivity.title,
        description: lesson.starterActivity.description,
        activityType: "starter",
        componentType: lesson.starterActivity.componentType || "teacher_led",
        duration: lesson.starterActivity.duration,
        sequenceOrder: 1,
        instructions: lesson.starterActivity.instructions,
        materials: lesson.starterActivity.materials || [],
        resources: lesson.starterActivity.resources || [],
        difficultyLevel: lesson.starterActivity.difficultyLevel || "mixed",
        learningStyles: lesson.starterActivity.learningStyles || [],
        adaptations: JSON.stringify(lesson.starterActivity.adaptations || {}),
        assessmentCriteria: lesson.starterActivity.assessmentCriteria || [],
        successCriteria: lesson.starterActivity.successCriteria || []
      });

      // Main activities
      lesson.mainActivities.forEach((activity, index) => {
        activities.push({
          lessonId,
          title: activity.title,
          description: activity.description,
          activityType: "main",
          componentType: activity.componentType || "teacher_led",
          duration: activity.duration,
          sequenceOrder: index + 2,
          instructions: activity.instructions,
          materials: activity.materials || [],
          resources: activity.resources || [],
          difficultyLevel: activity.difficultyLevel || "intermediate",
          learningStyles: activity.learningStyles || [],
          adaptations: JSON.stringify(activity.adaptations || {}),
          assessmentCriteria: activity.assessmentCriteria || [],
          successCriteria: activity.successCriteria || []
        });
      });

      // Plenary activity
      activities.push({
        lessonId,
        title: lesson.plenaryActivity.title,
        description: lesson.plenaryActivity.description,
        activityType: "plenary",
        componentType: lesson.plenaryActivity.componentType || "discussion",
        duration: lesson.plenaryActivity.duration,
        sequenceOrder: lesson.mainActivities.length + 2,
        instructions: lesson.plenaryActivity.instructions,
        materials: lesson.plenaryActivity.materials || [],
        resources: lesson.plenaryActivity.resources || [],
        difficultyLevel: lesson.plenaryActivity.difficultyLevel || "mixed",
        learningStyles: lesson.plenaryActivity.learningStyles || [],
        adaptations: JSON.stringify(lesson.plenaryActivity.adaptations || {}),
        assessmentCriteria: lesson.plenaryActivity.assessmentCriteria || [],
        successCriteria: lesson.plenaryActivity.successCriteria || []
      });

      await db.insert(lessonActivities).values(activities);
    } catch (error) {
      console.error("Error saving lesson activities:", error);
      // Continue even if activity saving fails
    }
  }
}

export const enhancedLessonGenerator = new EnhancedLessonGenerator();