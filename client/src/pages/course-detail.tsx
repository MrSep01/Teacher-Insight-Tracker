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
import type { Course, Module, LessonPlan, Assessment } from "@shared/schema";

// Types for the unified ribbon system
interface CourseItem {
  id: string;
  itemType: 'lesson' | 'assessment';
  itemId: number;
  sequenceOrder: number;
  isVisible: boolean;
  data: LessonPlan | Assessment;
  moduleTitle: string;
}

interface LessonPlan {
  id: number;
  moduleId: number;
  title: string;
  description: string;
  lessonType: "lecture" | "practical" | "project" | "assessment" | "discussion" | "fieldwork";
  duration: number;
  difficulty: "basic" | "intermediate" | "advanced";
  objectives: string[];
  activities: string[];
  resources: string[];
  equipment?: string[];
  safetyNotes?: string;
  hasAssessment: boolean;
  assessmentType?: "formative" | "summative";
  aiGenerated: boolean;
  isCompleted: boolean;
  sequenceOrder: number;
  createdAt: string;
}

interface ModuleWithLessons extends Module {
  lessons: LessonPlan[];
}

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
  const [draggedItem, setDraggedItem] = useState<CourseItem | null>(null);
  const [selectedModule, setSelectedModule] = useState<ModuleWithLessons | null>(null);
  const [managementDialogOpen, setManagementDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch course details
  const { data: course, isLoading: courseLoading } = useQuery<Course>({
    queryKey: [`/api/courses/${id}`],
    enabled: !!id,
  });

  // Fetch course modules with lessons and assessments for unified ribbon
  const { data: courseContent = [], isLoading: contentLoading } = useQuery<CourseItem[]>({
    queryKey: [`/api/courses/${id}/content`],
    queryFn: async () => {
      const modules = await apiRequest(`/api/courses/${id}/modules`);
      const allItems: CourseItem[] = [];
      let sequenceOrder = 1;
      
      for (const module of modules) {
        // Get lessons for this module
        const lessons = await apiRequest(`/api/modules/${module.id}/lessons`);
        for (const lesson of lessons) {
          allItems.push({
            id: `lesson-${lesson.id}`,
            itemType: 'lesson',
            itemId: lesson.id,
            sequenceOrder: sequenceOrder++,
            isVisible: true,
            data: lesson,
            moduleTitle: module.title
          });
        }
        
        // Get assessments for this module (if any)
        try {
          const assessments = await apiRequest(`/api/modules/${module.id}/assessments`);
          for (const assessment of assessments) {
            if (assessment.assessmentType === 'summative') {
              allItems.push({
                id: `assessment-${assessment.id}`,
                itemType: 'assessment',
                itemId: assessment.id,
                sequenceOrder: sequenceOrder++,
                isVisible: true,
                data: assessment,
                moduleTitle: module.title
              });
            }
          }
        } catch (error) {
          // Module might not have assessments
        }
      }
      
      return allItems;
    },
    enabled: !!id,
  });

  // Fetch course modules for management
  const { data: modules = [], isLoading: modulesLoading } = useQuery<Module[]>({
    queryKey: [`/api/courses/${id}/modules`],
    queryFn: () => apiRequest(`/api/courses/${id}/modules`),
    enabled: !!id,
  });

  // Note: Reordering is handled at the module level, not course level

  const openModuleManagement = (module: Module) => {
    setSelectedModule({ ...module, lessons: [] });
    setManagementDialogOpen(true);
  };

  const closeModuleManagement = () => {
    setSelectedModule(null);
    setManagementDialogOpen(false);
    // Refresh the course content data
    queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/content`] });
  };

  if (courseLoading || contentLoading || modulesLoading) {
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

  const totalLessons = courseContent.filter(item => item.itemType === 'lesson').length;
  const totalAssessments = courseContent.filter(item => item.itemType === 'assessment').length;
  const completedLessons = courseContent.filter(item => 
    item.itemType === 'lesson' && (item.data as LessonPlan).isCompleted
  ).length;
  const totalDuration = courseContent
    .filter(item => item.itemType === 'lesson')
    .reduce((sum, item) => sum + (item.data as LessonPlan).duration, 0);

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
                <p className="text-2xl font-bold">{modules.length}</p>
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

      {/* Unified Course Ribbon */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Lesson
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Assessment
            </Button>
          </div>
        </div>
        
        {courseContent.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No content yet</h3>
            <p className="text-gray-600 mb-4">This course doesn't have any lessons or assessments yet.</p>
            <p className="text-sm text-gray-500">
              To add content, create lessons and assessments in the modules assigned to this course.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {courseContent.map((item, index) => (
              <Card 
                key={item.id} 
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-full">
                          <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                        </div>
                      </div>
                      
                      {item.itemType === 'lesson' ? (
                        <div className="flex items-center space-x-3">
                          <GraduationCap className="h-5 w-5 text-green-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">{(item.data as LessonPlan).title}</h4>
                            <p className="text-sm text-gray-500 mb-1">From module: {item.moduleTitle}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getLessonTypeColor((item.data as LessonPlan).lessonType)}`}
                              >
                                {(item.data as LessonPlan).lessonType}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {(item.data as LessonPlan).duration}min
                              </Badge>
                              {(item.data as LessonPlan).aiGenerated && (
                                <Badge variant="outline" className="text-xs text-purple-600 border-purple-200">
                                  AI Generated
                                </Badge>
                              )}
                              {(item.data as LessonPlan).hasAssessment && (
                                <Badge variant="outline" className="text-xs text-orange-600 border-orange-200">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Assessment
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3">
                          <ClipboardCheck className="h-5 w-5 text-orange-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">{(item.data as Assessment).title}</h4>
                            <p className="text-sm text-gray-500 mb-1">From module: {item.moduleTitle}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800 border-orange-200">
                                Summative Assessment
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {(item.data as Assessment).totalQuestions} questions
                              </Badge>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit {item.itemType === 'lesson' ? 'Lesson' : 'Assessment'}
                          </DropdownMenuItem>
                          {item.itemType === 'lesson' && (
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Teacher Guide
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Move className="h-4 w-4 mr-2" />
                            Reorder
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Module Management Dialog */}
      <Dialog open={managementDialogOpen} onOpenChange={setManagementDialogOpen}>
        <DialogContent className="max-w-7xl h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              {selectedModule ? `Manage Lessons - ${selectedModule.title}` : "Module Management"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            {selectedModule && (
              <LessonManagement 
                module={selectedModule} 
                onClose={closeModuleManagement} 
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}