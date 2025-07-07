import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Download, Calendar, TrendingUp, TrendingDown, 
  Users, BarChart3, PieChart, Filter, Search 
} from "lucide-react";
import { StudentWithScores, AssessmentWithDetails, DashboardStats } from "@shared/schema";

export default function Reports() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: students } = useQuery<StudentWithScores[]>({
    queryKey: ["/api/dashboard/students"],
  });

  const { data: assessments } = useQuery<AssessmentWithDetails[]>({
    queryKey: ["/api/dashboard/assessments/recent"],
  });

  const exportData = (format: 'csv' | 'pdf') => {
    if (!students) return;
    
    if (format === 'csv') {
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
      a.download = `student-report-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const getPerformanceTrend = (student: StudentWithScores) => {
    if (student.scores.length < 2) return { trend: 'stable', change: 0 };
    
    const recentScores = student.scores.slice(-3);
    const average = recentScores.reduce((sum, score) => sum + Number(score.percentage), 0) / recentScores.length;
    const previousAverage = student.scores.slice(-6, -3).length > 0 
      ? student.scores.slice(-6, -3).reduce((sum, score) => sum + Number(score.percentage), 0) / student.scores.slice(-6, -3).length
      : average;
    
    const change = average - previousAverage;
    return {
      trend: change > 5 ? 'improving' : change < -5 ? 'declining' : 'stable',
      change: Math.round(change)
    };
  };

  const reportCards = [
    {
      title: "Class Performance Summary",
      description: "Overview of all students' academic performance",
      icon: BarChart3,
      color: "bg-blue-500",
      data: stats ? `${stats.totalStudents} students, ${stats.averageScore}% avg` : "Loading..."
    },
    {
      title: "Subject Analysis",
      description: "Performance breakdown by subject areas",
      icon: PieChart,
      color: "bg-green-500",
      data: students ? `${Object.keys(students[0]?.subjectAverages || {}).length} subjects tracked` : "Loading..."
    },
    {
      title: "Progress Tracking",
      description: "Student progress over time with trends",
      icon: TrendingUp,
      color: "bg-purple-500",
      data: assessments ? `${assessments.length} recent assessments` : "Loading..."
    },
    {
      title: "Intervention Report",
      description: "Students requiring additional support",
      icon: Users,
      color: "bg-orange-500",
      data: stats ? `${stats.needsAttention} students need attention` : "Loading..."
    }
  ];

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h2>
            <p className="text-sm text-gray-500">Generate comprehensive reports and analyze student performance data.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => exportData('csv')}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button 
              onClick={() => exportData('pdf')}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Report Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Students</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-primary text-white hover:bg-primary/90">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {reportCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${card.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                      <p className="text-xs text-gray-500">{card.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-gray-900">{card.data}</p>
                  <Button size="sm" variant="outline" className="w-full mt-3">
                    <FileText className="h-3 w-3 mr-1" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Performance Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students?.slice(0, 5).map(student => {
                  const trend = getPerformanceTrend(student);
                  return (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{Math.round(student.overallPercentage)}% overall</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {trend.trend === 'improving' ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : trend.trend === 'declining' ? (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        ) : (
                          <div className="h-4 w-4 bg-gray-400 rounded-full" />
                        )}
                        <Badge variant={
                          trend.trend === 'improving' ? 'default' :
                          trend.trend === 'declining' ? 'destructive' : 'secondary'
                        }>
                          {trend.change > 0 ? '+' : ''}{trend.change}%
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Assessment Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Recent Assessments</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assessments?.map(assessment => (
                  <div key={assessment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{assessment.title}</p>
                      <p className="text-sm text-gray-500">
                        {assessment.subject.name} • {assessment.studentCount} students
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{Math.round(assessment.averageScore)}%</p>
                      <p className="text-xs text-gray-500">Class avg</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Student Report */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Detailed Student Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Overall</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Math</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Science</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">English</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trend</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students?.filter(student => 
                    student.name.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map(student => {
                    const trend = getPerformanceTrend(student);
                    return (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.grade}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-semibold">{Math.round(student.overallPercentage)}%</td>
                        <td className="px-4 py-3">{Math.round(student.subjectAverages.Mathematics || 0)}%</td>
                        <td className="px-4 py-3">{Math.round(student.subjectAverages.Science || 0)}%</td>
                        <td className="px-4 py-3">{Math.round(student.subjectAverages.English || 0)}%</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-1">
                            {trend.trend === 'improving' ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : trend.trend === 'declining' ? (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            ) : (
                              <div className="h-4 w-4 bg-gray-400 rounded-full" />
                            )}
                            <span className="text-sm">{trend.change > 0 ? '+' : ''}{trend.change}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={
                            student.status === 'excelling' ? 'default' :
                            student.status === 'needs_attention' ? 'destructive' : 'secondary'
                          }>
                            {student.status.replace('_', ' ')}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}