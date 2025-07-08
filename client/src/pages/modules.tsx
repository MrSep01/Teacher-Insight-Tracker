import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { getCurriculumTopics } from "@shared/curriculum-data";
import { ModuleForm } from "@/components/forms/module-form";
import { LessonManagement } from "@/components/lesson-management";
import { 
  BookOpen, 
  Plus, 
  Clock, 
  Users, 
  Edit, 
  Trash2,
  FileText,
  Target,
  CheckCircle
} from "lucide-react";

interface Module {
  id: number;
  title: string;
  description: string;
  curriculumTopic: string;
  gradeLevels: string[];
  topics: string[];
  objectives: string[];
  estimatedHours: number;
  isActive: boolean;
  lessonCount?: number;
  createdAt: string;
}

export default function Modules() {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const { data: modules, isLoading } = useQuery({
    queryKey: ["/api/modules"],
    enabled: !!user?.profileCompleted,
  });

  const createModuleMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("/api/modules", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Module created successfully",
        description: "You can now add lesson plans to this module.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/modules"] });
      setIsCreateModalOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating module",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateModuleMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest(`/api/modules/${selectedModule?.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Module updated successfully",
        description: "Your changes have been saved.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/modules"] });
      setIsEditModalOpen(false);
      setSelectedModule(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating module",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const availableTopics = user?.curriculum ? getCurriculumTopics(user.curriculum) : [];

  if (!user?.profileCompleted) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>
              Please complete your teacher profile setup to access curriculum modules.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading modules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Curriculum Modules</h1>
          <p className="text-gray-600">
            Create and manage modules based on {user.curriculum} topics
          </p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Module
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Module</DialogTitle>
              <DialogDescription>
                Mix and match IGCSE and A Level topics to create flexible modules based on student abilities
              </DialogDescription>
            </DialogHeader>
            <ModuleForm
              onSubmit={(data) => createModuleMutation.mutate(data)}
              isLoading={createModuleMutation.isPending}
              onClose={() => setIsCreateModalOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Module Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Module</DialogTitle>
              <DialogDescription>
                Update your module settings and curriculum topics
              </DialogDescription>
            </DialogHeader>
            {selectedModule && (
              <ModuleForm
                module={selectedModule}
                onSubmit={(data) => updateModuleMutation.mutate(data)}
                isLoading={updateModuleMutation.isPending}
                onClose={() => setIsEditModalOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Flexible Curriculum Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-blue-800">Flexible Curriculum Approach</h3>
              <p className="text-blue-700">Primary: {user.curriculum}</p>
              <p className="text-sm text-blue-600 mt-1">
                Teaching Grades: {user.gradeLevels?.join(", ")}
              </p>
              <div className="mt-3 p-3 bg-white/60 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <Target className="inline h-4 w-4 mr-1 text-blue-600" />
                  <strong>New:</strong> Mix and match IGCSE and A Level topics to create modules that adapt to different student abilities within the same class.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      {modules && modules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module: Module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onEdit={() => {
                setSelectedModule(module);
                setIsEditModalOpen(true);
              }}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Modules Yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first curriculum module to start organizing lesson plans.
            </p>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Module
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface CreateModuleFormProps {
  availableTopics: any[];
  userGradeLevels: string[];
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

function CreateModuleForm({ availableTopics, userGradeLevels, onSubmit, isLoading }: CreateModuleFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    curriculumTopic: "",
    gradeLevels: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.curriculumTopic || formData.gradeLevels.length === 0) {
      return;
    }
    onSubmit(formData);
  };

  const handleGradeLevelToggle = (grade: string) => {
    setFormData(prev => ({
      ...prev,
      gradeLevels: prev.gradeLevels.includes(grade)
        ? prev.gradeLevels.filter(g => g !== grade)
        : [...prev.gradeLevels, grade]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="curriculumTopic">Curriculum Topic</Label>
        <Select
          value={formData.curriculumTopic}
          onValueChange={(value) => setFormData(prev => ({ ...prev, curriculumTopic: value }))}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select a curriculum topic" />
          </SelectTrigger>
          <SelectContent>
            {availableTopics.map((topic) => (
              <SelectItem key={topic.id} value={topic.id}>
                {topic.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="title">Module Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter module title"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe this module's objectives and content"
          className="mt-2"
          rows={3}
        />
      </div>

      <div>
        <Label>Target Grade Levels</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {userGradeLevels.map((grade) => (
            <Badge
              key={grade}
              variant={formData.gradeLevels.includes(grade) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleGradeLevelToggle(grade)}
            >
              Grade {grade}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
          {isLoading ? "Creating..." : "Create Module"}
        </Button>
      </div>
    </form>
  );
}

interface ModuleCardProps {
  module: Module;
  onEdit: () => void;
}

function ModuleCard({ module, onEdit }: ModuleCardProps) {
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);

  const handleLessonsClick = () => {
    setIsLessonModalOpen(true);
  };
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{module.title}</CardTitle>
            <CardDescription className="mt-1">
              {module.description}
            </CardDescription>
          </div>
          <Badge variant={module.isActive ? "default" : "secondary"}>
            {module.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Target className="h-4 w-4" />
            <span>Topic: {module.curriculumTopic}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>Grades: {module.gradeLevels.join(", ")}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FileText className="h-4 w-4" />
            <span>{module.lessonCount || 0} lesson plans</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Created {new Date(module.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={handleLessonsClick}>
            <FileText className="h-4 w-4 mr-1" />
            Lessons
          </Button>
        </div>
      </CardContent>
      
      {/* Lesson Management Modal */}
      <Dialog open={isLessonModalOpen} onOpenChange={setIsLessonModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Lesson Plans - {module.title}</DialogTitle>
            <DialogDescription>
              Create and manage lesson plans for this module
            </DialogDescription>
          </DialogHeader>
          <LessonManagement 
            module={module} 
            onClose={() => setIsLessonModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}