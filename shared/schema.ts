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

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  grade: text("grade").notNull(),
  studentId: text("student_id").notNull().unique(),
  status: text("status").notNull().default("on_track"), // on_track, needs_attention, excelling
});

export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
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

export const insertLessonRecommendationSchema = createInsertSchema(lessonRecommendations).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;

export type Subject = typeof subjects.$inferSelect;
export type InsertSubject = z.infer<typeof insertSubjectSchema>;

export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;

export type StudentScore = typeof studentScores.$inferSelect;
export type InsertStudentScore = z.infer<typeof insertStudentScoreSchema>;

export type LessonRecommendation = typeof lessonRecommendations.$inferSelect;
export type InsertLessonRecommendation = z.infer<typeof insertLessonRecommendationSchema>;

// Extended types for API responses
export type StudentWithScores = Student & {
  scores: (StudentScore & { assessment: Assessment; subject: Subject })[];
  overallPercentage: number;
  subjectAverages: { [key: string]: number };
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
