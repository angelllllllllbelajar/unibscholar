import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RequireAdmin from "./components/shared/RequireAdmin";
import AdminAuthProvider from "./context/AdminAuthProvider";
import HomePage from "./pages/HomePage";
import ResearchersPage from "./pages/ResearchersPage";
import ResearcherProfilePage from "./pages/ResearcherProfilePage";
import PublicationsPage from "./pages/PublicationsPage";
import StudyCenterPage from "./pages/StudyCenterPage";
import StudyCenterProfilePage from "./pages/StudyCenterProfilePage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ProjectsPage from "./pages/ProjectsPage";

/** Public chrome (navbar + footer) shared by all visitor-facing pages. */
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/researchers" element={<ResearchersPage />} />
          <Route path="/researchers/:id" element={<ResearcherProfilePage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/study-center" element={<StudyCenterPage />} />
          <Route path="/study-center/:id" element={<StudyCenterProfilePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Route>

        {/* Admin-only area — not linked anywhere in the public UI. */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminDashboardPage />
            </RequireAdmin>
          }
        />
      </Routes>
    </AdminAuthProvider>
  );
}
