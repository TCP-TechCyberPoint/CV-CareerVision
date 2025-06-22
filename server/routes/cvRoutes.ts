import { Router, Request, Response } from "express";
import { requireAuth } from "../middlewares/auth0.middleware";
import { generateCv, getCvData, saveCvData } from "../controllers/cvController";

const router = Router();

/**
 * @swagger
 * /api/cv/me:
 *   get:
 *     summary: Get current user info
 *     tags: [CV]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User info retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.get("/me", requireAuth, (req: Request, res: Response) => {
  res.json({
    message: "User authenticated successfully",
    email: req.body.email,
    auth: req.auth
  });
});

/**
 * @swagger
 * /cv/generate:
 *   post:
 *     summary: Generate CV
 *     tags: [CV]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               formData:
 *                 type: object
 *     responses:
 *       200:
 *         description: CV generated successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.post("/generate", requireAuth, generateCv);

/**
 * @swagger
 * /api/cv/save:
 *   post:
 *     summary: Save CV data
 *     tags: [CV]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cvData
 *             properties:
 *               cvData:
 *                 type: object
 *                 description: The CV data to save
 *     responses:
 *       200:
 *         description: CV data saved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.post("/save", requireAuth, saveCvData);

/**
 * @swagger
 * /api/cv/get:
 *   get:
 *     summary: Get saved CV data
 *     tags: [CV]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: CV data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cvData:
 *                   type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: No CV data found
 *       500:
 *         description: Server error
 */
router.get("/get", requireAuth, getCvData);

export default router;
