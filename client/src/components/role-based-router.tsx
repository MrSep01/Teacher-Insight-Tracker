import { useQuery } from "@tanstack/react-query";
import { useLocation, Redirect } from "wouter";
import Dashboard from "@/pages/dashboard";
import StudentDashboard from "@/pages/student-dashboard";
import ParentDashboard from "@/pages/parent-dashboard";
import AdminDashboard from "@/pages/admin-dashboard";
import Sidebar from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: "teacher" | "student" | "parent" | "admin";
  profileCompleted?: boolean;
}

export default function RoleBasedRouter() {
  const [location] = useLocation();
  
  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ["/api/auth/user"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Loading Dashboard...
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">
              Determining your role and preparing your personalized dashboard
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !user) {
    return <Redirect to="/login" />;
  }

  // Redirect to profile setup if profile is not completed (for teachers)
  if (user.role === "teacher" && !user.profileCompleted) {
    return <Redirect to="/profile-setup" />;
  }

  // Route based on user role
  switch (user.role) {
    case "teacher":
      return (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Dashboard />
          </div>
        </div>
      );
    case "student":
      return <StudentDashboard />;
    case "parent":
      return <ParentDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-red-600">Access Denied</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Your account role is not recognized. Please contact support.
              </p>
            </CardContent>
          </Card>
        </div>
      );
  }
}