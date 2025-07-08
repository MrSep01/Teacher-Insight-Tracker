import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Book, Target, Clock, ChevronDown, ChevronRight, Check, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CurriculumTopic {
  id: string;
  name: string;
  description: string;
  specificationCode: string;
  timeAllocation: number;
  level: "IGCSE" | "A Level";
  subtopics: CurriculumSubtopic[];
}

interface CurriculumSubtopic {
  id: string;
  name: string;
  description: string;
  objectives: LearningObjective[];
  practicalWork?: string[];
  mathematicalSkills?: string[];
}

interface LearningObjective {
  id: string;
  code: string;
  statement: string;
  bloomsLevel: string;
  difficulty: string;
  commandWords: string[];
  estimatedTeachingMinutes: number;
  keywords: string[];
}

interface SelectionState {
  topics: string[];
  subtopics: string[];
  objectives: string[];
}

interface HierarchicalCurriculumMapperProps {
  selectedTopics: string[];
  selectedSubtopics: string[];
  selectedObjectives: string[];
  onSelectionChange: (selection: SelectionState) => void;
  showLevelMixing?: boolean;
}

export function HierarchicalCurriculumMapper({
  selectedTopics,
  selectedSubtopics,
  selectedObjectives,
  onSelectionChange,
  showLevelMixing = true
}: HierarchicalCurriculumMapperProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [bloomsFilter, setBlomsFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("igcse");
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const [expandedSubtopics, setExpandedSubtopics] = useState<string[]>([]);

  // Fetch both IGCSE and A Level curriculum data
  const { data: igcseData, isLoading: igcseLoading } = useQuery({
    queryKey: ["/api/curriculum", "IGCSE Chemistry Edexcel"],
    queryFn: () => fetch("/api/curriculum/IGCSE Chemistry Edexcel").then(res => res.json()),
  });

  const { data: aLevelData, isLoading: aLevelLoading } = useQuery({
    queryKey: ["/api/curriculum", "A Level Chemistry Edexcel"], 
    queryFn: () => fetch("/api/curriculum/A Level Chemistry Edexcel").then(res => res.json()),
  });

  const isLoading = igcseLoading || aLevelLoading;

  // Combine curriculum data for flexible mixing
  const allTopics = [
    ...(igcseData?.topics?.map((topic: any) => ({ ...topic, level: "IGCSE" })) || []),
    ...(aLevelData?.topics?.map((topic: any) => ({ ...topic, level: "A Level" })) || [])
  ];

  // Filter topics based on search and filters
  const filteredTopics = allTopics.filter((topic: CurriculumTopic) => {
    const matchesSearch = topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "all" || topic.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  // Get all objectives for a topic
  const getTopicObjectives = (topic: CurriculumTopic): string[] => {
    return topic.subtopics.flatMap(subtopic => 
      subtopic.objectives.map(objective => objective.id)
    );
  };

  // Get all subtopics for a topic
  const getTopicSubtopics = (topic: CurriculumTopic): string[] => {
    return topic.subtopics.map(subtopic => subtopic.id);
  };

  // Get all objectives for a subtopic
  const getSubtopicObjectives = (subtopic: CurriculumSubtopic): string[] => {
    return subtopic.objectives.map(objective => objective.id);
  };

  // Check if a topic is fully selected (all its objectives are selected)
  const isTopicFullySelected = (topic: CurriculumTopic): boolean => {
    const topicObjectives = getTopicObjectives(topic);
    return topicObjectives.every(objId => selectedObjectives.includes(objId));
  };

  // Check if a subtopic is fully selected (all its objectives are selected)
  const isSubtopicFullySelected = (subtopic: CurriculumSubtopic): boolean => {
    const subtopicObjectives = getSubtopicObjectives(subtopic);
    return subtopicObjectives.every(objId => selectedObjectives.includes(objId));
  };

  // Handle topic selection/deselection
  const handleTopicToggle = (topic: CurriculumTopic) => {
    const topicObjectives = getTopicObjectives(topic);
    const topicSubtopics = getTopicSubtopics(topic);
    const isSelected = isTopicFullySelected(topic);

    let newSelectedTopics = [...selectedTopics];
    let newSelectedSubtopics = [...selectedSubtopics];
    let newSelectedObjectives = [...selectedObjectives];

    if (isSelected) {
      // Deselect topic: remove all its objectives and subtopics
      newSelectedTopics = newSelectedTopics.filter(id => id !== topic.id);
      newSelectedSubtopics = newSelectedSubtopics.filter(id => !topicSubtopics.includes(id));
      newSelectedObjectives = newSelectedObjectives.filter(id => !topicObjectives.includes(id));
    } else {
      // Select topic: add all its objectives and subtopics
      if (!newSelectedTopics.includes(topic.id)) {
        newSelectedTopics.push(topic.id);
      }
      topicSubtopics.forEach(subtopicId => {
        if (!newSelectedSubtopics.includes(subtopicId)) {
          newSelectedSubtopics.push(subtopicId);
        }
      });
      topicObjectives.forEach(objId => {
        if (!newSelectedObjectives.includes(objId)) {
          newSelectedObjectives.push(objId);
        }
      });
    }

    onSelectionChange({
      topics: newSelectedTopics,
      subtopics: newSelectedSubtopics,
      objectives: newSelectedObjectives
    });
  };

  // Handle subtopic selection/deselection
  const handleSubtopicToggle = (subtopic: CurriculumSubtopic) => {
    const subtopicObjectives = getSubtopicObjectives(subtopic);
    const isSelected = isSubtopicFullySelected(subtopic);

    let newSelectedSubtopics = [...selectedSubtopics];
    let newSelectedObjectives = [...selectedObjectives];

    if (isSelected) {
      // Deselect subtopic: remove all its objectives
      newSelectedSubtopics = newSelectedSubtopics.filter(id => id !== subtopic.id);
      newSelectedObjectives = newSelectedObjectives.filter(id => !subtopicObjectives.includes(id));
    } else {
      // Select subtopic: add all its objectives
      if (!newSelectedSubtopics.includes(subtopic.id)) {
        newSelectedSubtopics.push(subtopic.id);
      }
      subtopicObjectives.forEach(objId => {
        if (!newSelectedObjectives.includes(objId)) {
          newSelectedObjectives.push(objId);
        }
      });
    }

    onSelectionChange({
      topics: selectedTopics,
      subtopics: newSelectedSubtopics,
      objectives: newSelectedObjectives
    });
  };

  // Handle individual objective selection/deselection
  const handleObjectiveToggle = (objective: LearningObjective) => {
    let newSelectedObjectives = [...selectedObjectives];

    if (newSelectedObjectives.includes(objective.id)) {
      // Deselect objective
      newSelectedObjectives = newSelectedObjectives.filter(id => id !== objective.id);
    } else {
      // Select objective
      newSelectedObjectives.push(objective.id);
    }

    onSelectionChange({
      topics: selectedTopics,
      subtopics: selectedSubtopics,
      objectives: newSelectedObjectives
    });
  };

  // Toggle topic expansion
  const toggleTopicExpansion = (topicId: string) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  // Toggle subtopic expansion
  const toggleSubtopicExpansion = (subtopicId: string) => {
    setExpandedSubtopics(prev => 
      prev.includes(subtopicId) 
        ? prev.filter(id => id !== subtopicId)
        : [...prev, subtopicId]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "basic": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getBloomsColor = (level: string) => {
    switch (level) {
      case "remember": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "understand": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
      case "apply": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "analyze": return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
      case "evaluate": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "create": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Calculate estimated hours
  const calculateEstimatedHours = () => {
    const totalMinutes = selectedObjectives.reduce((total, objId) => {
      const objective = allTopics
        .flatMap(topic => topic.subtopics)
        .flatMap(subtopic => subtopic.objectives)
        .find(obj => obj.id === objId);
      return total + (objective?.estimatedTeachingMinutes || 0);
    }, 0);
    return Math.ceil(totalMinutes / 60);
  };

  const estimatedHours = calculateEstimatedHours();

  // Update parent component with estimated hours
  useEffect(() => {
    if (window.updateEstimatedHours) {
      window.updateEstimatedHours(estimatedHours);
    }
  }, [estimatedHours]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with selection summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Book className="h-5 w-5 text-blue-600" />
            <span className="font-medium">Curriculum Selection</span>
          </div>
          <Badge variant="outline">
            {selectedObjectives.length} objectives selected
          </Badge>
          <Badge variant="outline">
            <Clock className="h-4 w-4 mr-1" />
            ~{estimatedHours} hours
          </Badge>
        </div>
      </div>

      {/* Search and filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Search topics, subtopics, or objectives..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="col-span-1 md:col-span-2"
        />
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="IGCSE">IGCSE</SelectItem>
            <SelectItem value="A Level">A Level</SelectItem>
          </SelectContent>
        </Select>
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All difficulties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Curriculum tree */}
      <ScrollArea className="h-[600px] border rounded-lg p-4">
        <div className="space-y-4">
          {filteredTopics.map((topic) => (
            <Card key={topic.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTopicExpansion(topic.id)}
                      className="p-1"
                    >
                      {expandedTopics.includes(topic.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                    <div
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => handleTopicToggle(topic)}
                    >
                      <div className={`w-4 h-4 border-2 rounded ${
                        isTopicFullySelected(topic) 
                          ? 'bg-blue-600 border-blue-600' 
                          : 'border-gray-300'
                      } flex items-center justify-center`}>
                        {isTopicFullySelected(topic) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{topic.name}</CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={topic.level === "IGCSE" ? "default" : "secondary"}>
                      {topic.level}
                    </Badge>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {topic.timeAllocation}h
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
              </CardHeader>

              {expandedTopics.includes(topic.id) && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {topic.subtopics.map((subtopic) => (
                      <div key={subtopic.id} className="border-l-2 border-gray-200 pl-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleSubtopicExpansion(subtopic.id)}
                              className="p-1"
                            >
                              {expandedSubtopics.includes(subtopic.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                            <div
                              className="flex items-center space-x-2 cursor-pointer"
                              onClick={() => handleSubtopicToggle(subtopic)}
                            >
                              <div className={`w-4 h-4 border-2 rounded ${
                                isSubtopicFullySelected(subtopic) 
                                  ? 'bg-green-600 border-green-600' 
                                  : 'border-gray-300'
                              } flex items-center justify-center`}>
                                {isSubtopicFullySelected(subtopic) && (
                                  <Check className="h-3 w-3 text-white" />
                                )}
                              </div>
                              <span className="font-medium text-gray-800">{subtopic.name}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {subtopic.objectives.length} objectives
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 ml-8">{subtopic.description}</p>

                        {expandedSubtopics.includes(subtopic.id) && (
                          <div className="mt-3 ml-8 space-y-2">
                            {subtopic.objectives.map((objective) => (
                              <div key={objective.id} className="flex items-start space-x-3 p-2 bg-gray-50 rounded">
                                <div
                                  className={`w-4 h-4 mt-0.5 border-2 rounded cursor-pointer ${
                                    selectedObjectives.includes(objective.id) 
                                      ? 'bg-purple-600 border-purple-600' 
                                      : 'border-gray-300'
                                  } flex items-center justify-center`}
                                  onClick={() => handleObjectiveToggle(objective)}
                                >
                                  {selectedObjectives.includes(objective.id) && (
                                    <Check className="h-3 w-3 text-white" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">
                                      {objective.code}
                                    </span>
                                    <Badge className={`text-xs ${getDifficultyColor(objective.difficulty)}`}>
                                      {objective.difficulty}
                                    </Badge>
                                    <Badge className={`text-xs ${getBloomsColor(objective.bloomsLevel)}`}>
                                      {objective.bloomsLevel}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {objective.estimatedTeachingMinutes}min
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-700">{objective.statement}</p>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {objective.keywords.map((keyword, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {keyword}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Selection summary */}
      {selectedObjectives.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Selection Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{selectedTopics.length}</div>
                <div className="text-sm text-gray-600">Topics Selected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{selectedSubtopics.length}</div>
                <div className="text-sm text-gray-600">Subtopics Selected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{selectedObjectives.length}</div>
                <div className="text-sm text-gray-600">Objectives Selected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}