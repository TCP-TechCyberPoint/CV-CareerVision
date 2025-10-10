import React, { useEffect, useState } from "react";

const API_BASE = (import.meta.env.VITE_COACH_API ?? "").trim();

export default function HistoryPanel() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function loadSessions() {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`${API_BASE}/history/sessions?userId=demo`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setSessions(json.data ?? []);
    } catch (e: any) {
      setErr(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  async function openSession(id: string) {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`${API_BASE}/history/sessions/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setSelected(json.data ?? null);
    } catch (e: any) {
      setErr(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadSessions(); }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1 border rounded-2xl p-3 bg-white">
        <div className="text-sm font-medium mb-2">Sessions</div>
        {loading && <div className="text-xs text-gray-500">Loading…</div>}
        {err && <div className="text-xs text-red-600">{err}</div>}
        <ul className="space-y-2">
          {sessions.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => openSession(s.id)}
                className="w-full text-left rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-indigo-50"
              >
                {new Date(s.started_at).toLocaleString()} — {s.mode}
              </button>
            </li>
          ))}
          {sessions.length === 0 && !loading && (
            <div className="text-xs text-gray-500">
              No sessions yet. Run a coaching turn first.
            </div>
          )}
        </ul>
      </div>

      <div className="md:col-span-2 border rounded-2xl p-3 bg-white">
        {!selected ? (
          <div className="text-sm text-gray-500">Select a session to view details.</div>
        ) : (
          <div>
            <div className="text-sm font-medium mb-2">
              Details — {new Date(selected.session.started_at).toLocaleString()}
            </div>
            <div className="space-y-3">
              {selected.steps.map((st: any, i: number) => (
                <div key={st.id} className="rounded-xl border p-3">
                  <div className="text-xs text-gray-500 mb-1">
                    #{i + 1} • {new Date(st.created_at).toLocaleTimeString()}
                  </div>
                  <div className="text-sm">
                    <b>Question:</b> {st.question_id}
                    <br />
                    <b>Score:</b> {st.score_overall ?? "—"}
                  </div>
                  {Array.isArray(st.action_items_json) && st.action_items_json.length > 0 && (
                    <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                      {st.action_items_json.map((a: string, idx: number) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
                  )}
                  {st.example_snippet && (
                    <div className="mt-2 text-xs text-gray-600">
                      <b>Snippet:</b> {st.example_snippet}
                    </div>
                  )}
                </div>
              ))}
              {selected.steps.length === 0 && (
                <div className="text-xs text-gray-500">No steps recorded for this session.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
