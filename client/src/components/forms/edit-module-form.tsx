import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Info, Copy } from "lucide-react";
import { AuthenticCurriculumSelector } from "@/components/forms/authentic-curriculum-selector";
import type { Module } from "@shared/schema";

interface EditModuleFormProps {
  module: Module;
  onSubmit: (data: any) => void;
  onDuplicate?: (data: any) => void;
  isLoading: boolean;
  onClose: () => void;
  isLibraryModule?: boolean; // Determines if this is a library module (name can't be changed)
}

export function EditModuleForm({ 
  module, 
  onSubmit, 
  onDuplicate, 
  isLoading, 
  onClose, 
  isLibraryModule = true 
}: EditModuleFormProps) {
  const [formData, setFormData] = useState({
    title: module.title || "",
    description: module.description || "",
    curriculumTopic: module.curriculumTopic || "",
    gradeLevels: module.gradeLevels || [],
    topics: module.topics || [],
    objectives: module.objectives || [],
    estimatedHours: module.estimatedHours || 0,
  });

  // Separate state for curriculum mapper
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>(module.objectives || []);

  const [nameChanged, setNameChanged] = useState(false);
  const [showDuplicateOption, setShowDuplicateOption] = useState(false);

  // Check if name has changed
  useEffect(() => {
    const hasNameChanged = formData.title !== module.title;
    setNameChanged(hasNameChanged);
    setShowDuplicateOption(hasNameChanged && isLibraryModule);
  }, [formData.title, module.title, isLibraryModule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.curriculumTopic || formData.gradeLevels.length === 0) {
      return;
    }

    // If it's a library module and name changed, show duplicate option
    if (isLibraryModule && nameChanged) {
      setShowDuplicateOption(true);
      return;
    }

    onSubmit(formData);
  };

  const handleDuplicate = () => {
    if (onDuplicate) {
      onDuplicate(formData);
    }
  };

  const handleKeepOriginal = () => {
    // Reset name to original and save changes
    const dataToSave = { ...formData, title: module.title };
    onSubmit(dataToSave);
  };

  const handleGradeLevelToggle = (grade: string) => {
    setFormData(prev => ({
      ...prev,
      gradeLevels: prev.gradeLevels.includes(grade)
        ? prev.gradeLevels.filter(g => g !== grade)
        : [...prev.gradeLevels, grade]
    }));
  };

  const handleCurriculumSelection = (selection: {
    topics: string[];
    subtopics: string[];
    objectives: string[];
  }) => {
    setSelectedTopics(selection.topics);
    setSelectedSubtopics(selection.subtopics);
    setSelectedObjectives(selection.objectives);
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      topics: selection.topics,
      objectives: selection.objectives,
      // Calculate estimated hours from objectives
      estimatedHours: Math.ceil(selection.objectives.length * 0.5) // Rough estimate
    }));
  };

  return (
    <div className="space-y-6">
      {/* Warning for library modules */}
      {isLibraryModule && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            This is a library module used across multiple courses. Changes will affect all courses using this module.
          </AlertDescription>
        </Alert>
      )}

      {/* Show duplicate option if name changed */}
      {showDuplicateOption && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-3">
              <p>You've changed the module name. Since this is a library module, you have two options:</p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleKeepOriginal}
                  disabled={isLoading}
                >
                  Keep Original Name & Save Changes
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleDuplicate}
                  disabled={isLoading}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Create New Module
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum Selection</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Module Title</Label>
              {isLibraryModule && !nameChanged && (
                <p className="text-sm text-gray-500 mb-2">
                  Name cannot be changed for library modules (affects all courses)
                </p>
              )}
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter module title"
                className="mt-2"
                disabled={isLibraryModule && !nameChanged}
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
                {["10", "11", "12"].map((grade) => (
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

            <div>
              <Label>Curriculum Topic</Label>
              <Input
                value={formData.curriculumTopic}
                onChange={(e) => setFormData(prev => ({ ...prev, curriculumTopic: e.target.value }))}
                placeholder="e.g., IGCSE Chemistry Edexcel"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Module Summary</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                <Card className="p-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{formData.topics.length}</div>
                    <div className="text-sm text-gray-600">Topics</div>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{formData.objectives.length}</div>
                    <div className="text-sm text-gray-600">Objectives</div>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{formData.estimatedHours}</div>
                    <div className="text-sm text-gray-600">Hours</div>
                  </div>
                </Card>
              </div>
            </div>

            {!showDuplicateOption && (
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </form>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Curriculum Selection</h3>
              <p className="text-sm text-gray-600">
                Select topics and objectives from the curriculum to define what this module covers.
              </p>
            </div>

            <AuthenticCurriculumSelector
              selectedObjectives={selectedObjectives}
              onObjectivesChange={(objectives) => {
                setSelectedObjectives(objectives);
                setFormData(prev => ({ ...prev, objectives }));
              }}
              estimatedHours={formData.estimatedHours}
              onEstimatedHoursChange={(hours) => {
                setFormData(prev => ({ ...prev, estimatedHours: hours }));
              }}
            />

            {!showDuplicateOption && (
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isLoading || !formData.title || !formData.curriculumTopic || formData.gradeLevels.length === 0}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}