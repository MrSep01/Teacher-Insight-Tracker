import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, Book, Clock, Users, Star } from "lucide-react";
import { StudentWithScores, Subject } from "@shared/schema";
import { generateRecommendations, getRecommendationPriorityColor, getRecommendationBadgeColor } from "@/lib/recommendations";

interface LessonPlan {
  id: number;
  title: string;
  subject: string;
  duration: string;
  targetStudents: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  objectives: string[];
  materials: string[];
  description: string;
  priority: "low" | "medium" | "high";
}

const sampleLessonPlans: LessonPlan[] = [
  {
    id: 1,
    title: "Fraction Fundamentals",
    subject: "Mathematics",
    duration: "45 minutes",
    targetStudents: ["Students scoring below 70% in Math"],
    difficulty: "beginner",
    objectives: ["Understand basic fraction concepts", "Practice fraction addition", "Visual fraction representation"],
    materials: ["Fraction circles", "Worksheets", "Interactive whiteboard"],
    description: "A comprehensive lesson to help students understand fractions through visual and hands-on activities.",
    priority: "high"
  },
  {
    id: 2,
    title: "Advanced Reading Comprehension",
    subject: "English",
    duration: "60 minutes",
    targetStudents: ["High-performing students"],
    difficulty: "advanced",
    objectives: ["Analyze complex texts", "Identify literary themes", "Critical thinking skills"],
    materials: ["Selected short stories", "Analysis worksheets", "Discussion guides"],
    description: "Challenge advanced readers with complex texts and analytical thinking exercises.",
    priority: "medium"
  },
  {
    id: 3,
    title: "Plant Life Cycle Exploration",
    subject: "Science",
    duration: "50 minutes",
    targetStudents: ["All Grade 5 students"],
    difficulty: "intermediate",
    objectives: ["Understand plant life cycles", "Observe real specimens", "Document findings"],
    materials: ["Seeds", "Magnifying glasses", "Science journals", "Plant specimens"],
    description: "Hands-on exploration of plant life cycles with real specimens and observation activities.",
    priority: "medium"
  },
  {
    id: 4,
    title: "Story Writing Workshop",
    subject: "English",
    duration: "75 minutes",
    targetStudents: ["Students needing creative writing practice"],
    difficulty: "intermediate",
    objectives: ["Develop creative writing skills", "Understand story structure", "Practice narrative techniques"],
    materials: ["Writing prompts", "Story templates", "Computers/tablets"],
    description: "Interactive workshop focusing on creative writing skills and narrative development.",
    priority: "high"
  }
];

export default function Lessons() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  const { data: students } = useQuery<StudentWithScores[]>({
    queryKey: ["/api/dashboard/students"],
  });

  const { data: subjects } = useQuery<Subject[]>({
    queryKey: ["/api/subjects"],
  });

  // Generate AI recommendations based on student performance
  const aiRecommendations = students?.flatMap(student => 
    generateRecommendations(student).map(rec => ({
      id: `ai-${student.id}-${rec.title.replace(/\s+/g, '-')}`,
      title: rec.title,
      subject: rec.subjectName,
      duration: "45 minutes",
      targetStudents: [student.name],
      difficulty: "intermediate" as const,
      objectives: [rec.description],
      materials: ["Worksheets", "Interactive exercises"],
      description: rec.description,
      priority: rec.priority
    }))
  ) || [];

  const allLessonPlans = [...sampleLessonPlans, ...aiRecommendations];

  const filteredLessons = allLessonPlans.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lesson.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "all" || lesson.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Lesson Plans</h2>
            <p className="text-sm text-gray-500">Create and manage personalized lesson plans based on student needs.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-primary text-white hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Lesson Plan
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Browse Lesson Plans ({filteredLessons.length})</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search lesson plans..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">All Subjects</option>
                  {subjects?.map(subject => (
                    <option key={subject.id} value={subject.name}>{subject.name}</option>
                  ))}
                  <option value="All Subjects">All Subjects</option>
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations Section */}
        {aiRecommendations.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="h-5 w-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">AI-Generated Recommendations</h3>
              <Badge variant="secondary">Based on student performance</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {aiRecommendations.slice(0, 6).map((lesson) => (
                <Card key={lesson.id} className={`border-l-4 ${getRecommendationPriorityColor(lesson.priority)}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base font-medium">{lesson.title}</CardTitle>
                      <Badge className={getRecommendationBadgeColor(lesson.priority)}>
                        {lesson.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{lesson.subject}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">{lesson.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{lesson.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{lesson.targetStudents[0]}</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-primary text-white hover:bg-primary/90">
                      Use This Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Standard Lesson Plans */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Standard Lesson Plans</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleLessonPlans.filter(lesson => {
            const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 lesson.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSubject = selectedSubject === "all" || lesson.subject === selectedSubject;
            return matchesSearch && matchesSubject;
          }).map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-medium">{lesson.title}</CardTitle>
                  <Badge className={getDifficultyColor(lesson.difficulty)}>
                    {lesson.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{lesson.subject}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">{lesson.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Book className="h-4 w-4" />
                      <span>{lesson.materials.length} materials</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">Target Students:</p>
                    <p className="text-xs text-gray-600">{lesson.targetStudents.join(", ")}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">Learning Objectives:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {lesson.objectives.slice(0, 2).map((objective, index) => (
                        <li key={index}>• {objective}</li>
                      ))}
                      {lesson.objectives.length > 2 && (
                        <li className="text-gray-500">+ {lesson.objectives.length - 2} more</li>
                      )}
                    </ul>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" className="flex-1 bg-primary text-white hover:bg-primary/90">
                    Use Plan
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Customize
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No lesson plans found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </>
  );
}