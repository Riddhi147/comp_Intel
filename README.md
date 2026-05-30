# CompIntel — Compensation Intelligence Platform

A structured salary comparison platform for software engineers in India.
Compare compensation by **level, role, and location** — not just job title.

## Live URLs
- Frontend: https://comp-intel-one.vercel.app
- Backend: https://compintel-production.up.railway.app

## Tech Stack
- **Frontend**: Next.js 15, React, TypeScript, TailwindCSS
- **Backend**: NestJS, Node.js, TypeScript
- **Database**: PostgreSQL (Neon), Prisma ORM
- **Deployment**: Vercel (frontend), Railway (backend), Neon (database)

## Architecture
Monorepo with two separate apps:
- `frontend/` — Next.js app with 5 pages
- `backend/` — NestJS API with 4 route modules

## Key Design Decisions

### Level Normalization
The core insight: "L5 at Google" and "SDE2 at Amazon" are the same seniority.
A `LevelMapping` table translates company-specific levels to a normalized scale
(junior / mid / senior / staff) enabling fair cross-company comparison.

### TC Breakdown
Every entry stores base, bonus, and equity separately — not just CTC.
Total comp is auto-calculated on submission and validated server-side.

### Location Adjustment
Each city has a `colIndex` (cost-of-living index relative to Bangalore = 1.0).
The compare endpoint returns both raw and location-adjusted median TC.

### Zod Validation
POST /entries uses a Zod schema as the single source of truth —
same schema generates TypeScript types and validates API input.

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | /entries | Browse with filters + pagination |
| POST | /entries | Submit anonymous salary entry |
| GET | /compare | Level-normalized side-by-side comparison |
| GET | /insights | Aggregate stats by company, level, city |

## Database Schema
5 tables: `Company`, `Role`, `Location`, `SalaryEntry`, `LevelMapping`

## Local Setup
```bash
# Clone
git clone https://github.com/Riddhi147/comp_Intel
cd comp_Intel

# Backend
cd backend
npm install
cp .env.example .env  # add your DATABASE_URL
npx prisma migrate dev
npx prisma db seed
npm run start:dev

# Frontend
cd ../frontend
npm install
cp .env.example .env.local  # add NEXT_PUBLIC_API_URL
npm run dev
```
