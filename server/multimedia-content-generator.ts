import type OpenAI from "openai";
import { getOpenAIClient, MissingOpenAIKeyError } from "./openai-client";

export interface MultimediaContent {
  type: "image" | "video" | "diagram" | "simulation" | "interactive";
  title: string;
  description: string;
  suggestedSource: string;
  purpose: string;
  placementInLesson: string;
  alternativeText: string;
  searchKeywords: string[];
  aiPrompt?: string;
  estimatedDuration?: number;
}

export interface MultimediaRequest {
  lessonTopic: string;
  lessonObjectives: string[];
  targetAudience: string;
  lessonSection: "introduction" | "development" | "practice" | "assessment" | "closure";
  curriculum: string;
  gradeLevel: string;
}

export class MultimediaContentGenerator {
  private openai: OpenAI | null;

  constructor() {
    this.openai = getOpenAIClient();
  }

  private requireClient(): OpenAI {
    if (!this.openai) {
      this.openai = getOpenAIClient();
    }

    if (!this.openai) {
      throw new MissingOpenAIKeyError();
    }

    return this.openai;
  }

  async generateMultimediaContent(request: MultimediaRequest): Promise<MultimediaContent[]> {
    try {
      const prompt = this.createMultimediaPrompt(request);
      
      const client = this.requireClient();
      const response = await client.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are an expert educational technology specialist who creates multimedia content recommendations for chemistry lessons. Generate practical, engaging multimedia content suggestions that enhance student learning."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 2000
      });

      const aiResponse = JSON.parse(response.choices[0].message.content || "{}");
      return this.processMultimediaResponse(aiResponse, request);
    } catch (error) {
      console.error("Error generating multimedia content:", error);
      if (error instanceof MissingOpenAIKeyError) {
        throw error;
      }
      return this.getFallbackMultimediaContent(request);
    }
  }

  private createMultimediaPrompt(request: MultimediaRequest): string {
    return `
Generate multimedia content suggestions for a chemistry lesson with the following details:

Topic: ${request.lessonTopic}
Objectives: ${request.lessonObjectives.join(", ")}
Target Audience: ${request.targetAudience}
Lesson Section: ${request.lessonSection}
Curriculum: ${request.curriculum}
Grade Level: ${request.gradeLevel}

Create 3-5 multimedia content suggestions that will enhance student understanding and engagement. For each suggestion, provide:

1. Type (image, video, diagram, simulation, interactive)
2. Title
3. Description (what the content shows/demonstrates)
4. Suggested source (e.g., "Khan Academy", "PhET Simulations", "YouTube educational channel", "AI-generated image", etc.)
5. Purpose (how it supports learning objectives)
6. Placement in lesson (when to use it in the lesson flow)
7. Alternative text (for accessibility)
8. Search keywords (for finding the content)
9. AI prompt (if content should be AI-generated)
10. Estimated duration (if applicable)

Focus on:
- Visual representations of chemical concepts
- Interactive simulations for hands-on learning
- Real-world applications and examples
- Step-by-step demonstrations
- Assessment-friendly visuals

Respond in JSON format with a "multimediaContent" array.
`;
  }

  private processMultimediaResponse(aiResponse: any, request: MultimediaRequest): MultimediaContent[] {
    if (!aiResponse.multimediaContent || !Array.isArray(aiResponse.multimediaContent)) {
      return this.getFallbackMultimediaContent(request);
    }

    return aiResponse.multimediaContent.map((content: any) => ({
      type: content.type || "image",
      title: content.title || "Educational Content",
      description: content.description || "Supporting visual content",
      suggestedSource: content.suggestedSource || "Educational resources",
      purpose: content.purpose || "Support learning objectives",
      placementInLesson: content.placementInLesson || "During main content",
      alternativeText: content.alternativeText || content.description || "Educational visual",
      searchKeywords: Array.isArray(content.searchKeywords) ? content.searchKeywords : [request.lessonTopic],
      aiPrompt: content.aiPrompt,
      estimatedDuration: content.estimatedDuration || 2
    }));
  }

  private getFallbackMultimediaContent(request: MultimediaRequest): MultimediaContent[] {
    const topicKeywords = request.lessonTopic.toLowerCase().split(" ");
    
    return [
      {
        type: "diagram",
        title: `${request.lessonTopic} Concept Diagram`,
        description: `Visual diagram showing key concepts and relationships in ${request.lessonTopic}`,
        suggestedSource: "AI-generated or educational resource",
        purpose: "Provide visual representation of key concepts",
        placementInLesson: "During introduction and main content",
        alternativeText: `Diagram illustrating ${request.lessonTopic} concepts`,
        searchKeywords: [...topicKeywords, "diagram", "chemistry"],
        aiPrompt: `Create a clear, educational diagram showing ${request.lessonTopic} with labeled parts and clear visual explanations suitable for ${request.gradeLevel} students`,
        estimatedDuration: 3
      },
      {
        type: "video",
        title: `${request.lessonTopic} Demonstration`,
        description: `Video demonstration of ${request.lessonTopic} concepts in action`,
        suggestedSource: "YouTube educational channels or Khan Academy",
        purpose: "Show real-world application and demonstration",
        placementInLesson: "During development section",
        alternativeText: `Video showing ${request.lessonTopic} demonstration`,
        searchKeywords: [...topicKeywords, "demonstration", "video", "chemistry"],
        estimatedDuration: 5
      },
      {
        type: "interactive",
        title: `${request.lessonTopic} Interactive Activity`,
        description: `Interactive simulation or activity for hands-on learning`,
        suggestedSource: "PhET Simulations or similar educational platforms",
        purpose: "Provide hands-on exploration and experimentation",
        placementInLesson: "During practice section",
        alternativeText: `Interactive simulation for ${request.lessonTopic}`,
        searchKeywords: [...topicKeywords, "simulation", "interactive", "chemistry"],
        estimatedDuration: 10
      }
    ];
  }

  async generateImagePrompt(topic: string, context: string): Promise<string> {
    try {
      const client = this.requireClient();
      const response = await client.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are an expert in creating educational image prompts for chemistry concepts. Generate detailed, clear prompts for educational visuals."
          },
          {
            role: "user",
            content: `Create a detailed image prompt for an educational illustration about ${topic} in the context of ${context}. The image should be clear, scientifically accurate, and suitable for students. Focus on visual clarity and educational value.`
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      });

      return response.choices[0].message.content || `Educational illustration of ${topic} showing key concepts and relationships in a clear, scientifically accurate manner suitable for students.`;
    } catch (error) {
      console.error("Error generating image prompt:", error);
      return `Educational illustration of ${topic} showing key concepts and relationships in a clear, scientifically accurate manner suitable for students.`;
    }
  }

  async searchOnlineResources(keywords: string[]): Promise<string[]> {
    // This would integrate with actual search APIs in production
    // For now, return suggested search terms and sources
    const educationalSources = [
      "Khan Academy",
      "PhET Interactive Simulations",
      "ChemCollective",
      "Royal Society of Chemistry",
      "American Chemical Society",
      "TED-Ed",
      "YouTube Education",
      "MIT OpenCourseWare",
      "Coursera Chemistry Courses",
      "edX Chemistry Programs"
    ];

    return educationalSources.filter(source => 
      keywords.some(keyword => 
        source.toLowerCase().includes(keyword.toLowerCase()) || 
        keyword.toLowerCase().includes("chemistry") ||
        keyword.toLowerCase().includes("education")
      )
    );
  }
}

export const multimediaGenerator = new MultimediaContentGenerator();