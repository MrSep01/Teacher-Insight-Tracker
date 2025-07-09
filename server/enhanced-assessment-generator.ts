import OpenAI from "openai";
import { db } from "./db";
import { assessments, assessmentQuestions, modules, InsertAssessment, InsertAssessmentQuestion } from "../shared/schema";
import { eq } from "drizzle-orm";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Formative.com-inspired question types
export type QuestionType = 
  | "multiple_choice"
  | "true_false"
  | "short_answer"
  | "essay"
  | "numeric"
  | "fill_blank"
  | "matching"
  | "drag_drop"
  | "show_work"
  | "drawing"
  | "hotspot"
  | "ranking"
  | "categorization"
  | "timeline"
  | "graphing"
  | "calculation"
  | "formula"
  | "equation_balancing"
  | "diagram_labeling"
  | "image_annotation";

export interface EnhancedAssessmentRequest {
  moduleId: number;
  title: string;
  description: string;
  objectives: string[]; // Must be from module objectives
  assessmentType: "formative" | "summative" | "diagnostic" | "practice";
  difficulty: "basic" | "intermediate" | "advanced" | "mixed";
  duration: number; // in minutes
  questionTypes: QuestionType[];
  questionCount: number;
  totalPoints: number;
  feedbackType: "immediate" | "delayed" | "manual";
  allowRetakes: boolean;
  showCorrectAnswers: boolean;
  passingScore: number; // percentage
}

export interface EnhancedQuestion {
  questionNumber: number;
  questionType: QuestionType;
  questionText: string;
  questionHtml?: string;
  mediaUrl?: string;
  correctAnswer: string;
  possibleAnswers?: string[];
  answerExplanation: string;
  points: number;
  allowPartialCredit: boolean;
  hints: string[];
  timeLimit?: number;
  isRequired: boolean;
  randomizeOptions: boolean;
  aiGenerated: boolean;
  aiPrompt?: string;
}

export interface EnhancedAssessment {
  title: string;
  description: string;
  objectives: string[];
  assessmentType: string;
  difficulty: string;
  totalPoints: number;
  estimatedDuration: number;
  instructions: string;
  questions: EnhancedQuestion[];
  rubric: {
    criteria: string[];
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
  feedbackSettings: {
    type: string;
    allowRetakes: boolean;
    showCorrectAnswers: boolean;
    passingScore: number;
  };
}

export class EnhancedAssessmentGenerator {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  // Generate AI-powered assessment with diverse question types
  async generateAIAssessment(request: EnhancedAssessmentRequest): Promise<any> {
    try {
      const module = await db.query.modules.findFirst({
        where: eq(modules.id, request.moduleId),
      });

      if (!module) {
        throw new Error("Module not found");
      }

      const prompt = this.createEnhancedAssessmentPrompt(request, module);
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are an expert assessment designer specializing in IGCSE and A-Level Chemistry. Create comprehensive, standards-based assessments with diverse question types following best practices from platforms like Formative.com."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 6000,
      });

      const aiResponse = JSON.parse(response.choices[0].message.content || '{}');
      const enhancedAssessment = this.processAIResponse(aiResponse, request);

      // Save assessment to database
      const assessmentData: InsertAssessment = {
        title: enhancedAssessment.title,
        description: enhancedAssessment.description,
        subjectId: 1, // Chemistry subject ID
        moduleId: request.moduleId,
        objectives: request.objectives,
        assessmentType: request.assessmentType,
        difficulty: request.difficulty,
        totalPoints: request.totalPoints,
        estimatedDuration: request.duration,
        instructions: enhancedAssessment.instructions,
        feedbackType: request.feedbackType,
        allowRetakes: request.allowRetakes,
        showCorrectAnswers: request.showCorrectAnswers,
        markingScheme: JSON.stringify(enhancedAssessment.rubric),
        rubric: JSON.stringify(enhancedAssessment.rubric),
        passingScore: request.passingScore,
        aiGenerated: true,
        autoGrading: true,
        status: "draft",
      };

      const [savedAssessment] = await db.insert(assessments).values(assessmentData).returning();

      // Save questions to database
      await this.saveAssessmentQuestions(savedAssessment.id, enhancedAssessment.questions);

      return {
        success: true,
        assessment: savedAssessment,
        assessmentData: enhancedAssessment
      };

    } catch (error) {
      console.error("Error generating AI assessment:", error);
      throw new Error("Failed to generate AI assessment: " + error.message);
    }
  }

  // Create manual assessment template
  async createManualAssessment(request: EnhancedAssessmentRequest): Promise<any> {
    try {
      const module = await db.query.modules.findFirst({
        where: eq(modules.id, request.moduleId),
      });

      if (!module) {
        throw new Error("Module not found");
      }

      const manualTemplate = this.createManualAssessmentTemplate(request, module);

      const assessmentData: InsertAssessment = {
        title: request.title,
        description: request.description,
        subjectId: 1, // Chemistry subject ID
        moduleId: request.moduleId,
        objectives: request.objectives,
        assessmentType: request.assessmentType,
        difficulty: request.difficulty,
        totalPoints: request.totalPoints,
        estimatedDuration: request.duration,
        instructions: `Assessment for ${request.objectives.join(", ")}`,
        feedbackType: request.feedbackType,
        allowRetakes: request.allowRetakes,
        showCorrectAnswers: request.showCorrectAnswers,
        markingScheme: JSON.stringify(manualTemplate.rubric),
        rubric: JSON.stringify(manualTemplate.rubric),
        passingScore: request.passingScore,
        aiGenerated: false,
        autoGrading: false,
        status: "draft",
      };

      const [savedAssessment] = await db.insert(assessments).values(assessmentData).returning();

      return {
        success: true,
        assessment: savedAssessment,
        template: manualTemplate
      };

    } catch (error) {
      console.error("Error creating manual assessment:", error);
      throw new Error("Failed to create manual assessment: " + error.message);
    }
  }

  private createEnhancedAssessmentPrompt(request: EnhancedAssessmentRequest, module: any): string {
    return `
Create a comprehensive ${request.assessmentType} assessment for ${request.duration} minutes focusing on the following learning objectives:

${request.objectives.map(obj => `• ${obj}`).join('\n')}

Module Context:
- Title: ${module.title}
- Curriculum: ${module.curriculumTopic}
- Grade Levels: ${module.gradeLevels?.join(', ')}
- Difficulty: ${request.difficulty}

Assessment Requirements:
- Type: ${request.assessmentType}
- Duration: ${request.duration} minutes
- Total Points: ${request.totalPoints}
- Question Count: ${request.questionCount}
- Question Types: ${request.questionTypes.join(', ')}
- Difficulty: ${request.difficulty}

Create ${request.questionCount} questions using the specified question types. Include:
1. Clear, unambiguous questions aligned with learning objectives
2. Appropriate answer options and correct answers
3. Detailed explanations for each answer
4. Helpful hints for student support
5. Marking criteria and rubric
6. Feedback for different performance levels

Question Types Guide:
- multiple_choice: 4-5 options with one correct answer
- true_false: Statement with true/false options
- short_answer: Brief written response (1-2 sentences)
- essay: Extended written response (paragraph or more)
- numeric: Numerical calculation answer
- fill_blank: Fill in missing words/values
- matching: Match items from two lists
- show_work: Mathematical problem requiring work shown
- calculation: Multi-step problem solving
- diagram_labeling: Label parts of diagrams
- equation_balancing: Balance chemical equations

Response Format (JSON):
{
  "title": "Assessment title",
  "description": "Assessment overview",
  "instructions": "Clear instructions for students",
  "questions": [
    {
      "questionNumber": 1,
      "questionType": "multiple_choice",
      "questionText": "Clear question text",
      "questionHtml": "Optional HTML formatting",
      "correctAnswer": "Correct answer",
      "possibleAnswers": ["Option A", "Option B", "Option C", "Option D"],
      "answerExplanation": "Why this is the correct answer",
      "points": 2,
      "allowPartialCredit": false,
      "hints": ["Helpful hint 1", "Helpful hint 2"],
      "timeLimit": 120,
      "isRequired": true,
      "randomizeOptions": true,
      "aiGenerated": true
    }
  ],
  "rubric": {
    "criteria": ["Understanding", "Application", "Analysis"],
    "gradeThresholds": {
      "A": 90,
      "B": 80,
      "C": 70,
      "D": 60,
      "E": 50
    },
    "feedback": {
      "excellent": "Excellent understanding demonstrated",
      "good": "Good grasp of concepts",
      "satisfactory": "Satisfactory progress",
      "needsImprovement": "Needs additional practice",
      "unsatisfactory": "Requires significant support"
    }
  }
}

Ensure all questions are:
- Aligned with learning objectives
- Appropriate for the specified difficulty level
- Clear and unambiguous
- Include proper distractors for multiple choice
- Have detailed explanations
- Support formative learning with hints
    `;
  }

  private createManualAssessmentTemplate(request: EnhancedAssessmentRequest, module: any): any {
    const templateQuestions = [];
    
    for (let i = 1; i <= request.questionCount; i++) {
      const questionType = request.questionTypes[i % request.questionTypes.length];
      templateQuestions.push({
        questionNumber: i,
        questionType: questionType,
        questionText: `Add question ${i} here (${questionType})`,
        correctAnswer: "Add correct answer",
        possibleAnswers: questionType === "multiple_choice" ? ["Option A", "Option B", "Option C", "Option D"] : undefined,
        answerExplanation: "Add explanation",
        points: Math.floor(request.totalPoints / request.questionCount),
        allowPartialCredit: false,
        hints: ["Add helpful hint"],
        isRequired: true,
        randomizeOptions: false,
        aiGenerated: false
      });
    }

    return {
      title: request.title,
      description: request.description,
      instructions: "Add clear instructions for students",
      questions: templateQuestions,
      rubric: {
        criteria: ["Understanding", "Application", "Analysis"],
        gradeThresholds: {
          A: 90,
          B: 80,
          C: 70,
          D: 60,
          E: 50
        },
        feedback: {
          excellent: "Excellent understanding demonstrated",
          good: "Good grasp of concepts",
          satisfactory: "Satisfactory progress",
          needsImprovement: "Needs additional practice",
          unsatisfactory: "Requires significant support"
        }
      }
    };
  }

  private processAIResponse(aiResponse: any, request: EnhancedAssessmentRequest): EnhancedAssessment {
    return {
      title: aiResponse.title || request.title,
      description: aiResponse.description || request.description,
      objectives: request.objectives,
      assessmentType: request.assessmentType,
      difficulty: request.difficulty,
      totalPoints: request.totalPoints,
      estimatedDuration: request.duration,
      instructions: aiResponse.instructions || `Assessment for ${request.objectives.join(", ")}`,
      questions: aiResponse.questions || [],
      rubric: aiResponse.rubric || {
        criteria: ["Understanding", "Application"],
        gradeThresholds: { A: 90, B: 80, C: 70, D: 60, E: 50 },
        feedback: {
          excellent: "Excellent work",
          good: "Good understanding",
          satisfactory: "Satisfactory progress",
          needsImprovement: "Needs improvement",
          unsatisfactory: "Requires support"
        }
      },
      feedbackSettings: {
        type: request.feedbackType,
        allowRetakes: request.allowRetakes,
        showCorrectAnswers: request.showCorrectAnswers,
        passingScore: request.passingScore
      }
    };
  }

  private async saveAssessmentQuestions(assessmentId: number, questions: EnhancedQuestion[]): Promise<void> {
    try {
      const questionData: InsertAssessmentQuestion[] = questions.map(q => ({
        assessmentId,
        questionNumber: q.questionNumber,
        questionType: q.questionType,
        questionText: q.questionText,
        questionHtml: q.questionHtml,
        correctAnswer: q.correctAnswer,
        possibleAnswers: q.possibleAnswers,
        answerExplanation: q.answerExplanation,
        points: q.points,
        allowPartialCredit: q.allowPartialCredit,
        hints: q.hints,
        timeLimit: q.timeLimit,
        isRequired: q.isRequired,
        randomizeOptions: q.randomizeOptions,
        aiGenerated: q.aiGenerated,
        aiPrompt: q.aiPrompt
      }));

      await db.insert(assessmentQuestions).values(questionData);
    } catch (error) {
      console.error("Error saving assessment questions:", error);
      // Continue even if question saving fails
    }
  }

  // Get available question types for UI
  getAvailableQuestionTypes(): { value: QuestionType; label: string; description: string }[] {
    return [
      { value: "multiple_choice", label: "Multiple Choice", description: "Choose one correct answer from options" },
      { value: "true_false", label: "True/False", description: "Simple true or false question" },
      { value: "short_answer", label: "Short Answer", description: "Brief written response" },
      { value: "essay", label: "Essay", description: "Extended written response" },
      { value: "numeric", label: "Numeric", description: "Numerical answer required" },
      { value: "fill_blank", label: "Fill in the Blank", description: "Complete missing words or values" },
      { value: "matching", label: "Matching", description: "Match items from two lists" },
      { value: "show_work", label: "Show Your Work", description: "Mathematical problem with work shown" },
      { value: "calculation", label: "Calculation", description: "Multi-step problem solving" },
      { value: "diagram_labeling", label: "Diagram Labeling", description: "Label parts of scientific diagrams" },
      { value: "equation_balancing", label: "Equation Balancing", description: "Balance chemical equations" },
      { value: "drag_drop", label: "Drag & Drop", description: "Drag items to correct positions" },
      { value: "ranking", label: "Ranking", description: "Put items in correct order" },
      { value: "categorization", label: "Categorization", description: "Sort items into categories" },
      { value: "hotspot", label: "Hotspot", description: "Click on correct areas of image" },
      { value: "graphing", label: "Graphing", description: "Create or interpret graphs" },
      { value: "drawing", label: "Drawing", description: "Draw diagrams or structures" },
      { value: "timeline", label: "Timeline", description: "Arrange events chronologically" },
      { value: "formula", label: "Formula", description: "Write chemical formulas" },
      { value: "image_annotation", label: "Image Annotation", description: "Add labels to images" }
    ];
  }
}

export const enhancedAssessmentGenerator = new EnhancedAssessmentGenerator();