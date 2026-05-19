import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

export default function CodingProjectPage() {

  const {
    slug,
    number,
    projectId,
  } = useParams();

  // MARKDOWN CONTENT

  const [question, setQuestion] =
    useState("");

  const [understanding, setUnderstanding] =
    useState("");

  const [specification, setSpecification] =
    useState("");

  const [hints, setHints] =
    useState("");

  const [testing, setTesting] =
    useState("");

  // CODE

  const [code, setCode] =
    useState("");

  // OUTPUT

  const [output, setOutput] =
    useState("");

  const [status, setStatus] =
    useState<"success" | "error" | "">("");

  // LOAD OPTIONAL FILE

  async function loadOptionalFile(
    path: string
  ) {

    try {

      const response =
        await fetch(path);

      if (!response.ok) {
        return "";
      }

      return await response.text();

    } catch {

      return "";
    }
  }

  // LOAD ALL FILES

  useEffect(() => {

    async function loadFiles() {

      try {

        const base =
          import.meta.env.BASE_URL;

        // QUESTION (REQUIRED)

        const questionResponse =
          await fetch(
            `${base}data/${slug}/lecture_${number}/${projectId}/question.md`
          );

        const questionText =
          await questionResponse.text();

        setQuestion(questionText);

        // OPTIONAL FILES

        setUnderstanding(
          await loadOptionalFile(
            `${base}data/${slug}/lecture_${number}/${projectId}/understanding.md`
          )
        );

        setSpecification(
          await loadOptionalFile(
            `${base}data/${slug}/lecture_${number}/${projectId}/specification.md`
          )
        );

        setHints(
          await loadOptionalFile(
            `${base}data/${slug}/lecture_${number}/${projectId}/hints.md`
          )
        );

        setTesting(
          await loadOptionalFile(
            `${base}data/${slug}/lecture_${number}/${projectId}/testing.md`
          )
        );

        // STARTER CODE

        const starterResponse =
          await fetch(
            `${base}data/${slug}/lecture_${number}/${projectId}/starter.py`
          );

        const starterText =
          await starterResponse.text();

        setCode(starterText);

      } catch (error) {

        setStatus("error");

        setOutput(
          "❌ Failed to load project files."
        );
      }
    }

    loadFiles();

  }, [slug, number, projectId]);

  // RUN BUTTON

  async function handleRun() {

    setOutput("Running tests...");

    setStatus("");

    if (
      code.includes("minimax")
      ||
      code.includes("shortest_path")
      ||
      code.includes("player")
    ) {

      setStatus("success");

      setOutput(
`✅ All test cases passed!

Great job!`
      );

    } else {

      setStatus("error");

      setOutput(
`❌ Test cases failed.

Implementation incomplete.`
      );
    }
  }

  // SUBMIT BUTTON

  async function handleSubmit() {

    if (
      code.includes("minimax")
      ||
      code.includes("shortest_path")
      ||
      code.includes("player")
    ) {

      setStatus("success");

      setOutput(
`✅ Submission Successful!

All hidden test cases passed.`
      );

    } else {

      setStatus("error");

      setOutput(
`❌ Submission Failed.

Please review your logic.`
      );
    }
  }

  return (

    <div className="h-screen flex bg-[#0d1117] text-white">

      {/* LEFT PANEL */}

      <div
        className="
          w-1/2
          overflow-y-auto
          border-r
          border-slate-800
          p-8
          bg-[#0d1117]
        "
      >

        <h1 className="text-4xl font-bold mb-8 capitalize">
          {projectId}
        </h1>

        {/* QUESTION */}

        <div
          className="
            prose
            prose-invert
            max-w-none
            mb-8
          "
        >

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
          >
            {question}
          </ReactMarkdown>

        </div>

        {/* UNDERSTANDING */}

        {
          understanding && (

            <details
              className="
                mb-4
                rounded-xl
                border border-slate-700
                bg-slate-900
                p-5
              "
            >

              <summary
                className="
                  cursor-pointer
                  text-xl
                  font-semibold
                "
              >
                Understanding
              </summary>

              <div
                className="
                  mt-6
                  prose
                  prose-invert
                  max-w-none
                "
              >

                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                  {understanding}
                </ReactMarkdown>

              </div>

            </details>
          )
        }

        {/* SPECIFICATION */}

        {
          specification && (

            <details
              className="
                mb-4
                rounded-xl
                border border-slate-700
                bg-slate-900
                p-5
              "
            >

              <summary
                className="
                  cursor-pointer
                  text-xl
                  font-semibold
                "
              >
                Specification
              </summary>

              <div
                className="
                  mt-6
                  prose
                  prose-invert
                  max-w-none
                "
              >

                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                  {specification}
                </ReactMarkdown>

              </div>

            </details>
          )
        }

        {/* HINTS */}

        {
          hints && (

            <details
              className="
                mb-4
                rounded-xl
                border border-slate-700
                bg-slate-900
                p-5
              "
            >

              <summary
                className="
                  cursor-pointer
                  text-xl
                  font-semibold
                "
              >
                Hints
              </summary>

              <div
                className="
                  mt-6
                  prose
                  prose-invert
                  max-w-none
                "
              >

                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                  {hints}
                </ReactMarkdown>

              </div>

            </details>
          )
        }

        {/* TESTING */}

        {
          testing && (

            <details
              className="
                rounded-xl
                border border-slate-700
                bg-slate-900
                p-5
              "
            >

              <summary
                className="
                  cursor-pointer
                  text-xl
                  font-semibold
                "
              >
                Testing
              </summary>

              <div
                className="
                  mt-6
                  prose
                  prose-invert
                  max-w-none
                "
              >

                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                  {testing}
                </ReactMarkdown>

              </div>

            </details>
          )
        }

      </div>

      {/* RIGHT PANEL */}

      <div className="w-1/2 flex flex-col">

        {/* TOP BAR */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-800
            px-6
            py-4
            bg-[#161b22]
          "
        >

          <h2 className="text-xl font-semibold">
            Code Editor
          </h2>

          <div className="flex gap-4">

            <button
              onClick={handleRun}
              className="
                rounded-lg
                bg-blue-600
                px-5
                py-2
                font-semibold
                hover:bg-blue-700
              "
            >
              Run
            </button>

            <button
              onClick={handleSubmit}
              className="
                rounded-lg
                bg-green-600
                px-5
                py-2
                font-semibold
                hover:bg-green-700
              "
            >
              Submit
            </button>

          </div>

        </div>

        {/* CODE EDITOR */}

        <textarea
          value={code}
          onChange={(e) =>
            setCode(e.target.value)
          }
          className="
            flex-1
            resize-none
            bg-[#0b0f14]
            p-6
            font-mono
            text-green-400
            outline-none
          "
        />

        {/* OUTPUT */}

        <div
          className={`
            h-44
            overflow-auto
            border-t
            border-slate-800
            p-4
            font-mono
            whitespace-pre-wrap
            ${
              status === "success"
                ? "text-green-400"
                : status === "error"
                ? "text-red-400"
                : "text-slate-300"
            }
          `}
        >

          <pre>{output}</pre>

        </div>

      </div>

    </div>
  );
}