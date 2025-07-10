import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  MessageCircle,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  BookOpen,
  Target,
  Mail,
  Phone,
  Video
} from "lucide-react";

interface Child {
  id: number;
  name: string;
  grade: string;
  level: string;
  class: string;
  overallGrade: string;
  progress: number;
  status: "excellent" | "good" | "needs_attention" | "concerning";
  lastAssessment: {
    title: string;
    score: number;
    date: string;
  };
  upcomingAssessments: number;
  recentMessages: number;
}

interface ParentNotification {
  id: number;
  type: "assessment" | "behavior" | "attendance" | "general";
  title: string;
  message: string;
  date: string;
  read: boolean;
  urgent: boolean;
  studentName: string;
}

interface TeacherMessage {
  id: number;
  teacherName: string;
  subject: string;
  message: string;
  date: string;
  studentName: string;
  replied: boolean;
}

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState<number | null>(null);

  // Mock data for demonstration
  const children: Child[] = [
    {
      id: 1,
      name: "Emma Johnson",
      grade: "11",
      level: "IGCSE",
      class: "11A Chemistry",
      overallGrade: "A-",
      progress: 85,
      status: "excellent",
      lastAssessment: {
        title: "Ionic Bonding Test",
        score: 89,
        date: "2025-07-08"
      },
      upcomingAssessments: 2,
      recentMessages: 1
    },
    {
      id: 2,
      name: "James Johnson",
      grade: "10",
      level: "IGCSE",
      class: "10B Chemistry",
      overallGrade: "B+",
      progress: 78,
      status: "good",
      lastAssessment: {
        title: "Atomic Structure Quiz",
        score: 76,
        date: "2025-07-07"
      },
      upcomingAssessments: 3,
      recentMessages: 0
    }
  ];

  const notifications: ParentNotification[] = [
    {
      id: 1,
      type: "assessment",
      title: "Excellent Performance",
      message: "Emma scored 89% on her Ionic Bonding Test - above class average!",
      date: "2025-07-08",
      read: false,
      urgent: false,
      studentName: "Emma Johnson"
    },
    {
      id: 2,
      type: "general",
      title: "Parent-Teacher Conference",
      message: "Please schedule a meeting to discuss James's progress in Chemistry",
      date: "2025-07-07",
      read: false,
      urgent: true,
      studentName: "James Johnson"
    },
    {
      id: 3,
      type: "assessment",
      title: "Assignment Due Soon",
      message: "Emma has a lab report due this Friday - Organic Chemistry",
      date: "2025-07-06",
      read: true,
      urgent: false,
      studentName: "Emma Johnson"
    }
  ];

  const teacherMessages: TeacherMessage[] = [
    {
      id: 1,
      teacherName: "Dr. Smith",
      subject: "Chemistry",
      message: "Emma is excelling in her studies. She shows great understanding of chemical concepts and participates actively in class discussions.",
      date: "2025-07-08",
      studentName: "Emma Johnson",
      replied: false
    },
    {
      id: 2,
      teacherName: "Prof. Johnson",
      subject: "Physics",
      message: "James needs additional support with problem-solving techniques. I recommend extra practice sessions.",
      date: "2025-07-07",
      studentName: "James Johnson",
      replied: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-green-500";
      case "good": return "bg-blue-500";
      case "needs_attention": return "bg-yellow-500";
      case "concerning": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "excellent": return "Excellent";
      case "good": return "Good";
      case "needs_attention": return "Needs Attention";
      case "concerning": return "Concerning";
      default: return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
              <p className="text-gray-600">Track your children's academic progress and stay connected with teachers</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Messages ({teacherMessages.filter(m => !m.replied).length})
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="children">Children Progress</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Children Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {children.map((child) => (
                <Card key={child.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{child.name}</CardTitle>
                      <Badge className={`${getStatusColor(child.status)} text-white`}>
                        {getStatusText(child.status)}
                      </Badge>
                    </div>
                    <CardDescription>
                      {child.grade} {child.level} • {child.class}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Grade</span>
                      <Badge variant="outline" className="text-lg font-bold">
                        {child.overallGrade}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm font-medium">{child.progress}%</span>
                      </div>
                      <Progress value={child.progress} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Last Assessment</span>
                        <span className="text-sm font-medium">{child.lastAssessment.score}%</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {child.lastAssessment.title} • {new Date(child.lastAssessment.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">
                          {child.upcomingAssessments} upcoming
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">
                          {child.recentMessages} messages
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Children</p>
                      <p className="text-2xl font-bold">{children.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                      <p className="text-2xl font-bold">{teacherMessages.filter(m => !m.replied).length}</p>
                    </div>
                    <MessageCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Urgent Notifications</p>
                      <p className="text-2xl font-bold">{notifications.filter(n => n.urgent && !n.read).length}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Grade</p>
                      <p className="text-2xl font-bold">B+</p>
                    </div>
                    <Award className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="children" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {children.map((child) => (
                <Card key={child.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {child.name}
                      <Badge className={`${getStatusColor(child.status)} text-white`}>
                        {getStatusText(child.status)}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Detailed progress for {child.grade} {child.level}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm">{child.progress}%</span>
                      </div>
                      <Progress value={child.progress} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Current Grade</p>
                        <p className="text-2xl font-bold">{child.overallGrade}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Class Rank</p>
                        <p className="text-lg font-semibold">5th of 24</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Recent Performance</p>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{child.lastAssessment.title}</span>
                        <Badge variant="secondary">{child.lastAssessment.score}%</Badge>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        View Schedule
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Teacher
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Messages</CardTitle>
                <CardDescription>
                  Communications from your children's teachers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teacherMessages.map((message) => (
                    <div key={message.id} className={`p-4 border rounded-lg ${!message.replied ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <p className="font-medium">{message.teacherName}</p>
                            <Badge variant="outline" className="text-xs">
                              {message.subject}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              for {message.studentName}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{message.message}</p>
                          <p className="text-xs text-gray-500">{new Date(message.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex space-x-2">
                          {!message.replied && (
                            <Button size="sm" variant="outline">
                              <Mail className="h-4 w-4 mr-2" />
                              Reply
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Important updates about your children's education
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-4 border rounded-lg ${!notification.read ? 'bg-white border-gray-200' : 'bg-gray-50'} ${notification.urgent ? 'border-l-4 border-l-red-500' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <p className="font-medium">{notification.title}</p>
                            {notification.urgent && (
                              <Badge variant="destructive" className="text-xs">
                                Urgent
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {notification.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                          <div className="flex items-center space-x-4">
                            <p className="text-xs text-gray-500">{new Date(notification.date).toLocaleDateString()}</p>
                            <span className="text-xs text-gray-500">• {notification.studentName}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <Button size="sm" variant="outline">
                            Mark as Read
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}