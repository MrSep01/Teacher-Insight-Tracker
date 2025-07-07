import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AssessmentWithDetails } from "@shared/schema";
import { Calculator, Leaf, Book } from "lucide-react";

const subjectIcons = {
  "Mathematics": Calculator,
  "Science": Leaf,
  "English": Book,
  "History": Book,
};

const subjectColors = {
  "Mathematics": "bg-blue-500",
  "Science": "bg-green-500",
  "English": "bg-orange-500",
  "History": "bg-purple-500",
};

export default function RecentAssessments() {
  const { data: assessments, isLoading } = useQuery<AssessmentWithDetails[]>({
    queryKey: ["/api/dashboard/assessments/recent"],
  });

  if (isLoading) {
    return (
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Assessments</CardTitle>
            <Button variant="link" className="text-sm text-primary">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                    <div className="h-3 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-12"></div>
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!assessments || assessments.length === 0) {
    return (
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Assessments</CardTitle>
            <Button variant="link" className="text-sm text-primary">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">No recent assessments found.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Recent Assessments</CardTitle>
          <Button variant="link" className="text-sm text-primary">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assessments.map((assessment) => {
            const Icon = subjectIcons[assessment.subject.name as keyof typeof subjectIcons] || Book;
            const colorClass = subjectColors[assessment.subject.name as keyof typeof subjectColors] || "bg-gray-500";
            
            return (
              <div key={assessment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${colorClass} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{assessment.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(assessment.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{Math.round(assessment.averageScore)}%</p>
                  <p className="text-sm text-gray-500">{assessment.studentCount} students</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
