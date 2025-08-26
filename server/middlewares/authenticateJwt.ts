import { verifyAccessToken } from '../auth/jwt';
import type { Request, Response, NextFunction } from 'express';

export async function authenticateJwt(req: Request, res: Response, next: NextFunction) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : '';
  if (!token) return res.status(401).json({ error: 'Missing token' });

  try {
    const p: any = await verifyAccessToken(token);
    (req as any).auth = {
      userId: p.sub,
      email: p.email,
      username: p.preferred_username,
      roles: p.realm_access?.roles || [],
    };
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

