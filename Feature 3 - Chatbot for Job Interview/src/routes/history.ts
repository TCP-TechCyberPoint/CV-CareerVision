// src/routes/history.ts
import { Router } from "express";
import { getSessionDetail, getSessionsByUser } from "../store/memory.js";

export const historyRouter = Router();

/** GET /history/sessions?userId=demo */
historyRouter.get("/sessions", (req, res) => {
  const userId = String(req.query.userId || "demo");
  const rows = getSessionsByUser(userId);
  res.json({ ok: true, data: rows });
});

/** GET /history/sessions/:id */
historyRouter.get("/sessions/:id", (req, res) => {
  const { id } = req.params;
  const data = getSessionDetail(id);
  if (!data.session) return res.status(404).json({ ok: false, error: "Not found" });
  res.json({ ok: true, data });
});
