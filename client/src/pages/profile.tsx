import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { User, BookOpen, GraduationCap, Mail, Calendar, Settings, Plus, X } from "lucide-react";

const profileUpdateSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;

const AVAILABLE_CURRICULA = [
  "IGCSE Chemistry Edexcel",
  "A Level Chemistry Edexcel",
  "IGCSE Biology Edexcel",
  "A Level Biology Edexcel",
  "IGCSE Physics Edexcel",
  "A Level Physics Edexcel",
];

const AVAILABLE_GRADES = ["10", "11", "12"];

export default function Profile() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCurricula, setSelectedCurricula] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);

  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user"],
  });

  const form = useForm<ProfileUpdateData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
  });

  // Update form when user data loads
  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
      setSelectedCurricula(user.curricula || []);
      setSelectedGrades(user.gradeLevels || []);
    }
  }, [user, form]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileUpdateData) => {
      return await apiRequest("/api/auth/update-profile", {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      setIsEditing(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateCurriculaMutation = useMutation({
    mutationFn: async (data: { curricula: string[]; gradeLevels: string[] }) => {
      return await apiRequest("/api/auth/update-curricula", {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Curricula updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAddCurriculum = (curriculum: string) => {
    if (!selectedCurricula.includes(curriculum)) {
      setSelectedCurricula([...selectedCurricula, curriculum]);
    }
  };

  const handleRemoveCurriculum = (curriculum: string) => {
    setSelectedCurricula(selectedCurricula.filter(c => c !== curriculum));
  };

  const handleAddGrade = (grade: string) => {
    if (!selectedGrades.includes(grade)) {
      setSelectedGrades([...selectedGrades, grade]);
    }
  };

  const handleRemoveGrade = (grade: string) => {
    setSelectedGrades(selectedGrades.filter(g => g !== grade));
  };

  const handleSaveCurricula = () => {
    updateCurriculaMutation.mutate({
      curricula: selectedCurricula,
      gradeLevels: selectedGrades,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teacher Profile</h1>
          <p className="text-gray-600">Manage your account and curriculum preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <div className="text-sm text-gray-500">
            Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
              <CardDescription>Your personal details and contact information</CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              disabled={updateProfileMutation.isPending}
            >
              <Settings className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => updateProfileMutation.mutate(data))} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex space-x-3">
                  <Button type="submit" disabled={updateProfileMutation.isPending}>
                    {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">First Name</p>
                  <p className="text-base text-gray-900">{user?.firstName || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Name</p>
                  <p className="text-base text-gray-900">{user?.lastName || "Not set"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email Address</p>
                <p className="text-base text-gray-900 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {user?.email}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Curricula Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Curriculum & Grade Levels
          </CardTitle>
          <CardDescription>
            Manage the curricula and grade levels you teach
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Curricula */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Current Curricula</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedCurricula.map((curriculum) => (
                <Badge key={curriculum} variant="secondary" className="flex items-center">
                  {curriculum}
                  <button
                    onClick={() => handleRemoveCurriculum(curriculum)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedCurricula.length === 0 && (
                <p className="text-sm text-gray-500">No curricula selected</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_CURRICULA.filter(c => !selectedCurricula.includes(c)).map((curriculum) => (
                <Button
                  key={curriculum}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddCurriculum(curriculum)}
                  className="text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {curriculum}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Grade Levels */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Grade Levels</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedGrades.map((grade) => (
                <Badge key={grade} variant="secondary" className="flex items-center">
                  Grade {grade}
                  <button
                    onClick={() => handleRemoveGrade(grade)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedGrades.length === 0 && (
                <p className="text-sm text-gray-500">No grade levels selected</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_GRADES.filter(g => !selectedGrades.includes(g)).map((grade) => (
                <Button
                  key={grade}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddGrade(grade)}
                  className="text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Grade {grade}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSaveCurricula}
              disabled={updateCurriculaMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {updateCurriculaMutation.isPending ? "Saving..." : "Save Curricula"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Account Status
          </CardTitle>
          <CardDescription>Your account verification and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Email Verification</p>
                <p className="text-sm text-gray-500">
                  {user?.emailVerified ? "Your email has been verified" : "Email verification pending"}
                </p>
              </div>
              <Badge variant={user?.emailVerified ? "default" : "secondary"}>
                {user?.emailVerified ? "Verified" : "Pending"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Profile Completion</p>
                <p className="text-sm text-gray-500">
                  {user?.profileCompleted ? "Profile setup completed" : "Please complete your profile setup"}
                </p>
              </div>
              <Badge variant={user?.profileCompleted ? "default" : "secondary"}>
                {user?.profileCompleted ? "Complete" : "Incomplete"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Account Created</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}