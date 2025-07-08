import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AuthGuard from "@/components/auth/auth-guard";
import Dashboard from "@/pages/dashboard";
import Students from "@/pages/students";
import Assessments from "@/pages/assessments";
import Lessons from "@/pages/lessons";
import Reports from "@/pages/reports";
import AIRecommendations from "@/pages/ai-recommendations";
import Login from "@/pages/login";
import VerifyEmail from "@/pages/verify-email";
import NotFound from "@/pages/not-found";
import Sidebar from "@/components/layout/sidebar";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/verify-email" component={VerifyEmail} />
      <Route>
        <AuthGuard>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Switch>
                <Route path="/" component={Dashboard} />
                <Route path="/students" component={Students} />
                <Route path="/lessons" component={Lessons} />
                <Route path="/assessments" component={Assessments} />
                <Route path="/reports" component={Reports} />
                <Route path="/ai-recommendations" component={AIRecommendations} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </AuthGuard>
      </Route>
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
