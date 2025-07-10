import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Plus, Users, BookOpen, Clock, Edit, Trash2, Archive, MoreVertical, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CourseModuleManager } from "@/components/forms/course-module-manager";
import type { Course, InsertCourse } from "@shared/schema";

export default function Courses() {
  const [open, setOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [moduleManagerOpen, setModuleManagerOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const { data: courses = [], isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const createCourseMutation = useMutation({
    mutationFn: (data: InsertCourse) => apiRequest("/api/courses", { method: "POST", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      setOpen(false);
      setEditingCourse(null);
      toast({ title: "Course created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create course", variant: "destructive" });
    },
  });

  const updateCourseMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertCourse> }) =>
      apiRequest(`/api/courses/${id}`, { method: "PATCH", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      setOpen(false);
      setEditingCourse(null);
      toast({ title: "Course updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update course", variant: "destructive" });
    },
  });

  const deleteCourseMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/courses/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      toast({ title: "Course deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete course", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const courseData: InsertCourse = {
      name: formData.get("name") as string,
      grade: formData.get("grade") as string,
      level: formData.get("level") as string,
      curriculum: formData.get("curriculum") as string,
      description: formData.get("description") as string || null,
      academicYear: formData.get("academicYear") as string,
      teacherId: null, // Will be set by the server
      isActive: true,
    };

    if (editingCourse) {
      updateCourseMutation.mutate({ id: editingCourse.id, data: courseData });
    } else {
      createCourseMutation.mutate(courseData);
    }
  };

  const openCreateDialog = () => {
    setEditingCourse(null);
    setOpen(true);
  };

  const openEditDialog = (course: Course) => {
    setEditingCourse(course);
    setOpen(true);
  };

  const handleDelete = (courseId: number) => {
    if (confirm("Are you sure you want to delete this course? This will also remove all associated students and data.")) {
      deleteCourseMutation.mutate(courseId);
    }
  };

  const openModuleManager = (course: Course) => {
    setSelectedCourse(course);
    setModuleManagerOpen(true);
  };

  const navigateToCourse = (courseId: number) => {
    setLocation(`/courses/${courseId}`);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600 mt-1">Manage your chemistry courses and organize modules</p>
        </div>
        <Button onClick={openCreateDialog} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Course
        </Button>
      </div>

      {courses.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses yet</h3>
            <p className="text-gray-600 mb-4">Create your first course to start organizing your chemistry curriculum</p>
            <Button onClick={openCreateDialog}>Create Your First Course</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigateToCourse(course.id)}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{course.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {course.grade} • {course.level}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(course)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Course
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="mr-2 h-4 w-4" />
                        {course.isActive ? "Archive Course" : "Activate Course"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDelete(course.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Course
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {course.curriculum}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {course.academicYear}
                  </Badge>
                  {!course.isActive && (
                    <Badge variant="destructive" className="text-xs">
                      Archived
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {course.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                )}
                
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="flex flex-col items-center">
                    <Users className="h-4 w-4 text-blue-500 mb-1" />
                    <span className="text-sm font-medium">0</span>
                    <span className="text-xs text-gray-500">Students</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <BookOpen className="h-4 w-4 text-green-500 mb-1" />
                    <span className="text-sm font-medium">0</span>
                    <span className="text-xs text-gray-500">Modules</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Clock className="h-4 w-4 text-purple-500 mb-1" />
                    <span className="text-sm font-medium">0h</span>
                    <span className="text-xs text-gray-500">Total</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <div className="w-full flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1" 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToCourse(course.id);
                    }}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1" 
                    onClick={(e) => {
                      e.stopPropagation();
                      openModuleManager(course);
                    }}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Modules
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Course Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingCourse ? "Edit Course" : "Create New Course"}
            </DialogTitle>
            <DialogDescription>
              {editingCourse 
                ? "Update course information and settings."
                : "Create a new course to organize your chemistry curriculum and students."
              }
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Course Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingCourse?.name || ""}
                  placeholder="e.g., Grade 10 Chemistry A"
                  required
                />
              </div>
              <div>
                <Label htmlFor="academicYear">Academic Year</Label>
                <Input
                  id="academicYear"
                  name="academicYear"
                  defaultValue={editingCourse?.academicYear || "2025-2026"}
                  placeholder="e.g., 2025-2026"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="grade">Grade Level</Label>
                <Select name="grade" defaultValue={editingCourse?.grade || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                    <SelectItem value="12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="level">Education Level</Label>
                <Select name="level" defaultValue={editingCourse?.level || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IGCSE">IGCSE</SelectItem>
                    <SelectItem value="A Level">A Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="curriculum">Curriculum</Label>
              <Select name="curriculum" defaultValue={editingCourse?.curriculum || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select curriculum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IGCSE Chemistry Edexcel">IGCSE Chemistry Edexcel</SelectItem>
                  <SelectItem value="A Level Chemistry Edexcel">A Level Chemistry Edexcel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingCourse?.description || ""}
                placeholder="Brief description of the course objectives and content..."
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createCourseMutation.isPending || updateCourseMutation.isPending}
              >
                {editingCourse ? "Update Course" : "Create Course"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Course Module Manager */}
      {selectedCourse && (
        <CourseModuleManager
          course={selectedCourse}
          open={moduleManagerOpen}
          onOpenChange={setModuleManagerOpen}
        />
      )}
    </div>
  );
}