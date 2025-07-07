import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StudentWithScores } from "@shared/schema";
import { X, Plus, Calendar, FileText, Lightbulb } from "lucide-react";

interface StudentModalProps {
  student: StudentWithScores | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentModal({ student, isOpen, onClose }: StudentModalProps) {
  if (!student) return null;

  const initials = student.name.split(' ').map(n => n[0]).join('').toUpperCase();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 border-red-200";
      case "medium":
        return "bg-green-100 border-green-200";
      case "low":
        return "bg-blue-100 border-blue-200";
      default:
        return "bg-gray-100 border-gray-200";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-green-100 text-green-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Student Profile</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* Student Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-700">{initials}</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900">{student.name}</h4>
                <p className="text-gray-500">{student.grade}</p>
                <p className="text-sm text-gray-500">Student ID: {student.studentId}</p>
              </div>
            </div>

            {/* Progress Timeline */}
            <div>
              <h5 className="text-lg font-medium text-gray-900 mb-4">Progress Timeline</h5>
              <div className="space-y-4">
                {student.scores.slice(0, 5).map((score, index) => (
                  <div key={score.id} className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${getScoreColor(Number(score.percentage))}`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{score.assessment.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(score.assessment.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })} - Score: {Math.round(Number(score.percentage))}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lesson Suggestions */}
          <div className="space-y-6">
            <div>
              <h5 className="text-lg font-medium text-gray-900 mb-4">Tailored Lesson Suggestions</h5>
              <div className="space-y-4">
                {/* Sample recommendations based on student performance */}
                {student.subjectAverages.English && student.subjectAverages.English < 80 && (
                  <div className={`p-4 rounded-lg border ${getPriorityColor("high")}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      <h6 className="font-medium text-gray-900">Reading Comprehension Focus</h6>
                    </div>
                    <p className="text-sm text-gray-700">
                      Based on recent performance, consider additional reading exercises with guided questions.
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded ${getPriorityBadgeColor("high")}`}>
                        Priority: High
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">English</span>
                    </div>
                  </div>
                )}

                {student.subjectAverages.Mathematics && student.subjectAverages.Mathematics > 90 && (
                  <div className={`p-4 rounded-lg border ${getPriorityColor("medium")}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-green-600" />
                      <h6 className="font-medium text-gray-900">Advanced Math Challenges</h6>
                    </div>
                    <p className="text-sm text-gray-700">
                      {student.name} shows strong math skills. Consider providing advanced problem sets.
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded ${getPriorityBadgeColor("medium")}`}>
                        Priority: Medium
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Mathematics</span>
                    </div>
                  </div>
                )}

                {student.overallPercentage < 70 && (
                  <div className={`p-4 rounded-lg border ${getPriorityColor("high")}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      <h6 className="font-medium text-gray-900">General Study Support</h6>
                    </div>
                    <p className="text-sm text-gray-700">
                      Consider one-on-one tutoring sessions to address foundational gaps.
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded ${getPriorityBadgeColor("high")}`}>
                        Priority: High
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">All Subjects</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h5 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h5>
              <div className="space-y-2">
                <Button className="w-full justify-start bg-primary hover:bg-primary/90 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Custom Assignment
                </Button>
                <Button className="w-full justify-start bg-green-500 hover:bg-green-600 text-white">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Parent Conference
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Full Progress Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
