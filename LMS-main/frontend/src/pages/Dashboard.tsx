import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, type Course } from "../api";

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    api
      .courses()
      .then(setCourses)
      .catch((e: Error) => setErr(e.message));
  }, []);

  if (err) return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="rounded-lg bg-red-500/10 border border-red-500/50 px-6 py-4 text-red-300 max-w-md">
        {err}
      </div>
    </div>
  );
  
  if (!courses) return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-slate-400">Loading courses…</p>
      </div>
    </div>
  );

  return (
    <div className="w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Explore Courses</h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Learn computer science with Harvard's <strong className="text-slate-300">CS50</strong> curriculum. 
            Get guided help through every problem with <strong className="text-slate-300">Fraylon Mentor</strong>.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
          {courses.map((c) => (
            <Link
              key={c.id}
              to={`/course/${c.slug}`}
              className="group relative"
            >
              {/* Card Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              
              {/* Card */}
              <div className="relative rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/40 to-slate-800/20 p-8 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-500/50 group-hover:from-slate-900/60 group-hover:to-slate-800/40 group-hover:shadow-2xl">
                
                {/* Course Icon */}
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.228 6.228 2 10.692 2 16s4.228 9.772 10 9.772 10-4.692 10-9.772c0-5.308-4.228-9.747-10-9.747z" />
                  </svg>
                </div>

                {/* Content */}
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {c.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {c.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors flex items-center gap-2">
                    Explore course
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
