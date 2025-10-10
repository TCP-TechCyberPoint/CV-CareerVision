// file: src/services/getQuestionById.ts
import { QUESTION_BANK } from "../data/questionBank.js";
import type { QuestionItem } from "../types/question";

/**
 * In-memory Question fetcher for MVP.
 * Returns a single QuestionItem by id or null if not found.
 */
export async function getQuestionById(id: string): Promise<QuestionItem | null> {
  if (!id || typeof id !== "string") return null;
  const normalized = id.trim();
  const item = QUESTION_BANK.find(q => q.id === normalized);
  return item ?? null;
}

/* --- Optional: DB version with Zod (enable later) ---
// file: src/services/getQuestionById.db.ts
import { z } from "zod";
import { Pool } from "pg";

const QuestionItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  intent: z.string(),
  recommended_structure: z.array(z.string()),
  notes_for_interviewer_meaning: z.array(z.string()),
  illegal_question_flag: z.boolean()
});
export type QuestionItemDB = z.infer<typeof QuestionItemSchema>;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function getQuestionByIdDB(id: string): Promise<QuestionItemDB | null> {
  if (!id || typeof id !== "string") return null;
  const sql = `
    SELECT id, question, intent,
           recommended_structure,
           notes_for_interviewer_meaning,
           illegal_question_flag
    FROM questions
    WHERE id = $1
    LIMIT 1
  `;
  const { rows } = await pool.query(sql, [id.trim()]);
  if (!rows?.length) return null;

  const raw = rows[0];
  const value = {
    ...raw,
    recommended_structure: Array.isArray(raw.recommended_structure)
      ? raw.recommended_structure
      : JSON.parse(raw.recommended_structure),
    notes_for_interviewer_meaning: Array.isArray(raw.notes_for_interviewer_meaning)
      ? raw.notes_for_interviewer_meaning
      : JSON.parse(raw.notes_for_interviewer_meaning)
  };
  const parsed = QuestionItemSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}
*/
