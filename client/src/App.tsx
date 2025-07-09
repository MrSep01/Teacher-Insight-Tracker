import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import AuthGuard from "@/components/auth/auth-guard";
import Dashboard from "@/pages/dashboard";
import Students from "@/pages/students";
import Classes from "@/pages/classes";
import Assessments from "@/pages/assessments";
import Modules from "@/pages/modules";
import Reports from "@/pages/reports";
import AIRecommendations from "@/pages/ai-recommendations";
import Profile from "@/pages/profile";
import Login from "@/pages/login";
import VerifyEmail from "@/pages/verify-email";
import DevVerify from "@/pages/dev-verify";
import ProfileSetup from "@/pages/profile-setup";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Sidebar from "@/components/layout/sidebar";

function Router() {
  const { user, isLoading } = useAuth();

  // Show profile setup if user is authenticated but hasn't completed profile
  if (user && !user.profileCompleted) {
    return <ProfileSetup />;
  }

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/verify-email" component={VerifyEmail} />
      <Route path="/dev-verify" component={DevVerify} />
      <Route path="/profile-setup" component={ProfileSetup} />
      
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard">
        <AuthGuard>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Dashboard />
            </div>
          </div>
        </AuthGuard>
      </Route>
      
      <Route path="/students">
        <AuthGuard>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Students />
            </div>
          </div>
        </AuthGuard>
      </Route>
      
      <Route path="/classes">
        <AuthGuard>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Classes />
            </div>
          </div>
        </AuthGuard>
      </Route>
      
      <Route path="/modules">
        <AuthGuard>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Modules />
            </div>
          </div>
        </AuthGuard>
      </Route>
      
      <Route path="/assessments">
        <AuthGuard>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Assessments />
            </div>
          </div>
        </AuthGuard>
      </Route>
      
      <Route path="/reports">
        <AuthGuard>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Reports />
            </div>
          </div>
        </AuthGuard>
      </Route>
      
      <Route path="/ai-recommendations">
        <AuthGuard>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <AIRecommendations />
            </div>
          </div>
        </AuthGuard>
      </Route>
      
      <Route path="/profile">
        <AuthGuard>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Profile />
            </div>
          </div>
        </AuthGuard>
      </Route>
      
      {/* Landing page as default */}
      <Route path="/" component={Landing} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
