// src/llm/parseCoachJson.ts
export type CoachJson = {
  score_overall: number | null;
  scores: Record<string, number> | null;
  action_items: string[] | null;
  example_snippet?: string | null;
  illegal_question_detected?: boolean | null;
  next_step?: string | null;
};

export function extractCoachJson(text: string): CoachJson | null {
  if (!text) return null;
  // Match ```COACH_JSON ... ```
  const re = /```COACH_JSON\\s*([\\s\\S]*?)```/i;
  const m = text.match(re);
  if (!m) return null;
  try {
    const obj = JSON.parse(m[1]);
    return {
      score_overall: numOrNull(obj.score_overall),
      scores: (obj.scores && typeof obj.scores === "object") ? obj.scores : null,
      action_items: Array.isArray(obj.action_items) ? obj.action_items : null,
      example_snippet: typeof obj.example_snippet === "string" ? obj.example_snippet : null,
      illegal_question_detected: boolOrNull(obj.illegal_question_detected),
      next_step: typeof obj.next_step === "string" ? obj.next_step : null
    };
  } catch {
    return null;
  }
}

function numOrNull(n: any) { return (typeof n === "number" && isFinite(n)) ? n : null; }
function boolOrNull(b: any) { return (typeof b === "boolean") ? b : null; }
