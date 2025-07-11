import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, BookOpen, Target, CheckCircle2, Users, Eye, Edit, Trash2, Plus, Clock, GraduationCap } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

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
  aiGenerated: boolean;
  createdAt: string;
  // Additional fields from module
  moduleName?: string;
  courseName?: string;
  grade?: string;
  level?: string;
}

interface Module {
  id: number;
  title: string;
  description: string;
  curriculumTopic: string;
  gradeLevels: string[];
  topics: string[];
  objectives: string[];
  estimatedHours: number;
  createdAt: string;
  // Additional fields from course
  courseName?: string;
  grade?: string;
  level?: string;
}

interface Assessment {
  id: number;
  title: string;
  description: string;
  assessmentType: "formative" | "summative" | "diagnostic" | "practice";
  difficulty: "basic" | "intermediate" | "advanced";
  totalPoints: number;
  estimatedDuration: number;
  createdAt: string;
  // Additional fields from module/course
  moduleName?: string;
  courseName?: string;
  grade?: string;
  level?: string;
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

export default function Lessons() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("modules");

  // Fetch all lessons from all modules
  const { data: lessons = [], isLoading: lessonsLoading } = useQuery<LessonPlan[]>({
    queryKey: ["/api/lessons/all"],
    queryFn: async () => {
      return await apiRequest("/api/lessons/all");
    },
  });

  // Fetch all modules
  const { data: modules = [], isLoading: modulesLoading } = useQuery<Module[]>({
    queryKey: ["/api/modules/all"],
    queryFn: async () => {
      return await apiRequest("/api/modules/all");
    },
  });

  // Fetch all assessments
  const { data: assessments = [], isLoading: assessmentsLoading } = useQuery<Assessment[]>({
    queryKey: ["/api/assessments/all"],
    queryFn: async () => {
      return await apiRequest("/api/assessments/all");
    },
  });

  // Filter functions
  const filteredLessons = lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.moduleName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.courseName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredModules = modules.filter(module =>
    module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.curriculumTopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.courseName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAssessments = assessments.filter(assessment =>
    assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assessment.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assessment.moduleName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assessment.courseName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Teaching Resources Library</h2>
            <p className="text-sm text-gray-500">Access all your modules, lessons, and assessments in organized sections</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="modules" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Modules ({filteredModules.length})
              </TabsTrigger>
              <TabsTrigger value="lessons" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Lessons ({filteredLessons.length})
              </TabsTrigger>
              <TabsTrigger value="assessments" className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Assessments ({filteredAssessments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessonsLoading ? (
                  <div className="col-span-full text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-gray-500 mt-2">Loading lessons...</p>
                  </div>
                ) : filteredLessons.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
                    <p className="text-gray-500 mb-4">
                      {searchQuery ? "No lessons match your search criteria." : "Create your first lesson to get started."}
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Lesson
                    </Button>
                  </div>
                ) : (
                  filteredLessons.map((lesson) => {
                    const IconComponent = getLessonTypeIcon(lesson.lessonType);
                    return (
                      <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-2 line-clamp-2">{lesson.title}</CardTitle>
                              <p className="text-sm text-gray-600 line-clamp-3">{lesson.description}</p>
                            </div>
                            <IconComponent className="h-5 w-5 text-gray-400 ml-2 flex-shrink-0" />
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center flex-wrap gap-2 mb-4">
                            <Badge variant="outline" className={getLessonTypeColor(lesson.lessonType)}>
                              {lesson.lessonType}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {lesson.duration}min
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {lesson.difficulty}
                            </Badge>
                            {lesson.aiGenerated && (
                              <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                                AI Generated
                              </Badge>
                            )}
                          </div>
                          
                          {lesson.courseName && (
                            <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                              <GraduationCap className="h-4 w-4" />
                              <span>{lesson.courseName}</span>
                              {lesson.grade && <span>• Grade {lesson.grade}</span>}
                              {lesson.level && <span>• {lesson.level}</span>}
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </div>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>
            </TabsContent>

            <TabsContent value="modules" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modulesLoading ? (
                  <div className="col-span-full text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-gray-500 mt-2">Loading modules...</p>
                  </div>
                ) : filteredModules.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No modules found</h3>
                    <p className="text-gray-500 mb-4">
                      {searchQuery ? "No modules match your search criteria." : "Create your first module to get started."}
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Module
                    </Button>
                  </div>
                ) : (
                  filteredModules.map((module) => (
                    <Card key={module.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2 line-clamp-2">{module.title}</CardTitle>
                            <p className="text-sm text-gray-600 line-clamp-3">{module.description}</p>
                          </div>
                          <Target className="h-5 w-5 text-gray-400 ml-2 flex-shrink-0" />
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="text-xs">
                            {module.curriculumTopic}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {module.estimatedHours}h
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {module.objectives.length} objectives
                          </Badge>
                        </div>
                        
                        <div className="flex items-center flex-wrap gap-1 mb-3">
                          {module.gradeLevels.map((grade, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              Grade {grade}
                            </Badge>
                          ))}
                        </div>
                        
                        {module.courseName && (
                          <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                            <GraduationCap className="h-4 w-4" />
                            <span>{module.courseName}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="assessments" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assessmentsLoading ? (
                  <div className="col-span-full text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-gray-500 mt-2">Loading assessments...</p>
                  </div>
                ) : filteredAssessments.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <CheckCircle2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments found</h3>
                    <p className="text-gray-500 mb-4">
                      {searchQuery ? "No assessments match your search criteria." : "Create your first assessment to get started."}
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Assessment
                    </Button>
                  </div>
                ) : (
                  filteredAssessments.map((assessment) => (
                    <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2 line-clamp-2">{assessment.title}</CardTitle>
                            <p className="text-sm text-gray-600 line-clamp-3">{assessment.description}</p>
                          </div>
                          <CheckCircle2 className="h-5 w-5 text-gray-400 ml-2 flex-shrink-0" />
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800 border-orange-200">
                            {assessment.assessmentType}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {assessment.estimatedDuration}min
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {assessment.totalPoints} points
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {assessment.difficulty}
                          </Badge>
                        </div>
                        
                        {assessment.courseName && (
                          <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                            <GraduationCap className="h-4 w-4" />
                            <span>{assessment.courseName}</span>
                            {assessment.grade && <span>• Grade {assessment.grade}</span>}
                            {assessment.level && <span>• {assessment.level}</span>}
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}