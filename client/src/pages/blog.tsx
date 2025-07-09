import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/layout/page-header";
import Footer from "@/components/layout/footer";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "How AI is Transforming IGCSE Education",
      excerpt: "Discover how artificial intelligence is revolutionizing the way teachers approach IGCSE curriculum delivery and student assessment.",
      author: "Dr. Sarah Chen",
      date: "January 15, 2025",
      category: "AI in Education",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Supporting New Teachers: A Complete Guide",
      excerpt: "Essential strategies and tools to help new teachers navigate their first year in the classroom with confidence.",
      author: "Michael Rodriguez",
      date: "January 10, 2025",
      category: "Teacher Support",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Building Effective Assessment Strategies",
      excerpt: "Learn how to create meaningful assessments that truly measure student understanding and progress.",
      author: "Emily Johnson",
      date: "January 8, 2025",
      category: "Assessment",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "The Future of Personalized Learning",
      excerpt: "Exploring how technology enables truly personalized education experiences for every student.",
      author: "Dr. James Park",
      date: "January 5, 2025",
      category: "Innovation",
      readTime: "7 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PageHeader />

      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">EduTrack Blog</CardTitle>
            <p className="text-center text-gray-600">
              Insights, tips, and stories from the world of education technology
            </p>
          </CardHeader>
        </Card>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors">
                      <span className="text-sm font-medium">Read more</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Want to stay updated with our latest posts?
            </p>
            <div className="flex justify-center gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 border border-gray-300 rounded-lg flex-1 max-w-sm"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}