import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { GraduationCap, BookOpen, Users, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

const profileSetupSchema = z.object({
  subjects: z.array(z.string()).min(1, "Please select at least one Chemistry topic"),
  gradeLevels: z.array(z.string()).min(1, "Please select at least one grade level"),
  educationLevels: z.array(z.string()).min(1, "Please select at least one education level"),
});

type ProfileSetupData = z.infer<typeof profileSetupSchema>;

const chemistryTopics = [
  { id: "atomic-structure", name: "Atomic Structure & Bonding", description: "Electronic structure, ionic and covalent bonding" },
  { id: "periodicity", name: "Periodicity", description: "Periodic trends and properties of elements" },
  { id: "chemical-bonding", name: "Chemical Bonding", description: "Types of bonding and molecular geometry" },
  { id: "organic-basics", name: "Organic Chemistry Basics", description: "Hydrocarbons, functional groups, nomenclature" },
  { id: "energetics", name: "Energetics", description: "Enthalpy changes and energy cycles" },
  { id: "advanced-organic", name: "Advanced Organic Chemistry", description: "Reaction mechanisms and synthesis" },
  { id: "thermodynamics", name: "Thermodynamics", description: "Entropy, Gibbs energy, equilibrium" },
  { id: "kinetics", name: "Kinetics", description: "Reaction rates and mechanisms" },
];

const gradeLevels = [
  { id: "10", name: "Grade 10", description: "Foundation chemistry concepts" },
  { id: "11", name: "Grade 11", description: "Intermediate chemistry topics" },
  { id: "12", name: "Grade 12", description: "Advanced chemistry and applications" },
];

const educationLevels = [
  { id: "IGCSE", name: "IGCSE", description: "International General Certificate of Secondary Education" },
  { id: "A Level", name: "A Level", description: "Advanced Level qualification" },
];

export default function ProfileSetup() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileSetupData>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      subjects: [],
      gradeLevels: [],
      educationLevels: [],
    },
  });

  const selectedSubjects = watch("subjects") || [];
  const selectedGradeLevels = watch("gradeLevels") || [];
  const selectedEducationLevels = watch("educationLevels") || [];

  const setupProfileMutation = useMutation({
    mutationFn: async (data: ProfileSetupData) => {
      const response = await apiRequest("POST", "/api/auth/setup-profile", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Profile setup complete!",
        description: "Welcome to your personalized Chemistry dashboard.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      setLocation("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Setup failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProfileSetupData) => {
    setupProfileMutation.mutate(data);
  };

  const handleSubjectToggle = (subjectId: string) => {
    const current = selectedSubjects;
    const updated = current.includes(subjectId)
      ? current.filter(id => id !== subjectId)
      : [...current, subjectId];
    setValue("subjects", updated);
  };

  const handleGradeLevelToggle = (gradeId: string) => {
    const current = selectedGradeLevels;
    const updated = current.includes(gradeId)
      ? current.filter(id => id !== gradeId)
      : [...current, gradeId];
    setValue("gradeLevels", updated);
  };

  const handleEducationLevelToggle = (levelId: string) => {
    const current = selectedEducationLevels;
    const updated = current.includes(levelId)
      ? current.filter(id => id !== levelId)
      : [...current, levelId];
    setValue("educationLevels", updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-bold">Complete Your Teaching Profile</CardTitle>
          <CardDescription className="text-lg">
            Let's customize EduTrack for your Chemistry teaching needs
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Chemistry Topics Selection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold">Chemistry Topics You Teach</h3>
              </div>
              <p className="text-gray-600">Select the Chemistry topics you currently teach or plan to teach:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chemistryTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedSubjects.includes(topic.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleSubjectToggle(topic.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={selectedSubjects.includes(topic.id)}
                        onChange={() => handleSubjectToggle(topic.id)}
                        className="mt-1"
                      />
                      <div>
                        <h4 className="font-medium">{topic.name}</h4>
                        <p className="text-sm text-gray-600">{topic.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.subjects && (
                <p className="text-sm text-red-600">{errors.subjects.message}</p>
              )}
            </div>

            {/* Grade Levels Selection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold">Grade Levels You Teach</h3>
              </div>
              <p className="text-gray-600">Select the grade levels you teach:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {gradeLevels.map((grade) => (
                  <div
                    key={grade.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedGradeLevels.includes(grade.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleGradeLevelToggle(grade.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={selectedGradeLevels.includes(grade.id)}
                        onChange={() => handleGradeLevelToggle(grade.id)}
                        className="mt-1"
                      />
                      <div>
                        <h4 className="font-medium">{grade.name}</h4>
                        <p className="text-sm text-gray-600">{grade.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.gradeLevels && (
                <p className="text-sm text-red-600">{errors.gradeLevels.message}</p>
              )}
            </div>

            {/* Education Levels Selection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold">Education Levels You Teach</h3>
              </div>
              <p className="text-gray-600">Select the education levels you teach:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {educationLevels.map((level) => (
                  <div
                    key={level.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedEducationLevels.includes(level.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleEducationLevelToggle(level.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={selectedEducationLevels.includes(level.id)}
                        onChange={() => handleEducationLevelToggle(level.id)}
                        className="mt-1"
                      />
                      <div>
                        <h4 className="font-medium">{level.name}</h4>
                        <p className="text-sm text-gray-600">{level.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.educationLevels && (
                <p className="text-sm text-red-600">{errors.educationLevels.message}</p>
              )}
            </div>

            {/* Curriculum Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800">Curriculum Focus</h4>
              <p className="text-blue-700">
                EduTrack is specifically designed for <strong>Edexcel Chemistry</strong> curriculum. 
                All assessments, lesson plans, and recommendations are aligned with Edexcel standards.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={setupProfileMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                {setupProfileMutation.isPending ? "Setting up..." : "Complete Setup"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}