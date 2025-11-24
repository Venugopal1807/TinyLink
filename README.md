# TinyLink - Enterprise Grade URL Shortener

A full-stack URL shortening service built with Next.js 14 (App Router), Tailwind CSS, and Postgres (Neon) via Prisma ORM. Designed for performance, type safety, and a clean user experience.

### 🔗 Live Demo: [Insert your Vercel URL here after deployment]
### 🎥 Video Walkthrough: [Insert your Loom/Video Link here]

## 🚀 Core Features

Shorten Links: Generates 6-8 character alphanumeric codes (verified unique).

Smart Redirects: Performs server-side 302 redirects with sub-100ms latency.

Analytics: Tracks total clicks, last active timestamps, and creation dates.

QR Code Generation: Auto-generates QR codes for mobile sharing.
#
Optimistic UI: Dashboard updates instantly before the server confirms, providing a snappy feel.

Robust API: Fully compliant REST API (GET, POST, DELETE) for automated testing.

## 🛠️ Tech Stack

Frontend: React, Next.js 14 (App Router), Tailwind CSS, Lucide Icons.

Backend: Next.js Route Handlers (Serverless functions).

Database: Neon (Serverless Postgres).

ORM: Prisma (Schema-based, type-safe database access).

Deployment: Vercel.

## 🧠 AI & Development Process

I utilized LLMs (ChatGPT) as a technical consultant and architect for approximately 30-40% of this project. My goal was to simulate a senior engineering review process where I validate the decisions before implementation.

### How I used AI:

Architecture & Planning: I prompted the AI for a "Visual Architecture Diagram" and a structured execution timeline to ensure I could meet the tight deadline without scope creep. This helped me visualize the data flow between the Next.js client, the API layer, and the Neon database.

API Design Strategy: I leveraged AI to define a clean API contract (e.g., standardized JSON responses for stats, correct HTTP status codes like 409 for duplicates) before writing the actual logic.

Debugging Partner: When I encountered specific configuration issues—such as Vercel environment variables not persisting or chart data mismatching the expected format—I used AI to analyze the error logs and identify the root causes quickly.

### What I built myself:

Full Implementation: I manually wrote the Next.js App Router code, including the page.tsx UI components and route.ts API handlers, translating the high-level plan into working TypeScript code.

Database Integration: I set up the Prisma schema and handled the secure database connection logic, ensuring features like the "Optimistic UI" deletion worked seamlessly with the backend state.

Final Polish: I refined the UI aesthetics (Glassmorphism effect), implemented the QR code generation, and ensured the application met all automated testing criteria (e.g., health checks and redirect behavior).

## 📉 Struggles & Outcomes

### Struggle 1: The App Router File Conflict

Context: I initially faced a build error because I had both page.tsx (UI) and route.ts (API) inside the same [code] directory.

Issue: Next.js cannot serve both a page and an API endpoint at the same URL path.

Outcome: I restructured the application to separate the API redirect logic (app/[code]/route.ts) from the Stats UI page (app/code/[code]/page.tsx), enforcing a clear separation of concerns.

## Struggle 2: Optimistic UI vs. Server Reality

Context: When deleting a link, the UI would update, but the link persisted on refresh because the API call wasn't fully integrated.

Issue: My initial handler updated the local state but didn't strictly await the database confirmation.

Outcome: I implemented a robust pattern where the UI updates immediately (Optimistic Update), but reverts to the previous state if the server request fails, ensuring data integrity without sacrificing user experience.

## 💻 Installation & Setup

Clone the repo

git clone [https://github.com/YOUR_USERNAME/tinylink.git](https://github.com/YOUR_USERNAME/tinylink.git)
cd tinylink


### Install dependencies

npm install


Environment Setup
Rename .env.example to .env and add your Neon DB string:

DATABASE_URL="postgres://..."


Run locally

npx prisma db push
npm run dev


Built for Assignment.