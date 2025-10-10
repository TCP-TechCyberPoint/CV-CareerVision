// src/server.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { coachRouter } from "./routes/coach.js";
import { historyRouter } from "./routes/history.js";

const app = express();

// Resolve static folder (after build it will be dist/public)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STATIC_DIR = path.resolve(__dirname, "public");

// ✅ CORS must be BEFORE routes
app.use(cors({
  origin: process.env.WEB_ORIGIN || true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: false
}));
// Handle preflight quickly
app.options("*", cors());

app.use(express.json());

// Serve built UI if present
app.use(express.static(STATIC_DIR));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/coach", coachRouter);
app.use("/history", historyRouter);

// SPA fallback to index.html for unknown routes (but not API routes)
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/coach") || req.path.startsWith("/history") || req.path.startsWith("/health")) {
    return next();
  }
  res.sendFile(path.join(STATIC_DIR, "index.html"), (err) => {
    if (err) next();
  });
});

const PORT = Number(process.env.PORT ?? 8000);
app.listen(PORT, () => {
  console.log(`Interview Coach API listening on http://localhost:${PORT}`);
});
