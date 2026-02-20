import { Router, Request, Response } from 'express';
import { getConfig, updateConfig } from '../config';

const router = Router();

// GET /api/config
router.get('/', (_req: Request, res: Response) => {
  res.json(getConfig());
});

// PUT /api/config
router.put('/', (req: Request, res: Response) => {
  const updated = updateConfig(req.body);
  res.json(updated);
});

export default router;
