import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { api, type Lecture, type ProblemSummary } from "../api";
import { PageHeader, Card, Spinner } from "../components";

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

        setProblems(
          allProblems.filter(
            (p) => p.week_label === `Week ${lectureNumber}`
          )
        );
      } catch (e: any) {
        setLecture(null);
        setErr(e.message);
      }
    };

    fetchLectureAndProblems();
  }, [slug, number]);

  if (err) {
    return (
      <div className="w-full h-full flex flex-col bg-slate-900">
        <div className="px-4 md:px-8 py-8">
          <div className="bg-red-900/20 border border-red-700/50 rounded-lg text-red-300 p-4">
            {err}
          </div>
        </div>
      </div>
    );
  }

  if (!lecture) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" className="text-blue-500" />
          <p className="text-slate-400">Loading lecture…</p>
        </div>
      </div>
    );
  }

  const courseTitle =
    slug === "cs50p"
      ? "CS50 Python"
      : slug === "cs50ai"
      ? "CS50 AI"
      : slug?.toUpperCase() || "Course";

  return (
    <div className="w-full h-full flex flex-col bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-gradient-to-r from-slate-900 to-slate-800/50 px-4 md:px-8 py-8">
        <PageHeader
          title={lecture.title}
          subtitle={`Lecture ${lecture.number}`}
          breadcrumbs={[
            { label: "Dashboard", href: "/" },
            { label: courseTitle, href: `/course/${slug}` },
            { label: lecture.title },
          ]}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-4 md:px-8 py-8">
        <div className="mx-auto w-full max-w-4xl">

          {/* Quiz + Project Cards */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">
              Related Problems
            </h2>

            <div className="grid gap-3 grid-cols-1 md:grid-cols-2">

              {/* Quiz Card */}
              <Link
                to={`/course/${slug}/lecture/${lecture.number}/quiz`}
                className="group"
              >
                <Card className="p-4 h-full flex items-center gap-3 hover:border-blue-500/50 transition-all">
                  <div className="flex-shrink-0 p-2 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-200 group-hover:text-slate-100 transition-colors">
                      Quiz {lecture.number}
                    </p>
                  </div>
                </Card>
              </Link>

              {/* Project Card */}
              <Link
                to={`/course/${slug}/lecture/${lecture.number}/project`}
                className="group"
              >
                <Card className="p-4 h-full flex items-center gap-3 hover:border-green-500/50 transition-all">
                  <div className="flex-shrink-0 p-2 bg-green-600/20 rounded-lg group-hover:bg-green-600/30 transition-colors">
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-200 group-hover:text-slate-100 transition-colors">
                      Project {lecture.number}
                    </p>
                  </div>
                </Card>
              </Link>
            </div>
          </div>

          {/* Lecture Notes */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-200 mb-8 border-b border-slate-700 pb-4">
              Lecture Notes
            </h2>

            <div className="markdown-content prose prose-invert prose-blue max-w-none overflow-hidden">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-3xl font-bold text-slate-100 mt-8 mb-4"
                      {...props}
                    />
                  ),

                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-2xl font-bold text-slate-200 mt-8 mb-4"
                      {...props}
                    />
                  ),

                  h3: ({ node, ...props }) => (
                    <h3
                      className="text-xl font-bold text-slate-300 mt-6 mb-3"
                      {...props}
                    />
                  ),

                  img: ({ src, ...props }) => {
                    const baseUrl =
                      import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

                    const resolvedSrc =
                      src &&
                      src.startsWith("/") &&
                      !/^https?:\/\//.test(src)
                        ? `${baseUrl}${src}`
                        : src;

                    return (
                      <img
                        src={resolvedSrc}
                        {...props}
                        className="my-6 rounded-lg w-full max-w-full mx-auto border border-slate-700"
                      />
                    );
                  },

                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");

                    return !inline ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match?.[1] || "python"}
                        PreTag="div"
                        className="rounded-lg my-6 border border-slate-700"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code
                        className="bg-slate-800 px-2 py-1 rounded text-green-400 border border-slate-700 text-sm"
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
    </div>
  );
}