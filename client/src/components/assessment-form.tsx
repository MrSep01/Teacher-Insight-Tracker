import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Trash2, 
  FileText, 
  Clock, 
  Target, 
  CheckCircle,
  AlertCircle,
  BookOpen,
  Brain,
  Award
} from "lucide-react";

const assessmentSchema = z.object({
  hasAssessment: z.boolean().default(false),
  assessmentType: z.enum(["formative", "summative"]).optional(),
  assessmentDescription: z.string().optional(),
  assessmentDuration: z.number().min(1).optional(),
  assessmentPoints: z.number().min(1).optional(),
  assessmentCriteria: z.array(z.string()).optional(),
  rubric: z.string().optional(),
});

type AssessmentFormData = z.infer<typeof assessmentSchema>;

interface AssessmentFormProps {
  initialData?: Partial<AssessmentFormData>;
  onSubmit: (data: AssessmentFormData) => void;
  isLoading?: boolean;
  className?: string;
  lessonObjectives?: string[]; // Pass lesson objectives to pre-populate criteria
  lessonTopics?: string[]; // Pass lesson topics for context
}

export function AssessmentForm({ initialData, onSubmit, isLoading = false, className, lessonObjectives = [], lessonTopics = [] }: AssessmentFormProps) {
  const [assessmentCriteria, setAssessmentCriteria] = useState<string[]>(
    initialData?.assessmentCriteria || 
    lessonObjectives.length > 0 ? lessonObjectives : [""]
  );

  const form = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      hasAssessment: initialData?.hasAssessment || false,
      assessmentType: initialData?.assessmentType || "formative",
      assessmentDescription: initialData?.assessmentDescription || "",
      assessmentDuration: initialData?.assessmentDuration || 15,
      assessmentPoints: initialData?.assessmentPoints || 10,
      assessmentCriteria: initialData?.assessmentCriteria || [],
      rubric: initialData?.rubric || "",
    },
  });

  const hasAssessment = form.watch("hasAssessment");
  const assessmentType = form.watch("assessmentType");

  const handleSubmit = (data: AssessmentFormData) => {
    const processedData = {
      ...data,
      assessmentCriteria: assessmentCriteria.filter(criteria => criteria.trim() !== ""),
    };
    onSubmit(processedData);
  };

  const updateCriteriaItem = (index: number, value: string) => {
    const updated = assessmentCriteria.map((item, i) => i === index ? value : item);
    setAssessmentCriteria(updated);
  };

  const addCriteriaItem = () => {
    setAssessmentCriteria([...assessmentCriteria, ""]);
  };

  const removeCriteriaItem = (index: number) => {
    const updated = assessmentCriteria.filter((_, i) => i !== index);
    setAssessmentCriteria(updated);
  };

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Assessment Toggle */}
          <div className="flex items-center space-x-3">
            <FormField
              control={form.control}
              name="hasAssessment"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium">
                    Include Assessment Component
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>

          {hasAssessment && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Assessment Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="criteria">Criteria</TabsTrigger>
                    <TabsTrigger value="rubric">Rubric</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="assessmentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Assessment Type</FormLabel>
                            <Select 
                              value={field.value} 
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select assessment type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="formative">
                                  <div className="flex items-center space-x-2">
                                    <Brain className="h-4 w-4 text-blue-600" />
                                    <span>Formative</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="summative">
                                  <div className="flex items-center space-x-2">
                                    <Award className="h-4 w-4 text-green-600" />
                                    <span>Summative</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="assessmentDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (minutes)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                max="180"
                                value={field.value || ""}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                placeholder="15"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="assessmentDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assessment Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Describe what students will be assessed on..."
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="assessmentPoints"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Points</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="100"
                              value={field.value || ""}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                              placeholder="10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Assessment Type Info */}
                    <div className={`p-4 rounded-lg border ${
                      assessmentType === 'formative' 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-green-50 border-green-200'
                    }`}>
                      <div className="flex items-start space-x-3">
                        {assessmentType === 'formative' ? (
                          <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
                        ) : (
                          <Award className="h-5 w-5 text-green-600 mt-0.5" />
                        )}
                        <div>
                          <h4 className={`font-medium ${
                            assessmentType === 'formative' ? 'text-blue-900' : 'text-green-900'
                          }`}>
                            {assessmentType === 'formative' ? 'Formative Assessment' : 'Summative Assessment'}
                          </h4>
                          <p className={`text-sm mt-1 ${
                            assessmentType === 'formative' ? 'text-blue-700' : 'text-green-700'
                          }`}>
                            {assessmentType === 'formative' 
                              ? 'Ongoing assessment during learning to provide feedback and improve understanding. Used for learning.'
                              : 'Assessment at the end of a learning period to evaluate student achievement. Used for grading and certification.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="criteria" className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Assessment Criteria</Label>
                      <p className="text-sm text-gray-600 mb-3">
                        Define what students need to demonstrate to succeed
                        {lessonObjectives.length > 0 && (
                          <span className="text-blue-600"> (Based on lesson objectives)</span>
                        )}
                      </p>
                      
                      {assessmentCriteria.map((criteria, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                          <Input
                            value={criteria}
                            onChange={(e) => updateCriteriaItem(index, e.target.value)}
                            placeholder="Enter assessment criteria"
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeCriteriaItem(index)}
                            disabled={assessmentCriteria.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addCriteriaItem}
                        className="mt-2"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Criteria
                      </Button>
                      
                      {lessonObjectives.length > 0 && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <h5 className="text-sm font-medium text-blue-900 mb-2">Lesson Objectives:</h5>
                          <ul className="text-sm text-blue-800 space-y-1">
                            {lessonObjectives.map((objective, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{objective}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="rubric" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="rubric"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detailed Rubric</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Define performance levels and criteria in detail..."
                              rows={8}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Rubric Template</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p><strong>Excellent (4):</strong> Exceeds expectations...</p>
                        <p><strong>Good (3):</strong> Meets expectations...</p>
                        <p><strong>Satisfactory (2):</strong> Approaching expectations...</p>
                        <p><strong>Needs Improvement (1):</strong> Below expectations...</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Assessment"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

// Assessment type badges for display
export function AssessmentTypeBadge({ type }: { type: "formative" | "summative" }) {
  if (type === "formative") {
    return (
      <Badge className="bg-blue-100 text-blue-800 border-blue-300">
        <Brain className="h-3 w-3 mr-1" />
        Formative
      </Badge>
    );
  } else {
    return (
      <Badge className="bg-green-100 text-green-800 border-green-300">
        <Award className="h-3 w-3 mr-1" />
        Summative
      </Badge>
    );
  }
}

// Assessment summary card
export function AssessmentSummary({ assessment }: { assessment: any }) {
  if (!assessment?.hasAssessment) return null;

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">Assessment Component</h4>
          <AssessmentTypeBadge type={assessment.assessmentType} />
        </div>
        
        <p className="text-sm text-gray-600 mb-3">
          {assessment.assessmentDescription}
        </p>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{assessment.assessmentDuration} min</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-gray-500" />
            <span>{assessment.assessmentPoints} points</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-gray-500" />
            <span>{assessment.assessmentCriteria?.length || 0} criteria</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}