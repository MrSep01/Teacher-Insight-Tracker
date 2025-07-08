import { pgTable, text, serial, integer, decimal, timestamp, boolean, varchar, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User authentication tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email").unique().notNull(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  provider: varchar("provider").notNull().default("local"), // local, google, microsoft, apple
  providerId: varchar("provider_id"),
  password: varchar("password"), // For email/password authentication
  emailVerified: boolean("email_verified").default(false),
  emailVerificationToken: varchar("email_verification_token"),
  resetPasswordToken: varchar("reset_password_token"),
  resetPasswordExpires: timestamp("reset_password_expires"),
  // Teacher profile fields
  curricula: text("curricula").array(), // ["IGCSE Chemistry Edexcel", "A Level Chemistry Edexcel"]
  gradeLevels: text("grade_levels").array(), // ["10", "11", "12"]
  profileCompleted: boolean("profile_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userSessions = pgTable(
  "user_sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: text("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_user_session_expire").on(table.expire)],
);

// Classes table for organizing students
export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // "Grade 10 IGCSE Chemistry A", "Grade 12 A Level Chemistry"
  grade: text("grade").notNull(), // "10", "11", "12"
  level: text("level").notNull(), // "IGCSE", "A Level"
  curriculum: text("curriculum").notNull(), // "IGCSE Chemistry Edexcel", "A Level Chemistry Edexcel"
  teacherId: integer("teacher_id").references(() => users.id),
  description: text("description"),
  academicYear: text("academic_year").notNull(), // "2024-2025"
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  grade: text("grade").notNull(), // "10", "11", "12"
  level: text("level").notNull(), // "IGCSE", "A Level"
  studentId: text("student_id").notNull().unique(),
  classId: integer("class_id").references(() => classes.id),
  // Status will be calculated from assessment results, not stored
});

export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  grade: text("grade").notNull(), // "10", "11", "12"
  level: text("level").notNull(), // "IGCSE", "A Level"
  curriculum: text("curriculum").notNull().default("Edexcel"), // Focus on Edexcel
  topicArea: text("topic_area").notNull(), // e.g., "Atomic Structure", "Bonding", "Periodicity"
  color: text("color").notNull(),
  icon: text("icon").notNull(),
});

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subjectId: integer("subject_id").notNull(),
  date: timestamp("date").notNull(),
  totalPoints: integer("total_points").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const studentScores = pgTable("student_scores", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  assessmentId: integer("assessment_id").notNull(),
  score: decimal("score", { precision: 5, scale: 2 }).notNull(),
  percentage: decimal("percentage", { precision: 5, scale: 2 }).notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Curriculum modules for teachers
export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: varchar("title").notNull(),
  description: text("description"),
  curriculumTopic: varchar("curriculum_topic").notNull(),
  gradeLevels: text("grade_levels").array(),
  classId: integer("class_id").references(() => classes.id), // Optional class association
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Lesson plans within modules
export const lessonPlans = pgTable("lesson_plans", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").references(() => modules.id),
  title: varchar("title").notNull(),
  description: text("description"),
  objectives: text("objectives").array(),
  activities: text("activities").array(),
  resources: text("resources").array(),
  duration: varchar("duration"), // "45 minutes", "1.5 hours"
  difficulty: varchar("difficulty"), // "beginner", "intermediate", "advanced"
  targetStudents: text("target_students").array(), // student IDs or "all"
  aiSuggestions: text("ai_suggestions"),
  isCompleted: boolean("is_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const lessonRecommendations = pgTable("lesson_recommendations", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  subjectId: integer("subject_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  priority: text("priority").notNull().default("medium"), // low, medium, high
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
});

export const insertSubjectSchema = createInsertSchema(subjects).omit({
  id: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  createdAt: true,
});

export const insertStudentScoreSchema = createInsertSchema(studentScores).omit({
  id: true,
  createdAt: true,
});

export const insertModuleSchema = createInsertSchema(modules).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLessonPlanSchema = createInsertSchema(lessonPlans).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLessonRecommendationSchema = createInsertSchema(lessonRecommendations).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertClassSchema = createInsertSchema(classes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Class = typeof classes.$inferSelect;
export type InsertClass = z.infer<typeof insertClassSchema>;

export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;

export type Subject = typeof subjects.$inferSelect;
export type InsertSubject = z.infer<typeof insertSubjectSchema>;

export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;

export type StudentScore = typeof studentScores.$inferSelect;
export type InsertStudentScore = z.infer<typeof insertStudentScoreSchema>;

export type Module = typeof modules.$inferSelect;
export type InsertModule = z.infer<typeof insertModuleSchema>;

export type LessonPlan = typeof lessonPlans.$inferSelect;
export type InsertLessonPlan = z.infer<typeof insertLessonPlanSchema>;

export type LessonRecommendation = typeof lessonRecommendations.$inferSelect;
export type InsertLessonRecommendation = z.infer<typeof insertLessonRecommendationSchema>;

// Extended types for API responses
export type StudentWithScores = Student & {
  scores: (StudentScore & { assessment: Assessment; subject: Subject })[];
  overallPercentage: number;
  subjectAverages: { [key: string]: number };
  status: "on_track" | "needs_attention" | "excelling" | "at_risk"; // Computed based on results
};

export type AssessmentWithDetails = Assessment & {
  subject: Subject;
  averageScore: number;
  studentCount: number;
  scores: (StudentScore & { student: Student })[];
};

export type DashboardStats = {
  totalStudents: number;
  averageScore: number;
  needsAttention: number;
  assessmentsThisWeek: number;
};
