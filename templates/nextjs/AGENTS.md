# Agent Guidelines for Next.js Template

This is a foundational template for building Next.js applications. Follow these guidelines to help users build apps effectively without breaking the established architecture.

## Template Architecture Overview

This template uses Next.js App Router with:

- Primary language: TypeScript
- Framework: Next.js 15+ with App Router
- Frontend: React 19 with Server and Client Components
- Styling: Tailwind CSS 4
- Full-stack architecture with Route Handlers for APIs

## Critical Dependencies - DO NOT MODIFY

These dependencies are carefully configured and should NOT be changed:

- Next.js 15+ - App Router architecture with Server Components
- React 19 - Latest version with new features
- Tailwind CSS v4 - Modern styling with simplified configuration
- TypeScript 5 - Type safety

## Important Reminders

- Main entry point: `./app/page.tsx`
- Root layout: `./app/layout.tsx` (wraps all pages)
- File naming: Use lowercase, dash-case (kebab-case) for directories (e.g. `user-profile/`)
- Persistent Storage: The `.storage/` directory is ignored by git and can be used for persistent data

## Server vs Client Components

**Server Components** (default - no directive needed):
- Can access server resources directly (databases, file system, environment variables)
- Cannot use React hooks (useState, useEffect, etc.)
- Cannot use browser APIs
- Examples: `app/page.tsx`, `app/layout.tsx`

**Client Components** (require `'use client'` directive at top):
- Can use React hooks and browser APIs
- Interactive UI elements (buttons, forms with state)
- Must add `'use client'` as first line in file
- Examples: Interactive forms, modals, dropdowns

## File-based Routing

- `app/page.tsx` → `/`
- `app/about/page.tsx` → `/about`
- `app/blog/[slug]/page.tsx` → `/blog/:slug` (dynamic route)
- `app/api/hello/route.ts` → `/api/hello` (API endpoint)

## Route Handlers (API Routes)

Create backend endpoints in `app/api/` directories:

```typescript
// app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello' });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}
```

## Adding New Features

### Creating Pages

1. Create `app/your-page/page.tsx`
2. Export default function component
3. Server Component by default (no `'use client'`)

### Creating Client Components

1. Add `'use client'` as first line
2. Create in `app/components/` directory
3. Can use hooks and browser APIs

### Creating API Routes

1. Create `app/api/your-endpoint/route.ts`
2. Export async functions: GET, POST, PUT, DELETE
3. Use `NextRequest` and `NextResponse` types
