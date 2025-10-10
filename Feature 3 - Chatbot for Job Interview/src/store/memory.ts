// src/store/memory.ts
import { randomUUID } from "crypto";

export type Step = {
  id: string;
  session_id: string;
  question_id: string;
  score_overall: number | null;
  scores_json: Record<string, number> | null;
  action_items_json: string[] | null;
  example_snippet?: string | null;
  created_at: number; // epoch ms
};

export type Session = {
  id: string;
  user_id: string;       // for MVP: 'demo' or from auth
  mode: string;
  company?: string;
  role?: string;
  started_at: number;
};

export const DB = {
  sessions: [] as Session[],
  steps: [] as Step[],
};

export function ensureSession(userId: string, mode: string, company?: string, role?: string) {
  // MVP heuristic: create a new session per call
  const s: Session = {
    id: randomUUID(),
    user_id: userId,
    mode,
    company,
    role,
    started_at: Date.now(),
  };
  DB.sessions.push(s);
  return s;
}

export function addStep(payload: Omit<Step, "id" | "created_at">) {
  const st: Step = { id: randomUUID(), created_at: Date.now(), ...payload };
  DB.steps.push(st);
  return st;
}

export function getSessionsByUser(userId: string) {
  return DB.sessions
    .filter(s => s.user_id === userId)
    .sort((a,b) => b.started_at - a.started_at);
}

export function getSessionDetail(sessionId: string) {
  const session = DB.sessions.find(s => s.id === sessionId) || null;
  const steps = DB.steps
    .filter(st => st.session_id === sessionId)
    .sort((a,b) => a.created_at - b.created_at);
  return { session, steps };
}
