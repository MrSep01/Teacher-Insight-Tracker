import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { AssessmentTypeBadge } from "@/components/assessment-form";
import { EnhancedAssessmentCreator } from "@/components/enhanced-assessment-creator";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  Target, 
  FileText,
  BookOpen,
  Users,
  Award,
  Brain,
  Calendar,
  TrendingUp
} from "lucide-react";

interface Assessment {
  id: number;
  title: string;
  description: string;
  type: "formative" | "summative";
  subjectId: number;
  totalPoints: number;
  duration: number;
  date: string;
  aiGenerated?: boolean;
  moduleId?: number;
  lessonId?: number;
  topics?: string[];
  objectives?: string[];
  subject?: {
    id: number;
    name: string;
    color: string;
  };
}

interface Module {
  id: number;
  title: string;
  topics: string[];
  objectives: string[];
}

interface LessonPlan {
  id: number;
  title: string;
  moduleId: number;
  objectives: string[];
  hasAssessment: boolean;
  assessmentType?: "formative" | "summative";
}

export function AssessmentDashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<"all" | "formative" | "summative">("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: assessments, isLoading: loadingAssessments } = useQuery({
    queryKey: ["/api/assessments"],
  });

  const { data: modules } = useQuery({
    queryKey: ["/api/modules"],
  });

  const { data: lessons } = useQuery({
    queryKey: ["/api/lessons"],
  });

  const { data: subjects } = useQuery({
    queryKey: ["/api/subjects"],
  });

  const createAssessmentMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("/api/assessments", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Assessment created successfully",
        description: "The assessment has been added to your curriculum.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/assessments"] });
      setIsCreateModalOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating assessment",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const filteredAssessments = assessments?.filter((assessment: Assessment) => {
    if (filterType === "all") return true;
    return assessment.type === filterType;
  }) || [];

  const assessmentStats = {
    total: assessments?.length || 0,
    formative: assessments?.filter((a: Assessment) => a.type === "formative").length || 0,
    summative: assessments?.filter((a: Assessment) => a.type === "summative").length || 0,
    recentWeek: assessments?.filter((a: Assessment) => {
      const assessmentDate = new Date(a.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return assessmentDate >= weekAgo;
    }).length || 0,
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Assessments</p>
                <p className="text-2xl font-bold">{assessmentStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Formative</p>
                <p className="text-2xl font-bold">{assessmentStats.formative}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Summative</p>
                <p className="text-2xl font-bold">{assessmentStats.summative}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold">{assessmentStats.recentWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header and Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Assessment Dashboard</h2>
          <p className="text-gray-600">Manage formative and summative assessments</p>
        </div>
        <div className="flex space-x-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="formative">Formative</SelectItem>
              <SelectItem value="summative">Summative</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Assessment
          </Button>
        </div>
      </div>

      {/* Assessments Grid */}
      {loadingAssessments ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="flex space-x-2">
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredAssessments.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Assessments Yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first assessment to track student progress.
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Assessment
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssessments.map((assessment: Assessment) => (
            <Card key={assessment.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-lg">{assessment.title}</CardTitle>
                      <AssessmentTypeBadge type={assessment.type} />
                    </div>
                    <p className="text-sm text-gray-600">{assessment.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedAssessment(assessment)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-500" />
                      {assessment.duration} min
                    </span>
                    <span className="flex items-center">
                      <Target className="h-4 w-4 mr-1 text-gray-500" />
                      {assessment.totalPoints} pts
                    </span>
                  </div>
                  
                  {assessment.subject && (
                    <div className="flex items-center text-sm">
                      <BookOpen className="h-4 w-4 mr-1 text-gray-500" />
                      <Badge 
                        variant="outline" 
                        style={{ backgroundColor: `${assessment.subject.color}20`, borderColor: assessment.subject.color }}
                      >
                        {assessment.subject.name}
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(assessment.date).toLocaleDateString()}
                  </div>
                  
                  {assessment.topics && assessment.topics.length > 0 && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-500 mb-1">Topics:</p>
                      <div className="flex flex-wrap gap-1">
                        {assessment.topics.slice(0, 3).map((topic, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {assessment.topics.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{assessment.topics.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Assessment Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Assessment</DialogTitle>
          </DialogHeader>
          {selectedModuleId ? (
            <EnhancedAssessmentCreator
              moduleId={selectedModuleId}
              moduleObjectives={modules?.find(m => m.id === selectedModuleId)?.objectives || []}
              onAssessmentCreated={() => {
                setIsCreateModalOpen(false);
                setSelectedModuleId(null);
              }}
            />
          ) : (
            <ModuleSelection 
              modules={modules || []}
              onModuleSelect={setSelectedModuleId}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface ModuleSelectionProps {
  modules: Module[];
  onModuleSelect: (moduleId: number) => void;
}

function ModuleSelection({ modules, onModuleSelect }: ModuleSelectionProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Select a Module</h3>
        <p className="text-gray-600">Choose which module this assessment should be created for</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => (
          <Card 
            key={module.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onModuleSelect(module.id)}
          >
            <CardHeader>
              <CardTitle className="text-base">{module.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span>{module.objectives?.length || 0} objectives</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-green-600" />
                  <span>{module.topics?.length || 0} topics</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {modules.length === 0 && (
        <div className="text-center py-8">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No modules available. Please create a module first.</p>
        </div>
      )}
    </div>
  );
}

// Legacy Assessment Form (now unused)
interface AssessmentCreationFormProps {
  modules: Module[];
  lessons: LessonPlan[];
  subjects: any[];
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

function AssessmentCreationForm({ modules, lessons, subjects, onSubmit, isLoading }: AssessmentCreationFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "formative" as "formative" | "summative",
    subjectId: "",
    moduleId: "",
    lessonId: "",
    totalPoints: 10,
    duration: 30,
    date: new Date().toISOString().split('T')[0],
    topics: [] as string[],
    objectives: [] as string[],
  });

  const selectedModule = modules.find(m => m.id === parseInt(formData.moduleId));
  const filteredLessons = lessons.filter(l => l.moduleId === parseInt(formData.moduleId));
  const selectedLesson = lessons.find(l => l.id === parseInt(formData.lessonId));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedLesson = lessons.find(l => l.id === parseInt(formData.lessonId));
    
    onSubmit({
      ...formData,
      subjectId: parseInt(formData.subjectId),
      moduleId: formData.moduleId ? parseInt(formData.moduleId) : undefined,
      lessonId: formData.lessonId ? parseInt(formData.lessonId) : undefined,
      topics: selectedModule?.topics || [],
      objectives: selectedLesson?.objectives || selectedModule?.objectives || [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Assessment Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter assessment title"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="type">Assessment Type</Label>
          <Select 
            value={formData.type} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as "formative" | "summative" }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="formative">Formative (For Learning)</SelectItem>
              <SelectItem value="summative">Summative (For Grading)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe what this assessment covers"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Select 
            value={formData.subjectId} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, subjectId: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id.toString()}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="module">Module (Optional)</Label>
          <Select 
            value={formData.moduleId} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, moduleId: value, lessonId: "" }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select module" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No module</SelectItem>
              {modules.map((module) => (
                <SelectItem key={module.id} value={module.id.toString()}>
                  {module.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {formData.moduleId && (
        <div>
          <Label htmlFor="lesson">Lesson (Optional)</Label>
          <Select 
            value={formData.lessonId} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, lessonId: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select lesson" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No specific lesson</SelectItem>
              {filteredLessons.map((lesson) => (
                <SelectItem key={lesson.id} value={lesson.id.toString()}>
                  {lesson.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="totalPoints">Total Points</Label>
          <Input
            id="totalPoints"
            type="number"
            value={formData.totalPoints}
            onChange={(e) => setFormData(prev => ({ ...prev, totalPoints: parseInt(e.target.value) }))}
            min="1"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
            min="1"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            required
          />
        </div>
      </div>

      {selectedModule && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Assessment Context</h4>
          <div className="space-y-2 text-sm">
            <p><strong>Module:</strong> {selectedModule.title}</p>
            <p><strong>Topics:</strong> {selectedModule.topics.join(", ")}</p>
            <p><strong>Available Objectives:</strong> {selectedModule.objectives.join(", ")}</p>
            {selectedLesson && (
              <>
                <p><strong>Lesson:</strong> {selectedLesson.title}</p>
                <p><strong>Lesson Objectives:</strong> {selectedLesson.objectives.join(", ")}</p>
                <p className="text-green-700 font-medium">Assessment will be based on these lesson objectives only.</p>
              </>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Assessment"}
        </Button>
      </div>
    </form>
  );
}