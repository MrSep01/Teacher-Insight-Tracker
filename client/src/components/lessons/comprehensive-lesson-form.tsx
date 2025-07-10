import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Clock, 
  Users, 
  BookOpen, 
  Target, 
  Wand2, 
  Settings, 
  Brain,
  Video,
  Image,
  Monitor,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";

const comprehensiveLessonSchema = z.object({
  moduleId: z.number(),
  lessonType: z.enum(["lecture", "practical", "project", "assessment", "discussion", "fieldwork"]),
  topic: z.string().min(1, "Topic is required"),
  duration: z.number().min(10, "Duration must be at least 10 minutes").max(300, "Duration cannot exceed 300 minutes"),
  difficulty: z.enum(["basic", "intermediate", "advanced"]),
  curriculum: z.string().min(1, "Curriculum is required"),
  gradeLevels: z.array(z.string()).min(1, "At least one grade level is required"),
  moduleTopics: z.array(z.string()),
  moduleObjectives: z.array(z.string()),
  teacherPreferences: z.object({
    includeMultimedia: z.boolean(),
    includeDifferentiation: z.boolean(),
    includeAssessmentRubrics: z.boolean(),
    includeExtensionActivities: z.boolean(),
    preferredTeachingStyle: z.enum(["direct", "inquiry", "collaborative", "mixed"]),
  }),
  generateMode: z.enum(["comprehensive", "focused", "differentiated"]),
});

type ComprehensiveLessonFormData = z.infer<typeof comprehensiveLessonSchema>;

interface ComprehensiveLessonFormProps {
  moduleId: number;
  moduleData: {
    title: string;
    curriculum: string;
    gradeLevels: string[];
    topics: string[];
    objectives: string[];
  };
  onSuccess?: (lesson: any) => void;
  onCancel?: () => void;
}

export default function ComprehensiveLessonForm({ 
  moduleId, 
  moduleData, 
  onSuccess, 
  onCancel 
}: ComprehensiveLessonFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

  const form = useForm<ComprehensiveLessonFormData>({
    resolver: zodResolver(comprehensiveLessonSchema),
    defaultValues: {
      moduleId,
      lessonType: "lecture",
      topic: "",
      duration: 60,
      difficulty: "intermediate",
      curriculum: moduleData.curriculum,
      gradeLevels: moduleData.gradeLevels,
      moduleTopics: moduleData.topics,
      moduleObjectives: moduleData.objectives,
      teacherPreferences: {
        includeMultimedia: true,
        includeDifferentiation: true,
        includeAssessmentRubrics: true,
        includeExtensionActivities: true,
        preferredTeachingStyle: "mixed",
      },
      generateMode: "comprehensive",
    },
  });

  // Fetch student performance data for differentiation
  const { data: studentPerformanceData, isLoading: isLoadingStudents } = useQuery({
    queryKey: ["/api/lessons/student-performance", moduleId],
    enabled: !!moduleId,
  });

  const generateLessonMutation = useMutation({
    mutationFn: async (data: ComprehensiveLessonFormData) => {
      const requestData = {
        ...data,
        studentPerformanceData: selectedStudents.length > 0 
          ? studentPerformanceData?.filter((student: any) => 
              selectedStudents.includes(student.studentId)
            )
          : studentPerformanceData,
      };
      
      return await apiRequest("/api/lessons/comprehensive-generate", {
        method: "POST",
        body: JSON.stringify(requestData),
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Comprehensive lesson generated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/modules", moduleId, "lessons"] });
      onSuccess?.(data);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to generate lesson",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ComprehensiveLessonFormData) => {
    generateLessonMutation.mutate(data);
  };

  const lessonTypeDescriptions = {
    lecture: "Teacher-led instruction with explanations and demonstrations",
    practical: "Hands-on laboratory work with experiments and investigations",
    project: "Student-centered project work with research and creation",
    assessment: "Evaluation activities to measure student understanding",
    discussion: "Interactive discussion and debate sessions",
    fieldwork: "Outside classroom activities and real-world applications"
  };

  const generateModeDescriptions = {
    comprehensive: "Full lesson with multimedia, differentiation, teacher guide, and assessment rubrics",
    focused: "Detailed lesson content with essential multimedia and basic differentiation",
    differentiated: "Specialized lesson tailored to specific student performance data"
  };

  const teachingStyleDescriptions = {
    direct: "Teacher-centered instruction with clear explanations and guided practice",
    inquiry: "Student-led discovery with questions and investigation",
    collaborative: "Group work and peer learning activities",
    mixed: "Combination of different teaching approaches"
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5" />
            Generate Comprehensive Lesson
          </CardTitle>
          <p className="text-sm text-gray-600">
            Create a full lesson with multimedia content, differentiated activities, teacher guides, and assessment rubrics
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Details</TabsTrigger>
                  <TabsTrigger value="preferences">AI Preferences</TabsTrigger>
                  <TabsTrigger value="students">Student Data</TabsTrigger>
                  <TabsTrigger value="review">Review & Generate</TabsTrigger>
                </TabsList>

                {/* Basic Details Tab */}
                <TabsContent value="basic" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="topic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lesson Topic</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter lesson topic..." {...field} />
                          </FormControl>
                          <FormDescription>
                            The specific topic this lesson will cover
                          </FormDescription>
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
                              max="300" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Total lesson duration in minutes
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lessonType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lesson Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select lesson type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(lessonTypeDescriptions).map(([type, description]) => (
                                <SelectItem key={type} value={type}>
                                  <div>
                                    <div className="font-medium capitalize">{type}</div>
                                    <div className="text-xs text-gray-600">{description}</div>
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
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select difficulty" />
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
                  </div>

                  <FormField
                    control={form.control}
                    name="generateMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Generation Mode</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select generation mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(generateModeDescriptions).map(([mode, description]) => (
                              <SelectItem key={mode} value={mode}>
                                <div>
                                  <div className="font-medium capitalize">{mode}</div>
                                  <div className="text-xs text-gray-600">{description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Module Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Curriculum:</strong> {moduleData.curriculum}
                      </div>
                      <div>
                        <strong>Grade Levels:</strong> {moduleData.gradeLevels.join(", ")}
                      </div>
                      <div>
                        <strong>Topics:</strong> {moduleData.topics.length} topics
                      </div>
                      <div>
                        <strong>Objectives:</strong> {moduleData.objectives.length} objectives
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* AI Preferences Tab */}
                <TabsContent value="preferences" className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-sm mb-4">Content Generation Preferences</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="teacherPreferences.includeMultimedia"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="flex items-center gap-2">
                                  <Video className="w-4 h-4" />
                                  Include Multimedia Content
                                </FormLabel>
                                <FormDescription>
                                  Generate suggestions for videos, images, and interactive content
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="teacherPreferences.includeDifferentiation"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="flex items-center gap-2">
                                  <Users className="w-4 h-4" />
                                  Include Differentiation
                                </FormLabel>
                                <FormDescription>
                                  Create activities for different ability levels
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="teacherPreferences.includeAssessmentRubrics"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4" />
                                  Include Assessment Rubrics
                                </FormLabel>
                                <FormDescription>
                                  Generate detailed assessment rubrics
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="teacherPreferences.includeExtensionActivities"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="flex items-center gap-2">
                                  <Target className="w-4 h-4" />
                                  Include Extension Activities
                                </FormLabel>
                                <FormDescription>
                                  Add activities for advanced students
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <FormField
                        control={form.control}
                        name="teacherPreferences.preferredTeachingStyle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Teaching Style</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select teaching style" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.entries(teachingStyleDescriptions).map(([style, description]) => (
                                  <SelectItem key={style} value={style}>
                                    <div>
                                      <div className="font-medium capitalize">{style}</div>
                                      <div className="text-xs text-gray-600">{description}</div>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              This will influence the AI's approach to lesson design
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Student Data Tab */}
                <TabsContent value="students" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Student Performance Data</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Select students to create personalized differentiation. If none selected, a general lesson will be created.
                      </p>
                    </div>

                    {isLoadingStudents ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span className="ml-2">Loading student data...</span>
                      </div>
                    ) : studentPerformanceData && studentPerformanceData.length > 0 ? (
                      <div className="grid gap-4">
                        {studentPerformanceData.map((student: any) => (
                          <Card key={student.studentId} className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <Checkbox
                                  checked={selectedStudents.includes(student.studentId)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedStudents([...selectedStudents, student.studentId]);
                                    } else {
                                      setSelectedStudents(selectedStudents.filter(id => id !== student.studentId));
                                    }
                                  }}
                                />
                                <div>
                                  <h5 className="font-medium">{student.name}</h5>
                                  <p className="text-sm text-gray-600">
                                    Average Score: {student.averageScore}% | Learning Style: {student.learningStyle}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {student.averageScore >= 80 ? 'High Performing' : 
                                   student.averageScore >= 60 ? 'On Track' : 'Needs Support'}
                                </Badge>
                              </div>
                            </div>
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              <div>
                                <strong>Strengths:</strong> {student.strengths.join(", ") || "None identified"}
                              </div>
                              <div>
                                <strong>Areas for Improvement:</strong> {student.weaknesses.join(", ") || "None identified"}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          No student performance data available. The AI will generate a general lesson that can be adapted based on student needs.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </TabsContent>

                {/* Review Tab */}
                <TabsContent value="review" className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-sm mb-4">Review Your Lesson Generation Settings</h4>
                    </div>

                    <div className="grid gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Basic Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Topic:</span>
                            <span className="font-medium">{form.watch("topic") || "Not specified"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span className="font-medium">{form.watch("duration")} minutes</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Lesson Type:</span>
                            <span className="font-medium capitalize">{form.watch("lessonType")}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Difficulty:</span>
                            <span className="font-medium capitalize">{form.watch("difficulty")}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Generation Mode:</span>
                            <span className="font-medium capitalize">{form.watch("generateMode")}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">AI Preferences</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Teaching Style:</span>
                            <span className="font-medium capitalize">{form.watch("teacherPreferences.preferredTeachingStyle")}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Include Multimedia:</span>
                            <span className="font-medium">{form.watch("teacherPreferences.includeMultimedia") ? "Yes" : "No"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Include Differentiation:</span>
                            <span className="font-medium">{form.watch("teacherPreferences.includeDifferentiation") ? "Yes" : "No"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Include Assessment Rubrics:</span>
                            <span className="font-medium">{form.watch("teacherPreferences.includeAssessmentRubrics") ? "Yes" : "No"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Include Extension Activities:</span>
                            <span className="font-medium">{form.watch("teacherPreferences.includeExtensionActivities") ? "Yes" : "No"}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Student Data</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <div className="flex justify-between">
                            <span>Selected Students:</span>
                            <span className="font-medium">
                              {selectedStudents.length > 0 ? `${selectedStudents.length} students selected` : "No students selected (general lesson)"}
                            </span>
                          </div>
                          {selectedStudents.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {selectedStudents.map(studentId => {
                                const student = studentPerformanceData?.find((s: any) => s.studentId === studentId);
                                return (
                                  <Badge key={studentId} variant="outline" className="text-xs">
                                    {student?.name}
                                  </Badge>
                                );
                              })}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    <Alert>
                      <Brain className="h-4 w-4" />
                      <AlertDescription>
                        The AI will generate a comprehensive lesson including full content, teacher guide, multimedia suggestions, 
                        differentiated activities, and assessment rubrics. This process may take 30-60 seconds.
                      </AlertDescription>
                    </Alert>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex items-center justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={generateLessonMutation.isPending}
                >
                  Cancel
                </Button>
                <div className="flex gap-2">
                  {activeTab !== "basic" && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const tabs = ["basic", "preferences", "students", "review"];
                        const currentIndex = tabs.indexOf(activeTab);
                        if (currentIndex > 0) {
                          setActiveTab(tabs[currentIndex - 1]);
                        }
                      }}
                      disabled={generateLessonMutation.isPending}
                    >
                      Previous
                    </Button>
                  )}
                  {activeTab !== "review" ? (
                    <Button
                      type="button"
                      onClick={() => {
                        const tabs = ["basic", "preferences", "students", "review"];
                        const currentIndex = tabs.indexOf(activeTab);
                        if (currentIndex < tabs.length - 1) {
                          setActiveTab(tabs[currentIndex + 1]);
                        }
                      }}
                      disabled={generateLessonMutation.isPending}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={generateLessonMutation.isPending || !form.watch("topic")}
                      className="flex items-center gap-2"
                    >
                      {generateLessonMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4" />
                          Generate Comprehensive Lesson
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}