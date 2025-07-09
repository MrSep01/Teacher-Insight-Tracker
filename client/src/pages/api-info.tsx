import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/layout/page-header";
import Footer from "@/components/layout/footer";
import { Code, Shield, Zap, Globe } from "lucide-react";

export default function APIInfo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PageHeader />

      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">EduTrack API</CardTitle>
            <p className="text-center text-gray-600">
              Powerful APIs to integrate EduTrack's AI-powered education tools into your applications
            </p>
          </CardHeader>
        </Card>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <Code className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Assessment API</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Generate AI-powered assessments tailored to your curriculum and student needs.
                </p>
                <ul className="text-sm space-y-1 mb-4">
                  <li>• Create custom assessments</li>
                  <li>• Auto-generate questions</li>
                  <li>• Grade submissions automatically</li>
                  <li>• Export results in multiple formats</li>
                </ul>
                <Badge variant="outline">REST API</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Student Analytics API</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Access detailed student performance data and learning analytics.
                </p>
                <ul className="text-sm space-y-1 mb-4">
                  <li>• Performance tracking</li>
                  <li>• Progress analytics</li>
                  <li>• Recommendation engine</li>
                  <li>• Predictive insights</li>
                </ul>
                <Badge variant="outline">GraphQL</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>AI Recommendations API</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get personalized teaching recommendations powered by machine learning.
                </p>
                <ul className="text-sm space-y-1 mb-4">
                  <li>• Lesson plan suggestions</li>
                  <li>• Learning path optimization</li>
                  <li>• Intervention recommendations</li>
                  <li>• Content personalization</li>
                </ul>
                <Badge variant="outline">ML API</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Curriculum API</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Access comprehensive IGCSE and A-Level curriculum data and standards.
                </p>
                <ul className="text-sm space-y-1 mb-4">
                  <li>• Curriculum mapping</li>
                  <li>• Learning objectives</li>
                  <li>• Assessment criteria</li>
                  <li>• Standards alignment</li>
                </ul>
                <Badge variant="outline">Data API</Badge>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>API Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Secure & Reliable</h3>
                  <p className="text-gray-600">Enterprise-grade security with 99.9% uptime guarantee</p>
                </div>
                <div className="text-center">
                  <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Fast & Scalable</h3>
                  <p className="text-gray-600">Lightning-fast responses with auto-scaling infrastructure</p>
                </div>
                <div className="text-center">
                  <Code className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Developer Friendly</h3>
                  <p className="text-gray-600">Comprehensive docs, SDKs, and dedicated support</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <code className="text-sm">
                  curl -X POST https://api.edutrack.com/v1/assessments \<br />
                  &nbsp;&nbsp;-H &quot;Authorization: Bearer YOUR_API_KEY&quot; \<br />
                  &nbsp;&nbsp;-H &quot;Content-Type: application/json&quot; \<br />
                  &nbsp;&nbsp;-d &apos;&#123;&quot;curriculum&quot;: &quot;IGCSE Chemistry&quot;, &quot;difficulty&quot;: &quot;intermediate&quot;&#125;&apos;
                </code>
              </div>
              
              <div className="flex gap-4">
                <Button>
                  Get API Key
                </Button>
                <Button variant="outline">
                  View Documentation
                </Button>
              </div>
              
              <p className="text-sm text-gray-600 mt-4">
                Free tier includes 1,000 API calls per month. No credit card required.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}