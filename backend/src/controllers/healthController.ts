import { Request, Response } from "express";

export const healthCheck = (req: Request, res: Response) => {
  const healthData = {
    status: "OK",
    message: "QuickNotes Backend API is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
  };

  res.status(200).json(healthData);
};

