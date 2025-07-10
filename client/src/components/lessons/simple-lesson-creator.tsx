import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Clock, 
  Target, 
  BookOpen, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Save,
  Plus,
  X
} from "lucide-react";

const simpleLessonSchema = z.object({
  moduleId: z.number(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  lessonType: z.enum(["lecture", "practical", "project", "discussion", "fieldwork"]),
  duration: z.number().min(10, "Duration must be at least 10 minutes").max(180, "Duration cannot exceed 180 minutes"),
  difficulty: z.enum(["basic", "intermediate", "advanced"]),
  objectives: z.array(z.string()).min(1, "At least one objective is required"),
  
  // Lesson content
  activities: z.array(z.string()).min(1, "At least one activity is required"),
  resources: z.array(z.string()),
  equipment: z.array(z.string()).optional(),
  safetyNotes: z.string().optional(),
  
  // Formative assessment (built into lesson)
  formativeAssessment: z.object({
    hasFormativeAssessment: z.boolean(),
    assessmentType: z.enum(["exit_ticket", "quick_quiz", "peer_assessment", "self_reflection", "discussion_check"]).optional(),
    assessmentDescription: z.string().optional(),
    assessmentQuestions: z.array(z.string()).optional(),
  }),
  
  // Differentiation
  differentiation: z.string().optional(),
  homework: z.string().optional(),
});

type SimpleLessonFormData = z.infer<typeof simpleLessonSchema>;

interface SimpleLessonCreatorProps {
  moduleId: number;
  moduleObjectives: string[];
  onLessonCreated?: () => void;
  onCancel?: () => void;
}

const LESSON_TYPES = [
  { value: "lecture", label: "Lecture", description: "Direct instruction and explanation" },
  { value: "practical", label: "Practical", description: "Hands-on experiments or activities" },
  { value: "project", label: "Project", description: "Extended investigation or creation" },
  { value: "discussion", label: "Discussion", description: "Collaborative dialogue and debate" },
  { value: "fieldwork", label: "Fieldwork", description: "Outside classroom investigation" },
];

const FORMATIVE_ASSESSMENT_TYPES = [
  { value: "exit_ticket", label: "Exit Ticket", description: "Quick questions before leaving" },
  { value: "quick_quiz", label: "Quick Quiz", description: "Short formative quiz during lesson" },
  { value: "peer_assessment", label: "Peer Assessment", description: "Students assess each other's work" },
  { value: "self_reflection", label: "Self Reflection", description: "Students reflect on their learning" },
  { value: "discussion_check", label: "Discussion Check", description: "Check understanding through discussion" },
];

export default function SimpleLessonCreator({ 
  moduleId, 
  moduleObjectives, 
  onLessonCreated, 
  onCancel 
}: SimpleLessonCreatorProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([""]); 
  const [resources, setResources] = useState<string[]>([""]);
  const [equipment, setEquipment] = useState<string[]>([""]);
  const [assessmentQuestions, setAssessmentQuestions] = useState<string[]>([""]);

  const form = useForm<SimpleLessonFormData>({
    resolver: zodResolver(simpleLessonSchema),
    defaultValues: {
      moduleId,
      title: "",
      description: "",
      lessonType: "lecture",
      duration: 45,
      difficulty: "intermediate",
      objectives: [],
      activities: [""],
      resources: [""],
      equipment: [""],
      safetyNotes: "",
      formativeAssessment: {
        hasFormativeAssessment: true,
        assessmentType: "exit_ticket",
        assessmentDescription: "",
        assessmentQuestions: [""],
      },
      differentiation: "",
      homework: "",
    },
  });

  const createLessonMutation = useMutation({
    mutationFn: async (data: SimpleLessonFormData) => {
      const cleanedData = {
        title: data.title,
        description: data.description,
        lessonType: data.lessonType,
        duration: data.duration,
        difficulty: data.difficulty,
        objectives: selectedObjectives,
        activities: activities.filter(a => a.trim() !== ""),
        resources: resources.filter(r => r.trim() !== ""),
        equipment: equipment.filter(e => e.trim() !== ""),
        safetyNotes: data.safetyNotes || "",
        hasAssessment: data.formativeAssessment.hasFormativeAssessment,
        assessmentType: data.formativeAssessment.hasFormativeAssessment ? "formative" : undefined,
        assessmentDescription: data.formativeAssessment.assessmentDescription || "",
        differentiation: data.differentiation || "",
        homework: data.homework || "",
        creationMethod: "manual",
        aiGenerated: false,
      };
      
      return await apiRequest(`/api/modules/${moduleId}/lessons`, {
        method: "POST",
        body: JSON.stringify(cleanedData),
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Lesson created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/modules/${moduleId}/lessons`] });
      onLessonCreated?.();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create lesson",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SimpleLessonFormData) => {
    if (selectedObjectives.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one learning objective",
        variant: "destructive",
      });
      return;
    }
    createLessonMutation.mutate(data);
  };

  const handleObjectiveToggle = (objective: string) => {
    setSelectedObjectives(prev => 
      prev.includes(objective) 
        ? prev.filter(o => o !== objective)
        : [...prev, objective]
    );
  };

  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, ""]);
  };

  const updateField = (index: number, value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.map((item, i) => i === index ? value : item));
  };

  const removeField = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  if (moduleObjectives.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This module doesn't have any learning objectives yet. Please add objectives to the module before creating lessons.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter lesson title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of what students will learn..."
                        rows={3}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="lessonType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lesson Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {LESSON_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div>
                                <div className="font-medium">{type.label}</div>
                                <div className="text-xs text-gray-500">{type.description}</div>
                              </div>
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
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Learning Objectives</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Select the learning objectives this lesson will address:
                </p>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {moduleObjectives.map((objective, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Checkbox
                        id={`objective-${index}`}
                        checked={selectedObjectives.includes(objective)}
                        onCheckedChange={() => handleObjectiveToggle(objective)}
                      />
                      <label 
                        htmlFor={`objective-${index}`}
                        className="text-sm cursor-pointer leading-relaxed"
                      >
                        {objective}
                      </label>
                    </div>
                  ))}
                </div>
                {selectedObjectives.length > 0 && (
                  <div className="pt-2">
                    <p className="text-sm text-gray-600 mb-2">Selected objectives:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedObjectives.map((objective, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {objective.length > 50 ? `${objective.substring(0, 50)}...` : objective}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activities and Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Activities and Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Activities */}
            <div>
              <label className="text-sm font-medium">Learning Activities</label>
              <div className="space-y-2 mt-2">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="Describe a learning activity..."
                      value={activity}
                      onChange={(e) => updateField(index, e.target.value, setActivities)}
                    />
                    {activities.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeField(index, setActivities)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addField(setActivities)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </div>
            </div>

            {/* Resources */}
            <div>
              <label className="text-sm font-medium">Resources</label>
              <div className="space-y-2 mt-2">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="Textbook, website, video, etc..."
                      value={resource}
                      onChange={(e) => updateField(index, e.target.value, setResources)}
                    />
                    {resources.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeField(index, setResources)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addField(setResources)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Resource
                </Button>
              </div>
            </div>

            {/* Equipment (for practical lessons) */}
            {form.watch("lessonType") === "practical" && (
              <div>
                <label className="text-sm font-medium">Equipment & Materials</label>
                <div className="space-y-2 mt-2">
                  {equipment.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="Lab equipment, materials, etc..."
                        value={item}
                        onChange={(e) => updateField(index, e.target.value, setEquipment)}
                      />
                      {equipment.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeField(index, setEquipment)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addField(setEquipment)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Equipment
                  </Button>
                </div>
              </div>
            )}

            {/* Safety Notes */}
            {(form.watch("lessonType") === "practical" || form.watch("lessonType") === "fieldwork") && (
              <FormField
                control={form.control}
                name="safetyNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Safety Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Important safety considerations..."
                        rows={3}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>

        {/* Formative Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Formative Assessment</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="formativeAssessment.hasFormativeAssessment"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Include formative assessment in this lesson</FormLabel>
                    <p className="text-sm text-gray-600">
                      Quick checks to gauge student understanding during the lesson
                    </p>
                  </div>
                </FormItem>
              )}
            />

            {form.watch("formativeAssessment.hasFormativeAssessment") && (
              <>
                <FormField
                  control={form.control}
                  name="formativeAssessment.assessmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assessment Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select assessment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {FORMATIVE_ASSESSMENT_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div>
                                <div className="font-medium">{type.label}</div>
                                <div className="text-xs text-gray-500">{type.description}</div>
                              </div>
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
                  name="formativeAssessment.assessmentDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assessment Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How will you check for understanding?"
                          rows={2}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <label className="text-sm font-medium">Assessment Questions/Prompts</label>
                  <div className="space-y-2 mt-2">
                    {assessmentQuestions.map((question, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          placeholder="Enter a question or prompt..."
                          value={question}
                          onChange={(e) => updateField(index, e.target.value, setAssessmentQuestions)}
                        />
                        {assessmentQuestions.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeField(index, setAssessmentQuestions)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addField(setAssessmentQuestions)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Additional Options */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="differentiation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Differentiation Strategies</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="How will you adapt this lesson for different learners?"
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="homework"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Homework/Follow-up</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Optional homework or follow-up activities..."
                      rows={2}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={createLessonMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={createLessonMutation.isPending || selectedObjectives.length === 0}
          >
            {createLessonMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Lesson
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}