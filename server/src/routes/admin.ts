import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { events, registrations } from '../data/mockData';
import { Event } from '../types';

const router = Router();

// GET /api/admin/events
router.get('/events', (_req: Request, res: Response) => {
  res.json(events);
});

// POST /api/admin/events
router.post('/events', (req: Request, res: Response) => {
  const body = req.body as Partial<Event>;

  if (!body.title || !body.date || !body.category) {
    res.status(400).json({ message: 'Missing required fields: title, date, category' });
    return;
  }

  const newEvent: Event = {
    id: uuidv4(),
    title: body.title,
    slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    description: body.description || '',
    shortDescription: body.shortDescription || '',
    category: body.category,
    status: body.status || 'upcoming',
    date: body.date,
    endDate: body.endDate || body.date,
    location: body.location || 'TBD',
    address: body.address,
    isVirtual: body.isVirtual || false,
    virtualLink: body.virtualLink,
    capacity: body.capacity || 100,
    registeredCount: 0,
    price: body.price || 0,
    imageUrl:
      body.imageUrl ||
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    tags: body.tags || [],
    speakers: body.speakers || [],
    schedule: body.schedule || [],
    createdAt: new Date().toISOString(),
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});

// PUT /api/admin/events/:id
router.put('/events/:id', (req: Request, res: Response) => {
  const idx = events.findIndex((e) => e.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ message: 'Event not found' });
    return;
  }
  events[idx] = { ...events[idx], ...req.body, id: events[idx].id };
  res.json(events[idx]);
});

// DELETE /api/admin/events/:id
router.delete('/events/:id', (req: Request, res: Response) => {
  const idx = events.findIndex((e) => e.id === req.params.id);
  if (idx === -1) {
    res.status(404).json({ message: 'Event not found' });
    return;
  }
  events.splice(idx, 1);
  res.status(204).send();
});

// GET /api/admin/registrations
router.get('/registrations', (_req: Request, res: Response) => {
  res.json(registrations);
});

// GET /api/admin/registrations/:eventId
router.get('/registrations/:eventId', (req: Request, res: Response) => {
  const result = registrations.filter((r) => r.eventId === req.params.eventId);
  res.json(result);
});

// PATCH /api/admin/registrations/:id/checkin
router.patch('/registrations/:id/checkin', (req: Request, res: Response) => {
  const reg = registrations.find((r) => r.id === req.params.id);
  if (!reg) {
    res.status(404).json({ message: 'Registration not found' });
    return;
  }
  reg.checkInTime = new Date().toISOString();
  res.json(reg);
});

export default router;
