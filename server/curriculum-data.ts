// Curriculum data structure for Edexcel Chemistry specifications
// This will be populated with official curriculum data

export interface LearningObjective {
  id: string;
  code: string; // e.g., "1.1.1", "2.3.4" from specification
  statement: string; // The actual learning objective
  bloomsLevel: "remember" | "understand" | "apply" | "analyze" | "evaluate" | "create";
  difficulty: "basic" | "intermediate" | "advanced";
  commandWords: string[]; // Assessment command words used
  estimatedTeachingMinutes: number;
  assessmentWeight: number; // Relative importance in assessments
  prerequisiteObjectives: string[]; // Dependencies
  keywords: string[]; // Key scientific terms
}

export interface Subtopic {
  id: string;
  name: string;
  description: string;
  objectives: LearningObjective[];
  practicalWork?: string[]; // Required practical activities
  mathematicalSkills?: string[]; // Mathematical requirements
  crossCurricular?: string[]; // Links to other subjects
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  specificationCode: string; // Official topic code
  subtopics: Subtopic[];
  assessmentNotes: string;
  timeAllocation: number; // Recommended teaching hours
}

export interface CurriculumLevel {
  id: string;
  name: string; // "IGCSE Chemistry Edexcel" | "A Level Chemistry Edexcel"
  grades: string[]; // ["10", "11"] or ["12"]
  topics: Topic[];
  overallAssessmentStructure: {
    papers: Array<{
      paperNumber: number;
      name: string;
      duration: number;
      marks: number;
      questionTypes: string[];
      topicCoverage: string[]; // Topic IDs covered
    }>;
  };
  specificationYear: string; // e.g., "2023"
  examBoard: string; // "Edexcel"
}

import { COMPREHENSIVE_CURRICULUM_DATA } from './comprehensive-curriculum';

// Full IGCSE and A Level Edexcel specifications with comprehensive curriculum data
export const CURRICULUM_DATA: CurriculumLevel[] = COMPREHENSIVE_CURRICULUM_DATA;

// Helper functions to work with curriculum data
export class CurriculumService {
  static getAllCurricula(): CurriculumLevel[] {
    return CURRICULUM_DATA;
  }

  static getCurriculumByName(name: string): CurriculumLevel | undefined {
    return CURRICULUM_DATA.find(curriculum => curriculum.name === name);
  }

  static getTopicsByCurriculum(curriculumName: string): Topic[] {
    const curriculum = this.getCurriculumByName(curriculumName);
    return curriculum?.topics || [];
  }

  static getSubtopicsByTopic(curriculumName: string, topicId: string): Subtopic[] {
    const curriculum = this.getCurriculumByName(curriculumName);
    const topic = curriculum?.topics.find(t => t.id === topicId);
    return topic?.subtopics || [];
  }

  static getObjectivesBySubtopic(curriculumName: string, topicId: string, subtopicId: string): LearningObjective[] {
    const subtopics = this.getSubtopicsByTopic(curriculumName, topicId);
    const subtopic = subtopics.find(s => s.id === subtopicId);
    return subtopic?.objectives || [];
  }

  static getAllObjectivesByCurriculum(curriculumName: string): LearningObjective[] {
    const curriculum = this.getCurriculumByName(curriculumName);
    if (!curriculum) return [];

    const objectives: LearningObjective[] = [];
    curriculum.topics.forEach(topic => {
      topic.subtopics.forEach(subtopic => {
        objectives.push(...subtopic.objectives);
      });
    });
    return objectives;
  }

  static getObjectivesByGrade(curriculumName: string, grade: string): LearningObjective[] {
    // This would need grade-specific mappings in the data structure
    // For now, return all objectives for the curriculum
    return this.getAllObjectivesByCurriculum(curriculumName);
  }

  static getTopicsByDifficulty(curriculumName: string, difficulty: string): Topic[] {
    const curriculum = this.getCurriculumByName(curriculumName);
    if (!curriculum) return [];

    return curriculum.topics.filter(topic => {
      return topic.subtopics.some(subtopic => 
        subtopic.objectives.some(obj => obj.difficulty === difficulty)
      );
    });
  }

  static getAssessmentStructure(curriculumName: string) {
    const curriculum = this.getCurriculumByName(curriculumName);
    return curriculum?.overallAssessmentStructure;
  }
}

export default CurriculumService;