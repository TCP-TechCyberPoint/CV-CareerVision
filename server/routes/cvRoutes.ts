import { Router } from "express";
import { generateCv, getCvData } from "../controllers/cvController";
import { saveCvData } from "../controllers/cvController";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.post("/generate", authMiddleware, generateCv);
router.post("/save", authMiddleware, saveCvData);
router.get("/get", authMiddleware, getCvData);

export default router;
