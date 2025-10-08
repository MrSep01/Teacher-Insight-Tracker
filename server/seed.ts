import { db, databaseStatus } from "./db";
import { students, subjects, assessments, studentScores } from "@shared/schema";

export async function seedDatabase() {
  if (databaseStatus.mode !== 'postgres' || !db) {
    console.log("Skipping database seed because the persistent database connection is unavailable.");
    return;
  }

  try {
    // Check if data already exists
    const existingStudents = await db.select().from(students);
    if (existingStudents.length > 0) {
      console.log("Database already seeded");
      return;
    }

    // Seed Chemistry subjects for IGCSE/A Level Edexcel
    const subjectData = [
      { name: "Atomic Structure & Bonding", grade: "10", level: "IGCSE", curriculum: "Edexcel", topicArea: "Atomic Structure", color: "#3b82f6", icon: "Atom" },
      { name: "Periodicity", grade: "10", level: "IGCSE", curriculum: "Edexcel", topicArea: "Periodicity", color: "#10b981", icon: "Table" },
      { name: "Chemical Bonding", grade: "10", level: "IGCSE", curriculum: "Edexcel", topicArea: "Bonding", color: "#f59e0b", icon: "Link" },
      { name: "Organic Chemistry Basics", grade: "11", level: "IGCSE", curriculum: "Edexcel", topicArea: "Organic Chemistry", color: "#ef4444", icon: "Molecule" },
      { name: "Energetics", grade: "11", level: "IGCSE", curriculum: "Edexcel", topicArea: "Energetics", color: "#8b5cf6", icon: "Flame" },
      { name: "Advanced Organic Chemistry", grade: "12", level: "A Level", curriculum: "Edexcel", topicArea: "Advanced Organic", color: "#06b6d4", icon: "Beaker" },
      { name: "Thermodynamics", grade: "12", level: "A Level", curriculum: "Edexcel", topicArea: "Thermodynamics", color: "#f97316", icon: "Thermometer" },
      { name: "Kinetics", grade: "12", level: "A Level", curriculum: "Edexcel", topicArea: "Kinetics", color: "#84cc16", icon: "Clock" },
    ];

    const insertedSubjects = await db.insert(subjects).values(subjectData).returning();
    console.log("Seeded subjects:", insertedSubjects.length);

    // Seed students for Chemistry grades 10-12
    const studentData = [
      { name: "Alice Brown", grade: "10", level: "IGCSE", studentId: "CHE10001" },
      { name: "Bobby Johnson", grade: "10", level: "IGCSE", studentId: "CHE10002" },
      { name: "Carol Wilson", grade: "11", level: "IGCSE", studentId: "CHE11001" },
      { name: "David Smith", grade: "11", level: "IGCSE", studentId: "CHE11002" },
      { name: "Emma Davis", grade: "12", level: "A Level", studentId: "CHE12001" },
      { name: "Frank Miller", grade: "12", level: "A Level", studentId: "CHE12002" },
    ];

    const insertedStudents = await db.insert(students).values(studentData).returning();
    console.log("Seeded students:", insertedStudents.length);

    // Seed assessments
    const assessmentData = [
      { 
        title: "Math Quiz Ch. 8", 
        subjectId: insertedSubjects[0].id, 
        date: new Date("2024-03-15"), 
        totalPoints: 100, 
        description: "Chapter 8 mathematics quiz" 
      },
      { 
        title: "Science Project", 
        subjectId: insertedSubjects[1].id, 
        date: new Date("2024-03-12"), 
        totalPoints: 100, 
        description: "Plant growth experiment" 
      },
      { 
        title: "Reading Comprehension", 
        subjectId: insertedSubjects[2].id, 
        date: new Date("2024-03-10"), 
        totalPoints: 100, 
        description: "Short story analysis" 
      },
    ];

    const insertedAssessments = await db.insert(assessments).values(assessmentData).returning();
    console.log("Seeded assessments:", insertedAssessments.length);

    // Seed student scores
    const scoreData = [
      // Alice Brown (ID: 1)
      { studentId: insertedStudents[0].id, assessmentId: insertedAssessments[0].id, score: "88", percentage: "88", notes: null },
      { studentId: insertedStudents[0].id, assessmentId: insertedAssessments[1].id, score: "92", percentage: "92", notes: null },
      { studentId: insertedStudents[0].id, assessmentId: insertedAssessments[2].id, score: "75", percentage: "75", notes: null },
      // Bobby Johnson (ID: 2)
      { studentId: insertedStudents[1].id, assessmentId: insertedAssessments[0].id, score: "62", percentage: "62", notes: null },
      { studentId: insertedStudents[1].id, assessmentId: insertedAssessments[1].id, score: "78", percentage: "78", notes: null },
      { studentId: insertedStudents[1].id, assessmentId: insertedAssessments[2].id, score: "85", percentage: "85", notes: null },
      // Carol Wilson (ID: 3)
      { studentId: insertedStudents[2].id, assessmentId: insertedAssessments[0].id, score: "95", percentage: "95", notes: null },
      { studentId: insertedStudents[2].id, assessmentId: insertedAssessments[1].id, score: "89", percentage: "89", notes: null },
      { studentId: insertedStudents[2].id, assessmentId: insertedAssessments[2].id, score: "91", percentage: "91", notes: null },
    ];

    const insertedScores = await db.insert(studentScores).values(scoreData).returning();
    console.log("Seeded student scores:", insertedScores.length);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}