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
import { Link } from "wouter";

const Dashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Link href="/students">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your students and track their progress</p>
          </CardContent>
        </Card>
      </Link>
      <Link href="/modules">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Create and manage curriculum modules</p>
          </CardContent>
        </Card>
      </Link>
      <Link href="/assessments">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Design and grade assessments</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  </div>
);

const Students = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Students</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Student management system - Create classes, enroll students, and track their progress through your curriculum.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Create Class</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">Set up a new class for your students</p>
            <Button className="mt-2" size="sm">Create Class</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Manage Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">View and manage enrolled students</p>
            <Button className="mt-2" size="sm">View Students</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

const Assessments = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Assessments</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        AI-powered assessment creation and management system for IGCSE and A-Level Chemistry.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Create Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">Generate AI-powered assessments</p>
            <Button className="mt-2" size="sm">Create Assessment</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">View Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">Review student performance</p>
            <Button className="mt-2" size="sm">View Results</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

const Modules = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Modules</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Curriculum module management based on official Edexcel specifications for IGCSE and A-Level Chemistry.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Create Module</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">Build curriculum modules with learning objectives</p>
            <Button className="mt-2" size="sm">Create Module</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Manage Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">Edit and organize your modules</p>
            <Button className="mt-2" size="sm">View Modules</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

const Lessons = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Lessons</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        AI-powered lesson generation with comprehensive teaching materials and multimedia content.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Create Lesson</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">Generate complete lessons with AI</p>
            <Button className="mt-2" size="sm">Create Lesson</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lesson Library</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">Browse and manage your lessons</p>
            <Button className="mt-2" size="sm">View Lessons</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

const Reports = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Comprehensive reporting and analytics to track student progress and performance.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Student Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">Track individual student progress</p>
            <Button className="mt-2" size="sm">View Progress</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Class Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">Analyze class performance</p>
            <Button className="mt-2" size="sm">View Analytics</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

const AIRecommendations = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">AI Recommendations</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Intelligent recommendations based on student performance data and learning patterns.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Student Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">Personalized learning suggestions</p>
            <Button className="mt-2" size="sm">View Recommendations</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Teaching Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered teaching strategies</p>
            <Button className="mt-2" size="sm">View Insights</Button>
          </CardContent>
        </Card>
      </div>
    </div>
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
            <div className="flex items-center space-x-8">
              <Link href="/">
                <span className="text-xl font-bold text-gray-900 dark:text-white cursor-pointer">EduTrack</span>
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link href="/students">
                  <span className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">Students</span>
                </Link>
                <Link href="/modules">
                  <span className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">Modules</span>
                </Link>
                <Link href="/assessments">
                  <span className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">Assessments</span>
                </Link>
                <Link href="/lessons">
                  <span className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">Lessons</span>
                </Link>
                <Link href="/reports">
                  <span className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">Reports</span>
                </Link>
                <Link href="/ai-recommendations">
                  <span className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">AI Recommendations</span>
                </Link>
              </nav>
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