import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, PlayCircle, CheckCircle, Clock, Trophy, FileText } from "lucide-react";
import { Link } from "wouter";

interface StudentClassModule {
  id: number;
  title: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
  sequenceOrder: number;
  isUnlocked: boolean;
  estimatedHours: number;
  nextLesson?: {
    id: number;
    title: string;
    lessonType: string;
    duration: number;
  };
  lessons: {
    id: number;
    title: string;
    lessonType: string;
    duration: number;
    isCompleted: boolean;
    sequenceOrder: number;
  }[];
  assessments: {
    id: number;
    title: string;
    totalPoints: number;
    estimatedDuration: number;
    isCompleted: boolean;
    score?: number;
  }[];
}

interface StudentClassData {
  id: number;
  name: string;
  grade: string;
  level: string;
  curriculum: string;
  teacher: {
    firstName: string;
    lastName: string;
  };
  overallProgress: {
    totalModules: number;
    completedModules: number;
    progressPercentage: number;
  };
  modules: StudentClassModule[];
}

function ModuleCard({ module, classId }: { module: StudentClassModule; classId: number }) {
  const getStatusColor = () => {
    if (!module.isUnlocked) return "bg-gray-100 dark:bg-gray-800";
    if (module.progressPercentage === 100) return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
    if (module.progressPercentage > 0) return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
    return "bg-white dark:bg-gray-900";
  };

  return (
    <Card className={`${getStatusColor()} ${!module.isUnlocked ? 'opacity-60' : 'hover:shadow-lg transition-shadow duration-200'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {module.title}
              {module.progressPercentage === 100 && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {module.description}
            </p>
          </div>
          <Badge variant={module.isUnlocked ? "default" : "secondary"}>
            Module {module.sequenceOrder}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                {module.completedLessons} of {module.totalLessons} lessons
              </span>
            </div>
            <Progress value={module.progressPercentage} className="h-2" />
          </div>

          {/* Next Lesson */}
          {module.nextLesson && module.isUnlocked && (
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Next Lesson</p>
                  <p className="text-xs text-muted-foreground">{module.nextLesson.title}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-xs">
                    {module.nextLesson.lessonType}
                  </Badge>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {module.nextLesson.duration}min
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Assessments */}
          {module.assessments.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Assessments</h4>
              {module.assessments.map((assessment) => (
                <div key={assessment.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">{assessment.title}</span>
                  </div>
                  <div className="text-right">
                    {assessment.isCompleted ? (
                      <Badge variant="secondary" className="text-xs">
                        {assessment.score}%
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        {assessment.estimatedDuration}min
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {module.isUnlocked ? (
              <>
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/student/class/${classId}/module/${module.id}`}>
                    <PlayCircle className="w-4 h-4 mr-2" />
                    {module.progressPercentage === 0 ? 'Start Module' : 'Continue'}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`/student/class/${classId}/module/${module.id}/lessons`}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Lessons
                  </Link>
                </Button>
              </>
            ) : (
              <Button disabled size="sm" className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                  Complete previous modules to unlock
                </div>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function StudentClassView() {
  const { classId } = useParams<{ classId: string }>();
  
  const { data: classData, isLoading } = useQuery<StudentClassData>({
    queryKey: ["/api/student/class", classId],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Class Not Found</h3>
            <p className="text-muted-foreground mb-4">
              The class you're looking for doesn't exist or you don't have access to it.
            </p>
            <Button asChild>
              <Link href="/student/dashboard">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Class Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/student/dashboard">← Back to Dashboard</Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-2">{classData.name}</h1>
        <p className="text-muted-foreground">
          {classData.level} Grade {classData.grade} • {classData.curriculum}
        </p>
        <p className="text-sm text-muted-foreground">
          Teacher: {classData.teacher.firstName} {classData.teacher.lastName}
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Course Completion</span>
              <span className="font-medium">
                {classData.overallProgress.completedModules} of {classData.overallProgress.totalModules} modules
              </span>
            </div>
            <Progress value={classData.overallProgress.progressPercentage} className="h-3" />
            <p className="text-xs text-muted-foreground">
              {classData.overallProgress.progressPercentage}% complete
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Modules */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Course Modules</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {classData.modules
            .sort((a, b) => a.sequenceOrder - b.sequenceOrder)
            .map((module) => (
              <ModuleCard key={module.id} module={module} classId={classData.id} />
            ))}
        </div>
      </div>
    </div>
  );
}