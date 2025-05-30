import { Router } from "express";
import { registerUser, loginUser, validateToken } from "../controllers/authController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/validate", validateToken);

export default router;

