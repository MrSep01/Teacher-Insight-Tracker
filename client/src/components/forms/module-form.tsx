import { useState, useEffect } from "react";

// Add global type declaration
declare global {
  interface Window {
    updateEstimatedHours?: (hours: number) => void;
  }
}
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, BookOpen, Target, Clock } from "lucide-react";
import { FlexibleCurriculumMapper } from "@/components/flexible-curriculum-mapper";

const moduleSchema = z.object({
  name: z.string().min(1, "Module name is required"),
  description: z.string().min(1, "Description is required"),
  curriculum: z.string().min(1, "Curriculum is required"),
  gradeLevel: z.string().min(1, "Grade level is required"),
  topics: z.array(z.string()).min(1, "At least one topic is required"),
  objectives: z.array(z.string()).optional(),
  estimatedHours: z.number().min(1, "Estimated hours must be greater than 0"),
});

type ModuleFormData = z.infer<typeof moduleSchema>;

interface ModuleFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    curriculumTopic: string;
    gradeLevels: string[];
    topics: string[];
    objectives: string[];
    estimatedHours: number;
  }) => void;
  isLoading?: boolean;
  onClose: () => void;
}

export function ModuleForm({ onSubmit, isLoading = false, onClose }: ModuleFormProps) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);
  const [autoCalculatedHours, setAutoCalculatedHours] = useState<number>(0);
  const [manuallyAdjusted, setManuallyAdjusted] = useState<boolean>(false);
  
  const form = useForm<ModuleFormData>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      name: "",
      description: "",
      curriculum: "",
      gradeLevel: "",
      topics: [],
      objectives: [],
      estimatedHours: 10,
    },
  });

  // Set up global function for curriculum mapper to update hours
  useEffect(() => {
    window.updateEstimatedHours = (hours: number) => {
      setAutoCalculatedHours(hours);
      if (!manuallyAdjusted && hours > 0) {
        form.setValue("estimatedHours", Math.ceil(hours));
      }
    };
    return () => {
      delete window.updateEstimatedHours;
    };
  }, [manuallyAdjusted, form]);

  const watchedCurriculum = form.watch("curriculum");
  const watchedGradeLevel = form.watch("gradeLevel");

  const handleTopicToggle = (topicId: string) => {
    const newTopics = selectedTopics.includes(topicId)
      ? selectedTopics.filter(id => id !== topicId)
      : [...selectedTopics, topicId];
    
    setSelectedTopics(newTopics);
    form.setValue("topics", newTopics);
  };

  const handleObjectiveToggle = (objectiveId: string) => {
    const newObjectives = selectedObjectives.includes(objectiveId)
      ? selectedObjectives.filter(id => id !== objectiveId)
      : [...selectedObjectives, objectiveId];
    
    setSelectedObjectives(newObjectives);
    form.setValue("objectives", newObjectives);
  };

  const handleSubtopicToggle = (subtopicId: string) => {
    // Handle subtopic selection (could auto-select related objectives)
    handleTopicToggle(subtopicId);
  };

  const handleSubmit = (data: ModuleFormData) => {
    // Map form data to match database schema - now includes all required fields
    const moduleData = {
      title: data.name, // Map name to title
      description: data.description,
      curriculumTopic: data.curriculum, // Map curriculum to curriculumTopic
      gradeLevels: [data.gradeLevel], // Convert to array as expected by schema
      topics: selectedTopics, // Include selected topics
      objectives: selectedObjectives, // Include selected objectives
      estimatedHours: data.estimatedHours || autoCalculatedHours, // Include estimated hours
    };
    
    console.log("Form submitting with data:", moduleData);
    onSubmit(moduleData);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum Selection</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Module Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Introduction to Organic Chemistry" {...field} />
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
                        placeholder="Brief description of the module content and objectives..."
                        className="resize-none"
                        rows={3}
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
              </div>

              <FormField
                control={form.control}
                name="estimatedHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <span>Estimated Hours</span>
                      {autoCalculatedHours > 0 && (
                        <Badge variant="outline" className="text-xs bg-blue-50">
                          <Clock className="h-3 w-3 mr-1" />
                          Auto: {Math.ceil(autoCalculatedHours)}h
                        </Badge>
                      )}
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input 
                          type="number" 
                          min="1" 
                          {...field} 
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value));
                            setManuallyAdjusted(true);
                          }}
                          placeholder="Enter estimated hours"
                        />
                        {autoCalculatedHours > 0 && (
                          <div className="flex items-center justify-between text-sm">
                            <p className="text-gray-600">
                              Specification-based estimate: {Math.ceil(autoCalculatedHours)} hours
                            </p>
                            {manuallyAdjusted && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  form.setValue("estimatedHours", Math.ceil(autoCalculatedHours));
                                  setManuallyAdjusted(false);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Use Auto Estimate
                              </Button>
                            )}
                          </div>
                        )}
                        <p className="text-xs text-gray-500">
                          💡 For new teachers: Start with the auto-calculated estimate based on Edexcel specifications, then adjust based on your teaching pace and student needs.
                        </p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Enhanced Selection Summary with Time Breakdown */}
              {(selectedTopics.length > 0 || selectedObjectives.length > 0) && (
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Current Selection</h4>
                    {autoCalculatedHours > 0 && (
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800">
                          <Clock className="h-3 w-3 mr-1" />
                          {Math.ceil(autoCalculatedHours)}h estimated
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Specification-based
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {selectedTopics.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          <BookOpen className="inline h-4 w-4 mr-1" />
                          Topics ({selectedTopics.length})
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {selectedTopics.slice(0, 5).map((topicId) => (
                            <Badge key={topicId} variant="secondary" className="text-xs">
                              {topicId}
                            </Badge>
                          ))}
                          {selectedTopics.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{selectedTopics.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    {selectedObjectives.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          <Target className="inline h-4 w-4 mr-1" />
                          Learning Objectives ({selectedObjectives.length})
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {selectedObjectives.slice(0, 5).map((objId) => (
                            <Badge key={objId} variant="secondary" className="text-xs">
                              {objId}
                            </Badge>
                          ))}
                          {selectedObjectives.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{selectedObjectives.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    {autoCalculatedHours > 0 && (
                      <div className="bg-white/60 p-3 rounded border border-green-200">
                        <p className="text-sm font-medium text-green-800 mb-1">
                          Teaching Time Breakdown:
                        </p>
                        <div className="text-xs text-gray-600 space-y-1">
                          <p>• Specification-based estimate: {Math.ceil(autoCalculatedHours)} hours</p>
                          <p>• Includes practical work and assessment preparation</p>
                          <p>• Adjust based on your students' needs and pace</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Module"}
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-4">
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-medium mb-2">Flexible Curriculum Mapping</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Mix and match IGCSE and A Level topics to create customized modules that adapt to different student abilities within the same class. 
              This approach allows for differentiated learning while maintaining curriculum alignment.
            </p>
          </div>
          
          <FlexibleCurriculumMapper
            selectedTopics={selectedTopics}
            selectedObjectives={selectedObjectives}
            onTopicToggle={handleTopicToggle}
            onObjectiveToggle={handleObjectiveToggle}
            onSubtopicToggle={handleSubtopicToggle}
            showLevelMixing={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}