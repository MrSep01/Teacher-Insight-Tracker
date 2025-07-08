import { useState, useEffect } from "react";

// Add global type declaration
declare global {
  interface Window {
    updateEstimatedHours?: (hours: number) => void;
  }
}
import { useQuery } from "@tanstack/react-query";
import { Book, Target, Clock, Zap, ChevronDown, ChevronRight, Plus, Check, GraduationCap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
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

interface FlexibleCurriculumMapperProps {
  selectedTopics: string[];
  selectedObjectives: string[];
  onTopicToggle: (topicId: string) => void;
  onObjectiveToggle: (objectiveId: string) => void;
  onSubtopicToggle: (subtopicId: string) => void;
  showLevelMixing?: boolean;
}

export function FlexibleCurriculumMapper({
  selectedTopics,
  selectedObjectives,
  onTopicToggle,
  onObjectiveToggle,
  onSubtopicToggle,
  showLevelMixing = true
}: FlexibleCurriculumMapperProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [bloomsFilter, setBlomsFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("igcse");

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

  const getLevelColor = (level: string) => {
    return level === "IGCSE" 
      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
  };

  const getSelectedTopicsByLevel = () => {
    const igcseTopics = selectedTopics.filter(topicId => 
      igcseData?.topics?.some((t: any) => t.id === topicId)
    );
    const aLevelTopics = selectedTopics.filter(topicId => 
      aLevelData?.topics?.some((t: any) => t.id === topicId)
    );
    return { igcseTopics, aLevelTopics };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading curriculum specifications...</p>
        </div>
      </div>
    );
  }

  const { igcseTopics, aLevelTopics } = getSelectedTopicsByLevel();

  // Helper functions for time calculations
  const calculateTopicHours = (topicIds: string[], curriculumData: any) => {
    if (!curriculumData?.topics) return 0;
    return topicIds.reduce((total, topicId) => {
      const topic = curriculumData.topics.find((t: any) => t.id === topicId);
      return total + (topic?.timeAllocation || 0);
    }, 0);
  };

  const calculateObjectiveMinutes = (objectiveIds: string[], topics: CurriculumTopic[]) => {
    return objectiveIds.reduce((total, objId) => {
      const objective = topics.flatMap((t: CurriculumTopic) => 
        t.subtopics.flatMap(s => s.objectives)
      ).find((o: LearningObjective) => o.id === objId);
      return total + (objective?.estimatedTeachingMinutes || 0);
    }, 0);
  };

  // Calculate total estimated hours for parent component
  const totalEstimatedHours = Math.round(
    (calculateTopicHours(igcseTopics, igcseData) + 
     calculateTopicHours(aLevelTopics, aLevelData) + 
     calculateObjectiveMinutes(selectedObjectives, allTopics) / 60) * 10
  ) / 10;

  // Notify parent component of time estimate changes
  useEffect(() => {
    if (window.updateEstimatedHours) {
      window.updateEstimatedHours(totalEstimatedHours);
    }
  }, [totalEstimatedHours]);

  return (
    <div className="space-y-6">
      {/* Header with Flexibility Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center space-x-3 mb-2">
          <GraduationCap className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold">Flexible Curriculum Mapper</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Mix and match IGCSE and A Level topics based on your students' abilities. 
          Create customized modules that adapt to different learning needs within the same class.
        </p>
        <div className="flex items-center space-x-4 mt-3">
          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950">
            <BookOpen className="h-3 w-3 mr-1" />
            {igcseTopics.length} IGCSE topics
          </Badge>
          <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950">
            <GraduationCap className="h-3 w-3 mr-1" />
            {aLevelTopics.length} A Level topics
          </Badge>
          <Badge variant="outline">
            <Target className="h-3 w-3 mr-1" />
            {selectedObjectives.length} total objectives
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Input
            placeholder="Search topics and objectives..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="IGCSE">IGCSE Only</SelectItem>
            <SelectItem value="A Level">A Level Only</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={bloomsFilter} onValueChange={setBlomsFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Bloom's level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bloom's Levels</SelectItem>
            <SelectItem value="remember">Remember</SelectItem>
            <SelectItem value="understand">Understand</SelectItem>
            <SelectItem value="apply">Apply</SelectItem>
            <SelectItem value="analyze">Analyze</SelectItem>
            <SelectItem value="evaluate">Evaluate</SelectItem>
            <SelectItem value="create">Create</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Topics List with Level Mixing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* IGCSE Topics */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              <BookOpen className="h-3 w-3 mr-1" />
              IGCSE Chemistry Edexcel
            </Badge>
            <span className="text-sm text-gray-600">Foundation Level</span>
          </div>
          
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {filteredTopics.filter(topic => topic.level === "IGCSE").map((topic: CurriculumTopic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  selectedTopics={selectedTopics}
                  selectedObjectives={selectedObjectives}
                  onTopicToggle={onTopicToggle}
                  onObjectiveToggle={onObjectiveToggle}
                  onSubtopicToggle={onSubtopicToggle}
                  difficultyFilter={difficultyFilter}
                  bloomsFilter={bloomsFilter}
                  getDifficultyColor={getDifficultyColor}
                  getBloomsColor={getBloomsColor}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* A Level Topics */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
              <GraduationCap className="h-3 w-3 mr-1" />
              A Level Chemistry Edexcel
            </Badge>
            <span className="text-sm text-gray-600">Advanced Level</span>
          </div>
          
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {filteredTopics.filter(topic => topic.level === "A Level").map((topic: CurriculumTopic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  selectedTopics={selectedTopics}
                  selectedObjectives={selectedObjectives}
                  onTopicToggle={onTopicToggle}
                  onObjectiveToggle={onObjectiveToggle}
                  onSubtopicToggle={onSubtopicToggle}
                  difficultyFilter={difficultyFilter}
                  bloomsFilter={bloomsFilter}
                  getDifficultyColor={getDifficultyColor}
                  getBloomsColor={getBloomsColor}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Enhanced Selection Summary with Time Estimates */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <h4 className="font-medium mb-2">IGCSE Selection</h4>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">{igcseTopics.length} topics selected</p>
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950">
                  Foundation Level
                </Badge>
                <p className="text-xs text-gray-500">
                  {calculateTopicHours(igcseTopics, igcseData)}h teaching time
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">A Level Selection</h4>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">{aLevelTopics.length} topics selected</p>
                <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950">
                  Advanced Level
                </Badge>
                <p className="text-xs text-gray-500">
                  {calculateTopicHours(aLevelTopics, aLevelData)}h teaching time
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Learning Objectives</h4>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">{selectedObjectives.length} objectives</p>
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  {Math.round(calculateObjectiveMinutes(selectedObjectives, allTopics) / 60)}h estimated
                </Badge>
                <p className="text-xs text-gray-500">
                  {calculateObjectiveMinutes(selectedObjectives, allTopics)} minutes total
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Total Estimate</h4>
              <div className="space-y-1">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-lg text-blue-700">
                        {Math.round(
                          (calculateTopicHours(igcseTopics, igcseData) + 
                           calculateTopicHours(aLevelTopics, aLevelData) + 
                           calculateObjectiveMinutes(selectedObjectives, allTopics) / 60) * 10
                        ) / 10}h
                      </p>
                      <p className="text-xs text-gray-500">Recommended teaching time</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-blue-600">
                  ✓ Based on Edexcel specifications
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Topic Card Component
function TopicCard({
  topic,
  selectedTopics,
  selectedObjectives,
  onTopicToggle,
  onObjectiveToggle,
  onSubtopicToggle,
  difficultyFilter,
  bloomsFilter,
  getDifficultyColor,
  getBloomsColor
}: {
  topic: CurriculumTopic;
  selectedTopics: string[];
  selectedObjectives: string[];
  onTopicToggle: (topicId: string) => void;
  onObjectiveToggle: (objectiveId: string) => void;
  onSubtopicToggle: (subtopicId: string) => void;
  difficultyFilter: string;
  bloomsFilter: string;
  getDifficultyColor: (difficulty: string) => string;
  getBloomsColor: (level: string) => string;
}) {
  const levelColor = topic.level === "IGCSE" 
    ? "border-l-blue-500" 
    : "border-l-purple-500";

  return (
    <Card className={`border-l-4 ${levelColor}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedTopics.includes(topic.id)}
                onChange={() => onTopicToggle(topic.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Badge variant="secondary">{topic.specificationCode}</Badge>
              <Badge className={topic.level === "IGCSE" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}>
                {topic.level}
              </Badge>
            </div>
            <div>
              <CardTitle className="text-base">{topic.name}</CardTitle>
              <p className="text-sm text-gray-600">{topic.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              {topic.timeAllocation}h
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {topic.subtopics.map((subtopic: CurriculumSubtopic) => (
            <AccordionItem key={subtopic.id} value={subtopic.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTopics.includes(subtopic.id)}
                    onChange={() => onSubtopicToggle(subtopic.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="font-medium text-sm">{subtopic.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {subtopic.objectives.length} objectives
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pl-6">
                  <p className="text-sm text-gray-600">{subtopic.description}</p>
                  
                  {/* Learning Objectives */}
                  <div className="space-y-2">
                    {subtopic.objectives.map((objective: LearningObjective) => {
                      const matchesDifficulty = difficultyFilter === "all" || objective.difficulty === difficultyFilter;
                      const matchesBlooms = bloomsFilter === "all" || objective.bloomsLevel === bloomsFilter;
                      
                      if (!matchesDifficulty || !matchesBlooms) return null;
                      
                      return (
                        <div key={objective.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              checked={selectedObjectives.includes(objective.id)}
                              onChange={() => onObjectiveToggle(objective.id)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline" className="text-xs">{objective.code}</Badge>
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
                              <p className="text-sm font-medium">{objective.statement}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {objective.keywords.slice(0, 3).map((keyword, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {keyword}
                                  </Badge>
                                ))}
                                {objective.keywords.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{objective.keywords.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}