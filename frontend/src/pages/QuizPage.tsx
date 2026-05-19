import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export default function QuizPage() {

  const { slug, number } = useParams();

  const [questions, setQuestions] =
    useState<QuizQuestion[]>([]);

  const [selected, setSelected] =
    useState<{ [key: number]: string }>({});

  useEffect(() => {

    async function loadQuiz() {

      const base =
        import.meta.env.BASE_URL;

      const response =
        await fetch(
          `${base}data/${slug}/lecture_${number}/quiz.json`
        );

      const data =
        await response.json();

      setQuestions(data);
    }

    loadQuiz();

  }, [slug, number]);

  return (

    <div className="min-h-screen bg-[#020817] p-10 text-white">

      <h1 className="mb-10 text-5xl font-bold">
        Quiz {number}
      </h1>

      <div className="space-y-10">

        {questions.map((q, index) => {

          const selectedAnswer =
            selected[index];

          const isCorrect =
            selectedAnswer === q.answer;

          return (

            <div
              key={index}
              className="
                rounded-3xl
                border
                border-slate-700
                bg-[#08112b]
                p-8
              "
            >

              <h2 className="mb-6 text-2xl font-bold">
                {q.question}
              </h2>

              <div className="space-y-4">

                {q.options.map((option) => (

                  <button
                    key={option}
                    onClick={() =>
                      setSelected({
                        ...selected,
                        [index]: option
                      })
                    }
                    className={`
                      w-full
                      rounded-xl
                      border
                      p-4
                      text-left
                      transition

                      ${
                        selectedAnswer === option
                          ? isCorrect
                            ? "border-green-500 bg-green-500/20"
                            : "border-red-500 bg-red-500/20"
                          : "border-slate-700 bg-slate-900"
                      }
                    `}
                  >

                    {option}

                  </button>
                ))}

              </div>

              {selectedAnswer && (

                <div className="mt-6">

                  {isCorrect ? (

                    <p className="text-green-400">
                      ✅ Correct Answer
                    </p>

                  ) : (

                    <div>

                      <p className="text-red-400">
                        ❌ Wrong Answer
                      </p>

                      <p className="mt-2 text-slate-300">
                        Correct Answer:
                        {" "}
                        <span className="font-bold text-green-400">
                          {q.answer}
                        </span>
                      </p>

                    </div>
                  )}

                </div>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}