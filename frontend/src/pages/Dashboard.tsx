import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, type Course } from "../api";
import { PageHeader, Card, LoadingCard, Spinner } from "../components";

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    api
      .courses()
      .then(setCourses)
      .catch((e: Error) => setErr(e.message));
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-slate-900">
      {/* Page Header */}
      <div className="border-b border-slate-700/50 bg-gradient-to-r from-slate-900 to-slate-800/50 px-4 md:px-8 py-8 md:py-12">
        <PageHeader
          title="Explore Courses"
          subtitle="Learn computer science with Harvard's CS50 curriculum. Get guided help through every problem with Fraylon Mentor."
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 md:px-8 py-8">
        {err && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700/50 rounded-lg text-red-300 max-w-2xl">
            <p className="font-medium">Error loading courses</p>
            <p className="text-sm mt-1">{err}</p>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          {courses === null ? (
            // Loading skeleton
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {[1, 2].map((i) => (
                <LoadingCard key={i} lines={3} />
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">No courses available</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => (
                <Link
                  key={c.id}
                  to={`/course/${c.slug}`}
                  className="group h-full"
                >
                  <Card variant="elevated" className="p-6 h-full flex flex-col hover:shadow-xl hover:border-blue-500/50 transition-all duration-200">
                    {/* Course Icon */}
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600/20 group-hover:bg-blue-600/30 transition-colors flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.228 6.228 2 10.692 2 16s4.228 9.772 10 9.772 10-4.692 10-9.772c0-5.308-4.228-9.747-10-9.747z" />
                      </svg>
                    </div>

                    {/* Content */}
                    <h2 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-300 transition-colors">
                      {c.title}
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 truncate-lines">
                      {c.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center text-blue-400 group-hover:text-blue-300 text-sm font-medium">
                      Explore course
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
