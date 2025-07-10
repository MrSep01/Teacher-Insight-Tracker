import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Eye, Edit, Clock, Target, Users, BookOpen, CheckCircle, Lightbulb, FlaskConical, FileText, MessageSquare, Bot, Trash2 } from "lucide-react";
import { EnhancedLessonCreator } from "./enhanced-lesson-creator";
import { EnhancedAssessmentCreator } from "./enhanced-assessment-creator";
import ComprehensiveLessonForm from "./lessons/comprehensive-lesson-form";
import ManualLessonCreator from "./lessons/manual-lesson-creator";
import SimpleComprehensiveLessonViewer from "./lessons/simple-comprehensive-viewer";

// Types
interface Module {
  id: number;
  title: string;
  description: string;
  objectives: string[];
  topics: string[];
  estimatedHours: number;
  createdAt: string;
}

interface LessonManagementProps {
  module: Module;
  onClose: () => void;
}

interface LessonPlan {
  id: number;
  moduleId: number;
  title: string;
  description: string;
  lessonType: "lecture" | "practical" | "project" | "assessment" | "discussion" | "fieldwork";
  objectives: string[];
  activities: string[];
  resources: string[];
  equipment?: string[];
  safetyNotes?: string;
  duration: number;
  difficulty: "basic" | "intermediate" | "advanced";
  targetStudents: string[];
  prerequisites: string[];
  assessmentCriteria: string[];
  differentiation?: string;
  homework?: string;
  hasAssessment: boolean;
  assessmentType?: "formative" | "summative";
  assessmentDescription?: string;
  assessmentDuration?: number;
  assessmentPoints?: number;
  assessmentCriteriaLesson?: string[];
  rubric?: string;
  aiGenerated: boolean;
  aiSuggestions?: string;
  isCompleted: boolean;
  sequenceOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface AssessmentManagementProps {
  moduleId: number;
  moduleObjectives: string[];
}

interface Assessment {
  id: number;
  title: string;
  description: string;
  assessmentType: "formative" | "summative" | "diagnostic" | "practice";
  totalPoints: number;
  estimatedDuration: number;
  difficulty: "basic" | "intermediate" | "advanced" | "mixed";
  questionCount: number;
  allowRetakes: boolean;
  showCorrectAnswers: boolean;
  passingScore: number;
  createdAt: string;
  instructions?: string;
  objectives?: string[];
  topics?: string[];
  questionTypes?: string[];
  markingScheme?: string;
  aiGenerated?: boolean;
}

const LESSON_TYPES = [
  { value: "lecture", label: "Lecture", icon: BookOpen },
  { value: "practical", label: "Practical", icon: FlaskConical },
  { value: "project", label: "Project", icon: Target },
  { value: "assessment", label: "Assessment", icon: CheckCircle },
  { value: "discussion", label: "Discussion", icon: MessageSquare },
  { value: "fieldwork", label: "Fieldwork", icon: Users },
];

function getLessonTypeIcon(type: string) {
  const lessonType = LESSON_TYPES.find(t => t.value === type);
  return lessonType ? lessonType.icon : BookOpen;
}

function getLessonTypeColor(type: string) {
  const colors = {
    lecture: "bg-blue-100 text-blue-800",
    practical: "bg-green-100 text-green-800",
    project: "bg-purple-100 text-purple-800",
    assessment: "bg-orange-100 text-orange-800",
    discussion: "bg-yellow-100 text-yellow-800",
    fieldwork: "bg-red-100 text-red-800",
  };
  return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
}

function AssessmentSummary({ assessment }: { assessment: LessonPlan }) {
  if (!assessment.hasAssessment) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <span className="text-sm font-medium">Assessment Included</span>
        <Badge variant="outline" className="text-xs">
          {assessment.assessmentType}
        </Badge>
      </div>
      
      {assessment.assessmentDescription && (
        <p className="text-sm text-gray-600 ml-6">
          {assessment.assessmentDescription}
        </p>
      )}
      
      <div className="flex items-center space-x-4 text-xs text-gray-500 ml-6">
        {assessment.assessmentDuration && (
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{assessment.assessmentDuration} min</span>
          </div>
        )}
        {assessment.assessmentPoints && (
          <div className="flex items-center space-x-1">
            <Target className="h-3 w-3" />
            <span>{assessment.assessmentPoints} pts</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Main LessonManagement component
export function LessonManagement({ module, onClose }: LessonManagementProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewLessonModalOpen, setIsViewLessonModalOpen] = useState(false);
  const [viewingLesson, setViewingLesson] = useState<LessonPlan | null>(null);
  const [creationMode, setCreationMode] = useState<"ai" | "manual">("ai");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch lessons for this module
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: [`/api/modules/${module.id}/lessons`],
    queryFn: async () => {
      const response = await apiRequest(`/api/modules/${module.id}/lessons`);
      return response as LessonPlan[];
    },
  });

  const handleViewLesson = async (lesson: LessonPlan) => {
    try {
      // Fetch comprehensive lesson data
      const comprehensiveData = await apiRequest(`/api/lessons/${lesson.id}/full-content`);
      console.log('Comprehensive lesson data:', comprehensiveData);
      
      // Check if we have comprehensive content (check for actual content, not just existence)
      const hasComprehensiveContent = (comprehensiveData.fullContent && typeof comprehensiveData.fullContent === 'object') || 
                                      (comprehensiveData.studentWorksheet && comprehensiveData.studentWorksheet.length > 0) || 
                                      (comprehensiveData.teachingScript && comprehensiveData.teachingScript.length > 0) || 
                                      (comprehensiveData.assessmentQuestions && comprehensiveData.assessmentQuestions.length > 0);
      
      console.log('Has comprehensive content:', hasComprehensiveContent, {
        fullContent: !!comprehensiveData.fullContent,
        studentWorksheet: !!comprehensiveData.studentWorksheet,
        teachingScript: !!comprehensiveData.teachingScript,
        assessmentQuestions: !!comprehensiveData.assessmentQuestions
      });
      
      if (hasComprehensiveContent) {
        setViewingLesson(comprehensiveData);
      } else {
        // Fallback to basic lesson data
        setViewingLesson(lesson);
      }
      setIsViewLessonModalOpen(true);
    } catch (error) {
      console.error('Error fetching comprehensive lesson data:', error);
      // Fallback to basic lesson data
      setViewingLesson(lesson);
      setIsViewLessonModalOpen(true);
    }
  };

  const handleEditLesson = (lesson: LessonPlan) => {
    toast({
      title: "Edit Lesson",
      description: `Opening editor for: ${lesson.title}`,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading lessons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{module.title}</h2>
          <p className="text-gray-600 mt-1">{module.description}</p>
        </div>
        <Button onClick={onClose} variant="outline">
          Close
        </Button>
      </div>

      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lessons" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Lesson Plans</h3>
              <p className="text-sm text-gray-600">
                {lessons.length} lesson{lessons.length !== 1 ? 's' : ''} in this module
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Create with:</label>
                <Select value={creationMode} onValueChange={(value: "ai" | "manual") => setCreationMode(value)}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai">AI</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!module.objectives || module.objectives.length === 0}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Lesson
              </Button>
            </div>
          </div>

          {lessons.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Lessons Yet</h3>
                <p className="text-gray-600 mb-4">
                  Create your first lesson plan for this module.
                </p>
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!module.objectives || module.objectives.length === 0}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Lesson
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {lessons.map((lesson) => {
                const IconComponent = getLessonTypeIcon(lesson.lessonType);
                return (
                  <Card key={lesson.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1" onClick={() => handleViewLesson(lesson)}>
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getLessonTypeColor(lesson.lessonType)}`}>
                                <IconComponent className="h-5 w-5" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getLessonTypeColor(lesson.lessonType)}>
                            {LESSON_TYPES.find(t => t.value === lesson.lessonType)?.label}
                          </Badge>
                          <Badge variant="outline" className={`${
                            lesson.difficulty === "basic" ? "border-green-300 text-green-700" :
                            lesson.difficulty === "intermediate" ? "border-yellow-300 text-yellow-700" :
                            "border-red-300 text-red-700"
                          }`}>
                            {lesson.difficulty}
                          </Badge>
                          {lesson.aiGenerated && (
                            <Badge variant="outline" className="border-purple-300 text-purple-700">
                              <Bot className="h-3 w-3 mr-1" />
                              AI
                            </Badge>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewLesson(lesson);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditLesson(lesson);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent onClick={() => handleViewLesson(lesson)}>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{lesson.duration} min</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Lightbulb className="h-4 w-4 text-gray-500" />
                          <span>{lesson.objectives.length} objectives</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="h-4 w-4 text-gray-500" />
                          <span>{lesson.activities.length} activities</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span>{lesson.resources.length} resources</span>
                        </div>
                      </div>
                      
                      {lesson.hasAssessment && (
                        <div className="mt-4 pt-4 border-t">
                          <AssessmentSummary assessment={lesson} />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="assessments">
          <AssessmentManagement moduleId={module.id} moduleObjectives={module.objectives || []} />
        </TabsContent>
      </Tabs>

      {/* Enhanced Lesson Creation Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {creationMode === "ai" ? "Generate AI Lesson" : "Create New Lesson Plan"}
            </DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="lessons" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
            </TabsList>
            <TabsContent value="lessons">
              {creationMode === "manual" ? (
                <ManualLessonCreator 
                  moduleId={module.id}
                  moduleObjectives={module.objectives || []}
                  onLessonCreated={() => setIsCreateModalOpen(false)}
                  onCancel={() => setIsCreateModalOpen(false)}
                />
              ) : (
                <ComprehensiveLessonForm 
                  moduleId={module.id}
                  moduleObjectives={module.objectives || []}
                  onLessonCreated={() => setIsCreateModalOpen(false)}
                  onCancel={() => setIsCreateModalOpen(false)}
                />
              )}
            </TabsContent>
            <TabsContent value="assessments">
              <EnhancedAssessmentCreator 
                moduleId={module.id}
                moduleObjectives={module.objectives || []}
                onAssessmentCreated={() => setIsCreateModalOpen(false)}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Comprehensive Lesson View Modal */}
      <Dialog open={isViewLessonModalOpen} onOpenChange={setIsViewLessonModalOpen}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
          {viewingLesson && ((viewingLesson.fullContent && typeof viewingLesson.fullContent === 'object') || 
                                     (viewingLesson.studentWorksheet && viewingLesson.studentWorksheet.length > 0) || 
                                     (viewingLesson.teachingScript && viewingLesson.teachingScript.length > 0) || 
                                     (viewingLesson.assessmentQuestions && viewingLesson.assessmentQuestions.length > 0)) && (
            <SimpleComprehensiveLessonViewer
              lesson={viewingLesson}
              onExport={() => {
                toast({
                  title: "Export Started",
                  description: "Your lesson materials are being prepared for download.",
                });
              }}
              onShare={() => {
                toast({
                  title: "Share Options",
                  description: "Share functionality will be available soon.",
                });
              }}
            />
          )}
          
          {/* Fallback to basic lesson view if no comprehensive content */}
          {viewingLesson && !(viewingLesson.fullContent && typeof viewingLesson.fullContent === 'object') && 
                        !(viewingLesson.studentWorksheet && viewingLesson.studentWorksheet.length > 0) && 
                        !(viewingLesson.teachingScript && viewingLesson.teachingScript.length > 0) && 
                        !(viewingLesson.assessmentQuestions && viewingLesson.assessmentQuestions.length > 0) && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  {(() => {
                    const IconComponent = getLessonTypeIcon(viewingLesson.lessonType);
                    return <IconComponent className="h-5 w-5 text-blue-600" />;
                  })()}
                  <span>{viewingLesson.title}</span>
                  <Badge className={getLessonTypeColor(viewingLesson.lessonType)}>
                    {LESSON_TYPES.find(t => t.value === viewingLesson.lessonType)?.label}
                  </Badge>
                  {viewingLesson.aiGenerated && (
                    <Badge variant="outline" className="border-purple-300 text-purple-700">
                      <Bot className="h-3 w-3 mr-1" />
                      AI Generated
                    </Badge>
                  )}
                </DialogTitle>
              </DialogHeader>
              
              <div className="text-center py-8">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Basic Lesson View</h3>
                <p className="text-gray-600 mb-4">
                  This lesson doesn't have comprehensive content yet. Only basic information is available.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Description</h4>
                    <p className="text-sm text-gray-600">{viewingLesson.description}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Duration</h4>
                    <p className="text-sm text-gray-600">{viewingLesson.duration} minutes</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Objectives</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {viewingLesson.objectives.map((objective, index) => (
                        <li key={index}>• {objective}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Assessment Management Component
function AssessmentManagement({ moduleId, moduleObjectives }: AssessmentManagementProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewAssessmentModalOpen, setIsViewAssessmentModalOpen] = useState(false);
  const [viewingAssessment, setViewingAssessment] = useState<Assessment | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch assessments for this module
  const { data: assessments = [], isLoading } = useQuery({
    queryKey: [`/api/modules/${moduleId}/assessments`],
    queryFn: async () => {
      const response = await apiRequest(`/api/modules/${moduleId}/assessments`);
      return response as Assessment[];
    },
  });

  const getAssessmentTypeColor = (type: string) => {
    const colors = {
      formative: "bg-green-100 text-green-800",
      summative: "bg-blue-100 text-blue-800",
      diagnostic: "bg-purple-100 text-purple-800",
      practice: "bg-yellow-100 text-yellow-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      basic: "bg-emerald-100 text-emerald-800",
      intermediate: "bg-amber-100 text-amber-800",
      advanced: "bg-red-100 text-red-800",
      mixed: "bg-indigo-100 text-indigo-800",
    };
    return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const handleViewAssessment = (assessment: Assessment) => {
    setViewingAssessment(assessment);
    setIsViewAssessmentModalOpen(true);
  };

  const handleEditAssessment = (assessment: Assessment) => {
    toast({
      title: "Edit Assessment",
      description: `Opening editor for: ${assessment.title}`,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading assessments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">Assessments</h4>
          <p className="text-sm text-gray-600">
            {assessments.length} assessment{assessments.length !== 1 ? 's' : ''} in this module
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          size="sm"
          className="bg-green-600 hover:bg-green-700"
          disabled={!moduleObjectives || moduleObjectives.length === 0}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Assessment
        </Button>
      </div>

      {assessments.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Assessments Yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first assessment for this module.
            </p>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-green-600 hover:bg-green-700"
              disabled={!moduleObjectives || moduleObjectives.length === 0}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Assessment
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {assessments.map((assessment) => (
            <Card key={assessment.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1" onClick={() => handleViewAssessment(assessment)}>
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getAssessmentTypeColor(assessment.assessmentType)}`}>
                          <FileText className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{assessment.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{assessment.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getAssessmentTypeColor(assessment.assessmentType)}>
                      {assessment.assessmentType}
                    </Badge>
                    <Badge className={getDifficultyColor(assessment.difficulty)}>
                      {assessment.difficulty}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewAssessment(assessment);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAssessment(assessment);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent onClick={() => handleViewAssessment(assessment)}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{assessment.estimatedDuration} min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-gray-500" />
                    <span>{assessment.totalPoints} points</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    <span>{assessment.questionCount} questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span>{assessment.passingScore}% pass</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span className={assessment.allowRetakes ? "text-green-600" : "text-red-600"}>
                        {assessment.allowRetakes ? "Retakes Allowed" : "No Retakes"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className={assessment.showCorrectAnswers ? "text-green-600" : "text-red-600"}>
                        {assessment.showCorrectAnswers ? "Answers Shown" : "Answers Hidden"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Assessment View Modal */}
      <Dialog open={isViewAssessmentModalOpen} onOpenChange={setIsViewAssessmentModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {viewingAssessment && (
                <>
                  <FileText className="h-5 w-5 text-green-600" />
                  <span>{viewingAssessment.title}</span>
                  <Badge className={getAssessmentTypeColor(viewingAssessment.assessmentType)}>
                    {viewingAssessment.assessmentType}
                  </Badge>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {viewingAssessment && (
            <div className="space-y-6">
              {/* Assessment Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Duration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-lg font-medium">{viewingAssessment.estimatedDuration} min</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Total Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <span className="text-lg font-medium">{viewingAssessment.totalPoints}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <span className="text-lg font-medium">{viewingAssessment.questionCount}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Passing Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-gray-500" />
                      <span className="text-lg font-medium">{viewingAssessment.passingScore}%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{viewingAssessment.description}</p>
                </CardContent>
              </Card>

              {/* Assessment Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className={`h-4 w-4 ${viewingAssessment.allowRetakes ? 'text-green-600' : 'text-gray-400'}`} />
                      <span className="text-sm">Allow Retakes: {viewingAssessment.allowRetakes ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className={`h-4 w-4 ${viewingAssessment.showCorrectAnswers ? 'text-green-600' : 'text-gray-400'}`} />
                      <span className="text-sm">Show Correct Answers: {viewingAssessment.showCorrectAnswers ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Difficulty Level */}
              <Card>
                <CardHeader>
                  <CardTitle>Difficulty & Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Badge className={getDifficultyColor(viewingAssessment.difficulty)}>
                      {viewingAssessment.difficulty}
                    </Badge>
                    <Badge className={getAssessmentTypeColor(viewingAssessment.assessmentType)}>
                      {viewingAssessment.assessmentType}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Enhanced Assessment Creation Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Assessment</DialogTitle>
          </DialogHeader>
          <EnhancedAssessmentCreator 
            moduleId={moduleId}
            moduleObjectives={moduleObjectives}
            onAssessmentCreated={() => setIsCreateModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}