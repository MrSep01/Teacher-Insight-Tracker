import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { Class } from "@/../../shared/schema";

const classFormSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  description: z.string().optional(),
  grade: z.enum(["10", "11", "12"], {
    required_error: "Please select a grade level",
  }),
  level: z.enum(["IGCSE", "A Level"], {
    required_error: "Please select an education level",
  }),
  curriculum: z.enum(["IGCSE Chemistry Edexcel", "A Level Chemistry Edexcel"], {
    required_error: "Please select a curriculum",
  }),
  academicYear: z.string().min(1, "Academic year is required"),
});

type ClassFormData = z.infer<typeof classFormSchema>;

interface ClassFormProps {
  initialData?: Class;
  onSubmit: (data: ClassFormData) => void;
  isLoading?: boolean;
}

export function ClassForm({ initialData, onSubmit, isLoading = false }: ClassFormProps) {
  const form = useForm<ClassFormData>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      grade: initialData?.grade as "10" | "11" | "12" || undefined,
      level: initialData?.level as "IGCSE" | "A Level" || undefined,
      curriculum: initialData?.curriculum as "IGCSE Chemistry Edexcel" | "A Level Chemistry Edexcel" || undefined,
      academicYear: initialData?.academicYear || new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
    },
  });

  const selectedLevel = form.watch("level");
  const selectedGrade = form.watch("grade");

  // Update curriculum and available grades when level changes
  const handleLevelChange = (level: "IGCSE" | "A Level") => {
    form.setValue("level", level);
    
    if (level === "IGCSE") {
      form.setValue("curriculum", "IGCSE Chemistry Edexcel");
      // Reset grade if it's not valid for IGCSE
      if (selectedGrade === "12") {
        form.setValue("grade", "10");
      }
    } else {
      form.setValue("curriculum", "A Level Chemistry Edexcel");
      form.setValue("grade", "12");
    }
  };

  const getAvailableGrades = () => {
    if (selectedLevel === "IGCSE") {
      return ["10", "11"];
    } else if (selectedLevel === "A Level") {
      return ["12"];
    }
    return [];
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Grade 10 Chemistry A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="academicYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Academic Year</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 2024-2025" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Education Level</FormLabel>
                <Select value={field.value} onValueChange={handleLevelChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="IGCSE">IGCSE</SelectItem>
                    <SelectItem value="A Level">A Level</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade Level</FormLabel>
                <Select 
                  value={field.value} 
                  onValueChange={field.onChange}
                  disabled={!selectedLevel}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getAvailableGrades().map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        Grade {grade}
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
            name="curriculum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Curriculum</FormLabel>
                <FormControl>
                  <Input 
                    value={field.value || ""} 
                    readOnly 
                    className="bg-gray-50"
                    placeholder="Auto-selected based on level"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Brief description of the class..."
                  className="resize-none"
                  rows={3}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-3">
          <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
            {isLoading ? "Saving..." : initialData ? "Update Class" : "Create Class"}
          </Button>
        </div>
      </form>
    </Form>
  );
}