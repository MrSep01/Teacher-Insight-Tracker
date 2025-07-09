import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/layout/page-header";
import Footer from "@/components/layout/footer";
import { Users, Code, Palette, BarChart3, Heart, Globe } from "lucide-react";

export default function Careers() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PageHeader />

      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Join Our Team</CardTitle>
            <p className="text-center text-gray-600">
              Help us revolutionize education with AI-powered teaching tools
            </p>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-8">
              <p className="text-lg text-gray-700 mb-4">
                At EduTrack, we're building the future of education. Join our passionate team 
                of educators, developers, and innovators who are making a real difference in classrooms worldwide.
              </p>
              <div className="flex justify-center items-center space-x-2 text-blue-600">
                <Heart className="h-5 w-5" />
                <span className="font-medium">Remote-first • Impact-driven • Growth-focused</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <Code className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Software Engineer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Build scalable AI-powered educational tools using React, Node.js, and machine learning technologies.
              </p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• Full-stack development with TypeScript</li>
                <li>• AI/ML integration experience</li>
                <li>• 3+ years of web development</li>
                <li>• Passion for education technology</li>
              </ul>
              <Button className="w-full">Apply Now</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Palette className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>UI/UX Designer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Design intuitive interfaces that help teachers focus on what matters most - teaching.
              </p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• User-centered design experience</li>
                <li>• Proficiency in Figma/Sketch</li>
                <li>• Understanding of accessibility</li>
                <li>• Experience with education tools</li>
              </ul>
              <Button className="w-full">Apply Now</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Data Scientist</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Analyze educational data to improve learning outcomes and develop predictive models.
              </p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• Machine learning expertise</li>
                <li>• Python/R programming skills</li>
                <li>• Statistics and data analysis</li>
                <li>• Education domain knowledge</li>
              </ul>
              <Button className="w-full">Apply Now</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Education Specialist</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Work with teachers to understand their needs and shape product development.
              </p>
              <ul className="text-sm space-y-1 mb-4">
                <li>• Teaching or education background</li>
                <li>• IGCSE/A-Level curriculum knowledge</li>
                <li>• Strong communication skills</li>
                <li>• Product development experience</li>
              </ul>
              <Button className="w-full">Apply Now</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Why Work With Us?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Global Impact</h3>
                <p className="text-gray-600">Help teachers worldwide improve student outcomes</p>
              </div>
              <div>
                <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Meaningful Work</h3>
                <p className="text-gray-600">Build products that make a real difference in education</p>
              </div>
              <div>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Great Team</h3>
                <p className="text-gray-600">Work with passionate educators and technologists</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Don't see the perfect role? We're always looking for talented individuals who share our mission.
              </p>
              <Button>
                Send Us Your Resume
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}