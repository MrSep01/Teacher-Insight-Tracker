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

// This is the structure you would fill with official Edexcel data
export const CURRICULUM_DATA: CurriculumLevel[] = [
  {
    id: "igcse_chemistry_edexcel",
    name: "IGCSE Chemistry Edexcel",
    grades: ["10", "11"],
    specificationYear: "2023",
    examBoard: "Edexcel",
    topics: [
      {
        id: "principles_of_chemistry",
        name: "Principles of Chemistry",
        description: "Fundamental concepts of chemistry including atomic structure, bonding, and chemical equations",
        specificationCode: "Topic 1",
        timeAllocation: 40,
        assessmentNotes: "Tested across all papers with emphasis on practical applications",
        subtopics: [
          {
            id: "states_of_matter",
            name: "States of Matter",
            description: "Properties and behavior of solids, liquids, and gases",
            objectives: [
              {
                id: "1.1.1",
                code: "1.1.1",
                statement: "Students will be able to describe the arrangement and movement of particles in solids, liquids and gases",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain", "compare"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["particles", "kinetic theory", "states of matter", "temperature", "pressure"]
              },
              {
                id: "1.1.2", 
                code: "1.1.2",
                statement: "Students will be able to explain changes of state in terms of particle movement and energy changes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "predict", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.1.1"],
                keywords: ["melting", "boiling", "sublimation", "energy", "temperature"]
              }
            ],
            practicalWork: ["Investigating changes of state", "Measuring melting and boiling points"],
            mathematicalSkills: ["Plotting heating/cooling curves", "Converting temperature scales"]
          },
          {
            id: "atomic_structure",
            name: "Atomic Structure",
            description: "Structure of atoms, isotopes, and arrangement of electrons",
            objectives: [
              {
                id: "1.2.1",
                code: "1.2.1", 
                statement: "Students will be able to describe the structure of an atom in terms of protons, neutrons and electrons",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "identify", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["proton", "neutron", "electron", "nucleus", "atomic number", "mass number"]
              }
            ]
          }
        ]
      },
      {
        id: "inorganic_chemistry",
        name: "Inorganic Chemistry", 
        description: "Properties and reactions of elements and compounds",
        specificationCode: "Topic 2",
        timeAllocation: 50,
        assessmentNotes: "Heavy emphasis on practical work and reaction mechanisms",
        subtopics: [
          // This would be populated with official specification data
        ]
      }
      // Additional topics would be added here
    ],
    overallAssessmentStructure: {
      papers: [
        {
          paperNumber: 1,
          name: "Chemistry",
          duration: 120,
          marks: 110,
          questionTypes: ["multiple choice", "short answer", "structured questions"],
          topicCoverage: ["principles_of_chemistry", "inorganic_chemistry", "physical_chemistry", "organic_chemistry"]
        },
        {
          paperNumber: 2,
          name: "Chemistry",
          duration: 90,
          marks: 70,
          questionTypes: ["short answer", "extended writing"],
          topicCoverage: ["principles_of_chemistry", "inorganic_chemistry", "physical_chemistry", "organic_chemistry"]
        }
      ]
    }
  },
  {
    id: "a_level_chemistry_edexcel",
    name: "A Level Chemistry Edexcel",
    grades: ["12"],
    specificationYear: "2023",
    examBoard: "Edexcel",
    topics: [
      // A Level topics would be populated here with more advanced content
    ],
    overallAssessmentStructure: {
      papers: [
        {
          paperNumber: 1,
          name: "Core Inorganic and Physical Chemistry",
          duration: 105,
          marks: 90,
          questionTypes: ["structured questions", "extended writing"],
          topicCoverage: ["atomic_structure", "bonding", "energetics", "kinetics", "equilibria", "redox"]
        }
        // Additional papers
      ]
    }
  }
];

// Helper functions to work with curriculum data
export class CurriculumService {
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