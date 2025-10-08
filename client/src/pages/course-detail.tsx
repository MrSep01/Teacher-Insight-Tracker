// @ts-nocheck
import { useState, useCallback } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CourseModuleManager } from "@/components/forms/course-module-manager";
import { SortableModuleCard } from "@/components/forms/sortable-module-card";
import { 
  BookOpen, 
  Users, 
  Clock, 
  Target, 
  ArrowLeft,
  Settings,
  Edit,
  Trash2,
  Plus,
  Eye,
  FileText,
  MoreVertical,
  Calendar,
  GraduationCap,
  Move,
  Copy,
  CheckCircle2,
  AlertTriangle,
  GripVertical,
  ClipboardCheck
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { LessonManagement } from "@/components/lesson-management";
import type { Course, Module as SharedModule, LessonPlan as SharedLessonPlan, Assessment } from "@shared/schema";

// Types for module-based content display
type ModuleWithContent = SharedModule & {
  lessons: SharedLessonPlan[];
  assessments: Assessment[];
  curriculum?: string | null;
};

type ModuleWithLessons = SharedModule & {
  lessons: SharedLessonPlan[];
  curriculum?: string | null;
};

function getLessonTypeIcon(type: string) {
  const icons = {
    lecture: BookOpen,
    practical: Target,
    project: Target,
    assessment: CheckCircle2,
    discussion: Users,
    fieldwork: Users,
  };
  return icons[type as keyof typeof icons] || BookOpen;
}

function getLessonTypeColor(type: string) {
  const colors = {
    lecture: "bg-blue-100 text-blue-800 border-blue-200",
    practical: "bg-green-100 text-green-800 border-green-200",
    project: "bg-purple-100 text-purple-800 border-purple-200",
    assessment: "bg-orange-100 text-orange-800 border-orange-200",
    discussion: "bg-yellow-100 text-yellow-800 border-yellow-200",
    fieldwork: "bg-red-100 text-red-800 border-red-200",
  };
  return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
}



export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [selectedModule, setSelectedModule] = useState<ModuleWithLessons | null>(null);
  const [managementDialogOpen, setManagementDialogOpen] = useState(false);
  const [moduleManagerOpen, setModuleManagerOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch course details
  const { data: course, isLoading: courseLoading } = useQuery<Course>({
    queryKey: [`/api/courses/${id}`],
    enabled: !!id,
  });

  // Fetch course modules with their lessons and assessments
  const { data: modulesWithContent = [], isLoading: contentLoading } = useQuery<ModuleWithContent[]>({
    queryKey: [`/api/courses/${id}/modules-with-content`],
    queryFn: async () => {
      const modules = await apiRequest<SharedModule[]>(`/api/courses/${id}/modules`);
      const modulesWithContent: ModuleWithContent[] = [];

      for (const module of modules) {
        // Get lessons for this module
        const lessons = await apiRequest<SharedLessonPlan[]>(`/api/modules/${module.id}/lessons`);

        // Get assessments for this module
        let assessments: Assessment[] = [];
        try {
          assessments = await apiRequest<Assessment[]>(`/api/modules/${module.id}/assessments`);
        } catch (error) {
          // Module might not have assessments
        }

        modulesWithContent.push({
          ...module,
          lessons: lessons || [],
          assessments: assessments || [],
        });
      }

      return modulesWithContent;
    },
    enabled: !!id,
  });

  // Module reordering mutation
  const reorderModulesMutation = useMutation({
    mutationFn: async (newOrder: number[]) => {
      await apiRequest(`/api/courses/${id}/modules/reorder`, {
        method: "PUT",
        body: { moduleOrder: newOrder },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/modules-with-content`] });
      toast({ title: "Module order updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update module order", variant: "destructive" });
    },
  });

  // Delete module mutation
  const deleteModuleMutation = useMutation({
    mutationFn: async (moduleId: number) => {
      await apiRequest(`/api/modules/${moduleId}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/modules-with-content`] });
      toast({ title: "Module deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete module", variant: "destructive" });
    },
  });

  // Handle drag end for module reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = modulesWithContent.findIndex((module) => module.id === active.id);
      const newIndex = modulesWithContent.findIndex((module) => module.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newModules = [...modulesWithContent];
        const [reorderedModule] = newModules.splice(oldIndex, 1);
        newModules.splice(newIndex, 0, reorderedModule);

        // Update sequence orders
        const newOrder = newModules.map((module, index) => ({
          id: module.id,
          sequenceOrder: index + 1,
        }));

        reorderModulesMutation.mutate(newOrder.map(item => item.id));
      }
    }
  };

  const openModuleManagement = (module: Module) => {
    setSelectedModule({ ...module, lessons: [] });
    setManagementDialogOpen(true);
  };

  const closeModuleManagement = () => {
    setSelectedModule(null);
    setManagementDialogOpen(false);
    // Refresh the course content data
    queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/modules-with-content`] });
  };

  const handleDeleteModule = (moduleId: number) => {
    if (confirm("Are you sure you want to delete this module? This will also delete all associated lessons and assessments.")) {
      deleteModuleMutation.mutate(moduleId);
    }
  };

  if (courseLoading || contentLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <Link href="/courses">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalLessons = modulesWithContent.reduce((sum, module) => sum + module.lessons.length, 0);
  const totalAssessments = modulesWithContent.reduce((sum, module) => sum + module.assessments.length, 0);
  const completedLessons = modulesWithContent.reduce((sum, module) => 
    sum + module.lessons.filter(lesson => lesson.isCompleted).length, 0
  );
  const totalDuration = modulesWithContent.reduce((sum, module) => 
    sum + module.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.duration, 0), 0
  );

  return (
    <div className="container mx-auto p-6 space-y-6 min-h-screen">
      {/* Course Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/courses">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{course.name}</h1>
            <p className="text-gray-600 mt-1">{course.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{course.grade}</Badge>
          <Badge variant="outline">{course.curriculum}</Badge>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Modules</p>
                <p className="text-2xl font-bold">{modulesWithContent.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Lessons</p>
                <p className="text-2xl font-bold">{totalLessons}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ClipboardCheck className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Assessments</p>
                <p className="text-2xl font-bold">{totalAssessments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-2xl font-bold">{Math.round(totalDuration / 60)}h</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Progress</p>
                <p className="text-2xl font-bold">{totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Module-Based Course Ribbon */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Course Content by Module</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setModuleManagerOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Manage Modules
          </Button>
        </div>
        
        {modulesWithContent.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No modules assigned</h3>
            <p className="text-gray-600 mb-4">This course doesn't have any modules assigned yet.</p>
            <p className="text-sm text-gray-500">
              Add modules to this course to start creating lessons and assessments.
            </p>
          </div>
        ) : (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={modulesWithContent.map(module => module.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-6">
                {modulesWithContent
                  .sort((a, b) => (a.sequenceOrder || 0) - (b.sequenceOrder || 0))
                  .map((module) => (
                    <SortableModuleCard
                      key={module.id}
                      module={module}
                      onEdit={() => openModuleManagement(module)}
                      onDelete={() => handleDeleteModule(module.id)}
                      onAddLesson={() => openModuleManagement(module)}
                      onAddAssessment={() => {
                        window.location.href = `/assessments/create?moduleId=${module.id}`;
                      }}
                    />
                  ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Module Manager Dialog */}
      {course && (
        <CourseModuleManager
          course={course}
          open={moduleManagerOpen}
          onOpenChange={setModuleManagerOpen}
        />
      )}

      {/* Legacy lesson management dialog */}
      {selectedModule && (
        <Dialog open={managementDialogOpen} onOpenChange={setManagementDialogOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Manage Lessons: {selectedModule.title}</DialogTitle>
            </DialogHeader>
            <LessonManagement module={selectedModule} onClose={closeModuleManagement} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}