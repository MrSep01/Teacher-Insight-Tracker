import { useQuery } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { useAuth } from "@/hooks/useAuth";

// Teacher Dashboard Components (placeholder components for now)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LandingPage from "@/components/pages/landing-page";
import LoginPage from "@/components/auth/login-page";
import SignUpPage from "@/components/auth/signup-page";
import NotFound from "@/components/pages/not-found";

// Placeholder components for teacher dashboard
const Dashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage your students and track their progress</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Create and manage curriculum modules</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Design and grade assessments</p>
        </CardContent>
      </Card>
    </div>
  </div>
);

const Students = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Students</h1>
    <p>Student management coming soon...</p>
  </div>
);

const Assessments = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Assessments</h1>
    <p>Assessment management coming soon...</p>
  </div>
);

const Modules = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Modules</h1>
    <p>Module management coming soon...</p>
  </div>
);

const Lessons = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Lessons</h1>
    <p>Lesson management coming soon...</p>
  </div>
);

const Reports = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Reports</h1>
    <p>Reports coming soon...</p>
  </div>
);

const AIRecommendations = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">AI Recommendations</h1>
    <p>AI recommendations coming soon...</p>
  </div>
);

const ProfileSetup = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Profile Setup</h1>
    <p>Complete your profile setup...</p>
  </div>
);

// Public pages placeholders
const PrivacyPolicy = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
    <p>Privacy policy content...</p>
  </div>
);

const TermsOfService = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
    <p>Terms of service content...</p>
  </div>
);

const Documentation = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Documentation</h1>
    <p>Documentation content...</p>
  </div>
);

const CookiePolicy = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Cookie Policy</h1>
    <p>Cookie policy content...</p>
  </div>
);

const GDPR = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">GDPR</h1>
    <p>GDPR content...</p>
  </div>
);

const Careers = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Careers</h1>
    <p>Careers content...</p>
  </div>
);

const Blog = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Blog</h1>
    <p>Blog content...</p>
  </div>
);

const APIInfo = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">API Information</h1>
    <p>API information content...</p>
  </div>
);

// Student Dashboard Components
import StudentDashboard from "@/components/student/student-dashboard";
import StudentClassView from "@/components/student/student-class-view";
import JoinClass from "@/components/student/join-class";

interface UserRole {
  id: number;
  role: "teacher" | "student";
  profileCompleted: boolean;
  firstName?: string;
  lastName?: string;
}

export default function RoleBasedRouter() {
  const { user, isLoading, isAuthenticated } = useAuth();
  
  const { data: userData } = useQuery<UserRole>({
    queryKey: ["/api/auth/user"],
    enabled: isAuthenticated,
  });

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Public routes (accessible without authentication)
  const PublicRoutes = () => (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/gdpr" component={GDPR} />
      <Route path="/careers" component={Careers} />
      <Route path="/blog" component={Blog} />
      <Route path="/api-info" component={APIInfo} />
      <Route component={NotFound} />
    </Switch>
  );

  // Teacher routes (for authenticated teachers)
  const TeacherRoutes = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">EduTrack</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => window.location.href = "/api/auth/logout"}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/students" component={Students} />
        <Route path="/assessments" component={Assessments} />
        <Route path="/modules" component={Modules} />
        <Route path="/lessons" component={Lessons} />
        <Route path="/reports" component={Reports} />
        <Route path="/ai-recommendations" component={AIRecommendations} />
        <Route path="/profile-setup" component={ProfileSetup} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );

  // Student routes (for authenticated students)
  const StudentRoutes = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">EduTrack Student</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => window.location.href = "/api/auth/logout"}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/" component={StudentDashboard} />
        <Route path="/student/dashboard" component={StudentDashboard} />
        <Route path="/student/class/:classId" component={StudentClassView} />
        <Route path="/student/join-class" component={JoinClass} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );

  // If not authenticated, show public routes
  if (!isAuthenticated || !userData) {
    return <PublicRoutes />;
  }

  // If authenticated but profile not completed (teachers only)
  if (userData.role === "teacher" && !userData.profileCompleted) {
    return (
      <Switch>
        <Route path="/profile-setup" component={ProfileSetup} />
        <Route path="/" component={ProfileSetup} />
        <Route component={ProfileSetup} />
      </Switch>
    );
  }

  // Route based on user role
  if (userData.role === "student") {
    return <StudentRoutes />;
  } else {
    return <TeacherRoutes />;
  }
}