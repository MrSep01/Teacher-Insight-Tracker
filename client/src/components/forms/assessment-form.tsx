import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertAssessmentSchema, Subject } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { Save } from "lucide-react";

const assessmentFormSchema = insertAssessmentSchema.extend({
  date: z.string().min(1, "Date is required"),
});

type AssessmentFormData = z.infer<typeof assessmentFormSchema>;

interface AssessmentFormProps {
  onSuccess: () => void;
}

export default function AssessmentForm({ onSuccess }: AssessmentFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: subjects } = useQuery<Subject[]>({
    queryKey: ["/api/subjects"],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentFormSchema),
    defaultValues: {
      title: "",
      subjectId: 0,
      date: "",
      totalPoints: 100,
      description: "",
    },
  });

  const selectedSubjectId = watch("subjectId");

  const createAssessmentMutation = useMutation({
    mutationFn: async (data: AssessmentFormData) => {
      const response = await apiRequest("POST", "/api/assessments", {
        ...data,
        date: new Date(data.date).toISOString(),
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Assessment created successfully",
        description: "The assessment has been added to your dashboard.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/assessments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/assessments/recent"] });
      onSuccess();
    },
    onError: (error) => {
      toast({
        title: "Error creating assessment",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AssessmentFormData) => {
    createAssessmentMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="title">Assessment Title</Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="Enter assessment title"
            className="mt-2"
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Select
            value={selectedSubjectId?.toString() || ""}
            onValueChange={(value) => setValue("subjectId", parseInt(value))}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects?.map((subject) => (
                <SelectItem key={subject.id} value={subject.id.toString()}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.subjectId && (
            <p className="text-sm text-red-600 mt-1">{errors.subjectId.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            {...register("date")}
            className="mt-2"
          />
          {errors.date && (
            <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="totalPoints">Total Points</Label>
          <Input
            id="totalPoints"
            type="number"
            {...register("totalPoints", { valueAsNumber: true })}
            placeholder="100"
            className="mt-2"
          />
          {errors.totalPoints && (
            <p className="text-sm text-red-600 mt-1">{errors.totalPoints.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter assessment description..."
          rows={4}
          className="mt-2"
        />
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={createAssessmentMutation.isPending}
          className="bg-primary hover:bg-primary/90"
        >
          {createAssessmentMutation.isPending ? (
            "Creating..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Create Assessment
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
