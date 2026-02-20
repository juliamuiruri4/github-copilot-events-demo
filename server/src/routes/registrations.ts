import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { registrations } from '../data/mockData';
import { Registration } from '../types';

const router = Router();

// POST /api/register
router.post('/', (req: Request, res: Response) => {
  const { eventId, firstName, lastName, email, company, jobTitle, dietaryRequirements } = req.body;

  if (!eventId || !firstName || !lastName || !email) {
    res.status(400).json({ message: 'Missing required fields: eventId, firstName, lastName, email' });
    return;
  }

  const existing = registrations.find(
    (r) => r.eventId === eventId && r.email.toLowerCase() === email.toLowerCase()
  );
  if (existing) {
    res.status(409).json({ message: 'You are already registered for this event.' });
    return;
  }

  const newReg: Registration = {
    id: uuidv4(),
    eventId,
    firstName,
    lastName,
    email,
    company,
    jobTitle,
    dietaryRequirements,
    registeredAt: new Date().toISOString(),
    status: 'confirmed',
  };

  registrations.push(newReg);
  res.status(201).json(newReg);
});

export default router;
