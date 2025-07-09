import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/layout/page-header";
import Footer from "@/components/layout/footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PageHeader />

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
            <p className="text-center text-gray-600">Last updated: January 2025</p>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <h2>Information We Collect</h2>
            <p>
              At EduTrack, we collect information that you provide directly to us, such as when you create an account, 
              use our services, or contact us for support. This may include your name, email address, and educational information.
            </p>

            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, including:
            </p>
            <ul>
              <li>Personalizing your learning experience</li>
              <li>Providing customer support</li>
              <li>Sending service-related communications</li>
              <li>Analyzing usage patterns to improve our platform</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>Data Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
              except as described in this privacy policy or as required by law.
            </p>

            <h2>Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information. You can do this through 
              your account settings or by contacting us directly.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@edutrack.com" className="text-blue-600 hover:underline">
                privacy@edutrack.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}