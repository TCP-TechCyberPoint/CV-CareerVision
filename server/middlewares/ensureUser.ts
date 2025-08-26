import type { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export async function ensureUser(req: Request, res: Response, next: NextFunction) {
  const auth = (req as any).auth;
  if (!auth?.userId) return res.status(401).json({ error: 'No auth' });

  try {
    await User.updateOne(
      { keycloakId: auth.userId },
      {
        $setOnInsert: {
          keycloakId: auth.userId,
          email: auth.email ?? undefined,
        },
      },
      { upsert: true }
    );
  } catch (err: any) {
    // If email is already taken by another record, ignore and proceed without changing it
    if (!(err?.code === 11000 && err?.keyPattern?.email)) {
      return next(err);
    }
  }

  next();
}
