import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Users,
  BookOpen,
  Target,
  Lightbulb,
  MessageSquare,
  Settings,
  FileText,
  Timer,
  AlertCircle,
  HelpCircle,
  ArrowRight
} from "lucide-react";

interface TeacherGuideData {
  id: number;
  title: string;
  description: string;
  duration: number;
  objectives: string[];
  fullContent?: any;
  teachingScript?: string;
}

interface TeacherGuideViewerProps {
  lesson: TeacherGuideData;
  onPrint?: () => void;
}

export default function TeacherGuideViewer({ lesson, onPrint }: TeacherGuideViewerProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Parse lesson content safely
  const parsedContent = lesson.fullContent && typeof lesson.fullContent === 'string' 
    ? JSON.parse(lesson.fullContent) 
    : lesson.fullContent;

  const teacherGuide = parsedContent?.teacherGuide;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher's Guide</h1>
          <h2 className="text-xl text-gray-600 mt-2">{lesson.title}</h2>
          <p className="text-gray-500 mt-1">{lesson.description}</p>
        </div>
        <div className="flex gap-2">
          {onPrint && (
            <Button onClick={onPrint} variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Print Guide
            </Button>
          )}
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-semibold">Duration</p>
                <p className="text-sm text-gray-600">{lesson.duration} minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-semibold">Objectives</p>
                <p className="text-sm text-gray-600">{lesson.objectives.length} learning goals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-semibold">Class Size</p>
                <p className="text-sm text-gray-600">Any size</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="preparation">Preparation</TabsTrigger>
          <TabsTrigger value="timing">Timing Guide</TabsTrigger>
          <TabsTrigger value="script">Teaching Script</TabsTrigger>
          <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          <TabsTrigger value="adaptations">Adaptations</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Lesson Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {teacherGuide?.lessonOverview && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-800 leading-relaxed">{teacherGuide.lessonOverview}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Learning Objectives */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Learning Objectives</h3>
                  <div className="space-y-2">
                    {lesson.objectives.map((objective, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                        <Target className="w-4 h-4 text-green-600 mt-0.5" />
                        <span className="text-sm text-gray-800">{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Teaching Points */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Key Teaching Points</h3>
                  <div className="space-y-2">
                    {parsedContent?.fullLessonContent?.development?.keyExplanations?.slice(0, 3).map((point: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                        <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <span className="text-sm text-gray-800">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preparation Tab */}
        <TabsContent value="preparation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Preparation Checklist
              </CardTitle>
              <CardDescription>
                Complete these tasks before the lesson begins
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teacherGuide?.preparationChecklist ? (
                <div className="space-y-3">
                  {teacherGuide.preparationChecklist.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <input type="checkbox" className="mt-1" />
                      <span className="text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-gray-800">Review lesson objectives and key concepts</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-gray-800">Prepare materials and resources</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-gray-800">Set up classroom environment</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-gray-800">Review student worksheets</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timing Guide Tab */}
        <TabsContent value="timing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                Lesson Timing Guide
              </CardTitle>
              <CardDescription>
                Detailed timing for each lesson segment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teacherGuide?.timingGuide ? (
                <div className="space-y-4">
                  {teacherGuide.timingGuide.map((segment: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg">{segment.segment}</h3>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {segment.duration} min
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Teacher Actions</h4>
                          <ul className="space-y-1">
                            {segment.teacherActions.map((action: string, actionIndex: number) => (
                              <li key={actionIndex} className="text-sm text-gray-600 flex items-start gap-2">
                                <ArrowRight className="w-3 h-3 mt-0.5" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Student Actions</h4>
                          <ul className="space-y-1">
                            {segment.studentActions.map((action: string, actionIndex: number) => (
                              <li key={actionIndex} className="text-sm text-gray-600 flex items-start gap-2">
                                <Users className="w-3 h-3 mt-0.5" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {segment.keyPoints && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-sm text-blue-800 mb-2">Key Points to Emphasize</h4>
                          <ul className="space-y-1">
                            {segment.keyPoints.map((point: string, pointIndex: number) => (
                              <li key={pointIndex} className="text-sm text-blue-700 flex items-start gap-2">
                                <Lightbulb className="w-3 h-3 mt-0.5" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">Introduction</h3>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {parsedContent?.fullLessonContent?.introduction?.duration || 10} min
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Hook activity, objectives, and lesson overview</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">Main Teaching</h3>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {parsedContent?.fullLessonContent?.development?.duration || 20} min
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Core content delivery and demonstrations</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">Practice</h3>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {parsedContent?.fullLessonContent?.practice?.duration || 10} min
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Guided and independent practice activities</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">Closure</h3>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        5 min
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Summary and homework assignment</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Teaching Script Tab */}
        <TabsContent value="script" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Teaching Script
              </CardTitle>
              <CardDescription>
                Word-for-word script with timing and key phrases
              </CardDescription>
            </CardHeader>
            <CardContent>
              {lesson.teachingScript ? (
                <div className="whitespace-pre-wrap text-sm bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                  {lesson.teachingScript}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No teaching script available for this lesson</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Troubleshooting Tab */}
        <TabsContent value="troubleshooting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Common Issues & Solutions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {teacherGuide?.commonMisconceptions ? (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Common Misconceptions</h3>
                  {teacherGuide.commonMisconceptions.map((misconception: any, index: number) => (
                    <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-red-800 mb-2">Misconception</h4>
                          <p className="text-sm text-red-700 mb-3">{misconception.misconception}</p>
                          
                          <h4 className="font-medium text-green-800 mb-2">Correction</h4>
                          <p className="text-sm text-green-700 mb-3">{misconception.correction}</p>
                          
                          <h4 className="font-medium text-blue-800 mb-2">Teaching Strategy</h4>
                          <p className="text-sm text-blue-700">{misconception.teachingStrategy}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800 mb-2">Students seem confused</h4>
                        <p className="text-sm text-yellow-700">Slow down, provide more examples, and check for understanding frequently</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800 mb-2">Running out of time</h4>
                        <p className="text-sm text-yellow-700">Focus on key concepts and assign remaining content as homework</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800 mb-2">Students finish early</h4>
                        <p className="text-sm text-yellow-700">Provide extension activities or have them help peers</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {teacherGuide?.troubleshootingTips && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Troubleshooting Tips</h3>
                  <div className="grid gap-3">
                    {teacherGuide.troubleshootingTips.map((tip: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                        <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                        <span className="text-sm text-gray-800">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Adaptations Tab */}
        <TabsContent value="adaptations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Lesson Adaptations
              </CardTitle>
              <CardDescription>
                Modifications for different learning needs and contexts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teacherGuide?.adaptationSuggestions ? (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Adaptation Suggestions</h3>
                  {teacherGuide.adaptationSuggestions.map((suggestion: string, index: number) => (
                    <div key={index} className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-gray-800 leading-relaxed">{suggestion}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">For Struggling Students</h4>
                      <ul className="space-y-1 text-sm text-blue-700">
                        <li>• Provide additional visual aids</li>
                        <li>• Break down complex concepts</li>
                        <li>• Offer one-on-one support</li>
                        <li>• Use peer tutoring</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">For Advanced Students</h4>
                      <ul className="space-y-1 text-sm text-green-700">
                        <li>• Provide extension activities</li>
                        <li>• Ask higher-order questions</li>
                        <li>• Assign leadership roles</li>
                        <li>• Offer additional challenges</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-medium text-yellow-800 mb-2">For ELL Students</h4>
                      <ul className="space-y-1 text-sm text-yellow-700">
                        <li>• Use visual vocabulary cards</li>
                        <li>• Provide sentence frames</li>
                        <li>• Allow native language support</li>
                        <li>• Use hands-on activities</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-800 mb-2">For Different Learning Styles</h4>
                      <ul className="space-y-1 text-sm text-purple-700">
                        <li>• Visual: diagrams, charts, videos</li>
                        <li>• Auditory: discussions, music</li>
                        <li>• Kinesthetic: hands-on activities</li>
                        <li>• Reading/Writing: note-taking, journals</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {teacherGuide?.followUpActivities && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Follow-Up Activities</h3>
                  <div className="grid gap-3">
                    {teacherGuide.followUpActivities.map((activity: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                        <ArrowRight className="w-4 h-4 text-gray-600 mt-0.5" />
                        <span className="text-sm text-gray-800">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}