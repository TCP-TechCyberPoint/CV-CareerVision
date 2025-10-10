// file: src/llm/openai.ts
import OpenAI from "openai";
import "dotenv/config";


/**
 * Minimal OpenAI chat wrapper.
 * NOTE: Depending on your SDK version, you may prefer the Responses API.
 * This example uses Chat Completions for clarity.
 */
export const openai = new OpenAI({
  apiKey: process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY,
  // Use Google's OpenAI-compatible endpoint (no trailing slash to avoid accidental double slashes)
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
});

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function chatOnce(params: {
  messages: ReadonlyArray<ChatMessage>;
  model?: string;
  temperature?: number;
}) {
  const { messages, model = "gemini-2.5-pro", temperature = 0.3 } = params;
  // Resolve model from env or fallback
  const effectiveModel =
    process.env.MODEL || process.env.GOOGLE_CHAT_MODEL || model;

  // Convert ChatMessage[] to Responses API input schema
  // Use `input_text` blocks for Responses API (matches EasyInputMessage)
  const input = messages.map((m) => ({
    role: m.role,
    content: [
      {
        type: "input_text" as const,
        text: m.content,
      },
    ],
  }));

  // Build Chat Completions-format messages as a fallback for providers
  // that only implement the OpenAI Chat Completions compatibility.
  const chatMessages = messages.map((m) => ({ role: m.role, content: m.content }));

  try {
    const res = await openai.responses.create({
      model: effectiveModel,
      temperature,
      input,
    });

    const text = (res as any).output_text ??
      ((res as any).output?.[0]?.content?.[0]?.text ?? "");

    return { text, raw: res };
  } catch (err: any) {
    const status = err?.status;
    const data = err?.error || err?.response?.data || err?.message;
    // If the provider doesn't support Responses API on this baseURL, fallback
    if (status === 404) {
      try {
        const cc = await (openai as any).chat.completions.create({
          model: effectiveModel,
          temperature,
          messages: chatMessages,
        });
        const text = cc?.choices?.[0]?.message?.content ?? "";
        return { text, raw: cc };
      } catch (ccErr: any) {
        const cstatus = ccErr?.status;
        const cdata = ccErr?.error || ccErr?.response?.data || ccErr?.message;
        console.error("OpenAI (Gemini) chat.completions error:", { status: cstatus, data: cdata });
        throw ccErr;
      }
    }
    console.error("OpenAI (Gemini) error:", { status, data });
    throw err;
  }
}
