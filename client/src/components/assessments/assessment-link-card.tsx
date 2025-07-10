import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Clock, 
  Target, 
  Users, 
  ArrowRight,
  BookOpen
} from "lucide-react";

interface AssessmentLinkCardProps {
  assessmentId: number;
  title: string;
  description: string;
  duration: number;
  questionCount: number;
  assessmentType: string;
  difficulty: string;
  onView: () => void;
  onTakeAssessment: () => void;
}

export default function AssessmentLinkCard({ 
  assessmentId, 
  title, 
  description, 
  duration, 
  questionCount,
  assessmentType,
  difficulty,
  onView, 
  onTakeAssessment 
}: AssessmentLinkCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'formative': return 'bg-blue-100 text-blue-800';
      case 'summative': return 'bg-purple-100 text-purple-800';
      case 'diagnostic': return 'bg-orange-100 text-orange-800';
      case 'practice': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge className={getDifficultyColor(difficulty)}>
              {difficulty}
            </Badge>
            <Badge className={getTypeColor(assessmentType)}>
              {assessmentType}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Target className="w-4 h-4" />
            <span>{questionCount} questions</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>Class assessment</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={onView}
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            View Assessment
          </Button>
          <Button 
            onClick={onTakeAssessment}
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            Take Assessment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}