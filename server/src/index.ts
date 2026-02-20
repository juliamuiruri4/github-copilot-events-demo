import express from 'express';
import cors from 'cors';
import eventsRouter from './routes/events';
import registrationsRouter from './routes/registrations';
import adminRouter from './routes/admin';
import configRouter from './routes/config';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
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
