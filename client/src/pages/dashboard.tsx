import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Bell, Download } from "lucide-react";
import StatsCards from "@/components/dashboard/stats-cards";
import ProgressChart from "@/components/dashboard/progress-chart";
import RecentAssessments from "@/components/dashboard/recent-assessments";
import StudentTable from "@/components/dashboard/student-table";
import AssessmentModal from "@/components/modals/assessment-modal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { StudentWithScores } from "@shared/schema";

export default function Dashboard() {
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: students } = useQuery<StudentWithScores[]>({
    queryKey: ["/api/dashboard/students"],
  });

  const exportStudentData = () => {
    if (!students) return;
    
    const headers = ['Student Name', 'Grade', 'Student ID', 'Overall %', 'Math %', 'Science %', 'English %', 'Status'];
    const rows = students.map(student => [
      student.name,
      student.grade,
      student.studentId,
      Math.round(student.overallPercentage).toString(),
      Math.round(student.subjectAverages.Mathematics || 0).toString(),
      Math.round(student.subjectAverages.Science || 0).toString(),
      Math.round(student.subjectAverages.English || 0).toString(),
      student.status
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student-performance-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
            <p className="text-sm text-gray-500">Welcome back! Here's your class overview for today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => setIsAssessmentModalOpen(true)} className="bg-primary text-white hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Assessment
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {/* Stats Cards */}
        <StatsCards />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Class Progress Overview */}
          <ProgressChart />

          {/* Recent Assessments */}
          <RecentAssessments />
        </div>

        {/* Student Performance Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Student Performance</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button 
                  onClick={() => exportStudentData()}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          <StudentTable searchQuery={searchQuery} />
        </div>
      </main>

      <AssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
      />
    </>
  );
}
