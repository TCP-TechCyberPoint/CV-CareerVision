import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export interface AuthenticatedRequest extends Request {
  userId?: string | jwt.JwtPayload;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;
    if (!decoded) {
      res.status(403).json({ error: "Invalid or expired token." });
      return;
    }
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
};
