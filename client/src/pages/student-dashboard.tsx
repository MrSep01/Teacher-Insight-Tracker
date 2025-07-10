import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp, 
  Award,
  Calendar,
  FileText,
  Users,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface StudentStats {
  totalAssessments: number;
  completedAssessments: number;
  averageScore: number;
  upcomingAssessments: number;
  currentGrade: string;
  overallProgress: number;
}

interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  score?: number;
  maxScore?: number;
}

interface RecentActivity {
  id: number;
  type: "assessment" | "lesson" | "assignment";
  title: string;
  date: string;
  score?: number;
  status: string;
}

export default function StudentDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"week" | "month" | "term">("week");

  // Mock data for now - in real app, these would come from API
  const studentStats: StudentStats = {
    totalAssessments: 24,
    completedAssessments: 18,
    averageScore: 82,
    upcomingAssessments: 3,
    currentGrade: "B+",
    overallProgress: 75
  };

  const upcomingAssignments: Assignment[] = [
    {
      id: 1,
      title: "Ionic Bonding Assessment",
      subject: "Chemistry",
      dueDate: "2025-07-15",
      status: "pending"
    },
    {
      id: 2,
      title: "Organic Chemistry Lab Report",
      subject: "Chemistry",
      dueDate: "2025-07-18",
      status: "pending"
    },
    {
      id: 3,
      title: "Periodic Table Quiz",
      subject: "Chemistry",
      dueDate: "2025-07-20",
      status: "pending"
    }
  ];

  const recentActivity: RecentActivity[] = [
    {
      id: 1,
      type: "assessment",
      title: "Atomic Structure Test",
      date: "2025-07-08",
      score: 85,
      status: "completed"
    },
    {
      id: 2,
      type: "lesson",
      title: "Chemical Bonding Lesson",
      date: "2025-07-07",
      status: "completed"
    },
    {
      id: 3,
      type: "assignment",
      title: "Balancing Equations Practice",
      date: "2025-07-06",
      score: 92,
      status: "graded"
    }
  ];

  const subjects = [
    { name: "Chemistry", progress: 78, grade: "B+", color: "bg-blue-500" },
    { name: "Physics", progress: 85, grade: "A-", color: "bg-green-500" },
    { name: "Mathematics", progress: 72, grade: "B", color: "bg-purple-500" },
    { name: "Biology", progress: 88, grade: "A", color: "bg-red-500" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's your academic progress</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="px-3 py-1">
                IGCSE Year 11
              </Badge>
              <Badge className="bg-green-100 text-green-800 px-3 py-1">
                Current Grade: {studentStats.currentGrade}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assessments Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentStats.completedAssessments}/{studentStats.totalAssessments}</div>
              <div className="text-xs text-gray-500">
                {Math.round((studentStats.completedAssessments / studentStats.totalAssessments) * 100)}% completion rate
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentStats.averageScore}%</div>
              <div className="text-xs text-gray-500">
                +5% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Assessments</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentStats.upcomingAssessments}</div>
              <div className="text-xs text-gray-500">
                Due this week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <Award className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentStats.overallProgress}%</div>
              <Progress value={studentStats.overallProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subject Progress */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Subject Progress
              </CardTitle>
              <CardDescription>
                Your performance across all subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                      <div>
                        <p className="font-medium">{subject.name}</p>
                        <p className="text-sm text-gray-500">Current Grade: {subject.grade}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24">
                        <Progress value={subject.progress} />
                      </div>
                      <span className="text-sm font-medium w-10">{subject.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Upcoming Assignments
              </CardTitle>
              <CardDescription>
                Assignments due soon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{assignment.title}</p>
                      <p className="text-xs text-gray-500">{assignment.subject}</p>
                      <p className="text-xs text-gray-500">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {assignment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your recent assessments and lessons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      {activity.type === "assessment" && <Target className="h-4 w-4 text-blue-600" />}
                      {activity.type === "lesson" && <BookOpen className="h-4 w-4 text-blue-600" />}
                      {activity.type === "assignment" && <FileText className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {activity.score && (
                      <Badge variant="secondary">
                        {activity.score}%
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}