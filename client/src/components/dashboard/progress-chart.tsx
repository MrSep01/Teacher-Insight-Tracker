import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3 } from "lucide-react";
import { StudentWithScores } from "@shared/schema";

export default function ProgressChart() {
  const [selectedSubject, setSelectedSubject] = useState("all");
  
  const { data: students } = useQuery<StudentWithScores[]>({
    queryKey: ["/api/dashboard/students"],
  });

  const getSubjectData = () => {
    if (!students) return [];
    
    if (selectedSubject === "all") {
      // Overall performance data
      const performanceRanges = {
        "90-100%": students.filter(s => s.overallPercentage >= 90).length,
        "80-89%": students.filter(s => s.overallPercentage >= 80 && s.overallPercentage < 90).length,
        "70-79%": students.filter(s => s.overallPercentage >= 70 && s.overallPercentage < 80).length,
        "60-69%": students.filter(s => s.overallPercentage >= 60 && s.overallPercentage < 70).length,
        "Below 60%": students.filter(s => s.overallPercentage < 60).length,
      };
      return Object.entries(performanceRanges);
    } else {
      // Subject-specific data
      const subjectScores = students
        .map(s => s.subjectAverages[selectedSubject] || 0)
        .filter(score => score > 0);
      
      const performanceRanges = {
        "90-100%": subjectScores.filter(s => s >= 90).length,
        "80-89%": subjectScores.filter(s => s >= 80 && s < 90).length,
        "70-79%": subjectScores.filter(s => s >= 70 && s < 80).length,
        "60-69%": subjectScores.filter(s => s >= 60 && s < 70).length,
        "Below 60%": subjectScores.filter(s => s < 60).length,
      };
      return Object.entries(performanceRanges);
    }
  };

  const chartData = getSubjectData();
  const maxValue = Math.max(...chartData.map(([_, count]) => count as number));

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Class Progress Overview</CardTitle>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="History">History</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          {students ? (
            <div className="h-full flex items-end justify-between space-x-2">
              {chartData.map(([range, count]) => {
                const height = maxValue > 0 ? ((count as number) / maxValue) * 100 : 0;
                const getBarColor = (range: string) => {
                  if (range.startsWith("90")) return "bg-green-500";
                  if (range.startsWith("80")) return "bg-blue-500";
                  if (range.startsWith("70")) return "bg-yellow-500";
                  if (range.startsWith("60")) return "bg-orange-500";
                  return "bg-red-500";
                };
                
                return (
                  <div key={range} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col items-center mb-2">
                      <span className="text-sm font-medium text-gray-900 mb-1">{count}</span>
                      <div 
                        className={`w-full ${getBarColor(range)} rounded-t-md transition-all duration-500 ease-in-out min-h-[4px]`}
                        style={{ height: `${Math.max(height, 4)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 text-center leading-tight">{range}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-full bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 font-medium">Loading Progress Chart...</p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {selectedSubject === "all" ? "Overall Performance Distribution" : `${selectedSubject} Performance Distribution`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
