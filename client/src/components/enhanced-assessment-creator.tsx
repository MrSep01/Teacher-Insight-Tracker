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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { BookOpen, Brain, Clock, Target, CheckCircle, FileText, Calculator, Image, MousePointer, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface EnhancedAssessmentCreatorProps {
  moduleId: number;
  moduleObjectives: string[];
  onAssessmentCreated: () => void;
}

export function EnhancedAssessmentCreator({ moduleId, moduleObjectives, onAssessmentCreated }: EnhancedAssessmentCreatorProps) {
  const [creationMethod, setCreationMethod] = useState<"ai" | "manual">("ai");
  const [assessmentData, setAssessmentData] = useState({
    title: "",
    description: "",
    objectives: [] as string[],
    assessmentType: "formative" as "formative" | "summative" | "diagnostic" | "practice",
    difficulty: "intermediate" as "basic" | "intermediate" | "advanced" | "mixed",
    duration: 30,
    questionCount: 10,
    totalPoints: 100,
    questionTypes: [] as string[],
    feedbackType: "immediate" as "immediate" | "delayed" | "manual",
    allowRetakes: false,
    showCorrectAnswers: true,
    passingScore: 70,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get available question types
  const { data: questionTypes = [] } = useQuery({
    queryKey: ["/api/assessments/question-types"],
  });

  const aiAssessmentMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/assessments/ai-generate", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "AI assessment created successfully",
      });
      onAssessmentCreated();
      queryClient.invalidateQueries({ queryKey: ["/api/assessments"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create AI assessment",
        variant: "destructive",
      });
    },
  });

  const manualAssessmentMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/assessments/manual-create", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Manual assessment template created successfully",
      });
      onAssessmentCreated();
      queryClient.invalidateQueries({ queryKey: ["/api/assessments"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create manual assessment",
        variant: "destructive",
      });
    },
  });

  const handleObjectiveToggle = (objective: string) => {
    setAssessmentData(prev => ({
      ...prev,
      objectives: prev.objectives.includes(objective)
        ? prev.objectives.filter(obj => obj !== objective)
        : [...prev.objectives, objective]
    }));
  };

  const handleQuestionTypeToggle = (questionType: string) => {
    setAssessmentData(prev => ({
      ...prev,
      questionTypes: prev.questionTypes.includes(questionType)
        ? prev.questionTypes.filter(type => type !== questionType)
        : [...prev.questionTypes, questionType]
    }));
  };

  const handleSubmit = async () => {
    if (assessmentData.objectives.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one learning objective",
        variant: "destructive",
      });
      return;
    }

    if (!assessmentData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter an assessment title",
        variant: "destructive",
      });
      return;
    }

    if (assessmentData.questionTypes.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one question type",
        variant: "destructive",
      });
      return;
    }

    const requestData = {
      moduleId,
      ...assessmentData,
    };

    if (creationMethod === "ai") {
      aiAssessmentMutation.mutate(requestData);
    } else {
      manualAssessmentMutation.mutate(requestData);
    }
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case "multiple_choice":
      case "true_false":
        return List;
      case "short_answer":
      case "essay":
        return FileText;
      case "numeric":
      case "calculation":
        return Calculator;
      case "drawing":
      case "diagram_labeling":
        return Image;
      case "drag_drop":
      case "hotspot":
        return MousePointer;
      default:
        return CheckCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Creation Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Assessment Creation Method
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
                  AI will create a comprehensive assessment with diverse question types, detailed explanations, 
                  hints for student support, and automated grading capabilities.
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="manual" className="space-y-4">
              <Alert>
                <BookOpen className="h-4 w-4" />
                <AlertDescription>
                  Create an assessment template with your chosen question types that you can customize manually.
                  Perfect for teachers who prefer full control over question content.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Assessment Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Assessment Title</Label>
              <Input
                id="title"
                value={assessmentData.title}
                onChange={(e) => setAssessmentData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter assessment title"
              />
            </div>
            
            <div>
              <Label htmlFor="assessmentType">Assessment Type</Label>
              <Select value={assessmentData.assessmentType} onValueChange={(value) => setAssessmentData(prev => ({ ...prev, assessmentType: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formative">Formative</SelectItem>
                  <SelectItem value="summative">Summative</SelectItem>
                  <SelectItem value="diagnostic">Diagnostic</SelectItem>
                  <SelectItem value="practice">Practice</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={assessmentData.description}
              onChange={(e) => setAssessmentData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the assessment"
              rows={2}
            />
          </div>

          {/* Assessment Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={assessmentData.duration}
                onChange={(e) => setAssessmentData(prev => ({ ...prev, duration: parseInt(e.target.value) || 30 }))}
                min="5"
                max="180"
              />
            </div>
            
            <div>
              <Label htmlFor="questionCount">Number of Questions</Label>
              <Input
                id="questionCount"
                type="number"
                value={assessmentData.questionCount}
                onChange={(e) => setAssessmentData(prev => ({ ...prev, questionCount: parseInt(e.target.value) || 10 }))}
                min="1"
                max="50"
              />
            </div>
            
            <div>
              <Label htmlFor="totalPoints">Total Points</Label>
              <Input
                id="totalPoints"
                type="number"
                value={assessmentData.totalPoints}
                onChange={(e) => setAssessmentData(prev => ({ ...prev, totalPoints: parseInt(e.target.value) || 100 }))}
                min="1"
                max="1000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select value={assessmentData.difficulty} onValueChange={(value) => setAssessmentData(prev => ({ ...prev, difficulty: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="passingScore">Passing Score (%)</Label>
              <div className="space-y-2">
                <Slider
                  value={[assessmentData.passingScore]}
                  onValueChange={(value) => setAssessmentData(prev => ({ ...prev, passingScore: value[0] }))}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 text-center">{assessmentData.passingScore}%</div>
              </div>
            </div>
          </div>

          {/* Learning Objectives Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Learning Objectives</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-3">
              {moduleObjectives.map((objective, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Checkbox
                    id={`objective-${index}`}
                    checked={assessmentData.objectives.includes(objective)}
                    onCheckedChange={() => handleObjectiveToggle(objective)}
                  />
                  <Label htmlFor={`objective-${index}`} className="text-sm flex-1 cursor-pointer">
                    {objective}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Question Types Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Question Types</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {questionTypes.map((type) => {
                const Icon = getQuestionTypeIcon(type.value);
                return (
                  <div key={type.value} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox
                      id={`question-type-${type.value}`}
                      checked={assessmentData.questionTypes.includes(type.value)}
                      onCheckedChange={() => handleQuestionTypeToggle(type.value)}
                    />
                    <div className="flex-1">
                      <Label htmlFor={`question-type-${type.value}`} className="cursor-pointer font-medium flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {type.label}
                      </Label>
                      <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feedback & Grading Settings */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="font-medium">Feedback & Grading Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="feedbackType">Feedback Type</Label>
                <Select value={assessmentData.feedbackType} onValueChange={(value) => setAssessmentData(prev => ({ ...prev, feedbackType: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="allowRetakes"
                  checked={assessmentData.allowRetakes}
                  onCheckedChange={(checked) => setAssessmentData(prev => ({ ...prev, allowRetakes: checked }))}
                />
                <Label htmlFor="allowRetakes">Allow Retakes</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="showCorrectAnswers"
                  checked={assessmentData.showCorrectAnswers}
                  onCheckedChange={(checked) => setAssessmentData(prev => ({ ...prev, showCorrectAnswers: checked }))}
                />
                <Label htmlFor="showCorrectAnswers">Show Correct Answers</Label>
              </div>
            </div>
          </div>

          {/* AI-Specific Features */}
          {creationMethod === "ai" && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4" />
                AI Enhancement Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Detailed answer explanations
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Contextual hints for student support
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Automated grading and feedback
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Standards-aligned question quality
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onAssessmentCreated}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={aiAssessmentMutation.isPending || manualAssessmentMutation.isPending}
          className="min-w-32"
        >
          {aiAssessmentMutation.isPending || manualAssessmentMutation.isPending ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Creating...
            </div>
          ) : (
            <>
              {creationMethod === "ai" ? (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate AI Assessment
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