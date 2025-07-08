import { StudentWithScores, Subject, Assessment } from "@shared/schema";
import OpenAI from "openai";

export interface DetailedRecommendation {
  id: string;
  studentId: number;
  studentName: string;
  type: "remedial" | "enrichment" | "intervention" | "acceleration";
  priority: "low" | "medium" | "high" | "urgent";
  title: string;
  description: string;
  subjectName: string;
  targetSkills: string[];
  activities: string[];
  timeline: string;
  successMetrics: string[];
  resources: string[];
  reasoning: string;
  confidenceScore: number; // 0-100
}

export interface LearningPattern {
  studentId: number;
  strengths: string[];
  weaknesses: string[];
  learningStyle: "visual" | "auditory" | "kinesthetic" | "mixed";
  progressTrend: "improving" | "declining" | "stable" | "inconsistent";
  riskLevel: "low" | "medium" | "high" | "critical";
  engagementLevel: "low" | "medium" | "high";
}

export class AIRecommendationEngine {
  private openai: OpenAI;
  
  constructor() {
    this.openai = new OpenAI({ 
      apiKey: process.env.OPENAI_API_KEY 
    });
  }
  
  // Analyze student's learning patterns
  analyzeLearningPatterns(student: StudentWithScores): LearningPattern {
    const scores = student.scores.sort((a, b) => 
      new Date(a.assessment.date).getTime() - new Date(b.assessment.date).getTime()
    );
    
    // Calculate trend
    const progressTrend = this.calculateProgressTrend(scores);
    
    // Identify strengths and weaknesses
    const { strengths, weaknesses } = this.identifyStrengthsWeaknesses(student.subjectAverages);
    
    // Determine risk level
    const riskLevel = this.assessRiskLevel(student, progressTrend);
    
    // Estimate learning style based on performance patterns
    const learningStyle = this.estimateLearningStyle(scores);
    
    // Assess engagement based on consistency
    const engagementLevel = this.assessEngagement(scores);
    
    return {
      studentId: student.id,
      strengths,
      weaknesses,
      learningStyle,
      progressTrend,
      riskLevel,
      engagementLevel
    };
  }

  // Generate detailed recommendations for a student
  async generateDetailedRecommendations(
    student: StudentWithScores, 
    subjects: Subject[], 
    allStudents: StudentWithScores[]
  ): Promise<DetailedRecommendation[]> {
    const patterns = this.analyzeLearningPatterns(student);
    const recommendations: DetailedRecommendation[] = [];
    
    // Subject-specific recommendations
    Object.entries(student.subjectAverages).forEach(([subjectName, average]) => {
      const subjectRecommendations = this.generateSubjectRecommendations(
        student, subjectName, average, patterns
      );
      recommendations.push(...subjectRecommendations);
    });
    
    // Cross-curricular recommendations
    const crossCurricularRecs = this.generateCrossCurricularRecommendations(
      student, patterns, allStudents
    );
    recommendations.push(...crossCurricularRecs);
    
    // Social-emotional learning recommendations
    const selRecommendations = this.generateSELRecommendations(student, patterns);
    recommendations.push(...selRecommendations);
    
    // Enhanced AI-powered recommendations
    const aiRecommendations = await this.generateAIRecommendations(student, patterns);
    recommendations.push(...aiRecommendations);
    
    return recommendations.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  // Generate AI-powered recommendations using OpenAI
  async generateAIRecommendations(
    student: StudentWithScores,
    patterns: LearningPattern
  ): Promise<DetailedRecommendation[]> {
    try {
      const prompt = this.createPrompt(student, patterns);
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are an expert educational consultant specializing in personalized learning strategies. Generate detailed, actionable recommendations for teachers based on student performance data and learning patterns. Respond with JSON format only."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7
      });

      const aiResponse = JSON.parse(response.choices[0].message.content || '{}');
      return this.parseAIResponse(aiResponse, student);
    } catch (error) {
      console.error('Error generating AI recommendations:', error);
      return [];
    }
  }

  private createPrompt(student: StudentWithScores, patterns: LearningPattern): string {
    const subjectPerformance = Object.entries(student.subjectAverages)
      .map(([subject, avg]) => `${subject}: ${Math.round(avg)}%`)
      .join(', ');

    const recentScores = student.scores
      .sort((a, b) => new Date(b.assessment.date).getTime() - new Date(a.assessment.date).getTime())
      .slice(0, 5)
      .map(score => `${score.subject.name}: ${score.percentage}%`)
      .join(', ');

    return `
Analyze this student's performance and generate personalized teaching recommendations:

Student: ${student.name}
Grade: ${student.grade}
Overall Performance: ${Math.round(student.overallPercentage)}%
Subject Averages: ${subjectPerformance}
Recent Assessment Scores: ${recentScores}

Learning Patterns:
- Progress Trend: ${patterns.progressTrend}
- Learning Style: ${patterns.learningStyle}
- Strengths: ${patterns.strengths.join(', ')}
- Areas for Growth: ${patterns.weaknesses.join(', ')}
- Risk Level: ${patterns.riskLevel}
- Engagement Level: ${patterns.engagementLevel}

Generate 2-3 specific, actionable recommendations in JSON format:
{
  "recommendations": [
    {
      "type": "remedial|enrichment|intervention|acceleration",
      "priority": "low|medium|high|urgent",
      "title": "Brief recommendation title",
      "description": "Detailed description of the recommendation",
      "subjectName": "Subject focus or 'Cross-Curricular'",
      "targetSkills": ["skill1", "skill2", "skill3"],
      "activities": ["activity1", "activity2", "activity3"],
      "timeline": "Expected duration",
      "successMetrics": ["metric1", "metric2"],
      "resources": ["resource1", "resource2"],
      "reasoning": "Why this recommendation is important",
      "confidenceScore": 85
    }
  ]
}

Focus on practical, classroom-implementable strategies that address the student's specific needs and learning profile.`;
  }

  private parseAIResponse(aiResponse: any, student: StudentWithScores): DetailedRecommendation[] {
    const recommendations: DetailedRecommendation[] = [];
    
    if (aiResponse.recommendations && Array.isArray(aiResponse.recommendations)) {
      aiResponse.recommendations.forEach((rec: any, index: number) => {
        recommendations.push({
          id: `${student.id}-ai-${index}`,
          studentId: student.id,
          studentName: student.name,
          type: rec.type || "intervention",
          priority: rec.priority || "medium",
          title: rec.title || "AI-Generated Recommendation",
          description: rec.description || "Personalized recommendation based on performance analysis",
          subjectName: rec.subjectName || "General",
          targetSkills: Array.isArray(rec.targetSkills) ? rec.targetSkills : [],
          activities: Array.isArray(rec.activities) ? rec.activities : [],
          timeline: rec.timeline || "2-4 weeks",
          successMetrics: Array.isArray(rec.successMetrics) ? rec.successMetrics : [],
          resources: Array.isArray(rec.resources) ? rec.resources : [],
          reasoning: rec.reasoning || "Generated based on student performance patterns",
          confidenceScore: typeof rec.confidenceScore === 'number' ? rec.confidenceScore : 85
        });
      });
    }
    
    return recommendations;
  }

  private calculateProgressTrend(scores: any[]): "improving" | "declining" | "stable" | "inconsistent" {
    if (scores.length < 3) return "stable";
    
    const recentScores = scores.slice(-4).map(s => Number(s.percentage));
    const olderScores = scores.slice(-8, -4).map(s => Number(s.percentage));
    
    if (olderScores.length === 0) return "stable";
    
    const recentAvg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
    const olderAvg = olderScores.reduce((a, b) => a + b, 0) / olderScores.length;
    
    const difference = recentAvg - olderAvg;
    const variance = this.calculateVariance(recentScores);
    
    if (variance > 400) return "inconsistent"; // High variance indicates inconsistency
    if (difference > 5) return "improving";
    if (difference < -5) return "declining";
    return "stable";
  }

  private identifyStrengthsWeaknesses(subjectAverages: { [key: string]: number }) {
    const subjects = Object.entries(subjectAverages);
    const avgPerformance = subjects.reduce((sum, [_, score]) => sum + score, 0) / subjects.length;
    
    const strengths = subjects
      .filter(([_, score]) => score > avgPerformance + 10)
      .map(([subject, _]) => subject);
    
    const weaknesses = subjects
      .filter(([_, score]) => score < avgPerformance - 10)
      .map(([subject, _]) => subject);
    
    return { strengths, weaknesses };
  }

  private assessRiskLevel(student: StudentWithScores, trend: string): "low" | "medium" | "high" | "critical" {
    const overallPercentage = student.overallPercentage;
    
    if (overallPercentage < 50 || (trend === "declining" && overallPercentage < 70)) {
      return "critical";
    }
    if (overallPercentage < 65 || trend === "declining") {
      return "high";
    }
    if (overallPercentage < 75 || trend === "inconsistent") {
      return "medium";
    }
    return "low";
  }

  private estimateLearningStyle(scores: any[]): "visual" | "auditory" | "kinesthetic" | "mixed" {
    // This is a simplified heuristic - in reality, you'd need more data
    const variance = this.calculateVariance(scores.map(s => Number(s.percentage)));
    
    if (variance < 100) return "visual"; // Consistent performance suggests visual learner
    if (variance > 300) return "kinesthetic"; // High variance might suggest kinesthetic learner
    return "mixed";
  }

  private assessEngagement(scores: any[]): "low" | "medium" | "high" {
    if (scores.length < 3) return "medium";
    
    const recentScores = scores.slice(-3).map(s => Number(s.percentage));
    const variance = this.calculateVariance(recentScores);
    const average = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
    
    if (variance > 400 || average < 60) return "low";
    if (variance < 100 && average > 85) return "high";
    return "medium";
  }

  private calculateVariance(numbers: number[]): number {
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const squaredDiffs = numbers.map(num => Math.pow(num - mean, 2));
    return squaredDiffs.reduce((a, b) => a + b, 0) / numbers.length;
  }

  private generateSubjectRecommendations(
    student: StudentWithScores,
    subjectName: string,
    average: number,
    patterns: LearningPattern
  ): DetailedRecommendation[] {
    const recommendations: DetailedRecommendation[] = [];
    const baseId = `${student.id}-${subjectName.toLowerCase()}`;
    
    if (average < 70) {
      // Remedial recommendations
      recommendations.push({
        id: `${baseId}-remedial`,
        studentId: student.id,
        studentName: student.name,
        type: "remedial",
        priority: average < 60 ? "urgent" : "high",
        title: `${subjectName} Foundation Strengthening`,
        description: `Targeted intervention to address fundamental gaps in ${subjectName}`,
        subjectName,
        targetSkills: this.getFoundationalSkills(subjectName),
        activities: this.getRemedialActivities(subjectName, patterns.learningStyle),
        timeline: "2-4 weeks intensive support",
        successMetrics: [`Achieve 70%+ on foundation assessments`, `Demonstrate mastery of core concepts`],
        resources: this.getRemedialResources(subjectName),
        reasoning: `Student scoring ${Math.round(average)}% needs foundational support. Learning pattern shows ${patterns.progressTrend} trend.`,
        confidenceScore: 85
      });
    } else if (average > 90) {
      // Enrichment recommendations
      recommendations.push({
        id: `${baseId}-enrichment`,
        studentId: student.id,
        studentName: student.name,
        type: "enrichment",
        priority: "medium",
        title: `${subjectName} Advanced Challenge Program`,
        description: `Enrichment activities to challenge and extend learning in ${subjectName}`,
        subjectName,
        targetSkills: this.getAdvancedSkills(subjectName),
        activities: this.getEnrichmentActivities(subjectName, patterns.learningStyle),
        timeline: "Ongoing enrichment",
        successMetrics: [`Complete advanced projects`, `Mentor struggling peers`, `Maintain 90%+ performance`],
        resources: this.getEnrichmentResources(subjectName),
        reasoning: `Student excelling at ${Math.round(average)}% is ready for advanced challenges.`,
        confidenceScore: 90
      });
    }

    return recommendations;
  }

  private generateCrossCurricularRecommendations(
    student: StudentWithScores,
    patterns: LearningPattern,
    allStudents: StudentWithScores[]
  ): DetailedRecommendation[] {
    const recommendations: DetailedRecommendation[] = [];
    
    if (patterns.riskLevel === "high" || patterns.riskLevel === "critical") {
      recommendations.push({
        id: `${student.id}-intervention`,
        studentId: student.id,
        studentName: student.name,
        type: "intervention",
        priority: patterns.riskLevel === "critical" ? "urgent" : "high",
        title: "Comprehensive Academic Support Plan",
        description: "Multi-faceted intervention addressing academic and engagement challenges",
        subjectName: "Cross-Curricular",
        targetSkills: ["Study skills", "Time management", "Goal setting", "Self-advocacy"],
        activities: [
          "Daily check-ins with academic coach",
          "Structured homework time",
          "Progress monitoring system",
          "Parent-teacher collaboration meetings"
        ],
        timeline: "6-8 weeks with weekly reviews",
        successMetrics: [
          "Improved attendance and engagement",
          "Completion rate above 80%",
          "Grade improvement in all subjects"
        ],
        resources: [
          "Academic coach assignment",
          "Study skills workbook",
          "Progress tracking app",
          "Family support resources"
        ],
        reasoning: `Student shows ${patterns.riskLevel} risk level with ${patterns.progressTrend} academic trend. Comprehensive support needed.`,
        confidenceScore: 95
      });
    }

    return recommendations;
  }

  private generateSELRecommendations(
    student: StudentWithScores,
    patterns: LearningPattern
  ): DetailedRecommendation[] {
    const recommendations: DetailedRecommendation[] = [];
    
    if (patterns.engagementLevel === "low") {
      recommendations.push({
        id: `${student.id}-engagement`,
        studentId: student.id,
        studentName: student.name,
        type: "intervention",
        priority: "medium",
        title: "Student Engagement Enhancement",
        description: "Strategies to increase motivation and classroom participation",
        subjectName: "Social-Emotional Learning",
        targetSkills: ["Self-motivation", "Growth mindset", "Resilience", "Goal setting"],
        activities: [
          "Interest-based learning projects",
          "Peer collaboration opportunities",
          "Choice in learning activities",
          "Regular goal-setting conferences"
        ],
        timeline: "4-6 weeks",
        successMetrics: [
          "Increased participation in class",
          "Completion of self-directed projects",
          "Positive self-assessment scores"
        ],
        resources: [
          "Interest inventory assessment",
          "Goal-setting templates",
          "Student choice menus",
          "Motivation strategies guide"
        ],
        reasoning: `Student shows low engagement patterns. Personalized approach needed to rebuild motivation.`,
        confidenceScore: 80
      });
    }

    return recommendations;
  }

  private getFoundationalSkills(subject: string): string[] {
    const skillMap: { [key: string]: string[] } = {
      "Mathematics": ["Number sense", "Basic operations", "Problem-solving strategies", "Mathematical reasoning"],
      "Science": ["Scientific method", "Observation skills", "Data collection", "Hypothesis formation"],
      "English": ["Reading comprehension", "Vocabulary building", "Writing mechanics", "Grammar fundamentals"],
      "History": ["Timeline understanding", "Cause and effect", "Source analysis", "Critical thinking"]
    };
    return skillMap[subject] || ["Foundation concepts", "Core skills", "Basic understanding"];
  }

  private getAdvancedSkills(subject: string): string[] {
    const skillMap: { [key: string]: string[] } = {
      "Mathematics": ["Abstract reasoning", "Complex problem solving", "Mathematical modeling", "Proof techniques"],
      "Science": ["Experimental design", "Data analysis", "Theory application", "Research methodology"],
      "English": ["Critical analysis", "Creative writing", "Rhetorical techniques", "Literary interpretation"],
      "History": ["Historical synthesis", "Primary source analysis", "Comparative studies", "Research skills"]
    };
    return skillMap[subject] || ["Advanced concepts", "Higher-order thinking", "Complex applications"];
  }

  private getRemedialActivities(subject: string, learningStyle: string): string[] {
    const activities: { [key: string]: { [key: string]: string[] } } = {
      "Mathematics": {
        "visual": ["Number line exercises", "Geometric manipulatives", "Visual fraction models"],
        "auditory": ["Math facts songs", "Verbal problem solving", "Discussion groups"],
        "kinesthetic": ["Hands-on manipulatives", "Math games", "Movement-based learning"],
        "mixed": ["Multi-sensory activities", "Varied practice methods", "Interactive tools"]
      },
      "Science": {
        "visual": ["Diagram creation", "Video demonstrations", "Visual experiments"],
        "auditory": ["Science podcasts", "Verbal explanations", "Discussion forums"],
        "kinesthetic": ["Hands-on experiments", "Field studies", "Lab investigations"],
        "mixed": ["Multi-modal experiments", "Varied documentation", "Interactive simulations"]
      }
    };
    return activities[subject]?.[learningStyle] || ["Individualized practice", "Targeted exercises", "Skill drills"];
  }

  private getEnrichmentActivities(subject: string, learningStyle: string): string[] {
    const activities: { [key: string]: { [key: string]: string[] } } = {
      "Mathematics": {
        "visual": ["Advanced graphing projects", "Mathematical art", "Complex visualizations"],
        "auditory": ["Math debates", "Presentation projects", "Peer teaching"],
        "kinesthetic": ["Engineering challenges", "Real-world applications", "Design projects"],
        "mixed": ["Research projects", "Creative problem solving", "Competition preparation"]
      },
      "Science": {
        "visual": ["Research presentations", "Scientific illustrations", "Data visualization"],
        "auditory": ["Science communication", "Peer explanations", "Debate activities"],
        "kinesthetic": ["Independent experiments", "Field research", "Design challenges"],
        "mixed": ["Science fair projects", "Interdisciplinary studies", "Community research"]
      }
    };
    return activities[subject]?.[learningStyle] || ["Independent projects", "Research activities", "Advanced challenges"];
  }

  private getRemedialResources(subject: string): string[] {
    const resources: { [key: string]: string[] } = {
      "Mathematics": ["Khan Academy basics", "Math fact worksheets", "Tutoring sessions", "Practice apps"],
      "Science": ["Science basics videos", "Hands-on experiment kits", "Study guides", "Visual aids"],
      "English": ["Reading comprehension workbooks", "Vocabulary builders", "Writing templates", "Grammar guides"],
      "History": ["Timeline resources", "Historical fiction", "Documentary films", "Study outlines"]
    };
    return resources[subject] || ["Study materials", "Practice resources", "Support tools"];
  }

  private getEnrichmentResources(subject: string): string[] {
    const resources: { [key: string]: string[] } = {
      "Mathematics": ["Advanced problem sets", "Competition materials", "Research databases", "Mentorship programs"],
      "Science": ["Science journals", "Research tools", "Lab equipment", "Expert connections"],
      "English": ["Classic literature", "Writing workshops", "Literary magazines", "Author studies"],
      "History": ["Primary source databases", "Research archives", "Historical societies", "Expert interviews"]
    };
    return resources[subject] || ["Advanced materials", "Research resources", "Expert guidance"];
  }
}

export const aiEngine = new AIRecommendationEngine();