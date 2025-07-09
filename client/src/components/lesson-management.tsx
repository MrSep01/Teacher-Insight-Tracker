import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { AssessmentForm, AssessmentTypeBadge, AssessmentSummary } from "@/components/assessment-form";
import { EnhancedLessonCreator } from "@/components/enhanced-lesson-creator";
import { EnhancedAssessmentCreator } from "@/components/enhanced-assessment-creator";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  Target, 
  FlaskConical,
  Presentation,
  MessageSquare,
  FileText,
  Lightbulb,
  MapPin,
  Bot,
  User,
  BookOpen,
  CheckCircle,
  Circle,
  Eye
} from "lucide-react";
import type { Module } from "@shared/schema";

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
  // Assessment components
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

const LESSON_TYPES = [
  { value: "lecture", label: "Lecture", icon: Presentation, description: "Traditional teacher-led instruction" },
  { value: "practical", label: "Practical", icon: FlaskConical, description: "Laboratory experiments and hands-on activities" },
  { value: "project", label: "Project", icon: Target, description: "Extended project-based learning" },
  { value: "assessment", label: "Assessment", icon: FileText, description: "Tests, quizzes, and evaluations" },
  { value: "discussion", label: "Discussion", icon: MessageSquare, description: "Collaborative discussions and debates" },
  { value: "fieldwork", label: "Fieldwork", icon: MapPin, description: "Off-site learning experiences" },
];

export function LessonManagement({ module, onClose }: LessonManagementProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonPlan | null>(null);
  const [creationMode, setCreationMode] = useState<"manual" | "ai">("manual");
  const [isViewLessonModalOpen, setIsViewLessonModalOpen] = useState(false);
  const [isViewAssessmentModalOpen, setIsViewAssessmentModalOpen] = useState(false);
  const [viewingLesson, setViewingLesson] = useState<LessonPlan | null>(null);
  const [viewingAssessment, setViewingAssessment] = useState<Assessment | null>(null);
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

  // Create lesson mutation
  const createLessonMutation = useMutation({
    mutationFn: async (data: Partial<LessonPlan>) => {
      return await apiRequest(`/api/modules/${module.id}/lessons`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Lesson created successfully",
        description: "Your lesson plan has been added to the module.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/modules/${module.id}/lessons`] });
      setIsCreateModalOpen(false);
      setSelectedLesson(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating lesson",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Generate AI lesson mutation
  const generateAILessonMutation = useMutation({
    mutationFn: async (data: { lessonType: string; topic: string; duration: number; difficulty: string }) => {
      return await apiRequest(`/api/modules/${module.id}/lessons/generate`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "AI lesson generated successfully",
        description: "Your lesson plan has been created and added to the module.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/modules/${module.id}/lessons`] });
      setIsCreateModalOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error generating AI lesson",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCreateLesson = () => {
    if (!module.objectives || module.objectives.length === 0) {
      toast({
        title: "No objectives found",
        description: "Please add at least one objective to the module before creating lessons.",
        variant: "destructive",
      });
      return;
    }
    setCreationMode("manual");
    setSelectedLesson(null);
    setIsCreateModalOpen(true);
  };

  const handleGenerateAILesson = () => {
    if (!module.objectives || module.objectives.length === 0) {
      toast({
        title: "No objectives found",
        description: "Please add at least one objective to the module before generating lessons.",
        variant: "destructive",
      });
      return;
    }
    setCreationMode("ai");
    setSelectedLesson(null);
    setIsCreateModalOpen(true);
  };



  const handleEditLesson = (lesson: LessonPlan) => {
    toast({
      title: "Edit Lesson",
      description: `Opening editor for: ${lesson.title}`,
    });
    setSelectedLesson(lesson);
    setCreationMode("manual");
    setIsCreateModalOpen(true);
  };

  const handleViewLesson = (lesson: LessonPlan) => {
    setViewingLesson(lesson);
    setIsViewLessonModalOpen(true);
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

  const getLessonTypeIcon = (type: string) => {
    const lessonType = LESSON_TYPES.find(t => t.value === type);
    return lessonType ? lessonType.icon : BookOpen;
  };

  const getLessonTypeColor = (type: string) => {
    const colors = {
      lecture: "bg-blue-100 text-blue-800",
      practical: "bg-green-100 text-green-800",
      project: "bg-purple-100 text-purple-800",
      assessment: "bg-red-100 text-red-800",
      discussion: "bg-yellow-100 text-yellow-800",
      fieldwork: "bg-orange-100 text-orange-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
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
      {/* Module objectives warning */}
      {(!module.objectives || module.objectives.length === 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Module Setup Required
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  This module needs at least one objective before lessons can be created. 
                  Please add objectives to enable lesson creation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header with action buttons */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Lesson Plans</h3>
          <p className="text-sm text-gray-600">
            {lessons.length} lesson{lessons.length !== 1 ? 's' : ''} in this module
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={handleCreateLesson}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!module.objectives || module.objectives.length === 0}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Lesson
          </Button>
          <Button
            onClick={handleGenerateAILesson}
            size="sm"
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
            disabled={!module.objectives || module.objectives.length === 0}
          >
            <Bot className="h-4 w-4 mr-2" />
            AI Generate
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lessons">Lessons ({lessons.length})</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lessons">
          {lessons.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Lessons Yet</h3>
                <p className="text-gray-600 mb-4">
                  Create your first lesson plan for this module.
                </p>
                <div className="flex justify-center space-x-2">
                  <Button
                    onClick={handleCreateLesson}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!module.objectives || module.objectives.length === 0}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Manual Lesson
                  </Button>
                  <Button
                    onClick={handleGenerateAILesson}
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                    disabled={!module.objectives || module.objectives.length === 0}
                  >
                    <Bot className="h-4 w-4 mr-2" />
                    Generate with AI
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {lessons.map((lesson, index) => {
                const IconComponent = getLessonTypeIcon(lesson.lessonType);
                return (
                  <Card key={lesson.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3" onClick={() => handleViewLesson(lesson)}>
                          <div className="mt-1">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <CardTitle className="text-lg hover:text-blue-600 cursor-pointer">{lesson.title}</CardTitle>
                              <Badge className={getLessonTypeColor(lesson.lessonType)}>
                                {LESSON_TYPES.find(t => t.value === lesson.lessonType)?.label}
                              </Badge>
                              {lesson.aiGenerated && (
                                <Badge variant="outline" className="border-purple-300 text-purple-700">
                                  <Bot className="h-3 w-3 mr-1" />
                                  AI Generated
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {lesson.isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-400" />
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
                          <Target className="h-4 w-4 text-gray-500" />
                          <span className="capitalize">{lesson.difficulty}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Lightbulb className="h-4 w-4 text-gray-500" />
                          <span>{lesson.objectives.length} objectives</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span>{lesson.activities?.length || 0} activities</span>
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
              <EnhancedLessonCreator 
                moduleId={module.id}
                moduleObjectives={module.objectives || []}
                onLessonCreated={() => setIsCreateModalOpen(false)}
                creationMode={creationMode}
              />
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
    </div>
  );
}

// Assessment Management Component
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
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3" onClick={() => handleViewAssessment(assessment)}>
                    <div className="mt-1">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg hover:text-green-600 cursor-pointer">{assessment.title}</CardTitle>
                        <Badge className={getAssessmentTypeColor(assessment.assessmentType)}>
                          {assessment.assessmentType}
                        </Badge>
                        <Badge className={getDifficultyColor(assessment.difficulty)}>
                          {assessment.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{assessment.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
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

      {/* Lesson View Modal */}
      <Dialog open={isViewLessonModalOpen} onOpenChange={setIsViewLessonModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {viewingLesson && (
                <>
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
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {viewingLesson && (
            <div className="space-y-6">
              {/* Lesson Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Duration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-lg font-medium">{viewingLesson.duration} min</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Difficulty</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <span className="text-lg font-medium capitalize">{viewingLesson.difficulty}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Objectives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="h-4 w-4 text-gray-500" />
                      <span className="text-lg font-medium">{viewingLesson.objectives.length}</span>
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
                  <p className="text-gray-700">{viewingLesson.description}</p>
                </CardContent>
              </Card>

              {/* Learning Objectives */}
              <Card>
                <CardHeader>
                  <CardTitle>Learning Objectives</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {viewingLesson.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span className="text-sm">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {viewingLesson.activities.map((activity, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-sm">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Resources */}
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {viewingLesson.resources.map((resource, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                        <span className="text-sm">{resource}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Equipment (if applicable) */}
              {viewingLesson.equipment && viewingLesson.equipment.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Equipment Needed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {viewingLesson.equipment.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <FlaskConical className="h-4 w-4 text-orange-500 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Safety Notes (if applicable) */}
              {viewingLesson.safetyNotes && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Safety Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-red-700 bg-red-50 p-3 rounded">{viewingLesson.safetyNotes}</p>
                  </CardContent>
                </Card>
              )}

              {/* Assessment Criteria */}
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {viewingLesson.assessmentCriteria.map((criteria, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Target className="h-4 w-4 text-green-600 mt-0.5" />
                        <span className="text-sm">{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Homework (if applicable) */}
              {viewingLesson.homework && (
                <Card>
                  <CardHeader>
                    <CardTitle>Homework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{viewingLesson.homework}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Assessment View Modal */}
      <Dialog open={isViewAssessmentModalOpen} onOpenChange={setIsViewAssessmentModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {viewingAssessment && (
                <>
                  <FileText className="h-5 w-5 text-green-600" />
                  <span>{viewingAssessment.title}</span>
                  <Badge className={
                    viewingAssessment.assessmentType === "formative" ? "bg-blue-100 text-blue-800" :
                    viewingAssessment.assessmentType === "summative" ? "bg-purple-100 text-purple-800" :
                    "bg-gray-100 text-gray-800"
                  }>
                    {viewingAssessment.assessmentType}
                  </Badge>
                  {viewingAssessment.aiGenerated && (
                    <Badge variant="outline" className="border-purple-300 text-purple-700">
                      <Bot className="h-3 w-3 mr-1" />
                      AI Generated
                    </Badge>
                  )}
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

              {/* Instructions */}
              {viewingAssessment.instructions && (
                <Card>
                  <CardHeader>
                    <CardTitle>Instructions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">{viewingAssessment.instructions}</p>
                  </CardContent>
                </Card>
              )}

              {/* Assessment Objectives */}
              {viewingAssessment.objectives && viewingAssessment.objectives.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Objectives Assessed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {viewingAssessment.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-sm">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Topics Covered */}
              {viewingAssessment.topics && viewingAssessment.topics.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Topics Covered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {viewingAssessment.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Question Types */}
              {viewingAssessment.questionTypes && viewingAssessment.questionTypes.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Question Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {viewingAssessment.questionTypes.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

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

              {/* Marking Scheme */}
              {viewingAssessment.markingScheme && (
                <Card>
                  <CardHeader>
                    <CardTitle>Marking Scheme</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-sm bg-gray-50 p-3 rounded whitespace-pre-wrap">
                      {viewingAssessment.markingScheme}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// AI Lesson Generator Component
interface AILessonGeneratorProps {
  module: Module;
  onGenerate: (data: { lessonType: string; topic: string; duration: number; difficulty: string }) => void;
  isLoading: boolean;
}

function AILessonGenerator({ module, onGenerate, isLoading }: AILessonGeneratorProps) {
  const [formData, setFormData] = useState({
    lessonType: "lecture",
    topic: "",
    duration: 45,
    difficulty: "intermediate",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="lessonType">Lesson Type</Label>
          <Select
            value={formData.lessonType}
            onValueChange={(value) => setFormData(prev => ({ ...prev, lessonType: value }))}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select lesson type" />
            </SelectTrigger>
            <SelectContent>
              {LESSON_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center space-x-2">
                    <type.icon className="h-4 w-4" />
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="difficulty">Difficulty Level</Label>
          <Select
            value={formData.difficulty}
            onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="topic">Specific Topic</Label>
        <Input
          id="topic"
          value={formData.topic}
          onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
          placeholder="e.g., 'Introduction to Chemical Bonding'"
          className="mt-2"
          required
        />
      </div>

      <div>
        <Label htmlFor="duration">Duration (minutes)</Label>
        <Input
          id="duration"
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
          min="15"
          max="180"
          className="mt-2"
          required
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">AI Lesson Generation</h4>
            <p className="text-sm text-blue-700 mt-1">
              AI will create a comprehensive lesson plan including objectives, activities, resources, and assessment criteria based on your selections.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
          {isLoading ? "Generating..." : "Generate Lesson"}
        </Button>
      </div>
    </form>
  );
}

// Manual Lesson Form Component
interface LessonFormProps {
  lesson?: LessonPlan | null;
  module: Module;
  onSubmit: (data: Partial<LessonPlan>) => void;
  isLoading: boolean;
}

function LessonForm({ lesson, module, onSubmit, isLoading }: LessonFormProps) {
  const [formData, setFormData] = useState({
    title: lesson?.title || "",
    description: lesson?.description || "",
    lessonType: lesson?.lessonType || "lecture",
    duration: lesson?.duration || 45,
    difficulty: lesson?.difficulty || "intermediate",
    objectives: lesson?.objectives || [""],
    activities: lesson?.activities || [""],
    resources: lesson?.resources || [""],
    equipment: lesson?.equipment || [""],
    safetyNotes: lesson?.safetyNotes || "",
    prerequisites: lesson?.prerequisites || [""],
    assessmentCriteria: lesson?.assessmentCriteria || [""],
    differentiation: lesson?.differentiation || "",
    homework: lesson?.homework || "",
    // Assessment fields
    hasAssessment: lesson?.hasAssessment || false,
    assessmentType: lesson?.assessmentType || "formative",
    assessmentDescription: lesson?.assessmentDescription || "",
    assessmentDuration: lesson?.assessmentDuration || 15,
    assessmentPoints: lesson?.assessmentPoints || 10,
    assessmentCriteriaLesson: lesson?.assessmentCriteriaLesson || [],
    rubric: lesson?.rubric || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      objectives: formData.objectives.filter(obj => obj.trim() !== ""),
      activities: formData.activities.filter(act => act.trim() !== ""),
      resources: formData.resources.filter(res => res.trim() !== ""),
      equipment: formData.equipment.filter(eq => eq.trim() !== ""),
      prerequisites: formData.prerequisites.filter(pre => pre.trim() !== ""),
      assessmentCriteria: formData.assessmentCriteria.filter(crit => crit.trim() !== ""),
    });
  };

  const handleAssessmentSubmit = (assessmentData: any) => {
    setFormData(prev => ({
      ...prev,
      hasAssessment: assessmentData.hasAssessment,
      assessmentType: assessmentData.assessmentType,
      assessmentDescription: assessmentData.assessmentDescription,
      assessmentDuration: assessmentData.assessmentDuration,
      assessmentPoints: assessmentData.assessmentPoints,
      assessmentCriteriaLesson: assessmentData.assessmentCriteria,
      rubric: assessmentData.rubric,
    }));
  };

  const updateArrayField = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], ""]
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_: string, i: number) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Lesson Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter lesson title"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="lessonType">Lesson Type</Label>
              <Select
                value={formData.lessonType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, lessonType: value }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select lesson type" />
                </SelectTrigger>
                <SelectContent>
                  {LESSON_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center space-x-2">
                        <type.icon className="h-4 w-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the lesson's focus and goals"
              className="mt-2"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                min="15"
                max="180"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div>
            <Label>Learning Objectives</Label>
            <p className="text-sm text-gray-600 mb-3">
              Select objectives from the module curriculum
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-3">
              {module.objectives.map((objective, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id={`lesson-objective-${index}`}
                    checked={formData.objectives.includes(objective)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData(prev => ({
                          ...prev,
                          objectives: [...prev.objectives, objective]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          objectives: prev.objectives.filter(obj => obj !== objective)
                        }));
                      }
                    }}
                    className="mt-1 rounded border-gray-300"
                  />
                  <Label htmlFor={`lesson-objective-${index}`} className="text-sm flex-1 cursor-pointer">
                    {objective}
                  </Label>
                </div>
              ))}
            </div>
            {formData.objectives.length === 0 && (
              <p className="text-sm text-red-600 mt-2">
                Please select at least one objective from the module.
              </p>
            )}
          </div>

          <div>
            <Label>Activities</Label>
            {formData.activities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <Input
                  value={activity}
                  onChange={(e) => updateArrayField('activities', index, e.target.value)}
                  placeholder="Enter activity"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem('activities', index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem('activities')}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Activity
            </Button>
          </div>

          <div>
            <Label>Resources</Label>
            {formData.resources.map((resource, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <Input
                  value={resource}
                  onChange={(e) => updateArrayField('resources', index, e.target.value)}
                  placeholder="Enter resource"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem('resources', index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem('resources')}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Resource
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          {(formData.lessonType === "practical" || formData.lessonType === "fieldwork") && (
            <>
              <div>
                <Label>Equipment Needed</Label>
                {formData.equipment.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <Input
                      value={item}
                      onChange={(e) => updateArrayField('equipment', index, e.target.value)}
                      placeholder="Enter equipment item"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem('equipment', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem('equipment')}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Equipment
                </Button>
              </div>

              <div>
                <Label htmlFor="safetyNotes">Safety Notes</Label>
                <Textarea
                  id="safetyNotes"
                  value={formData.safetyNotes}
                  onChange={(e) => setFormData(prev => ({ ...prev, safetyNotes: e.target.value }))}
                  placeholder="Important safety considerations..."
                  className="mt-2"
                  rows={3}
                />
              </div>
            </>
          )}

          <div>
            <Label>Prerequisites</Label>
            {formData.prerequisites.map((prerequisite, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <Input
                  value={prerequisite}
                  onChange={(e) => updateArrayField('prerequisites', index, e.target.value)}
                  placeholder="Enter prerequisite"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem('prerequisites', index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem('prerequisites')}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Prerequisite
            </Button>
          </div>

          <div>
            <Label>Assessment Criteria</Label>
            {formData.assessmentCriteria.map((criteria, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <Input
                  value={criteria}
                  onChange={(e) => updateArrayField('assessmentCriteria', index, e.target.value)}
                  placeholder="Enter assessment criteria"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem('assessmentCriteria', index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem('assessmentCriteria')}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Criteria
            </Button>
          </div>

          <div>
            <Label htmlFor="differentiation">Differentiation Strategy</Label>
            <Textarea
              id="differentiation"
              value={formData.differentiation}
              onChange={(e) => setFormData(prev => ({ ...prev, differentiation: e.target.value }))}
              placeholder="How will you adapt this lesson for different ability levels?"
              className="mt-2"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="homework">Homework/Follow-up</Label>
            <Textarea
              id="homework"
              value={formData.homework}
              onChange={(e) => setFormData(prev => ({ ...prev, homework: e.target.value }))}
              placeholder="What should students do after this lesson?"
              className="mt-2"
              rows={3}
            />
          </div>
        </TabsContent>

        <TabsContent value="assessment" className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-blue-900 mb-2">Lesson Assessment Component</h4>
            <p className="text-sm text-blue-700">
              Add formative or summative assessment to measure student understanding during or after this lesson.
            </p>
          </div>

          <AssessmentForm
            initialData={{
              hasAssessment: formData.hasAssessment,
              assessmentType: formData.assessmentType,
              assessmentDescription: formData.assessmentDescription,
              assessmentDuration: formData.assessmentDuration,
              assessmentPoints: formData.assessmentPoints,
              assessmentCriteria: formData.assessmentCriteriaLesson,
              rubric: formData.rubric,
            }}
            onSubmit={handleAssessmentSubmit}
            isLoading={false}
            lessonObjectives={formData.objectives}
            lessonTopics={module.topics || []}
          />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
          {isLoading ? "Saving..." : lesson ? "Update Lesson" : "Create Lesson"}
        </Button>
      </div>
    </form>
  );
}

