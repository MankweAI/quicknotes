import { Router } from "express";
import { getProfile } from "../controllers/userController";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

router.get("/me", requireAuth, getProfile);

export default router;

