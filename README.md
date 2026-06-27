# Scalyn Task Time Tracker App

Scalyn Task Time Tracker App is a full-stack task and time tracking platform built with NestJS, Prisma, MySQL, and React/Vite.

It combines:

- a NestJS backend with JWT authentication and validation
- Prisma-backed data models for users, clients, tasks, labels, comments, attachments, activities, and time entries
- a unified React single-page application served by NestJS
- static asset delivery from `public/` with the active SPA build output under `public/app/`

## Features

- User authentication and session-protected routes
- Task management with status, priority, labels, comments, replies, and activity history
- Client management with allowance and archive support
- Time tracking with manual entries and timer workflows
- Task attachments and file uploads
- Role-based user support with `ADMIN`, `MANAGER`, and `MEMBER`
- Built-in report, team, settings, profile, and timesheet pages

## Tech Stack

- Backend: NestJS
- Database: MySQL
- ORM: Prisma
- Frontend: React, Vite, TypeScript
- State management: Zustand
- Forms and validation: React Hook Form, Zod, class-validator
- Rich text editor: Tiptap

## Project Structure

- `src/` - NestJS application code
- `prisma/` - Prisma schema, migrations, and seed script
- `frontend/app/` - unified React SPA source
- `frontend/tasks/`, `frontend/timer/`, `frontend/reports/`, `frontend/team/` - feature code used by the unified app during migration/consolidation
- `public/` - static assets and built frontend output
- `public/app/` - active built SPA served by NestJS
- `dist/` - compiled backend output

## Requirements

- Node.js 20 or newer
- MySQL database

## Environment Variables

Create a `.env` file based on `.env.example`.

Required values:

- `DATABASE_URL` - MySQL connection string
- `JWT_SECRET` - secret used to sign authentication tokens

Optional values:

- `JWT_EXPIRES_IN` - token lifespan, defaults to `1d`
- `BCRYPT_SALT_ROUNDS` - defaults to `12`
- `PORT` - server port, defaults to `3000`

## Installation

```bash
npm install
```

## Database Setup

Generate the Prisma client and apply migrations:

```bash
npm run prisma:generate
npm run prisma:deploy
```

For local development, you can also use:

```bash
npm run prisma:migrate
```

To seed the database:

```bash
npm run prisma:seed
```

## Development

Start the backend in watch mode:

```bash
npm run start:dev
```

Build the frontend bundles and the NestJS app:

```bash
npm run build
```

Run the production entrypoint after building:

```bash
npm run start:prod
```

## Frontend Build and Runtime

The active frontend is a unified React SPA built with:

- `npm run build:app`

The main build script already includes the SPA build before compiling the NestJS backend:

- `npm run build`

At runtime, NestJS serves the SPA entrypoint from:

- `public/app/index.html`

## Available Routes

The app serves core pages at:

- `/`
- `/login`
- `/register`
- `/profile`
- `/timer`
- `/tasks`
- `/timesheets`
- `/reports`
- `/clients`
- `/team`
- `/settings`

## Notes

- Static assets are served from `public/`.
- The active frontend runtime path is the unified SPA under `public/app/`.
- Legacy static HTML pages and old multi-app frontend build outputs have been retired from the active runtime path.
- Prisma generates its client into `src/generated/prisma/`.
- The repository is configured to keep build output (`dist/`) in source control while excluding local-only files like `.env`, `node_modules/`, and `uploads/`.
