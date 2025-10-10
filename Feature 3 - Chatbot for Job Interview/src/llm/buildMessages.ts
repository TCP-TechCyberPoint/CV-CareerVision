// file: src/llm/buildMessages.ts
import { SYSTEMPROMPT } from "./SYSTEMPROMPT.js";
import type { QuestionItem } from "../types/question";

export type CoachMode = "ExplainAndReflect" | "Drill" | "MockInterview" | "Flashcards";

export function buildMessages(args: {
  mode: CoachMode;
  item: QuestionItem;      // full JSON item (preferred)
  userDraft?: string;      // optional
  localeHint?: string;     // e.g., "he-IL" (optional)
}) {
  const { mode, item, userDraft, localeHint } = args;

  const header =
    `Mode: ${mode}\n` +
    (localeHint ? `Locale: ${localeHint}\n` : ``) +
    `Question Bank item:\n${JSON.stringify(item, null, 2)}`;

  const draftPart = userDraft ? `\n\nuser_draft_answer:\n${userDraft}` : ``;

  return [
    { role: "system", content: SYSTEMPROMPT },
    { role: "user", content: header + draftPart }
  ] as const;
}
