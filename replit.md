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

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **API Design**: RESTful API with JSON responses
- **Middleware**: Express middleware for logging, error handling, and request parsing

### Development Setup
- **Monorepo Structure**: Client and server code in separate directories with shared schema
- **Development Server**: Vite dev server with HMR for frontend, tsx for backend development
- **Production Build**: Vite build for frontend, esbuild for backend bundling

## Key Components

### Database Schema
- **Students**: Core student information with performance status tracking
- **Subjects**: Subject management with visual identifiers (colors, icons)
- **Assessments**: Assessment creation and management with subject relationships
- **Student Scores**: Individual assessment results with percentage calculations
- **Lesson Recommendations**: AI-generated recommendations based on performance data

### API Endpoints
- **Dashboard Routes**: `/api/dashboard/stats`, `/api/dashboard/students`, `/api/dashboard/assessments/recent`
- **Student Management**: `/api/students` with full CRUD operations and search functionality
- **Assessment Management**: Complete CRUD operations for assessments with subject relationships
- **Score Tracking**: Student score management and analytics with progress tracking
- **Subjects**: `/api/subjects` for subject management and categorization

### UI Components
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
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```