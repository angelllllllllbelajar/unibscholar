import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const researcher = {
  name: "Prof. Dr. Brian Yuliarto, Ph.D.",
  role: "GURU BESAR",
  faculty: "FAKULTAS TEKNIK",
  hindex: 47,
  photo: null,
  orcid: "https://orcid.org",
  scopus: "https://www.scopus.com",
  openalex: "https://openalex.org",
  googleScholar: "https://scholar.google.com",
  publications: 403,
  projects: 95,
  pubYearStart: 2004,
  pubYearEnd: 2026,
  projYearStart: 2008,
  projYearEnd: 2026,
};

const similarResearchers = [
  { id: 1, name: "Dr. Sarah Al-Mansoor",       match: 78, faculty: "FKIK", pubs: 167, hindex: 39 },
  { id: 2, name: "Prof. Dr. Marcus Chen, FIEEE", match: 72, faculty: "FMIPA", pubs: 312, hindex: 54 },
  { id: 3, name: "Prof. Dr. Aria Thorne",       match: 66, faculty: "FMIPA", pubs: 188, hindex: 44 },
  { id: 4, name: "Dr. David Lindqvist",         match: 61, faculty: "FT",   pubs: 142, hindex: 35 },
];

const sdgGoals = [
  { id: 1,  color: "#e5243b", label: "NO POVERTY",                         icon: "🏘" },
  { id: 3,  color: "#4c9f38", label: "GOOD HEALTH AND WELL-BEING",         icon: "💚" },
  { id: 4,  color: "#c5192d", label: "QUALITY EDUCATION",                  icon: "📚" },
  { id: 6,  color: "#26bde2", label: "CLEAN WATER AND SANITATION",         icon: "💧" },
  { id: 7,  color: "#fcc30b", label: "AFFORDABLE AND CLEAN ENERGY",        icon: "☀" },
  { id: 8,  color: "#a21942", label: "DECENT WORK AND ECONOMIC GROWTH",    icon: "📈" },
  { id: 9,  color: "#fd6925", label: "INDUSTRY, INNOVATION AND INFRASTRUCTURE", icon: "🏭" },
  { id: 11, color: "#fd9d24", label: "SUSTAINABLE CITIES AND COMMUNITIES", icon: "🏙" },
  { id: 12, color: "#bf8b2e", label: "RESPONSIBLE CONSUMPTION AND PRODUCTION", icon: "♻" },
  { id: 14, color: "#0a97d9", label: "LIFE BELOW WATER",                   icon: "🐟" },
  { id: 16, color: "#00689d", label: "PEACE, JUSTICE AND STRONG INSTITUTIONS", icon: "⚖" },
  { id: 17, color: "#19486a", label: "PARTNERSHIPS FOR THE GOALS",         icon: "🤝" },
];

const allTopics = [
  "Chemical Sensor Tech",
  "Gas Sensing & Materials",
  "Electrochemical Supercapacitor",
  "Semiconductor Nanowires",
  "Photocatalytic Solar Fuels",
  "Environmental Gas Metrology",
  "Nanostructured Materials",
  "Biosensor Development",
  "Energy Storage Systems",
  "Carbon Nanotube Electronics",
  "Metal Oxide Semiconductors",
  "Hydrogen Production",
  "Electrodeposition",
  "Surface Functionalization",
];

// Collaboration network nodes
const networkNodes = [
  { id: "BY", label: "Prof. Brian Y.", x: 340, y: 160, r: 20, color: "#fcc30b", textColor: "#1a2b5f", isMain: true },
  { id: "SA", label: "Dr. Sarah Al-M.",  x: 220, y: 90,  r: 14, color: "#1a2b5f", textColor: "#fff" },
  { id: "MC", label: "Prof. M. Chan",   x: 460, y: 75,  r: 14, color: "#1a2b5f", textColor: "#fff" },
  { id: "SL", label: "Sensors Lab",     x: 185, y: 185, r: 13, color: "#0d9488", textColor: "#fff" },
  { id: "MP", label: "MPI Munich",      x: 505, y: 195, r: 13, color: "#0d9488", textColor: "#fff" },
  { id: "N1", label: "",                x: 135, y: 55,  r: 7,  color: "#fb923c", textColor: "#fff" },
  { id: "N2", label: "",                x: 370, y: 40,  r: 7,  color: "#fb923c", textColor: "#fff" },
  { id: "N3", label: "",                x: 540, y: 120, r: 7,  color: "#64748b", textColor: "#fff" },
  { id: "N4", label: "",                x: 90,  y: 195, r: 7,  color: "#64748b", textColor: "#fff" },
  { id: "N5", label: "",                x: 290, y: 220, r: 7,  color: "#7c3aed", textColor: "#fff" },
  { id: "N6", label: "",                x: 595, y: 195, r: 7,  color: "#64748b", textColor: "#fff" },
];

const networkEdges = [
  ["BY", "SA"], ["BY", "MC"], ["BY", "SL"], ["BY", "MP"],
  ["SA", "N1"], ["SA", "N4"], ["MC", "N2"], ["MC", "N3"],
  ["SL", "N4"], ["MP", "N6"], ["BY", "N5"],
];

// ─── Mini sparkline chart (SVG) ──────────────────────────────────────────────
function Sparkline({ color = "#0ea5e9", fill = "rgba(14,165,233,0.15)", points, width = 310, height = 55 }) {
  // Normalise points array [0..1] into SVG path
  const n = points.length;
  const xs = points.map((_, i) => (i / (n - 1)) * width);
  const ys = points.map((v) => height - v * height);
  const d = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  const fillD = `${d} L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <path d={fillD} fill={fill} />
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Fake pub trend data
const pubPoints  = [0.02, 0.04, 0.08, 0.10, 0.15, 0.20, 0.28, 0.35, 0.44, 0.52, 0.63, 0.75, 0.88, 1.0];
const projPoints = [0.0,  0.03, 0.06, 0.12, 0.18, 0.28, 0.38, 0.50, 0.62, 0.73, 0.82, 0.90, 0.96, 1.0];

// ─── Collaboration Network (SVG canvas) ──────────────────────────────────────
function CollaborationNetwork() {
  const [hovered, setHovered] = useState(null);
  const [showFaculty, setShowFaculty] = useState(true);
  const [showResearchers, setShowResearchers] = useState(true);
  const W = 560, H = 250;

  return (
    <div className="flex gap-4">
      {/* Controls panel */}
      <div className="w-52 flex-shrink-0">
        <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-3">Show Connections</p>
        <label className="flex items-center gap-2 mb-2 cursor-pointer">
          <span
            className="w-4 h-4 rounded-sm flex-shrink-0"
            style={{ backgroundColor: showFaculty ? "#1a2b5f" : "#d1d5db" }}
            onClick={() => setShowFaculty(p => !p)}
          />
          <span className="text-xs font-semibold text-gray-700">Faculty</span>
          <span className="ml-auto text-xs bg-gray-100 text-gray-500 font-bold px-1.5 py-0.5 rounded">48</span>
        </label>
        <label className="flex items-center gap-2 mb-4 cursor-pointer">
          <span
            className="w-4 h-4 rounded-sm flex-shrink-0"
            style={{ backgroundColor: showResearchers ? "#1a2b5f" : "#d1d5db" }}
            onClick={() => setShowResearchers(p => !p)}
          />
          <span className="text-xs font-semibold text-gray-700">Researchers</span>
          <span className="ml-auto text-xs bg-gray-100 text-gray-500 font-bold px-1.5 py-0.5 rounded">73</span>
        </label>
        <div className="border-t border-gray-100 pt-3 flex items-start gap-2">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Hover over any node in the canvas to inspect co-authorship weight &amp; affiliation details.
          </p>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="flex-1 relative border border-gray-100 rounded-xl overflow-hidden bg-gray-50 min-h-[250px]">
        <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
          {/* Edges */}
          {networkEdges.map(([a, b], i) => {
            const na = networkNodes.find(n => n.id === a);
            const nb = networkNodes.find(n => n.id === b);
            if (!na || !nb) return null;
            return (
              <line
                key={i}
                x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke="#cbd5e1" strokeWidth="1.2"
              />
            );
          })}
          {/* Nodes */}
          {networkNodes.map((node) => (
            <g
              key={node.id}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <circle
                cx={node.x} cy={node.y} r={node.r}
                fill={node.color}
                opacity={hovered && hovered !== node.id ? 0.55 : 1}
                stroke={hovered === node.id ? "#fff" : "none"}
                strokeWidth="2"
              />
              {node.label && (
                <text
                  x={node.x}
                  y={node.y + node.r + 12}
                  textAnchor="middle"
                  fontSize="9"
                  fill={node.isMain ? "#1a2b5f" : "#64748b"}
                  fontWeight={node.isMain ? "700" : "500"}
                >
                  {node.label}
                </text>
              )}
              {node.isMain && (
                <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="9" fill="#1a2b5f" fontWeight="700">
                  BY
                </text>
              )}
            </g>
          ))}
        </svg>

        {/* Controls bottom-right */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1">
          <button className="w-6 h-6 rounded border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-navy text-sm leading-none">+</button>
          <button className="w-6 h-6 rounded border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-navy text-sm leading-none">−</button>
          <button className="w-6 h-6 rounded border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-navy">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SDG Tile ─────────────────────────────────────────────────────────────────
function SdgTile({ goal }) {
  return (
    <div
      className="relative rounded-lg overflow-hidden flex flex-col justify-between p-2 cursor-pointer hover:scale-105 transition-transform duration-150"
      style={{ backgroundColor: goal.color, width: 72, height: 72, flexShrink: 0 }}
      title={`SDG ${goal.id}: ${goal.label}`}
    >
      <div className="text-white text-[9px] font-bold leading-tight opacity-90 uppercase tracking-wide">
        {goal.id} {goal.label}
      </div>
      <div className="text-white text-2xl self-end leading-none">{goal.icon}</div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ResearcherProfilePage() {
  const navigate = useNavigate();
  const [topicsExpanded, setTopicsExpanded] = useState(false);

  const visibleTopics = topicsExpanded ? allTopics : allTopics.slice(0, 6);
  const hiddenCount = allTopics.length - 6;

  const badgeBase = "text-xs font-medium px-2.5 py-0.5 rounded-full border";

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── Top navigation bar (back + share) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate("/researchers")}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Researchers Directory
        </button>
        <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-navy transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share Profile
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-5">

        {/* ── Profile Card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-start gap-5">
            {/* Photo */}
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-slate-300 to-slate-500 flex-shrink-0">
              <img
                src="/researcher-placeholder.jpg"
                alt={researcher.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-1">
                {researcher.name}
              </h1>
              <div className="flex items-center gap-3 mb-2.5">
                <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">
                  {researcher.role}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-gray-600">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {researcher.faculty}
                </span>
              </div>
              {/* Source badges */}
              <div className="flex flex-wrap gap-2">
                <a href={researcher.orcid} target="_blank" rel="noopener noreferrer"
                  className={`${badgeBase} border-gray-300 text-gray-600 hover:bg-gray-50`}>
                  ORCID
                </a>
                <a href={researcher.scopus} target="_blank" rel="noopener noreferrer"
                  className={`${badgeBase} border-orange-300 text-orange-600 bg-orange-50 hover:bg-orange-100`}>
                  Scopus
                </a>
                <a href={researcher.openalex} target="_blank" rel="noopener noreferrer"
                  className={`${badgeBase} border-blue-300 text-blue-600 bg-blue-50 hover:bg-blue-100`}>
                  OpenAlex
                </a>
                <a href={researcher.googleScholar} target="_blank" rel="noopener noreferrer"
                  className={`${badgeBase} border-sky-300 text-sky-600 bg-sky-50 hover:bg-sky-100`}>
                  Google Scholar
                </a>
              </div>
            </div>

            {/* H-Index + CTA */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <div className="bg-navy text-white text-sm font-bold px-5 py-2 rounded-xl">
                H-Index: {researcher.hindex}
              </div>
              <button className="flex items-center gap-2 border border-yellow-400 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 text-sm font-semibold px-5 py-2 rounded-xl transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact &amp; Collaborate
              </button>
            </div>
          </div>
        </div>

        {/* ── Publication & Project Charts ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="grid grid-cols-2 gap-0 divide-x divide-gray-100">
            {/* Publications */}
            <div className="pr-8">
              <p className="text-[10px] font-bold tracking-widest uppercase text-sky-500 mb-1">Publications</p>
              <p className="text-3xl font-extrabold text-gray-900 mb-4">{researcher.publications}</p>
              <div className="h-14">
                <Sparkline
                  color="#0ea5e9"
                  fill="rgba(14,165,233,0.12)"
                  points={pubPoints}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-1">
                <span>{researcher.pubYearStart}</span>
                <span>{researcher.pubYearEnd}</span>
              </div>
            </div>
            {/* Projects */}
            <div className="pl-8">
              <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-500 mb-1">Projects</p>
              <p className="text-3xl font-extrabold text-gray-900 mb-4">{researcher.projects}</p>
              <div className="h-14">
                <Sparkline
                  color="#10b981"
                  fill="rgba(16,185,129,0.12)"
                  points={projPoints}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-1">
                <span>{researcher.projYearStart}</span>
                <span>{researcher.projYearEnd}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Lower: Sidebar + Right column ── */}
        <div className="flex gap-5 items-start">

          {/* ── Similar Researchers Sidebar ── */}
          <div className="w-56 flex-shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <h2 className="text-sm font-bold text-gray-800">Similar Researchers</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mb-4 leading-relaxed">
              Faculty with overlapping research topics &amp; co-citations.
            </p>

            <div className="space-y-3">
              {similarResearchers.map((r) => (
                <div
                  key={r.id}
                  className="border border-gray-100 rounded-xl p-3 hover:border-navy/30 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-0.5">
                    <p className="text-xs font-bold text-gray-800 leading-tight flex-1 pr-1">{r.name}</p>
                    <span className="text-[10px] font-bold text-emerald-600 whitespace-nowrap">{r.match}% Match</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium mb-1.5">{r.faculty}</p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <span>{r.pubs} Pubs</span>
                    <span className="text-gray-300">•</span>
                    <span>H-Index: {r.hindex}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* SDG Alignment */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🌐</span>
                <h2 className="text-sm font-bold text-gray-800">Sustainable Development Goals (SDG) Alignment</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {sdgGoals.map((g) => (
                  <SdgTile key={g.id} goal={g} />
                ))}
              </div>
            </div>

            {/* Key Research Topics */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h2 className="text-sm font-bold text-gray-800">Key Research Topics</h2>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {visibleTopics.map((t) => (
                  <div
                    key={t}
                    className="border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-medium text-gray-700 hover:border-navy/40 hover:text-navy transition-colors cursor-pointer"
                  >
                    {t}
                  </div>
                ))}
              </div>
              {!topicsExpanded && hiddenCount > 0 && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setTopicsExpanded(true)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg px-4 py-2 hover:border-navy/40 hover:text-navy transition-colors"
                  >
                    Show more topics ({hiddenCount}+)
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
              {topicsExpanded && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setTopicsExpanded(false)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg px-4 py-2 hover:border-navy/40 hover:text-navy transition-colors"
                  >
                    Show less
                    <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Collaboration Network */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h2 className="text-sm font-bold text-gray-800">Collaboration Network</h2>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-semibold text-emerald-600">Live Synced Graph</span>
                </div>
              </div>
              <CollaborationNetwork />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
