// @ts-nocheck
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Brain, Target, Clock, BookOpen, Plus, X, Sparkles, Loader2 } from "lucide-react";

const aiAssessmentSchema = z.object({
  title: z.string().min(1, "Assessment title is required"),
  description: z.string().optional(),
  moduleId: z.string().optional(),
  classId: z.string().optional(),
  subjectId: z.string().min(1, "Subject is required"),
  assessmentType: z.enum(["formative", "summative", "diagnostic", "practice"], {
    required_error: "Please select an assessment type",
  }),
  difficulty: z.enum(["basic", "intermediate", "advanced", "mixed"], {
    required_error: "Please select difficulty level",
  }),
  duration: z.number().min(10).max(180),
  curriculum: z.string().min(1, "Curriculum is required"),
  gradeLevel: z.enum(["10", "11", "12"], {
    required_error: "Please select grade level",
  }),
});

type AIAssessmentFormData = z.infer<typeof aiAssessmentSchema>;

interface AIAssessmentFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  onClose: () => void;
}

const QUESTION_TYPES = [
  { id: "multiple_choice", label: "Multiple Choice", description: "Single correct answer from options" },
  { id: "short_answer", label: "Short Answer", description: "Brief written responses" },
  { id: "long_answer", label: "Long Answer", description: "Extended written responses" },
  { id: "calculation", label: "Calculation", description: "Mathematical problems" },
  { id: "diagram", label: "Diagram", description: "Visual interpretation questions" },
];

const ASSESSMENT_TYPES = [
  { value: "formative", label: "Formative", description: "Ongoing feedback during learning" },
  { value: "summative", label: "Summative", description: "Final evaluation of learning" },
  { value: "diagnostic", label: "Diagnostic", description: "Identify learning gaps" },
  { value: "practice", label: "Practice", description: "Skill reinforcement" },
];

const DIFFICULTY_LEVELS = [
  { value: "basic", label: "Basic", description: "Foundational concepts" },
  { value: "intermediate", label: "Intermediate", description: "Standard level application" },
  { value: "advanced", label: "Advanced", description: "Complex analysis and synthesis" },
  { value: "mixed", label: "Mixed", description: "Variety of difficulty levels" },
];

export function AIAssessmentForm({ onSubmit, isLoading = false, onClose }: AIAssessmentFormProps) {
  const { toast } = useToast();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>(["multiple_choice", "short_answer"]);
  const [objectives, setObjectives] = useState<any[]>([]);
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);
  const [customTopic, setCustomTopic] = useState("");

  const form = useForm<AIAssessmentFormData>({
    resolver: zodResolver(aiAssessmentSchema),
    defaultValues: {
      title: "",
      description: "",
      assessmentType: "summative",
      difficulty: "intermediate",
      duration: 60,
      curriculum: "IGCSE Chemistry Edexcel",
      gradeLevel: "10",
    },
  });

  const watchedModuleId = form.watch("moduleId");
  const watchedCurriculum = form.watch("curriculum");
  const watchedGradeLevel = form.watch("gradeLevel");

  interface ModuleSummary {
    id: number;
    title: string;
    objectives?: string[] | null;
    topics?: string[] | null;
  }

  interface ClassSummary {
    id: number;
    name: string;
  }

  interface SubjectSummary {
    id: number;
    topicArea: string;
  }

  // Fetch modules for selection
  const { data: modules = [] } = useQuery<ModuleSummary[]>({
    queryKey: ["/api/modules"],
  });

  // Fetch classes for selection
  const { data: classes = [] } = useQuery<ClassSummary[]>({
    queryKey: ["/api/classes"],
  });

  // Fetch subjects for selection
  const { data: subjects = [] } = useQuery<SubjectSummary[]>({
    queryKey: ["/api/subjects"],
  });

  // Suggest topics from module
  const suggestTopicsMutation = useMutation({
    mutationFn: async (moduleId: string) => {
      return await apiRequest("/api/assessments/suggest-topics", {
        method: "POST",
        body: { moduleId: parseInt(moduleId) },
      });
    },
    onSuccess: (data) => {
      setSuggestedTopics(data.topics || []);
    },
  });

  // Generate objectives from topics
  const generateObjectivesMutation = useMutation({
    mutationFn: async (data: { topics: string[]; curriculum: string; gradeLevel: string }) => {
      return await apiRequest("/api/assessments/generate-objectives", {
        method: "POST",
        body: data,
      });
    },
    onSuccess: (data) => {
      setObjectives(data.objectives || []);
    },
  });

  useEffect(() => {
    if (watchedModuleId) {
      suggestTopicsMutation.mutate(watchedModuleId);
    }
  }, [watchedModuleId]);

  useEffect(() => {
    if (selectedTopics.length > 0 && watchedCurriculum && watchedGradeLevel) {
      generateObjectivesMutation.mutate({
        topics: selectedTopics,
        curriculum: watchedCurriculum,
        gradeLevel: watchedGradeLevel,
      });
    }
  }, [selectedTopics, watchedCurriculum, watchedGradeLevel]);

  const handleAddTopic = (topic: string) => {
    if (!selectedTopics.includes(topic)) {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleRemoveTopic = (topic: string) => {
    setSelectedTopics(selectedTopics.filter(t => t !== topic));
  };

  const handleAddCustomTopic = () => {
    if (customTopic.trim() && !selectedTopics.includes(customTopic.trim())) {
      setSelectedTopics([...selectedTopics, customTopic.trim()]);
      setCustomTopic("");
    }
  };

  const handleQuestionTypeToggle = (type: string) => {
    if (selectedQuestionTypes.includes(type)) {
      setSelectedQuestionTypes(selectedQuestionTypes.filter(t => t !== type));
    } else {
      setSelectedQuestionTypes([...selectedQuestionTypes, type]);
    }
  };

  const handleSubmit = (data: AIAssessmentFormData) => {
    if (selectedTopics.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one topic",
        variant: "destructive",
      });
      return;
    }

    if (selectedQuestionTypes.length === 0) {
      toast({
        title: "Error", 
        description: "Please select at least one question type",
        variant: "destructive",
      });
      return;
    }

    const assessmentRequest = {
      ...data,
      moduleId: data.moduleId ? parseInt(data.moduleId) : undefined,
      classId: data.classId ? parseInt(data.classId) : undefined,
      subjectId: parseInt(data.subjectId),
      topics: selectedTopics,
      objectives,
      questionTypes: selectedQuestionTypes,
    };

    onSubmit(assessmentRequest);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Brain className="h-6 w-6 mr-2 text-blue-600" />
            AI Assessment Generator
          </h2>
          <p className="text-gray-600">Create comprehensive assessments powered by AI</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
              <CardDescription>Set up the fundamental details of your assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assessment Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Atomic Structure Assessment" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="10" 
                          max="180" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of the assessment focus..."
                        className="resize-none"
                        rows={2}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="curriculum"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Curriculum</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select curriculum" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="IGCSE Chemistry Edexcel">IGCSE Chemistry Edexcel</SelectItem>
                          <SelectItem value="A Level Chemistry Edexcel">A Level Chemistry Edexcel</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gradeLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade Level</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="10">Grade 10</SelectItem>
                          <SelectItem value="11">Grade 11</SelectItem>
                          <SelectItem value="12">Grade 12</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subjectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subjects?.map((subject: any) => (
                            <SelectItem key={subject.id} value={subject.id.toString()}>
                              {subject.topicArea}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="moduleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Module (Optional)</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select module" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {modules?.map((module: any) => (
                            <SelectItem key={module.id} value={module.id.toString()}>
                              {module.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="classId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class (Optional)</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classes?.map((cls: any) => (
                            <SelectItem key={cls.id} value={cls.id.toString()}>
                              {cls.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Assessment Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Assessment Configuration
              </CardTitle>
              <CardDescription>Define the type and difficulty of your assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="assessmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assessment Type</FormLabel>
                      <div className="space-y-2">
                        {ASSESSMENT_TYPES.map((type) => (
                          <div key={type.value} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id={type.value}
                              checked={field.value === type.value}
                              onChange={() => field.onChange(type.value)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <label htmlFor={type.value} className="flex-1 cursor-pointer">
                              <div className="font-medium">{type.label}</div>
                              <div className="text-sm text-gray-500">{type.description}</div>
                            </label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <div className="space-y-2">
                        {DIFFICULTY_LEVELS.map((level) => (
                          <div key={level.value} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id={level.value}
                              checked={field.value === level.value}
                              onChange={() => field.onChange(level.value)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <label htmlFor={level.value} className="flex-1 cursor-pointer">
                              <div className="font-medium">{level.label}</div>
                              <div className="text-sm text-gray-500">{level.description}</div>
                            </label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Topics Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                Topics & Learning Objectives
              </CardTitle>
              <CardDescription>
                {watchedModuleId ? "AI-suggested topics based on your selected module" : "Select topics to assess"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Selected Topics */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Selected Topics</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedTopics.map((topic) => (
                    <Badge key={topic} variant="secondary" className="flex items-center">
                      {topic}
                      <button
                        type="button"
                        onClick={() => handleRemoveTopic(topic)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {selectedTopics.length === 0 && (
                    <p className="text-sm text-gray-500">No topics selected</p>
                  )}
                </div>
              </div>

              {/* Suggested Topics */}
              {suggestedTopics.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <Brain className="h-4 w-4 mr-1" />
                    AI Suggested Topics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTopics.filter(topic => !selectedTopics.includes(topic)).map((topic) => (
                      <Button
                        key={topic}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddTopic(topic)}
                        className="text-xs"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        {topic}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Topic Input */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Add Custom Topic</h4>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter custom topic..."
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCustomTopic())}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddCustomTopic}
                    disabled={!customTopic.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Generated Objectives */}
              {objectives.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    AI Generated Learning Objectives
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {objectives.map((objective, index) => (
                      <div key={index} className="text-sm p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium">{objective.objective}</div>
                        <div className="text-gray-500 mt-1">
                          <Badge variant="outline" className="mr-2">{objective.bloomsLevel}</Badge>
                          <Badge variant="outline" className="mr-2">{objective.difficulty}</Badge>
                          <span className="text-xs">~{objective.estimatedMinutes} min</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Question Types */}
          <Card>
            <CardHeader>
              <CardTitle>Question Types</CardTitle>
              <CardDescription>Select the types of questions to include in your assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUESTION_TYPES.map((type) => (
                  <div key={type.id} className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedQuestionTypes.includes(type.id)}
                      onCheckedChange={() => handleQuestionTypeToggle(type.id)}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{type.label}</div>
                      <div className="text-sm text-gray-500">{type.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Assessment...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate AI Assessment
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}