import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GripVertical, MoreHorizontal, BookOpen, GraduationCap, ClipboardCheck, Edit, Trash2, Plus, Users, Clock, Target, AlertTriangle, Zap } from "lucide-react";
import { Module } from "@shared/schema";

interface ModuleWithContent extends Module {
  lessons: any[];
  assessments: any[];
  curriculum?: string | null;
}

interface SortableModuleCardProps {
  module: ModuleWithContent;
  onEdit: () => void;
  onDelete: () => void;
  onAddLesson: () => void;
  onAddAssessment: () => void;
}

export function SortableModuleCard({ module, onEdit, onDelete, onAddLesson, onAddAssessment }: SortableModuleCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: module.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const lessonCount = module.lessons?.length || 0;
  const assessmentCount = module.assessments?.length || 0;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`transition-all duration-200 ${
        isDragging ? "shadow-lg opacity-50" : "shadow-md hover:shadow-lg"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
            >
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">{module.title}</CardTitle>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {module.gradeLevels?.join(", ") || "No grade"}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {module.curriculum || "No curriculum"}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Module
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onAddLesson}>
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Manage Lessons
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onAddAssessment}>
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  Add Assessment
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Module
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {module.description || "No description provided"}
          </p>

          {/* Module Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">{lessonCount}</span>
              <span className="text-xs text-gray-500">Lessons</span>
            </div>
            <div className="flex items-center space-x-2">
              <ClipboardCheck className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">{assessmentCount}</span>
              <span className="text-xs text-gray-500">Assessments</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">{module.estimatedHours || 0}</span>
              <span className="text-xs text-gray-500">Hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">{module.objectives?.length || 0}</span>
              <span className="text-xs text-gray-500">Objectives</span>
            </div>
          </div>

          {/* Topics */}
          {module.topics && module.topics.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Topics</h4>
              <div className="flex flex-wrap gap-1">
                {module.topics.slice(0, 3).map((topic, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
                {module.topics.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{module.topics.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex items-center space-x-2 pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={onAddLesson}
              className="flex-1"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Lesson
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onAddAssessment}
              className="flex-1"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Assessment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}