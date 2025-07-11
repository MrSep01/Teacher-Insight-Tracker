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
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
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

      {/* Curriculum Hierarchy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Curriculum Structure
          </CardTitle>
          <CardDescription>
            Understanding the hierarchy: Curriculum → Topics → Subtopics → Objectives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Curriculum Level */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="text-sm font-semibold text-blue-800 mb-1">Curriculum</div>
              <div className="text-lg font-bold text-blue-900">{module.curriculumTopic}</div>
            </div>
            
            {/* Topics Level */}
            {module.topics && module.topics.length > 0 && (
              <div className="border-l-4 border-green-500 pl-4">
                <div className="text-sm font-semibold text-green-800 mb-2">Topics Covered</div>
                <div className="flex flex-wrap gap-2">
                  {module.topics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Subtopics Examples */}
            <div className="border-l-4 border-purple-500 pl-4">
              <div className="text-sm font-semibold text-purple-800 mb-2">Topic 5 Subtopics</div>
              <div className="text-sm text-purple-700 space-y-1">
                {getTopic5Subtopics("(f)").map((subtopic, index) => (
                  <div key={index} className={subtopic.isHighlighted ? "bg-yellow-100 border border-yellow-300 rounded p-2 my-1" : ""}>
                    <div className={`font-semibold ${subtopic.isHighlighted ? "text-yellow-800" : ""}`}>
                      • <strong>{subtopic.code} {subtopic.name}</strong>
                      {subtopic.objectiveRange && ` (${subtopic.objectiveRange})`}
                      {subtopic.isHighlighted && " ← This Module Focus"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Objectives Examples */}
            <div className="border-l-4 border-orange-500 pl-4">
              <div className="text-sm font-semibold text-orange-800 mb-2">Ionic Bonding Objectives (5.1-5.7)</div>
              <div className="text-sm text-orange-700 space-y-1">
                {getIonicBondingObjectives().map((objective, index) => (
                  <div key={index}>
                    <strong>{objective.code}</strong> - {objective.statement}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Objectives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Complete Learning Objectives ({module.objectives?.length || 0})
          </CardTitle>
          <CardDescription>
            IGCSE Chemistry Edexcel specification objectives for this module - All {module.objectives?.length || 0} objectives displayed
          </CardDescription>
        </CardHeader>
        <CardContent className="max-h-none">
          {module.objectives && module.objectives.length > 0 ? (
            <div className="space-y-4">
              {module.objectives.map((objective, index) => {
                const formatted = formatObjective(objective, index);
                return (
                  <div key={index} className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                    <div className="flex-shrink-0">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 font-mono font-bold text-sm px-3 py-1">
                        {formatted.code}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-green-700 leading-relaxed mb-3 font-medium">
                        {formatted.description}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Badge variant="secondary" className="text-xs px-2 py-1 bg-blue-100 text-blue-700">
                          {formatted.topic}
                        </Badge>
                        <span>→</span>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs px-2 py-1 ${
                            formatted.isHighlighted 
                              ? 'bg-yellow-100 text-yellow-800 border-yellow-300 font-semibold' 
                              : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {formatted.subtopic}
                        </Badge>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
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

      {/* Lessons Section - Enhanced Visibility */}
      <Card className="border-2 border-blue-200 bg-blue-50/30">
        <CardHeader className="bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <BookOpen className="h-6 w-6" />
                Lesson Plans ({lessons.length})
              </CardTitle>
              <CardDescription className="text-blue-600">
                Complete lesson plans for this module - Drag and drop to reorder
              </CardDescription>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Lesson
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {lessonsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : lessons.length > 0 ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleLessonDragEnd}
            >
              <SortableContext items={lessons.map(l => l.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {lessons.map((lesson) => (
                    <SortableLessonCard
                      key={lesson.id}
                      lesson={lesson}
                      onView={handleViewLesson}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
              <p className="text-gray-500 mb-4">
                Debug Info: Loading={lessonsLoading ? "true" : "false"}, Count={lessons.length}
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create First Lesson
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Assessments Section - Enhanced Visibility */}
      <Card className="border-2 border-purple-200 bg-purple-50/30">
        <CardHeader className="bg-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <ClipboardList className="h-6 w-6" />
                Assessments ({assessments.length})
              </CardTitle>
              <CardDescription className="text-purple-600">
                Assessment tools for this module - Drag and drop to reorder
              </CardDescription>
            </div>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Assessment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {assessmentsLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : assessments.length > 0 ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleAssessmentDragEnd}
            >
              <SortableContext items={assessments.map(a => a.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {assessments.map((assessment) => (
                    <SortableAssessmentCard
                      key={assessment.id}
                      assessment={assessment}
                      onView={handleViewAssessment}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <div className="text-center py-8">
              <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments found</h3>
              <p className="text-gray-500 mb-4">
                Debug Info: Loading={assessmentsLoading ? "true" : "false"}, Count={assessments.length}
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create First Assessment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

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
  );
}