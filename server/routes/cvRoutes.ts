import { Router } from "express";
import {
  generateCv,
  getCvData,
  saveCvData,
  uploadCvOnly,
} from "../controllers/cvController";
import { authenticateJwt } from "../middlewares/authenticateJwt";

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
 *     responses:
 *       200:
 *         description: CV generated successfully
 *       500:
 *         description: Server error
 */
router.post("/generate", authenticateJwt, generateCv);

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
router.post("/save", authenticateJwt, saveCvData);

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
router.post("/upload", authenticateJwt, uploadCvOnly);

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
router.get("/get", authenticateJwt, getCvData);

export default router;
