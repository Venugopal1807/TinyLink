# TinyLink — Enterprise Grade URL Shortener

A full-stack URL shortening service built with Next.js 14 (App Router), Tailwind CSS, and Postgres (Neon) via Prisma ORM. Designed for performance, type safety, and a clean user experience.

🔗 **Live Demo:** [https://tiny-link-neon-ten.vercel.app/](https://tiny-link-neon-ten.vercel.app/)

---

## Core Features

- **Shorten Links:** Generates 6-8 character alphanumeric codes (verified unique).
- **Smart Redirects:** Performs server-side 302 redirects with sub-100ms latency.
- **Analytics:** Tracks total clicks, last active timestamps, and creation dates.
- **QR Code Generation:** Auto-generates QR codes for mobile sharing.
- **Optimistic UI:** Dashboard updates instantly before the server confirms, providing a snappy feel.
- **Robust API:** Fully compliant REST API (GET, POST, DELETE) for automated testing.

---

## Tech Stack

- **Frontend:** React, Next.js 14 (App Router), Tailwind CSS, Lucide Icons
- **Backend:** Next.js Route Handlers (Serverless functions)
- **Database:** Neon (Serverless Postgres)
- **ORM:** Prisma (schema-based, type-safe database access)
- **Deployment:** Vercel

---

## Struggles & Outcomes

### Struggle 1 — App Router file conflict

**Context:** I initially faced a build error because I had both `page.tsx` (UI) and `route.ts` (API) inside the same `[code]` directory.

**Issue:** Next.js cannot serve both a page and an API endpoint at the same URL path.

**Outcome:** I restructured the application to separate the API redirect logic (`app/[code]/route.ts`) from the Stats UI page (`app/code/[code]/page.tsx`), enforcing a clear separation of concerns.

### Struggle 2 — Optimistic UI vs. server reality

**Context:** When deleting a link, the UI would update but the link persisted on refresh because the API call was not fully integrated.

**Issue:** My initial handler updated local state but did not strictly await the database confirmation.

**Outcome:** Implemented a robust pattern where the UI updates immediately (optimistic update) but reverts to the previous state if the server request fails, ensuring data integrity without sacrificing user experience.

---

## Installation & Setup

```bash
# Clone the repo
git clone https://github.com/Venugopal1807/tinylink.git
cd tinylink

# Install dependencies
npm install

# Environment setup — rename .env.example to .env and add your Neon DB string
DATABASE_URL="postgres://..."

# Run locally
npx prisma db push
npm run dev
```
