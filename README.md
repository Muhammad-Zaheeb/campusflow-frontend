# CampusFlow

**A task manager built for students.** Track assignments, quizzes and projects, see what's due today, and never miss a deadline.

**[Live demo](https://campusflow-frontend-blond.vercel.app)** · **[Backend repo](https://github.com/Muhammad-Zaheeb/campusflow)** · **[API docs](https://campusflow-uoi7.onrender.com/docs)**

[![CI](https://github.com/Muhammad-Zaheeb/campusflow-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/Muhammad-Zaheeb/campusflow-frontend/actions/workflows/ci.yml)
[![Backend tests](https://github.com/Muhammad-Zaheeb/campusflow/actions/workflows/tests.yml/badge.svg)](https://github.com/Muhammad-Zaheeb/campusflow/actions/workflows/tests.yml)
![React](https://img.shields.io/badge/React_19-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)

![CampusFlow dashboard in light mode](screenshots/dashboard-light.png)

> The backend runs on Render's free tier, so the first request after a quiet period can take 30–60 seconds while the server wakes up. The app shows a notice while this happens.

---

## Features

**Tasks**
- Create, edit and delete tasks with a title, description, priority (Low / Medium / High) and optional due date
- Mark tasks done with one click; completed tasks move to their own section
- Smart due labels: *Due today*, *Due tomorrow*, *Due in 5 days*, *Overdue by 2 days*
- Overdue tasks are highlighted in red

**Finding things**
- Search across titles and descriptions
- Filter tabs: All, Pending, Overdue, Completed (each with a live count)
- Sort by due date, priority or newest

**Dashboard**
- Personal greeting and a one-line summary of what needs attention
- Stat cards (total, pending, completed, overdue) and an overall progress bar

**Experience**
- Light and dark mode: follows your system setting and remembers your choice
- Fully responsive, from a 320px phone to a large monitor, with 44px tap targets on mobile
- Add/edit in a modal, confirm before deleting, toast notifications, loading skeletons and empty states
- Keyboard shortcut: press **N** to add a task

**Accounts and security**
- Register and log in with JWT authentication
- Passwords hashed with bcrypt; input validated on both client and server
- Each user can only see and change their own tasks

**Quality**
- 30 backend tests (pytest) and lint, type-check and build checks on every push, all run by GitHub Actions

## Screenshots

| Dark mode | New task |
|---|---|
| ![Dashboard in dark mode](screenshots/dashboard-dark.png) | ![Adding a new task](screenshots/new-task-dark.png) |

| Login (light) | Login (dark) |
|---|---|
| ![Login page in light mode](screenshots/login-light.png) | ![Login page in dark mode](screenshots/login-dark.png) |

<p align="center">
  <img src="screenshots/mobile-light.png" alt="Mobile dashboard in light mode" width="260" />
  &nbsp;&nbsp;
  <img src="screenshots/mobile-dark.png" alt="Mobile dashboard in dark mode" width="260" />
</p>

## How it works

```
┌────────────────────────┐   HTTPS + JWT   ┌────────────────────────┐   SQLAlchemy   ┌──────────────┐
│  React + TypeScript    │ ──────────────► │  FastAPI (Python)      │ ─────────────► │  PostgreSQL  │
│  Vite, Tailwind CSS    │ ◄────────────── │  Pydantic validation   │                │  (Neon)      │
│  hosted on Vercel      │      JSON       │  hosted on Render      │                │              │
└────────────────────────┘                 └────────────────────────┘                └──────────────┘
```

1. The user logs in; the API checks the bcrypt password hash and returns a signed JWT.
2. The frontend stores the token and sends it with every request (an Axios interceptor adds the header).
3. Every task route on the backend reads the user from the token, so queries only ever return that user's tasks.
4. If the token expires, the app sends the user back to the login page.

## Tech stack

| Area | Tools |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, React Router, Axios, lucide-react, react-hot-toast |
| Backend | FastAPI, SQLAlchemy 2.0, Pydantic, python-jose (JWT), passlib/bcrypt |
| Database | PostgreSQL on Neon |
| Hosting | Vercel (frontend), Render (backend) |

## Project structure

```
src/
├── api/axios.ts          # Axios instance: base URL, auth header, session-expiry handling
├── components/           # UI building blocks (TaskCard, TaskFormModal, Toolbar, StatsCards, Navbar…)
├── hooks/useTheme.ts     # Light/dark mode
├── pages/                # Login, Register, Dashboard
├── services/             # API calls for auth and tasks
├── utils/                # Date helpers (due labels, overdue checks) and error messages
├── types.ts              # Shared TypeScript types
└── App.tsx               # Routes and auth guards
```

## Run it locally

You need Node.js 20+ and the [backend](https://github.com/Muhammad-Zaheeb/campusflow) running on port 8000.

```bash
git clone https://github.com/Muhammad-Zaheeb/campusflow-frontend.git
cd campusflow-frontend
npm install
cp .env.example .env.local   # points the app at http://localhost:8000
npm run dev                  # opens on http://localhost:5173
```

Without a `.env.local`, the app uses the live API on Render.

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

## Roadmap

- Frontend tests (React Testing Library)
- Docker setup for the whole stack
- Course/subject tags for tasks
- Calendar view
- Password reset and email verification

## Author

**Muhammad Zaheeb**, BSCS student at FAST-NUCES
[GitHub](https://github.com/Muhammad-Zaheeb) · [LinkedIn](https://www.linkedin.com/in/zaheeb-qureshi-22814b190/)
