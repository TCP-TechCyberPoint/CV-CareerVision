import { Router } from "express";
import { register, login, getToken } from "../controllers/authController";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid input or user already exists
 *       500:
 *         description: Server error
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password

 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/get-token:
 *   get:
 *     summary: Get Auth0 Management API token
 *     description: Fetches an access token from Auth0 Management API using client credentials grant type. This token can be used to access Auth0 Management API endpoints.
 *     tags: [Authentication]
 *     security: []
 *     responses:
 *       200:
 *         description: Token fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Token fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     access_token:
 *                       type: string
 *                       description: The JWT access token for Auth0 Management API
 *                       example: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjU3c05aazhGTTFDam5oV2lzX1FheSJ9..."
 *                     token_type:
 *                       type: string
 *                       example: "Bearer"
 *                     expires_in:
 *                       type: integer
 *                       description: Token expiration time in seconds
 *                       example: 86400
 *                     scope:
 *                       type: string
 *                       description: Token scope
 *                       example: "read:users update:users"
 *       500:
 *         description: Failed to fetch token from Auth0
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch token"
 *                 error:
 *                   type: string
 *                   description: Error details
 *                   example: "Network response was not ok"
 *     examples:
 *       success:
 *         summary: Successful token fetch
 *         value:
 *           success: true
 *           message: "Token fetched successfully"
 *           data:
 *             access_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjU3c05aazhGTTFDam5oV2lzX1FheSJ9.eyJpc3MiOiJodHRwczovL2Rldi02amt0bWJ5ZGtreXdnaXRpLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJndFhoRXRTTDFQTmdrQjRRSGpad0VJT2NUdUFLaUJmd0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtNmprdG1ieWRra3l3Z2l0aS51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTc1MDYwMjY5OCwiZXhwIjoxNzUwNjg5MDk4LCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJndFhoRXRTTDFQTmdrQjRRSGpad0VJT2NUdUFLaUJmdyJ9.e09WNI8b387-dZbZWr_B6RJr8Na1Zu2CKFIu9TpApOrL99RlFQ78XOu1ZyikkY30x5bpVL0hN5YdKdwXtIn5Vij1Am-gKxPFRy1sWtyjrIue1wkFmjGTmXJSDgDUx6hYklZrSOmmht970C4ywFFXx19J0FPrZwOFNqLoXwrtvO2nQovivsFYITs1hPsJ15osHLYxu6lQxh6VnDOrjCpcKGWTj9geuH2Ud41K-AVGNUgU-rC_ELCAIDYwWyagAVE1KGLgcEGZFbeFvRjww83-zDKtDON51FQdD2BIemcO3xdccPLQaHzhMHZP8ScYE4W_ym1YjMzrwZpvsYv_zivj5w"
 *             token_type: "Bearer"
 *             expires_in: 86400
 *             scope: "read:users update:users"
 *       error:
 *         summary: Error response
 *         value:
 *           success: false
 *           message: "Failed to fetch token"
 *           error: "Network response was not ok"
 */
router.get("/get-token", getToken);

export default router;
