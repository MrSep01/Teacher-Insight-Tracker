import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LessonManagement } from "@/components/lesson-management";
import { Link } from "wouter";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Target,
  CheckCircle,
  ArrowLeft,
  FileText
} from "lucide-react";
import type { Module } from "@shared/schema";

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

export default function ModuleDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: module, isLoading } = useQuery<Module>({
    queryKey: [`/api/modules/${id}`],
    enabled: !!id,
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
          <Link href="/modules">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Modules
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
          <Link href="/modules">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Modules
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{module.title}</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">{module.description}</p>
          </div>
        </div>
      </div>

      {/* Module Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Curriculum</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold truncate">{module.curriculumTopic}</div>
            <p className="text-xs text-muted-foreground">
              Grade {module.gradeLevels?.join(', ')}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">{module.estimatedHours}h</div>
            <p className="text-xs text-muted-foreground">
              Estimated teaching time
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Topics</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">{module.topics?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Curriculum topics covered
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Objectives</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">{module.objectives?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Learning objectives
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Module Details */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Topics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Curriculum Topics
            </CardTitle>
            <CardDescription>
              Topics covered in this module
            </CardDescription>
          </CardHeader>
          <CardContent>
            {module.topics && module.topics.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {module.topics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm font-medium text-blue-800">{topic}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No topics defined</p>
            )}
          </CardContent>
        </Card>

        {/* Learning Objectives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Learning Objectives
            </CardTitle>
            <CardDescription>
              What students will learn in this module
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
      </div>

      <Separator />

      {/* Lesson Management */}
      {module && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson Plans</h2>
          <LessonManagement module={module} onClose={() => {}} />
        </div>
      )}
    </div>
  );
}