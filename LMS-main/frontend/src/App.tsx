import { Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";
import { Suspense, lazy } from "react";
import { useAuth } from "./auth";

// Lazy load components for code splitting
const CoursePage = lazy(() => import("./pages/CoursePage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const ProblemPage = lazy(() => import("./pages/ProblemPage"));
const LecturePage = lazy(() => import("./pages/LecturePage"));
const Register = lazy(() => import("./pages/Register"));
const Shell = lazy(() => import("./Shell"));

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-slate-400">Loading…</p>
      </div>
    </div>
  );
}

function RequireAuth({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  if (!ready) {
    return <LoadingSpinner />;
  }
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Shell />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="course/:slug" element={<CoursePage />} />
          <Route path="course/:slug/lecture/:number" element={<LecturePage />} />
          <Route path="problem/:id" element={<ProblemPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
