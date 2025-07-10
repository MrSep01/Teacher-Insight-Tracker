import { useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  BookOpen, 
  ChevronDown, 
  ChevronRight, 
  Users, 
  Clock, 
  Target, 
  ArrowLeft,
  FlaskConical,
  CheckCircle,
  MessageSquare,
  Calendar,
  GraduationCap,
  Play
} from "lucide-react";
import { Link } from "wouter";
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
    practical: FlaskConical,
    project: Target,
    assessment: CheckCircle,
    discussion: MessageSquare,
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

function getDifficultyColor(difficulty: string) {
  const colors = {
    basic: "bg-green-50 text-green-700 border-green-200",
    intermediate: "bg-yellow-50 text-yellow-700 border-yellow-200",
    advanced: "bg-red-50 text-red-700 border-red-200",
  };
  return colors[difficulty as keyof typeof colors] || "bg-gray-50 text-gray-700 border-gray-200";
}

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [openModules, setOpenModules] = useState<Set<number>>(new Set());
  const [openLessons, setOpenLessons] = useState<Set<number>>(new Set());

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

  const toggleLesson = (lessonId: number) => {
    setOpenLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId);
      } else {
        newSet.add(lessonId);
      }
      return newSet;
    });
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
    <div className="container mx-auto p-6 space-y-6">
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

                        {/* Lessons */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">Lessons</h4>
                          {module.lessons.length === 0 ? (
                            <div className="text-center py-8 bg-gray-50 rounded-lg">
                              <GraduationCap className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">No lessons in this module yet</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {module.lessons.map((lesson) => {
                                const LessonIcon = getLessonTypeIcon(lesson.lessonType);
                                return (
                                  <Card key={lesson.id} className="border-l-4 border-l-blue-500">
                                    <Collapsible 
                                      open={openLessons.has(lesson.id)}
                                      onOpenChange={() => toggleLesson(lesson.id)}
                                    >
                                      <CollapsibleTrigger asChild>
                                        <CardHeader className="py-3 hover:bg-gray-50 cursor-pointer">
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                              <div className="flex items-center space-x-2">
                                                {openLessons.has(lesson.id) ? (
                                                  <ChevronDown className="h-4 w-4 text-gray-500" />
                                                ) : (
                                                  <ChevronRight className="h-4 w-4 text-gray-500" />
                                                )}
                                                <LessonIcon className="h-4 w-4 text-gray-600" />
                                              </div>
                                              <div>
                                                <h5 className="font-medium text-gray-900">{lesson.title}</h5>
                                                <p className="text-sm text-gray-600">{lesson.description}</p>
                                              </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <Badge 
                                                variant="outline" 
                                                className={`text-xs ${getLessonTypeColor(lesson.lessonType)}`}
                                              >
                                                {lesson.lessonType}
                                              </Badge>
                                              <Badge 
                                                variant="outline" 
                                                className={`text-xs ${getDifficultyColor(lesson.difficulty)}`}
                                              >
                                                {lesson.difficulty}
                                              </Badge>
                                              <Badge variant="secondary" className="text-xs">
                                                {lesson.duration}min
                                              </Badge>
                                              {lesson.isCompleted && (
                                                <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                                                  <CheckCircle className="h-3 w-3 mr-1" />
                                                  Complete
                                                </Badge>
                                              )}
                                            </div>
                                          </div>
                                        </CardHeader>
                                      </CollapsibleTrigger>
                                      
                                      <CollapsibleContent>
                                        <CardContent className="pt-0">
                                          <div className="space-y-4">
                                            {/* Lesson Details */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                              <div>
                                                <h6 className="font-medium text-gray-900 mb-2">Objectives</h6>
                                                {lesson.objectives && lesson.objectives.length > 0 ? (
                                                  <div className="space-y-1">
                                                    {lesson.objectives.map((objective, index) => (
                                                      <div key={index} className="flex items-start space-x-2">
                                                        <Target className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                                        <span className="text-xs text-gray-600">{objective}</span>
                                                      </div>
                                                    ))}
                                                  </div>
                                                ) : (
                                                  <p className="text-sm text-gray-500">No objectives defined</p>
                                                )}
                                              </div>
                                              <div>
                                                <h6 className="font-medium text-gray-900 mb-2">Activities</h6>
                                                {lesson.activities && lesson.activities.length > 0 ? (
                                                  <div className="space-y-1">
                                                    {lesson.activities.slice(0, 3).map((activity, index) => (
                                                      <div key={index} className="flex items-start space-x-2">
                                                        <Play className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                                                        <span className="text-xs text-gray-600">{activity}</span>
                                                      </div>
                                                    ))}
                                                    {lesson.activities.length > 3 && (
                                                      <p className="text-xs text-gray-500">
                                                        +{lesson.activities.length - 3} more activities
                                                      </p>
                                                    )}
                                                  </div>
                                                ) : (
                                                  <p className="text-sm text-gray-500">No activities defined</p>
                                                )}
                                              </div>
                                            </div>

                                            {/* Resources */}
                                            {lesson.resources && lesson.resources.length > 0 && (
                                              <div>
                                                <h6 className="font-medium text-gray-900 mb-2">Resources</h6>
                                                <div className="flex flex-wrap gap-1">
                                                  {lesson.resources.map((resource, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                      {resource}
                                                    </Badge>
                                                  ))}
                                                </div>
                                              </div>
                                            )}

                                            {/* Equipment */}
                                            {lesson.equipment && lesson.equipment.length > 0 && (
                                              <div>
                                                <h6 className="font-medium text-gray-900 mb-2">Equipment</h6>
                                                <div className="flex flex-wrap gap-1">
                                                  {lesson.equipment.map((item, index) => (
                                                    <Badge key={index} variant="secondary" className="text-xs">
                                                      {item}
                                                    </Badge>
                                                  ))}
                                                </div>
                                              </div>
                                            )}

                                            {/* Safety Notes */}
                                            {lesson.safetyNotes && (
                                              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                                <h6 className="font-medium text-yellow-800 mb-1">Safety Notes</h6>
                                                <p className="text-sm text-yellow-700">{lesson.safetyNotes}</p>
                                              </div>
                                            )}

                                            {/* Assessment Info */}
                                            {lesson.hasAssessment && (
                                              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                                                <div className="flex items-center space-x-2">
                                                  <CheckCircle className="h-4 w-4 text-orange-600" />
                                                  <span className="font-medium text-orange-800">Assessment Included</span>
                                                  {lesson.assessmentType && (
                                                    <Badge variant="outline" className="text-xs">
                                                      {lesson.assessmentType}
                                                    </Badge>
                                                  )}
                                                </div>
                                              </div>
                                            )}

                                            {/* Action Button */}
                                            <div className="flex justify-end">
                                              <Link href={`/lessons/${lesson.id}`}>
                                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                                  <Play className="h-4 w-4 mr-2" />
                                                  Start Lesson
                                                </Button>
                                              </Link>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </CollapsibleContent>
                                    </Collapsible>
                                  </Card>
                                );
                              })}
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
    </div>
  );
}