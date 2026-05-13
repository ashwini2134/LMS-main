import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { api, type Lecture, type ProblemSummary } from "../api";

export default function LecturePage() {
  const { slug, number } = useParams<{
    slug: string;
    number: string;
  }>();

  const [lecture, setLecture] = useState<Lecture | null>(null);
  const [problems, setProblems] = useState<ProblemSummary[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!slug || !number) return;

    const fetchLectureAndProblems = async () => {
      try {
        const lectures = await api.courseLectures(slug);
        const lectureNumber = Number(number);
        const found = lectures.find((l) => l.number === lectureNumber);
        
        if (found) {
          setLecture(found);
          setErr(null);
        } else {
          setLecture(null);
          setErr("Lecture not found");
        }

        const allProblems = await api.courseProblems(slug);
        setProblems(allProblems.filter(p => p.week_label === `Week ${lectureNumber}`));
      } catch (e: any) {
        setLecture(null);
        setErr(e.message);
      }
    };

    fetchLectureAndProblems();
  }, [slug, number]);

  if (err) {
    return <p className="text-red-400 p-8">{err}</p>;
  }

  if (!lecture) {
    return (
      <div className="p-8 text-slate-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="mx-auto w-full max-w-[800px] px-4 py-12 sm:px-6 lg:px-8">

        {/* Top Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-8">{lecture.title}</h1>
          
          {problems && problems.length > 0 && (
            <div className="flex flex-col space-y-3">
              {problems.map((p, i) => (
                <Link
                  key={p.id}
                  to={`/problem/${p.id}`}
                  className="group flex items-center gap-3 text-lg font-medium text-slate-200 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  {/* To perfectly match screenshot text if wanted, you could do: i === 0 ? `Quiz ${lecture.number}` : `Project ${lecture.number}`. For now using the actual titles or matching the exact user image text if they prefer. Let's use exactly what's in the image for authenticity, falling back to title if more than 2. */}
                  {i === 0 ? `Quiz ${lecture.number}` : i === 1 ? `Project ${lecture.number}` : p.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Lecture Notes Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-300 mb-6 border-b border-slate-700 pb-2 inline-block">Lecture {lecture.number}</h2>
          
          <div className="markdown-content prose prose-invert prose-blue max-w-none overflow-hidden">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-slate-200 mt-8 mb-4" {...props} />,
                img: ({ ...props }) => (
                  <img
                    {...props}
                    className="my-6 rounded-lg w-full max-w-3xl mx-auto"
                  />
                ),
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match?.[1] || "python"}
                      PreTag="div"
                      className="rounded-xl my-6"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className="bg-slate-800 px-1 py-0.5 rounded text-pink-400"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {lecture.content}
            </ReactMarkdown>
          </div>
        </div>

      </div>
    </div>
  );
}