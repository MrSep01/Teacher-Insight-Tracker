import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Clock, Target, BookOpen, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DetailedRecommendation {
  id: string;
  studentId: number;
  studentName: string;
  type: "remedial" | "enrichment" | "intervention" | "acceleration";
  priority: "low" | "medium" | "high" | "urgent";
  title: string;
  description: string;
  subjectName: string;
  targetSkills: string[];
  activities: string[];
  timeline: string;
  successMetrics: string[];
  resources: string[];
  reasoning: string;
  confidenceScore: number;
}

interface StudentRecommendations {
  studentId: number;
  studentName: string;
  recommendations: DetailedRecommendation[];
}

export default function AIRecommendations() {
  const [selectedStudent, setSelectedStudent] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const { data: allRecommendations, isLoading } = useQuery<StudentRecommendations[]>({
    queryKey: ['/api/ai-recommendations'],
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });

  const { data: specificRecommendations, isLoading: isLoadingSpecific } = useQuery<DetailedRecommendation[]>({
    queryKey: ['/api/ai-recommendations', selectedStudent],
    enabled: selectedStudent !== "all" && selectedStudent !== "",
  });

  const displayRecommendations = selectedStudent === "all" 
    ? allRecommendations?.flatMap(sr => sr.recommendations) || []
    : specificRecommendations || [];

  const filteredRecommendations = displayRecommendations.filter(rec => 
    selectedType === "all" || rec.type === selectedType
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "remedial": return <AlertTriangle className="h-4 w-4" />;
      case "enrichment": return <TrendingUp className="h-4 w-4" />;
      case "intervention": return <Target className="h-4 w-4" />;
      case "acceleration": return <CheckCircle className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "remedial": return "bg-red-100 text-red-800 border-red-200";
      case "enrichment": return "bg-blue-100 text-blue-800 border-blue-200";
      case "intervention": return "bg-orange-100 text-orange-800 border-orange-200";
      case "acceleration": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">AI-Powered Recommendations</h1>
            <p className="text-gray-600">Personalized teaching strategies based on student performance</p>
          </div>
        </div>
        
        <div className="grid gap-4">
          {Array.from({ length: 3 }, (_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold">AI-Powered Recommendations</h1>
          <p className="text-gray-600">Personalized teaching strategies based on student performance analysis</p>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <Select value={selectedStudent} onValueChange={setSelectedStudent}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select student" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Students</SelectItem>
            {allRecommendations?.map(sr => (
              <SelectItem key={sr.studentId} value={sr.studentId.toString()}>
                {sr.studentName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="remedial">Remedial</SelectItem>
            <SelectItem value="enrichment">Enrichment</SelectItem>
            <SelectItem value="intervention">Intervention</SelectItem>
            <SelectItem value="acceleration">Acceleration</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredRecommendations.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Brain className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">No recommendations found</h3>
              <p className="text-gray-600">
                {isLoadingSpecific ? "Loading personalized recommendations..." : "Try adjusting your filters or check back later."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredRecommendations.map((rec) => (
            <Card key={rec.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(rec.type)}`}>
                      {getTypeIcon(rec.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Badge variant="outline">{rec.studentName}</Badge>
                        <Badge variant="outline">{rec.subjectName}</Badge>
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(rec.priority)}`} />
                        <span className="text-sm capitalize">{rec.priority} priority</span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {rec.confidenceScore}% confidence
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-700">{rec.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4" />
                      Target Skills
                    </h4>
                    <ul className="space-y-1">
                      {rec.targetSkills.map((skill, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4" />
                      Recommended Activities
                    </h4>
                    <ul className="space-y-1">
                      {rec.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-blue-500" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Tabs defaultValue="metrics" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="metrics">Success Metrics</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="reasoning">AI Analysis</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="metrics" className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Success Indicators</span>
                    </div>
                    {rec.successMetrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {metric}
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="resources" className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Required Resources</span>
                    </div>
                    {rec.resources.map((resource, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-blue-500" />
                        {resource}
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="reasoning">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">AI Analysis</span>
                    </div>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {rec.reasoning}
                    </p>
                  </TabsContent>
                </Tabs>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    Timeline: {rec.timeline}
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {rec.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}