# 2224 Main Street - Real Estate Marketing Platform

## Overview

This is a luxury real estate marketing platform for a mixed-use property at 2224 Main Street, Santa Monica. The application serves as a comprehensive marketing website with lead capture, investor portal access (gated by Confidentiality Agreement signing), and an admin dashboard for managing leads and email nurture campaigns.

The platform combines a public-facing marketing site with private investor functionality and backend lead management tools.

## User Preferences

Preferred communication style: Simple, everyday language.

## Admin Access

Two admin users have been configured:
- **Pat Ayau**: payau@leewestla.com
- **Travis Majick**: majickcre@gmail.com

Login at `/login` to access the dashboard.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with custom theme variables for luxury branding
- **UI Components**: shadcn/ui component library (New York style)
- **State Management**: TanStack React Query for server state
- **Animations**: Framer Motion for smooth transitions
- **Typography**: Cormorant Garamond (serif) and Montserrat (sans-serif) font pairing

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints under `/api/*` prefix
- **Authentication**: Session-based auth with bcrypt password hashing
- **Build System**: Vite for client, esbuild for server bundling

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Tables**: users, leads, emailCampaigns, caSignatures
- **Migrations**: Drizzle Kit with `drizzle-kit push` command

### Key Application Routes
- `/` - Marketing homepage with property showcase
- `/login` - Admin login page
- `/portal` - Investor portal (requires CA signature)
- `/dashboard` - Admin dashboard for lead management (requires login)
- `/dashboard/leads` - Lead management table
- `/dashboard/campaigns` - Email campaign monitoring
- `/dashboard/social` - AI Social Content Generator

### API Endpoints

**Authentication:**
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current session

**Leads:**
- `POST /api/leads` - Create new lead from contact form
- `GET /api/leads` - Retrieve all leads (dashboard)
- `GET /api/leads/:id` - Get specific lead
- `PATCH /api/leads/:id/status` - Update lead status

**CA Signatures:**
- `POST /api/ca-signatures` - Record Confidentiality Agreement signature
- `GET /api/ca-signatures/check/:email` - Check if email has signed CA
- `GET /api/ca-signatures` - Get all signatures

**Dashboard:**
- `GET /api/dashboard/stats` - Dashboard analytics

**AI Social Content:**
- `POST /api/generate-social-content` - Generate AI-powered social media content (requires auth)

**AI Chatbot:**
- `POST /api/chat` - AI-powered FAQ chatbot for property questions (public)

### Design Patterns
- **Monorepo Structure**: Client (`client/`), server (`server/`), and shared (`shared/`) code separation
- **Schema Validation**: Zod schemas generated from Drizzle tables via `drizzle-zod`
- **Type Safety**: Shared types between frontend and backend through `@shared/*` path alias
- **Component Organization**: Marketing components separate from dashboard components

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connected via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management
- **memorystore**: In-memory session storage for authentication

### UI/Component Libraries
- **Radix UI**: Headless component primitives (dialogs, dropdowns, tabs, etc.)
- **shadcn/ui**: Pre-styled component collection built on Radix
- **Lucide React**: Icon library
- **Embla Carousel**: Image carousel functionality

### Email Service
- Email nurture campaign system defined in `server/email-service.ts`
- Welcome emails and multi-step drip campaigns for leads
- Currently uses mock/template structure (actual email provider not configured)

### SMS Service
- SMS nurture campaign system defined in `server/sms-service.ts`
- 3-step SMS sequence: welcome, follow-up, final reminder
- **Twilio integration pending** - requires environment variables:
  - `TWILIO_ACCOUNT_SID`
  - `TWILIO_AUTH_TOKEN`
  - `TWILIO_PHONE_NUMBER`
- Currently runs in dev mode (logs SMS instead of sending)

### Authentication
- **bcryptjs**: Password hashing
- **express-session**: Session management
- **memorystore**: Session storage

### AI Integration
- **OpenAI via Replit AI Integrations**: Used for AI Social Content Generator
- Environment variables: `AI_INTEGRATIONS_OPENAI_API_KEY`, `AI_INTEGRATIONS_OPENAI_BASE_URL`
- Model: `gpt-4o-mini` for content generation
- Charges to user's Replit credits (no separate API key needed)

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment indicator
- **vite-plugin-meta-images**: Custom plugin for OpenGraph image handling with Replit domains

### Form Handling
- **React Hook Form**: Form state management
- **@hookform/resolvers**: Zod integration for form validation

### Date Utilities
- **date-fns**: Date formatting and manipulation

## Scripts

- `npm run dev` - Start development server
- `npm run db:push` - Push schema changes to database
- `npx tsx server/seed-admins.ts` - Seed admin users
