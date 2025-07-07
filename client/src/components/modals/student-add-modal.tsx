import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StudentForm from "@/components/forms/student-form";

interface StudentAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentAddModal({ isOpen, onClose }: StudentAddModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Add New Student</DialogTitle>
        </DialogHeader>
        <StudentForm onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
}