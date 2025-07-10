import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Settings, 
  BarChart3,
  Shield,
  Database,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  UserCheck,
  School,
  Award,
  FileText,
  Activity
} from "lucide-react";

interface SystemStats {
  totalUsers: number;
  activeTeachers: number;
  totalStudents: number;
  totalParents: number;
  totalAssessments: number;
  totalLessons: number;
  systemUptime: string;
  serverLoad: number;
  storageUsed: number;
  storageTotal: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: "teacher" | "student" | "parent" | "admin";
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  joinDate: string;
  permissions?: string[];
}

interface SystemAlert {
  id: number;
  type: "error" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  // Mock data for demonstration
  const systemStats: SystemStats = {
    totalUsers: 2847,
    activeTeachers: 124,
    totalStudents: 2156,
    totalParents: 1432,
    totalAssessments: 8934,
    totalLessons: 12567,
    systemUptime: "99.9%",
    serverLoad: 45,
    storageUsed: 78,
    storageTotal: 500
  };

  const users: User[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@school.edu",
      role: "teacher",
      status: "active",
      lastLogin: "2025-07-10T08:30:00Z",
      joinDate: "2024-09-01",
      permissions: ["create_assessments", "manage_students", "view_reports"]
    },
    {
      id: 2,
      name: "Emma Wilson",
      email: "emma.wilson@student.edu",
      role: "student",
      status: "active",
      lastLogin: "2025-07-10T09:15:00Z",
      joinDate: "2024-09-15"
    },
    {
      id: 3,
      name: "Michael Davis",
      email: "michael.davis@parent.com",
      role: "parent",
      status: "active",
      lastLogin: "2025-07-09T19:22:00Z",
      joinDate: "2024-09-20"
    },
    {
      id: 4,
      name: "Prof. Robert Smith",
      email: "robert.smith@school.edu",
      role: "teacher",
      status: "inactive",
      lastLogin: "2025-07-05T14:45:00Z",
      joinDate: "2024-08-15",
      permissions: ["create_assessments", "manage_students"]
    }
  ];

  const systemAlerts: SystemAlert[] = [
    {
      id: 1,
      type: "warning",
      title: "High Storage Usage",
      message: "Storage usage is at 78% capacity. Consider archiving old data.",
      timestamp: "2025-07-10T08:00:00Z",
      resolved: false
    },
    {
      id: 2,
      type: "info",
      title: "System Backup Complete",
      message: "Daily backup completed successfully at 02:00 AM",
      timestamp: "2025-07-10T02:00:00Z",
      resolved: true
    },
    {
      id: 3,
      type: "error",
      title: "Failed Login Attempts",
      message: "Multiple failed login attempts detected from IP 192.168.1.100",
      timestamp: "2025-07-09T15:30:00Z",
      resolved: false
    }
  ];

  const roleStats = [
    { role: "Teachers", count: systemStats.activeTeachers, color: "bg-blue-500", icon: GraduationCap },
    { role: "Students", count: systemStats.totalStudents, color: "bg-green-500", icon: Users },
    { role: "Parents", count: systemStats.totalParents, color: "bg-purple-500", icon: UserCheck },
    { role: "Admins", count: 8, color: "bg-red-500", icon: Shield }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "error": return "border-red-500 bg-red-50";
      case "warning": return "border-yellow-500 bg-yellow-50";
      case "info": return "border-blue-500 bg-blue-50";
      default: return "border-gray-500 bg-gray-50";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "info": return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">System administration and user management</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="px-3 py-1">
                System Status: Online
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* System Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">
                    +12% from last month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
                  <GraduationCap className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.activeTeachers}</div>
                  <div className="text-xs text-gray-500">
                    +3 this week
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
                  <FileText className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.totalAssessments.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">
                    +156 today
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                  <Activity className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.systemUptime}</div>
                  <div className="text-xs text-gray-500">
                    Last 30 days
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Roles Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>User Distribution by Role</CardTitle>
                <CardDescription>
                  Current active users across different roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {roleStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${stat.color}`}>
                          <stat.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{stat.role}</p>
                          <p className="text-2xl font-bold">{stat.count.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Server Performance</CardTitle>
                  <CardDescription>
                    Current system load and performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Server Load</span>
                      <span className="text-sm">{systemStats.serverLoad}%</span>
                    </div>
                    <Progress value={systemStats.serverLoad} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Storage Used</span>
                      <span className="text-sm">{systemStats.storageUsed}GB / {systemStats.storageTotal}GB</span>
                    </div>
                    <Progress value={(systemStats.storageUsed / systemStats.storageTotal) * 100} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest system activities and events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New teacher registration</p>
                        <p className="text-xs text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">System backup completed</p>
                        <p className="text-xs text-gray-500">6 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Storage warning threshold reached</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage all system users and their permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="all">All Roles</option>
                    <option value="teacher">Teachers</option>
                    <option value="student">Students</option>
                    <option value="parent">Parents</option>
                    <option value="admin">Admins</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <p className="text-xs text-gray-400">
                            Joined: {new Date(user.joinDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="capitalize">
                          {user.role}
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Database Status</CardTitle>
                  <CardDescription>
                    Database performance and health metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Connection Status</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Query Performance</span>
                      <span className="text-sm">12ms avg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Active Connections</span>
                      <span className="text-sm">23/100</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                  <CardDescription>
                    Key system settings and configurations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Max Upload Size</span>
                      <span className="text-sm">10MB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Session Timeout</span>
                      <span className="text-sm">30 minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">API Rate Limit</span>
                      <span className="text-sm">1000/hour</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Analytics</CardTitle>
                <CardDescription>
                  Detailed analytics and usage statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Daily Active Users</p>
                    <p className="text-2xl font-bold">1,234</p>
                    <p className="text-xs text-green-600">+8% from yesterday</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Assessments Created</p>
                    <p className="text-2xl font-bold">456</p>
                    <p className="text-xs text-green-600">+15% from last week</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Avg. Session Duration</p>
                    <p className="text-2xl font-bold">24m</p>
                    <p className="text-xs text-blue-600">+2m from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>
                  Monitor system health and resolve issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className={`p-4 border rounded-lg ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          {getAlertIcon(alert.type)}
                          <div>
                            <p className="font-medium">{alert.title}</p>
                            <p className="text-sm text-gray-700">{alert.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(alert.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {alert.resolved ? (
                            <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                          ) : (
                            <Button size="sm" variant="outline">
                              Resolve
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}