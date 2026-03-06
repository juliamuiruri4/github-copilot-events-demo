import express from 'express';
import cors from 'cors';
import eventsRouter from './routes/events';
import registrationsRouter from './routes/registrations';
import adminRouter from './routes/admin';
import configRouter from './routes/config';

const app = express();
const PORT = process.env.PORT || 4000;

// Parse allowed origins from the ALLOWED_ORIGINS environment variable.
// Defaults to localhost:3000 for local development.
const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean)
  : ['http://localhost:3000'];

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Requests without an Origin header (e.g. same-origin, curl) are not
      // subject to CORS and are passed through. Access control for those
      // clients should be handled separately (e.g. API keys / network rules).
      if (!origin) {
        callback(null, true);
        return;
      }
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: origin '${origin}' is not allowed`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

// Routes
app.use('/api/events', eventsRouter);
app.use('/api/register', registrationsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/config', configRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
