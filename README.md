# GitHub Copilot Events Demo

A professional event management website built as a demo project to showcase GitHub Copilot's capabilities. The application lets organisations list events, accept registrations, and manage everything through an admin panel.

## Features

- **Browse & search events** – filter by category, keyword, and upcoming/past status
- **Event detail pages** – full descriptions, speaker profiles, schedules, and location info
- **Attendee registration** – simple registration form with duplicate-check protection
- **Admin panel** – create, edit, and delete events; view and check in registrations
- **Configurable organisation settings** – name, tagline, brand colours, contact info, and social links
- **Responsive UI** – built with Bootstrap 5 and React Bootstrap

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite, React Router |
| UI library | Bootstrap 5, React Bootstrap, React Bootstrap Icons |
| Backend | Node.js, Express 5, TypeScript |
| Dev tools | ts-node, nodemon, concurrently, ESLint |

## Project Structure

```
.
├── client/          # React frontend (Vite)
│   └── src/
│       ├── api/         # Axios API helpers
│       ├── components/  # Shared UI components (Navbar, Footer, EventCard)
│       ├── context/     # React context (ConfigContext)
│       ├── pages/       # Route-level pages (Home, EventDetail, Register, Admin)
│       └── types/       # Shared TypeScript types
└── server/          # Express backend
    └── src/
        ├── data/        # In-memory mock data
        ├── routes/      # REST API route handlers
        └── types/       # Shared TypeScript types
```

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Install all dependencies (root, server, and client)
npm run install:all
```

### Running in development

```bash
# Start both the backend (port 4000) and frontend (port 5173) together
npm run dev
```

Or start them separately:

```bash
npm run dev:server   # Express API on http://localhost:4000
npm run dev:client   # Vite dev server on http://localhost:5173
```

## API Reference

All endpoints are prefixed with `/api`.

### Health

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Returns `{ status: "ok", timestamp }` |

### Events

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/events` | List events (supports `?category=`, `?search=`, `?status=`, `?upcoming=true`) |
| GET | `/api/events/:id` | Get a single event by ID or slug |

### Registrations

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/register` | Register an attendee (`eventId`, `firstName`, `lastName`, `email` required) |

### Admin

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/events` | List all events |
| POST | `/api/admin/events` | Create a new event |
| PUT | `/api/admin/events/:id` | Update an event |
| DELETE | `/api/admin/events/:id` | Delete an event |
| GET | `/api/admin/registrations` | List all registrations |
| GET | `/api/admin/registrations/:eventId` | List registrations for a specific event |
| PATCH | `/api/admin/registrations/:id/checkin` | Mark an attendee as checked in |

### Config

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/config` | Get the current organisation config |
| PUT | `/api/config` | Update the organisation config |

## Event Categories

Events can be tagged with one of the following categories:

- `conference`
- `workshop`
- `webinar`
- `meetup`
- `hackathon`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes and open a pull request

## License

ISC
