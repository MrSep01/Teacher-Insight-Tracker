import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AssessmentForm from "@/components/forms/assessment-form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssessmentModal({ isOpen, onClose }: AssessmentModalProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createAssessmentMutation = useMutation({
    mutationFn: (data: any) =>
      apiRequest("/api/assessments", {
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/assessments"] });
      toast({ title: "Assessment created successfully" });
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create assessment",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Add New Assessment</DialogTitle>
        </DialogHeader>
        <AssessmentForm
          onSubmit={(data) => createAssessmentMutation.mutate(data)}
          onClose={onClose}
          isLoading={createAssessmentMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
