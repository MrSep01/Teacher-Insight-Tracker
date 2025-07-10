import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Target, 
  FileText,
  Download,
  Share2,
  BookOpen,
  Users,
  CheckCircle,
  GraduationCap,
  Settings
} from "lucide-react";
import StudentLessonViewer from "./student-lesson-viewer";
import TeacherGuideViewer from "./teacher-guide-viewer";

interface SimpleLessonData {
  id: number;
  title: string;
  description: string;
  duration: number;
  objectives: string[];
  studentWorksheet?: string;
  teachingScript?: string;
  assessmentQuestions?: string;
  fullContent?: any;
}

interface SimpleLessonViewerProps {
  lesson: SimpleLessonData;
  onExport?: () => void;
  onShare?: () => void;
}

export default function SimpleComprehensiveLessonViewer({ lesson, onExport, onShare }: SimpleLessonViewerProps) {
  const [activeTab, setActiveTab] = useState("student-view");

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
          <p className="text-gray-600 mt-2">{lesson.description}</p>
          <div className="flex items-center gap-4 mt-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {lesson.duration} minutes
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              {lesson.objectives.length} objectives
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          {onExport && (
            <Button onClick={onExport} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
          {onShare && (
            <Button onClick={onShare} variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="student-view">Student View</TabsTrigger>
          <TabsTrigger value="teacher-guide">Teacher Guide</TabsTrigger>
          <TabsTrigger value="student-worksheet">Student Worksheet</TabsTrigger>
          <TabsTrigger value="teacher-script">Teacher Script</TabsTrigger>
          <TabsTrigger value="objectives">Objectives</TabsTrigger>
        </TabsList>

        {/* Student View Tab */}
        <TabsContent value="student-view" className="space-y-6">
          <StudentLessonViewer lesson={lesson} />
        </TabsContent>

        {/* Teacher Guide Tab */}
        <TabsContent value="teacher-guide" className="space-y-6">
          <TeacherGuideViewer lesson={lesson} />
        </TabsContent>

        {/* Student Worksheet Tab */}
        <TabsContent value="student-worksheet" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Student Worksheet
              </CardTitle>
              <CardDescription>
                Ready-to-use worksheet with exercises and activities for students
              </CardDescription>
            </CardHeader>
            <CardContent>
              {lesson.studentWorksheet ? (
                <div className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg">
                  {lesson.studentWorksheet}
                </div>
              ) : (
                <p className="text-gray-500">No student worksheet available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Teacher Script Tab */}
        <TabsContent value="teacher-script" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Teacher Script
              </CardTitle>
              <CardDescription>
                Step-by-step teaching guide with exact timing and instructions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {lesson.teachingScript ? (
                <div className="whitespace-pre-wrap text-sm bg-blue-50 p-4 rounded-lg">
                  {lesson.teachingScript}
                </div>
              ) : (
                <p className="text-gray-500">No teaching script available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assessment Tab */}
        <TabsContent value="assessment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Assessment Questions
              </CardTitle>
              <CardDescription>
                Formative and summative assessment questions for this lesson
              </CardDescription>
            </CardHeader>
            <CardContent>
              {lesson.assessmentQuestions ? (
                <div className="whitespace-pre-wrap text-sm bg-green-50 p-4 rounded-lg">
                  {lesson.assessmentQuestions}
                </div>
              ) : (
                <p className="text-gray-500">No assessment questions available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Objectives Tab */}
        <TabsContent value="objectives" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learning Objectives
              </CardTitle>
              <CardDescription>
                What students will learn and achieve in this lesson
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lesson.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-sm">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}