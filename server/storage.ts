import { 
  User,
  InsertUser,
  Class,
  InsertClass,
  Student, 
  InsertStudent, 
  Subject, 
  InsertSubject, 
  Assessment, 
  InsertAssessment, 
  StudentScore, 
  InsertStudentScore, 
  Module,
  InsertModule,
  LessonPlan,
  InsertLessonPlan,
  LessonRecommendation, 
  InsertLessonRecommendation,
  StudentWithScores,
  AssessmentWithDetails,
  DashboardStats,
  users,
  classes,
  students,
  subjects,
  assessments,
  studentScores,
  modules,
  lessonPlans,
  lessonRecommendations,
  courseItems,
  courseModules,

} from "@shared/schema";

// Import additional table utilities
import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";

// Use Course types from Class (since courses table is classes)
type Course = Class;
type InsertCourse = InsertClass;

// CourseModule types
type CourseModule = typeof courseModules.$inferSelect;
type InsertCourseModule = typeof courseModules.$inferInsert;

// Use courses as classes since they're the same
const courses = classes;

import { db } from "./db";
import { eq, and, desc, gte } from "drizzle-orm";

export interface IStorage {
  // Users
  getUserById(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByVerificationToken(token: string): Promise<User | undefined>;
  getUserByResetToken(token: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;

  // Classes
  getClassesByTeacherId(teacherId: number): Promise<Class[]>;
  getClassById(id: number): Promise<Class | undefined>;
  createClass(cls: InsertClass): Promise<Class>;
  updateClass(id: number, cls: Partial<InsertClass>): Promise<Class | undefined>;
  deleteClass(id: number): Promise<boolean>;

  // Courses
  getCoursesByTeacherId(teacherId: number): Promise<Course[]>;
  getCourseById(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: number, course: Partial<InsertCourse>): Promise<Course | undefined>;
  deleteCourse(id: number): Promise<boolean>;

  // Course Modules
  getCourseModules(courseId: number): Promise<Module[]>;
  addModuleToCourse(courseModule: InsertCourseModule): Promise<CourseModule>;
  removeModuleFromCourse(courseId: number, moduleId: number): Promise<boolean>;
  reorderCourseModules(courseId: number, moduleOrder: number[]): Promise<void>;
  getAvailableModulesForCourse(courseId: number, teacherId: number): Promise<Module[]>;

  // Course Items (Unified Ribbon System)
  getCourseItems(courseId: number): Promise<Array<{
    id: number;
    itemType: 'lesson' | 'assessment';
    itemId: number;
    sequenceOrder: number;
    isVisible: boolean;
    data: LessonPlan | Assessment;
  }>>;
  addItemToCourse(courseId: number, moduleId: number, itemType: 'lesson' | 'assessment', itemId: number): Promise<void>;
  removeItemFromCourse(courseId: number, itemType: 'lesson' | 'assessment', itemId: number): Promise<boolean>;
  reorderCourseItems(courseId: number, itemUpdates: Array<{ id: number; sequenceOrder: number }>): Promise<void>;

  // Students
  getStudents(): Promise<Student[]>;
  getStudentById(id: number): Promise<Student | undefined>;
  getStudentWithScores(id: number): Promise<StudentWithScores | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  updateStudent(id: number, student: Partial<InsertStudent>): Promise<Student | undefined>;
  deleteStudent(id: number): Promise<boolean>;
  searchStudents(query: string): Promise<Student[]>;

  // Subjects
  getSubjects(): Promise<Subject[]>;
  getSubjectById(id: number): Promise<Subject | undefined>;
  createSubject(subject: InsertSubject): Promise<Subject>;

  // Assessments
  getAssessments(): Promise<Assessment[]>;
  getAssessmentById(id: number): Promise<Assessment | undefined>;
  getAssessmentWithDetails(id: number): Promise<AssessmentWithDetails | undefined>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  updateAssessment(id: number, assessment: Partial<InsertAssessment>): Promise<Assessment | undefined>;
  deleteAssessment(id: number): Promise<boolean>;
  getRecentAssessments(limit?: number): Promise<AssessmentWithDetails[]>;

  // Student Scores
  getStudentScores(): Promise<StudentScore[]>;
  getStudentScoresByStudentId(studentId: number): Promise<StudentScore[]>;
  getStudentScoresByAssessmentId(assessmentId: number): Promise<StudentScore[]>;
  createStudentScore(score: InsertStudentScore): Promise<StudentScore>;
  updateStudentScore(id: number, score: Partial<InsertStudentScore>): Promise<StudentScore | undefined>;
  deleteStudentScore(id: number): Promise<boolean>;

  // Modules
  getModulesByUserId(userId: number): Promise<Module[]>;
  getModuleById(id: number): Promise<Module | undefined>;
  createModule(module: InsertModule): Promise<Module>;
  updateModule(id: number, module: Partial<InsertModule>): Promise<Module | undefined>;
  deleteModule(id: number): Promise<boolean>;

  // Lesson Plans
  getLessonsByModule(moduleId: number): Promise<LessonPlan[]>;
  getLessonPlansByModuleId(moduleId: number): Promise<LessonPlan[]>;
  getLessonPlanById(id: number): Promise<LessonPlan | undefined>;
  getLessonById(id: number): Promise<LessonPlan | undefined>;
  createLessonPlan(lessonPlan: InsertLessonPlan): Promise<LessonPlan>;
  updateLessonPlan(id: number, lessonPlan: Partial<InsertLessonPlan>): Promise<LessonPlan | undefined>;
  updateLesson(id: number, lessonPlan: Partial<InsertLessonPlan>): Promise<LessonPlan | undefined>;
  deleteLessonPlan(id: number): Promise<boolean>;
  deleteLesson(id: number): Promise<boolean>;

  // Lesson Recommendations
  getLessonRecommendations(): Promise<LessonRecommendation[]>;
  getLessonRecommendationsByStudentId(studentId: number): Promise<LessonRecommendation[]>;
  createLessonRecommendation(recommendation: InsertLessonRecommendation): Promise<LessonRecommendation>;
  updateLessonRecommendation(id: number, recommendation: Partial<InsertLessonRecommendation>): Promise<LessonRecommendation | undefined>;
  deleteLessonRecommendation(id: number): Promise<boolean>;

  // Dashboard
  getDashboardStats(): Promise<DashboardStats>;
  getStudentsWithScores(): Promise<StudentWithScores[]>;

  // Library methods - fetch all resources by teacher
  getAllLessonsByTeacherId(teacherId: number): Promise<LessonPlan[]>;
  getAllModulesByTeacherId(teacherId: number): Promise<Module[]>;
  getAllAssessmentsByTeacherId(teacherId: number): Promise<Assessment[]>;
}

export class MemStorage implements IStorage {
  private students: Map<number, Student> = new Map();
  private subjects: Map<number, Subject> = new Map();
  private assessments: Map<number, Assessment> = new Map();
  private studentScores: Map<number, StudentScore> = new Map();
  private lessonRecommendations: Map<number, LessonRecommendation> = new Map();
  
  private currentStudentId = 1;
  private currentSubjectId = 1;
  private currentAssessmentId = 1;
  private currentStudentScoreId = 1;
  private currentLessonRecommendationId = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize subjects
    const subjects = [
      { name: "Mathematics", color: "#1976D2", icon: "fas fa-calculator" },
      { name: "Science", color: "#388E3C", icon: "fas fa-leaf" },
      { name: "English", color: "#FF9800", icon: "fas fa-book" },
      { name: "History", color: "#9C27B0", icon: "fas fa-landmark" },
    ];

    subjects.forEach(subject => {
      this.subjects.set(this.currentSubjectId, { ...subject, id: this.currentSubjectId });
      this.currentSubjectId++;
    });

    // Initialize students
    const students = [
      { name: "Alice Brown", grade: "Grade 5", studentId: "12345", status: "on_track" },
      { name: "Bobby Johnson", grade: "Grade 5", studentId: "12346", status: "needs_attention" },
      { name: "Carol Wilson", grade: "Grade 5", studentId: "12347", status: "excelling" },
      { name: "David Smith", grade: "Grade 5", studentId: "12348", status: "on_track" },
      { name: "Emma Davis", grade: "Grade 5", studentId: "12349", status: "on_track" },
    ];

    students.forEach(student => {
      this.students.set(this.currentStudentId, { ...student, id: this.currentStudentId });
      this.currentStudentId++;
    });

    // Initialize assessments
    const assessments = [
      { title: "Math Quiz Ch. 8", subjectId: 1, date: new Date("2024-03-15"), totalPoints: 100, description: "Chapter 8 mathematics quiz" },
      { title: "Science Project", subjectId: 2, date: new Date("2024-03-12"), totalPoints: 100, description: "Plant growth experiment" },
      { title: "Reading Comprehension", subjectId: 3, date: new Date("2024-03-10"), totalPoints: 100, description: "Short story analysis" },
    ];

    assessments.forEach(assessment => {
      this.assessments.set(this.currentAssessmentId, { ...assessment, id: this.currentAssessmentId, createdAt: new Date() });
      this.currentAssessmentId++;
    });

    // Initialize student scores
    const scores = [
      // Alice Brown (ID: 1)
      { studentId: 1, assessmentId: 1, score: 88, percentage: 88 },
      { studentId: 1, assessmentId: 2, score: 92, percentage: 92 },
      { studentId: 1, assessmentId: 3, score: 75, percentage: 75 },
      // Bobby Johnson (ID: 2)
      { studentId: 2, assessmentId: 1, score: 62, percentage: 62 },
      { studentId: 2, assessmentId: 2, score: 78, percentage: 78 },
      { studentId: 2, assessmentId: 3, score: 85, percentage: 85 },
      // Carol Wilson (ID: 3)
      { studentId: 3, assessmentId: 1, score: 95, percentage: 95 },
      { studentId: 3, assessmentId: 2, score: 89, percentage: 89 },
      { studentId: 3, assessmentId: 3, score: 91, percentage: 91 },
    ];

    scores.forEach(score => {
      this.studentScores.set(this.currentStudentScoreId, { 
        ...score, 
        id: this.currentStudentScoreId, 
        createdAt: new Date(),
        score: score.score.toString(),
        percentage: score.percentage.toString(),
        notes: null
      });
      this.currentStudentScoreId++;
    });
  }

  // Students
  async getStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }

  async getStudentById(id: number): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async getStudentWithScores(id: number): Promise<StudentWithScores | undefined> {
    const student = this.students.get(id);
    if (!student) return undefined;

    const scores = Array.from(this.studentScores.values())
      .filter(score => score.studentId === id)
      .map(score => {
        const assessment = this.assessments.get(score.assessmentId)!;
        const subject = this.subjects.get(assessment.subjectId)!;
        return { ...score, assessment, subject };
      });

    const overallPercentage = scores.length > 0 
      ? scores.reduce((sum, score) => sum + Number(score.percentage), 0) / scores.length
      : 0;

    const subjectAverages: { [key: string]: number } = {};
    const subjectScores: { [key: string]: number[] } = {};

    scores.forEach(score => {
      const subjectName = score.subject.name;
      if (!subjectScores[subjectName]) {
        subjectScores[subjectName] = [];
      }
      subjectScores[subjectName].push(Number(score.percentage));
    });

    Object.entries(subjectScores).forEach(([subject, percentages]) => {
      subjectAverages[subject] = percentages.reduce((sum, p) => sum + p, 0) / percentages.length;
    });

    return { ...student, scores, overallPercentage, subjectAverages };
  }

  async createStudent(student: InsertStudent): Promise<Student> {
    const id = this.currentStudentId++;
    const newStudent = { ...student, id, status: student.status || "on_track" };
    this.students.set(id, newStudent);
    return newStudent;
  }

  async updateStudent(id: number, student: Partial<InsertStudent>): Promise<Student | undefined> {
    const existing = this.students.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...student };
    this.students.set(id, updated);
    return updated;
  }

  async deleteStudent(id: number): Promise<boolean> {
    return this.students.delete(id);
  }

  async searchStudents(query: string): Promise<Student[]> {
    const students = Array.from(this.students.values());
    return students.filter(student => 
      student.name.toLowerCase().includes(query.toLowerCase()) ||
      student.studentId.includes(query)
    );
  }

  // Subjects
  async getSubjects(): Promise<Subject[]> {
    return Array.from(this.subjects.values());
  }

  async getSubjectById(id: number): Promise<Subject | undefined> {
    return this.subjects.get(id);
  }

  async createSubject(subject: InsertSubject): Promise<Subject> {
    const id = this.currentSubjectId++;
    const newSubject = { ...subject, id };
    this.subjects.set(id, newSubject);
    return newSubject;
  }

  // Assessments
  async getAssessments(): Promise<Assessment[]> {
    return Array.from(this.assessments.values());
  }

  async getAssessmentById(id: number): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }

  async getAssessmentWithDetails(id: number): Promise<AssessmentWithDetails | undefined> {
    const assessment = this.assessments.get(id);
    if (!assessment) return undefined;

    const subject = this.subjects.get(assessment.subjectId)!;
    const scores = Array.from(this.studentScores.values())
      .filter(score => score.assessmentId === id)
      .map(score => {
        const student = this.students.get(score.studentId)!;
        return { ...score, student };
      });

    const averageScore = scores.length > 0 
      ? scores.reduce((sum, score) => sum + Number(score.percentage), 0) / scores.length
      : 0;

    return { ...assessment, subject, averageScore, studentCount: scores.length, scores };
  }

  async createAssessment(assessment: InsertAssessment): Promise<Assessment> {
    const id = this.currentAssessmentId++;
    const newAssessment = { 
      ...assessment, 
      id, 
      createdAt: new Date(),
      description: assessment.description || null
    };
    this.assessments.set(id, newAssessment);
    return newAssessment;
  }

  async updateAssessment(id: number, assessment: Partial<InsertAssessment>): Promise<Assessment | undefined> {
    const existing = this.assessments.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...assessment };
    this.assessments.set(id, updated);
    return updated;
  }

  async deleteAssessment(id: number): Promise<boolean> {
    return this.assessments.delete(id);
  }

  async getRecentAssessments(limit = 5): Promise<AssessmentWithDetails[]> {
    const assessments = Array.from(this.assessments.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);

    const assessmentsWithDetails = await Promise.all(
      assessments.map(async (assessment) => {
        const details = await this.getAssessmentWithDetails(assessment.id);
        return details!;
      })
    );

    return assessmentsWithDetails;
  }

  // Student Scores
  async getStudentScores(): Promise<StudentScore[]> {
    return Array.from(this.studentScores.values());
  }

  async getStudentScoresByStudentId(studentId: number): Promise<StudentScore[]> {
    return Array.from(this.studentScores.values()).filter(score => score.studentId === studentId);
  }

  async getStudentScoresByAssessmentId(assessmentId: number): Promise<StudentScore[]> {
    return Array.from(this.studentScores.values()).filter(score => score.assessmentId === assessmentId);
  }

  async createStudentScore(score: InsertStudentScore): Promise<StudentScore> {
    const id = this.currentStudentScoreId++;
    const newScore = { 
      ...score, 
      id, 
      createdAt: new Date(),
      notes: score.notes || null
    };
    this.studentScores.set(id, newScore);
    return newScore;
  }

  async updateStudentScore(id: number, score: Partial<InsertStudentScore>): Promise<StudentScore | undefined> {
    const existing = this.studentScores.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...score };
    this.studentScores.set(id, updated);
    return updated;
  }

  async deleteStudentScore(id: number): Promise<boolean> {
    return this.studentScores.delete(id);
  }

  // Lesson Recommendations
  async getLessonRecommendations(): Promise<LessonRecommendation[]> {
    return Array.from(this.lessonRecommendations.values());
  }

  async getLessonRecommendationsByStudentId(studentId: number): Promise<LessonRecommendation[]> {
    return Array.from(this.lessonRecommendations.values())
      .filter(rec => rec.studentId === studentId && rec.isActive);
  }

  async createLessonRecommendation(recommendation: InsertLessonRecommendation): Promise<LessonRecommendation> {
    const id = this.currentLessonRecommendationId++;
    const newRecommendation = { 
      ...recommendation, 
      id, 
      createdAt: new Date(),
      priority: recommendation.priority || "medium",
      isActive: recommendation.isActive ?? true
    };
    this.lessonRecommendations.set(id, newRecommendation);
    return newRecommendation;
  }

  async updateLessonRecommendation(id: number, recommendation: Partial<InsertLessonRecommendation>): Promise<LessonRecommendation | undefined> {
    const existing = this.lessonRecommendations.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...recommendation };
    this.lessonRecommendations.set(id, updated);
    return updated;
  }

  async deleteLessonRecommendation(id: number): Promise<boolean> {
    return this.lessonRecommendations.delete(id);
  }

  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    const studentsWithScores = await this.getStudentsWithScores();
    const totalStudents = studentsWithScores.length;
    const needsAttention = studentsWithScores.filter(s => s.status === "needs_attention" || s.status === "at_risk").length;
    
    const allScores = Array.from(this.studentScores.values());
    const averageScore = allScores.length > 0 
      ? allScores.reduce((sum, score) => sum + Number(score.percentage), 0) / allScores.length
      : 0;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const assessmentsThisWeek = Array.from(this.assessments.values())
      .filter(assessment => new Date(assessment.date) >= oneWeekAgo).length;

    return {
      totalStudents,
      averageScore: Math.round(averageScore),
      needsAttention,
      assessmentsThisWeek,
    };
  }

  async getStudentsWithScores(): Promise<StudentWithScores[]> {
    const students = Array.from(this.students.values());
    const studentsWithScores = await Promise.all(
      students.map(async (student) => {
        const studentWithScores = await this.getStudentWithScores(student.id);
        return studentWithScores!;
      })
    );
    return studentsWithScores;
  }
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUserById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.emailVerificationToken, token));
    return user;
  }

  async getUserByResetToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users)
      .where(eq(users.resetPasswordToken, token));
    
    if (user && user.resetPasswordExpires && user.resetPasswordExpires > new Date()) {
      return user;
    }
    return undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined> {
    // Handle array fields properly for PostgreSQL
    const updateData = { ...user, updatedAt: new Date() };
    
    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  // Class methods
  async getClassesByTeacherId(teacherId: number): Promise<Class[]> {
    return await db.select().from(classes).where(eq(classes.teacherId, teacherId));
  }

  async getClassById(id: number): Promise<Class | undefined> {
    const [cls] = await db.select().from(classes).where(eq(classes.id, id));
    return cls;
  }

  async createClass(cls: InsertClass): Promise<Class> {
    const [newClass] = await db.insert(classes).values(cls).returning();
    return newClass;
  }

  async updateClass(id: number, cls: Partial<InsertClass>): Promise<Class | undefined> {
    const [updatedClass] = await db.update(classes).set(cls).where(eq(classes.id, id)).returning();
    return updatedClass;
  }

  async deleteClass(id: number): Promise<boolean> {
    const result = await db.delete(classes).where(eq(classes.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Course methods
  async getCoursesByTeacherId(teacherId: number): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.teacherId, teacherId));
  }

  async getCourseById(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db.insert(courses).values(course).returning();
    return newCourse;
  }

  async updateCourse(id: number, course: Partial<InsertCourse>): Promise<Course | undefined> {
    const [updatedCourse] = await db.update(courses).set(course).where(eq(courses.id, id)).returning();
    return updatedCourse;
  }

  async deleteCourse(id: number): Promise<boolean> {
    const result = await db.delete(courses).where(eq(courses.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getStudents(): Promise<Student[]> {
    return await db.select().from(students);
  }

  async getStudentById(id: number): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.id, id));
    return student || undefined;
  }

  async getStudentWithScores(id: number): Promise<StudentWithScores | undefined> {
    const student = await this.getStudentById(id);
    if (!student) return undefined;

    const scores = await db
      .select({
        id: studentScores.id,
        studentId: studentScores.studentId,
        assessmentId: studentScores.assessmentId,
        score: studentScores.score,
        percentage: studentScores.percentage,
        notes: studentScores.notes,
        createdAt: studentScores.createdAt,
        assessment: {
          id: assessments.id,
          title: assessments.title,
          subjectId: assessments.subjectId,
          date: assessments.date,
          totalPoints: assessments.totalPoints,
          description: assessments.description,
          createdAt: assessments.createdAt,
        },
        subject: {
          id: subjects.id,
          name: subjects.name,
          color: subjects.color,
          icon: subjects.icon,
        },
      })
      .from(studentScores)
      .innerJoin(assessments, eq(studentScores.assessmentId, assessments.id))
      .innerJoin(subjects, eq(assessments.subjectId, subjects.id))
      .where(eq(studentScores.studentId, id));

    const overallPercentage = scores.length > 0 
      ? scores.reduce((sum, score) => sum + Number(score.percentage), 0) / scores.length
      : 0;

    const subjectAverages: { [key: string]: number } = {};
    const subjectScores: { [key: string]: number[] } = {};

    scores.forEach(score => {
      const subjectName = score.subject.name;
      if (!subjectScores[subjectName]) {
        subjectScores[subjectName] = [];
      }
      subjectScores[subjectName].push(Number(score.percentage));
    });

    Object.entries(subjectScores).forEach(([subject, percentages]) => {
      subjectAverages[subject] = percentages.reduce((sum, p) => sum + p, 0) / percentages.length;
    });

    // Calculate status based on overall percentage
    let status: "on_track" | "needs_attention" | "excelling" | "at_risk";
    if (overallPercentage >= 90) {
      status = "excelling";
    } else if (overallPercentage >= 70) {
      status = "on_track";
    } else if (overallPercentage >= 50) {
      status = "needs_attention";
    } else {
      status = "at_risk";
    }

    return { 
      ...student, 
      scores: scores.map(s => ({
        ...s,
        assessment: s.assessment,
        subject: s.subject
      })), 
      overallPercentage, 
      subjectAverages,
      status
    };
  }

  async createStudent(student: InsertStudent): Promise<Student> {
    const [newStudent] = await db
      .insert(students)
      .values(student)
      .returning();
    return newStudent;
  }

  async updateStudent(id: number, student: Partial<InsertStudent>): Promise<Student | undefined> {
    const [updated] = await db
      .update(students)
      .set(student)
      .where(eq(students.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteStudent(id: number): Promise<boolean> {
    const result = await db.delete(students).where(eq(students.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async searchStudents(query: string): Promise<Student[]> {
    const allStudents = await db.select().from(students);
    return allStudents.filter(student => 
      student.name.toLowerCase().includes(query.toLowerCase()) ||
      student.studentId.includes(query)
    );
  }

  async getSubjects(): Promise<Subject[]> {
    return await db.select().from(subjects);
  }

  async getSubjectById(id: number): Promise<Subject | undefined> {
    const [subject] = await db.select().from(subjects).where(eq(subjects.id, id));
    return subject || undefined;
  }

  async createSubject(subject: InsertSubject): Promise<Subject> {
    const [newSubject] = await db
      .insert(subjects)
      .values(subject)
      .returning();
    return newSubject;
  }

  async getAssessments(): Promise<Assessment[]> {
    return await db.select().from(assessments);
  }

  async getAssessmentsByModuleId(moduleId: number): Promise<Assessment[]> {
    return await db.select().from(assessments).where(eq(assessments.moduleId, moduleId));
  }

  async getAssessmentById(id: number): Promise<Assessment | undefined> {
    const [assessment] = await db.select().from(assessments).where(eq(assessments.id, id));
    return assessment || undefined;
  }

  async getAssessmentWithDetails(id: number): Promise<AssessmentWithDetails | undefined> {
    const assessment = await this.getAssessmentById(id);
    if (!assessment) return undefined;

    const subject = await this.getSubjectById(assessment.subjectId);
    if (!subject) return undefined;

    const scores = await db
      .select({
        id: studentScores.id,
        studentId: studentScores.studentId,
        assessmentId: studentScores.assessmentId,
        score: studentScores.score,
        percentage: studentScores.percentage,
        notes: studentScores.notes,
        createdAt: studentScores.createdAt,
        student: {
          id: students.id,
          name: students.name,
          grade: students.grade,
          studentId: students.studentId,
          status: students.status,
        },
      })
      .from(studentScores)
      .innerJoin(students, eq(studentScores.studentId, students.id))
      .where(eq(studentScores.assessmentId, id));

    const averageScore = scores.length > 0 
      ? scores.reduce((sum, score) => sum + Number(score.percentage), 0) / scores.length
      : 0;

    return { 
      ...assessment, 
      subject, 
      averageScore, 
      studentCount: scores.length, 
      scores: scores.map(s => ({
        ...s,
        student: s.student
      }))
    };
  }

  async createAssessment(assessment: InsertAssessment): Promise<Assessment> {
    const [newAssessment] = await db
      .insert(assessments)
      .values(assessment)
      .returning();
    return newAssessment;
  }

  async updateAssessment(id: number, assessment: Partial<InsertAssessment>): Promise<Assessment | undefined> {
    const [updated] = await db
      .update(assessments)
      .set(assessment)
      .where(eq(assessments.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteAssessment(id: number): Promise<boolean> {
    const result = await db.delete(assessments).where(eq(assessments.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getRecentAssessments(limit = 5): Promise<AssessmentWithDetails[]> {
    try {
      const recentAssessments = await db
        .select({
          id: assessments.id,
          title: assessments.title,
          description: assessments.description,
          subjectId: assessments.subjectId,
          moduleId: assessments.moduleId,
          classId: assessments.classId,
          topics: assessments.topics,
          objectives: assessments.objectives,
          assessmentType: assessments.assessmentType,
          difficulty: assessments.difficulty,
          questionTypes: assessments.questionTypes,
          totalPoints: assessments.totalPoints,
          estimatedDuration: assessments.estimatedDuration,
          instructions: assessments.instructions,
          markingScheme: assessments.markingScheme,
          aiGenerated: assessments.aiGenerated,
          date: assessments.date,
          createdAt: assessments.createdAt,
          updatedAt: assessments.updatedAt,
          subject: {
            id: subjects.id,
            name: subjects.name,
            topicArea: subjects.topicArea,
            grade: subjects.grade,
            level: subjects.level,
            curriculum: subjects.curriculum,
            color: subjects.color,
            icon: subjects.icon,
          }
        })
        .from(assessments)
        .leftJoin(subjects, eq(assessments.subjectId, subjects.id))
        .orderBy(desc(assessments.date))
        .limit(limit);

      return recentAssessments.map(assessment => ({
        ...assessment,
        studentCount: 0 // This would need to be calculated from scores
      }));
    } catch (error) {
      console.error("Error fetching recent assessments:", error);
      return [];
    }
  }

  async getStudentScores(): Promise<StudentScore[]> {
    return await db.select().from(studentScores);
  }

  async getStudentScoresByStudentId(studentId: number): Promise<StudentScore[]> {
    return await db.select().from(studentScores).where(eq(studentScores.studentId, studentId));
  }

  async getStudentScoresByAssessmentId(assessmentId: number): Promise<StudentScore[]> {
    return await db.select().from(studentScores).where(eq(studentScores.assessmentId, assessmentId));
  }

  async createStudentScore(score: InsertStudentScore): Promise<StudentScore> {
    const [newScore] = await db
      .insert(studentScores)
      .values(score)
      .returning();
    return newScore;
  }

  async updateStudentScore(id: number, score: Partial<InsertStudentScore>): Promise<StudentScore | undefined> {
    const [updated] = await db
      .update(studentScores)
      .set(score)
      .where(eq(studentScores.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteStudentScore(id: number): Promise<boolean> {
    const result = await db.delete(studentScores).where(eq(studentScores.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getLessonRecommendations(): Promise<LessonRecommendation[]> {
    return await db.select().from(lessonRecommendations);
  }

  async getLessonRecommendationsByStudentId(studentId: number): Promise<LessonRecommendation[]> {
    return await db
      .select()
      .from(lessonRecommendations)
      .where(and(
        eq(lessonRecommendations.studentId, studentId),
        eq(lessonRecommendations.isActive, true)
      ));
  }

  async createLessonRecommendation(recommendation: InsertLessonRecommendation): Promise<LessonRecommendation> {
    const [newRecommendation] = await db
      .insert(lessonRecommendations)
      .values(recommendation)
      .returning();
    return newRecommendation;
  }

  async updateLessonRecommendation(id: number, recommendation: Partial<InsertLessonRecommendation>): Promise<LessonRecommendation | undefined> {
    const [updated] = await db
      .update(lessonRecommendations)
      .set(recommendation)
      .where(eq(lessonRecommendations.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteLessonRecommendation(id: number): Promise<boolean> {
    const result = await db.delete(lessonRecommendations).where(eq(lessonRecommendations.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Modules implementation for DatabaseStorage
  async getModulesByUserId(userId: number): Promise<Module[]> {
    return await db.select().from(modules).where(eq(modules.userId, userId));
  }

  async getModuleById(id: number): Promise<Module | undefined> {
    const [module] = await db.select().from(modules).where(eq(modules.id, id));
    return module;
  }

  async createModule(module: InsertModule): Promise<Module> {
    const [newModule] = await db.insert(modules).values(module).returning();
    return newModule;
  }

  async updateModule(id: number, module: Partial<InsertModule>): Promise<Module | undefined> {
    const [updatedModule] = await db
      .update(modules)
      .set(module)
      .where(eq(modules.id, id))
      .returning();
    return updatedModule;
  }

  async deleteModule(id: number): Promise<boolean> {
    // First, remove the module from all courses (delete course_modules entries)
    await db.delete(courseModules).where(eq(courseModules.moduleId, id));
    
    // Then, delete all lesson plans associated with this module
    await db.delete(lessonPlans).where(eq(lessonPlans.moduleId, id));
    
    // Finally, delete the module itself
    const result = await db.delete(modules).where(eq(modules.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Lesson Plans implementation for DatabaseStorage
  async getLessonPlansByModuleId(moduleId: number): Promise<LessonPlan[]> {
    return await db.select().from(lessonPlans).where(eq(lessonPlans.moduleId, moduleId));
  }

  async getLessonPlanById(id: number): Promise<LessonPlan | undefined> {
    const [lessonPlan] = await db.select().from(lessonPlans).where(eq(lessonPlans.id, id));
    return lessonPlan;
  }

  async createLessonPlan(lessonPlan: InsertLessonPlan): Promise<LessonPlan> {
    const [newLessonPlan] = await db.insert(lessonPlans).values(lessonPlan).returning();
    return newLessonPlan;
  }

  async updateLessonPlan(id: number, lessonPlan: Partial<InsertLessonPlan>): Promise<LessonPlan | undefined> {
    const [updatedLessonPlan] = await db
      .update(lessonPlans)
      .set(lessonPlan)
      .where(eq(lessonPlans.id, id))
      .returning();
    return updatedLessonPlan;
  }

  async deleteLessonPlan(id: number): Promise<boolean> {
    const result = await db.delete(lessonPlans).where(eq(lessonPlans.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getAllLessons(): Promise<LessonPlan[]> {
    return await db.select().from(lessonPlans);
  }

  async getLessonsByModule(moduleId: number): Promise<LessonPlan[]> {
    return await db.select().from(lessonPlans).where(eq(lessonPlans.moduleId, moduleId));
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const allStudents = await db.select().from(students);
    const totalStudents = allStudents.length;
    const needsAttention = allStudents.filter(s => s.status === "needs_attention").length;
    
    const allScores = await db.select().from(studentScores);
    const averageScore = allScores.length > 0 
      ? allScores.reduce((sum, score) => sum + Number(score.percentage), 0) / allScores.length
      : 0;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const recentAssessments = await db
      .select()
      .from(assessments)
      .where(gte(assessments.date, oneWeekAgo));

    return {
      totalStudents,
      averageScore: Math.round(averageScore),
      needsAttention,
      assessmentsThisWeek: recentAssessments.length,
    };
  }

  async getStudentsWithScores(): Promise<StudentWithScores[]> {
    const allStudents = await db.select().from(students);
    const studentsWithScores = await Promise.all(
      allStudents.map(async (student) => {
        const studentWithScores = await this.getStudentWithScores(student.id);
        return studentWithScores!;
      })
    );
    return studentsWithScores;
  }

  // Course module management implementation
  async getCourseModules(courseId: number): Promise<Module[]> {
    const courseModuleRecords = await db
      .select({
        module: modules,
        courseModule: courseModules
      })
      .from(courseModules)
      .innerJoin(modules, eq(courseModules.moduleId, modules.id))
      .where(eq(courseModules.courseId, courseId))
      .orderBy(courseModules.sequenceOrder);
    
    return courseModuleRecords.map(record => record.module);
  }

  async addModuleToCourse(courseModule: InsertCourseModule): Promise<CourseModule> {
    const [newCourseModule] = await db
      .insert(courseModules)
      .values(courseModule)
      .returning();
    return newCourseModule;
  }

  async removeModuleFromCourse(courseId: number, moduleId: number): Promise<boolean> {
    const result = await db
      .delete(courseModules)
      .where(and(
        eq(courseModules.courseId, courseId),
        eq(courseModules.moduleId, moduleId)
      ));
    return (result.rowCount ?? 0) > 0;
  }

  async reorderCourseModules(courseId: number, moduleOrder: number[]): Promise<void> {
    // Update sequence order for each module
    for (let i = 0; i < moduleOrder.length; i++) {
      await db
        .update(courseModules)
        .set({ sequenceOrder: i + 1 })
        .where(
          and(
            eq(courseModules.courseId, courseId),
            eq(courseModules.moduleId, moduleOrder[i])
          )
        );
    }
  }

  async getAvailableModulesForCourse(courseId: number, teacherId: number): Promise<Module[]> {
    // Get all modules created by the teacher
    const allTeacherModules = await db
      .select()
      .from(modules)
      .where(eq(modules.userId, teacherId));

    // Get modules already assigned to this course
    const assignedModuleIds = await db
      .select({ moduleId: courseModules.moduleId })
      .from(courseModules)
      .where(eq(courseModules.courseId, courseId));

    const assignedIds = assignedModuleIds.map(record => record.moduleId);
    
    // Filter out already assigned modules
    return allTeacherModules.filter(module => !assignedIds.includes(module.id));
  }

  // Course Items (Unified Ribbon System) implementation
  async getCourseItems(courseId: number): Promise<Array<{
    id: number;
    itemType: 'lesson' | 'assessment';
    itemId: number;
    sequenceOrder: number;
    isVisible: boolean;
    data: LessonPlan | Assessment;
  }>> {
    const items = await db
      .select()
      .from(courseItems)
      .where(eq(courseItems.courseId, courseId))
      .orderBy(courseItems.sequenceOrder);

    const result = [];
    for (const item of items) {
      let data;
      if (item.itemType === 'lesson') {
        data = await this.getLessonPlanById(item.itemId);
      } else if (item.itemType === 'assessment') {
        data = await this.getAssessmentById(item.itemId);
      }
      
      if (data) {
        result.push({
          id: item.id,
          itemType: item.itemType as 'lesson' | 'assessment',
          itemId: item.itemId,
          sequenceOrder: item.sequenceOrder,
          isVisible: item.isVisible,
          data
        });
      }
    }
    
    return result;
  }

  async addItemToCourse(courseId: number, moduleId: number, itemType: 'lesson' | 'assessment', itemId: number): Promise<void> {
    // Get the next sequence order
    const existingItems = await db
      .select({ sequenceOrder: courseItems.sequenceOrder })
      .from(courseItems)
      .where(eq(courseItems.courseId, courseId))
      .orderBy(courseItems.sequenceOrder);
    
    const nextSequenceOrder = existingItems.length > 0 
      ? Math.max(...existingItems.map(item => item.sequenceOrder)) + 1 
      : 1;

    await db.insert(courseItems).values({
      courseId,
      moduleId,
      itemType,
      itemId,
      sequenceOrder: nextSequenceOrder
    });
  }

  async removeItemFromCourse(courseId: number, itemType: 'lesson' | 'assessment', itemId: number): Promise<boolean> {
    const result = await db
      .delete(courseItems)
      .where(and(
        eq(courseItems.courseId, courseId),
        eq(courseItems.itemType, itemType),
        eq(courseItems.itemId, itemId)
      ));
    return (result.rowCount ?? 0) > 0;
  }

  async reorderCourseItems(courseId: number, itemUpdates: Array<{ id: number; sequenceOrder: number }>): Promise<void> {
    for (const update of itemUpdates) {
      await db
        .update(courseItems)
        .set({ sequenceOrder: update.sequenceOrder })
        .where(and(
          eq(courseItems.id, update.id),
          eq(courseItems.courseId, courseId)
        ));
    }
  }

  // Library methods - fetch all resources by teacher
  async getAllLessonsByTeacherId(teacherId: number): Promise<LessonPlan[]> {
    // Get all modules created by the teacher, then get all lessons from those modules
    const teacherModules = await db
      .select({ id: modules.id })
      .from(modules)
      .where(eq(modules.userId, teacherId));

    if (teacherModules.length === 0) {
      return [];
    }

    const moduleIds = teacherModules.map(m => m.id);
    
    // Get all lesson plans from teacher's modules with additional context
    const lessonsWithContext = await db
      .select({
        id: lessonPlans.id,
        moduleId: lessonPlans.moduleId,
        title: lessonPlans.title,
        description: lessonPlans.description,
        lessonType: lessonPlans.lessonType,
        duration: lessonPlans.duration,
        difficulty: lessonPlans.difficulty,
        objectives: lessonPlans.objectives,
        activities: lessonPlans.activities,
        resources: lessonPlans.resources,
        equipment: lessonPlans.equipment,
        safetyNotes: lessonPlans.safetyNotes,
        aiGenerated: lessonPlans.aiGenerated,
        createdAt: lessonPlans.createdAt,
        // Additional context from module
        moduleName: modules.title,
        // Get course info through course-module relationship
        courseName: courses.name,
        grade: courses.grade,
        level: courses.level,
      })
      .from(lessonPlans)
      .leftJoin(modules, eq(lessonPlans.moduleId, modules.id))
      .leftJoin(courseModules, eq(modules.id, courseModules.moduleId))
      .leftJoin(courses, eq(courseModules.courseId, courses.id))
      .where(eq(modules.userId, teacherId))
      .orderBy(lessonPlans.createdAt);

    return lessonsWithContext;
  }

  async getAllModulesByTeacherId(teacherId: number): Promise<Module[]> {
    // Get all modules created by the teacher with additional context
    const modulesWithContext = await db
      .select({
        id: modules.id,
        userId: modules.userId,
        title: modules.title,
        description: modules.description,
        curriculumTopic: modules.curriculumTopic,
        gradeLevels: modules.gradeLevels,
        topics: modules.topics,
        objectives: modules.objectives,
        estimatedHours: modules.estimatedHours,
        createdAt: modules.createdAt,
        // Additional context from course
        courseName: courses.name,
        grade: courses.grade,
        level: courses.level,
      })
      .from(modules)
      .leftJoin(courseModules, eq(modules.id, courseModules.moduleId))
      .leftJoin(courses, eq(courseModules.courseId, courses.id))
      .where(eq(modules.userId, teacherId))
      .orderBy(modules.createdAt);

    return modulesWithContext;
  }

  async getAllAssessmentsByTeacherId(teacherId: number): Promise<Assessment[]> {
    try {
      // Simplified query to avoid null issues - just get assessments for modules owned by teacher
      const assessmentsForTeacher = await db
        .select({
          id: assessments.id,
          title: assessments.title,
          description: assessments.description,
          assessmentType: assessments.assessmentType,
          difficulty: assessments.difficulty,
          totalPoints: assessments.totalPoints,
          estimatedDuration: assessments.estimatedDuration,
          createdAt: assessments.createdAt,
          moduleId: assessments.moduleId,
          questions: assessments.questions,
          markingScheme: assessments.markingScheme,
          objectives: assessments.objectives,
        })
        .from(assessments)
        .innerJoin(modules, eq(assessments.moduleId, modules.id))
        .where(eq(modules.userId, teacherId))
        .orderBy(desc(assessments.createdAt));

      return assessmentsForTeacher;
    } catch (error) {
      console.error('Error fetching assessments by teacher ID:', error);
      return [];
    }
  }

  // Additional lesson methods for individual lesson access
  async getLessonById(id: number): Promise<LessonPlan | undefined> {
    return this.getLessonPlanById(id);
  }

  async updateLesson(id: number, lessonPlan: Partial<InsertLessonPlan>): Promise<LessonPlan | undefined> {
    return this.updateLessonPlan(id, lessonPlan);
  }

  async deleteLesson(id: number): Promise<boolean> {
    return this.deleteLessonPlan(id);
  }
}

export const storage = new DatabaseStorage();
