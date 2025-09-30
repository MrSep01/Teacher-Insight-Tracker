import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronRight, CheckCircle, Circle, BookOpen, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CurriculumTopic {
  id: number;
  code: string;
  name: string;
  curriculum: string;
  description: string;
  sequenceOrder: number;
}

interface CurriculumSubtopic {
  id: number;
  topicId: number;
  code: string;
  name: string;
  description: string;
  sequenceOrder: number;
  practicalWork: string[];
  mathematicalSkills: string[];
}

interface CurriculumObjective {
  id: number;
  subtopicId: number;
  code: string;
  statement: string;
  bloomsLevel: string;
  difficulty: string;
  commandWords: string[];
  assessmentWeight: number;
  sequenceOrder: number;
}

interface TopicWithHierarchy extends CurriculumTopic {
  subtopics: (CurriculumSubtopic & { objectives: CurriculumObjective[] })[];
}

interface AuthenticCurriculumSelectorProps {
  selectedObjectives: string[];
  onObjectivesChange: (objectives: string[]) => void;
  estimatedHours: number;
  onEstimatedHoursChange: (hours: number) => void;
}

export function AuthenticCurriculumSelector({
  selectedObjectives,
  onObjectivesChange,
  estimatedHours,
  onEstimatedHoursChange
}: AuthenticCurriculumSelectorProps) {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set());
  const [expandedSubtopics, setExpandedSubtopics] = useState<Set<number>>(new Set());
  const [topicsWithHierarchy, setTopicsWithHierarchy] = useState<TopicWithHierarchy[]>([]);
  const [activeTab, setActiveTab] = useState<'igcse' | 'alevel' | 'both'>('both');

  // Fetch all curriculum topics
  const { data: topics, isLoading: topicsLoading } = useQuery<CurriculumTopic[]>({
    queryKey: ['/api/curriculum/topics'],
    enabled: true,
  });

  // Separate topics by curriculum level
  const igcseTopics = topics?.filter(t => t.curriculum === 'IGCSE Chemistry Edexcel') || [];
  const alevelTopics = topics?.filter(t => t.curriculum === 'A Level Chemistry Edexcel') || [];

  // Load hierarchy for expanded topics
  useEffect(() => {
    if (!topics || expandedTopics.size === 0) return;

    const loadHierarchy = async () => {
      const topicsWithData = await Promise.all(
        topics.map(async (topic) => {
          if (expandedTopics.has(topic.id)) {
            try {
              const response = await fetch(`/api/curriculum/topics/${topic.id}/hierarchy`);
              const hierarchy = await response.json();
              return {
                ...topic,
                subtopics: hierarchy.subtopics || []
              };
            } catch (error) {
              console.error('Error loading hierarchy for topic', topic.id, error);
              return { ...topic, subtopics: [] };
            }
          }
          return { ...topic, subtopics: [] };
        })
      );
      setTopicsWithHierarchy(topicsWithData);
    };

    loadHierarchy();
  }, [topics, expandedTopics]);

  const toggleTopic = (topicId: number) => {
    setExpandedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const toggleSubtopic = (subtopicId: number) => {
    setExpandedSubtopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subtopicId)) {
        newSet.delete(subtopicId);
      } else {
        newSet.add(subtopicId);
      }
      return newSet;
    });
  };

  const toggleObjective = (objectiveCode: string) => {
    const newObjectives = selectedObjectives.includes(objectiveCode)
      ? selectedObjectives.filter(code => code !== objectiveCode)
      : [...selectedObjectives, objectiveCode];
    
    onObjectivesChange(newObjectives);
    
    // Update estimated hours (2 minutes per objective)
    const newHours = Math.max(1, Math.round((newObjectives.length * 2) / 60));
    onEstimatedHoursChange(newHours);
  };

  const selectAllTopicObjectives = (topic: TopicWithHierarchy) => {
    const topicObjectiveCodes = topic.subtopics.flatMap(subtopic => 
      subtopic.objectives.map(obj => obj.code)
    );
    const otherObjectives = selectedObjectives.filter(code => 
      !topicObjectiveCodes.includes(code)
    );
    const newObjectives = [...otherObjectives, ...topicObjectiveCodes];
    onObjectivesChange(newObjectives);
    
    const newHours = Math.max(1, Math.round((newObjectives.length * 2) / 60));
    onEstimatedHoursChange(newHours);
  };

  const selectAllSubtopicObjectives = (subtopic: CurriculumSubtopic & { objectives: CurriculumObjective[] }) => {
    const subtopicObjectiveCodes = subtopic.objectives.map(obj => obj.code);
    const otherObjectives = selectedObjectives.filter(code => 
      !subtopicObjectiveCodes.includes(code)
    );
    const newObjectives = [...otherObjectives, ...subtopicObjectiveCodes];
    onObjectivesChange(newObjectives);
    
    const newHours = Math.max(1, Math.round((newObjectives.length * 2) / 60));
    onEstimatedHoursChange(newHours);
  };

  const deselectAllSubtopicObjectives = (subtopic: CurriculumSubtopic & { objectives: CurriculumObjective[] }) => {
    const subtopicObjectiveCodes = subtopic.objectives.map(obj => obj.code);
    const newObjectives = selectedObjectives.filter(code => 
      !subtopicObjectiveCodes.includes(code)
    );
    onObjectivesChange(newObjectives);
    
    const newHours = Math.max(1, Math.round((newObjectives.length * 2) / 60));
    onEstimatedHoursChange(newHours);
  };

  const clearAllSelections = () => {
    onObjectivesChange([]);
    onEstimatedHoursChange(0);
  };

  // Calculate selected objectives by curriculum
  const igcseSelectedCount = selectedObjectives.filter(code => code.startsWith('IGCSE-')).length;
  const alevelSelectedCount = selectedObjectives.filter(code => code.startsWith('AL-')).length;

  const renderTopic = (topic: CurriculumTopic) => {
    const topicWithHierarchy = topicsWithHierarchy.find(t => t.id === topic.id);
    const isExpanded = expandedTopics.has(topic.id);
    
    // Calculate topic selection status
    const topicObjectiveCodes = topicWithHierarchy?.subtopics.flatMap(subtopic => 
      subtopic.objectives.map(obj => obj.code)
    ) || [];
    const selectedTopicObjectives = topicObjectiveCodes.filter(code => 
      selectedObjectives.includes(code)
    );
    const isTopicFullySelected = topicObjectiveCodes.length > 0 && 
      selectedTopicObjectives.length === topicObjectiveCodes.length;
    const isTopicPartiallySelected = selectedTopicObjectives.length > 0 && 
      selectedTopicObjectives.length < topicObjectiveCodes.length;
    
    // Determine curriculum badge
    const isIGCSE = topic.curriculum === 'IGCSE Chemistry Edexcel';
    const badgeColor = isIGCSE ? 'bg-blue-500' : 'bg-purple-500';
    const badgeText = isIGCSE ? 'IGCSE' : 'A Level';

    return (
      <div key={topic.id} className="border rounded-lg p-4 mb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-2 flex-1">
            <button
              onClick={() => toggleTopic(topic.id)}
              className="mt-1"
              data-testid={`button-toggle-topic-${topic.id}`}
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge className={cn("text-xs text-white", badgeColor)}>
                  {badgeText}
                </Badge>
                <h3 className="font-medium">{topic.name}</h3>
                {isTopicFullySelected && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {isTopicPartiallySelected && (
                  <CheckCircle className="h-4 w-4 text-orange-500" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{topic.description}</p>
              {selectedTopicObjectives.length > 0 && (
                <Badge variant="outline" className="mb-2">
                  {selectedTopicObjectives.length} / {topicObjectiveCodes.length} objectives selected
                </Badge>
              )}
            </div>
          </div>
          {isExpanded && topicObjectiveCodes.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => selectAllTopicObjectives(topicWithHierarchy!)}
              className="ml-2"
              data-testid={`button-select-all-topic-${topic.id}`}
            >
              Select All
            </Button>
          )}
        </div>

        {isExpanded && topicWithHierarchy?.subtopics && (
          <div className="ml-6 mt-3 space-y-2">
            {topicWithHierarchy.subtopics.map((subtopic) => {
              const isSubtopicExpanded = expandedSubtopics.has(subtopic.id);
              const subtopicObjectiveCodes = subtopic.objectives.map(obj => obj.code);
              const selectedSubtopicObjectives = subtopicObjectiveCodes.filter(code => 
                selectedObjectives.includes(code)
              );
              const isSubtopicFullySelected = subtopicObjectiveCodes.length > 0 && 
                selectedSubtopicObjectives.length === subtopicObjectiveCodes.length;
              const isSubtopicPartiallySelected = selectedSubtopicObjectives.length > 0 && 
                selectedSubtopicObjectives.length < subtopicObjectiveCodes.length;

              return (
                <div key={subtopic.id} className="border-l-2 border-gray-200 pl-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2 flex-1">
                      <button
                        onClick={() => toggleSubtopic(subtopic.id)}
                        className="mt-0.5"
                        data-testid={`button-toggle-subtopic-${subtopic.id}`}
                      >
                        {isSubtopicExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{subtopic.name}</span>
                          {isSubtopicFullySelected && (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          )}
                          {isSubtopicPartiallySelected && (
                            <CheckCircle className="h-3 w-3 text-orange-500" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{subtopic.description}</p>
                        {selectedSubtopicObjectives.length > 0 && (
                          <Badge variant="outline" className="text-xs mt-1">
                            {selectedSubtopicObjectives.length} / {subtopicObjectiveCodes.length} selected
                          </Badge>
                        )}
                        {subtopic.practicalWork && subtopic.practicalWork.length > 0 && (
                          <p className="text-xs text-blue-600 mt-1">
                            Practical: {subtopic.practicalWork.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                    {isSubtopicExpanded && (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => selectAllSubtopicObjectives(subtopic)}
                          data-testid={`button-select-subtopic-${subtopic.id}`}
                        >
                          Select
                        </Button>
                        {selectedSubtopicObjectives.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => deselectAllSubtopicObjectives(subtopic)}
                            data-testid={`button-deselect-subtopic-${subtopic.id}`}
                          >
                            Clear
                          </Button>
                        )}
                      </div>
                    )}
                  </div>

                  {isSubtopicExpanded && subtopic.objectives && (
                    <div className="ml-6 mt-2 space-y-1">
                      {subtopic.objectives.map((objective) => {
                        const isSelected = selectedObjectives.includes(objective.code);
                        return (
                          <div
                            key={objective.id}
                            className={cn(
                              "flex items-start space-x-2 p-2 rounded cursor-pointer hover:bg-gray-50",
                              isSelected && "bg-blue-50"
                            )}
                            onClick={() => toggleObjective(objective.code)}
                            data-testid={`div-objective-${objective.id}`}
                          >
                            {isSelected ? (
                              <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                            ) : (
                              <Circle className="h-4 w-4 text-gray-400 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {objective.code}
                                </Badge>
                                <Badge 
                                  variant="secondary" 
                                  className={cn(
                                    "text-xs",
                                    objective.difficulty === "basic" && "bg-green-100",
                                    objective.difficulty === "intermediate" && "bg-yellow-100",
                                    objective.difficulty === "advanced" && "bg-red-100"
                                  )}
                                >
                                  {objective.difficulty}
                                </Badge>
                                {objective.commandWords && (
                                  <span className="text-xs text-gray-500">
                                    {objective.commandWords.join(', ')}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm">{objective.statement}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  if (topicsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Curriculum...</CardTitle>
          <CardDescription>Fetching official Edexcel Chemistry curriculum data</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Official Edexcel Chemistry Curriculum</CardTitle>
          <CardDescription>
            Select learning objectives from IGCSE and/or A Level Chemistry specifications
          </CardDescription>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-500" />
                <Badge variant="outline" className="bg-blue-50">
                  IGCSE: {igcseSelectedCount} objectives
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-purple-500" />
                <Badge variant="outline" className="bg-purple-50">
                  A Level: {alevelSelectedCount} objectives
                </Badge>
              </div>
              <Badge variant="secondary">
                Total: {selectedObjectives.length} objectives ({estimatedHours} hours)
              </Badge>
            </div>
            {selectedObjectives.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearAllSelections}
                data-testid="button-clear-all"
              >
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="both" data-testid="tab-both">
                <span className="flex items-center gap-2">
                  All Curricula
                </span>
              </TabsTrigger>
              <TabsTrigger value="igcse" data-testid="tab-igcse">
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  IGCSE Chemistry
                </span>
              </TabsTrigger>
              <TabsTrigger value="alevel" data-testid="tab-alevel">
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  A Level Chemistry
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="both">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6">
                  {igcseTopics.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-500" />
                        IGCSE Chemistry Edexcel
                      </h3>
                      <div>
                        {igcseTopics.map(topic => renderTopic(topic))}
                      </div>
                    </div>
                  )}
                  
                  {alevelTopics.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-purple-500" />
                        A Level Chemistry Edexcel
                      </h3>
                      <div>
                        {alevelTopics.map(topic => renderTopic(topic))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="igcse">
              <ScrollArea className="h-[600px] pr-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    IGCSE Chemistry Edexcel (4 Topics)
                  </h3>
                  <div>
                    {igcseTopics.map(topic => renderTopic(topic))}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="alevel">
              <ScrollArea className="h-[600px] pr-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-purple-500" />
                    A Level Chemistry Edexcel (19 Topics)
                  </h3>
                  <div>
                    {alevelTopics.map(topic => renderTopic(topic))}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}