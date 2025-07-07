import { StudentWithScores, LessonRecommendation } from "@shared/schema";

export interface RecommendationRule {
  condition: (student: StudentWithScores) => boolean;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  subjectName: string;
}

export const recommendationRules: RecommendationRule[] = [
  {
    condition: (student) => (student.subjectAverages.English || 0) < 70,
    title: "Reading Comprehension Focus",
    description: "Based on recent performance, consider additional reading exercises with guided questions.",
    priority: "high",
    subjectName: "English",
  },
  {
    condition: (student) => (student.subjectAverages.Mathematics || 0) < 70,
    title: "Math Fundamentals Review",
    description: "Focus on basic math concepts and provide additional practice problems.",
    priority: "high",
    subjectName: "Mathematics",
  },
  {
    condition: (student) => (student.subjectAverages.Science || 0) < 70,
    title: "Science Concept Reinforcement",
    description: "Use hands-on experiments and visual aids to strengthen science understanding.",
    priority: "high",
    subjectName: "Science",
  },
  {
    condition: (student) => (student.subjectAverages.Mathematics || 0) > 90,
    title: "Advanced Math Challenges",
    description: "Student shows strong math skills. Consider providing advanced problem sets.",
    priority: "medium",
    subjectName: "Mathematics",
  },
  {
    condition: (student) => (student.subjectAverages.English || 0) > 90,
    title: "Creative Writing Projects",
    description: "Encourage creative expression through advanced writing assignments.",
    priority: "medium",
    subjectName: "English",
  },
  {
    condition: (student) => (student.subjectAverages.Science || 0) > 90,
    title: "Independent Research Projects",
    description: "Assign independent science research projects to challenge advanced students.",
    priority: "medium",
    subjectName: "Science",
  },
  {
    condition: (student) => student.overallPercentage < 60,
    title: "General Study Support",
    description: "Consider one-on-one tutoring sessions to address foundational gaps.",
    priority: "high",
    subjectName: "All Subjects",
  },
  {
    condition: (student) => {
      const recentScores = student.scores.slice(-3);
      return recentScores.length >= 3 && recentScores.every(score => Number(score.percentage) < 70);
    },
    title: "Intervention Strategy",
    description: "Recent declining performance suggests need for immediate intervention.",
    priority: "high",
    subjectName: "All Subjects",
  },
];

export function generateRecommendations(student: StudentWithScores): RecommendationRule[] {
  return recommendationRules.filter(rule => rule.condition(student));
}

export function getRecommendationPriorityColor(priority: string): string {
  switch (priority) {
    case "high":
      return "bg-red-100 border-red-200";
    case "medium":
      return "bg-yellow-100 border-yellow-200";
    case "low":
      return "bg-blue-100 border-blue-200";
    default:
      return "bg-gray-100 border-gray-200";
  }
}

export function getRecommendationBadgeColor(priority: string): string {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-600";
  }
}
