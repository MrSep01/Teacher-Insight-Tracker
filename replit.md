# EduTrack - Teacher Dashboard

## Overview
EduTrack is a comprehensive teacher dashboard application designed to empower educators in managing students, assessments, and tracking academic progress. It provides an intuitive interface for creating assessments, monitoring student performance, and generating AI-powered lesson recommendations. The platform aims to streamline the teaching workflow, enable differentiated instruction, and provide teachers with tools to create a personalized learning experience for students, particularly focusing on IGCSE and A Level Chemistry Edexcel specifications. Its vision is to let AI handle the complexities of lesson differentiation and resource generation, allowing teachers to focus on teaching.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework & Build**: React with TypeScript, Vite.
- **State & Routing**: TanStack Query for server state, Wouter for routing.
- **UI/Styling**: Radix UI components, shadcn/ui design, Tailwind CSS with theming.
- **Authentication**: Protected routes, session management.

### Backend
- **Runtime & Framework**: Node.js with Express.js (TypeScript, ES modules).
- **Database**: PostgreSQL with Drizzle ORM (Neon serverless).
- **API**: RESTful JSON API.
- **Authentication**: Multi-provider OAuth (Google, Microsoft, Apple) + email/password with Passport.js, secure sessions, email verification, password hashing (bcrypt), CSRF protection.
- **Middleware**: Logging, error handling, request parsing.

### Development & Core Design
- **Monorepo**: Client and server in separate directories with shared schema.
- **Database Management**: Drizzle Kit for schema management, automatic seeding.
- **Curriculum Integration**: Comprehensive, authentic IGCSE and A Level Edexcel Chemistry specifications are deeply integrated, including topics, subtopics, objectives (with official codes, Bloom's taxonomy, difficulty), practical work, and mathematical skills. This data forms the backbone of assessment generation and lesson planning.
- **AI Integration**: OpenAI GPT-4o for AI-powered assessment generation, lesson recommendations, and comprehensive lesson content generation (including multimedia suggestions, differentiated activities, teacher guides, student worksheets).
- **Module & Course Management**: Teachers can create, manage, and reorder modules within courses. Modules are objective-based and linked to the integrated curriculum.
- **Lesson System**: Comprehensive AI-powered lesson generation, with a multi-tab viewer for lesson content, student worksheets, teacher scripts, and guides. Lessons can be differentiated based on student performance data. A separate, linked assessment system is also in place.
- **UI/UX**: Responsive design, consistent headers/footers, sortable (drag-and-drop) elements for module management, detailed course/module/lesson views, and a dedicated marketing landing page with contact forms and legal pages.

## External Dependencies

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database provider.
- **Drizzle ORM**: Type-safe database toolkit and query builder.
- **connect-pg-simple**: PostgreSQL session store for Express.

### UI Libraries
- **Radix UI**: Headless UI components.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lucide React**: Icon library.
- **React Hook Form**: Form validation and management.
- **Zod**: TypeScript-first schema validation.
- **@dnd-kit**: Drag-and-drop functionality.

### Development Tools
- **Vite**: Fast build tool.
- **ESBuild**: JavaScript bundler.
- **TypeScript**: Type safety across the application.

### AI/API Services
- **OpenAI GPT-4o**: For AI-powered generation of assessments, lessons, and recommendations.
```