import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/layout/page-header";
import Footer from "@/components/layout/footer";

export default function GDPR() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PageHeader />

      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">GDPR Compliance</CardTitle>
            <p className="text-center text-gray-600">General Data Protection Regulation</p>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <h2>Your Rights Under GDPR</h2>
            <p>
              EduTrack is committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR). 
              As a data subject, you have the following rights:
            </p>

            <h3>Right of Access</h3>
            <p>You have the right to request access to your personal data and information about how we process it.</p>

            <h3>Right to Rectification</h3>
            <p>You can request that we correct any inaccurate or incomplete personal data.</p>

            <h3>Right to Erasure (Right to be Forgotten)</h3>
            <p>You can request that we delete your personal data under certain circumstances.</p>

            <h3>Right to Restrict Processing</h3>
            <p>You can request that we limit the processing of your personal data in specific situations.</p>

            <h3>Right to Data Portability</h3>
            <p>You can request that we transfer your personal data to another organization or provide it in a structured format.</p>

            <h3>Right to Object</h3>
            <p>You can object to the processing of your personal data for direct marketing or other purposes.</p>

            <h2>Data Protection Officer</h2>
            <p>
              For any GDPR-related inquiries or to exercise your rights, please contact our Data Protection Officer at{" "}
              <a href="mailto:dpo@edutrack.com" className="text-blue-600 hover:underline">
                dpo@edutrack.com
              </a>
            </p>

            <h2>Lawful Basis for Processing</h2>
            <p>We process your personal data based on:</p>
            <ul>
              <li>Your consent for marketing communications</li>
              <li>Contract performance for service delivery</li>
              <li>Legitimate interests for analytics and improvement</li>
              <li>Legal obligations for compliance requirements</li>
            </ul>

            <h2>Data Retention</h2>
            <p>
              We retain personal data only for as long as necessary to fulfill the purposes for which it was collected 
              or as required by applicable laws and regulations.
            </p>

            <h2>Contact Information</h2>
            <p>
              For GDPR compliance questions or to exercise your rights, contact us at{" "}
              <a href="mailto:gdpr@edutrack.com" className="text-blue-600 hover:underline">
                gdpr@edutrack.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}