import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Mail } from "lucide-react";
import { FaGoogle, FaMicrosoft, FaApple } from "react-icons/fa";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  const handleMicrosoftLogin = () => {
    window.location.href = "/api/auth/microsoft";
  };

  const handleAppleLogin = () => {
    window.location.href = "/api/auth/apple";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to EduTrack</CardTitle>
          <CardDescription>
            Sign in to your teacher dashboard to track student progress and get AI-powered recommendations
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full h-12 text-left justify-start gap-3"
          >
            <FaGoogle className="h-5 w-5 text-red-500" />
            Continue with Google
          </Button>

          <Button
            onClick={handleMicrosoftLogin}
            variant="outline"
            className="w-full h-12 text-left justify-start gap-3"
          >
            <FaMicrosoft className="h-5 w-5 text-blue-500" />
            Continue with Microsoft
          </Button>

          <Button
            onClick={handleAppleLogin}
            variant="outline"
            className="w-full h-12 text-left justify-start gap-3"
          >
            <FaApple className="h-5 w-5 text-gray-800" />
            Continue with Apple
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <Button
            variant="default"
            className="w-full h-12 gap-3"
            onClick={() => {
              // For demo purposes, we'll implement email auth later
              alert("Email authentication coming soon! Please use one of the social login options above.");
            }}
          >
            <Mail className="h-5 w-5" />
            Continue with Email
          </Button>

          <div className="text-center text-sm text-gray-600 mt-6">
            <p>
              By signing in, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}