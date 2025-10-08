import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock } from "lucide-react";

const assessmentSchema = z.object({
  title: z.string().min(1, "Assessment title is required"),
  description: z.string().optional(),
  subjectId: z.string().min(1, "Subject is required"),
  totalPoints: z.number().min(1, "Total points must be greater than 0"),
  date: z.string().min(1, "Assessment date is required"),
});

type AssessmentFormData = z.infer<typeof assessmentSchema>;

interface AssessmentFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  onClose: () => void;
}

function AssessmentForm({ onSubmit, isLoading = false, onClose }: AssessmentFormProps) {
  const { toast } = useToast();

  interface SubjectOption {
    id: number;
    topicArea?: string | null;
    name?: string | null;
  }

  const form = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      title: "",
      description: "",
      totalPoints: 100,
      date: new Date().toISOString().split('T')[0],
    },
  });

  // Fetch subjects for selection
  const { data: subjects = [] } = useQuery<SubjectOption[]>({
    queryKey: ["/api/subjects"],
  });

  const handleSubmit = (data: AssessmentFormData) => {
    const assessmentData = {
      ...data,
      subjectId: parseInt(data.subjectId),
      date: new Date(data.date),
    };

    onSubmit(assessmentData);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assessment Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Atomic Structure Test" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief description of the assessment..."
                    className="resize-none"
                    rows={3}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="subjectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id.toString()}>
                          {subject.topicArea || subject.name || `Subject ${subject.id}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalPoints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Points</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assessment Date</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      type="date" 
                      className="pl-10"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Assessment"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export { AssessmentForm };
export default AssessmentForm;