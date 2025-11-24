# TinyLink - Enterprise Grade URL Shortener

A full-stack URL shortening service built with Next.js 14 (App Router), Tailwind CSS, and Postgres (Neon) via Prisma ORM. Designed for performance, type safety, and a clean user experience.

## 🔗 Live Demo: [Insert your Vercel URL here after deployment]
🎥 Video Walkthrough: [Insert your Loom/Video Link here]

## 🚀 Core Features

### Shorten Links: Generates 6-8 character alphanumeric codes (verified unique).

### Smart Redirects: Performs server-side 302 redirects with sub-100ms latency.

Analytics: Tracks total clicks, last active timestamps, and creation dates.

QR Code Generation: Auto-generates QR codes for mobile sharing.

Optimistic UI: Dashboard updates instantly before the server confirms, providing a snappy feel.

Robust API: Fully compliant REST API (GET, POST, DELETE) for automated testing.

## 🛠️ Tech Stack

### Frontend: React, Next.js 14 (App Router), Tailwind CSS, Lucide Icons.

### Backend: Next.js Route Handlers (Serverless functions).

### Database: Neon (Serverless Postgres).

## ORM: Prisma (Schema-based, type-safe database access).

### Deployment: Vercel.

## 🧠 AI & Development Process

I utilized LLMs (ChatGPT) as a "Pair Programmer" for approximately 30-40% of this project, specifically for architectural bootstrapping and boilerplate generation.

## How I used AI:

Schema Design: I used AI to brainstorm the optimal Prisma schema for high-read, low-write scenarios (URL redirects).

Tailwind Patterns: I leveraged AI to generate the complex "Glassmorphism" CSS classes for the dashboard cards to save time on styling.

Regex Logic: I verified my custom code validation regex (^[A-Za-z0-9]{6,8}$) with AI to ensure it covered all edge cases.

What I built myself:

Core Logic: The handleSubmit and handleDelete integration with the backend API.

State Management: Handling the React useState logic for the dashboard list and loading states.

Debugging: Fixing the critical file conflicts in the App Router structure and ensuring the force-dynamic rendering for the stats page.

## 📉 Struggles & Outcomes

### Struggle 1: The App Router File Conflict

Context: I initially faced a build error because I had both page.tsx (UI) and route.ts (API) inside the same [code] directory.

Issue: Next.js cannot serve both a page and an API endpoint at the same URL path.

Outcome: I restructured the application to separate the API redirect logic (app/[code]/route.ts) from the Stats UI page (app/code/[code]/page.tsx), enforcing a clear separation of concerns.

## Struggle 2: Optimistic UI vs. Server Reality

Context: When deleting a link, the UI would update, but the link persisted on refresh because the API call wasn't fully integrated.

Issue: My initial handler updated the local state but didn't strictly await the database confirmation.

Outcome: I implemented a robust pattern where the UI updates immediately (Optimistic Update), but reverts to the previous state if the server request fails, ensuring data integrity without sacrificing user experience.

##m💻 Installation & Setup

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