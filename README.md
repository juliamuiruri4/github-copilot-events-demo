# GitHub Copilot Events Demo

A full-stack event management website demo built with React and Node.js. This project showcases a professional event management platform where organisations can list events, accept registrations, and manage everything through an admin dashboard.

> **Demo context:** The default configuration is branded for the **MUT Inter-University Tech Day 2026** — an event bringing together students and industry professionals from Murang'a University of Technology, Kirinyaga University, Dedan Kimathi University, Strathmore University, and Embu University.

---

## Features

### Public Site
- **Event listing** — browse all events with filtering by category, status, and keyword search
- **Event detail** — full event page with description, speakers, and schedule
- **Registration** — attendees can register for an event with duplicate-registration detection

### Admin Dashboard (`/admin`)
- **Events management** — create, edit, and delete events
- **Registrations** — view all registrations per event and check in attendees
- **Organisation settings** — update branding, contact info, and social links at runtime

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Routing | React Router v7 |
| UI | Bootstrap 5, React Bootstrap, React Bootstrap Icons |
| HTTP client | Axios |
| Backend | Node.js, Express 5, TypeScript |
| Dev server | ts-node, nodemon |
| IDs | uuid |

---

## Project Structure

```
github-copilot-events-demo/
├── package.json          # Root scripts (runs client + server concurrently)
├── client/               # React frontend (Vite)
│   └── src/
│       ├── api/          # Axios API helpers
│       ├── components/   # Shared UI components (Navbar, Footer, EventCard)
│       ├── context/      # React context providers
│       ├── pages/        # Route-level page components
│       │   ├── Home.tsx
│       │   ├── EventDetail.tsx
│       │   ├── Register.tsx
│       │   └── Admin/    # Admin dashboard pages
│       └── types/        # Shared TypeScript interfaces
└── server/               # Express backend
    └── src/
        ├── config.ts     # Organisation config (in-memory, editable via API)
        ├── data/         # Mock data (events & registrations)
        ├── routes/       # Express routers
        │   ├── events.ts
        │   ├── registrations.ts
        │   ├── admin.ts
        │   └── config.ts
        └── types/        # Shared TypeScript interfaces
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

### Install Dependencies

```bash
npm run install:all
```

This installs dependencies for both the `client` and `server` packages.

### Run in Development Mode

```bash
npm run dev
```

This starts both the backend and frontend concurrently:

| Service | URL |
|---|---|
| Backend API | http://localhost:4000 |
| Frontend (Vite) | http://localhost:5173 |

### Run Services Individually

```bash
# Backend only
npm run dev:server

# Frontend only
npm run dev:client
```

---

## API Reference

All endpoints are prefixed with `/api`.

### Health

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Returns server status and timestamp |

### Events (Public)

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/events` | List all events (supports query filters) |
| `GET` | `/api/events/:id` | Get a single event by ID or slug |

**Query parameters for `GET /api/events`:**

| Parameter | Type | Description |
|---|---|---|
| `category` | string | Filter by category (`conference`, `webinar`, `workshop`, `meetup`, `hackathon`) |
| `status` | string | Filter by status (`upcoming`, `ongoing`, `past`, `cancelled`) |
| `upcoming` | boolean | When `true`, returns only `upcoming` and `ongoing` events |
| `search` | string | Full-text search on title, short description, and tags |

### Registrations (Public)

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/register` | Register an attendee for an event |

**Request body:**
```json
{
  "eventId": "string (required)",
  "firstName": "string (required)",
  "lastName": "string (required)",
  "email": "string (required)",
  "company": "string (optional)",
  "jobTitle": "string (optional)",
  "dietaryRequirements": "string (optional)"
}
```

### Admin — Events

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/admin/events` | List all events |
| `POST` | `/api/admin/events` | Create a new event |
| `PUT` | `/api/admin/events/:id` | Update an event |
| `DELETE` | `/api/admin/events/:id` | Delete an event |

### Admin — Registrations

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/admin/registrations` | List all registrations |
| `GET` | `/api/admin/registrations/:eventId` | List registrations for a specific event |
| `PATCH` | `/api/admin/registrations/:id/checkin` | Check in an attendee |

### Organisation Config

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/config` | Get current organisation configuration |
| `PUT` | `/api/config` | Update organisation configuration |

---

## Frontend Routes

| Path | Description |
|---|---|
| `/` | Home — event listing |
| `/events/:id` | Event detail page |
| `/events/:id/register` | Attendee registration form |
| `/admin` | Redirects to `/admin/events` |
| `/admin/events` | Admin — manage events |
| `/admin/events/new` | Admin — create event |
| `/admin/events/:id/edit` | Admin — edit event |
| `/admin/registrations` | Admin — view registrations |
| `/admin/settings` | Admin — organisation settings |

---

## Data Models

### Event

```typescript
interface EventData {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: 'conference' | 'webinar' | 'workshop' | 'meetup' | 'hackathon';
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
  date: string;           // ISO 8601
  endDate: string;        // ISO 8601
  location: string;
  address?: string;
  isVirtual: boolean;
  virtualLink?: string;
  capacity: number;
  registeredCount: number;
  price: number;
  imageUrl: string;
  tags: string[];
  speakers: Speaker[];
  schedule: ScheduleItem[];
  createdAt: string;
}
```

### Registration

```typescript
interface Registration {
  id: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  jobTitle?: string;
  dietaryRequirements?: string;
  registeredAt: string;   // ISO 8601
  checkInTime?: string;   // ISO 8601
  status: 'confirmed' | 'waitlisted' | 'cancelled';
}
```

---

## Notes

- **Data persistence** — all data (events, registrations, organisation config) is held in memory. Restarting the server resets to the mock data defaults.
- **Authentication** — the admin routes are not protected by authentication in this demo.
