import { Link } from "wouter";
import { FlaskConical, Heart, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" onClick={scrollToTop}>
              <div className="flex items-center space-x-2 mb-4 cursor-pointer">
                <FlaskConical className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">EduTrack</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-4">
              Empowering new teachers with AI-powered tools for personalized IGCSE education and collaborative learning.
            </p>
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm text-gray-400">Made with love for new teachers</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/#features" className="text-gray-400 hover:text-white">Features</Link></li>
              <li><Link href="/#pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link href="/documentation" className="text-gray-400 hover:text-white" onClick={scrollToTop}>Documentation</Link></li>
              <li><Link href="/api-info" className="text-gray-400 hover:text-white" onClick={scrollToTop}>API</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/#about" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white" onClick={scrollToTop}>Careers</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white" onClick={scrollToTop}>Blog</Link></li>
              <li><Link href="/#contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white" onClick={scrollToTop}>Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-gray-400 hover:text-white" onClick={scrollToTop}>Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="text-gray-400 hover:text-white" onClick={scrollToTop}>Cookie Policy</Link></li>
              <li><Link href="/gdpr" className="text-gray-400 hover:text-white" onClick={scrollToTop}>GDPR</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 EduTrack. All rights reserved. | Focus on Teaching, Let AI Handle the Rest.
          </p>
        </div>
      </div>
    </footer>
  );
}