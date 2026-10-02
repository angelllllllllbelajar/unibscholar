import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ResearchersPage from "./pages/ResearchersPage";
import ResearcherProfilePage from "./pages/ResearcherProfilePage";
import PublicationsPage from "./pages/PublicationsPage";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/researchers" element={<ResearchersPage />} />
          <Route path="/researchers/:id" element={<ResearcherProfilePage />} />
          <Route path="/publications" element={<PublicationsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
