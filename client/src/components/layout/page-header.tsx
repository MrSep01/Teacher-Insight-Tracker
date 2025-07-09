import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FlaskConical } from "lucide-react";

interface PageHeaderProps {
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
}

export default function PageHeader({ 
  showBackButton = true, 
  backButtonText = "Back to Home", 
  backButtonHref = "/" 
}: PageHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <FlaskConical className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">EduTrack</span>
            </div>
          </Link>
          {showBackButton && (
            <Link href={backButtonHref}>
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {backButtonText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}