import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import { api, type Course, type ProblemSummary } from "./api";

function groupByWeek(problems: ProblemSummary[]): [string, ProblemSummary[]][] {
  const map = new Map<string, ProblemSummary[]>();
  for (const p of problems) {
    const list = map.get(p.week_label) ?? [];
    list.push(p);
    map.set(p.week_label, list);
  }
  return [...map.entries()];
}

function CourseNavItem({
  course,
  autoExpand,
}: {
  course: Course;
  autoExpand: boolean;
}) {
  const [open, setOpen] = useState(autoExpand);
  const [problems, setProblems] = useState<ProblemSummary[] | null>(null);

  useEffect(() => {
    if (autoExpand) setOpen(true);
  }, [autoExpand]);

  useEffect(() => {
    if (open && problems === null) {
      api
        .courseProblems(course.slug)
        .then(setProblems)
        .catch(() => setProblems([]));
    }
  }, [open, course.slug, problems]);

  const weeks = problems ? groupByWeek(problems) : null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors text-left ${
          autoExpand
            ? "bg-blue-600/15 text-blue-300"
            : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
        }`}
      >
        <svg
          className={`h-3 w-3 flex-shrink-0 transition-transform duration-150 ${open ? "rotate-90" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="truncate font-medium leading-snug">{course.title}</span>
      </button>

      {open && (
        <div className="ml-5 border-l border-slate-700/60 pl-3 mt-0.5 pb-1">
          {weeks === null ? (
            <p className="py-1.5 text-xs text-slate-500">Loading…</p>
          ) : weeks.length === 0 ? (
            <p className="py-1.5 text-xs text-slate-500">No problems yet</p>
          ) : (
            weeks.map(([week, probs]) => (
              <div key={week} className="mt-2">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500 px-1">
                  {week}
                </p>
                {probs.map((p) => (
                  <NavLink
                    key={p.id}
                    to={`/problem/${p.id}`}
                    className={({ isActive }) =>
                      `block truncate rounded px-2 py-1 text-xs transition-colors ${
                        isActive
                          ? "bg-blue-600/25 text-blue-300 font-medium"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                      }`
                    }
                  >
                    {p.title}
                  </NavLink>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function Logo() {
  return (
    <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
      <img
        src={`${import.meta.env.BASE_URL}logo.svg`}
        alt="Fraylon Academy"
        className="h-8 w-auto max-w-[180px] object-contain"
      />
    </NavLink>
  );
}

export default function Shell() {
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const courseMatch = location.pathname.match(/\/course\/([^/]+)/);
  const activeCourseSlug = courseMatch?.[1] ?? null;

  useEffect(() => {
    api.courses().then(setCourses).catch(() => {});
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Sticky header */}
      <header className="flex-shrink-0 border-b border-[var(--color-fa-border)] bg-[var(--color-fa-surface)]/90 backdrop-blur-md z-50">
        <div className="flex h-14 items-center gap-3 px-4">
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle sidebar"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors flex-shrink-0"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Logo />
          <div className="flex-1" />
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:block text-slate-300 truncate max-w-[160px]">
              {user?.name}
            </span>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Body: sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`flex-shrink-0 overflow-y-auto border-r border-[var(--color-fa-border)] bg-[var(--color-fa-surface)]/50 transition-[width] duration-200 ease-in-out ${
            sidebarOpen ? "w-60" : "w-0"
          }`}
        >
          {sidebarOpen && (
            <nav className="p-2 space-y-0.5 min-w-[240px]">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-blue-600/15 text-blue-300"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  }`
                }
              >
                <svg
                  className="h-4 w-4 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard
              </NavLink>

              <div className="pt-4 pb-1.5 px-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                  Courses
                </p>
              </div>

              {courses.length === 0 && (
                <p className="px-3 text-xs text-slate-500">Loading…</p>
              )}
              {courses.map((course) => (
                <CourseNavItem
                  key={course.id}
                  course={course}
                  autoExpand={course.slug === activeCourseSlug}
                />
              ))}
            </nav>
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
