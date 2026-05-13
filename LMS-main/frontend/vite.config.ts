import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "/LMS/",
  build: {
    outDir: "docs",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],

          // Feature chunks
          'auth': ['./src/auth.tsx'],
          'api': ['./src/api.ts'],

          // Page chunks
          'pages-login': ['./src/pages/Login.tsx'],
          'pages-register': ['./src/pages/Register.tsx'],
          'pages-dashboard': ['./src/pages/Dashboard.tsx'],
          'pages-course': ['./src/pages/CoursePage.tsx'],
          'pages-problem': ['./src/pages/ProblemPage.tsx'],
          'pages-lecture': ['./src/pages/LecturePage.tsx'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1000kb
  },
});