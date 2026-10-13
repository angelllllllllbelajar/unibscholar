import React, { useEffect } from "react";
import { citedBy, paperDetails } from "../../data/publicationsData";

const sdgColorStyles = {
  green:  "bg-green-50 text-green-700 border-green-300",
  orange: "bg-orange-50 text-orange-700 border-orange-300",
  red:    "bg-rose-50 text-rose-700 border-rose-300",
};

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-4 h-4 text-navy flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const OrcidIcon = () => (
  <span className="ml-1.5 mt-0.5 bg-green-500 text-white text-[8px] font-bold rounded-sm px-0.5 leading-[10px] flex-shrink-0">
    iD
  </span>
);

const Divider = () => <span className="w-px h-4 bg-gray-200 mx-4 flex-shrink-0" />;

export default function PaperModal({ pub, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!pub) return null;

  const details = paperDetails[pub.id] || {};
  const refs    = citedBy[pub.id] || [];

  // Backdrop closes on click; the panel stops propagation so inside clicks don't close.
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={pub.title}
        className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Top accent bar: navy blending into yellow at the right */}
        <div
          className="h-1.5"
          style={{ background: "linear-gradient(90deg, var(--color-navy) 0%, var(--color-navy) 72%, #fbbf24 100%)" }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors z-10"
        >
          <CloseIcon />
        </button>

        {/* Title + meta */}
        <div className="px-8 pt-6 pb-4">
          <h2 className="text-gray-900 font-bold text-xl leading-snug pr-8 mb-3">{pub.title}</h2>
          <div className="flex items-center flex-wrap text-sm">
            <span className="font-bold text-blue-800">{pub.date}</span>
            {pub.volume && (
              <>
                <Divider />
                <span className="text-blue-800 font-semibold">{pub.volume}</span>
              </>
            )}
            <Divider />
            <span className="text-blue-800 font-semibold">DOI: <span className="font-mono">{pub.doi}</span></span>
            <Divider />
          </div>
        </div>

        {/* Hero image */}
        <div className="px-8">
          <div className="relative rounded-md overflow-hidden bg-gray-100">
            <img
              src={pub.image}
              alt={pub.title}
              className="w-full h-auto block"
              onError={e => { e.target.style.display = "none"; }}
            />
            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
              DOI: {pub.doi}
            </div>
          </div>
        </div>

        {/* Authors */}
        <div className="px-8 pt-5 flex flex-wrap gap-x-8 gap-y-2">
          {(details.authors || []).map(a => (
            <span key={a.name} className="flex items-start text-sm font-bold text-gray-800">
              {a.name}
              <sup className="text-blue-600 text-[10px] ml-0.5">{a.sup}</sup>
              <OrcidIcon />
            </span>
          ))}
        </div>

        {/* Affiliations */}
        <div className="px-8 pt-3 flex flex-wrap gap-x-6 gap-y-1">
          {(details.affiliations || []).map(f => (
            <span key={f.sup} className="text-xs text-gray-500">
              <sup className="text-blue-600 mr-0.5">{f.sup}</sup>
              {f.text}
            </span>
          ))}
        </div>

        {/* Journal / indexing band */}
        <div className="mt-5 bg-gray-50 px-8 py-4">
          <div className="flex items-center flex-wrap gap-y-2 text-sm">
            <BookIcon />
            <span className="font-bold text-gray-800 ml-2">{details.journal}</span>
            <span className="text-gray-400 ml-1">
              ({[pub.volume, pub.date].filter(Boolean).join(", ")})
            </span>
            <span className="text-gray-300 mx-3">•</span>
            <span className="text-gray-500">DOI:</span>
            <span className="font-mono text-blue-500 ml-1">{pub.doi}</span>
            <span className="text-gray-300 mx-3">•</span>
            <span className="text-gray-500">Accepted: <span className="text-gray-800 font-medium">{details.accepted}</span></span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {(details.indexed || []).map(t => (
              <span key={t} className="text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-md px-3 py-1">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* SDG pills */}
        <div className="px-8 py-3 flex items-center justify-center flex-wrap gap-2 border-b border-gray-100">
          <span className="text-sm font-bold text-navy mr-1">SDGS:</span>
          {(details.sdgs || []).map(s => (
            <span
              key={s.label}
              className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-md border ${sdgColorStyles[s.color] || sdgColorStyles.green}`}
            >
              <span className="w-2 h-2 rounded-full bg-current opacity-70 mr-1.5" />
              {s.label}
            </span>
          ))}
        </div>

        {/* Abstract + Cited By */}
        <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-[1fr_380px] gap-8">
          <div>
            <h3 className="text-gray-900 font-bold text-2xl mb-3">Abstract</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{details.abstract || pub.abstract}</p>
          </div>
          <div>
            <h3 className="text-gray-900 font-bold text-2xl mb-3">Citied By</h3>
            <div>
              {refs.map((r, i) => (
                <div key={i} className="py-2.5 border-b border-gray-100 first:pt-0">
                  <p className="text-gray-800 text-sm leading-snug">{r.title}</p>
                  <p className="text-gray-400 text-xs mt-1">[{r.year}] • {r.authors}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
