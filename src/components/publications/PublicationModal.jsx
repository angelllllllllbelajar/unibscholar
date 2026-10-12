import React, { useEffect, useCallback } from "react";
import { citedBy } from "../../data/publicationsData";
import { modalDetails } from "../../data/modalDetails";

// ── Icons ────────────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const OrcidIcon = () => (
  <svg className="inline w-4 h-4 ml-0.5 opacity-70" viewBox="0 0 256 256" fill="none">
    <circle cx="128" cy="128" r="128" fill="#A6CE39" />
    <rect x="101" y="67" width="22" height="122" rx="4" fill="white" />
    <circle cx="112" cy="52" r="11" fill="white" />
    <path d="M140 67h36c30 0 52 20 52 61s-22 61-52 61h-36V67z" fill="white" />
    <path d="M156 83h18c18 0 32 13 32 45s-14 45-32 45h-18V83z" fill="#A6CE39" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
  </svg>
);

// ── Modal ─────────────────────────────────────────────────────────────────────
export default function PublicationModal({ pub, onClose }) {
  const detail  = modalDetails[pub.id] || {};
  const refs    = citedBy[pub.id]      || [];

  // Close on Escape key
  const handleKey = useCallback((e) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    // Prevent body scroll while open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    /* ── Backdrop ── */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(10,20,50,0.65)", backdropFilter: "blur(2px)" }}
      onClick={onClose}   /* click outside → close */
    >
      {/* ── Modal panel (stops propagation so clicking inside doesn't close) ── */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="px-6 pt-6 pb-3">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors text-sm font-bold"
            aria-label="Close"
          >
            ✕
          </button>

          <h2 className="text-navy font-bold text-lg leading-snug pr-8 mb-3">
            {pub.title}
          </h2>

          {/* Badge row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
              {pub.date}
            </span>
            {(pub.volume || pub.volumeTag) && (
              <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                {pub.volume || pub.volumeTag}
              </span>
            )}
            <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
              DOI: {pub.doi}
            </span>
          </div>
        </div>

        {/* ── Banner image ── */}
        <div className="relative h-52 bg-gray-100 overflow-hidden mx-6 rounded-xl mb-0">
          <img
            src={pub.image}
            alt={pub.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.style.background = "linear-gradient(135deg,#1a2b5f22,#3b82f622)";
            }}
          />
          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
            DOI: {pub.doi}
          </div>
        </div>

        {/* ── Authors & Affiliations ── */}
        <div className="px-6 pt-4 pb-2">
          {detail.authorsFull ? (
            <>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
                {detail.authorsFull.map((a, i) => (
                  <span key={i} className="text-sm text-blue-600 font-medium">
                    {a.name}
                    <sup className="text-[10px] text-gray-400 ml-0.5">{a.num}</sup>
                    {a.orcid && <OrcidIcon />}
                  </span>
                ))}
              </div>
              <div className="space-y-0.5 mb-3">
                {detail.affiliations?.map((aff, i) => (
                  <p key={i} className="text-[11px] text-gray-500 leading-tight">{aff}</p>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-blue-600 font-medium mb-3">{pub.authors.join(", ")}</p>
          )}

          {/* Journal meta strip */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-500 border-t border-gray-100 pt-2 mb-2">
            {detail.journal && (
              <span className="flex items-center gap-1 font-medium text-gray-700">
                <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 2H5a2 2 0 00-2 2v18l4-4h12a2 2 0 002-2V4a2 2 0 00-2-2z"/>
                </svg>
                {detail.journal}
              </span>
            )}
            {(pub.volume || pub.volumeTag) && (
              <span>|Vol. {pub.volume || pub.volumeTag}|</span>
            )}
            {pub.doi && (
              <span>
                DOI:{" "}
                <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer"
                  className="text-blue-500 hover:underline" onClick={e => e.stopPropagation()}>
                  {pub.doi}
                </a>
              </span>
            )}
            {detail.accepted && <span>• Accepted: {detail.accepted}</span>}
          </div>

          {/* Index tags */}
          {detail.indexTags && (
            <div className="flex flex-wrap gap-2 mb-3">
              {detail.indexTags.map((tag) => (
                <span key={tag}
                  className="text-[11px] font-medium border border-gray-300 text-gray-600 px-2.5 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* SDG tags */}
          {detail.sdgTags && (
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-[11px] font-semibold text-gray-500 self-center">SDGs:</span>
              {detail.sdgTags.map((s) => (
                <span key={s.label}
                  className="text-[11px] font-semibold text-white px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: s.color }}>
                  ● {s.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Two-column body: Abstract + Cited By ── */}
        <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6">
          {/* Abstract */}
          <div>
            <h3 className="text-navy font-bold text-base mb-2">Abstract</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              {detail.abstractFull || pub.abstract}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2 bg-navy text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-navy-dark transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <EyeIcon />
                View Paper
              </button>
              <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                <ChatIcon />
                {pub.citations} Citations
              </div>
            </div>
          </div>

          {/* Cited By */}
          <div>
            <h3 className="text-navy font-bold text-base mb-3">Cited By</h3>
            <div className="space-y-4">
              {refs.map((ref, i) => (
                <div key={i}>
                  <p className="text-sm text-blue-600 font-semibold leading-snug hover:underline cursor-pointer">
                    {ref.title}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    [{ref.year}] • {ref.authors}
                  </p>
                </div>
              ))}
              {refs.length === 0 && (
                <p className="text-xs text-gray-400 italic">No citations found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
