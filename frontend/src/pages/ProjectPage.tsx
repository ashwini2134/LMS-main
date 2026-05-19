import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  description: string;
}

export default function ProjectPage() {

  const { slug, number } = useParams();

  const [projects, setProjects] =
    useState<Project[]>([]);

  useEffect(() => {

    async function loadProjects() {

      try {

        const base =
          import.meta.env.BASE_URL;

        const response =
          await fetch(
            `${base}data/${slug}/lecture_${number}/problems.json`
          );

        const data =
          await response.json();

        const filtered =
          data.filter(
            (item: any) =>
              item.id !== "quiz"
          );

        setProjects(filtered);

      } catch (error) {

        console.error(error);
      }
    }

    loadProjects();

  }, [slug, number]);

  return (

    <div className="min-h-screen bg-[#020817] p-16 text-white">

      <h1 className="mb-10 text-5xl font-bold">
        Lecture {number} Projects
      </h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

        {
          projects.map((project) => (

            <div
              key={project.id}
              className="
                rounded-3xl
                border
                border-slate-800
                bg-[#08112b]
                p-10
              "
            >

              <h2 className="mb-4 text-4xl font-bold">
                {project.title}
              </h2>

              <p className="mb-8 text-slate-300">
                {project.description}
              </p>

              <Link
                to={`/course/${slug}/lecture/${number}/project/${project.id}`}
                className="
                  text-lg
                  text-blue-400
                  hover:text-blue-300
                "
              >
                Open coding workspace
              </Link>

            </div>
          ))
        }

      </div>

    </div>
  );
}