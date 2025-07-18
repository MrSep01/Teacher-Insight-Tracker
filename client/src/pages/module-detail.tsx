import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { EditModuleForm } from "@/components/forms/edit-module-form";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Target,
  CheckCircle,
  ArrowLeft,
  FileText,
  Play,
  Edit,
  Trash2,
  Plus,
  GripVertical,
  Eye,
  BookOpenCheck,
  CalendarDays,
  MoreVertical,
  ClipboardList
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Module, LessonPlan, Assessment } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { formatObjective, getTopic5Subtopics, getIonicBondingObjectives } from "@/lib/curriculum-utils";

// Curriculum Coverage Display Component
function CurriculumCoverageDisplay({ objectives }: { objectives: string[] }) {
  const { data: topicsData, isLoading: topicsLoading } = useQuery({
    queryKey: ['/api/curriculum/topics'],
    enabled: objectives.length > 0,
  });

  const { data: hierarchyData, isLoading: hierarchyLoading } = useQuery({
    queryKey: ['/api/curriculum/topics/5/hierarchy'],
    enabled: objectives.length > 0,
  });

  if (!objectives.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Curriculum Coverage</CardTitle>
          <CardDescription>No curriculum objectives selected</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (topicsLoading || hierarchyLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Curriculum Coverage</CardTitle>
          <CardDescription>Loading curriculum coverage...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!topicsData || !hierarchyData || !hierarchyData.topic) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Curriculum Coverage</CardTitle>
          <CardDescription>Unable to load curriculum data</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const topic = hierarchyData.topic;
  
  // Check if topic has subtopics
  if (!topic.subtopics || !Array.isArray(topic.subtopics)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Curriculum Coverage</CardTitle>
          <CardDescription>No curriculum structure available</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  // Group objectives by subtopic
  const subtopicCoverage = topic.subtopics.map(subtopic => {
    const subtopicObjectives = subtopic.objectives?.filter(obj => 
      objectives.includes(obj.code)
    ) || [];
    return {
      ...subtopic,
      coveredObjectives: subtopicObjectives,
      totalObjectives: subtopic.objectives?.length || 0,
      percentageCovered: subtopic.objectives?.length > 0 ? Math.round((subtopicObjectives.length / subtopic.objectives.length) * 100) : 0
    };
  }).filter(subtopic => subtopic.coveredObjectives.length > 0);

  const totalObjectivesCovered = objectives.length;
  const totalObjectivesAvailable = topic.subtopics.reduce((sum, subtopic) => sum + (subtopic.objectives?.length || 0), 0);
  const overallPercentage = totalObjectivesAvailable > 0 ? Math.round((totalObjectivesCovered / totalObjectivesAvailable) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Curriculum Coverage
        </CardTitle>
        <CardDescription>
          <div className="flex items-center gap-4">
            <span>Topic {topic.code}: {topic.name}</span>
            <Badge variant="outline">
              {totalObjectivesCovered} of {totalObjectivesAvailable} objectives ({overallPercentage}%)
            </Badge>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subtopicCoverage.map((subtopic) => (
            <div key={subtopic.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold">Subtopic {subtopic.code}: {subtopic.name}</h4>
                  <p className="text-sm text-gray-600">{subtopic.description}</p>
                </div>
                <Badge variant={subtopic.percentageCovered === 100 ? "default" : "secondary"}>
                  {subtopic.coveredObjectives.length}/{subtopic.totalObjectives} ({subtopic.percentageCovered}%)
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                {subtopic.coveredObjectives.map((objective) => (
                  <div key={objective.id} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-mono">{objective.code}</span>
                    <span className="text-gray-700">{objective.statement}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Use global curriculum utility functions for consistent IGCSE formatting

// Sortable Lesson Card Component
function SortableLessonCard({ lesson, onView }: { lesson: LessonPlan; onView: (lesson: LessonPlan) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case 'lecture': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'practical': return 'bg-green-100 text-green-800 border-green-200';
      case 'assessment': return 'bg-red-100 text-red-800 border-red-200';
      case 'project': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'discussion': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`cursor-pointer hover:shadow-md transition-all ${isDragging ? 'shadow-lg' : ''}`}
      onClick={() => onView(lesson)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
                onClick={(e) => e.stopPropagation()}
              >
                <GripVertical className="h-4 w-4 text-gray-400" />
              </div>
              <h3 className="font-semibold text-lg">{lesson.title}</h3>
              <Badge className={`text-xs px-2 py-1 ${getLessonTypeColor(lesson.lessonType)}`}>
                {lesson.lessonType}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {lesson.duration}min
              </div>
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                {lesson.difficulty}
              </div>
              {lesson.aiGenerated && (
                <Badge variant="secondary" className="text-xs">AI Generated</Badge>
              )}
              {lesson.safetyNotes && (
                <Badge variant="outline" className="text-xs text-red-600">Safety Notes</Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onView(lesson);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(lesson)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Lesson
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookOpenCheck className="h-4 w-4 mr-2" />
                  Teacher Guide
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Sortable Assessment Card Component
function SortableAssessmentCard({ assessment, onView }: { assessment: Assessment; onView: (assessment: Assessment) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: assessment.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`cursor-pointer hover:shadow-md transition-all ${isDragging ? 'shadow-lg' : ''}`}
      onClick={() => onView(assessment)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
                onClick={(e) => e.stopPropagation()}
              >
                <GripVertical className="h-4 w-4 text-gray-400" />
              </div>
              <h3 className="font-semibold text-lg">{assessment.title}</h3>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs px-2 py-1">
                Assessment
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">{assessment.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <ClipboardList className="h-4 w-4" />
                {assessment.totalQuestions || 0} questions
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {assessment.duration}min
              </div>
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                {assessment.totalPoints || 0} points
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onView(assessment);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(assessment)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Assessment
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Play className="h-4 w-4 mr-2" />
                  Start Assessment
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ModuleDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [lessons, setLessons] = useState<LessonPlan[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Queries
  const { data: module, isLoading } = useQuery<Module>({
    queryKey: [`/api/modules/${id}`],
    enabled: !!id,
  });

  const { data: lessonsData, isLoading: lessonsLoading } = useQuery<LessonPlan[]>({
    queryKey: [`/api/modules/${id}/lessons`],
    enabled: !!id,
  });

  const { data: assessmentsData, isLoading: assessmentsLoading } = useQuery<Assessment[]>({
    queryKey: [`/api/modules/${id}/assessments`],
    enabled: !!id,
  });

  // Update state when data changes
  useEffect(() => {
    if (lessonsData) {
      setLessons(lessonsData);
    }
  }, [lessonsData]);

  useEffect(() => {
    if (assessmentsData) {
      setAssessments(assessmentsData);
    }
  }, [assessmentsData]);



  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle lesson drag end
  const handleLessonDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setLessons((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Handle assessment drag end
  const handleAssessmentDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setAssessments((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Navigation handlers
  const handleViewLesson = (lesson: LessonPlan) => {
    setLocation(`/lessons/${lesson.id}`);
  };

  const handleViewAssessment = (assessment: Assessment) => {
    setLocation(`/assessments/${assessment.id}`);
  };

  // Edit module mutation
  const editModuleMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest(`/api/modules/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/modules/${id}`] });
      queryClient.invalidateQueries({ queryKey: ['/api/modules'] });
      toast({
        title: "Success",
        description: "Module updated successfully",
      });
      setIsEditModalOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update module",
        variant: "destructive",
      });
    },
  });

  // Duplicate module mutation  
  const duplicateModuleMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('/api/modules', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: (newModule) => {
      queryClient.invalidateQueries({ queryKey: ['/api/modules'] });
      toast({
        title: "Success",
        description: "New module created successfully",
      });
      setIsEditModalOpen(false);
      // Navigate to the new module
      setLocation(`/modules/${newModule.id}`);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create new module",
        variant: "destructive",
      });
    },
  });

  // Delete module mutation
  const deleteModuleMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest(`/api/modules/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/modules'] });
      toast({
        title: "Success",
        description: "Module deleted successfully",
      });
      setLocation('/library');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete module",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h1>
          <p className="text-gray-600 mb-6">The module you're looking for doesn't exist or has been deleted.</p>
          <Link href="/library">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Library
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Link href="/library">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Library
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{module.title}</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">{module.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Active
          </Badge>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => deleteModuleMutation.mutate()}
            disabled={deleteModuleMutation.isPending}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {deleteModuleMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>

      {/* Module Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-sm font-medium text-gray-600">Curriculum</div>
                <div className="text-lg font-semibold">{module.curriculumTopic}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-sm font-medium text-gray-600">Grades</div>
                <div className="text-lg font-semibold">{module.gradeLevels?.join(', ')}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-sm font-medium text-gray-600">Lesson Plans</div>
                <div className="text-lg font-semibold">{lessons.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-sm font-medium text-gray-600">Created</div>
                <div className="text-lg font-semibold">
                  {new Date(module.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module Progress Overview */}
      <Card className="mb-6 border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-indigo-800">Module Progress Overview</CardTitle>
          <CardDescription className="text-indigo-600">
            Complete overview of all module components and their completion status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-green-600">{module.objectives?.length || 0}</div>
              <div className="text-sm text-gray-600 mt-1">Learning Objectives</div>
              <div className="text-xs text-gray-500 mt-1">
                {module.objectives?.length > 0 ? "Available ✓" : "Not Set"}
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600">{lessons.length}</div>
              <div className="text-sm text-gray-600 mt-1">Lesson Plans</div>
              <div className="text-xs text-gray-500 mt-1">
                {lessons.length > 0 ? "Available" : "None Created"}
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-purple-600">{assessments.length}</div>
              <div className="text-sm text-gray-600 mt-1">Assessments</div>
              <div className="text-xs text-gray-500 mt-1">
                {assessments.length > 0 ? "Available" : "None Created"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Curriculum Coverage - Temporarily disabled to debug */}
      {/* <CurriculumCoverageDisplay objectives={module.objectives || []} /> */}

      {/* Learning Objectives - Expanded */}
      <Card className="border-2 border-green-200 bg-green-50/30">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Target className="h-6 w-6" />
            Complete Learning Objectives ({module.objectives?.length || 0})
          </CardTitle>
          <CardDescription className="text-green-700">
            IGCSE Chemistry Edexcel specification objectives for this module - All {module.objectives?.length || 0} objectives displayed
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {module.objectives && module.objectives.length > 0 ? (
            <div className="space-y-6">
              {module.objectives.map((objective, index) => {
                const formatted = formatObjective(objective, index);
                return (
                  <div key={index} className="flex items-start gap-6 p-6 bg-white rounded-xl border border-green-200 hover:bg-green-50 transition-colors shadow-sm min-h-[120px]">
                    <div className="flex-shrink-0">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 font-mono font-bold text-base px-4 py-2">
                        {formatted.code}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base text-green-700 leading-relaxed mb-4 font-medium">
                        {formatted.description}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
                        <Badge variant="secondary" className="text-sm px-3 py-1 bg-blue-100 text-blue-700">
                          {formatted.topic}
                        </Badge>
                        <span className="text-gray-400">→</span>
                        <Badge 
                          variant="secondary" 
                          className={`text-sm px-3 py-1 ${
                            formatted.isHighlighted 
                              ? 'bg-yellow-100 text-yellow-800 border-yellow-300 font-semibold' 
                              : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {formatted.subtopic}
                        </Badge>
                      </div>
                    </div>
                    <CheckCircle className="h-6 w-6 text-green-600 mt-2 flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-500 mb-2">No objectives defined</p>
              <p className="text-xs text-gray-400">
                Add objectives when creating or editing this module
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lessons and Assessments - Single Column Layout */}
      <div className="space-y-6">
        {/* Lessons Section - Expanded */}
        <Card className="border-2 border-blue-200 bg-blue-50/30">
          <CardHeader className="bg-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <BookOpen className="h-6 w-6" />
                  Lesson Plans ({lessons.length})
                </CardTitle>
                <CardDescription className="text-blue-600">
                  Complete lesson plans for this module
                </CardDescription>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Lesson
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {lessonsLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-40 bg-gray-200 rounded-xl"></div>
                  </div>
                ))}
              </div>
            ) : lessons.length > 0 ? (
              <div className="space-y-6">

                {lessons.map((lesson) => (
                  <div key={lesson.id} className="bg-white p-6 rounded-xl border border-blue-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer min-h-[140px]" onClick={() => handleViewLesson(lesson)}>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2 text-lg">{lesson.title}</h4>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{lesson.description}</p>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <Badge variant="outline" className={`text-sm px-3 py-1 ${
                            lesson.lessonType === 'lecture' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            lesson.lessonType === 'practical' ? 'bg-green-100 text-green-800 border-green-200' :
                            lesson.lessonType === 'assessment' ? 'bg-red-100 text-red-800 border-red-200' :
                            'bg-gray-100 text-gray-800 border-gray-200'
                          }`}>
                            {lesson.lessonType}
                          </Badge>
                          <Badge variant="outline" className={`text-sm px-3 py-1 ${
                            lesson.difficulty === 'basic' ? 'bg-green-100 text-green-800 border-green-200' :
                            lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                            'bg-red-100 text-red-800 border-red-200'
                          }`}>
                            {lesson.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {lesson.duration} min
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            {lesson.objectives?.length || 0} objectives
                          </div>
                          <div className="flex items-center gap-2">
                            <Play className="h-4 w-4" />
                            {lesson.activities?.length || 0} activities
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
                <p className="text-gray-500 mb-4">Create your first lesson to get started</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Lesson
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Assessments Section */}
        <Card className="border-2 border-purple-200 bg-purple-50/30">
          <CardHeader className="bg-purple-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <ClipboardList className="h-6 w-6" />
                  Summative Assessments ({assessments.length})
                </CardTitle>
                <CardDescription className="text-purple-600">
                  Assessment tools for this module
                </CardDescription>
              </div>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Assessment
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {assessmentsLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-32 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : assessments.length > 0 ? (
              <div className="space-y-4">

                {assessments.map((assessment) => (
                  <div key={assessment.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer" onClick={() => handleViewAssessment(assessment)}>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <ClipboardList className="h-4 w-4 text-purple-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{assessment.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{assessment.description}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className={`text-xs px-2 py-1 ${
                            assessment.assessmentType === 'formative' ? 'bg-green-100 text-green-800 border-green-200' :
                            assessment.assessmentType === 'summative' ? 'bg-red-100 text-red-800 border-red-200' :
                            'bg-blue-100 text-blue-800 border-blue-200'
                          }`}>
                            {assessment.assessmentType}
                          </Badge>
                          <Badge variant="outline" className="text-xs px-2 py-1 bg-gray-100 text-gray-800 border-gray-200">
                            {assessment.totalPoints} points
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {assessment.estimatedDuration} min
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {assessment.questions?.length || 0} questions
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments found</h3>
                <p className="text-gray-500 mb-4">Create your first assessment to get started</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Assessment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Module Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Module</DialogTitle>
            <DialogDescription>
              Update module information and curriculum mapping. Library modules cannot have their names changed.
            </DialogDescription>
          </DialogHeader>
          {module && (
            <EditModuleForm
              module={module}
              onSubmit={(data) => editModuleMutation.mutate(data)}
              onDuplicate={(data) => duplicateModuleMutation.mutate(data)}
              isLoading={editModuleMutation.isPending || duplicateModuleMutation.isPending}
              onClose={() => setIsEditModalOpen(false)}
              isLibraryModule={true} // Assume library modules by default
            />
          )}
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}