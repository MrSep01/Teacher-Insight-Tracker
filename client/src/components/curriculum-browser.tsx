import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Book, Target, Clock, Zap, ChevronDown, ChevronRight, Plus, Check } from "lucide-react";
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

interface CurriculumBrowserProps {
  selectedCurriculum: string;
  selectedGrade: string;
  selectedTopics: string[];
  selectedObjectives: string[];
  onTopicToggle: (topicId: string) => void;
  onObjectiveToggle: (objectiveId: string) => void;
  onSubtopicToggle: (subtopicId: string) => void;
}

export function CurriculumBrowser({
  selectedCurriculum,
  selectedGrade,
  selectedTopics,
  selectedObjectives,
  onTopicToggle,
  onObjectiveToggle,
  onSubtopicToggle
}: CurriculumBrowserProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [bloomsFilter, setBlomsFilter] = useState("all");

  // Fetch curriculum data
  const { data: curriculumData, isLoading } = useQuery<{ topics: CurriculumTopic[] }>({
    queryKey: ["/api/curriculum", selectedCurriculum, selectedGrade],
    enabled: !!selectedCurriculum && !!selectedGrade,
  });

  const topics: CurriculumTopic[] = curriculumData?.topics ?? [];

  // Filter topics based on search and filters
  const filteredTopics = topics.filter((topic: CurriculumTopic) => {
    const matchesSearch = topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "basic": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getBloomsColor = (level: string) => {
    switch (level) {
      case "remember": return "bg-blue-100 text-blue-800";
      case "understand": return "bg-indigo-100 text-indigo-800";
      case "apply": return "bg-purple-100 text-purple-800";
      case "analyze": return "bg-pink-100 text-pink-800";
      case "evaluate": return "bg-orange-100 text-orange-800";
      case "create": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading curriculum data...</p>
        </div>
      </div>
    );
  }

  if (!curriculumData) {
    return (
      <div className="text-center py-8">
        <Book className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-gray-600">Please select a curriculum and grade level to view topics</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Curriculum Browser</h3>
          <p className="text-sm text-gray-600">
            {selectedCurriculum} - Grade {selectedGrade}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            {selectedTopics.length} topics selected
          </Badge>
          <Badge variant="outline">
            {selectedObjectives.length} objectives selected
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Input
            placeholder="Search topics and objectives..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
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

      {/* Topics List */}
      <ScrollArea className="h-96">
        <div className="space-y-4">
          {filteredTopics.map((topic: CurriculumTopic) => (
            <Card key={topic.id} className="border-l-4 border-l-blue-500">
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
                    </div>
                    <div>
                      <CardTitle className="text-lg">{topic.name}</CardTitle>
                      <p className="text-sm text-gray-600">{topic.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {topic.timeAllocation}h
                    </Badge>
                    <Badge variant="outline">
                      {topic.subtopics.length} subtopics
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
                          <span className="font-medium">{subtopic.name}</span>
                          <Badge variant="outline" className="ml-2">
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
                                <div key={objective.id} className="bg-gray-50 p-3 rounded-lg">
                                  <div className="flex items-start space-x-3">
                                    <input
                                      type="checkbox"
                                      checked={selectedObjectives.includes(objective.id)}
                                      onChange={() => onObjectiveToggle(objective.id)}
                                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2 mb-2">
                                        <Badge variant="outline">{objective.code}</Badge>
                                        <Badge className={getDifficultyColor(objective.difficulty)}>
                                          {objective.difficulty}
                                        </Badge>
                                        <Badge className={getBloomsColor(objective.bloomsLevel)}>
                                          {objective.bloomsLevel}
                                        </Badge>
                                        <Badge variant="outline">
                                          <Clock className="h-3 w-3 mr-1" />
                                          {objective.estimatedTeachingMinutes}min
                                        </Badge>
                                      </div>
                                      <p className="text-sm font-medium">{objective.statement}</p>
                                      <div className="flex flex-wrap gap-1 mt-2">
                                        {objective.keywords.map((keyword, idx) => (
                                          <Badge key={idx} variant="secondary" className="text-xs">
                                            {keyword}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Practical Work */}
                          {subtopic.practicalWork && subtopic.practicalWork.length > 0 && (
                            <div>
                              <h4 className="font-medium text-sm mb-2">Practical Work:</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {subtopic.practicalWork.map((work, idx) => (
                                  <li key={idx} className="flex items-center space-x-2">
                                    <Zap className="h-3 w-3 text-blue-500" />
                                    <span>{work}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Mathematical Skills */}
                          {subtopic.mathematicalSkills && subtopic.mathematicalSkills.length > 0 && (
                            <div>
                              <h4 className="font-medium text-sm mb-2">Mathematical Skills:</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {subtopic.mathematicalSkills.map((skill, idx) => (
                                  <li key={idx} className="flex items-center space-x-2">
                                    <Target className="h-3 w-3 text-green-500" />
                                    <span>{skill}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Selection Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Selection Summary</h4>
              <p className="text-sm text-gray-600">
                {selectedTopics.length} topics and {selectedObjectives.length} learning objectives selected
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                {selectedObjectives.reduce((total, objId) => {
                  const objective = topics.flatMap((t: CurriculumTopic) => 
                    t.subtopics.flatMap(s => s.objectives)
                  ).find((o: LearningObjective) => o.id === objId);
                  return total + (objective?.estimatedTeachingMinutes || 0);
                }, 0)} minutes
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}