# EduTrack - Teacher Dashboard

## Overview

EduTrack is a comprehensive teacher dashboard application built with React and Express.js, designed to help educators manage students, assessments, and track academic progress. The system provides an intuitive interface for creating assessments, monitoring student performance, and generating lesson recommendations based on student data.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS variables for theming
- **Authentication**: Protected routes with authentication guards and session management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for persistent data storage
- **Database Provider**: Neon serverless PostgreSQL with automatic seeding
- **API Design**: RESTful API with JSON responses
- **Authentication**: Multi-provider OAuth (Google, Microsoft, Apple) + email/password with Passport.js
- **Email Service**: Nodemailer with welcome emails and verification system
- **Security**: Password hashing with bcrypt, secure session management, and CSRF protection
- **Middleware**: Express middleware for logging, error handling, request parsing, and authentication

### Development Setup
- **Monorepo Structure**: Client and server code in separate directories with shared schema
- **Development Server**: Vite dev server with HMR for frontend, tsx for backend development
- **Database Migration**: Drizzle Kit for schema management with automatic database seeding
- **Production Build**: Vite build for frontend, esbuild for backend bundling

## Key Components

### Database Schema
- **Users**: Teacher accounts with multi-provider authentication support and email verification
- **User Sessions**: Secure session storage for maintaining login state
- **Students**: Core student information with performance status tracking
- **Subjects**: Subject management with visual identifiers (colors, icons)
- **Assessments**: Assessment creation and management with subject relationships
- **Student Scores**: Individual assessment results with percentage calculations
- **Lesson Recommendations**: AI-generated recommendations based on performance data

### API Endpoints
- **Authentication Routes**: `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/user`
- **Email Verification**: `/api/auth/verify-email`, `/api/auth/forgot-password`, `/api/auth/reset-password`
- **OAuth Providers**: `/api/auth/google`, `/api/auth/microsoft`, `/api/auth/apple` with callback handling
- **Dashboard Routes**: `/api/dashboard/stats`, `/api/dashboard/students`, `/api/dashboard/assessments/recent`
- **Student Management**: `/api/students` with full CRUD operations and search functionality
- **Assessment Management**: Complete CRUD operations for assessments with subject relationships
- **Score Tracking**: Student score management and analytics with progress tracking
- **Subjects**: `/api/subjects` for subject management and categorization

### UI Components
- **Authentication System**: Multi-provider login/signup with email verification and password reset
- **Protected Routes**: Authentication guards ensuring secure access to all dashboard features
- **Dashboard**: Overview with stats cards, interactive progress charts, and recent activity
- **Student Management**: Complete student roster with performance tracking, search, and filtering
- **Assessment Tools**: Assessment creation and management interface with form validation
- **Lesson Plans**: AI-generated curriculum recommendations based on student performance
- **Reports & Analytics**: Comprehensive reporting with data export capabilities
- **Modals**: Student profiles with personalized recommendations and assessment forms
- **Responsive Design**: Mobile-first approach with adaptive layouts

## Data Flow

### Client-Server Communication
1. Frontend makes HTTP requests to Express API endpoints
2. Server processes requests and queries PostgreSQL database via Drizzle ORM
3. Response data is cached client-side using TanStack Query
4. UI components reactively update based on cached data

### Database Operations
1. Drizzle ORM handles database schema migrations and queries
2. Type-safe database operations with TypeScript integration
3. Connection pooling managed by Neon serverless PostgreSQL
4. Database schema changes managed through migration files

### State Management
1. Server state managed by TanStack Query with automatic caching
2. Local component state handled by React hooks
3. Form state managed by React Hook Form with Zod validation
4. Global UI state (toasts, modals) managed by context providers

## External Dependencies

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database provider
- **Drizzle ORM**: Type-safe database toolkit and query builder
- **connect-pg-simple**: PostgreSQL session store for Express

### UI Libraries
- **Radix UI**: Headless UI components for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **React Hook Form**: Form validation and management
- **Zod**: TypeScript-first schema validation

### Development Tools
- **Vite**: Fast build tool with HMR support
- **ESBuild**: JavaScript bundler for production builds
- **TypeScript**: Type safety across the entire application
- **Replit Integration**: Development environment optimization

## Deployment Strategy

### Production Build
1. Frontend assets built with Vite and output to `dist/public`
2. Backend bundled with ESBuild targeting Node.js ESM
3. Static assets served by Express in production mode
4. Database migrations applied via Drizzle Kit

### Environment Configuration
- **Development**: Vite dev server with Express API, local database
- **Production**: Single Express server serving both API and static assets
- **Database**: Neon PostgreSQL with connection string via environment variables

### Performance Optimizations
- **Code Splitting**: Automatic code splitting via Vite
- **Asset Optimization**: Vite handles CSS/JS minification and asset optimization
- **Database Indexing**: Proper indexing on frequently queried columns
- **Query Caching**: TanStack Query provides intelligent client-side caching

## Changelog

```
Changelog:
- July 07, 2025. Initial setup
- July 07, 2025. Added comprehensive student management functionality:
  * Student creation with form validation and auto-generated IDs
  * Enhanced Students page with full CRUD operations
  * AI-generated lesson recommendations based on performance data
  * Lesson Plans page with personalized curriculum suggestions
  * Reports & Analytics page with export functionality (CSV/PDF)
  * Interactive progress charts with subject-specific filtering
  * Fixed navigation issues and LSP errors
  * Integrated smart recommendation engine for tailored teaching strategies
  * Migrated from in-memory storage to PostgreSQL database with persistent data
  * Added automatic database seeding with sample students, subjects, and assessments
- July 08, 2025. Enhanced AI recommendation system:
  * Implemented hybrid AI approach combining OpenAI GPT-4o with pattern analysis
  * Added sophisticated learning pattern detection (progress trends, learning styles, risk levels)
  * Created comprehensive AI recommendations with detailed activities and resources
  * Added new AI Recommendations page with advanced filtering and categorization
  * Integrated contextual AI-powered suggestions based on real student performance data
  * Enhanced recommendation engine with confidence scoring and success metrics
- July 08, 2025. Complete authentication system implementation:
  * Added multi-provider OAuth authentication (Google, Microsoft, Apple) with Passport.js
  * Implemented secure email/password authentication with bcrypt password hashing
  * Created email verification system with welcome emails containing app feature overview
  * Added password reset functionality with secure token-based verification
  * Implemented protected routes with authentication guards for all dashboard features
  * Added user session management with PostgreSQL session storage
  * Created comprehensive login/signup interface with form validation and error handling
- July 08, 2025. Restructured for IGCSE/A Level Edexcel Chemistry focus:
  * Updated database schema to support grade levels (10, 11, 12) and education levels (IGCSE, A Level)
  * Replaced generic subjects with Chemistry-specific topics (Atomic Structure, Bonding, Organic Chemistry, etc.)
  * Implemented computed student status based on real assessment results instead of manual assignment
  * Updated student forms to focus on Chemistry curriculum with proper grade/level validation
  * Enhanced data export to include Chemistry topic performance breakdowns
  * Restructured student IDs to follow Chemistry-specific patterns (CHE10IGC001, CHE12AL002, etc.)
- July 08, 2025. Implemented curriculum-based module system:
  * Redesigned teacher profile setup to focus on curriculum selection (IGCSE vs A Level Chemistry Edexcel)
  * Created comprehensive curriculum data with detailed topics for both IGCSE and A Level
  * Added modules and lesson_plans database tables with proper relationships
  * Built Modules page for creating curriculum-based modules with topic selection
  * Implemented module management API with full CRUD operations
  * Updated navigation from generic "Lessons" to curriculum-focused "Modules"
  * Prepared foundation for AI-powered lesson plan suggestions within modules
- July 08, 2025. Fixed critical profile setup issues:
  * Resolved infinite loop error caused by Radix UI Checkbox components with duplicate event handlers
  * Replaced problematic checkboxes with custom UI elements using simple div styling
  * Fixed API request authentication by correcting apiRequest function usage
  * Enhanced error handling and validation for profile setup process
  * Successfully enabled teachers to complete curriculum and grade level selection
- July 08, 2025. Enhanced assessment system with AI-powered generation:
  * Implemented comprehensive AI assessment generator using OpenAI GPT-4o
  * Created structured curriculum data system for proper topic/objective mapping
  * Added assessment creation workflow based on modules, topics, and learning objectives
  * Built curriculum API endpoints for hierarchical data access (topics → subtopics → objectives)
  * Enhanced assessment schema to support AI-generated content with difficulty levels and question types
  * Prepared curriculum data structure for official Edexcel specification integration
- July 08, 2025. Implemented flexible curriculum mapping system:
  * Created comprehensive IGCSE and A Level Edexcel curriculum data with detailed topics, subtopics, and learning objectives
  * Built FlexibleCurriculumMapper component allowing teachers to mix and match IGCSE and A Level topics based on student abilities
  * Enhanced module creation with side-by-side curriculum selection enabling differentiated instruction within the same class
  * Added detailed learning objectives with official specification codes, Bloom's taxonomy levels, and difficulty classifications
  * Integrated practical work requirements and mathematical skills for each subtopic
  * Created search and filtering capabilities for easy curriculum navigation with real-time selection tracking
  * Added graceful fallback for OpenAI quota limitations to ensure system reliability
- July 08, 2025. Fixed critical module creation functionality:
  * Resolved "string did not match the expected pattern" error by correcting API request function usage
  * Updated database schema to include topics, objectives, and estimatedHours fields in modules table
  * Fixed apiRequest function call to use proper parameters (url, options) instead of incorrect signature
  * Restored proper validation with insertModuleSchema for production-ready code
  * Successfully enabled module creation with curriculum topic selection and time estimation
- July 08, 2025. Implemented strict objective-based constraint system:
  * Fixed database date field handling errors by converting strings to Date objects
  * Added validation to prevent lesson creation without module objectives
  * Enhanced lesson creation workflow to use only pre-defined module objectives
  * Updated AI lesson generator to enforce module objectives constraint
  * Modified assessment dashboard with objective-based filtering and validation
  * Added warning messages and disabled buttons when modules lack objectives
  * Implemented backend validation for lesson and assessment creation based on module objectives
  * System now ensures teachers cannot write their own objectives during lesson/assessment creation
  * Simplified lesson creation interface to two options: manual creation and AI generation
  * Removed "From Objectives" bulk creation option to streamline the user experience
- July 08, 2025. Implemented comprehensive chemistry curriculum with hierarchical selection:
  * Created complete IGCSE and A Level Edexcel chemistry curriculum with all topics, subtopics, and objectives
  * Built HierarchicalCurriculumMapper component with three-level selection system
  * Implemented cascading selection: selecting topics auto-selects all subtopics and objectives
  * Added individual subtopic and objective selection capabilities for granular control
  * Enhanced curriculum data with official specification codes, Bloom's taxonomy levels, and difficulty classifications
  * Integrated practical work requirements and mathematical skills for each subtopic
  * Created visual indicators for selection state at all hierarchy levels (topics, subtopics, objectives)
  * Added comprehensive search and filtering capabilities across all curriculum levels
  * Implemented real-time hour calculation based on selected learning objectives
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```