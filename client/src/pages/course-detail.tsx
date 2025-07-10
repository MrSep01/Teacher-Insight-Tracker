import { useState } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  AlertTriangle
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { LessonManagement } from "@/components/lesson-management";
import type { Course, Module } from "@shared/schema";

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
  const [openModules, setOpenModules] = useState<Set<number>>(new Set());
  const [selectedModule, setSelectedModule] = useState<ModuleWithLessons | null>(null);
  const [managementDialogOpen, setManagementDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch course details
  const { data: course, isLoading: courseLoading } = useQuery<Course>({
    queryKey: [`/api/courses/${id}`],
    enabled: !!id,
  });

  // Fetch course modules with lessons
  const { data: modules = [], isLoading: modulesLoading } = useQuery<ModuleWithLessons[]>({
    queryKey: [`/api/courses/${id}/modules-with-lessons`],
    queryFn: async () => {
      const courseModules = await apiRequest(`/api/courses/${id}/modules`);
      
      // Fetch lessons for each module
      const modulesWithLessons = await Promise.all(
        courseModules.map(async (module: Module) => {
          try {
            const lessons = await apiRequest(`/api/modules/${module.id}/lessons`);
            return { ...module, lessons: lessons || [] };
          } catch (error) {
            console.error(`Error fetching lessons for module ${module.id}:`, error);
            return { ...module, lessons: [] };
          }
        })
      );
      
      return modulesWithLessons;
    },
    enabled: !!id,
  });

  const toggleModule = (moduleId: number) => {
    setOpenModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const openModuleManagement = (module: ModuleWithLessons) => {
    setSelectedModule(module);
    setManagementDialogOpen(true);
  };

  const closeModuleManagement = () => {
    setSelectedModule(null);
    setManagementDialogOpen(false);
    // Refresh the modules data
    queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/modules-with-lessons`] });
  };

  if (courseLoading || modulesLoading) {
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

  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const completedLessons = modules.reduce((sum, module) => 
    sum + module.lessons.filter(lesson => lesson.isCompleted).length, 0
  );
  const totalDuration = modules.reduce((sum, module) => 
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <CheckCircle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Progress</p>
                <p className="text-2xl font-bold">{totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Modules Ribbon */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Course Modules</h2>
        
        {modules.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No modules yet</h3>
            <p className="text-gray-600">This course doesn't have any modules assigned yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {modules.map((module) => (
              <Card key={module.id} className="overflow-hidden">
                <Collapsible 
                  open={openModules.has(module.id)}
                  onOpenChange={() => toggleModule(module.id)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            {openModules.has(module.id) ? (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-gray-500" />
                            )}
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{module.title}</CardTitle>
                            <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {module.lessons.length} lessons
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {module.estimatedHours}h
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {module.gradeLevels?.join(', ')}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {/* Module Info */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Topics</h4>
                              {module.topics && module.topics.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {module.topics.map((topic, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {topic}
                                    </Badge>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500">No topics defined</p>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Objectives</h4>
                              {module.objectives && module.objectives.length > 0 ? (
                                <div className="space-y-1">
                                  {module.objectives.slice(0, 3).map((objective, index) => (
                                    <div key={index} className="flex items-start space-x-2">
                                      <Target className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                      <span className="text-xs text-gray-600">{objective}</span>
                                    </div>
                                  ))}
                                  {module.objectives.length > 3 && (
                                    <p className="text-xs text-gray-500">
                                      +{module.objectives.length - 3} more objectives
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500">No objectives defined</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Teacher Management Tools */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">Lesson Management</h4>
                            <Button 
                              size="sm" 
                              onClick={() => openModuleManagement(module)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Settings className="h-4 w-4 mr-2" />
                              Manage Lessons
                            </Button>
                          </div>
                          
                          {module.lessons.length === 0 ? (
                            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                              <GraduationCap className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600 mb-3">No lessons created yet</p>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => openModuleManagement(module)}
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Create First Lesson
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {module.lessons.map((lesson, index) => {
                                const LessonIcon = getLessonTypeIcon(lesson.lessonType);
                                return (
                                  <div key={lesson.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                                    <div className="flex items-center space-x-3">
                                      <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-full">
                                        <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                                      </div>
                                      <LessonIcon className="h-5 w-5 text-gray-600" />
                                      <div>
                                        <h5 className="font-medium text-gray-900">{lesson.title}</h5>
                                        <div className="flex items-center space-x-2 mt-1">
                                          <Badge 
                                            variant="outline" 
                                            className={`text-xs ${getLessonTypeColor(lesson.lessonType)}`}
                                          >
                                            {lesson.lessonType}
                                          </Badge>
                                          <Badge variant="secondary" className="text-xs">
                                            {lesson.duration}min
                                          </Badge>
                                          {lesson.aiGenerated && (
                                            <Badge variant="outline" className="text-xs text-purple-600 border-purple-200">
                                              AI Generated
                                            </Badge>
                                          )}
                                          {lesson.hasAssessment && (
                                            <Badge variant="outline" className="text-xs text-orange-600 border-orange-200">
                                              <CheckCircle2 className="h-3 w-3 mr-1" />
                                              Assessment
                                            </Badge>
                                          )}
                                          {lesson.safetyNotes && (
                                            <Badge variant="outline" className="text-xs text-yellow-600 border-yellow-200">
                                              <AlertTriangle className="h-3 w-3 mr-1" />
                                              Safety Notes
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <MoreVertical className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem onClick={() => openModuleManagement(module)}>
                                            <Eye className="h-4 w-4 mr-2" />
                                            View Details
                                          </DropdownMenuItem>
                                          <DropdownMenuItem onClick={() => openModuleManagement(module)}>
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit Lesson
                                          </DropdownMenuItem>
                                          <DropdownMenuItem onClick={() => openModuleManagement(module)}>
                                            <FileText className="h-4 w-4 mr-2" />
                                            Teacher Guide
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem onClick={() => openModuleManagement(module)}>
                                            <Copy className="h-4 w-4 mr-2" />
                                            Duplicate
                                          </DropdownMenuItem>
                                          <DropdownMenuItem onClick={() => openModuleManagement(module)}>
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
                                );
                              })}
                              
                              {/* Add Lesson Button */}
                              <div className="flex justify-center pt-3">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => openModuleManagement(module)}
                                  className="border-dashed"
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Another Lesson
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
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