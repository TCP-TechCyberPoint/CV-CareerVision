import { Router, Request, Response } from "express";
import { requireAuth } from "../middlewares/auth0.middleware";
import {
  generateCv,
  getCvData,
  saveCvData,
  uploadCvOnly,
} from "../controllers/cvController";
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
    auth: req.auth,
  });
});

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
 *     responses:
 *       200:
 *         description: CV generated successfully
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
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *               vitals:
 *                 type: object
 *               experience:
 *                 type: array
 *               education:
 *                 type: array
 *               projects:
 *                 type: array
 *               skills:
 *                 type: array
 *     responses:
 *       200:
 *         description: CV data saved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/save", requireAuth, saveCvData);

/**
 * @swagger
 * /api/cv/upload:
 *   post:
 *     summary: Upload generated CV to Cloudinary
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
 *               - vitals
 *             properties:
 *               vitals:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *     responses:
 *       200:
 *         description: CV uploaded to Cloudinary successfully
 *       400:
 *         description: Email missing or invalid
 *       500:
 *         description: Server error
 */
router.post("/upload", authMiddleware, uploadCvOnly);

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
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cv/upload:
 *   post:
 *     summary: Upload generated CV to Cloudinary
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
 *               - vitals
 *             properties:
 *               vitals:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *     responses:
 *       200:
 *         description: CV uploaded to Cloudinary successfully
 *       400:
 *         description: Email missing or invalid
 *       500:
 *         description: Server error
 */
router.post("/upload", requireAuth, uploadCvOnly);

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
 *       500:
 *         description: Server error
 */
router.get("/get", requireAuth, getCvData);

export default router;
