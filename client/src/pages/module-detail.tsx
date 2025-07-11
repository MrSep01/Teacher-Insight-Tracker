import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { useState, useEffect } from "react";
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

// Helper function to format objectives for better display
function formatObjective(objective: string, index: number): { code: string; description: string } {
  // Check if the objective looks like a spec code (e.g., "1.1.1", "2.3.4")
  const specCodePattern = /^(\d+\.\d+\.\d+|\d+\.\d+)$/;
  
  if (specCodePattern.test(objective.trim())) {
    return {
      code: objective.trim(),
      description: `Learning objective ${objective.trim()}`
    };
  }
  
  // If it's a full description, try to extract code from the beginning
  const codeMatch = objective.match(/^(\d+\.\d+\.\d+|\d+\.\d+)\s+(.+)$/);
  if (codeMatch) {
    return {
      code: codeMatch[1],
      description: codeMatch[2]
    };
  }
  
  // Default case - treat as full description
  return {
    code: `${index + 1}`,
    description: objective
  };
}

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
  const queryClient = useQueryClient();

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
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
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
                <div className="text-sm font-medium text-gray-600">Topic</div>
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

      {/* Learning Objectives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Learning Objectives
          </CardTitle>
          <CardDescription>
            What students will learn in this module ({module.objectives?.length || 0} objectives)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {module.objectives && module.objectives.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {module.objectives.map((objective, index) => {
                const formatted = formatObjective(objective, index);
                return (
                  <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-green-800 mb-1">
                        {formatted.code}
                      </div>
                      <span className="text-sm text-green-700">{formatted.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No objectives defined</p>
          )}
        </CardContent>
      </Card>

      {/* Lessons Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Lessons ({lessons.length})
              </CardTitle>
              <CardDescription>
                Drag and drop to reorder lessons
              </CardDescription>
            </div>
            <Button size="sm">
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons yet</h3>
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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Assessments ({assessments.length})
              </CardTitle>
              <CardDescription>
                Drag and drop to reorder assessments
              </CardDescription>
            </div>
            <Button size="sm">
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments yet</h3>
              <p className="text-gray-500 mb-4">Create your first assessment to track student progress</p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create First Assessment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}