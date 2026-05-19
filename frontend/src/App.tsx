import { Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";
import { Suspense, lazy } from "react";

import { useAuth } from "./auth";

// Pages
const CoursePage = lazy(
  () => import("./pages/CoursePage")
);

const Dashboard = lazy(
  () => import("./pages/Dashboard")
);

const LecturePage = lazy(
  () => import("./pages/LecturePage")
);

const Login = lazy(
  () => import("./pages/Login")
);

const ProblemPage = lazy(
  () => import("./pages/ProblemPage")
);

const ProjectPage = lazy(
  () => import("./pages/ProjectPage")
);

const QuizPage = lazy(
  () => import("./pages/QuizPage")
);

const Register = lazy(
  () => import("./pages/Register")
);

const Shell = lazy(
  () => import("./Shell")
);

const CodingProjectPage = lazy(
  () => import("./pages/CodingProjectPage")
);

// Loading Spinner
function LoadingSpinner() {

  return (

    <div className="flex min-h-screen items-center justify-center bg-slate-950">

      <div className="flex flex-col items-center gap-4">

        <svg
          className="h-8 w-8 animate-spin text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >

          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />

          <path
            className="opacity-75"
            fill="currentColor"
            d="
              M4 12a8 8 0 018-8V0
              C5.373 0 0 5.373 0 12h4
              zm2 5.291A7.962 7.962 0 014 12H0
              c0 3.042 1.135 5.824 3 7.938
              l3-2.647z
            "
          />

        </svg>

        <p className="text-slate-400">
          Loading...
        </p>

      </div>

    </div>
  );
}

// Auth Wrapper
function RequireAuth({
  children,
}: {
  children: ReactNode;
}) {

  const { user, ready } = useAuth();

  if (!ready) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Main App
export default function App() {

  return (

    <Suspense fallback={<LoadingSpinner />}>

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* PRIVATE ROUTES */}

        <Route
          path="/"
          element={
            <RequireAuth>
              <Shell />
            </RequireAuth>
          }
        >

          {/* Dashboard */}

          <Route
            index
            element={<Dashboard />}
          />

          {/* Course */}

          <Route
            path="course/:slug"
            element={<CoursePage />}
          />

          {/* Lecture */}

          <Route
            path="course/:slug/lecture/:number"
            element={<LecturePage />}
          />

          {/* Quiz */}

          <Route
            path="course/:slug/lecture/:number/quiz"
            element={<QuizPage />}
          />

          {/* Project List */}

          <Route
            path="course/:slug/lecture/:number/project"
            element={<ProjectPage />}
          />

          {/* Coding Workspace */}

          <Route
            path="course/:slug/lecture/:number/project/:projectId"
            element={<CodingProjectPage />}
          />

          {/* Problems */}

          <Route
            path="problem/:id"
            element={<ProblemPage />}
          />

        </Route>

        {/* FALLBACK */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </Suspense>
  );
}