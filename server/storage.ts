import { 
  Student, 
  InsertStudent, 
  Subject, 
  InsertSubject, 
  Assessment, 
  InsertAssessment, 
  StudentScore, 
  InsertStudentScore, 
  LessonRecommendation, 
  InsertLessonRecommendation,
  StudentWithScores,
  AssessmentWithDetails,
  DashboardStats
} from "@shared/schema";

export interface IStorage {
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

  // Lesson Recommendations
  getLessonRecommendations(): Promise<LessonRecommendation[]>;
  getLessonRecommendationsByStudentId(studentId: number): Promise<LessonRecommendation[]>;
  createLessonRecommendation(recommendation: InsertLessonRecommendation): Promise<LessonRecommendation>;
  updateLessonRecommendation(id: number, recommendation: Partial<InsertLessonRecommendation>): Promise<LessonRecommendation | undefined>;
  deleteLessonRecommendation(id: number): Promise<boolean>;

  // Dashboard
  getDashboardStats(): Promise<DashboardStats>;
  getStudentsWithScores(): Promise<StudentWithScores[]>;
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
    const students = Array.from(this.students.values());
    const totalStudents = students.length;
    const needsAttention = students.filter(s => s.status === "needs_attention").length;
    
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

export const storage = new MemStorage();
