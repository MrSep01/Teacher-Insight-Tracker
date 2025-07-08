import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertStudentSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { UserPlus } from "lucide-react";

const studentFormSchema = insertStudentSchema;

type StudentFormData = z.infer<typeof studentFormSchema>;

interface StudentFormProps {
  onSuccess: () => void;
}

export default function StudentForm({ onSuccess }: StudentFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: "",
      grade: "",
      level: "",
      studentId: "",
    },
  });

  const selectedGrade = watch("grade");
  const selectedLevel = watch("level");

  const createStudentMutation = useMutation({
    mutationFn: async (data: StudentFormData) => {
      const response = await apiRequest("POST", "/api/students", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Student added successfully",
        description: "The student has been added to your class.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/students"] });
      onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Error adding student",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: StudentFormData) => {
    createStudentMutation.mutate(data);
  };

  const generateStudentId = () => {
    const grade = watch("grade");
    const level = watch("level");
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    if (grade && level) {
      const prefix = level === "IGCSE" ? "IGC" : "AL";
      setValue("studentId", `CHE${grade}${prefix}${random}`);
    } else {
      setValue("studentId", `CHE${random}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Enter student's full name"
            className="mt-2"
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="grade">Grade</Label>
          <Select
            value={watch("grade") || ""}
            onValueChange={(value) => setValue("grade", value)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">Grade 10</SelectItem>
              <SelectItem value="11">Grade 11</SelectItem>
              <SelectItem value="12">Grade 12</SelectItem>
            </SelectContent>
          </Select>
          {errors.grade && (
            <p className="text-sm text-red-600 mt-1">{errors.grade.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="level">Level</Label>
          <Select
            value={watch("level") || ""}
            onValueChange={(value) => setValue("level", value)}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IGCSE">IGCSE</SelectItem>
              <SelectItem value="A Level">A Level</SelectItem>
            </SelectContent>
          </Select>
          {errors.level && (
            <p className="text-sm text-red-600 mt-1">{errors.level.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="studentId">Student ID</Label>
          <div className="flex space-x-2 mt-2">
            <Input
              id="studentId"
              {...register("studentId")}
              placeholder="Enter or generate student ID"
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={generateStudentId}
              className="px-3"
            >
              Generate
            </Button>
          </div>
          {errors.studentId && (
            <p className="text-sm text-red-600 mt-1">{errors.studentId.message}</p>
          )}
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          Focus: <strong>Edexcel Chemistry</strong> curriculum for IGCSE (Grades 10-11) and A Level (Grade 12)
        </p>
        <p className="text-xs text-gray-500">
          Student status will be automatically calculated based on assessment results
        </p>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={createStudentMutation.isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          {createStudentMutation.isPending ? "Adding..." : "Add Student"}
        </Button>
      </div>
    </form>
  );
}