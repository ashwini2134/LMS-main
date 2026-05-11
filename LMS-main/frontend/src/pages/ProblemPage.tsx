import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, type ChatMsg, type ProblemDetail, type Submission } from "../api";

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Hard: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function ProblemPage() {
  const { id } = useParams<{ id: string }>();
  const pid = Number(id);

  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [code, setCode] = useState("# Your solution\n");
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [chatErr, setChatErr] = useState<string | null>(null);
  const [chatBusy, setChatBusy] = useState(false);
  const [submitBusy, setSubmitBusy] = useState(false);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!Number.isFinite(pid)) return;
    api
      .problem(pid)
      .then((p) => {
        setProblem(p);
        setCode(`# ${p.title}\n\n`);
      })
      .catch((e: Error) => setLoadErr(e.message));
  }, [pid]);

  useEffect(() => {
    if (!Number.isFinite(pid)) return;
    api.chatHistory(pid).then(setMessages).catch(() => setMessages([]));
  }, [pid]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function onSubmitCode() {
    if (!problem || submitBusy) return;
    setSubmitBusy(true);
    try {
      const s = await api.submit(problem.id, code);
      setSubmission(s);
    } catch (e) {
      setLoadErr(e instanceof Error ? e.message : "Submit failed");
    } finally {
      setSubmitBusy(false);
    }
  }

  async function onSendChat() {
    if (!problem || !chatInput.trim() || chatBusy) return;
    setChatErr(null);
    const userText = chatInput.trim();
    setChatInput("");
    const optimistic: ChatMsg = {
      role: "user",
      content: userText,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    setChatBusy(true);
    try {
      await api.chat(problem.id, userText, code);
      const hist = await api.chatHistory(problem.id);
      setMessages(hist);
    } catch (e) {
      setChatErr(e instanceof Error ? e.message : "Chat failed");
      setMessages((prev) => prev.filter((m) => m !== optimistic));
    } finally {
      setChatBusy(false);
    }
  }

  function onCodeKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Ctrl/Cmd+Enter → submit
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      onSubmitCode();
      return;
    }
    // Tab → 4 spaces
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const next = ta.value.substring(0, start) + "    " + ta.value.substring(end);
      setCode(next);
      setTimeout(() => {
        ta.selectionStart = ta.selectionEnd = start + 4;
      }, 0);
      return;
    }
    // Enter → preserve indentation
    if (e.key === "Enter") {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const before = ta.value.substring(0, start);
      const after = ta.value.substring(ta.selectionEnd);
      const indent = (before.split("\n").pop() ?? "").match(/^(\s*)/)?.[1] ?? "";
      setCode(before + "\n" + indent + after);
      setTimeout(() => {
        ta.selectionStart = ta.selectionEnd = start + 1 + indent.length;
      }, 0);
    }
  }

  if (!Number.isFinite(pid))
    return <p className="p-8 text-red-400">Invalid problem ID</p>;
  if (loadErr && !problem)
    return <p className="p-8 text-red-400">{loadErr}</p>;
  if (!problem)
    return <p className="p-8 text-slate-400">Loading…</p>;

  const difficulty = problem.difficulty;
  const diffClass = difficulty
    ? (DIFFICULTY_STYLES[difficulty] ?? "bg-slate-500/20 text-slate-400 border-slate-500/30")
    : null;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Problem header bar */}
      <div className="flex-shrink-0 border-b border-[var(--color-fa-border)] bg-[var(--color-fa-surface)]/40 px-5 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={`/course/${problem.course_slug}`}
            className="text-xs text-slate-500 hover:text-blue-400 transition-colors flex-shrink-0"
          >
            ← Course
          </Link>
          <h1 className="text-base font-semibold text-white">{problem.title}</h1>
          {diffClass && difficulty && (
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${diffClass}`}
            >
              {difficulty}
            </span>
          )}
          <span className="text-xs text-slate-500">{problem.week_label}</span>
        </div>
      </div>

      {/* Three-panel body */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Panel 1: Description ── */}
        <div className="hidden lg:flex w-[320px] flex-shrink-0 flex-col overflow-y-auto border-r border-[var(--color-fa-border)]">
          <div className="p-5">
            <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Description
            </h2>
            <div className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">
              {problem.description}
            </div>
            <div className="mt-5 rounded-lg border border-slate-700/50 bg-slate-900/40 p-3">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                check50 slug
              </p>
              <code className="break-all text-xs text-slate-400">
                {problem.check50_slug}
              </code>
            </div>
            {problem.common_mistakes && problem.common_mistakes.length > 0 && (
              <details className="mt-4 rounded-lg border border-slate-700/50 bg-slate-900/40">
                <summary className="cursor-pointer select-none px-3 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors">
                  Common Mistakes ({problem.common_mistakes.length})
                </summary>
                <ul className="px-3 pb-3 pt-1 space-y-1.5">
                  {problem.common_mistakes.map((m, i) => (
                    <li key={i} className="flex gap-2 text-xs leading-relaxed text-slate-400">
                      <span className="mt-0.5 flex-shrink-0 text-amber-500">&#x26A0;</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        </div>

        {/* ── Panel 2: Editor + Results ── */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Mobile description toggle */}
          <details className="lg:hidden flex-shrink-0 border-b border-[var(--color-fa-border)] bg-[var(--color-fa-surface)]/30">
            <summary className="cursor-pointer select-none px-4 py-2.5 text-xs text-slate-400 hover:text-white">
              Problem description ▾
            </summary>
            <div className="px-4 pb-2 text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">
              {problem.description}
            </div>
            {problem.common_mistakes && problem.common_mistakes.length > 0 && (
              <div className="px-4 pb-4">
                <details className="rounded-lg border border-slate-700/50 bg-slate-900/40">
                  <summary className="cursor-pointer select-none px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors">
                    Common Mistakes ({problem.common_mistakes.length})
                  </summary>
                  <ul className="px-3 pb-3 pt-1 space-y-1.5">
                    {problem.common_mistakes.map((m, i) => (
                      <li key={i} className="flex gap-2 text-xs leading-relaxed text-slate-400">
                        <span className="mt-0.5 flex-shrink-0 text-amber-500">&#x26A0;</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            )}
          </details>

          {/* Editor toolbar */}
          <div className="flex-shrink-0 flex items-center justify-between border-b border-[var(--color-fa-border)] bg-[var(--color-fa-surface)]/30 px-4 py-2">
            <span className="font-mono text-xs text-slate-500">solution.py</span>
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-[10px] text-slate-600">
                Ctrl+Enter to submit · Tab to indent
              </span>
              <button
                type="button"
                onClick={onSubmitCode}
                disabled={submitBusy}
                className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 disabled:opacity-50 transition-colors"
              >
                {submitBusy ? "Running…" : "Submit"}
              </button>
            </div>
          </div>

          {/* Code textarea */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={onCodeKeyDown}
            spellCheck={false}
            className="flex-1 resize-none bg-[#080c18] p-4 font-mono text-sm leading-relaxed text-slate-200 outline-none min-h-0 overflow-auto caret-blue-400"
            style={{ tabSize: 4 }}
          />

          {/* Submission results */}
          {submission && (
            <div className="flex-shrink-0 border-t border-[var(--color-fa-border)] bg-[var(--color-fa-surface)]/40 p-4">
              <p
                className={`mb-2 flex items-center gap-2 text-sm font-semibold ${
                  submission.passed ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                <span>{submission.passed ? "✓" : "✗"}</span>
                <span>{submission.passed ? "Checks passed" : "Checks failed"}</span>
              </p>
              <pre className="max-h-36 overflow-auto rounded-lg bg-slate-900/70 p-3 font-mono text-xs leading-relaxed text-slate-400">
                {submission.output || "(no output)"}
              </pre>
            </div>
          )}
        </div>

        {/* ── Panel 3: Mentor chat ── */}
        <div className="hidden md:flex w-[280px] flex-shrink-0 flex-col border-l border-[var(--color-fa-border)]">
          <div className="flex-shrink-0 border-b border-[var(--color-fa-border)] px-4 py-3">
            <h2 className="text-sm font-semibold text-white">Fraylon Mentor</h2>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Socratic tutor — guides you, never solves
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.length === 0 && !chatBusy && (
              <p className="px-1 py-2 text-xs leading-relaxed text-slate-500">
                Ask about your approach or a concept. Your current code is shared as context.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={`${m.created_at}-${i}`}
                className={`rounded-lg px-3 py-2 text-xs ${
                  m.role === "user"
                    ? "ml-4 bg-blue-900/40 text-slate-200"
                    : "mr-4 bg-slate-800/80 text-slate-200"
                }`}
              >
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  {m.role === "user" ? "You" : "Mentor"}
                </span>
                <div className="whitespace-pre-wrap break-words leading-relaxed">
                  {m.content}
                </div>
              </div>
            ))}
            {chatBusy && (
              <div className="mr-4 rounded-lg bg-slate-800/80 px-3 py-2 text-xs text-slate-400">
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Mentor
                </span>
                Thinking…
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {chatErr && (
            <p className="flex-shrink-0 border-t border-red-900/40 px-4 py-2 text-xs text-red-400">
              {chatErr}
            </p>
          )}

          <div className="flex-shrink-0 flex gap-2 border-t border-[var(--color-fa-border)] p-3">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && (e.preventDefault(), onSendChat())
              }
              placeholder="Ask the mentor…"
              className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-white outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="button"
              disabled={chatBusy}
              onClick={onSendChat}
              className="flex-shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
