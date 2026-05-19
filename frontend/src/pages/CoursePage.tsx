import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, type ProblemSummary, type Lecture } from "../api";
import { PageHeader, Card, LoadingCard, Spinner } from "../components";

export default function CoursePage() {
  const { slug } = useParams<{ slug: string }>();
  const [problems, setProblems] = useState<ProblemSummary[] | null>(null);
  const [lectures, setLectures] = useState<Lecture[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    api
      .courseProblems(slug)
      .then(setProblems)
      .catch((e: Error) => setErr(e.message));
    api
      .courseLectures(slug)
      .then(setLectures)
      .catch(() => setLectures([])); // Ignore errors for lectures
  }, [slug]);

  if (!slug) return null;

  const courseTitle = slug === "cs50p" ? "CS50 Python" : slug === "cs50ai" ? "CS50 AI" : slug.toUpperCase();
  const courseEmoji = slug === "cs50p" ? "🐍" : slug === "cs50ai" ? "🧠" : "📚";

  return (
    <div className="w-full h-full flex flex-col bg-slate-900">
      {/* Page Header */}
      <div className="border-b border-slate-700/50 bg-gradient-to-r from-slate-900 to-slate-800/50 px-4 md:px-8 py-8 md:py-12">
        <PageHeader
          title={courseTitle}
          breadcrumbs={[
            { label: "Dashboard", href: "/" },
            { label: courseTitle },
          ]}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 md:px-8 py-8">
        {err && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700/50 rounded-lg text-red-300">
            {err}
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          {lectures === null ? (
            // Loading skeleton
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <LoadingCard key={i} lines={2} />
              ))}
            </div>
          ) : lectures.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">{courseEmoji}</div>
              <p className="text-slate-400">No lectures available for this course</p>
            </div>
          ) : (
            <div className="grid gap-4 md:gap-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-slate-200 mb-4">Lectures</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {lectures.map((lecture) => (
                  <Link
                    key={lecture.number}
                    to={`/course/${slug}/lecture/${lecture.number}`}
                    className="group"
                  >
                    <Card variant="elevated" className="p-6 h-full flex flex-col hover:shadow-xl transition-all duration-200">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-shrink-0 p-3 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                          <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-200 group-hover:text-white transition-colors truncate">
                            {lecture.title}
                          </h3>
                          <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors mt-1">
                            Lecture {lecture.number}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-blue-400 group-hover:text-blue-300 text-sm font-medium">
                        View Content
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
