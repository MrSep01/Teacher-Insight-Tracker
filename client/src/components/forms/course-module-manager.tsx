import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { AuthenticCurriculumSelector } from "@/components/forms/authentic-curriculum-selector";
import { 
  BookOpen, 
  Plus, 
  Search, 
  Trash2, 
  Users, 
  Clock, 
  ChevronRight,
  ExternalLink,
  Edit,
  Copy,
  MoreVertical
} from "lucide-react";
import type { Course, Module, InsertModule } from "@shared/schema";

interface CourseModuleManagerProps {
  course: Course;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CourseModuleManager({ course, open, onOpenChange }: CourseModuleManagerProps) {
  const [activeTab, setActiveTab] = useState<"assigned" | "available" | "create">("assigned");
  const [searchTerm, setSearchTerm] = useState("");
  const [, setLocation] = useLocation();
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Module form state
  const [moduleForm, setModuleForm] = useState({
    title: "",
    description: "",
    curriculumTopic: "",
    gradeLevels: [] as string[],
  });
  
  // Curriculum selection state
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);

  // Fetch assigned modules for the course
  const { data: assignedModules = [], isLoading: assignedLoading } = useQuery<Module[]>({
    queryKey: [`/api/courses/${course.id}/modules`],
    enabled: open && activeTab === "assigned",
  });

  // Fetch available modules that can be added to the course
  const { data: availableModules = [], isLoading: availableLoading } = useQuery<Module[]>({
    queryKey: [`/api/courses/${course.id}/available-modules`],
    enabled: open && activeTab === "available",
  });

  // Add module to course
  const addModuleMutation = useMutation({
    mutationFn: ({ moduleId, sequenceOrder }: { moduleId: number; sequenceOrder?: number }) =>
      apiRequest(`/api/courses/${course.id}/modules`, {
        method: "POST",
        body: { moduleId, sequenceOrder },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${course.id}/modules`] });
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${course.id}/available-modules`] });
      toast({ title: "Module added to course successfully" });
    },
    onError: () => {
      toast({ title: "Failed to add module to course", variant: "destructive" });
    },
  });

  // Remove module from course
  const removeModuleMutation = useMutation({
    mutationFn: (moduleId: number) =>
      apiRequest(`/api/courses/${course.id}/modules/${moduleId}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${course.id}/modules`] });
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${course.id}/available-modules`] });
      toast({ title: "Module removed from course successfully" });
    },
    onError: () => {
      toast({ title: "Failed to remove module from course", variant: "destructive" });
    },
  });

  // Create new module
  const createModuleMutation = useMutation({
    mutationFn: (data: InsertModule) =>
      apiRequest("/api/modules", { method: "POST", body: data }),
    onSuccess: (newModule: Module) => {
      // Add the newly created module to the course
      addModuleMutation.mutate({ moduleId: newModule.id, sequenceOrder: assignedModules.length + 1 });
      queryClient.invalidateQueries({ queryKey: ["/api/modules"] });
      resetModuleForm();
      setActiveTab("assigned");
      toast({ title: "Module created and added to course successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create module", variant: "destructive" });
    },
  });

  // Update module
  const updateModuleMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertModule> }) =>
      apiRequest(`/api/modules/${id}`, { method: "PATCH", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${course.id}/modules`] });
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${course.id}/available-modules`] });
      setEditingModule(null);
      resetModuleForm();
      toast({ title: "Module updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update module", variant: "destructive" });
    },
  });

  // Delete module completely
  const deleteModuleMutation = useMutation({
    mutationFn: (moduleId: number) =>
      apiRequest(`/api/modules/${moduleId}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${course.id}/modules`] });
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${course.id}/available-modules`] });
      queryClient.invalidateQueries({ queryKey: ["/api/modules"] });
      toast({ title: "Module deleted permanently" });
    },
    onError: () => {
      toast({ title: "Failed to delete module", variant: "destructive" });
    },
  });

  const handleAddModule = (moduleId: number) => {
    console.log('Adding module to course:', { moduleId, courseId: course.id });
    addModuleMutation.mutate({ moduleId, sequenceOrder: assignedModules.length + 1 });
  };

  const handleRemoveModule = (moduleId: number) => {
    if (confirm("Are you sure you want to remove this module from the course?")) {
      removeModuleMutation.mutate(moduleId);
    }
  };

  const handleModuleClick = (moduleId: number) => {
    onOpenChange(false); // Close the modal
    setLocation(`/modules/${moduleId}`); // Navigate to module detail page
  };

  const resetModuleForm = () => {
    setModuleForm({
      title: "",
      description: "",
      curriculumTopic: "",
      gradeLevels: [],
    });
    setSelectedObjectives([]);
    setEditingModule(null);
    setIsCreating(false);
  };

  const handleCreateModule = () => {
    setActiveTab("create");
    setIsCreating(true);
    resetModuleForm();
  };

  const handleEditModule = (module: Module) => {
    setEditingModule(module);
    setModuleForm({
      title: module.title,
      description: module.description || "",
      curriculumTopic: module.curriculumTopic || "",
      gradeLevels: module.gradeLevels || [],
    });
    setSelectedObjectives(module.objectives || []);
    setActiveTab("create");
  };

  const handleCopyModule = (module: Module) => {
    setModuleForm({
      title: `${module.title} (Copy)`,
      description: module.description || "",
      curriculumTopic: module.curriculumTopic || "",
      gradeLevels: module.gradeLevels || [],
    });
    setSelectedObjectives(module.objectives || []);
    setIsCreating(true);
    setActiveTab("create");
  };

  const handleDeleteModule = (moduleId: number) => {
    if (confirm("Are you sure you want to delete this module permanently? This will remove all associated lessons and assessments.")) {
      deleteModuleMutation.mutate(moduleId);
    }
  };

  const handleSubmitModule = () => {
    if (!moduleForm.title || selectedObjectives.length === 0) {
      toast({ title: "Please fill in title and select at least one objective", variant: "destructive" });
      return;
    }

    const moduleData: InsertModule = {
      title: moduleForm.title,
      description: moduleForm.description,
      curriculumTopic: moduleForm.curriculumTopic,
      gradeLevels: moduleForm.gradeLevels,
      topics: selectedTopics,
      objectives: selectedObjectives,
      estimatedHours: Math.max(1, Math.ceil(selectedObjectives.length * 0.5)), // Estimate based on objectives
    };

    if (editingModule) {
      updateModuleMutation.mutate({ id: editingModule.id, data: moduleData });
    } else {
      createModuleMutation.mutate(moduleData);
    }
  };

  const handleSelectionChange = (topics: string[], subtopics: string[], objectives: string[]) => {
    setSelectedTopics(topics);
    setSelectedSubtopics(subtopics);
    setSelectedObjectives(objectives);
  };

  const filteredAssignedModules = assignedModules.filter(module =>
    module?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module?.curriculumTopic?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAvailableModules = availableModules.filter(module =>
    module?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module?.curriculumTopic?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {activeTab === "create" 
              ? (editingModule ? "Edit Module" : "Create New Module")
              : "Manage Course Modules"
            }
          </DialogTitle>
          <DialogDescription>
            {activeTab === "create" 
              ? "Select objectives from the curriculum to create a comprehensive module"
              : `Add or remove modules for ${course.name}`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-4">
          {/* Search and Tab Navigation */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={activeTab === "assigned" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("assigned")}
                className="flex-1"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Assigned ({assignedModules.length})
              </Button>
              <Button
                variant={activeTab === "available" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("available")}
                className="flex-1"
              >
                <Plus className="h-4 w-4 mr-2" />
                Available ({availableModules.length})
              </Button>
              <Button
                variant={activeTab === "create" ? "default" : "ghost"}
                size="sm"
                onClick={handleCreateModule}
                className="flex-1"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <ScrollArea className="h-[400px] w-full">
            {activeTab === "assigned" ? (
              <div className="space-y-3">
                {assignedLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardHeader>
                          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ) : filteredAssignedModules.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No modules assigned</h3>
                    <p className="text-gray-600 mb-4">
                      This course doesn't have any modules yet. Switch to the Available tab to add modules.
                    </p>
                    <Button onClick={() => setActiveTab("available")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Modules
                    </Button>
                  </div>
                ) : (
                  filteredAssignedModules.map((module) => (
                    <Card key={module.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1" onClick={() => handleModuleClick(module.id)}>
                            <CardTitle className="text-base leading-tight">{module.title || 'Untitled Module'}</CardTitle>
                            <CardDescription className="mt-1">
                              {module.gradeLevels?.join(', ')} • {module.curriculumTopic}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleModuleClick(module.id)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              title="View Module"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditModule(module)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Module
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleCopyModule(module)}>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy Module
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleRemoveModule(module.id)}
                                  className="text-orange-600 focus:text-orange-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Remove from Course
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteModule(module.id)}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Permanently
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0" onClick={() => handleModuleClick(module.id)}>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {module.topics?.length || 0} topics
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {module.estimatedHours || 0}h
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{module.objectives?.length || 0} objectives</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{module.estimatedHours || 0}h</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-blue-600">
                            <span className="text-xs font-medium">View Details</span>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            ) : activeTab === "available" ? (
              <div className="space-y-3">
                {availableLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <CardHeader>
                          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ) : filteredAvailableModules.length === 0 ? (
                  <div className="text-center py-12">
                    <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No available modules</h3>
                    <p className="text-gray-600 mb-4">
                      All existing modules have been added to this course.
                    </p>
                    <Button onClick={handleCreateModule}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Module
                    </Button>
                  </div>
                ) : (
                  filteredAvailableModules.map((module) => (
                    <Card key={module.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1" onClick={() => handleModuleClick(module.id)}>
                            <CardTitle className="text-base leading-tight">{module.title || 'Untitled Module'}</CardTitle>
                            <CardDescription className="mt-1">
                              {module.gradeLevels?.join(', ')} • {module.curriculumTopic}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleModuleClick(module.id)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              title="View Module"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddModule(module.id);
                              }}
                              className="bg-green-600 hover:bg-green-700"
                              disabled={addModuleMutation.isPending}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0" onClick={() => handleModuleClick(module.id)}>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {module.topics?.length || 0} topics
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {module.estimatedHours || 0}h
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{module.objectives?.length || 0} objectives</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{module.estimatedHours || 0}h</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-blue-600">
                            <span className="text-xs font-medium">View Details</span>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            ) : (
              // Create Module Tab
              <div className="space-y-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Basic Information</TabsTrigger>
                    <TabsTrigger value="curriculum">Curriculum Selection</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="title">Module Title</Label>
                        <Input
                          id="title"
                          value={moduleForm.title}
                          onChange={(e) => setModuleForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter module title"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={moduleForm.description}
                          onChange={(e) => setModuleForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe this module's objectives and content"
                          className="mt-2"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label>Target Grade Levels</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {["10", "11", "12"].map((grade) => (
                            <Badge
                              key={grade}
                              variant={moduleForm.gradeLevels.includes(grade) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => {
                                const newGradeLevels = moduleForm.gradeLevels.includes(grade)
                                  ? moduleForm.gradeLevels.filter(g => g !== grade)
                                  : [...moduleForm.gradeLevels, grade];
                                setModuleForm(prev => ({ ...prev, gradeLevels: newGradeLevels }));
                              }}
                            >
                              Grade {grade}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="curriculum" className="space-y-4">
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <h4 className="font-medium mb-2">Curriculum Selection</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Select learning objectives from the IGCSE and A Level curriculum to create your module. 
                        Choose objectives that align with your course goals.
                      </p>
                    </div>
                    
                    <AuthenticCurriculumSelector
                      selectedObjectives={selectedObjectives}
                      onObjectivesChange={(objectives) => {
                        setSelectedObjectives(objectives);
                      }}
                      estimatedHours={Math.max(1, Math.ceil(selectedObjectives.length * 0.5))}
                      onEstimatedHoursChange={(hours) => {
                        // Auto-calculated based on objectives
                      }}
                    />
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    Selected: {selectedObjectives.length} objectives 
                    {selectedObjectives.length > 0 && (
                      <span className="ml-2">
                        (~{Math.max(1, Math.ceil(selectedObjectives.length * 0.5))}h estimated)
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        resetModuleForm();
                        setActiveTab("assigned");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSubmitModule}
                      disabled={!moduleForm.title || selectedObjectives.length === 0 || createModuleMutation.isPending || updateModuleMutation.isPending}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {createModuleMutation.isPending || updateModuleMutation.isPending 
                        ? "Saving..." 
                        : editingModule 
                          ? "Update Module" 
                          : "Create Module"
                      }
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}