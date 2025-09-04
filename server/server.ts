import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cvRoutes from "./routes/cvRoutes"; // ✅ Import this
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { authenticateJwt } from "./middlewares/authenticateJwt";
import { ensureUser } from "./middlewares/ensureUser";

dotenv.config();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Career View API Documentation",
      version: "1.0.0",
      description: "API documentation for Career View application",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.ts"], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration using environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  "http://localhost:5173",
  "http://localhost:5174", 
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("CORS blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "x-fallback-auth"],
  })
);

app.use(express.json());

// Add error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      error: "CORS error: Origin not allowed",
      origin: req.headers.origin,
      allowedOrigins
    });
  }
  next(err);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// New protected routes with Keycloak authentication
app.get('/api/me', authenticateJwt, (req, res) => {
  res.json((req as any).auth);
});

app.post('/api/bootstrap', authenticateJwt, ensureUser, (req, res) => {
  res.sendStatus(204);
});

// Protected CV routes
app.use("/api/cv", authenticateJwt, ensureUser, cvRoutes);

mongoose
  .connect(process.env.MONGO_URI || "", {})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
