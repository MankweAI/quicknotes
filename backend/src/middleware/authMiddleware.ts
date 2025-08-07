import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// Require authentication middleware
export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ error: "Missing token" });
    return;
  }
  const token = header.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Missing token" });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: string;
    };
    (req as any).user = payload;
    next();
    return;
  } catch {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
}

// Require role(s) middleware
export function requireRole(roles: string[]): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    next();
    return;
  };
}