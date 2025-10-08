import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Brain, Users, Clock, Target, Lightbulb, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface EnhancedLessonCreatorProps {
  moduleId: number;
  moduleObjectives: string[];
  onLessonCreated: () => void;
}

interface StudentPerformanceSummary {
  id: number;
  name: string;
  overallPercentage?: number;
  subjectAverages?: Record<string, number>;
}

export function EnhancedLessonCreator({ moduleId, moduleObjectives, onLessonCreated }: EnhancedLessonCreatorProps) {
  const [creationMethod, setCreationMethod] = useState<"ai" | "manual">("ai");
  const [lessonData, setLessonData] = useState({
    title: "",
    objectives: [] as string[],
    lessonType: "lecture" as "lecture" | "practical" | "project" | "assessment" | "discussion" | "fieldwork",
    duration: 45,
    difficulty: "intermediate" as "basic" | "intermediate" | "advanced",
    targetStudents: ["all"],
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get students for differentiation
  const { data: students = [] } = useQuery<StudentPerformanceSummary[]>({
    queryKey: ["/api/students"],
    enabled: creationMethod === "ai",
  });

  const aiLessonMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/lessons/ai-generate", {
        method: "POST",
        body: data,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "AI lesson created successfully",
      });
      onLessonCreated();
      queryClient.invalidateQueries({ queryKey: ["/api/lessons"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create AI lesson",
        variant: "destructive",
      });
    },
  });

  const manualLessonMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/lessons/manual-create", {
        method: "POST",
        body: data,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Manual lesson template created successfully",
      });
      onLessonCreated();
      queryClient.invalidateQueries({ queryKey: ["/api/lessons"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create manual lesson",
        variant: "destructive",
      });
    },
  });

  const handleObjectiveToggle = (objective: string) => {
    setLessonData(prev => ({
      ...prev,
      objectives: prev.objectives.includes(objective)
        ? prev.objectives.filter(obj => obj !== objective)
        : [...prev.objectives, objective]
    }));
  };

  const handleSubmit = async () => {
    if (lessonData.objectives.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one learning objective",
        variant: "destructive",
      });
      return;
    }

    if (!lessonData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a lesson title",
        variant: "destructive",
      });
      return;
    }

    const requestData = {
      moduleId,
      ...lessonData,
      studentData: creationMethod === "ai" ? students.map(student => ({
        id: student.id.toString(),
        name: student.name,
        averageScore: student.overallPercentage || 75,
        strengths: Object.entries(student.subjectAverages || {})
          .filter(([_, score]) => score > 80)
          .map(([subject, _]) => subject),
        weaknesses: Object.entries(student.subjectAverages || {})
          .filter(([_, score]) => score < 60)
          .map(([subject, _]) => subject),
        learningStyle: "mixed" as const,
      })) : undefined,
    };

    if (creationMethod === "ai") {
      aiLessonMutation.mutate(requestData);
    } else {
      manualLessonMutation.mutate(requestData);
    }
  };

  const lessonTypes = [
    { value: "lecture", label: "Lecture", icon: BookOpen },
    { value: "practical", label: "Practical", icon: Target },
    { value: "project", label: "Project", icon: Lightbulb },
    { value: "assessment", label: "Assessment", icon: CheckCircle },
    { value: "discussion", label: "Discussion", icon: Users },
    { value: "fieldwork", label: "Fieldwork", icon: Target },
  ];

  return (
    <div className="space-y-6">
      {/* Creation Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Lesson Creation Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={creationMethod} onValueChange={(value) => setCreationMethod(value as "ai" | "manual")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                AI Generated
              </TabsTrigger>
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Manual Creation
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ai" className="space-y-4">
              <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  AI will create a comprehensive lesson with differentiated activities, starter/main/plenary structure, 
                  and personalized adaptations based on student performance data.
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="manual" className="space-y-4">
              <Alert>
                <BookOpen className="h-4 w-4" />
                <AlertDescription>
                  Create a lesson template with industry-standard components that you can customize manually.
                  Perfect for teachers who prefer full control over lesson structure.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Lesson Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Lesson Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Lesson Title</Label>
              <Input
                id="title"
                value={lessonData.title}
                onChange={(e) => setLessonData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter lesson title"
              />
            </div>
            
            <div>
              <Label htmlFor="lessonType">Lesson Type</Label>
              <Select value={lessonData.lessonType} onValueChange={(value) => setLessonData(prev => ({ ...prev, lessonType: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lessonTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={lessonData.duration}
                onChange={(e) => setLessonData(prev => ({ ...prev, duration: parseInt(e.target.value) || 45 }))}
                min="15"
                max="120"
              />
            </div>
            
            <div>
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select value={lessonData.difficulty} onValueChange={(value) => setLessonData(prev => ({ ...prev, difficulty: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Learning Objectives Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Learning Objectives</Label>
            <div className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-3">
              {moduleObjectives.map((objective, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Checkbox
                    id={`objective-${index}`}
                    checked={lessonData.objectives.includes(objective)}
                    onCheckedChange={() => handleObjectiveToggle(objective)}
                  />
                  <Label htmlFor={`objective-${index}`} className="text-sm flex-1 cursor-pointer">
                    {objective}
                  </Label>
                </div>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {lessonData.objectives.map((objective, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {objective.substring(0, 50)}...
                </Badge>
              ))}
            </div>
          </div>

          {/* AI-Specific Configuration */}
          {creationMethod === "ai" && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4" />
                AI Enhancement Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Differentiated activities for all ability levels
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Student-specific adaptations based on performance
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Starter/Main/Plenary structure
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Assessment criteria and success measures
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onLessonCreated}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={aiLessonMutation.isPending || manualLessonMutation.isPending}
          className="min-w-32"
        >
          {aiLessonMutation.isPending || manualLessonMutation.isPending ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Creating...
            </div>
          ) : (
            <>
              {creationMethod === "ai" ? (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate AI Lesson
                </>
              ) : (
                <>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Create Manual Template
                </>
              )}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}