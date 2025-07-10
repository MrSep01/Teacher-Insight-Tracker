import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Clock, 
  Users, 
  BookOpen, 
  Target, 
  CheckCircle, 
  AlertTriangle,
  Video,
  Image,
  Monitor,
  Lightbulb,
  GraduationCap,
  FileText,
  Download,
  Share2
} from "lucide-react";

interface MultimediaContent {
  type: "image" | "video" | "diagram" | "simulation" | "interactive";
  title: string;
  description: string;
  suggestedSource: string;
  purpose: string;
  placementInLesson: string;
  alternativeText: string;
  searchKeywords: string[];
}

interface DifferentiatedActivity {
  level: "below_grade" | "on_grade" | "above_grade";
  title: string;
  description: string;
  instructions: string[];
  materials: string[];
  timeRequired: number;
  supportProvided: string[];
  extensionOpportunities: string[];
  assessmentCriteria: string[];
}

interface TeacherGuide {
  lessonOverview: string;
  preparationChecklist: string[];
  timingGuide: Array<{
    segment: string;
    duration: number;
    activity: string;
    teacherActions: string[];
    studentActions: string[];
    keyPoints: string[];
  }>;
  commonMisconceptions: Array<{
    misconception: string;
    correction: string;
    teachingStrategy: string;
  }>;
  troubleshootingTips: string[];
  adaptationSuggestions: string[];
  followUpActivities: string[];
}

interface ComprehensiveLessonData {
  id: number;
  title: string;
  description: string;
  duration: number;
  objectives: string[];
  studentWorksheet?: string;
  teachingScript?: string;
  assessmentQuestions?: string;
  fullContent: {
    title: string;
    fullLessonContent: {
      introduction: {
        hook: string;
        learningGoals: string[];
        success_criteria: string[];
        duration: number;
      };
      development: {
        mainContent: string[];
        keyExplanations: string[];
        demonstrations: string[];
        duration: number;
      };
      practice: {
        guidedPractice: string[];
        independentPractice: string[];
        duration: number;
      };
      assessment: {
        formativeAssessment: string[];
        summativeAssessment: string[];
        duration: number;
      };
      closure: {
        summary: string[];
        homework: string[];
        nextLesson: string;
        duration: number;
      };
    };
    teacherGuide: TeacherGuide;
    multimediaContent: MultimediaContent[];
    differentiatedActivities: DifferentiatedActivity[];
    assessmentRubrics: Array<{
      criteria: string;
      levels: Array<{
        level: string;
        description: string;
        indicators: string[];
        score: number;
      }>;
    }>;
  };
}

interface ComprehensiveLessonViewerProps {
  lesson: ComprehensiveLessonData;
  onExport?: () => void;
  onShare?: () => void;
}

export default function ComprehensiveLessonViewer({ lesson, onExport, onShare }: ComprehensiveLessonViewerProps) {
  const [activeTab, setActiveTab] = useState("lesson-content");
  
  const getMultimediaIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="w-4 h-4" />;
      case "image": return <Image className="w-4 h-4" />;
      case "simulation": return <Monitor className="w-4 h-4" />;
      case "interactive": return <Monitor className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "below_grade": return "bg-yellow-100 text-yellow-800";
      case "on_grade": return "bg-blue-100 text-blue-800";
      case "above_grade": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyLabel = (level: string) => {
    switch (level) {
      case "below_grade": return "Support Level";
      case "on_grade": return "Core Level";
      case "above_grade": return "Extension Level";
      default: return level;
    }
  };

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
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="lesson-content">Lesson Content</TabsTrigger>
          <TabsTrigger value="student-worksheet">Student Worksheet</TabsTrigger>
          <TabsTrigger value="teacher-script">Teacher Script</TabsTrigger>
          <TabsTrigger value="teacher-guide">Teacher Guide</TabsTrigger>
          <TabsTrigger value="multimedia">Multimedia</TabsTrigger>
          <TabsTrigger value="differentiation">Differentiation</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
        </TabsList>

        {/* Lesson Content Tab */}
        <TabsContent value="lesson-content" className="space-y-6">
          <div className="grid gap-6">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Introduction ({lesson.fullContent.fullLessonContent.introduction.duration} min)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Hook Activity</h4>
                  <p className="text-sm">{lesson.fullContent.fullLessonContent.introduction.hook}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Learning Goals</h4>
                  <ul className="text-sm space-y-1">
                    {lesson.fullContent.fullLessonContent.introduction.learningGoals.map((goal, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Success Criteria</h4>
                  <ul className="text-sm space-y-1">
                    {lesson.fullContent.fullLessonContent.introduction.success_criteria.map((criteria, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        {criteria}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Development */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Development ({lesson.fullContent.fullLessonContent.development.duration} min)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Main Content</h4>
                  <div className="space-y-2">
                    {lesson.fullContent.fullLessonContent.development.mainContent.map((content, index) => (
                      <p key={index} className="text-sm p-3 bg-gray-50 rounded-lg">{content}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Key Explanations</h4>
                  <div className="space-y-2">
                    {lesson.fullContent.fullLessonContent.development.keyExplanations.map((explanation, index) => (
                      <p key={index} className="text-sm p-3 bg-blue-50 rounded-lg">{explanation}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Demonstrations</h4>
                  <div className="space-y-2">
                    {lesson.fullContent.fullLessonContent.development.demonstrations.map((demo, index) => (
                      <p key={index} className="text-sm p-3 bg-yellow-50 rounded-lg">{demo}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Practice */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Practice ({lesson.fullContent.fullLessonContent.practice.duration} min)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Guided Practice</h4>
                  <div className="space-y-2">
                    {lesson.fullContent.fullLessonContent.practice.guidedPractice.map((practice, index) => (
                      <p key={index} className="text-sm p-3 bg-green-50 rounded-lg">{practice}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Independent Practice</h4>
                  <div className="space-y-2">
                    {lesson.fullContent.fullLessonContent.practice.independentPractice.map((practice, index) => (
                      <p key={index} className="text-sm p-3 bg-purple-50 rounded-lg">{practice}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Assessment ({lesson.fullContent.fullLessonContent.assessment.duration} min)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Formative Assessment</h4>
                  <div className="space-y-2">
                    {lesson.fullContent.fullLessonContent.assessment.formativeAssessment.map((assessment, index) => (
                      <p key={index} className="text-sm p-3 bg-orange-50 rounded-lg">{assessment}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Summative Assessment</h4>
                  <div className="space-y-2">
                    {lesson.fullContent.fullLessonContent.assessment.summativeAssessment.map((assessment, index) => (
                      <p key={index} className="text-sm p-3 bg-red-50 rounded-lg">{assessment}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Closure */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Closure ({lesson.fullContent.fullLessonContent.closure.duration} min)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Summary</h4>
                  <div className="space-y-2">
                    {lesson.fullContent.fullLessonContent.closure.summary.map((summary, index) => (
                      <p key={index} className="text-sm p-3 bg-gray-50 rounded-lg">{summary}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Homework</h4>
                  <div className="space-y-2">
                    {lesson.fullContent.fullLessonContent.closure.homework.map((homework, index) => (
                      <p key={index} className="text-sm p-3 bg-indigo-50 rounded-lg">{homework}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Next Lesson Preview</h4>
                  <p className="text-sm p-3 bg-teal-50 rounded-lg">{lesson.fullContent.fullLessonContent.closure.nextLesson}</p>
                </div>
              </CardContent>
            </Card>
          </div>
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
                Complete worksheet for students to practice lesson concepts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white border rounded-lg p-6">
                <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                  {lesson.studentWorksheet || "No worksheet available for this lesson."}
                </pre>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button size="sm" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Print Version
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Teacher Script Tab */}
        <TabsContent value="teacher-script" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Teacher Script & Guide
              </CardTitle>
              <CardDescription>
                Step-by-step teaching script with timing and key points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border rounded-lg p-6">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                  {lesson.teachingScript || "No teaching script available for this lesson."}
                </pre>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Script
                </Button>
                <Button size="sm" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Print Version
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Teacher Guide Tab */}
        <TabsContent value="teacher-guide" className="space-y-6">
          <div className="grid gap-6">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Lesson Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{lesson.fullContent.teacherGuide.lessonOverview}</p>
              </CardContent>
            </Card>

            {/* Preparation Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>Preparation Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lesson.fullContent.teacherGuide.preparationChecklist.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timing Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Timing Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lesson.fullContent.teacherGuide.timingGuide.map((segment, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-sm">{segment.segment}</h4>
                        <Badge variant="outline" className="text-xs">
                          {segment.duration} min
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{segment.activity}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <h5 className="font-medium text-gray-700">Teacher Actions:</h5>
                          <ul className="list-disc list-inside space-y-1 mt-1">
                            {segment.teacherActions.map((action, actionIndex) => (
                              <li key={actionIndex} className="text-gray-600">{action}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-700">Student Actions:</h5>
                          <ul className="list-disc list-inside space-y-1 mt-1">
                            {segment.studentActions.map((action, actionIndex) => (
                              <li key={actionIndex} className="text-gray-600">{action}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h5 className="font-medium text-gray-700 text-xs">Key Points:</h5>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {segment.keyPoints.map((point, pointIndex) => (
                            <Badge key={pointIndex} variant="secondary" className="text-xs">
                              {point}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Common Misconceptions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Common Misconceptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lesson.fullContent.teacherGuide.commonMisconceptions.map((item, index) => (
                    <div key={index} className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-sm text-red-700 mb-2">Misconception:</h4>
                      <p className="text-sm mb-2">{item.misconception}</p>
                      <h4 className="font-semibold text-sm text-green-700 mb-2">Correction:</h4>
                      <p className="text-sm mb-2">{item.correction}</p>
                      <h4 className="font-semibold text-sm text-blue-700 mb-2">Teaching Strategy:</h4>
                      <p className="text-sm">{item.teachingStrategy}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Troubleshooting Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Troubleshooting Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lesson.fullContent.teacherGuide.troubleshootingTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Multimedia Tab */}
        <TabsContent value="multimedia" className="space-y-6">
          <div className="grid gap-6">
            {lesson.fullContent.multimediaContent.map((media, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getMultimediaIcon(media.type)}
                    {media.title}
                  </CardTitle>
                  <CardDescription>{media.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Purpose</h4>
                      <p className="text-sm">{media.purpose}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Suggested Source</h4>
                      <p className="text-sm">{media.suggestedSource}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Placement in Lesson</h4>
                      <Badge variant="outline" className="capitalize">{media.placementInLesson}</Badge>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Search Keywords</h4>
                      <div className="flex flex-wrap gap-1">
                        {media.searchKeywords.map((keyword, keywordIndex) => (
                          <Badge key={keywordIndex} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Alternative Text</h4>
                    <p className="text-sm text-gray-600">{media.alternativeText}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Differentiation Tab */}
        <TabsContent value="differentiation" className="space-y-6">
          <div className="grid gap-6">
            {lesson.fullContent.differentiatedActivities.map((activity, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {activity.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(activity.level)}>
                      {getDifficultyLabel(activity.level)}
                    </Badge>
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.timeRequired} min
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Description</h4>
                    <p className="text-sm">{activity.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Instructions</h4>
                    <ol className="text-sm space-y-1">
                      {activity.instructions.map((instruction, instructionIndex) => (
                        <li key={instructionIndex} className="flex items-start gap-2">
                          <span className="text-blue-500 font-medium">{instructionIndex + 1}.</span>
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Materials</h4>
                      <ul className="text-sm space-y-1">
                        {activity.materials.map((material, materialIndex) => (
                          <li key={materialIndex} className="flex items-start gap-2">
                            <span className="text-green-500">•</span>
                            {material}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Support Provided</h4>
                      <ul className="text-sm space-y-1">
                        {activity.supportProvided.map((support, supportIndex) => (
                          <li key={supportIndex} className="flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            {support}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Assessment Criteria</h4>
                    <div className="flex flex-wrap gap-1">
                      {activity.assessmentCriteria.map((criteria, criteriaIndex) => (
                        <Badge key={criteriaIndex} variant="outline" className="text-xs">
                          {criteria}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Assessment Tab */}
        <TabsContent value="assessment" className="space-y-6">
          <div className="grid gap-6">
            {/* Assessment Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Assessment Questions
                </CardTitle>
                <CardDescription>
                  Formative and summative assessment questions for this lesson
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border rounded-lg p-6">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {lesson.assessmentQuestions || "No assessment questions available for this lesson."}
                  </pre>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Assessment
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Print Version
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Assessment Rubrics */}
            {lesson.fullContent.assessmentRubrics && lesson.fullContent.assessmentRubrics.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Assessment Rubrics</h3>
                {lesson.fullContent.assessmentRubrics.map((rubric, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{rubric.criteria}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 p-2 text-left font-semibold">Level</th>
                              <th className="border border-gray-300 p-2 text-left font-semibold">Score</th>
                              <th className="border border-gray-300 p-2 text-left font-semibold">Description</th>
                              <th className="border border-gray-300 p-2 text-left font-semibold">Indicators</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rubric.levels.map((level, levelIndex) => (
                              <tr key={levelIndex} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-2">
                                  <Badge variant="outline" className="capitalize">
                                    {level.level}
                                  </Badge>
                                </td>
                                <td className="border border-gray-300 p-2">
                                  <Badge variant="secondary">
                                    {level.score}
                                  </Badge>
                                </td>
                                <td className="border border-gray-300 p-2 text-sm">
                                  {level.description}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  <ul className="text-sm space-y-1">
                                    {level.indicators.map((indicator, indicatorIndex) => (
                                      <li key={indicatorIndex} className="flex items-start gap-1">
                                        <span className="text-blue-500">•</span>
                                        {indicator}
                                      </li>
                                    ))}
                                  </ul>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6">
            {/* Lesson Objectives */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lesson.objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{objective}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{lesson.duration}</div>
                  <div className="text-sm text-gray-600">Total Minutes</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{lesson.fullContent.multimediaContent.length}</div>
                  <div className="text-sm text-gray-600">Multimedia Items</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{lesson.fullContent.differentiatedActivities.length}</div>
                  <div className="text-sm text-gray-600">Differentiated Activities</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{lesson.fullContent.assessmentRubrics.length}</div>
                  <div className="text-sm text-gray-600">Assessment Rubrics</div>
                </CardContent>
              </Card>
            </div>

            {/* Lesson Structure Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Lesson Structure Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Introduction", duration: lesson.fullContent.fullLessonContent.introduction.duration, color: "bg-blue-500" },
                    { name: "Development", duration: lesson.fullContent.fullLessonContent.development.duration, color: "bg-green-500" },
                    { name: "Practice", duration: lesson.fullContent.fullLessonContent.practice.duration, color: "bg-yellow-500" },
                    { name: "Assessment", duration: lesson.fullContent.fullLessonContent.assessment.duration, color: "bg-orange-500" },
                    { name: "Closure", duration: lesson.fullContent.fullLessonContent.closure.duration, color: "bg-purple-500" }
                  ].map((phase, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${phase.color}`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{phase.name}</span>
                          <span className="text-sm text-gray-600">{phase.duration} min</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${phase.color}`}
                            style={{ width: `${(phase.duration / lesson.duration) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}