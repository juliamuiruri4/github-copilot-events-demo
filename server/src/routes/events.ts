import { Router, Request, Response } from 'express';
import { events } from '../data/mockData';
import { Event, EventCategory } from '../types';

const router = Router();

// GET /api/events
router.get('/', (req: Request, res: Response) => {
  let result = [...events];

  const { category, status, search, upcoming } = req.query;

  if (category) {
    result = result.filter((e) => e.category === (category as EventCategory));
  }

  if (status) {
    result = result.filter((e) => e.status === status);
  }

  if (upcoming === 'true') {
    result = result.filter((e) => e.status === 'upcoming' || e.status === 'ongoing');
  }

  if (search) {
    const q = (search as string).toLowerCase();
    result = result.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.shortDescription.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Sort: upcoming first, then by date descending
  result.sort((a, b) => {
    const order = { upcoming: 0, ongoing: 1, past: 2, cancelled: 3 };
    if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  res.json(result);
});

// GET /api/events/:id
router.get('/:id', (req: Request, res: Response) => {
  const event = events.find((e) => e.id === req.params.id || e.slug === req.params.id);
  if (!event) {
    res.status(404).json({ message: 'Event not found' });
    return;
  }
  res.json(event);
});

export default router;
