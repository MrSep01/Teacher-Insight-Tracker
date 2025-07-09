import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Brain, FileText } from "lucide-react";
import PageHeader from "@/components/layout/page-header";
import Footer from "@/components/layout/footer";

export default function Documentation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PageHeader />

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Documentation</CardTitle>
              <p className="text-center text-gray-600">
                Everything you need to know about using EduTrack effectively
              </p>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Learn how to set up your account and start using EduTrack's AI-powered features.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Creating your teacher profile</li>
                  <li>• Setting up your first class</li>
                  <li>• Understanding the dashboard</li>
                  <li>• Navigating the interface</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Student Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Comprehensive guide to managing students and tracking their progress.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Adding and organizing students</li>
                  <li>• Tracking performance metrics</li>
                  <li>• Creating student profiles</li>
                  <li>• Generating progress reports</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Brain className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>AI Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Discover how to leverage AI for personalized teaching and assessment.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• AI-generated lesson plans</li>
                  <li>• Automated assessment creation</li>
                  <li>• Personalized student feedback</li>
                  <li>• Progress-based recommendations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Curriculum Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Learn how to organize and deliver IGCSE curriculum content effectively.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Creating modules and lessons</li>
                  <li>• Aligning with IGCSE standards</li>
                  <li>• Tracking learning objectives</li>
                  <li>• Sharing resources with community</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex gap-4">
                <Link href="/#contact">
                  <Button>Contact Support</Button>
                </Link>
                <Button variant="outline">
                  Join Community Forum
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}