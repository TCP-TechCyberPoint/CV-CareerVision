import { Router } from "express";
import { generateCv, getCvData, saveCvData } from "../controllers/cvController";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/cv/generate:
 *   post:
 *     summary: Generate a new CV
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
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: The prompt to generate the CV
 *     responses:
 *       200:
 *         description: CV generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cvData:
 *                   type: object
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.post("/generate", authMiddleware, generateCv);

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
router.post("/save", authMiddleware, saveCvData);

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
router.get("/get", authMiddleware, getCvData);

export default router;
