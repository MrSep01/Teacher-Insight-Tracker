import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { GraduationCap, BookOpen, Users, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

const profileSetupSchema = z.object({
  curriculum: z.enum(["IGCSE Chemistry Edexcel", "A Level Chemistry Edexcel"], {
    required_error: "Please select a curriculum",
  }),
  gradeLevels: z.array(z.string()).min(1, "Please select at least one grade level"),
});

type ProfileSetupData = z.infer<typeof profileSetupSchema>;

const curriculumOptions = [
  { 
    id: "IGCSE Chemistry Edexcel", 
    name: "IGCSE Chemistry Edexcel", 
    description: "International General Certificate of Secondary Education - Chemistry",
    grades: ["10", "11"],
    topics: [
      "Principles of chemistry",
      "Chemistry of the elements", 
      "Organic chemistry",
      "Physical chemistry",
      "Chemistry in society"
    ]
  },
  { 
    id: "A Level Chemistry Edexcel", 
    name: "A Level Chemistry Edexcel", 
    description: "Advanced Level Chemistry qualification",
    grades: ["12"],
    topics: [
      "Atomic structure and the periodic table",
      "Bonding and structure", 
      "Redox I",
      "Inorganic chemistry and the periodic table",
      "Formulae, equations and amounts of substance",
      "Organic chemistry I",
      "Modern analytical techniques I",
      "Energetics I",
      "Kinetics I",
      "Equilibrium I",
      "Equilibrium II",
      "Acid-base equilibria",
      "Energetics II",
      "Redox II",
      "Transition metals",
      "Kinetics II",
      "Organic chemistry II",
      "Organic chemistry III",
      "Modern analytical techniques II"
    ]
  }
];

export default function ProfileSetup() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>("");
  const [selectedGradeLevels, setSelectedGradeLevels] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileSetupData>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      curriculum: undefined,
      gradeLevels: [],
    },
  });
  
  const availableGrades = selectedCurriculum 
    ? curriculumOptions.find(c => c.id === selectedCurriculum)?.grades || []
    : [];

  const setupProfileMutation = useMutation({
    mutationFn: async (data: ProfileSetupData) => {
      return await apiRequest("/api/auth/setup-profile", {
        method: "POST",
        body: data,
      });
    },
    onSuccess: () => {
      toast({
        title: "Profile setup complete!",
        description: "Welcome to your personalized Chemistry dashboard. You can now create modules and lesson plans.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      setLocation("/");
    },
    onError: (error: Error) => {
      console.error("Profile setup error:", error);
      toast({
        title: "Setup failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProfileSetupData) => {
    // Validate that we have the required data
    if (!selectedCurriculum || selectedGradeLevels.length === 0) {
      toast({
        title: "Missing information",
        description: "Please select a curriculum and at least one grade level.",
        variant: "destructive",
      });
      return;
    }

    // Submit the form data
    const formData = {
      curriculum: selectedCurriculum as ProfileSetupData["curriculum"],
      gradeLevels: selectedGradeLevels,
    };
    console.log("Submitting profile setup data:", formData);
    setupProfileMutation.mutate(formData);
  };

  const handleCurriculumSelect = (curriculumId: string) => {
    setSelectedCurriculum(curriculumId);
    setSelectedGradeLevels([]); // Reset grade levels when curriculum changes
    setValue("curriculum", curriculumId as any);
    setValue("gradeLevels", []);
  };

  const handleGradeLevelToggle = (gradeId: string) => {
    const updated = selectedGradeLevels.includes(gradeId)
      ? selectedGradeLevels.filter(id => id !== gradeId)
      : [...selectedGradeLevels, gradeId];
    setSelectedGradeLevels(updated);
    setValue("gradeLevels", updated);
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
            {/* Curriculum Selection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <h3 className="text-xl font-semibold">Select Your Chemistry Curriculum</h3>
              </div>
              <p className="text-gray-600">Choose the Edexcel Chemistry curriculum you teach:</p>
              
              <div className="grid grid-cols-1 gap-4">
                {curriculumOptions.map((curriculum) => (
                  <div
                    key={curriculum.id}
                    className={`p-6 border rounded-lg cursor-pointer transition-all ${
                      selectedCurriculum === curriculum.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleCurriculumSelect(curriculum.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-5 h-5 mt-1 rounded border-2 flex items-center justify-center ${
                        selectedCurriculum === curriculum.id 
                          ? 'bg-blue-600 border-blue-600' 
                          : 'border-gray-300'
                      }`}>
                        {selectedCurriculum === curriculum.id && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-lg">{curriculum.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{curriculum.description}</p>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Grades:</span> {curriculum.grades.join(", ")}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          <span className="font-medium">Key Topics:</span> {curriculum.topics.slice(0, 3).join(", ")}
                          {curriculum.topics.length > 3 && ` and ${curriculum.topics.length - 3} more...`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.curriculum && (
                <p className="text-sm text-red-600">{errors.curriculum.message}</p>
              )}
            </div>

            {/* Grade Levels Selection - Only show if curriculum is selected */}
            {selectedCurriculum && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h3 className="text-xl font-semibold">Grade Levels You Teach</h3>
                </div>
                <p className="text-gray-600">Select the grade levels you teach for {selectedCurriculum}:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {availableGrades.map((grade) => (
                    <div
                      key={grade}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedGradeLevels.includes(grade)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleGradeLevelToggle(grade)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-5 h-5 mt-1 rounded border-2 flex items-center justify-center ${
                          selectedGradeLevels.includes(grade) 
                            ? 'bg-blue-600 border-blue-600' 
                            : 'border-gray-300'
                        }`}>
                          {selectedGradeLevels.includes(grade) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">Grade {grade}</h4>
                          <p className="text-sm text-gray-600">
                            {grade === "10" || grade === "11" ? "IGCSE Level" : "A Level"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.gradeLevels && (
                  <p className="text-sm text-red-600">{errors.gradeLevels.message}</p>
                )}
              </div>
            )}

            {/* Next Steps Preview */}
            {selectedCurriculum && selectedGradeLevels.length > 0 && (
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">What's Next?</h4>
                <p className="text-green-700 mb-3">
                  After completing your profile, you'll be able to:
                </p>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Create curriculum modules based on {selectedCurriculum} topics</li>
                  <li>• Add lesson plans within each module</li>
                  <li>• Get AI-powered lesson suggestions based on student performance</li>
                  <li>• Track student progress across different chemistry topics</li>
                </ul>
              </div>
            )}

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