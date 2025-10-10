import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HistoryPanel from "./HistoryPanel";

const API_BASE = (import.meta.env.VITE_COACH_API ?? "").trim();

const QUESTIONS = [
  { id: "q_tell_me_about_yourself", label: "Tell me about yourself" },
  { id: "q_why_leave_last_job", label: "Why did you leave your last job?" },
  { id: "q_proud_achievement", label: "Describe an achievement you are proud of" },
  { id: "q_what_matters_new_workplace", label: "What is important to you in a new workplace?" },
  { id: "q_failure_or_challenge_learning", label: "Failure/Challenge — and what you learned" },
  { id: "q_prev_manager_would_say", label: "What would your previous manager say about you?" },
  { id: "q_career_path_next_years", label: "How do you see your career path in the coming years?" },
  { id: "q_salary_expectations", label: "Salary expectations" },
  { id: "q_illegal_questions", label: "Illegal questions (meta-coaching)" }
];

const MODES = [
  { id: "ExplainAndReflect", label: "Explain & Reflect" },
  { id: "Drill", label: "Drill" },
  { id: "MockInterview", label: "Mock Interview" },
  { id: "Flashcards", label: "Flashcards" }
];

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${
        isUser ? "ml-auto bg-blue-600 text-white" : "mr-auto bg-white/90 text-gray-900 border border-gray-100"
      }`}
    >
      {children}
    </motion.div>
  );
}

const NUDGES = [
  "Nice! Try adding one measurable result.",
  "Great momentum — keep your answer under 90s.",
  "Anchor to the job description: pick one bullet and tie it in.",
  "Own the learning: one sentence on what changed after.",
  "Clarity wins: use Present → Past → Future."
];

function ProgressChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600">
      {label}
    </span>
  );
}

export default function App() {
  const [tab, setTab] = useState<"chat" | "history">("chat");
  const [mode, setMode] = useState(MODES[0].id);
  const [questionId, setQuestionId] = useState(QUESTIONS[0].id);
  const [draft, setDraft] = useState("");
  const [locale, setLocale] = useState("he-IL");

  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const selectedQuestionLabel = useMemo(
    () => QUESTIONS.find(q => q.id === questionId)?.label ?? "(unknown)",
    [questionId]
  );

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      }
    });
  };

  async function sendTurn() {
    setError("");
    if (!draft.trim()) {
      setError("Write a short draft answer first — even 2–3 sentences.");
      return;
    }
    setLoading(true);

    const userMsg = `Mode: ${mode}\nQuestion: ${selectedQuestionLabel}\n\nDraft Answer:\n${draft}`;
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);

    try {
      const res = await fetch(`${API_BASE}/coach/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, questionId, userDraft: draft, localeHint: locale })
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || `HTTP ${res.status}`);
      }
      const data = await res.json();
      const text: string = data?.data?.assistant_text ?? "";
      const randomNudge = NUDGES[Math.floor(Math.random() * NUDGES.length)];
      const assistantMsg = `${text}\n\n— ${randomNudge}`;

      setMessages(prev => [...prev, { role: "assistant", content: assistantMsg }]);
      setDraft("");
      scrollToBottom();
    } catch (e: any) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white text-gray-900">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-indigo-100">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-indigo-600" />
            <div>
              <h1 className="text-lg font-semibold">Interview Coach — MVP</h1>
              <p className="text-xs text-gray-500">Practice. Improve. Land the role.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab("chat")}
              className={`rounded-xl px-3 py-1 text-sm ${tab === "chat" ? "bg-indigo-600 text-white" : "bg-white border"}`}
            >
              Chat
            </button>
            <button
              onClick={() => setTab("history")}
              className={`rounded-xl px-3 py-1 text-sm ${tab === "history" ? "bg-indigo-600 text-white" : "bg-white border"}`}
            >
              History
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pt-6 pb-24">
        {tab === "history" ? (
          <HistoryPanel />
        ) : (
          <>
            {/* Controls */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium mb-1">Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  {MODES.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id)}
                      className={`rounded-xl border px-3 py-2 text-sm hover:shadow-sm transition ${
                        mode === m.id ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-white"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium mb-1">Question</label>
                <select
                  value={questionId}
                  onChange={e => setQuestionId(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  {QUESTIONS.map(q => (
                    <option key={q.id} value={q.id}>
                      {q.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium mb-1">Locale hint</label>
                <input
                  value={locale}
                  onChange={e => setLocale(e.target.value)}
                  placeholder="he-IL"
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
            </section>

            {/* Chat panel */}
            <section className="mt-6 rounded-3xl border border-gray-200 bg-white/80 shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 px-4 py-3 flex items-center justify-between bg-gradient-to-r from-white to-indigo-50">
                <div className="text-sm text-gray-600">
                  Question: <span className="font-medium text-gray-900">{selectedQuestionLabel}</span>
                </div>
                <div className="text-xs text-gray-500">Tip: keep answers around 60–120s</div>
              </div>

              <div ref={scrollRef} className="h-[46vh] overflow-y-auto px-4 py-4 space-y-3">
                <AnimatePresence initial={false}>
                  {messages.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-gray-500">
                      Start by drafting your answer below. The coach will explain the intent, score your response, and
                      give 3–5 action items.
                    </motion.div>
                  )}
                  {messages.map((m, idx) => (
                    <Bubble key={idx} role={m.role}>
                      {m.content}
                    </Bubble>
                  ))}
                </AnimatePresence>
              </div>

              <div className="border-t border-gray-100 p-3 bg-white">
                <div className="rounded-2xl border border-gray-200 p-2">
                  <textarea
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    rows={4}
                    placeholder={
                      "Type your draft here…\nTip: Include one metric/result if possible (e.g., ‘cut response time by 32% in 3 months’)."
                    }
                    className="w-full resize-none rounded-xl px-3 py-2 text-sm outline-none"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-xs text-gray-500">Be concise. Focus on structure and impact.</div>
                    <button
                      onClick={sendTurn}
                      disabled={loading}
                      className={`rounded-xl px-4 py-2 text-sm font-medium text-white shadow-sm transition ${
                        loading ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                    >
                      {loading ? "Coaching…" : "Get Feedback"}
                    </button>
                  </div>
                </div>
                {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
              </div>
            </section>

            <section className="mt-6 flex flex-wrap items-center gap-2 text-xs text-gray-600">
              <ProgressChip label="Practice daily" />
              <ProgressChip label="Aim for score ≥ 4" />
              <ProgressChip label="Add one metric" />
              <ProgressChip label="Tie to JD" />
            </section>
          </>
        )}
      </main>

      <footer className="py-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Interview Coach — MVP
      </footer>
    </div>
  );
}
