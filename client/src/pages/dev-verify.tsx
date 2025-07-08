import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowRight } from "lucide-react";

export default function DevVerify() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const { toast } = useToast();

  const handleGetToken = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get the verification token from server logs for this email
      const response = await fetch(`/api/auth/dev-get-token?email=${encodeURIComponent(email)}`);
      if (response.ok) {
        const data = await response.json();
        setToken(data.token || "");
        toast({
          title: "Token retrieved",
          description: "Check the console logs for the verification token",
        });
      } else {
        toast({
          title: "No token found",
          description: "Make sure you've registered with this email first",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error getting token:", error);
    }
  };

  const handleVerify = async () => {
    if (!token) {
      toast({
        title: "Token required",
        description: "Please enter the verification token",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`/api/auth/verify-email?token=${token}`);
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Email verified!",
          description: data.message,
        });
        // Redirect to login after verification
        window.location.href = "/login";
      } else {
        toast({
          title: "Verification failed",
          description: data.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Development Email Verification</CardTitle>
          <CardDescription>
            For testing purposes, use this tool to verify emails without real email delivery
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter the email you registered with"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <Button onClick={handleGetToken} variant="outline" className="w-full">
              Get Verification Token from Server Logs
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Then verify</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Verification Token</Label>
              <Input
                id="token"
                type="text"
                placeholder="Paste the token from the server logs"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
            
            <Button onClick={handleVerify} className="w-full">
              <ArrowRight className="h-4 w-4 mr-2" />
              Verify Email
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>
              This is a development tool. In production, users would click the verification link in their email.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}