import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, type ChatMsg, type ProblemDetail, type Submission } from "../api";
import { Badge, Button, Spinner } from "../components";

const DIFFICULTY_STYLES: Record<string, { bg: string; text: string; badge: string }> = {
  Easy: {
    bg: "bg-green-900/20",
    text: "text-green-400",
    badge: "bg-green-900/30 text-green-300 border-green-700/50",
  },
  Medium: {
    bg: "bg-amber-900/20",
    text: "text-amber-400",
    badge: "bg-amber-900/30 text-amber-300 border-amber-700/50",
  },
  Hard: {
    bg: "bg-red-900/20",
    text: "text-red-400",
    badge: "bg-red-900/30 text-red-300 border-red-700/50",
  },
};

type TabType = "description" | "chat";

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
  const [activeTab, setActiveTab] = useState<TabType>("description");
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
    return <div className="p-8 text-red-400">Invalid problem ID</div>;
  if (loadErr && !problem)
    return <div className="p-8 text-red-400">{loadErr}</div>;
  if (!problem)
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900">
        <Spinner size="lg" className="text-blue-500" />
      </div>
    );

  const difficulty = problem.difficulty;
  const diffStyle = difficulty ? DIFFICULTY_STYLES[difficulty] : null;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-slate-900">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-slate-700/50 bg-slate-800/50 px-4 md:px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              to={`/course/${problem.course_slug}`}
              className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
            <span className="hidden sm:block text-slate-600">·</span>
            <h1 className="text-lg md:text-xl font-bold text-white">{problem.title}</h1>
            {diffStyle && (
              <Badge variant="info" className={`${diffStyle.badge}`}>
                {difficulty}
              </Badge>
            )}
          </div>
          <div className="text-sm text-slate-400">{problem.week_label}</div>
        </div>
      </div>

      {/* Mobile/Tablet Tabs */}
      <div className="flex-shrink-0 border-b border-slate-700/50 bg-slate-800/20 lg:hidden">
        <div className="flex items-center gap-1 px-4">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "description"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-300"
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors relative ${
              activeTab === "chat"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-300"
            }`}
          >
            Mentor Chat
            {messages.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar - Description */}
        <div className="hidden lg:flex w-80 flex-shrink-0 flex-col overflow-y-auto border-r border-slate-700/50 bg-slate-800/30">
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                Description
              </h2>
              <div className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">
                {problem.description}
              </div>
            </div>

            {problem.check50_slug && (
              <div className="rounded-lg border border-slate-700/50 bg-slate-900/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                  check50 slug
                </p>
                <code className="break-all text-xs text-slate-400 font-mono">{problem.check50_slug}</code>
              </div>
            )}

            {problem.common_mistakes && problem.common_mistakes.length > 0 && (
              <details className="rounded-lg border border-slate-700/50 bg-slate-900/40 p-4 cursor-pointer group">
                <summary className="text-xs font-semibold uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">
                  ⚠️ Common Mistakes ({problem.common_mistakes.length})
                </summary>
                <ul className="mt-3 space-y-2">
                  {problem.common_mistakes.map((m, i) => (
                    <li key={i} className="text-xs leading-relaxed text-slate-400">
                      • {m}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        </div>

        {/* Mobile/Tablet sidebar - Description */}
        {activeTab === "description" && (
          <div className="flex-1 lg:hidden overflow-y-auto border-r border-slate-700/50">
            <div className="p-4 md:p-6 space-y-6">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                  Description
                </h2>
                <div className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">
                  {problem.description}
                </div>
              </div>

              {problem.check50_slug && (
                <div className="rounded-lg border border-slate-700/50 bg-slate-900/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                    check50 slug
                  </p>
                  <code className="break-all text-xs text-slate-400 font-mono">{problem.check50_slug}</code>
                </div>
              )}

              {problem.common_mistakes && problem.common_mistakes.length > 0 && (
                <details className="rounded-lg border border-slate-700/50 bg-slate-900/40 p-4 cursor-pointer group">
                  <summary className="text-xs font-semibold uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">
                    ⚠️ Common Mistakes ({problem.common_mistakes.length})
                  </summary>
                  <ul className="mt-3 space-y-2">
                    {problem.common_mistakes.map((m, i) => (
                      <li key={i} className="text-xs leading-relaxed text-slate-400">
                        • {m}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          </div>
        )}

        {/* Main editor + chat column */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Editor section */}
          <div className="flex flex-col min-h-0 flex-1">
            {/* Toolbar */}
            <div className="flex-shrink-0 flex items-center justify-between border-b border-slate-700/50 bg-slate-800/40 px-4 py-3 gap-3">
              <span className="font-mono text-xs text-slate-400">solution.py</span>
              <div className="flex items-center gap-2 ml-auto">
                <span className="hidden sm:block text-xs text-slate-500">
                  Ctrl+Enter to submit
                </span>
                <Button
                  onClick={onSubmitCode}
                  isLoading={submitBusy}
                  disabled={submitBusy}
                  variant="primary"
                  size="sm"
                >
                  Submit
                </Button>
              </div>
            </div>

            {/* Code editor */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={onCodeKeyDown}
              spellCheck={false}
              className="flex-1 resize-none bg-slate-950 p-4 font-mono text-sm leading-relaxed text-slate-200 outline-none overflow-auto caret-blue-400 min-h-0"
              style={{ tabSize: 4 }}
            />

            {/* Submission results */}
            {submission && (
              <div className="flex-shrink-0 border-t border-slate-700/50 bg-slate-800/50 p-4">
                <p
                  className={`mb-3 flex items-center gap-2 text-sm font-semibold ${
                    submission.passed ? "text-green-400" : "text-amber-400"
                  }`}
                >
                  <span>{submission.passed ? "✓" : "✗"}</span>
                  <span>{submission.passed ? "Checks passed" : "Checks failed"}</span>
                </p>
                <pre className="rounded-lg bg-slate-900/80 p-3 font-mono text-xs leading-relaxed text-slate-300 overflow-auto max-h-48 border border-slate-700/50">
                  {submission.output || "(no output)"}
                </pre>
              </div>
            )}
          </div>

          {/* Mobile/Tablet chat tab */}
          {activeTab === "chat" && (
            <div className="flex-shrink-0 lg:hidden border-t border-slate-700/50 flex flex-col min-h-96 max-h-96 bg-slate-800/30">
              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && !chatBusy && (
                  <p className="text-xs leading-relaxed text-slate-500">
                    Ask Fraylon Mentor about your approach or a concept. Your code is shared as context.
                  </p>
                )}
                {messages.map((m, i) => (
                  <div
                    key={`${m.created_at}-${i}`}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-xs ${
                        m.role === "user"
                          ? "bg-blue-600/30 text-slate-100"
                          : "bg-slate-700/50 text-slate-200"
                      }`}
                    >
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        {m.role === "user" ? "You" : "Mentor"}
                      </div>
                      <div className="whitespace-pre-wrap break-words leading-relaxed">
                        {m.content}
                      </div>
                    </div>
                  </div>
                ))}
                {chatBusy && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700/50 px-3 py-2 rounded-lg text-xs text-slate-400">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        Mentor
                      </div>
                      <Spinner size="sm" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat input */}
              {chatErr && (
                <div className="border-t border-red-900/40 px-4 py-2 text-xs text-red-400">{chatErr}</div>
              )}
              <div className="border-t border-slate-700/50 p-3 bg-slate-800/50 flex gap-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && (e.preventDefault(), onSendChat())
                  }
                  placeholder="Ask mentor…"
                  className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-white outline-none focus:border-blue-500 transition-colors"
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onSendChat}
                  isLoading={chatBusy}
                  disabled={chatBusy}
                >
                  Send
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop sidebar - Chat */}
        <div className="hidden lg:flex w-80 flex-shrink-0 flex-col border-l border-slate-700/50 bg-slate-800/30">
          <div className="flex-shrink-0 border-b border-slate-700/50 px-4 py-3">
            <h2 className="text-sm font-semibold text-white">Fraylon Mentor</h2>
            <p className="mt-0.5 text-xs text-slate-500">Socratic tutor — guides, never solves</p>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && !chatBusy && (
              <p className="text-xs leading-relaxed text-slate-500">
                Ask about your approach or a concept. Your code is shared as context.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={`${m.created_at}-${i}`}
                className={`rounded-lg px-3 py-2 text-xs ${
                  m.role === "user"
                    ? "ml-2 bg-blue-600/30 text-slate-100"
                    : "mr-2 bg-slate-700/50 text-slate-200"
                }`}
              >
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {m.role === "user" ? "You" : "Mentor"}
                </span>
                <div className="whitespace-pre-wrap break-words leading-relaxed">{m.content}</div>
              </div>
            ))}
            {chatBusy && (
              <div className="mr-2 rounded-lg bg-slate-700/50 px-3 py-2 text-xs text-slate-400">
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Mentor
                </span>
                <Spinner size="sm" />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat input */}
          {chatErr && (
            <p className="flex-shrink-0 border-t border-red-900/40 px-4 py-2 text-xs text-red-400">
              {chatErr}
            </p>
          )}
          <div className="flex-shrink-0 flex gap-2 border-t border-slate-700/50 p-3 bg-slate-800/20">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && (e.preventDefault(), onSendChat())
              }
              placeholder="Ask mentor…"
              className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-white outline-none focus:border-blue-500 transition-colors"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={onSendChat}
              isLoading={chatBusy}
              disabled={chatBusy}
              className="flex-shrink-0"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
