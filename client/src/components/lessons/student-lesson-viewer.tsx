import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  Target, 
  BookOpen,
  Users,
  CheckCircle,
  Play,
  PauseCircle,
  ArrowRight,
  Lightbulb,
  Brain,
  PenTool,
  Image,
  Video,
  FileText,
  Award,
  ExternalLink
} from "lucide-react";
import AssessmentLinkCard from "../assessments/assessment-link-card";

interface StudentLessonData {
  id: number;
  title: string;
  description: string;
  duration: number;
  objectives: string[];
  fullContent?: any;
  multimediaContent?: any;
  relatedAssessments?: Array<{
    id: number;
    title: string;
    description: string;
    duration: number;
    questionCount: number;
    assessmentType: string;
    difficulty: string;
  }>;
}

interface StudentLessonViewerProps {
  lesson: StudentLessonData;
  onComplete?: () => void;
}

export default function StudentLessonViewer({ lesson, onComplete }: StudentLessonViewerProps) {
  const [currentSection, setCurrentSection] = useState("objectives");
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  // Parse lesson content safely
  const parsedContent = lesson.fullContent && typeof lesson.fullContent === 'string' 
    ? JSON.parse(lesson.fullContent) 
    : lesson.fullContent;

  const sections = [
    { id: "objectives", title: "Learning Objectives", icon: Target, color: "bg-blue-50 text-blue-700" },
    { id: "introduction", title: "Introduction", icon: Lightbulb, color: "bg-yellow-50 text-yellow-700" },
    { id: "main-content", title: "Main Learning", icon: BookOpen, color: "bg-green-50 text-green-700" },
    { id: "activities", title: "Activities", icon: PenTool, color: "bg-purple-50 text-purple-700" },
    { id: "practice", title: "Practice", icon: Brain, color: "bg-orange-50 text-orange-700" },
    { id: "assessments", title: "Assessments", icon: FileText, color: "bg-indigo-50 text-indigo-700" },
    { id: "summary", title: "Summary", icon: CheckCircle, color: "bg-teal-50 text-teal-700" }
  ];

  const markSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      const newCompleted = [...completedSections, sectionId];
      setCompletedSections(newCompleted);
      setProgress((newCompleted.length / sections.length) * 100);
    }
  };

  const getNextSection = () => {
    const currentIndex = sections.findIndex(s => s.id === currentSection);
    return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
  };

  const renderMediaContent = (content: any) => {
    if (!content || !content.multimediaContent) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {content.multimediaContent.map((media: any, index: number) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              {media.type === 'video' && <Video className="w-12 h-12 text-gray-400" />}
              {media.type === 'image' && <Image className="w-12 h-12 text-gray-400" />}
              {media.type === 'diagram' && <FileText className="w-12 h-12 text-gray-400" />}
            </div>
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-2">{media.title}</h4>
              <p className="text-xs text-gray-600 mb-2">{media.description}</p>
              <Badge variant="outline" className="text-xs">
                {media.type}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
        <p className="text-gray-600 text-lg">{lesson.description}</p>
        
        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Lesson Info */}
        <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{lesson.duration} minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>{lesson.objectives.length} objectives</span>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = currentSection === section.id;
          const isCompleted = completedSections.includes(section.id);
          
          return (
            <Button
              key={section.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentSection(section.id)}
              className={`flex items-center gap-2 ${isCompleted ? 'border-green-500 bg-green-50' : ''}`}
            >
              <Icon className="w-4 h-4" />
              {section.title}
              {isCompleted && <CheckCircle className="w-4 h-4 text-green-600" />}
            </Button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="min-h-[600px]">
        {/* Learning Objectives Section */}
        {currentSection === "objectives" && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Target className="w-6 h-6 text-blue-600" />
                What You'll Learn Today
              </CardTitle>
              <CardDescription>
                By the end of this lesson, you will be able to:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {lesson.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-800 leading-relaxed">{objective}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center pt-6">
                <Button 
                  onClick={() => {
                    markSectionComplete("objectives");
                    setCurrentSection("introduction");
                  }}
                  className="flex items-center gap-2"
                >
                  Ready to Start Learning
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Introduction Section */}
        {currentSection === "introduction" && parsedContent?.fullLessonContent?.introduction && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
                Let's Get Started!
              </CardTitle>
              <CardDescription>
                Duration: {parsedContent.fullLessonContent.introduction.duration} minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hook Activity */}
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Hook Activity
                </h3>
                <p className="text-gray-800 leading-relaxed">
                  {parsedContent.fullLessonContent.introduction.hook}
                </p>
              </div>

              {/* Learning Goals */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Today's Learning Goals</h3>
                <div className="grid gap-3">
                  {parsedContent.fullLessonContent.introduction.learningGoals.map((goal: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span className="text-gray-800">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Criteria */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Success Criteria</h3>
                <div className="grid gap-3">
                  {parsedContent.fullLessonContent.introduction.success_criteria.map((criteria: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                      <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                      <span className="text-gray-800">{criteria}</span>
                    </div>
                  ))}
                </div>
              </div>

              {renderMediaContent(parsedContent)}

              <div className="text-center pt-6">
                <Button 
                  onClick={() => {
                    markSectionComplete("introduction");
                    setCurrentSection("main-content");
                  }}
                  className="flex items-center gap-2"
                >
                  Continue to Main Content
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Section */}
        {currentSection === "main-content" && parsedContent?.fullLessonContent?.development && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <BookOpen className="w-6 h-6 text-green-600" />
                Main Learning Content
              </CardTitle>
              <CardDescription>
                Duration: {parsedContent.fullLessonContent.development.duration} minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Content */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Key Concepts</h3>
                {parsedContent.fullLessonContent.development.mainContent.map((content: string, index: number) => (
                  <div key={index} className="p-4 bg-green-50 rounded-lg">
                    <p className="text-gray-800 leading-relaxed">{content}</p>
                  </div>
                ))}
              </div>

              {/* Key Explanations */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Important Explanations</h3>
                {parsedContent.fullLessonContent.development.keyExplanations.map((explanation: string, index: number) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <p className="text-gray-800 leading-relaxed">{explanation}</p>
                  </div>
                ))}
              </div>

              {/* Demonstrations */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Demonstrations</h3>
                {parsedContent.fullLessonContent.development.demonstrations.map((demo: string, index: number) => (
                  <div key={index} className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-gray-800 leading-relaxed">{demo}</p>
                  </div>
                ))}
              </div>

              {renderMediaContent(parsedContent)}

              <div className="text-center pt-6">
                <Button 
                  onClick={() => {
                    markSectionComplete("main-content");
                    setCurrentSection("practice");
                  }}
                  className="flex items-center gap-2"
                >
                  Let's Practice!
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Practice Section */}
        {currentSection === "practice" && parsedContent?.fullLessonContent?.practice && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Brain className="w-6 h-6 text-purple-600" />
                Practice Time
              </CardTitle>
              <CardDescription>
                Duration: {parsedContent.fullLessonContent.practice.duration} minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Guided Practice */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Guided Practice (With Teacher)
                </h3>
                {parsedContent.fullLessonContent.practice.guidedPractice.map((practice: string, index: number) => (
                  <div key={index} className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-gray-800 leading-relaxed">{practice}</p>
                  </div>
                ))}
              </div>

              {/* Independent Practice */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <PenTool className="w-5 h-5" />
                  Independent Practice (On Your Own)
                </h3>
                {parsedContent.fullLessonContent.practice.independentPractice.map((practice: string, index: number) => (
                  <div key={index} className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-gray-800 leading-relaxed">{practice}</p>
                  </div>
                ))}
              </div>

              <div className="text-center pt-6">
                <Button 
                  onClick={() => {
                    markSectionComplete("practice");
                    setCurrentSection("summary");
                  }}
                  className="flex items-center gap-2"
                >
                  Complete Practice
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Assessments Section */}
        {currentSection === "assessments" && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <FileText className="w-6 h-6 text-indigo-600" />
                Related Assessments
              </CardTitle>
              <CardDescription>
                Practice your understanding with these assessments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {lesson.relatedAssessments && lesson.relatedAssessments.length > 0 ? (
                <div className="grid gap-4">
                  {lesson.relatedAssessments.map((assessment) => (
                    <AssessmentLinkCard
                      key={assessment.id}
                      assessmentId={assessment.id}
                      title={assessment.title}
                      description={assessment.description}
                      duration={assessment.duration}
                      questionCount={assessment.questionCount}
                      assessmentType={assessment.assessmentType}
                      difficulty={assessment.difficulty}
                      onView={() => {
                        // Navigate to assessment view
                        console.log(`Viewing assessment ${assessment.id}`);
                      }}
                      onTakeAssessment={() => {
                        // Navigate to assessment taking interface
                        console.log(`Taking assessment ${assessment.id}`);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Assessments Available</h3>
                  <p className="text-gray-600">
                    No assessments have been created for this lesson yet. Check back later or ask your teacher to create some assessments.
                  </p>
                </div>
              )}

              <div className="text-center pt-6">
                <Button 
                  onClick={() => {
                    markSectionComplete("assessments");
                    setCurrentSection("summary");
                  }}
                  className="flex items-center gap-2"
                >
                  Continue to Summary
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Section */}
        {currentSection === "summary" && parsedContent?.fullLessonContent?.closure && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6 text-teal-600" />
                Lesson Complete!
              </CardTitle>
              <CardDescription>
                Great job completing this lesson!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Summary Points */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Key Takeaways</h3>
                {parsedContent.fullLessonContent.closure.summary.map((point: string, index: number) => (
                  <div key={index} className="p-4 bg-teal-50 rounded-lg">
                    <p className="text-gray-800 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>

              {/* Homework */}
              {parsedContent.fullLessonContent.closure.homework.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Homework</h3>
                  {parsedContent.fullLessonContent.closure.homework.map((hw: string, index: number) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-800 leading-relaxed">{hw}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Next Lesson Preview */}
              {parsedContent.fullLessonContent.closure.nextLesson && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Next Lesson Preview</h3>
                  <p className="text-gray-800 leading-relaxed">{parsedContent.fullLessonContent.closure.nextLesson}</p>
                </div>
              )}

              <div className="text-center pt-6">
                <Button 
                  onClick={() => {
                    markSectionComplete("summary");
                    if (onComplete) onComplete();
                  }}
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700"
                >
                  <Award className="w-4 h-4" />
                  Mark Lesson Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-6">
        <div className="text-sm text-gray-500">
          Section {sections.findIndex(s => s.id === currentSection) + 1} of {sections.length}
        </div>
        <div className="flex gap-2">
          {currentSection !== "objectives" && (
            <Button 
              variant="outline" 
              onClick={() => {
                const currentIndex = sections.findIndex(s => s.id === currentSection);
                if (currentIndex > 0) {
                  setCurrentSection(sections[currentIndex - 1].id);
                }
              }}
            >
              Previous
            </Button>
          )}
          {getNextSection() && (
            <Button 
              onClick={() => {
                const nextSection = getNextSection();
                if (nextSection) {
                  markSectionComplete(currentSection);
                  setCurrentSection(nextSection.id);
                }
              }}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}