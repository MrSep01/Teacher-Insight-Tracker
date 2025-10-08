import type OpenAI from "openai";
import { getOpenAIClient, MissingOpenAIKeyError } from "./openai-client";
import type { Module } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const sharedClient = getOpenAIClient();

export interface AssessmentObjective {
  id: string;
  objective: string;
  bloomsLevel: "remember" | "understand" | "apply" | "analyze" | "evaluate" | "create";
  difficulty: "basic" | "intermediate" | "advanced";
  estimatedMinutes: number;
}

export interface AssessmentQuestion {
  id: string;
  type: "multiple_choice" | "short_answer" | "long_answer" | "calculation" | "diagram";
  question: string;
  options?: string[]; // For multiple choice
  correctAnswer: string;
  explanation: string;
  points: number;
  objectives: string[]; // IDs of objectives this question assesses
  difficulty: "basic" | "intermediate" | "advanced";
  estimatedMinutes: number;
}

export interface GeneratedAssessment {
  title: string;
  description: string;
  instructions: string;
  totalPoints: number;
  estimatedDuration: number;
  questions: AssessmentQuestion[];
  markingScheme: {
    gradeThresholds: {
      A: number;
      B: number;
      C: number;
      D: number;
      E: number;
    };
    feedback: {
      excellent: string;
      good: string;
      satisfactory: string;
      needsImprovement: string;
      unsatisfactory: string;
    };
  };
}

export interface AssessmentGenerationRequest {
  moduleId?: number;
  topics: string[];
  objectives: AssessmentObjective[];
  assessmentType: "formative" | "summative" | "diagnostic" | "practice";
  difficulty: "basic" | "intermediate" | "advanced" | "mixed";
  duration: number; // in minutes
  questionTypes: ("multiple_choice" | "short_answer" | "long_answer" | "calculation" | "diagram")[];
  curriculum: string; // "IGCSE Chemistry Edexcel" | "A Level Chemistry Edexcel"
  gradeLevel: string; // "10" | "11" | "12"
}

export class AIAssessmentGenerator {
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

  async generateAssessment(request: AssessmentGenerationRequest): Promise<GeneratedAssessment> {
    try {
      const prompt = this.createAssessmentPrompt(request);
      
      const client = this.requireClient();
      const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert chemistry educator and assessment designer specializing in Edexcel curricula. Create comprehensive, pedagogically sound assessments that align with learning objectives and bloom's taxonomy."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 4000
      });

      const aiResponse = JSON.parse(response.choices[0].message.content || "{}");
      return this.processAIResponse(aiResponse, request);
    } catch (error) {
      console.error("Error generating assessment:", error);
      if (error instanceof MissingOpenAIKeyError) {
        throw error;
      }
      throw new Error("Failed to generate assessment using AI");
    }
  }

  async generateObjectivesFromTopics(topics: string[], curriculum: string, gradeLevel: string): Promise<AssessmentObjective[]> {
    try {
      const prompt = `Generate specific learning objectives for a ${curriculum} Grade ${gradeLevel} assessment covering these topics: ${topics.join(", ")}.

For each objective:
1. Write clear, measurable learning outcomes using action verbs
2. Assign appropriate Bloom's taxonomy level
3. Set difficulty level based on grade expectations
4. Estimate time needed for assessment

Return JSON format:
{
  "objectives": [
    {
      "id": "unique_id",
      "objective": "Students will be able to...",
      "bloomsLevel": "understand|apply|analyze|evaluate|create",
      "difficulty": "basic|intermediate|advanced",
      "estimatedMinutes": number
    }
  ]
}`;

      const client = this.requireClient();
      const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert chemistry educator. Generate specific, measurable learning objectives that align with Edexcel chemistry curricula."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7
      });

      const aiResponse = JSON.parse(response.choices[0].message.content || "{}");
      return aiResponse.objectives || [];
    } catch (error) {
      console.error("Error generating objectives:", error);
      throw new Error("Failed to generate learning objectives");
    }
  }

  async suggestTopicsFromModule(module: Module): Promise<string[]> {
    try {
      const prompt = `Based on this chemistry module, suggest specific subtopics for assessment:

Module: ${module.title}
Description: ${module.description}
Curriculum: ${module.curriculumTopic}
Grade Levels: ${module.gradeLevels?.join(", ")}

Generate a comprehensive list of subtopics that students should be assessed on. Return as JSON:
{
  "topics": ["topic1", "topic2", ...]
}`;

      const client = this.requireClient();
      const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system", 
            content: "You are an expert chemistry educator. Suggest detailed subtopics for assessment based on curriculum modules."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7
      });

      const aiResponse = JSON.parse(response.choices[0].message.content || "{}");
      return aiResponse.topics || [];
    } catch (error) {
      console.error("Error suggesting topics:", error);
      return [];
    }
  }

  private createAssessmentPrompt(request: AssessmentGenerationRequest): string {
    return `Create a comprehensive ${request.assessmentType} assessment for ${request.curriculum} Grade ${request.gradeLevel} chemistry covering these topics: ${request.topics.join(", ")}.

Assessment Requirements:
- Duration: ${request.duration} minutes
- Difficulty: ${request.difficulty}
- Question types: ${request.questionTypes.join(", ")}
- Learning objectives: ${request.objectives.map(obj => obj.objective).join("; ")}

Create questions that:
1. Align with Edexcel chemistry specifications
2. Test different cognitive levels (Bloom's taxonomy)
3. Include varied question formats
4. Have clear marking criteria
5. Provide educational explanations

Return comprehensive JSON format:
{
  "title": "Assessment Title",
  "description": "Brief description",
  "instructions": "Clear student instructions",
  "totalPoints": number,
  "estimatedDuration": number,
  "questions": [
    {
      "id": "q1",
      "type": "multiple_choice|short_answer|long_answer|calculation|diagram",
      "question": "Full question text",
      "options": ["A) option", "B) option", "C) option", "D) option"], // only for multiple choice
      "correctAnswer": "Answer or correct option",
      "explanation": "Detailed explanation of answer",
      "points": number,
      "objectives": ["objective_ids"],
      "difficulty": "basic|intermediate|advanced",
      "estimatedMinutes": number
    }
  ],
  "markingScheme": {
    "gradeThresholds": {
      "A": 90,
      "B": 80,
      "C": 70,
      "D": 60,
      "E": 50
    },
    "feedback": {
      "excellent": "Grade A feedback",
      "good": "Grade B feedback", 
      "satisfactory": "Grade C feedback",
      "needsImprovement": "Grade D feedback",
      "unsatisfactory": "Grade E feedback"
    }
  }
}`;
  }

  private processAIResponse(aiResponse: any, request: AssessmentGenerationRequest): GeneratedAssessment {
    // Validate and sanitize AI response
    const assessment: GeneratedAssessment = {
      title: aiResponse.title || `${request.curriculum} Assessment`,
      description: aiResponse.description || "AI-generated chemistry assessment",
      instructions: aiResponse.instructions || "Answer all questions to the best of your ability.",
      totalPoints: aiResponse.totalPoints || 100,
      estimatedDuration: aiResponse.estimatedDuration || request.duration,
      questions: this.processQuestions(aiResponse.questions || [], request.objectives),
      markingScheme: aiResponse.markingScheme || this.getDefaultMarkingScheme()
    };

    // Ensure total points and duration are calculated correctly
    assessment.totalPoints = assessment.questions.reduce((sum, q) => sum + q.points, 0);
    assessment.estimatedDuration = assessment.questions.reduce((sum, q) => sum + q.estimatedMinutes, 0);

    return assessment;
  }

  private processQuestions(aiQuestions: any[], objectives: AssessmentObjective[]): AssessmentQuestion[] {
    return aiQuestions.map((q, index) => ({
      id: q.id || `q${index + 1}`,
      type: q.type || "short_answer",
      question: q.question || "Sample question",
      options: q.options,
      correctAnswer: q.correctAnswer || "Sample answer",
      explanation: q.explanation || "Sample explanation",
      points: q.points || 10,
      objectives: q.objectives || [objectives[0]?.id || "obj1"],
      difficulty: q.difficulty || "intermediate",
      estimatedMinutes: q.estimatedMinutes || 5
    }));
  }

  private getDefaultMarkingScheme() {
    return {
      gradeThresholds: {
        A: 90,
        B: 80,
        C: 70,
        D: 60,
        E: 50
      },
      feedback: {
        excellent: "Outstanding understanding demonstrated across all areas.",
        good: "Good grasp of concepts with minor areas for improvement.",
        satisfactory: "Satisfactory understanding with some concepts requiring reinforcement.",
        needsImprovement: "Basic understanding shown but significant gaps remain.",
        unsatisfactory: "Limited understanding demonstrated. Additional support required."
      }
    };
  }
}

export const aiAssessmentGenerator = new AIAssessmentGenerator();