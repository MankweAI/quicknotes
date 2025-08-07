import express from "express";
import cors from "cors";
import helmet from "helmet";
import healthRoutes from "./routes/healthRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Routes
app.use("/health", healthRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "QuickNotes EdTech Platform API",
    version: "1.0.0",
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

export default app;


