import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Wand2, 
  Brain, 
  Users, 
  Video, 
  Image, 
  FileText, 
  CheckCircle, 
  Clock, 
  Target, 
  Book,
  Lightbulb,
  GraduationCap,
  Settings,
  Zap,
  Star,
  TrendingUp
} from "lucide-react";
import PageHeader from "@/components/layout/page-header";
import Footer from "@/components/layout/footer";

export default function LessonGenerationGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Lesson Generation Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how to create comprehensive, personalized lessons using our advanced AI system
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="differentiation">Differentiation</TabsTrigger>
            <TabsTrigger value="multimedia">Multimedia</TabsTrigger>
            <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-6 h-6" />
                  What is AI Lesson Generation?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Our AI Lesson Generation system creates comprehensive, ready-to-teach lessons that include:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Book className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Complete Lesson Content</h4>
                      <p className="text-sm text-gray-600">Full lesson structure with introduction, development, practice, assessment, and closure</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Teacher Guide</h4>
                      <p className="text-sm text-gray-600">Detailed instructions, timing guides, and troubleshooting tips</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Video className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Multimedia Content</h4>
                      <p className="text-sm text-gray-600">Suggestions for videos, images, and interactive materials</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Differentiated Activities</h4>
                      <p className="text-sm text-gray-600">Activities tailored to different ability levels and learning styles</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Assessment Rubrics</h4>
                      <p className="text-sm text-gray-600">Detailed criteria for evaluating student performance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-indigo-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Curriculum Alignment</h4>
                      <p className="text-sm text-gray-600">Perfectly aligned with IGCSE and A Level Edexcel specifications</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Save Time</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600">
                    Generate complete lessons in minutes instead of hours of preparation
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <Star className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Improve Quality</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600">
                    AI ensures consistency and best practices across all your lessons
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Personalize Learning</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600">
                    Automatically adapt lessons based on student performance data
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="w-5 h-5" />
                    Generation Modes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">Comprehensive</Badge>
                      <div>
                        <h4 className="font-semibold">Full Lesson Package</h4>
                        <p className="text-sm text-gray-600">Complete lesson with multimedia, differentiation, teacher guide, and assessment rubrics</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">Focused</Badge>
                      <div>
                        <h4 className="font-semibold">Essential Content</h4>
                        <p className="text-sm text-gray-600">Detailed lesson content with essential multimedia and basic differentiation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">Differentiated</Badge>
                      <div>
                        <h4 className="font-semibold">Student-Specific</h4>
                        <p className="text-sm text-gray-600">Specialized lesson tailored to specific student performance data</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Teaching Style Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold">Direct Instruction</h4>
                        <p className="text-sm text-gray-600">Teacher-centered with clear explanations and guided practice</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Inquiry-Based</h4>
                        <p className="text-sm text-gray-600">Student-led discovery with questions and investigations</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold">Collaborative</h4>
                        <p className="text-sm text-gray-600">Group work and peer learning activities</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Mixed Approach</h4>
                        <p className="text-sm text-gray-600">Combination of different teaching methods</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Lesson Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <div>
                        <h4 className="font-semibold">Introduction (10-15 min)</h4>
                        <p className="text-sm text-gray-600">Hook activity, learning goals, and success criteria</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <div>
                        <h4 className="font-semibold">Development (20-30 min)</h4>
                        <p className="text-sm text-gray-600">Main content, key explanations, and demonstrations</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <div>
                        <h4 className="font-semibold">Practice (15-25 min)</h4>
                        <p className="text-sm text-gray-600">Guided and independent practice activities</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      <div>
                        <h4 className="font-semibold">Assessment (5-10 min)</h4>
                        <p className="text-sm text-gray-600">Formative and summative assessment activities</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      <div>
                        <h4 className="font-semibold">Closure (5-10 min)</h4>
                        <p className="text-sm text-gray-600">Summary, homework, and next lesson preview</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Getting Started Tab */}
          <TabsContent value="getting-started" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Step-by-Step Guide</CardTitle>
                <CardDescription>Follow these steps to generate your first AI lesson</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                      <h4 className="font-semibold">Create a Module</h4>
                      <p className="text-sm text-gray-600 mb-2">Start by creating a module with your curriculum topics and learning objectives</p>
                      <Badge variant="outline" className="text-xs">Navigate to Modules → Create New Module</Badge>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                      <h4 className="font-semibold">Choose Generation Mode</h4>
                      <p className="text-sm text-gray-600 mb-2">Select from Comprehensive, Focused, or Differentiated lesson generation</p>
                      <Badge variant="outline" className="text-xs">Comprehensive recommended for first-time users</Badge>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <div>
                      <h4 className="font-semibold">Fill Basic Details</h4>
                      <p className="text-sm text-gray-600 mb-2">Enter lesson topic, duration, type, and difficulty level</p>
                      <Badge variant="outline" className="text-xs">Be specific with your topic for better results</Badge>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                    <div>
                      <h4 className="font-semibold">Set AI Preferences</h4>
                      <p className="text-sm text-gray-600 mb-2">Choose teaching style and enable features like multimedia and differentiation</p>
                      <Badge variant="outline" className="text-xs">Enable all features for comprehensive lessons</Badge>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">5</div>
                    <div>
                      <h4 className="font-semibold">Select Students (Optional)</h4>
                      <p className="text-sm text-gray-600 mb-2">Choose specific students for personalized differentiation</p>
                      <Badge variant="outline" className="text-xs">Skip this step for general lessons</Badge>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">6</div>
                    <div>
                      <h4 className="font-semibold">Generate & Review</h4>
                      <p className="text-sm text-gray-600 mb-2">Review your settings and generate the lesson</p>
                      <Badge variant="outline" className="text-xs">Generation takes 30-60 seconds</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertDescription>
                <strong>Pro Tip:</strong> Start with shorter lessons (30-45 minutes) to get familiar with the system before creating longer lessons.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Differentiation Tab */}
          <TabsContent value="differentiation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Automatic Differentiation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Our AI automatically creates activities for three different ability levels based on student performance data:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-yellow-100 text-yellow-800 mt-1">Support Level</Badge>
                    <div>
                      <h4 className="font-semibold">Below Grade Level</h4>
                      <p className="text-sm text-gray-600">Simplified activities with additional support, scaffolding, and foundational skill building</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-blue-100 text-blue-800 mt-1">Core Level</Badge>
                    <div>
                      <h4 className="font-semibold">On Grade Level</h4>
                      <p className="text-sm text-gray-600">Standard activities that meet curriculum expectations and learning objectives</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-green-100 text-green-800 mt-1">Extension Level</Badge>
                    <div>
                      <h4 className="font-semibold">Above Grade Level</h4>
                      <p className="text-sm text-gray-600">Advanced activities with extension opportunities and higher-order thinking challenges</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Style Adaptations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Visual Learners</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Diagrams and infographics</li>
                      <li>• Color-coded materials</li>
                      <li>• Visual organizers</li>
                      <li>• Interactive simulations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Auditory Learners</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Discussion activities</li>
                      <li>• Audio recordings</li>
                      <li>• Verbal explanations</li>
                      <li>• Peer teaching</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Kinesthetic Learners</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Hands-on experiments</li>
                      <li>• Physical models</li>
                      <li>• Movement activities</li>
                      <li>• Real-world applications</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Mixed Approach</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Multiple activity types</li>
                      <li>• Flexible grouping</li>
                      <li>• Choice boards</li>
                      <li>• Varied assessments</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Multimedia Tab */}
          <TabsContent value="multimedia" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Multimedia Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  The AI suggests specific multimedia content to enhance your lessons:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Video className="w-5 h-5 text-red-500" />
                      <div>
                        <h4 className="font-semibold">Educational Videos</h4>
                        <p className="text-sm text-gray-600">YouTube links, educational platforms, documentaries</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image className="w-5 h-5 text-blue-500" />
                      <div>
                        <h4 className="font-semibold">Images & Diagrams</h4>
                        <p className="text-sm text-gray-600">Scientific diagrams, molecular structures, real-world photos</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-green-500" />
                      <div>
                        <h4 className="font-semibold">Interactive Simulations</h4>
                        <p className="text-sm text-gray-600">PhET simulations, virtual labs, interactive models</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">What's Included:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Specific source recommendations</li>
                      <li>• Search keywords for finding content</li>
                      <li>• Placement suggestions in lesson</li>
                      <li>• Alternative text descriptions</li>
                      <li>• Purpose and learning objectives</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                <strong>Note:</strong> The AI provides suggestions and sources for multimedia content. You'll need to source and embed the actual files in your lesson materials.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Best Practices Tab */}
          <TabsContent value="best-practices" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Best Practices for AI Lesson Generation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">📝 Writing Effective Topics</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-green-600">✅ Good Examples:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• "Ionic bonding and crystal lattices"</li>
                            <li>• "Rates of reaction and collision theory"</li>
                            <li>• "Organic synthesis pathways"</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-red-600">❌ Avoid:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• "Chemistry"</li>
                            <li>• "Lesson 1"</li>
                            <li>• "Test prep"</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">🎯 Optimizing Results</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Use curriculum-specific language and terminology</li>
                        <li>• Include grade level and difficulty in your topic</li>
                        <li>• Be specific about practical vs. theoretical focus</li>
                        <li>• Consider prerequisites students should have</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">⚡ Maximizing Efficiency</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Generate multiple lessons at once for a topic sequence</li>
                        <li>• Use student performance data for better differentiation</li>
                        <li>• Review and customize generated content for your teaching style</li>
                        <li>• Save successful prompts and preferences for future use</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Troubleshooting Common Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-orange-600">Lesson too generic?</h4>
                      <p className="text-sm text-gray-600">Try being more specific with your topic and include student performance data for better personalization.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-600">Missing practical activities?</h4>
                      <p className="text-sm text-gray-600">Select "practical" as your lesson type and ensure you have safety considerations enabled.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-600">Not enough differentiation?</h4>
                      <p className="text-sm text-gray-600">Enable differentiation in AI preferences and add student performance data for more targeted activities.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-600">Generation taking too long?</h4>
                      <p className="text-sm text-gray-600">Comprehensive lessons can take 30-60 seconds. Try "Focused" mode for faster generation.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Remember:</strong> AI-generated lessons are a starting point. Always review and customize the content to match your teaching style and classroom needs.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
}