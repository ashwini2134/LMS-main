import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { api, type Lecture } from "../api";

export default function LecturePage() {
  const { slug, number } = useParams<{
    slug: string;
    number: string;
  }>();

  const [lecture, setLecture] = useState<Lecture | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!slug || !number) return;

    api
      .courseLectures(slug)
      .then((lectures) => {
        const lectureNumber = Number(number);

        const found = lectures.find(
          (l) => l.number === lectureNumber
        );

        if (found) {
          setLecture(found);
          setErr(null);
        } else {
          setLecture(null);
          setErr("Lecture not found");
        }
      })
      .catch((e: Error) => {
        setLecture(null);
        setErr(e.message);
      });
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

  const courseLabel =
    slug === "cs50ai"
      ? "CS50 AI"
      : slug === "cs50p"
      ? "CS50 Python"
      : "Course";

  return (
    <div className="w-full overflow-hidden">
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">

        <Link
          to={`/course/${slug}`}
          className="mb-6 inline-block text-sm text-blue-400 transition-colors hover:text-blue-300 hover:underline"
        >
          ← Back to {courseLabel}
        </Link>

        <div className="rounded-xl border border-[var(--color-fa-border)] bg-[var(--color-fa-surface)] p-6 sm:p-8">

          <div className="markdown-content prose prose-invert prose-blue max-w-none overflow-hidden">

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
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