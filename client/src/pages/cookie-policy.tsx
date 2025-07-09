import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/layout/page-header";
import Footer from "@/components/layout/footer";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PageHeader />

      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Cookie Policy</CardTitle>
            <p className="text-center text-gray-600">Last updated: January 2025</p>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <h2>What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and improving our services.
            </p>

            <h2>How We Use Cookies</h2>
            <p>EduTrack uses cookies for the following purposes:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Security Cookies:</strong> Protect against fraud and maintain security</li>
            </ul>

            <h2>Types of Cookies We Use</h2>
            <h3>Session Cookies</h3>
            <p>These temporary cookies are deleted when you close your browser and help maintain your session state.</p>
            
            <h3>Persistent Cookies</h3>
            <p>These cookies remain on your device until they expire or you delete them, helping us remember your preferences.</p>

            <h2>Managing Cookies</h2>
            <p>
              You can control and manage cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul>
              <li>View cookies stored on your device</li>
              <li>Block all cookies or cookies from specific sites</li>
              <li>Delete cookies when you close your browser</li>
              <li>Delete all cookies currently stored</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              If you have questions about our Cookie Policy, please contact us at{" "}
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