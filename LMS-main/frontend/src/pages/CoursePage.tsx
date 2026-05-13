import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, type ProblemSummary, type Lecture } from "../api";

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
  if (err) return <p className="text-red-400">{err}</p>;
  if (!problems) return <p className="text-slate-400">Loading…</p>;

  return (
    <div className="w-full overflow-hidden flex flex-col items-center pt-20">
      <div className="text-7xl mb-8">🧠</div>
      <h1 className="text-5xl font-bold text-white tracking-widest">
        {slug === "cs50p" ? "CS50_P" : slug === "cs50ai" ? "CS50_AI" : slug.toUpperCase()}
      </h1>
      
      {lectures && lectures.length > 0 && (
        <div className="mt-16 w-full max-w-[280px]">
          <div className="flex flex-col space-y-4">
            {lectures.map((lecture) => (
              <Link
                key={lecture.number}
                to={`/course/${slug}/lecture/${lecture.number}`}
                className="group flex items-center gap-4 text-xl font-medium text-slate-200 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                {lecture.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
