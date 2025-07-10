import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, CheckCircle, Calendar, Trophy, PlayCircle } from "lucide-react";
import { Link } from "wouter";

interface StudentClass {
  id: number;
  name: string;
  grade: string;
  level: string;
  curriculum: string;
  teacher: {
    firstName: string;
    lastName: string;
  };
  progress: {
    totalModules: number;
    completedModules: number;
    currentModule: {
      id: number;
      title: string;
      totalLessons: number;
      completedLessons: number;
      progressPercentage: number;
    };
  };
}

interface StudentDashboardData {
  classes: StudentClass[];
  recentActivity: {
    id: number;
    type: "lesson" | "assessment" | "module";
    title: string;
    className: string;
    completedAt: string;
    score?: number;
  }[];
  achievements: {
    id: number;
    title: string;
    description: string;
    earnedAt: string;
    icon: string;
  }[];
  upcomingAssessments: {
    id: number;
    title: string;
    className: string;
    dueDate: string;
    estimatedDuration: number;
  }[];
}

function StudentClassCard({ classData }: { classData: StudentClass }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{classData.name}</CardTitle>
          <Badge variant="outline">
            {classData.level} {classData.grade}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Teacher: {classData.teacher.firstName} {classData.teacher.lastName}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Module Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Module</span>
              <span className="text-sm text-muted-foreground">
                {classData.progress.currentModule.completedLessons} of {classData.progress.currentModule.totalLessons} lessons
              </span>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">{classData.progress.currentModule.title}</h4>
              <Progress value={classData.progress.currentModule.progressPercentage} className="h-2" />
            </div>
          </div>

          {/* Overall Progress */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">
              {classData.progress.completedModules} of {classData.progress.totalModules} modules
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button asChild size="sm" className="flex-1">
              <Link href={`/student/class/${classData.id}`}>
                <PlayCircle className="w-4 h-4 mr-2" />
                Continue Learning
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href={`/student/class/${classData.id}/modules`}>
                <BookOpen className="w-4 h-4 mr-2" />
                View Modules
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RecentActivityItem({ activity }: { activity: StudentDashboardData["recentActivity"][0] }) {
  const getIcon = () => {
    switch (activity.type) {
      case "lesson":
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case "assessment":
        return <Trophy className="w-4 h-4 text-green-500" />;
      case "module":
        return <CheckCircle className="w-4 h-4 text-purple-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex-shrink-0">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{activity.title}</p>
        <p className="text-xs text-muted-foreground">{activity.className}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-muted-foreground">
          {new Date(activity.completedAt).toLocaleDateString()}
        </p>
        {activity.score && (
          <p className="text-xs font-medium text-green-600">{activity.score}%</p>
        )}
      </div>
    </div>
  );
}

function UpcomingAssessmentItem({ assessment }: { assessment: StudentDashboardData["upcomingAssessments"][0] }) {
  const dueDate = new Date(assessment.dueDate);
  const isOverdue = dueDate < new Date();
  const isUpcoming = dueDate.getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000; // Within 7 days

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <Calendar className="w-4 h-4 text-orange-500" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{assessment.title}</p>
        <p className="text-xs text-muted-foreground">{assessment.className}</p>
      </div>
      <div className="text-right">
        <p className={`text-xs font-medium ${isOverdue ? 'text-red-600' : isUpcoming ? 'text-orange-600' : 'text-muted-foreground'}`}>
          {dueDate.toLocaleDateString()}
        </p>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {assessment.estimatedDuration}min
        </p>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  const { data: dashboardData, isLoading } = useQuery<StudentDashboardData>({
    queryKey: ["/api/student/dashboard"],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
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
    );
  }

  if (!dashboardData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Classes Yet</h3>
            <p className="text-muted-foreground mb-4">
              Ask your teacher for a class code to join your first class.
            </p>
            <Button asChild>
              <Link href="/student/join-class">Join a Class</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Learning Dashboard</h1>
        <p className="text-muted-foreground">
          Track your progress and continue your learning journey
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Classes - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">My Classes</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {dashboardData.classes.map((classData) => (
                <StudentClassCard key={classData.id} classData={classData} />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-2">
              {dashboardData.recentActivity.map((activity) => (
                <RecentActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <p className="text-sm font-medium">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Assessments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                Upcoming Assessments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dashboardData.upcomingAssessments.map((assessment) => (
                  <UpcomingAssessmentItem key={assessment.id} assessment={assessment} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}