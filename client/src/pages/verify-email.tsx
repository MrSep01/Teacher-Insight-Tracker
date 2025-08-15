import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, FlaskConical, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VerifyEmail() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const error = urlParams.get('error');

    if (success) {
      setStatus('success');
      setMessage(decodeURIComponent(success));
      toast({
        title: "Email verified!",
        description: "You can now sign in to your account.",
      });
    } else if (error) {
      setStatus('error');
      setMessage(decodeURIComponent(error));
    } else {
      // Fallback if no parameters are provided
      setStatus('error');
      setMessage('No verification information provided');
    }
  }, [toast]);

  const handleContinue = () => {
    setLocation('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header matching landing page style */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <FlaskConical className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">EduTrack</span>
              </div>
            </Link>
            <div className="flex space-x-2">
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/login">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-lg border-0 shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6">
              {status === 'loading' && (
                <div className="bg-blue-100 w-full h-full rounded-full flex items-center justify-center">
                  <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
                </div>
              )}
              {status === 'success' && (
                <div className="bg-green-100 w-full h-full rounded-full flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-100 w-full h-full rounded-full flex items-center justify-center">
                  <XCircle className="h-10 w-10 text-red-600" />
                </div>
              )}
            </div>
            
            <CardTitle className="text-3xl font-bold mb-2">
              {status === 'loading' && 'Verifying Email...'}
              {status === 'success' && 'Welcome to EduTrack!'}
              {status === 'error' && 'Verification Issue'}
            </CardTitle>
            
            <CardDescription className="text-lg">
              {status === 'success' && 'Your email has been successfully verified. You can now access your EduTrack dashboard and start transforming your teaching with AI-powered tools.'}
              {status === 'error' && message}
              {status === 'loading' && 'Please wait while we verify your email address...'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center pb-8">
            {status === 'success' && (
              <div className="space-y-4">
                <Button onClick={handleContinue} size="lg" className="w-full">
                  Continue to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">
                    Ready to get started? Create your first assessment or explore AI-powered lesson plans!
                  </p>
                </div>
              </div>
            )}
            
            {status === 'error' && (
              <div className="space-y-4">
                <Button onClick={handleContinue} variant="outline" size="lg" className="w-full">
                  Back to Sign In
                </Button>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Need help with email verification? Contact our support team at <a href="mailto:support@edutrack.com" className="text-blue-600 hover:underline">support@edutrack.com</a>
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Simple footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center text-sm text-gray-600">
            <span>© 2024 EduTrack. Empowering educators with AI-powered teaching tools.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}