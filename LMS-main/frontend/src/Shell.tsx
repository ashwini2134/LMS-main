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
    <div className="mb-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 border ${
          open
            ? "bg-blue-600/15 text-blue-300 border-blue-500/30"
            : "text-slate-400 hover:bg-slate-700/50 hover:text-white border-transparent hover:border-slate-600/50"
        }`}
      >
        <svg
          className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="truncate flex-1 text-left">{course.title}</span>
      </button>

      {open && (
        <div className="ml-4 border-l border-slate-700/60 pl-3 mt-1 pb-1 space-y-1">
          {weeks === null ? (
            <p className="py-2 px-3 text-xs text-slate-500">Loading…</p>
          ) : weeks.length === 0 ? (
            <p className="py-2 px-3 text-xs text-slate-500">No problems yet</p>
          ) : (
            weeks.map(([week, probs]) => (
              <div key={week} className="mt-3 first:mt-1">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-600 px-3">
                  {week}
                </p>
                {probs.map((p) => (
                  <NavLink
                    key={p.id}
                    to={`/problem/${p.id}`}
                    className={({ isActive }) =>
                      `block truncate rounded px-3 py-2 text-xs transition-all duration-200 border ${
                        isActive
                          ? "bg-blue-600/20 text-blue-300 border-blue-500/30 font-medium"
                          : "text-slate-400 hover:text-white hover:bg-slate-700/30 border-transparent hover:border-slate-600/30"
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
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-slate-900/50 to-slate-800/30">
      {/* Sticky header */}
      <header className="flex-shrink-0 border-b border-slate-700/50 bg-slate-900/70 backdrop-blur-md z-50">
        <div className="flex h-16 items-center gap-4 px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle sidebar"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all duration-200 flex-shrink-0"
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
          <div className="flex items-center gap-4 text-sm">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/30 border border-slate-700/50">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-slate-300 truncate max-w-[160px] font-medium">
                {user?.name}
              </span>
            </div>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg bg-slate-700/50 hover:bg-slate-600/70 text-slate-300 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-200 border border-slate-600/50 hover:border-slate-500/50 whitespace-nowrap"
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
          className={`flex-shrink-0 overflow-y-auto border-r border-slate-700/50 bg-slate-900/50 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "w-64" : "w-0"
          }`}
        >
          {sidebarOpen && (
            <nav className="p-4 space-y-1 min-w-[256px]">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                      : "text-slate-400 hover:bg-slate-700/50 hover:text-white border border-transparent"
                  }`
                }
              >
                <svg
                  className="h-5 w-5 flex-shrink-0"
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

              <div className="pt-6 pb-3 px-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                  Courses
                </p>
              </div>

              {courses.length === 0 && (
                <p className="px-4 py-2 text-xs text-slate-500">Loading…</p>
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
