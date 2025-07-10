import OpenAI from "openai";
import { storage } from "./storage";
import type { InsertLessonPlan } from "@shared/schema";
import { multimediaGenerator } from "./multimedia-content-generator";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export interface ComprehensiveLessonRequest {
  moduleId: number;
  lessonType: "lecture" | "practical" | "project" | "assessment" | "discussion" | "fieldwork";
  topic: string;
  duration: number;
  difficulty: "basic" | "intermediate" | "advanced";
  curriculum: string;
  gradeLevels: string[];
  moduleTopics: string[];
  moduleObjectives: string[];
  studentPerformanceData?: Array<{
    studentId: number;
    name: string;
    averageScore: number;
    strengths: string[];
    weaknesses: string[];
    learningStyle: "visual" | "auditory" | "kinesthetic" | "mixed";
  }>;
  teacherPreferences?: {
    includeMultimedia: boolean;
    includeDifferentiation: boolean;
    includeAssessmentRubrics: boolean;
    includeExtensionActivities: boolean;
    preferredTeachingStyle: "direct" | "inquiry" | "collaborative" | "mixed";
  };
}

export interface MultimediaContent {
  type: "image" | "video" | "diagram" | "simulation" | "interactive";
  title: string;
  description: string;
  suggestedSource: string;
  purpose: string;
  placementInLesson: "introduction" | "development" | "practice" | "assessment" | "homework";
  alternativeText: string;
  searchKeywords: string[];
}

export interface DifferentiatedActivity {
  level: "below_grade" | "on_grade" | "above_grade";
  title: string;
  description: string;
  instructions: string[];
  materials: string[];
  timeRequired: number;
  supportProvided: string[];
  extensionOpportunities: string[];
  assessmentCriteria: string[];
}

export interface TeacherGuide {
  lessonOverview: string;
  preparationChecklist: string[];
  timingGuide: {
    segment: string;
    duration: number;
    activity: string;
    teacherActions: string[];
    studentActions: string[];
    keyPoints: string[];
  }[];
  commonMisconceptions: {
    misconception: string;
    correction: string;
    teachingStrategy: string;
  }[];
  troubleshootingTips: string[];
  adaptationSuggestions: string[];
  followUpActivities: string[];
}

export interface AssessmentRubric {
  criteria: string;
  levels: {
    level: "emerging" | "developing" | "proficient" | "advanced";
    description: string;
    indicators: string[];
    score: number;
  }[];
}

export interface ComprehensiveLesson {
  title: string;
  description: string;
  lessonType: string;
  objectives: string[];
  
  // Full lesson content
  fullLessonContent: {
    introduction: {
      hook: string;
      learningGoals: string[];
      success_criteria: string[];
      duration: number;
    };
    development: {
      mainContent: string[];
      keyExplanations: string[];
      demonstrations: string[];
      duration: number;
    };
    practice: {
      guidedPractice: string[];
      independentPractice: string[];
      duration: number;
    };
    assessment: {
      formativeAssessment: string[];
      summativeAssessment: string[];
      duration: number;
    };
    closure: {
      summary: string[];
      homework: string[];
      nextLesson: string;
      duration: number;
    };
  };
  
  // Teacher guide
  teacherGuide: TeacherGuide;
  
  // Multimedia content
  multimediaContent: MultimediaContent[];
  
  // Differentiated activities
  differentiatedActivities: DifferentiatedActivity[];
  
  // Assessment rubrics
  assessmentRubrics: AssessmentRubric[];
  
  // Traditional lesson plan fields
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

export class ComprehensiveLessonGenerator {
  private openai: OpenAI;

  constructor() {
    this.openai = openai;
  }

  async generateFullLesson(request: ComprehensiveLessonRequest): Promise<any> {
    try {
      // Generate the comprehensive lesson content
      const lessonContent = await this.generateLessonContent(request);
      
      // Generate teacher guide
      const teacherGuide = await this.generateTeacherGuide(request, lessonContent);
      
      // Generate multimedia suggestions
      const multimediaContent = await this.generateMultimediaContent(request, lessonContent);
      
      // Generate differentiated activities
      const differentiatedActivities = await this.generateDifferentiatedActivities(request, lessonContent);
      
      // Generate assessment rubrics
      const assessmentRubrics = await this.generateAssessmentRubrics(request, lessonContent);
      
      // Combine all components
      const comprehensiveLesson: ComprehensiveLesson = {
        ...lessonContent,
        teacherGuide,
        multimediaContent,
        differentiatedActivities,
        assessmentRubrics
      };
      
      // Save to database
      const lessonPlanData: InsertLessonPlan = {
        moduleId: request.moduleId,
        title: comprehensiveLesson.title,
        description: comprehensiveLesson.description,
        lessonType: comprehensiveLesson.lessonType as any,
        objectives: comprehensiveLesson.objectives,
        activities: comprehensiveLesson.activities,
        resources: comprehensiveLesson.resources,
        equipment: comprehensiveLesson.equipment || [],
        safetyNotes: comprehensiveLesson.safetyNotes,
        duration: comprehensiveLesson.duration,
        difficulty: comprehensiveLesson.difficulty as any,
        prerequisites: comprehensiveLesson.prerequisites,
        assessmentCriteria: comprehensiveLesson.assessmentCriteria,
        differentiation: comprehensiveLesson.differentiation,
        homework: comprehensiveLesson.homework,
        aiGenerated: true,
        sequenceOrder: comprehensiveLesson.sequenceOrder,
        targetStudents: request.studentPerformanceData ? 
          request.studentPerformanceData.map(s => s.name) : ["all"],
        aiSuggestions: JSON.stringify(comprehensiveLesson),
      };

      const savedLesson = await storage.createLessonPlan(lessonPlanData);
      return { ...savedLesson, fullLesson: comprehensiveLesson };
    } catch (error) {
      console.error("Error generating comprehensive lesson:", error);
      throw new Error("Failed to generate comprehensive lesson plan");
    }
  }

  private async generateLessonContent(request: ComprehensiveLessonRequest): Promise<Partial<ComprehensiveLesson>> {
    const prompt = this.createLessonContentPrompt(request);
    
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert chemistry teacher and curriculum designer specializing in Edexcel IGCSE and A Level Chemistry. Create comprehensive, engaging lesson content that follows best practices in chemistry education with detailed explanations and activities."
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

    const aiResponse = JSON.parse(response.choices[0].message.content || "{}");
    return this.processLessonContentResponse(aiResponse, request);
  }

  private async generateTeacherGuide(request: ComprehensiveLessonRequest, lessonContent: Partial<ComprehensiveLesson>): Promise<TeacherGuide> {
    const prompt = this.createTeacherGuidePrompt(request, lessonContent);
    
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert teacher trainer specializing in chemistry education. Create detailed teacher guides that help both novice and experienced teachers deliver effective lessons."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.6,
      max_tokens: 3000,
    });

    const aiResponse = JSON.parse(response.choices[0].message.content || "{}");
    return this.processTeacherGuideResponse(aiResponse);
  }

  private async generateMultimediaContent(request: ComprehensiveLessonRequest, lessonContent: Partial<ComprehensiveLesson>): Promise<MultimediaContent[]> {
    try {
      const multimediaRequest = {
        lessonTopic: request.topic,
        lessonObjectives: request.moduleObjectives,
        targetAudience: `${request.gradeLevels.join(", ")} students`,
        lessonSection: "development" as const,
        curriculum: request.curriculum,
        gradeLevel: request.gradeLevels[0] || "10"
      };

      const multimediaContent = await multimediaGenerator.generateMultimediaContent(multimediaRequest);
      
      // Convert to expected format
      return multimediaContent.map(content => ({
        type: content.type,
        title: content.title,
        description: content.description,
        suggestedSource: content.suggestedSource,
        purpose: content.purpose,
        placementInLesson: content.placementInLesson as "introduction" | "development" | "practice" | "assessment" | "homework",
        alternativeText: content.alternativeText,
        searchKeywords: content.searchKeywords
      }));
    } catch (error) {
      console.error("Error generating multimedia content:", error);
      return [
        {
          type: "diagram",
          title: `${request.topic} Concept Diagram`,
          description: `Visual diagram showing key concepts and relationships in ${request.topic}`,
          suggestedSource: "Educational resources",
          purpose: "Provide visual representation of key concepts",
          placementInLesson: "development",
          alternativeText: `Diagram illustrating ${request.topic} concepts`,
          searchKeywords: [request.topic, "diagram", "chemistry"]
        }
      ];
    }
  }

  private async generateDifferentiatedActivities(request: ComprehensiveLessonRequest, lessonContent: Partial<ComprehensiveLesson>): Promise<DifferentiatedActivity[]> {
    const prompt = this.createDifferentiationPrompt(request, lessonContent);
    
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a differentiation specialist in chemistry education. Create activities tailored to different ability levels and learning styles."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2500,
    });

    const aiResponse = JSON.parse(response.choices[0].message.content || "{}");
    return aiResponse.differentiatedActivities || [];
  }

  private async generateAssessmentRubrics(request: ComprehensiveLessonRequest, lessonContent: Partial<ComprehensiveLesson>): Promise<AssessmentRubric[]> {
    const prompt = this.createAssessmentRubricPrompt(request, lessonContent);
    
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an assessment expert in chemistry education. Create detailed rubrics that clearly define performance levels and help teachers provide effective feedback."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.6,
      max_tokens: 2000,
    });

    const aiResponse = JSON.parse(response.choices[0].message.content || "{}");
    return aiResponse.assessmentRubrics || [];
  }

  private createLessonContentPrompt(request: ComprehensiveLessonRequest): string {
    const studentInfo = request.studentPerformanceData ? 
      `\n**Student Performance Data:**\n${request.studentPerformanceData.map(s => 
        `- ${s.name}: Average ${s.averageScore}%, Strengths: ${s.strengths.join(", ")}, Weaknesses: ${s.weaknesses.join(", ")}, Learning Style: ${s.learningStyle}`
      ).join("\n")}` : "";

    return `
Create a comprehensive, detailed lesson on ${request.topic} for ${request.curriculum} chemistry.

**Context:**
- Topic: ${request.topic}
- Lesson Type: ${request.lessonType}
- Duration: ${request.duration} minutes
- Difficulty: ${request.difficulty}
- Grade Levels: ${request.gradeLevels.join(", ")}
- Module Topics: ${request.moduleTopics.join(", ")}
- Module Objectives: ${request.moduleObjectives.join(", ")}${studentInfo}

**Requirements:**
Create a full lesson with detailed content for each section. This should be a complete lesson that a teacher can deliver, not just a lesson plan.

**Output Format:**
{
  "title": "Engaging lesson title",
  "description": "Detailed lesson description",
  "objectives": ["Use only provided module objectives"],
  "fullLessonContent": {
    "introduction": {
      "hook": "Detailed opening activity/demonstration to capture attention",
      "learningGoals": ["Clear, student-friendly learning goals"],
      "success_criteria": ["What students will be able to do by the end"],
      "duration": 10
    },
    "development": {
      "mainContent": ["Detailed explanation of key concepts with examples"],
      "keyExplanations": ["Step-by-step explanations of difficult concepts"],
      "demonstrations": ["Teacher demonstrations or examples"],
      "duration": 25
    },
    "practice": {
      "guidedPractice": ["Activities where teacher guides students"],
      "independentPractice": ["Activities students do independently"],
      "duration": 20
    },
    "assessment": {
      "formativeAssessment": ["Ways to check understanding during lesson"],
      "summativeAssessment": ["End-of-lesson assessment activities"],
      "duration": 10
    },
    "closure": {
      "summary": ["Key points to summarize"],
      "homework": ["Specific homework assignments"],
      "nextLesson": "Brief preview of next lesson",
      "duration": 5
    }
  },
  "activities": ["List of all activities"],
  "resources": ["Specific resources needed"],
  "equipment": ["Required equipment/materials"],
  "safetyNotes": "Safety considerations",
  "prerequisites": ["What students need to know beforehand"],
  "assessmentCriteria": ["How to assess student learning"],
  "differentiation": "How to adapt for different learners",
  "homework": "Specific homework assignments",
  "sequenceOrder": 1
}`;
  }

  private createTeacherGuidePrompt(request: ComprehensiveLessonRequest, lessonContent: Partial<ComprehensiveLesson>): string {
    return `
Create a detailed teacher guide for the lesson "${lessonContent.title}" on ${request.topic}.

**Lesson Overview:**
${JSON.stringify(lessonContent.fullLessonContent, null, 2)}

**Requirements:**
Create a comprehensive guide that helps teachers deliver this lesson effectively, including timing, troubleshooting, and adaptation suggestions.

**Output Format:**
{
  "lessonOverview": "Brief overview of the lesson structure and goals",
  "preparationChecklist": ["What teacher needs to prepare before class"],
  "timingGuide": [
    {
      "segment": "Introduction",
      "duration": 10,
      "activity": "Hook activity",
      "teacherActions": ["What the teacher should do"],
      "studentActions": ["What students should do"],
      "keyPoints": ["Important points to emphasize"]
    }
  ],
  "commonMisconceptions": [
    {
      "misconception": "Common student misconception",
      "correction": "Correct understanding",
      "teachingStrategy": "How to address this misconception"
    }
  ],
  "troubleshootingTips": ["Solutions for common problems"],
  "adaptationSuggestions": ["How to modify for different contexts"],
  "followUpActivities": ["Activities for next lessons or homework"]
}`;
  }

  private createMultimediaPrompt(request: ComprehensiveLessonRequest, lessonContent: Partial<ComprehensiveLesson>): string {
    return `
Suggest specific multimedia content to enhance the lesson "${lessonContent.title}" on ${request.topic}.

**Lesson Content:**
${JSON.stringify(lessonContent.fullLessonContent, null, 2)}

**Requirements:**
Suggest specific images, videos, diagrams, simulations, and interactive content that would enhance learning.

**Output Format:**
{
  "multimediaContent": [
    {
      "type": "image|video|diagram|simulation|interactive",
      "title": "Specific title of the multimedia",
      "description": "What this multimedia shows/does",
      "suggestedSource": "Where to find this (e.g., YouTube, Phet, specific website)",
      "purpose": "Why this multimedia is useful for learning",
      "placementInLesson": "introduction|development|practice|assessment|homework",
      "alternativeText": "Text description for accessibility",
      "searchKeywords": ["Keywords to search for this content"]
    }
  ]
}`;
  }

  private createDifferentiationPrompt(request: ComprehensiveLessonRequest, lessonContent: Partial<ComprehensiveLesson>): string {
    const studentInfo = request.studentPerformanceData ? 
      `\n**Student Performance Data:**\n${request.studentPerformanceData.map(s => 
        `- ${s.name}: Average ${s.averageScore}%, Learning Style: ${s.learningStyle}`
      ).join("\n")}` : "";

    return `
Create differentiated activities for the lesson "${lessonContent.title}" on ${request.topic}.

**Lesson Content:**
${JSON.stringify(lessonContent.fullLessonContent, null, 2)}${studentInfo}

**Requirements:**
Create specific activities for below-grade, on-grade, and above-grade learners.

**Output Format:**
{
  "differentiatedActivities": [
    {
      "level": "below_grade|on_grade|above_grade",
      "title": "Activity title",
      "description": "What students will do",
      "instructions": ["Step-by-step instructions"],
      "materials": ["Required materials"],
      "timeRequired": 20,
      "supportProvided": ["How teacher will support these students"],
      "extensionOpportunities": ["Ways to extend learning"],
      "assessmentCriteria": ["How to assess this activity"]
    }
  ]
}`;
  }

  private createAssessmentRubricPrompt(request: ComprehensiveLessonRequest, lessonContent: Partial<ComprehensiveLesson>): string {
    return `
Create detailed assessment rubrics for the lesson "${lessonContent.title}" on ${request.topic}.

**Lesson Objectives:**
${lessonContent.objectives?.join(", ")}

**Assessment Criteria:**
${lessonContent.assessmentCriteria?.join(", ")}

**Requirements:**
Create rubrics that clearly define performance levels for the lesson objectives.

**Output Format:**
{
  "assessmentRubrics": [
    {
      "criteria": "Specific assessment criteria",
      "levels": [
        {
          "level": "emerging|developing|proficient|advanced",
          "description": "Description of performance at this level",
          "indicators": ["Specific indicators of this performance level"],
          "score": 1
        }
      ]
    }
  ]
}`;
  }

  private processLessonContentResponse(aiResponse: any, request: ComprehensiveLessonRequest): Partial<ComprehensiveLesson> {
    return {
      title: aiResponse.title || `${request.topic} Lesson`,
      description: aiResponse.description || `A comprehensive lesson on ${request.topic}`,
      lessonType: request.lessonType,
      objectives: aiResponse.objectives || [],
      fullLessonContent: aiResponse.fullLessonContent || {},
      activities: aiResponse.activities || [],
      resources: aiResponse.resources || [],
      equipment: aiResponse.equipment || [],
      safetyNotes: aiResponse.safetyNotes,
      duration: request.duration,
      difficulty: request.difficulty,
      prerequisites: aiResponse.prerequisites || [],
      assessmentCriteria: aiResponse.assessmentCriteria || [],
      differentiation: aiResponse.differentiation || "",
      homework: aiResponse.homework || "",
      sequenceOrder: aiResponse.sequenceOrder || 1,
    };
  }

  private processTeacherGuideResponse(aiResponse: any): TeacherGuide {
    return {
      lessonOverview: aiResponse.lessonOverview || "",
      preparationChecklist: aiResponse.preparationChecklist || [],
      timingGuide: aiResponse.timingGuide || [],
      commonMisconceptions: aiResponse.commonMisconceptions || [],
      troubleshootingTips: aiResponse.troubleshootingTips || [],
      adaptationSuggestions: aiResponse.adaptationSuggestions || [],
      followUpActivities: aiResponse.followUpActivities || [],
    };
  }
}

export const comprehensiveLessonGenerator = new ComprehensiveLessonGenerator();