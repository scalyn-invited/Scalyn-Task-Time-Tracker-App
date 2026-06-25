# Scalyn Task Time Tracker App

Scalyn Task Time Tracker App is a full-stack task and time tracking platform built with NestJS, Prisma, MySQL, and React/Vite.

It combines:

- a NestJS backend with JWT authentication and validation
- Prisma-backed data models for users, clients, tasks, labels, comments, attachments, activities, and time entries
- two bundled frontend experiences for task management and timer tracking
- server-rendered/static app pages for core workflows like login, profile, reports, team, and settings

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
- `frontend/tasks/` - task management frontend
- `frontend/timer/` - timer tracking frontend
- `public/` - static pages and built frontend assets
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

## Frontend Builds

The repo includes two Vite entrypoints:

- `npm run build:tasks`
- `npm run build:timer`

These are already included in the main `build` script.

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
- Prisma generates its client into `src/generated/prisma/`.
- The repository is configured to keep build output (`dist/`) in source control while excluding local-only files like `.env`, `node_modules/`, and `uploads/`.
