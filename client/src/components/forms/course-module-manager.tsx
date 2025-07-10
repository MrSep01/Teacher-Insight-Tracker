import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, BookOpen, Plus, Trash2, Users, Clock, ChevronRight } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Module, Course } from "@shared/schema";

interface CourseModuleManagerProps {
  course: Course;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CourseModuleManager({ course, open, onOpenChange }: CourseModuleManagerProps) {
  const [activeTab, setActiveTab] = useState<"assigned" | "available">("assigned");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Fetch modules assigned to this course
  const { data: assignedModules = [], isLoading: assignedLoading } = useQuery<Module[]>({
    queryKey: ["/api/courses", course.id, "modules"],
    enabled: open,
  });

  // Fetch available modules that can be added to the course
  const { data: availableModules = [], isLoading: availableLoading } = useQuery<Module[]>({
    queryKey: ["/api/courses", course.id, "available-modules"],
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
      queryClient.invalidateQueries({ queryKey: ["/api/courses", course.id, "modules"] });
      queryClient.invalidateQueries({ queryKey: ["/api/courses", course.id, "available-modules"] });
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
      queryClient.invalidateQueries({ queryKey: ["/api/courses", course.id, "modules"] });
      queryClient.invalidateQueries({ queryKey: ["/api/courses", course.id, "available-modules"] });
      toast({ title: "Module removed from course successfully" });
    },
    onError: () => {
      toast({ title: "Failed to remove module from course", variant: "destructive" });
    },
  });

  const handleAddModule = (moduleId: number) => {
    addModuleMutation.mutate({ moduleId, sequenceOrder: assignedModules.length + 1 });
  };

  const handleRemoveModule = (moduleId: number) => {
    if (confirm("Are you sure you want to remove this module from the course?")) {
      removeModuleMutation.mutate(moduleId);
    }
  };

  const filteredAssignedModules = assignedModules.filter(module =>
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.curriculumTopic?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAvailableModules = availableModules.filter(module =>
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.curriculumTopic?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Manage Course Modules</DialogTitle>
          <DialogDescription>
            Add or remove modules for <strong>{course.name}</strong>
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
                    <Card key={module.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-base leading-tight">{module.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {module.gradeLevels?.join(', ')} • {module.curriculumTopic}
                            </CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveModule(module.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
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
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            ) : (
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
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No available modules</h3>
                    <p className="text-gray-600 mb-4">
                      All your modules are already assigned to this course or you haven't created any modules yet.
                    </p>
                    <Button onClick={() => window.location.href = '/modules'}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Module
                    </Button>
                  </div>
                ) : (
                  filteredAvailableModules.map((module) => (
                    <Card key={module.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-base leading-tight">{module.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {module.gradeLevels?.join(', ')} • {module.curriculumTopic}
                            </CardDescription>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddModule(module.id)}
                            disabled={addModuleMutation.isPending}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
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
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}