// @ts-nocheck
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
  Lightbulb,
  Video,
  Image,
  FileText,
  Play,
  Pause,
  RotateCcw,
  MessageSquare,
  Wand2,
  Plus,
  X,
  Upload,
  Link,
  Loader2,
  Save,
  Eye
} from "lucide-react";

const manualLessonSchema = z.object({
  moduleId: z.number(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  lessonType: z.enum(["lecture", "practical", "project", "assessment", "discussion", "fieldwork"]),
  duration: z.number().min(10, "Duration must be at least 10 minutes"),
  difficulty: z.enum(["basic", "intermediate", "advanced"]),
  objectives: z.array(z.string()).min(1, "At least one objective is required"),
  
  // Lesson Structure
  starter: z.object({
    hookActivity: z.string().optional(),
    priorKnowledge: z.string().optional(),
    learningGoals: z.string().optional(),
    multimedia: z.array(z.object({
      type: z.enum(["image", "video", "link"]),
      url: z.string(),
      title: z.string(),
      description: z.string().optional()
    })).optional()
  }),
  
  mainLesson: z.object({
    iDoContent: z.string().optional(),
    weDoContent: z.string().optional(),
    youDoContent: z.string().optional(),
    keyPoints: z.array(z.string()).optional(),
    explanations: z.array(z.string()).optional(),
    demonstrations: z.array(z.string()).optional(),
    multimedia: z.array(z.object({
      type: z.enum(["image", "video", "link"]),
      url: z.string(),
      title: z.string(),
      description: z.string().optional()
    })).optional()
  }),
  
  practice: z.object({
    guidedPractice: z.string().optional(),
    independentPractice: z.string().optional(),
    groupWork: z.string().optional(),
    differentiation: z.string().optional(),
    multimedia: z.array(z.object({
      type: z.enum(["image", "video", "link"]),
      url: z.string(),
      title: z.string(),
      description: z.string().optional()
    })).optional()
  }),
  
  review: z.object({
    keyPointsReview: z.string().optional(),
    studentReflection: z.string().optional(),
    summaryActivity: z.string().optional(),
    misconceptionCheck: z.string().optional(),
    multimedia: z.array(z.object({
      type: z.enum(["image", "video", "link"]),
      url: z.string(),
      title: z.string(),
      description: z.string().optional()
    })).optional()
  }),
  
  exitTicket: z.object({
    type: z.enum(["quickCheck", "reflection", "application", "feedback"]),
    content: z.string().optional(),
    questions: z.array(z.string()).optional(),
    multimedia: z.array(z.object({
      type: z.enum(["image", "video", "link"]),
      url: z.string(),
      title: z.string(),
      description: z.string().optional()
    })).optional()
  }),
  
  // Additional Fields
  resources: z.array(z.string()).optional(),
  equipment: z.array(z.string()).optional(),
  safetyNotes: z.string().optional(),
  homework: z.string().optional(),
  nextLessonPreview: z.string().optional(),
  teacherNotes: z.string().optional(),
});

type ManualLessonFormData = z.infer<typeof manualLessonSchema>;

interface ManualLessonCreatorProps {
  moduleId: number;
  moduleObjectives: string[];
  onLessonCreated: () => void;
  onCancel?: () => void;
}

interface MultimediaItem {
  type: "image" | "video" | "link";
  url: string;
  title: string;
  description?: string;
}

interface SectionAIProps {
  sectionName: string;
  currentContent: string;
  moduleObjectives: string[];
  lessonTopic: string;
  onAIGenerated: (content: string) => void;
}

function SectionAI({ sectionName, currentContent, moduleObjectives, lessonTopic, onAIGenerated }: SectionAIProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateAIContent = async () => {
    if (!lessonTopic) {
      toast({
        title: "Missing Information",
        description: "Please enter a lesson title first",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await apiRequest("/api/lessons/ai-generate-section", {
        method: "POST",
        body: JSON.stringify({
          section: sectionName,
          currentContent,
          moduleObjectives,
          lessonTopic,
        }),
      });
      
      onAIGenerated(response.content);
      toast({
        title: "AI Content Generated",
        description: `Generated content for ${sectionName}`,
      });
    } catch (error: any) {
      toast({
        title: "AI Generation Failed",
        description: error.message || "Failed to generate AI content",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={generateAIContent}
      disabled={isGenerating}
      className="ml-2"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="w-4 h-4 mr-2" />
          AI Generate
        </>
      )}
    </Button>
  );
}

function MultimediaManager({ 
  multimedia, 
  onAdd, 
  onRemove 
}: { 
  multimedia: MultimediaItem[];
  onAdd: (item: MultimediaItem) => void;
  onRemove: (index: number) => void;
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<MultimediaItem>({
    type: "image",
    url: "",
    title: "",
    description: ""
  });

  const handleAdd = () => {
    if (newItem.url && newItem.title) {
      onAdd(newItem);
      setNewItem({ type: "image", url: "", title: "", description: "" });
      setShowAddForm(false);
    }
  };

  const getMultimediaIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="w-4 h-4" />;
      case "image": return <Image className="w-4 h-4" />;
      case "link": return <Link className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-3">
      {multimedia.map((item, index) => (
        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          {getMultimediaIcon(item.type)}
          <div className="flex-1">
            <div className="font-medium text-sm">{item.title}</div>
            <div className="text-xs text-gray-600">{item.url}</div>
            {item.description && (
              <div className="text-xs text-gray-500 mt-1">{item.description}</div>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            {item.type}
          </Badge>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
      
      {showAddForm ? (
        <div className="space-y-3 p-3 border rounded-lg">
          <div className="flex items-center gap-3">
            <Select value={newItem.type} onValueChange={(value: "image" | "video" | "link") => setNewItem({...newItem, type: value})}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="link">Link</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Title"
              value={newItem.title}
              onChange={(e) => setNewItem({...newItem, title: e.target.value})}
              className="flex-1"
            />
          </div>
          <Input
            placeholder="URL"
            value={newItem.url}
            onChange={(e) => setNewItem({...newItem, url: e.target.value})}
          />
          <Input
            placeholder="Description (optional)"
            value={newItem.description}
            onChange={(e) => setNewItem({...newItem, description: e.target.value})}
          />
          <div className="flex items-center gap-2">
            <Button type="button" size="sm" onClick={handleAdd}>
              Add
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Media
        </Button>
      )}
    </div>
  );
}

export default function ManualLessonCreator({ 
  moduleId, 
  moduleObjectives, 
  onLessonCreated, 
  onCancel 
}: ManualLessonCreatorProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [previewMode, setPreviewMode] = useState(false);

  const form = useForm<ManualLessonFormData>({
    resolver: zodResolver(manualLessonSchema),
    defaultValues: {
      moduleId,
      title: "",
      description: "",
      lessonType: "lecture",
      duration: 60,
      difficulty: "intermediate",
      objectives: [],
      starter: { multimedia: [] },
      mainLesson: { keyPoints: [], explanations: [], demonstrations: [], multimedia: [] },
      practice: { multimedia: [] },
      review: { multimedia: [] },
      exitTicket: { type: "quickCheck", questions: [], multimedia: [] },
      resources: [],
      equipment: [],
    },
  });

  const createLessonMutation = useMutation({
    mutationFn: async (data: ManualLessonFormData) => {
      return await apiRequest("/api/lessons/manual-create", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Lesson created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/modules/${moduleId}/lessons`] });
      onLessonCreated();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create lesson",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ManualLessonFormData) => {
    createLessonMutation.mutate(data);
  };

  const lessonTypeDescriptions = {
    lecture: "Teacher-led instruction with explanations",
    practical: "Hands-on laboratory or practical work",
    project: "Student-centered project work",
    assessment: "Evaluation and testing activities",
    discussion: "Interactive discussion and debate",
    fieldwork: "Outside classroom activities"
  };

  const exitTicketTypes = {
    quickCheck: "Quick comprehension check",
    reflection: "Student reflection on learning",
    application: "Apply knowledge to new situation",
    feedback: "Feedback on lesson effectiveness"
  };

  if (previewMode) {
    const formData = form.getValues();
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Lesson Preview</h2>
          <div className="flex gap-2">
            <Button onClick={() => setPreviewMode(false)} variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button onClick={() => form.handleSubmit(onSubmit)()}>
              <Save className="w-4 h-4 mr-2" />
              Save Lesson
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{formData.title}</CardTitle>
            <p className="text-gray-600">{formData.description}</p>
            <div className="flex gap-2 mt-4">
              <Badge>{formData.lessonType}</Badge>
              <Badge variant="outline">{formData.difficulty}</Badge>
              <Badge variant="outline">{formData.duration} min</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Lesson content preview would go here */}
            <Alert>
              <AlertDescription>
                Lesson preview feature coming soon. Use Edit to modify your lesson content.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Create Manual Lesson</h2>
          <p className="text-gray-600">Build your lesson step by step with AI assistance for each section</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setPreviewMode(true)} variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          {onCancel && (
            <Button onClick={onCancel} variant="outline">
              Cancel
            </Button>
          )}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="10" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of the lesson..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="lessonType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lesson Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
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
              </div>
            </CardContent>
          </Card>

          {/* Lesson Objectives */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {moduleObjectives.map((objective, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`objective-${index}`}
                      checked={form.watch("objectives").includes(objective)}
                      onChange={(e) => {
                        const current = form.getValues("objectives");
                        if (e.target.checked) {
                          form.setValue("objectives", [...current, objective]);
                        } else {
                          form.setValue("objectives", current.filter(o => o !== objective));
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <label htmlFor={`objective-${index}`} className="text-sm flex-1">
                      {objective}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lesson Structure */}
          <div className="space-y-6">
            {/* Starter Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Starter / Hook Activity
                  <SectionAI 
                    sectionName="starter"
                    currentContent={form.watch("starter.hookActivity") || ""}
                    moduleObjectives={moduleObjectives}
                    lessonTopic={form.watch("title")}
                    onAIGenerated={(content) => form.setValue("starter.hookActivity", content)}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="starter.hookActivity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hook Activity</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Engaging activity to start the lesson..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="starter.priorKnowledge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prior Knowledge Check</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How will you check students' prior knowledge?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormLabel>Multimedia Content</FormLabel>
                  <MultimediaManager 
                    multimedia={form.watch("starter.multimedia") || []}
                    onAdd={(item) => {
                      const current = form.getValues("starter.multimedia") || [];
                      form.setValue("starter.multimedia", [...current, item]);
                    }}
                    onRemove={(index) => {
                      const current = form.getValues("starter.multimedia") || [];
                      form.setValue("starter.multimedia", current.filter((_, i) => i !== index));
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Main Lesson Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Main Lesson (I Do, We Do, You Do)
                  <SectionAI 
                    sectionName="mainLesson"
                    currentContent={form.watch("mainLesson.iDoContent") || ""}
                    moduleObjectives={moduleObjectives}
                    lessonTopic={form.watch("title")}
                    onAIGenerated={(content) => form.setValue("mainLesson.iDoContent", content)}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="mainLesson.iDoContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>I Do (Teacher Modeling)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What will you demonstrate or explain?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="mainLesson.weDoContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>We Do (Guided Practice)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How will you practice together with students?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="mainLesson.youDoContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>You Do (Independent Practice)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What will students do independently?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormLabel>Multimedia Content</FormLabel>
                  <MultimediaManager 
                    multimedia={form.watch("mainLesson.multimedia") || []}
                    onAdd={(item) => {
                      const current = form.getValues("mainLesson.multimedia") || [];
                      form.setValue("mainLesson.multimedia", [...current, item]);
                    }}
                    onRemove={(index) => {
                      const current = form.getValues("mainLesson.multimedia") || [];
                      form.setValue("mainLesson.multimedia", current.filter((_, i) => i !== index));
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Practice Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Practice Activities
                  <SectionAI 
                    sectionName="practice"
                    currentContent={form.watch("practice.guidedPractice") || ""}
                    moduleObjectives={moduleObjectives}
                    lessonTopic={form.watch("title")}
                    onAIGenerated={(content) => form.setValue("practice.guidedPractice", content)}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="practice.guidedPractice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guided Practice</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Structured practice activities with teacher support..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="practice.independentPractice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Independent Practice</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Activities students can do on their own..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="practice.differentiation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Differentiation Strategies</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How will you support different learning needs?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormLabel>Multimedia Content</FormLabel>
                  <MultimediaManager 
                    multimedia={form.watch("practice.multimedia") || []}
                    onAdd={(item) => {
                      const current = form.getValues("practice.multimedia") || [];
                      form.setValue("practice.multimedia", [...current, item]);
                    }}
                    onRemove={(index) => {
                      const current = form.getValues("practice.multimedia") || [];
                      form.setValue("practice.multimedia", current.filter((_, i) => i !== index));
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Review Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  Review & Consolidation
                  <SectionAI 
                    sectionName="review"
                    currentContent={form.watch("review.keyPointsReview") || ""}
                    moduleObjectives={moduleObjectives}
                    lessonTopic={form.watch("title")}
                    onAIGenerated={(content) => form.setValue("review.keyPointsReview", content)}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="review.keyPointsReview"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Points Review</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How will you review the main concepts?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="review.studentReflection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Reflection</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How will students reflect on their learning?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormLabel>Multimedia Content</FormLabel>
                  <MultimediaManager 
                    multimedia={form.watch("review.multimedia") || []}
                    onAdd={(item) => {
                      const current = form.getValues("review.multimedia") || [];
                      form.setValue("review.multimedia", [...current, item]);
                    }}
                    onRemove={(index) => {
                      const current = form.getValues("review.multimedia") || [];
                      form.setValue("review.multimedia", current.filter((_, i) => i !== index));
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Exit Ticket Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Exit Ticket
                  <SectionAI 
                    sectionName="exitTicket"
                    currentContent={form.watch("exitTicket.content") || ""}
                    moduleObjectives={moduleObjectives}
                    lessonTopic={form.watch("title")}
                    onAIGenerated={(content) => form.setValue("exitTicket.content", content)}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="exitTicket.type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exit Ticket Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(exitTicketTypes).map(([type, description]) => (
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
                  name="exitTicket.content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exit Ticket Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What will students do to show their understanding?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="homework"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Homework Assignment</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What homework will you assign?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="nextLessonPreview"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Next Lesson Preview</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief preview of what's coming next..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="teacherNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teacher Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Private notes for your reference..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPreviewMode(true)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              type="submit"
              disabled={createLessonMutation.isPending}
            >
              {createLessonMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Lesson
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}