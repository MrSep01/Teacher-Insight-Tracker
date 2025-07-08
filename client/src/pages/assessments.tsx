import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { AssessmentForm } from "@/components/forms/assessment-form";
import { AIAssessmentForm } from "@/components/forms/ai-assessment-form";
import { Search, Plus, Filter, Brain, Clock, Target, BookOpen, Calendar, Users, Sparkles } from "lucide-react";

export default function Assessments() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch assessments
  const { data: assessments, isLoading } = useQuery({
    queryKey: ["/api/assessments"],
  });

  // Create assessment mutation
  const createAssessmentMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("/api/assessments", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/assessments"] });
      setShowCreateDialog(false);
      toast({
        title: "Success",
        description: "Assessment created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create assessment",
        variant: "destructive",
      });
    },
  });

  // AI assessment generation mutation
  const generateAIAssessmentMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("/api/assessments/generate", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/assessments"] });
      setShowAIDialog(false);
      toast({
        title: "Success",
        description: "AI assessment generated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to generate AI assessment",
        variant: "destructive",
      });
    },
  });

  const filteredAssessments = assessments?.filter((assessment: any) =>
    assessment.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getAssessmentTypeColor = (type: string) => {
    switch (type) {
      case "formative": return "bg-blue-100 text-blue-800";
      case "summative": return "bg-green-100 text-green-800";
      case "diagnostic": return "bg-yellow-100 text-yellow-800";
      case "practice": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "basic": return "bg-emerald-100 text-emerald-800";
      case "intermediate": return "bg-orange-100 text-orange-800";
      case "advanced": return "bg-red-100 text-red-800";
      case "mixed": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Assessments</h2>
            <p className="text-sm text-gray-500">Create and manage assessments for your students.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                  <Plus className="h-4 w-4 mr-2" />
                  Manual Assessment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Assessment</DialogTitle>
                </DialogHeader>
                <AssessmentForm
                  onSubmit={(data) => createAssessmentMutation.mutate(data)}
                  isLoading={createAssessmentMutation.isPending}
                  onClose={() => setShowCreateDialog(false)}
                />
              </DialogContent>
            </Dialog>

            <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Brain className="h-4 w-4 mr-2" />
                  AI Assessment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>AI Assessment Generator</DialogTitle>
                </DialogHeader>
                <AIAssessmentForm
                  onSubmit={(data) => generateAIAssessmentMutation.mutate(data)}
                  isLoading={generateAIAssessmentMutation.isPending}
                  onClose={() => setShowAIDialog(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">All Assessments</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search assessments..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredAssessments.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm ? "No assessments match your search." : "Get started by creating your first assessment."}
                </p>
                <div className="flex justify-center space-x-4">
                  <Button onClick={() => setShowCreateDialog(true)} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Manual Assessment
                  </Button>
                  <Button onClick={() => setShowAIDialog(true)} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Assessment
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredAssessments.map((assessment: any) => (
                  <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1">{assessment.title}</CardTitle>
                          <CardDescription className="text-sm">
                            {assessment.description || "No description provided"}
                          </CardDescription>
                        </div>
                        {assessment.aiGenerated && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(assessment.date)}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {assessment.estimatedDuration || assessment.totalPoints || 0} min
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-600">
                            <Target className="h-4 w-4 mr-1" />
                            {assessment.totalPoints} points
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-1" />
                            0 students
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {assessment.assessmentType && (
                            <Badge className={`text-xs ${getAssessmentTypeColor(assessment.assessmentType)}`}>
                              {assessment.assessmentType}
                            </Badge>
                          )}
                          {assessment.difficulty && (
                            <Badge className={`text-xs ${getDifficultyColor(assessment.difficulty)}`}>
                              {assessment.difficulty}
                            </Badge>
                          )}
                        </div>

                        {assessment.topics && assessment.topics.length > 0 && (
                          <div className="text-xs text-gray-500">
                            Topics: {assessment.topics.slice(0, 2).join(", ")}
                            {assessment.topics.length > 2 && ` +${assessment.topics.length - 2} more`}
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-2 border-t">
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            View Details
                          </Button>
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                            Assign to Class
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
