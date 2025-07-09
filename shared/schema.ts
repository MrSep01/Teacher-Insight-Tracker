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

// Enhanced assessments with Formative.com-inspired features
export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  subjectId: integer("subject_id").notNull(),
  moduleId: integer("module_id").references(() => modules.id), // Link to module
  classId: integer("class_id").references(() => classes.id), // Link to class
  // lessonId: integer("lesson_id").references(() => lessonPlans.id), // Link to lesson - removed to fix schema
  
  // Assessment metadata
  objectives: text("objectives").array(), // Learning objectives from module
  assessmentType: text("assessment_type").notNull().default("summative"), // formative, summative, diagnostic, practice
  difficulty: text("difficulty").default("intermediate"), // basic, intermediate, advanced, mixed
  totalPoints: integer("total_points").notNull(),
  estimatedDuration: integer("estimated_duration").default(60), // minutes
  
  // Instructions and feedback
  instructions: text("instructions"),
  feedbackType: varchar("feedback_type").default("immediate"), // immediate, delayed, manual
  allowRetakes: boolean("allow_retakes").default(false),
  showCorrectAnswers: boolean("show_correct_answers").default(true),
  
  // Grading and analytics
  markingScheme: text("marking_scheme"), // JSON string of marking criteria
  rubric: text("rubric"), // JSON string of detailed rubric
  passingScore: integer("passing_score").default(70), // Percentage
  
  // Additional fields from actual database
  topics: text("topics").array(), // Assessment topics
  questionTypes: text("question_types").array(), // Types of questions
  questionCount: integer("question_count").default(0), // Number of questions
  
  // AI and automation
  aiGenerated: boolean("ai_generated").default(false),
  // aiSuggestions: text("ai_suggestions"), // Not in current DB structure
  // autoGrading: boolean("auto_grading").default(true), // Not in current DB structure
  
  // Status and timing
  // status: varchar("status").default("draft"), // draft, published, archived - Not in current DB structure
  // publishedAt: timestamp("published_at"), // Not in current DB structure
  // dueDate: timestamp("due_date"), // Not in current DB structure
  
  // Missing date field from original schema
  date: timestamp("date").notNull().defaultNow(),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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
  topics: text("topics").array(), // Selected curriculum topics
  objectives: text("objectives").array(), // Selected learning objectives
  estimatedHours: integer("estimated_hours").default(0), // Estimated teaching hours
  classId: integer("class_id").references(() => classes.id), // Optional class association
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Enhanced lesson plans with industry-standard components
export const lessonPlans = pgTable("lesson_plans", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").references(() => modules.id),
  title: varchar("title").notNull(),
  description: text("description"),
  lessonType: varchar("lesson_type").notNull().default("lecture"), // "lecture", "practical", "project", "assessment", "discussion", "fieldwork"
  
  // Core lesson structure
  objectives: text("objectives").array(), // Selected from module objectives
  duration: integer("duration").default(45), // Duration in minutes
  difficulty: varchar("difficulty").default("intermediate"), // "basic", "intermediate", "advanced"
  targetStudents: text("target_students").array(), // student IDs or "all"
  prerequisites: text("prerequisites").array(), // Required prior knowledge
  
  // Lesson components based on best practices
  lessonStructure: text("lesson_structure"), // JSON: { starter: {}, main: {}, plenary: {} }
  activities: text("activities").array(), // Legacy support
  resources: text("resources").array(),
  equipment: text("equipment").array(), // For practical lessons
  safetyNotes: text("safety_notes"), // For practical/fieldwork lessons
  
  // Assessment integration
  hasAssessment: boolean("has_assessment").default(false),
  assessmentType: varchar("assessment_type"), // "formative" | "summative" 
  assessmentDescription: text("assessment_description"),
  assessmentDuration: integer("assessment_duration"), // in minutes
  assessmentPoints: integer("assessment_points"),
  assessmentCriteria: text("assessment_criteria").array(), // How success is measured
  rubric: text("rubric"), // JSON string of detailed rubric
  
  // Differentiation and adaptations
  differentiation: text("differentiation"), // How to adapt for different abilities
  homework: text("homework"), // Follow-up work
  
  // Metadata
  creationMethod: varchar("creation_method").default("manual"), // "manual", "ai", "template"
  templateId: integer("template_id"), // Reference to lesson template
  aiGenerated: boolean("ai_generated").default(false),
  aiSuggestions: text("ai_suggestions"),
  isCompleted: boolean("is_completed").default(false),
  sequenceOrder: integer("sequence_order").default(1), // Order within module
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Assessment questions with 20+ question types (Formative.com-inspired)
export const assessmentQuestions = pgTable("assessment_questions", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id").references(() => assessments.id).notNull(),
  questionNumber: integer("question_number").notNull(),
  questionType: varchar("question_type").notNull(), // multiple_choice, true_false, short_answer, essay, numeric, fill_blank, matching, drag_drop, show_work, drawing, etc.
  
  // Question content
  questionText: text("question_text").notNull(),
  questionHtml: text("question_html"), // Rich text formatting
  mediaUrl: text("media_url"), // Images, videos, audio
  
  // Answer configuration
  correctAnswer: text("correct_answer"),
  possibleAnswers: text("possible_answers").array(), // For multiple choice, matching, etc.
  answerExplanation: text("answer_explanation"),
  
  // Grading and feedback
  points: integer("points").default(1),
  allowPartialCredit: boolean("allow_partial_credit").default(false),
  hints: text("hints").array(), // AI-generated or manual hints
  
  // Advanced features
  timeLimit: integer("time_limit"), // seconds
  isRequired: boolean("is_required").default(true),
  randomizeOptions: boolean("randomize_options").default(false),
  
  // AI integration
  aiGenerated: boolean("ai_generated").default(false),
  aiPrompt: text("ai_prompt"), // Original prompt used to generate question
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Student responses to assessment questions
export const studentResponses = pgTable("student_responses", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  assessmentId: integer("assessment_id").references(() => assessments.id).notNull(),
  questionId: integer("question_id").references(() => assessmentQuestions.id).notNull(),
  
  // Response data
  response: text("response"), // Student's answer
  responseData: text("response_data"), // JSON for complex responses (drawings, drag-drop, etc.)
  isCorrect: boolean("is_correct"),
  pointsEarned: decimal("points_earned", { precision: 5, scale: 2 }).default("0"),
  
  // Timing and attempts
  timeSpent: integer("time_spent"), // seconds
  attemptNumber: integer("attempt_number").default(1),
  
  // Feedback and grading
  feedback: text("feedback"),
  teacherComment: text("teacher_comment"),
  autoGraded: boolean("auto_graded").default(true),
  
  submittedAt: timestamp("submitted_at").defaultNow(),
  gradedAt: timestamp("graded_at"),
});

// Lesson activity components (industry-standard)
export const lessonActivities = pgTable("lesson_activities", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessonPlans.id).notNull(),
  
  // Activity metadata
  title: varchar("title").notNull(),
  description: text("description"),
  activityType: varchar("activity_type").notNull(), // starter, main, plenary, homework, assessment
  componentType: varchar("component_type").notNull(), // teacher_led, student_led, group_work, individual_work, discussion, practical, etc.
  
  // Structure and timing
  duration: integer("duration").default(10), // minutes
  sequenceOrder: integer("sequence_order").notNull(),
  
  // Content and instructions
  instructions: text("instructions"),
  materials: text("materials").array(),
  resources: text("resources").array(),
  
  // Differentiation
  difficultyLevel: varchar("difficulty_level").default("mixed"), // basic, intermediate, advanced, mixed
  learningStyles: text("learning_styles").array(), // visual, auditory, kinesthetic, reading
  adaptations: text("adaptations"), // JSON with adaptations for different student needs
  
  // Assessment integration
  hasAssessment: boolean("has_assessment").default(false),
  assessmentCriteria: text("assessment_criteria").array(),
  successCriteria: text("success_criteria").array(),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Lesson templates for reusability
export const lessonTemplates = pgTable("lesson_templates", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  
  // Template metadata
  title: varchar("title").notNull(),
  description: text("description"),
  category: varchar("category").notNull(), // starter, main_lesson, practical, assessment, etc.
  subject: varchar("subject"),
  gradeLevel: varchar("grade_level"),
  
  // Template structure
  structure: text("structure"), // JSON with template structure
  activities: text("activities").array(),
  duration: integer("duration").default(45),
  
  // Sharing and access
  isPublic: boolean("is_public").default(false),
  useCount: integer("use_count").default(0),
  
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
  updatedAt: true,
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

// New schemas for enhanced lesson and assessment system
export const insertAssessmentQuestionSchema = createInsertSchema(assessmentQuestions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertStudentResponseSchema = createInsertSchema(studentResponses).omit({
  id: true,
  submittedAt: true,
});

export const insertLessonActivitySchema = createInsertSchema(lessonActivities).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLessonTemplateSchema = createInsertSchema(lessonTemplates).omit({
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

export type AssessmentQuestion = typeof assessmentQuestions.$inferSelect;
export type InsertAssessmentQuestion = z.infer<typeof insertAssessmentQuestionSchema>;

export type StudentResponse = typeof studentResponses.$inferSelect;
export type InsertStudentResponse = z.infer<typeof insertStudentResponseSchema>;

export type LessonActivity = typeof lessonActivities.$inferSelect;
export type InsertLessonActivity = z.infer<typeof insertLessonActivitySchema>;

export type LessonTemplate = typeof lessonTemplates.$inferSelect;
export type InsertLessonTemplate = z.infer<typeof insertLessonTemplateSchema>;
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
