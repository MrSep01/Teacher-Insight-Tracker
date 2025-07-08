import { Link, useLocation } from "wouter";
import { GraduationCap, BarChart3, Users, Book, ClipboardCheck, FileText, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Students", href: "/students", icon: Users },
  { name: "Lesson Plans", href: "/lessons", icon: Book },
  { name: "Assessments", href: "/assessments", icon: ClipboardCheck },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "AI Recommendations", href: "/ai-recommendations", icon: Brain },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      {/* Logo and Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">EduTrack</h1>
            <p className="text-sm text-gray-500">Teacher Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors font-medium cursor-pointer",
                  isActive
                    ? "text-white bg-primary"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">MJ</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Ms. Johnson</p>
            <p className="text-xs text-gray-500">Grade 5 Teacher</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <span className="sr-only">User menu</span>
            ⋮
          </button>
        </div>
      </div>
    </div>
  );
}
