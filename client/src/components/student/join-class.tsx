import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link, useLocation } from "wouter";
import { BookOpen, Users, ArrowRight } from "lucide-react";

interface JoinClassRequest {
  classCode: string;
}

interface JoinClassResponse {
  success: boolean;
  message: string;
  classId: number;
  className: string;
}

export default function JoinClass() {
  const [classCode, setClassCode] = useState("");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const joinClassMutation = useMutation({
    mutationFn: async (data: JoinClassRequest) => {
      return await apiRequest<JoinClassResponse>("/api/student/join-class", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Successfully joined class!",
        description: `You have joined ${data.className}`,
      });
      // Invalidate dashboard data to refresh the classes list
      queryClient.invalidateQueries({ queryKey: ["/api/student/dashboard"] });
      // Navigate to the new class
      navigate(`/student/class/${data.classId}`);
    },
    onError: (error) => {
      toast({
        title: "Failed to join class",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classCode.trim()) {
      toast({
        title: "Class code required",
        description: "Please enter a class code to join",
        variant: "destructive",
      });
      return;
    }
    joinClassMutation.mutate({ classCode: classCode.trim().toUpperCase() });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <BookOpen className="w-12 h-12 text-blue-500" />
              <Users className="w-6 h-6 text-green-500 absolute -bottom-1 -right-1" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Join a Class</h1>
          <p className="text-muted-foreground">
            Enter the class code provided by your teacher to join their class
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Class Code</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="classCode">Enter Class Code</Label>
                <Input
                  id="classCode"
                  type="text"
                  placeholder="e.g., CHEM101A"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                  className="text-center text-lg font-mono"
                  maxLength={10}
                />
                <p className="text-sm text-muted-foreground">
                  Class codes are usually 6-8 characters long
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={joinClassMutation.isPending || !classCode.trim()}
              >
                {joinClassMutation.isPending ? (
                  "Joining..."
                ) : (
                  <>
                    Join Class
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Don't have a class code?
          </p>
          <div className="space-y-2">
            <p className="text-sm">
              Ask your teacher for the class code, or
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/student/dashboard">
                Return to Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium">Where to find your class code:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Your teacher will provide it during class</li>
                <li>• Check your school's learning management system</li>
                <li>• Look for emails from your teacher</li>
                <li>• Ask your classmates who have already joined</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Having trouble joining?</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Make sure the class code is correct</li>
                <li>• Check that the class is still accepting students</li>
                <li>• Contact your teacher if the code doesn't work</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}