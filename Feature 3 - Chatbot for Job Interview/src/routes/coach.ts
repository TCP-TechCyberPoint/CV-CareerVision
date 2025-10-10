// src/routes/coach.ts
import { Router } from "express";
import { getQuestionById } from "../services/getQuestionById.js";
import { buildMessages } from "../llm/buildMessages.js";
import { chatOnce } from "../llm/openai.js";
import { ensureSession, addStep } from "../store/memory.js";
import { extractCoachJson } from "../llm/parseCoachJson.js";

export const coachRouter = Router();

/**
 * POST /coach/session
 * body: { userId?: string, mode: "ExplainAndReflect" | "Drill" | "MockInterview" | "Flashcards",
 *         questionId: string, userDraft?: string, localeHint?: string,
 *         company?: string, role?: string }
 */
coachRouter.post("/session", async (req, res) => {
  try {
    const {
      userId = "demo",
      mode,
      questionId,
      userDraft,
      localeHint,
      company,
      role
    } = req.body ?? {};

    if (!mode || !questionId) {
      return res.status(400).json({ ok: false, error: "mode and questionId are required" });
    }

    // Load question item (Option A: server injects full item)
    const item = await getQuestionById(questionId);
    if (!item) {
      return res.status(404).json({ ok: false, error: `Question not found: ${questionId}` });
    }

    // Create a fresh session per turn (MVP). Later: reuse sessionId from client.
    const session = ensureSession(String(userId), String(mode), company, role);

    const messages = buildMessages({ mode, item, userDraft, localeHint });
    const llm = await chatOnce({ messages });

    const text = llm.text ?? "";
    const coachJson = extractCoachJson(text);

    // Persist a step (even if JSON missing, we store nulls)
    const step = addStep({
      session_id: session.id,
      question_id: item.id,
      score_overall: coachJson?.score_overall ?? null,
      scores_json: coachJson?.scores ?? null,
      action_items_json: coachJson?.action_items ?? null,
      example_snippet: coachJson?.example_snippet ?? null
    });

    return res.json({
      ok: true,
      data: {
        session,
        step,
        assistant_text: text,
        coach_json: coachJson
      }
    });
  } catch (err: any) {
    console.error("POST /coach/session error:", err);
    return res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
});
