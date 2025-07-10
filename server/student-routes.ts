import { Router } from "express";
import { db } from "./db";
import { users, classes, enrollments, modules, lessonPlans, assessments, studentProgress, studentScores } from "@shared/schema";
import { eq, and, desc, asc } from "drizzle-orm";

const router = Router();

// Get student dashboard data
router.get("/dashboard", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Get user's role
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user[0] || user[0].role !== "student") {
      return res.status(403).json({ error: "Access denied - Students only" });
    }

    // Get student's enrolled classes
    const studentClasses = await db
      .select({
        id: classes.id,
        name: classes.name,
        grade: classes.grade,
        level: classes.level,
        curriculum: classes.curriculum,
        teacherId: classes.teacherId,
      })
      .from(classes)
      .innerJoin(enrollments, eq(classes.id, enrollments.classId))
      .where(and(eq(enrollments.studentId, userId), eq(enrollments.status, "active")));

    // Get teacher details for each class
    const classesWithTeachers = await Promise.all(
      studentClasses.map(async (cls) => {
        const teacher = await db
          .select({
            firstName: users.firstName,
            lastName: users.lastName,
          })
          .from(users)
          .where(eq(users.id, cls.teacherId))
          .limit(1);

        // Get class modules and progress
        const classModules = await db
          .select({
            id: modules.id,
            title: modules.title,
            estimatedHours: modules.estimatedHours,
            sequenceOrder: modules.sequenceOrder,
          })
          .from(modules)
          .where(eq(modules.classId, cls.id))
          .orderBy(asc(modules.sequenceOrder));

        // Get student progress for this class
        const progressData = await db
          .select({
            moduleId: studentProgress.moduleId,
            progressPercentage: studentProgress.progressPercentage,
            completedLessons: studentProgress.completedLessons,
            totalLessons: studentProgress.totalLessons,
          })
          .from(studentProgress)
          .where(
            and(
              eq(studentProgress.studentId, userId),
              eq(studentProgress.classId, cls.id)
            )
          );

        const progressMap = new Map(
          progressData.map(p => [p.moduleId, p])
        );

        // Calculate overall progress
        const totalModules = classModules.length;
        const completedModules = progressData.filter(p => p.progressPercentage === 100).length;
        
        // Find current module (first incomplete module)
        const currentModule = classModules.find(m => {
          const progress = progressMap.get(m.id);
          return !progress || progress.progressPercentage < 100;
        });

        const currentModuleProgress = currentModule ? progressMap.get(currentModule.id) : null;

        return {
          id: cls.id,
          name: cls.name,
          grade: cls.grade,
          level: cls.level,
          curriculum: cls.curriculum,
          teacher: teacher[0] || { firstName: "Unknown", lastName: "Teacher" },
          progress: {
            totalModules,
            completedModules,
            currentModule: currentModule ? {
              id: currentModule.id,
              title: currentModule.title,
              totalLessons: currentModuleProgress?.totalLessons || 0,
              completedLessons: currentModuleProgress?.completedLessons || 0,
              progressPercentage: currentModuleProgress?.progressPercentage || 0,
            } : null,
          },
        };
      })
    );

    // Get recent activity
    const recentActivity = await db
      .select({
        id: studentProgress.id,
        moduleId: studentProgress.moduleId,
        classId: studentProgress.classId,
        progressPercentage: studentProgress.progressPercentage,
        lastAccessedAt: studentProgress.lastAccessedAt,
      })
      .from(studentProgress)
      .where(eq(studentProgress.studentId, userId))
      .orderBy(desc(studentProgress.lastAccessedAt))
      .limit(5);

    // Get class and module names for recent activity
    const recentActivityWithDetails = await Promise.all(
      recentActivity.map(async (activity) => {
        const classData = await db
          .select({ name: classes.name })
          .from(classes)
          .where(eq(classes.id, activity.classId))
          .limit(1);

        const moduleData = await db
          .select({ title: modules.title })
          .from(modules)
          .where(eq(modules.id, activity.moduleId))
          .limit(1);

        return {
          id: activity.id,
          type: "lesson" as const,
          title: moduleData[0]?.title || "Unknown Module",
          className: classData[0]?.name || "Unknown Class",
          completedAt: activity.lastAccessedAt?.toISOString() || new Date().toISOString(),
        };
      })
    );

    // Get achievements (mock data for now)
    const achievements = [
      {
        id: 1,
        title: "First Steps",
        description: "Completed your first lesson",
        earnedAt: new Date().toISOString(),
        icon: "🎯",
      },
      {
        id: 2,
        title: "Dedicated Learner",
        description: "Logged in 7 days in a row",
        earnedAt: new Date().toISOString(),
        icon: "🔥",
      },
    ];

    // Get upcoming assessments
    const upcomingAssessments = await db
      .select({
        id: assessments.id,
        title: assessments.title,
        estimatedDuration: assessments.estimatedDuration,
        date: assessments.date,
        classId: assessments.classId,
      })
      .from(assessments)
      .innerJoin(enrollments, eq(assessments.classId, enrollments.classId))
      .where(
        and(
          eq(enrollments.studentId, userId),
          eq(enrollments.status, "active")
        )
      )
      .orderBy(asc(assessments.date))
      .limit(5);

    // Get class names for upcoming assessments
    const upcomingAssessmentsWithDetails = await Promise.all(
      upcomingAssessments.map(async (assessment) => {
        const classData = await db
          .select({ name: classes.name })
          .from(classes)
          .where(eq(classes.id, assessment.classId))
          .limit(1);

        return {
          id: assessment.id,
          title: assessment.title,
          className: classData[0]?.name || "Unknown Class",
          dueDate: assessment.date.toISOString(),
          estimatedDuration: assessment.estimatedDuration || 60,
        };
      })
    );

    const dashboardData = {
      classes: classesWithTeachers,
      recentActivity: recentActivityWithDetails,
      achievements,
      upcomingAssessments: upcomingAssessmentsWithDetails,
    };

    res.json(dashboardData);
  } catch (error) {
    console.error("Error fetching student dashboard:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

// Get specific class data for student
router.get("/class/:classId", async (req, res) => {
  try {
    const userId = req.user?.id;
    const classId = parseInt(req.params.classId);
    
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify student is enrolled in this class
    const enrollment = await db
      .select()
      .from(enrollments)
      .where(
        and(
          eq(enrollments.studentId, userId),
          eq(enrollments.classId, classId),
          eq(enrollments.status, "active")
        )
      )
      .limit(1);

    if (!enrollment[0]) {
      return res.status(403).json({ error: "Access denied - Not enrolled in this class" });
    }

    // Get class details
    const classData = await db
      .select({
        id: classes.id,
        name: classes.name,
        grade: classes.grade,
        level: classes.level,
        curriculum: classes.curriculum,
        teacherId: classes.teacherId,
      })
      .from(classes)
      .where(eq(classes.id, classId))
      .limit(1);

    if (!classData[0]) {
      return res.status(404).json({ error: "Class not found" });
    }

    // Get teacher details
    const teacher = await db
      .select({
        firstName: users.firstName,
        lastName: users.lastName,
      })
      .from(users)
      .where(eq(users.id, classData[0].teacherId))
      .limit(1);

    // Get class modules
    const classModules = await db
      .select({
        id: modules.id,
        title: modules.title,
        description: modules.description,
        estimatedHours: modules.estimatedHours,
        sequenceOrder: modules.sequenceOrder,
      })
      .from(modules)
      .where(eq(modules.classId, classId))
      .orderBy(asc(modules.sequenceOrder));

    // Get student progress for each module
    const moduleProgress = await db
      .select({
        moduleId: studentProgress.moduleId,
        progressPercentage: studentProgress.progressPercentage,
        completedLessons: studentProgress.completedLessons,
        totalLessons: studentProgress.totalLessons,
      })
      .from(studentProgress)
      .where(
        and(
          eq(studentProgress.studentId, userId),
          eq(studentProgress.classId, classId)
        )
      );

    const progressMap = new Map(
      moduleProgress.map(p => [p.moduleId, p])
    );

    // Get lessons for each module
    const modulesWithDetails = await Promise.all(
      classModules.map(async (module) => {
        const lessons = await db
          .select({
            id: lessonPlans.id,
            title: lessonPlans.title,
            lessonType: lessonPlans.lessonType,
            duration: lessonPlans.duration,
            sequenceOrder: lessonPlans.sequenceOrder,
          })
          .from(lessonPlans)
          .where(eq(lessonPlans.moduleId, module.id))
          .orderBy(asc(lessonPlans.sequenceOrder));

        // Get assessments for this module
        const moduleAssessments = await db
          .select({
            id: assessments.id,
            title: assessments.title,
            totalPoints: assessments.totalPoints,
            estimatedDuration: assessments.estimatedDuration,
          })
          .from(assessments)
          .where(eq(assessments.moduleId, module.id));

        const progress = progressMap.get(module.id);
        const completedLessons = progress?.completedLessons || 0;
        const totalLessons = lessons.length;
        const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

        // Determine if module is unlocked (first module or previous module completed)
        const isUnlocked = module.sequenceOrder === 1 || 
          classModules.some(m => 
            m.sequenceOrder === module.sequenceOrder - 1 && 
            (progressMap.get(m.id)?.progressPercentage || 0) >= 100
          );

        // Find next lesson
        const nextLesson = lessons.find((_, index) => index >= completedLessons);

        return {
          id: module.id,
          title: module.title,
          description: module.description || "",
          totalLessons,
          completedLessons,
          progressPercentage,
          sequenceOrder: module.sequenceOrder,
          isUnlocked,
          estimatedHours: module.estimatedHours || 0,
          nextLesson: nextLesson ? {
            id: nextLesson.id,
            title: nextLesson.title,
            lessonType: nextLesson.lessonType || "lecture",
            duration: nextLesson.duration || 45,
          } : undefined,
          lessons: lessons.map(lesson => ({
            id: lesson.id,
            title: lesson.title,
            lessonType: lesson.lessonType || "lecture",
            duration: lesson.duration || 45,
            isCompleted: false, // TODO: Track individual lesson completion
            sequenceOrder: lesson.sequenceOrder || 1,
          })),
          assessments: moduleAssessments.map(assessment => ({
            id: assessment.id,
            title: assessment.title,
            totalPoints: assessment.totalPoints || 100,
            estimatedDuration: assessment.estimatedDuration || 60,
            isCompleted: false, // TODO: Check if student completed assessment
            score: undefined, // TODO: Get student's score
          })),
        };
      })
    );

    // Calculate overall progress
    const totalModules = classModules.length;
    const completedModules = moduleProgress.filter(p => p.progressPercentage === 100).length;
    const overallProgressPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

    const response = {
      id: classData[0].id,
      name: classData[0].name,
      grade: classData[0].grade,
      level: classData[0].level,
      curriculum: classData[0].curriculum,
      teacher: teacher[0] || { firstName: "Unknown", lastName: "Teacher" },
      overallProgress: {
        totalModules,
        completedModules,
        progressPercentage: overallProgressPercentage,
      },
      modules: modulesWithDetails,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching class data:", error);
    res.status(500).json({ error: "Failed to fetch class data" });
  }
});

// Join a class using class code
router.post("/join-class", async (req, res) => {
  try {
    const userId = req.user?.id;
    const { classCode } = req.body;
    
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!classCode) {
      return res.status(400).json({ error: "Class code is required" });
    }

    // Find class by code
    const classData = await db
      .select({
        id: classes.id,
        name: classes.name,
        teacherId: classes.teacherId,
        isActive: classes.isActive,
      })
      .from(classes)
      .where(eq(classes.classCode, classCode.toUpperCase()))
      .limit(1);

    if (!classData[0]) {
      return res.status(404).json({ error: "Class not found. Please check the class code." });
    }

    if (!classData[0].isActive) {
      return res.status(400).json({ error: "This class is no longer active." });
    }

    // Check if student is already enrolled
    const existingEnrollment = await db
      .select()
      .from(enrollments)
      .where(
        and(
          eq(enrollments.studentId, userId),
          eq(enrollments.classId, classData[0].id)
        )
      )
      .limit(1);

    if (existingEnrollment[0]) {
      if (existingEnrollment[0].status === "active") {
        return res.status(400).json({ error: "You are already enrolled in this class." });
      } else {
        // Reactivate enrollment
        await db
          .update(enrollments)
          .set({ status: "active", enrolledAt: new Date() })
          .where(eq(enrollments.id, existingEnrollment[0].id));
      }
    } else {
      // Create new enrollment
      await db
        .insert(enrollments)
        .values({
          studentId: userId,
          classId: classData[0].id,
          status: "active",
        });
    }

    res.json({
      success: true,
      message: "Successfully joined the class!",
      classId: classData[0].id,
      className: classData[0].name,
    });
  } catch (error) {
    console.error("Error joining class:", error);
    res.status(500).json({ error: "Failed to join class" });
  }
});

export default router;