import { db } from "./db";
import { students, subjects, assessments, studentScores } from "@shared/schema";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingStudents = await db.select().from(students);
    if (existingStudents.length > 0) {
      console.log("Database already seeded");
      return;
    }

    // Seed subjects
    const subjectData = [
      { name: "Mathematics", color: "#1976D2", icon: "fas fa-calculator" },
      { name: "Science", color: "#388E3C", icon: "fas fa-leaf" },
      { name: "English", color: "#FF9800", icon: "fas fa-book" },
      { name: "History", color: "#9C27B0", icon: "fas fa-landmark" },
    ];

    const insertedSubjects = await db.insert(subjects).values(subjectData).returning();
    console.log("Seeded subjects:", insertedSubjects.length);

    // Seed students
    const studentData = [
      { name: "Alice Brown", grade: "Grade 5", studentId: "12345", status: "on_track" },
      { name: "Bobby Johnson", grade: "Grade 5", studentId: "12346", status: "needs_attention" },
      { name: "Carol Wilson", grade: "Grade 5", studentId: "12347", status: "excelling" },
      { name: "David Smith", grade: "Grade 5", studentId: "12348", status: "on_track" },
      { name: "Emma Davis", grade: "Grade 5", studentId: "12349", status: "on_track" },
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