import React from "react";

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// Mocked "Cited By" references per publication
const citedBy = {
  1: [
    { title: "Deep Multi-Agent Integration in Power Systems", year: 2025, authors: "Eleanor Vance, Marcus Chen" },
    { title: "Scalable Frameworks for Decentralized Grids",    year: 2024, authors: "Dr. Sarah Al-Mansoor, dkk." },
    { title: "Resilience Analysis in Smart Microgrids",        year: 2024, authors: "David K. Lindqvist, Elena Rostova" },
  ],
  2: [
    { title: "RNA Editing in Pathogen Surveillance",           year: 2025, authors: "T. K. Gupta, B. Hartono" },
    { title: "Cas13 Off-Target Landscape in Diagnostics",     year: 2024, authors: "Maria Santos, et al." },
    { title: "Single-Cell Transcriptomics in Infection",      year: 2024, authors: "Dr. Sarah Al-Mansoor" },
  ],
  3: [
    { title: "High-Resolution Coastal Dynamics and Sea-Surface Temperature Mapping", year: 2025, authors: "Eleanor Vance, Marcus Chen" },
    { title: "High-Density Elevation Grids for Pacific Coastal Vulnerability",       year: 2025, authors: "Dr. Sarah Al-Mansoor, T. K. Gupta" },
    { title: "Coupled Hydro-Atmospheric Modeling in Regional Ecosystems",            year: 2024, authors: "David K. Lindqvist, Elena Rostova" },
  ],
  4: [
    { title: "Chiral Majorana Signatures in 2D Materials",   year: 2025, authors: "J. H. Miller, et al." },
    { title: "Topological Surface States via ARPES",          year: 2024, authors: "Prof. Aris Thorne" },
    { title: "van der Waals Superconductor Proximity Effect", year: 2024, authors: "Elena Rostova, dkk." },
  ],
  5: [
    { title: "On-Device NAS for Autonomous Vehicles",          year: 2025, authors: "K. Tanaka, et al." },
    { title: "Hardware-Aware NAS Benchmarks",                  year: 2024, authors: "Eleanor Vance, B. Hartono" },
    { title: "FPGA-Based Neural Search Accelerators",          year: 2024, authors: "Prof. Marcus Chen" },
  ],
  6: [
    { title: "Ionic Liquid Applications in Green Chemistry",   year: 2025, authors: "B. Hartono, Maria Santos" },
    { title: "Lignocellulose Pre-treatment Review",            year: 2024, authors: "Dr. Sarah Al-Mansoor" },
    { title: "Circular Economy in Agricultural Biomass",       year: 2024, authors: "David K. Lindqvist" },
  ],
};

// ── Grid Card (original compact style) ───────────────────────────────────────
function GridCard({ pub }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-44 bg-gray-100 overflow-hidden flex-shrink-0">
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
      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <CalendarIcon />
            <span className="font-medium">{pub.date}</span>
          </div>
          {(pub.volume || pub.volumeTag) && (
            <span className="text-gray-400 text-xs border border-gray-200 rounded-full px-2 py-0.5">
              {pub.volume || pub.volumeTag}
            </span>
          )}
        </div>
        <h3 className="text-navy font-bold text-sm leading-snug mb-2 line-clamp-3">{pub.title}</h3>
        <p className="text-blue-500 text-xs mb-2 line-clamp-1">{pub.authors.join(", ")}</p>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 flex-1 mb-4">{pub.abstract}</p>
        <div className="flex items-center gap-2 mt-auto">
          <button className="flex items-center gap-1.5 bg-navy hover:bg-navy-dark text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex-1 justify-center">
            <EyeIcon />
            View Paper
          </button>
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium px-3 py-2 rounded-lg flex-shrink-0">
            {pub.citations} Citations
          </div>
        </div>
      </div>
    </div>
  );
}

// ── List Card (wide banner + two-column body) ─────────────────────────────────
function ListCard({ pub }) {
  const refs = citedBy[pub.id] || [];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Banner image */}
      <div className="relative h-48 sm:h-56 bg-gray-100 overflow-hidden">
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

      {/* Two-column body */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6">
        {/* Left — main info */}
        <div className="flex flex-col">
          {/* Meta row */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <CalendarIcon />
              <span className="font-medium">{pub.date}</span>
            </div>
            {(pub.volume || pub.volumeTag) && (
              <span className="text-gray-500 text-xs ml-auto">{pub.volume || pub.volumeTag}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-navy font-extrabold text-base sm:text-lg leading-snug mb-1.5">
            {pub.title}
          </h3>

          {/* Authors */}
          <p className="text-blue-500 text-sm font-medium mb-3">
            {pub.authors.join(", ")}
          </p>

          {/* Abstract */}
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-4 flex-1 mb-5">
            {pub.abstract}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-auto">
            <button className="flex items-center gap-1.5 bg-navy hover:bg-navy-dark text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors">
              <EyeIcon />
              View Paper
            </button>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              {pub.citations} Citations
            </div>
          </div>
        </div>

        {/* Right — Cited By */}
        <div className="border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
          <h4 className="text-navy font-bold text-sm mb-3">Citied By</h4>
          <div className="space-y-3">
            {refs.map((ref, i) => (
              <div key={i} className="group cursor-pointer">
                <p className="text-gray-700 text-xs font-medium leading-snug group-hover:text-blue-500 transition-colors line-clamp-2">
                  {ref.title}
                </p>
                <p className="text-gray-400 text-[11px] mt-0.5">
                  [{ref.year}] • {ref.authors}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Exported card that switches based on viewMode ─────────────────────────────
export default function PublicationCard({ pub, viewMode = "grid" }) {
  return viewMode === "list"
    ? <ListCard pub={pub} />
    : <GridCard pub={pub} />;
}
