import React, { useEffect } from "react";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";
import { projects } from "../../data/projectsData";

const BADGE_STYLES = {
  "RESEARCH GRANT":           { dot: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", text: "#15803d" },
  "INTERNATIONAL CONSORTIUM": { dot: "#0ea5e9", bg: "#f0f9ff", border: "#bae6fd", text: "#0369a1" },
  "NATIONAL GRANT":           { dot: "#6b7280", bg: "#f9fafb", border: "#e5e7eb", text: "#374151" },
};

// SDG pill colours keyed by goal number (matches the design: 3 green, 9 orange, 4 red)
const sdgColor = (label) => {
  const n = parseInt(String(label).match(/GOAL\s*(\d+)/i)?.[1] ?? "0", 10);
  if ([3, 7, 13, 14, 15].includes(n)) return { bg: "#f0fdf4", border: "#86efac", text: "#15803d", dot: "#22c55e" };
  if ([8, 9, 11, 12].includes(n))     return { bg: "#fff7ed", border: "#fdba74", text: "#c2410c", dot: "#f97316" };
  return { bg: "#fff1f2", border: "#fda4af", text: "#be123c", dot: "#f43f5e" };
};

const SIMILAR_PCT = [82, 76, 64, 58];
const HERO_IMAGE = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80";

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const StarIcon = () => (
  <svg className="w-4 h-4 text-yellow-400 fill-current flex-shrink-0" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034a1 1 0 01-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
const BuildingIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
const DocumentIcon = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
const SimilarIcon = () => (
  <svg className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" viewBox="0 0 20 20">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-2a4 4 0 00-3-3.87M4 18v-2a4 4 0 013-3.87" />
  </svg>
);

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    lockScroll();
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [onClose]);

  if (!project) return null;

  const style = BADGE_STYLES[project.grantType] || BADGE_STYLES["NATIONAL GRANT"];
  const similar = projects.filter((p) => p.id !== project.id).slice(0, 4);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar: navy with a yellow cap on the right */}
        <div className="flex h-1.5">
          <div className="flex-1" style={{ background: "var(--color-navy)" }} />
          <div className="w-10 bg-yellow-400" />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors z-10"
        >
          <CloseIcon />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 p-6 md:p-7">
          {/* ── Main column ── */}
          <div className="min-w-0">
            {/* Badge + year */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border"
                style={{ background: style.bg, borderColor: style.border, color: style.text }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: style.dot }} />
                {project.grantType} • {project.grantStatus}
              </span>
              <span className="text-sm font-bold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full flex-shrink-0">
                {project.year}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-navy font-bold text-2xl leading-snug mb-3 pr-8">{project.title}</h2>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-gray-500 mb-4">
              <span className="bg-gray-100 text-gray-600 font-mono px-2 py-0.5 rounded">{project.code}</span>
              <span className="flex items-center gap-1"><BuildingIcon />{project.institution}</span>
              {project.program && (
                <span className="flex items-center gap-1"><DocumentIcon />{project.program}</span>
              )}
            </div>

            {/* Team members */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm mb-4">
              <span className="font-bold text-navy mr-1">Team Members</span>
              <StarIcon />
              <span className="font-bold text-navy">{project.leadPI}</span>
              <span className="text-orange-500 font-semibold text-xs">(Lead PI)</span>
              {project.contributors.map((c, i) => (
                <span key={i} className="text-gray-500">• {c}</span>
              ))}
            </div>

            {/* Hero image */}
            <div className="relative rounded-lg overflow-hidden bg-gray-100 mb-4">
              <img
                src={HERO_IMAGE}
                alt={project.title}
                className="w-full h-56 object-cover"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="font-bold text-navy text-sm mr-1">Keywords</span>
              {project.topics.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md uppercase"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {t}
                </span>
              ))}
            </div>

            {/* Abstract */}
            <h3 className="text-navy font-bold text-lg mb-2">Abstract &amp; Project Objectives</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{project.abstract}</p>
          </div>

          {/* ── Similar projects sidebar ── */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-3">
              <SimilarIcon />
              <h3 className="text-navy font-bold text-sm">Similiar Projects</h3>
            </div>
            <div className="flex flex-col gap-3">
              {similar.map((p, i) => (
                <div key={p.id} className="relative bg-white border border-gray-100 rounded-lg shadow-sm p-3 pr-12">
                  <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-navy text-white text-[11px] font-bold flex items-center justify-center">
                    {SIMILAR_PCT[i]}%
                  </span>
                  <p className="text-navy font-bold text-[13px] leading-snug mb-1 pr-2">{p.title}</p>
                  <p className="text-gray-400 text-[11px] font-semibold mb-1">UNIB</p>
                  <p className="text-gray-400 text-[11px]">{p.year} - {p.fundingScheme}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SDG footer bar ── */}
        <div className="bg-gray-50 border-t border-gray-100 px-6 md:px-7 py-3 flex flex-wrap items-center gap-2">
          <span className="font-bold text-navy text-sm mr-1">SDGS:</span>
          {project.sdgs.map((s) => {
            const c = sdgColor(s);
            return (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-md border"
                style={{ background: c.bg, borderColor: c.border, color: c.text }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} />
                {s}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
