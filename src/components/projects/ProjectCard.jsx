import React, { useState } from "react";

// ── Grant badge colours ───────────────────────────────────────────────────────
const BADGE_STYLES = {
  "RESEARCH GRANT":          { dot: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", text: "#15803d" },
  "INTERNATIONAL CONSORTIUM": { dot: "#0ea5e9", bg: "#f0f9ff", border: "#bae6fd", text: "#0369a1" },
  "NATIONAL GRANT":          { dot: "#6b7280", bg: "#f9fafb", border: "#e5e7eb", text: "#374151" },
};

const StarIcon = () => (
  <svg className="w-4 h-4 text-yellow-400 fill-current flex-shrink-0" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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

const ShareIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

export default function ProjectCard({ project, onOpen }) {
  const [expanded, setExpanded] = useState(false);
  const style = BADGE_STYLES[project.grantType] || BADGE_STYLES["NATIONAL GRANT"];

  const abstractShort = project.abstract.length > 200
    ? project.abstract.slice(0, 200) + "…"
    : project.abstract;

  return (
    <div
      onClick={onOpen}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 cursor-pointer"
    >
      {/* ── Top row: grant badge + year ── */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border"
          style={{ background: style.bg, borderColor: style.border, color: style.text }}
        >
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: style.dot }} />
          {project.grantType} • {project.grantStatus}
        </span>
        <span className="text-sm font-bold text-teal-600 flex-shrink-0">{project.year}</span>
      </div>

      {/* ── Title ── */}
      <h3 className="text-navy font-bold text-[15px] leading-snug mb-2 hover:text-blue-700 cursor-pointer">
        {project.title}
      </h3>

      {/* ── Meta row: code + institution + program ── */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500 mb-3">
        <span className="bg-gray-100 text-gray-600 font-mono px-2 py-0.5 rounded">
          {project.code}
        </span>
        <span className="flex items-center gap-1">
          <BuildingIcon />
          {project.institution}
        </span>
        {project.program && (
          <>
            <span className="text-gray-300">·</span>
            <span className="flex items-center gap-1">
              <DocumentIcon />
              {project.program}
            </span>
          </>
        )}
      </div>

      {/* ── Abstract ── */}
      <p className="text-sm text-gray-600 leading-relaxed mb-1">
        {expanded ? project.abstract : abstractShort}
      </p>
      {project.abstract.length > 200 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setExpanded(v => !v); }}
          className="text-xs text-blue-500 hover:underline mb-3 flex items-center gap-0.5"
        >
          {expanded ? "Show less" : "Show more"}{" "}
          <svg className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* ── Bottom row: PI + contributors + share + CTA ── */}
      <div className="flex items-center justify-between gap-2 flex-wrap pt-3 border-t border-gray-50">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <StarIcon />
          <span className="text-sm font-semibold text-navy truncate">{project.leadPI}</span>
          <span className="text-[11px] font-semibold text-white bg-blue-500 px-2 py-0.5 rounded-full">
            Lead PI
          </span>
          {project.contributors.slice(0, 2).map((c, i) => (
            <span key={i} className="text-xs text-gray-400">
              {" "}• {c}
            </span>
          ))}
          {project.extraCount > 0 && (
            <span className="text-xs text-blue-500 font-medium">
              +{project.extraCount} more
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 text-gray-400 hover:text-navy hover:bg-gray-100 rounded-lg transition-colors"
            title="Share"
          >
            <ShareIcon />
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 bg-navy text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-navy-dark transition-colors whitespace-nowrap"
          >
            View Project Details →
          </button>
        </div>
      </div>
    </div>
  );
}
