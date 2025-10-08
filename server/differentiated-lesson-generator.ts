import type OpenAI from "openai";
import { storage } from "./storage";
import type { InsertLessonPlan, Student, StudentScore, Assessment } from "@shared/schema";
import { getOpenAIClient, MissingOpenAIKeyError } from "./openai-client";

const sharedClient = getOpenAIClient();

export interface StudentPerformanceData {
  studentId: number;
  studentName: string;
  recentAssessments: Array<{
    assessmentTitle: string;
    topicsCovered: string[];
    objectives: string[];
    score: number;
    percentage: number;
    date: Date;
  }>;
  strengths: string[];
  weaknesses: string[];
  learningStyle: "visual" | "auditory" | "kinesthetic" | "mixed";
  difficulty: "below_grade" | "on_grade" | "above_grade";
  riskLevel: "low" | "medium" | "high";
}

export interface DifferentiatedLessonRequest {
  moduleId: number;
  topic: string;
  duration: number;
  curriculum: string;
  gradeLevels: string[];
  moduleTopics: string[];
  moduleObjectives: string[];
  classStudents: StudentPerformanceData[];
  lessonType: "lecture" | "practical" | "project" | "assessment" | "discussion" | "review";
}

export interface DifferentiatedLessonPlan {
  title: string;
  description: string;
  mainObjectives: string[];
  
  // Differentiated sections for different ability groups
  activities: {
    struggling: {
      description: string;
      activities: string[];
      resources: string[];
      supportStrategies: string[];
      simplifiedObjectives: string[];
    };
    onTrack: {
      description: string;
      activities: string[];
      resources: string[];
      objectives: string[];
    };
    advanced: {
      description: string;
      activities: string[];
      resources: string[];
      extensionActivities: string[];
      advancedObjectives: string[];
    };
  };

  // Individual student recommendations
  individualAdaptations: Array<{
    studentId: number;
    studentName: string;
    specificStrategy: string;
    recommendedActivities: string[];
    targetAreas: string[];
    resources: string[];
  }>;

  // Assessment differentiation
  assessmentDifferentiation: {
    struggling: {
      assessmentType: string;
      criteria: string[];
      supportProvided: string[];
    };
    onTrack: {
      assessmentType: string;
      criteria: string[];
    };
    advanced: {
      assessmentType: string;
      criteria: string[];
      extensionCriteria: string[];
    };
  };

  // Lesson structure
  lessonStructure: {
    starter: {
      activity: string;
      duration: number;
      differentiation: string;
    };
    main: {
      activity: string;
      duration: number;
      groupWork: string;
      differentiation: string;
    };
    plenary: {
      activity: string;
      duration: number;
      assessment: string;
    };
  };

  groupings: {
    mixed: string[];
    abilityBased: {
      struggling: string[];
      onTrack: string[];
      advanced: string[];
    };
    pairWork: Array<{
      student1: string;
      student2: string;
      rationale: string;
    }>;
  };

  homework: {
    struggling: string;
    onTrack: string;
    advanced: string;
  };

  resources: string[];
  equipment: string[];
  safetyNotes?: string;
}

export class DifferentiatedLessonGenerator {
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

  async generateDifferentiatedLesson(request: DifferentiatedLessonRequest): Promise<any> {
    try {
      const prompt = this.createDifferentiatedLessonPrompt(request);
      
      const client = this.requireClient();
      const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert chemistry teacher specializing in differentiated instruction. Create comprehensive lesson plans that cater to individual student needs based on their assessment data, learning styles, and ability levels. Focus on practical, evidence-based differentiation strategies."
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
      const processedLesson = this.processAIResponse(aiResponse, request);
      
      // Save to database with differentiated content
      const lessonPlanData: InsertLessonPlan = {
        moduleId: request.moduleId,
        title: processedLesson.title,
        description: processedLesson.description,
        lessonType: request.lessonType as any,
        objectives: processedLesson.mainObjectives,
        activities: this.flattenActivities(processedLesson.activities),
        resources: processedLesson.resources,
        equipment: processedLesson.equipment || [],
        safetyNotes: processedLesson.safetyNotes,
        duration: request.duration,
        difficulty: "mixed" as any,
        prerequisites: [],
        assessmentCriteria: this.flattenAssessmentCriteria(processedLesson.assessmentDifferentiation),
        differentiation: JSON.stringify(processedLesson),
        homework: JSON.stringify(processedLesson.homework),
        aiGenerated: true,
        sequenceOrder: 1,
        targetStudents: request.classStudents.map(s => s.studentId.toString()),
        aiSuggestions: JSON.stringify(aiResponse),
      };

      const savedLesson = await storage.createLessonPlan(lessonPlanData);
      return {
        ...savedLesson,
        differentiatedContent: processedLesson
      };
    } catch (error) {
      console.error("Error generating differentiated lesson:", error);
      if (error instanceof MissingOpenAIKeyError) {
        throw error;
      }
      throw new Error("Failed to generate differentiated lesson plan");
    }
  }

  private createDifferentiatedLessonPrompt(request: DifferentiatedLessonRequest): string {
    const studentProfiles = request.classStudents.map(student => {
      const recentPerformance = student.recentAssessments.length > 0 
        ? student.recentAssessments.map(a => `${a.assessmentTitle}: ${a.percentage}%`).join(", ")
        : "No recent assessments";

      return `
**${student.studentName} (ID: ${student.studentId})**
- Recent Performance: ${recentPerformance}
- Strengths: ${student.strengths.join(", ")}
- Weaknesses: ${student.weaknesses.join(", ")}
- Learning Style: ${student.learningStyle}
- Ability Level: ${student.difficulty}
- Risk Level: ${student.riskLevel}
      `.trim();
    }).join("\n\n");

    return `
Create a comprehensive differentiated lesson plan for ${request.curriculum} chemistry.

**Lesson Context:**
- Topic: ${request.topic}
- Duration: ${request.duration} minutes
- Lesson Type: ${request.lessonType}
- Grade Levels: ${request.gradeLevels.join(", ")}
- Module Topics: ${request.moduleTopics.join(", ")}
- Module Objectives: ${request.moduleObjectives.join(", ")}

**Class Profile (${request.classStudents.length} students):**
${studentProfiles}

**Required Output Structure:**
Create a JSON object with the following structure:

{
  "title": "Engaging differentiated lesson title",
  "description": "Brief description focusing on differentiation",
  "mainObjectives": ["main objective 1", "main objective 2", "main objective 3"],
  
  "activities": {
    "struggling": {
      "description": "Clear description of activities for struggling students",
      "activities": ["concrete, hands-on activity 1", "scaffolded activity 2", "supported practice 3"],
      "resources": ["visual aids", "manipulatives", "step-by-step guides"],
      "supportStrategies": ["specific support strategy 1", "specific support strategy 2"],
      "simplifiedObjectives": ["simplified objective 1", "simplified objective 2"]
    },
    "onTrack": {
      "description": "Activities for students meeting grade level expectations",
      "activities": ["standard activity 1", "collaborative activity 2", "practice activity 3"],
      "resources": ["textbook", "worksheets", "online resources"],
      "objectives": ["grade-level objective 1", "grade-level objective 2"]
    },
    "advanced": {
      "description": "Challenging activities for advanced students",
      "activities": ["complex problem-solving", "independent research", "peer teaching"],
      "resources": ["advanced texts", "research materials", "digital tools"],
      "extensionActivities": ["extension activity 1", "extension activity 2"],
      "advancedObjectives": ["advanced objective 1", "advanced objective 2"]
    }
  },

  "individualAdaptations": [
    {
      "studentId": 123,
      "studentName": "Student Name",
      "specificStrategy": "Tailored approach based on their profile",
      "recommendedActivities": ["activity 1", "activity 2"],
      "targetAreas": ["weakness to address", "strength to build on"],
      "resources": ["specific resource 1", "specific resource 2"]
    }
  ],

  "assessmentDifferentiation": {
    "struggling": {
      "assessmentType": "simplified assessment approach",
      "criteria": ["basic criteria 1", "basic criteria 2"],
      "supportProvided": ["support type 1", "support type 2"]
    },
    "onTrack": {
      "assessmentType": "standard assessment approach",
      "criteria": ["standard criteria 1", "standard criteria 2"]
    },
    "advanced": {
      "assessmentType": "challenging assessment approach",
      "criteria": ["advanced criteria 1", "advanced criteria 2"],
      "extensionCriteria": ["extension criteria 1", "extension criteria 2"]
    }
  },

  "lessonStructure": {
    "starter": {
      "activity": "Engaging starter activity",
      "duration": 10,
      "differentiation": "How starter is differentiated"
    },
    "main": {
      "activity": "Main lesson activity",
      "duration": 25,
      "groupWork": "Group work strategy",
      "differentiation": "How main activity is differentiated"
    },
    "plenary": {
      "activity": "Plenary activity",
      "duration": 10,
      "assessment": "Assessment strategy"
    }
  },

  "groupings": {
    "mixed": ["strategy for mixed ability groups"],
    "abilityBased": {
      "struggling": ["student names for struggling group"],
      "onTrack": ["student names for on-track group"],
      "advanced": ["student names for advanced group"]
    },
    "pairWork": [
      {
        "student1": "Student A",
        "student2": "Student B",
        "rationale": "Why these students work well together"
      }
    ]
  },

  "homework": {
    "struggling": "Simplified homework task",
    "onTrack": "Standard homework task",
    "advanced": "Extended homework task"
  },

  "resources": ["general resource 1", "general resource 2"],
  "equipment": ["equipment 1", "equipment 2"],
  "safetyNotes": "Safety considerations if applicable"
}

**Differentiation Guidelines:**
1. Use ONLY the module objectives provided - adapt difficulty, not content
2. Provide specific, actionable strategies for each student based on their profile
3. Include concrete examples and step-by-step approaches
4. Ensure all students can access the main learning objectives at their level
5. Create meaningful peer interactions and collaborative opportunities
6. Include formative assessment opportunities throughout
7. Address individual learning styles and preferences
8. Provide clear success criteria for each ability level

**Key Focus Areas:**
- Struggling students: Concrete examples, visual aids, scaffolded support
- On-track students: Collaborative learning, standard practice
- Advanced students: Independent inquiry, extension challenges
- Individual needs: Address specific weaknesses and build on strengths

Make this a practical, implementable lesson plan that a teacher can use immediately.
    `;
  }

  private processAIResponse(aiResponse: any, request: DifferentiatedLessonRequest): DifferentiatedLessonPlan {
    return {
      title: aiResponse.title || `Differentiated Lesson: ${request.topic}`,
      description: aiResponse.description || "Differentiated lesson plan",
      mainObjectives: aiResponse.mainObjectives || [],
      activities: aiResponse.activities || {},
      individualAdaptations: aiResponse.individualAdaptations || [],
      assessmentDifferentiation: aiResponse.assessmentDifferentiation || {},
      lessonStructure: aiResponse.lessonStructure || {},
      groupings: aiResponse.groupings || {},
      homework: aiResponse.homework || {},
      resources: aiResponse.resources || [],
      equipment: aiResponse.equipment || [],
      safetyNotes: aiResponse.safetyNotes
    };
  }

  private flattenActivities(activities: any): string[] {
    const flattened: string[] = [];
    if (activities.struggling?.activities) flattened.push(...activities.struggling.activities);
    if (activities.onTrack?.activities) flattened.push(...activities.onTrack.activities);
    if (activities.advanced?.activities) flattened.push(...activities.advanced.activities);
    return flattened;
  }

  private flattenAssessmentCriteria(assessmentDiff: any): string[] {
    const flattened: string[] = [];
    if (assessmentDiff.struggling?.criteria) flattened.push(...assessmentDiff.struggling.criteria);
    if (assessmentDiff.onTrack?.criteria) flattened.push(...assessmentDiff.onTrack.criteria);
    if (assessmentDiff.advanced?.criteria) flattened.push(...assessmentDiff.advanced.criteria);
    return flattened;
  }

  // Helper method to analyze student performance and create performance data
  async analyzeStudentPerformance(studentId: number): Promise<StudentPerformanceData> {
    try {
      const student = await storage.getStudentById(studentId);
      if (!student) throw new Error("Student not found");

      const scores = await storage.getStudentScores(studentId);
      const assessments = await storage.getStudentAssessments(studentId);

      const recentAssessments = assessments.slice(-5).map(assessment => {
        const score = scores.find(s => s.assessmentId === assessment.id);
        return {
          assessmentTitle: assessment.title,
          topicsCovered: assessment.topics || [],
          objectives: assessment.objectives || [],
          score: score?.score ? Number(score.score) : 0,
          percentage: score?.percentage ? Number(score.percentage) : 0,
          date: assessment.date
        };
      });

      // Calculate performance metrics
      const averagePercentage = recentAssessments.length > 0
        ? recentAssessments.reduce((sum, a) => sum + a.percentage, 0) / recentAssessments.length
        : 0;

      const strengths = this.identifyStrengths(recentAssessments);
      const weaknesses = this.identifyWeaknesses(recentAssessments);
      const learningStyle = this.estimateLearningStyle(recentAssessments);
      const difficulty = this.determineDifficultyLevel(averagePercentage);
      const riskLevel = this.assessRiskLevel(averagePercentage, recentAssessments);

      return {
        studentId,
        studentName: student.name,
        recentAssessments,
        strengths,
        weaknesses,
        learningStyle,
        difficulty,
        riskLevel
      };
    } catch (error) {
      console.error("Error analyzing student performance:", error);
      throw error;
    }
  }

  private identifyStrengths(assessments: any[]): string[] {
    // Analyze topics/objectives where student consistently performs well
    const topicPerformance: { [key: string]: number[] } = {};
    
    assessments.forEach(assessment => {
      assessment.topicsCovered.forEach((topic: string) => {
        if (!topicPerformance[topic]) topicPerformance[topic] = [];
        topicPerformance[topic].push(assessment.percentage);
      });
    });

    return Object.entries(topicPerformance)
      .filter(([_, scores]) => scores.reduce((sum, score) => sum + score, 0) / scores.length > 75)
      .map(([topic, _]) => topic);
  }

  private identifyWeaknesses(assessments: any[]): string[] {
    const topicPerformance: { [key: string]: number[] } = {};
    
    assessments.forEach(assessment => {
      assessment.topicsCovered.forEach((topic: string) => {
        if (!topicPerformance[topic]) topicPerformance[topic] = [];
        topicPerformance[topic].push(assessment.percentage);
      });
    });

    return Object.entries(topicPerformance)
      .filter(([_, scores]) => scores.reduce((sum, score) => sum + score, 0) / scores.length < 60)
      .map(([topic, _]) => topic);
  }

  private estimateLearningStyle(assessments: any[]): "visual" | "auditory" | "kinesthetic" | "mixed" {
    // Simple heuristic - in real implementation, would use more sophisticated analysis
    return "mixed";
  }

  private determineDifficultyLevel(averagePercentage: number): "below_grade" | "on_grade" | "above_grade" {
    if (averagePercentage < 60) return "below_grade";
    if (averagePercentage > 80) return "above_grade";
    return "on_grade";
  }

  private assessRiskLevel(averagePercentage: number, assessments: any[]): "low" | "medium" | "high" {
    if (averagePercentage < 50) return "high";
    if (averagePercentage < 70) return "medium";
    return "low";
  }
}

export const differentiatedLessonGenerator = new DifferentiatedLessonGenerator();