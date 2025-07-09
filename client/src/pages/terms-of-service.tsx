import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FlaskConical } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <FlaskConical className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">EduTrack</span>
              </div>
            </Link>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Terms of Service</CardTitle>
            <p className="text-center text-gray-600">Last updated: January 2025</p>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using EduTrack, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2>Use License</h2>
            <p>
              Permission is granted to temporarily use EduTrack for personal, educational, and commercial use. 
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on EduTrack</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>

            <h2>User Accounts</h2>
            <p>
              To access certain features of our service, you may be required to create an account. You are responsible for:
            </p>
            <ul>
              <li>Maintaining the confidentiality of your account information</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
            </ul>

            <h2>Acceptable Use</h2>
            <p>
              You agree not to use EduTrack for any unlawful purpose or in any way that could damage, disable, 
              overburden, or impair the service.
            </p>

            <h2>Termination</h2>
            <p>
              We may terminate your access to EduTrack at any time, without cause or notice, which may result in 
              the forfeiture and destruction of all information associated with your account.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              In no event shall EduTrack or its suppliers be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
              to use EduTrack.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:legal@edutrack.com" className="text-blue-600 hover:underline">
                legal@edutrack.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}