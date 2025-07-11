import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, CheckCircle, Circle } from 'lucide-react';
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

  // Fetch all curriculum topics
  const { data: topics, isLoading: topicsLoading } = useQuery<CurriculumTopic[]>({
    queryKey: ['/api/curriculum/topics'],
    enabled: true,
  });

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

  if (topicsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Curriculum...</CardTitle>
          <CardDescription>Fetching authentic IGCSE Chemistry Edexcel curriculum data</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Authentic IGCSE Chemistry Edexcel Curriculum</CardTitle>
          <CardDescription>
            Select learning objectives from the official curriculum specification
          </CardDescription>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline">
                {selectedObjectives.length} objectives selected
              </Badge>
              <Badge variant="outline">
                {estimatedHours} hours estimated
              </Badge>
            </div>
            {selectedObjectives.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearAllSelections}>
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topics?.map((topic) => {
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
              
              return (
                <Card key={topic.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTopic(topic.id)}
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                        <div>
                          <CardTitle className="text-lg">
                            Topic {topic.code}: {topic.name}
                          </CardTitle>
                          <CardDescription>{topic.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {topic.curriculum}
                        </Badge>
                        {topicWithHierarchy && (
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {topicObjectiveCodes.length} objectives
                            </Badge>
                            <Button
                              variant={isTopicFullySelected ? "default" : "outline"}
                              size="sm"
                              onClick={() => {
                                if (isTopicFullySelected) {
                                  // Deselect all objectives in this topic
                                  const newObjectives = selectedObjectives.filter(code => 
                                    !topicObjectiveCodes.includes(code)
                                  );
                                  onObjectivesChange(newObjectives);
                                  const newHours = Math.max(1, Math.round((newObjectives.length * 2) / 60));
                                  onEstimatedHoursChange(newHours);
                                } else {
                                  selectAllTopicObjectives(topicWithHierarchy);
                                }
                              }}
                              className={isTopicPartiallySelected ? "bg-yellow-100 border-yellow-500" : ""}
                            >
                              {isTopicFullySelected ? "Deselect All" : 
                               isTopicPartiallySelected ? "Select All" : "Select All"}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  {isExpanded && topicWithHierarchy && (
                    <CardContent>
                      <div className="space-y-3">
                        {topicWithHierarchy.subtopics.map((subtopic) => {
                          const isSubtopicExpanded = expandedSubtopics.has(subtopic.id);
                          const subtopicObjectiveCodes = subtopic.objectives.map(obj => obj.code);
                          const allSelected = subtopicObjectiveCodes.every(code => 
                            selectedObjectives.includes(code)
                          );
                          
                          return (
                            <Card key={subtopic.id} className="ml-6 border-l-4 border-l-green-500">
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleSubtopic(subtopic.id)}
                                    >
                                      {isSubtopicExpanded ? (
                                        <ChevronDown className="h-4 w-4" />
                                      ) : (
                                        <ChevronRight className="h-4 w-4" />
                                      )}
                                    </Button>
                                    <div>
                                      <CardTitle className="text-base">
                                        {subtopic.code}: {subtopic.name}
                                      </CardTitle>
                                      <CardDescription>{subtopic.description}</CardDescription>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline">
                                      {subtopic.objectives.length} objectives
                                    </Badge>
                                    <Button
                                      variant={allSelected ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => {
                                        if (allSelected) {
                                          deselectAllSubtopicObjectives(subtopic);
                                        } else {
                                          selectAllSubtopicObjectives(subtopic);
                                        }
                                      }}
                                      className={
                                        !allSelected && subtopicObjectiveCodes.some(code => 
                                          selectedObjectives.includes(code)
                                        ) ? "bg-yellow-100 border-yellow-500" : ""
                                      }
                                    >
                                      {allSelected ? "Deselect All" : "Select All"}
                                    </Button>
                                  </div>
                                </div>
                              </CardHeader>
                              
                              {isSubtopicExpanded && (
                                <CardContent>
                                  <div className="space-y-2">
                                    {subtopic.objectives.map((objective) => {
                                      const isSelected = selectedObjectives.includes(objective.code);
                                      
                                      return (
                                        <div
                                          key={objective.id}
                                          className={cn(
                                            "flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer",
                                            isSelected
                                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                              : "border-gray-200 hover:border-gray-300"
                                          )}
                                          onClick={() => toggleObjective(objective.code)}
                                        >
                                          <div className="flex-shrink-0 mt-1">
                                            {isSelected ? (
                                              <CheckCircle className="h-4 w-4 text-blue-500" />
                                            ) : (
                                              <Circle className="h-4 w-4 text-gray-400" />
                                            )}
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                                {objective.code}
                                              </code>
                                              <Badge variant="outline" className="text-xs">
                                                {objective.bloomsLevel}
                                              </Badge>
                                              <Badge variant="outline" className="text-xs">
                                                {objective.difficulty}
                                              </Badge>
                                            </div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                              {objective.statement}
                                            </p>
                                            {objective.commandWords.length > 0 && (
                                              <div className="flex items-center gap-1 mt-1">
                                                <span className="text-xs text-gray-500">Command words:</span>
                                                {objective.commandWords.map((word, idx) => (
                                                  <Badge key={idx} variant="secondary" className="text-xs">
                                                    {word}
                                                  </Badge>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </CardContent>
                              )}
                            </Card>
                          );
                        })}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}