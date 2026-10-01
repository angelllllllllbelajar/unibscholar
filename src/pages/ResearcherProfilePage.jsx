import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ACCENT = "#1a73e8";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const researcher = {
  name: "Prof. Dr. Brian Yuliarto, Ph.D.",
  role: "GURU BESAR",
  faculty: "FAKULTAS TEKNIK",
  hindex: 47,
  photo: "/researcher-placeholder.png",
  orcid: "https://orcid.org",
  scopus: "https://www.scopus.com",
  openalex: "https://openalex.org",
  googleScholar: "https://scholar.google.com",
  publications: 403,
  projects: 95,
  pubYears: [2004, 2026],
  projYears: [2006, 2026],
};

const similarResearchers = [
  { id: 1, name: "Dr. Sarah Al-Mansoor",         match: 78, faculty: "FKIK",  pubs: 167, hindex: 39 },
  { id: 2, name: "Prof. Dr. Marcus Chen, FIEEE", match: 72, faculty: "FMIPA", pubs: 312, hindex: 54 },
  { id: 3, name: "Prof. Dr. Aris Thorne",        match: 66, faculty: "FMIPA", pubs: 198, hindex: 44 },
  { id: 4, name: "Dr. David Lindqvist",          match: 61, faculty: "FT",    pubs: 142, hindex: 35 },
];

const sdgGoals = [
  { id: 1,  label: "NO POVERTY", image: "/sdg-image/GOAL1.png" },
  { id: 3,  label: "GOOD HEALTH AND WELL-BEING", image: "/sdg-image/GOAL3.png" },
  { id: 4,  label: "QUALITY EDUCATION", image: "/sdg-image/GOAL4.png" },
  { id: 6,  label: "CLEAN WATER AND SANITATION", image: "/sdg-image/GOAL6.png" },
  { id: 7,  label: "AFFORDABLE AND CLEAN ENERGY", image: "/sdg-image/GOAL7.png" },
  { id: 8,  label: "DECENT WORK AND ECONOMIC GROWTH", image: "/sdg-image/GOAL8.png" },
  { id: 9,  label: "INDUSTRY, INNOVATION AND INFRASTRUCTURE", image: "/sdg-image/GOAL9.png" },
  { id: 11, label: "SUSTAINABLE CITIES AND COMMUNITIES", image: "/sdg-image/GOAL11.png" },
  { id: 12, label: "RESPONSIBLE CONSUMPTION AND PRODUCTION", image: "/sdg-image/GOAL12.png" },
  { id: 14, label: "LIFE BELOW WATER", image: "/sdg-image/GOAL14.png" },
  { id: 16, label: "PEACE, JUSTICE AND STRONG INSTITUTIONS", image: "/sdg-image/GOAL16.png" },
  { id: 17, label: "PARTNERSHIPS FOR THE GOALS", image: "/sdg-image/GOAL17.png" },
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

const networkNodes = [
  { id: "BY", label: "Prof. Brian Y.",   x: 395, y: 195, r: 19, color: "#fcc30b", main: true,  aff: "Universitas Bengkulu", weight: "—" },
  { id: "SA", label: "Dr. Sarah Al-M.",  x: 175, y: 48,  r: 13, color: "#12366b", aff: "FKIK",  weight: 18 },
  { id: "MC", label: "Prof. M. Chen",    x: 490, y: 50,  r: 13, color: "#12366b", aff: "FMIPA", weight: 14 },
  { id: "SL", label: "Sensors Lab",      x: 150, y: 238, r: 13, color: "#0d9488", aff: "Lab Partner", weight: 11 },
  { id: "MP", label: "MPI Munich",       x: 505, y: 238, r: 12, color: "#d97706", aff: "Intl. Partner", weight: 9 },
  { id: "N1", x: 70,  y: 25,  r: 7, color: "#d97706", aff: "FKIK",  weight: 4 },
  { id: "N2", x: 325, y: 25,  r: 7, color: "#d97706", aff: "FMIPA", weight: 5 },
  { id: "N3", x: 605, y: 18,  r: 7, color: "#12366b", aff: "FT",    weight: 3 },
  { id: "N4", x: 45,  y: 258, r: 7, color: "#6366f1", aff: "FKIP",  weight: 2 },
  { id: "N5", x: 325, y: 288, r: 7, color: "#6366f1", aff: "FEB",   weight: 3 },
  { id: "N6", x: 615, y: 255, r: 7, color: "#0d9488", aff: "Intl.", weight: 2 },
];

const networkEdges = [
  ["N1", "SA"], ["SA", "BY"], ["SA", "SL"], ["N2", "BY"], ["MC", "BY"],
  ["N3", "MC"], ["MC", "MP"], ["BY", "SL"], ["BY", "MP"], ["BY", "N5"],
  ["SL", "N4"], ["MP", "N6"],
];

// ─── Sparkline (area chart) ───────────────────────────────────────────────────
function Sparkline({ color, fill, points }) {
  const n = points.length;
  const W = 300, H = 60;
  const d = points
    .map((v, i) => `${i === 0 ? "M" : "L"}${(i / (n - 1)) * W},${H - v * (H - 6) - 2}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full">
      <path d={`${d} L${W},${H} L0,${H} Z`} fill={fill} />
      <path d={d} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const pubPoints  = [0.02, 0.05, 0.10, 0.16, 0.22, 0.30, 0.38, 0.46, 0.55, 0.63, 0.72, 0.80, 0.90, 1.0];
const projPoints = [0.02, 0.06, 0.14, 0.26, 0.38, 0.46, 0.50, 0.54, 0.58, 0.62, 0.66, 0.72, 0.85, 1.0];

// ─── SDG tile (official UN wheel image) ──────────────────────────────────────
function SdgTile({ goal }) {
  return (
    <img
      src={encodeURI(goal.image)}
      alt={`SDG ${goal.id}: ${goal.label}`}
      title={`SDG ${goal.id}: ${goal.label}`}
      className="aspect-square w-full rounded-md object-cover cursor-pointer hover:scale-105 transition-transform duration-150"
    />
  );
}

// ─── Collaboration Network (SVG canvas) ──────────────────────────────────────
function CollaborationNetwork() {
  const [hovered, setHovered] = useState(null);
  const [showFaculty, setShowFaculty] = useState(true);
  const [showResearchers, setShowResearchers] = useState(true);
  const [scale, setScale] = useState(1);
  const W = 660, H = 310;

  const hoveredNode = networkNodes.find((n) => n.id === hovered);

  return (
    <div className="flex gap-5 items-stretch">
      {/* Controls panel */}
      <div className="w-64 flex-shrink-0 bg-slate-100 rounded-xl p-4 flex flex-col">
        <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-3">Show Connections</p>
        <label className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2.5 mb-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showFaculty}
            onChange={() => setShowFaculty((v) => !v)}
            className="w-4 h-4 rounded cursor-pointer"
            style={{ accentColor: ACCENT }}
          />
          <span className="text-xs font-semibold text-slate-700">Faculty</span>
          <span className="ml-auto text-[11px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded">48</span>
        </label>
        <label className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={showResearchers}
            onChange={() => setShowResearchers((v) => !v)}
            className="w-4 h-4 rounded cursor-pointer"
            style={{ accentColor: ACCENT }}
          />
          <span className="text-xs font-semibold text-slate-700">Researchers</span>
          <span className="ml-auto text-[11px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded">73</span>
        </label>
        <div className="border-t border-slate-200 my-4" />
        <div className="bg-white rounded-lg p-3 flex items-start gap-2 mt-auto">
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke={ACCENT} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7 11l-2-2m4-2l1.5-1.5M11 7l2 2" />
          </svg>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Hover over any node in the canvas to inspect co-authorship weight &amp; affiliation details.
          </p>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="flex-1 relative min-h-[300px]">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
          <g transform={`translate(${W / 2} ${H / 2}) scale(${scale}) translate(${-W / 2} ${-H / 2})`}>
            {networkEdges.map(([a, b], i) => {
              const na = networkNodes.find((n) => n.id === a);
              const nb = networkNodes.find((n) => n.id === b);
              if (!na || !nb) return null;
              const dim = (showFaculty === false && !na.main && !nb.main) ||
                          (showResearchers === false && (na.main || nb.main));
              return (
                <line
                  key={i}
                  x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke="#cbd5e1" strokeWidth="1.2"
                  opacity={dim ? 0.25 : 1}
                />
              );
            })}
            {networkNodes.map((node) => (
              <g
                key={node.id}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                {node.main && <circle cx={node.x} cy={node.y} r={node.r + 7} fill="#e2e8f0" />}
                <circle
                  cx={node.x} cy={node.y} r={node.r}
                  fill={node.color}
                  stroke={node.main ? "#12366b" : hovered === node.id ? "#94a3b8" : "none"}
                  strokeWidth={node.main ? 3 : 1.5}
                />
                {node.main && (
                  <text x={node.x} y={node.y + 3.5} textAnchor="middle" fontSize="10" fill="#12366b" fontWeight="800">
                    BY
                  </text>
                )}
                {node.label && (
                  <text
                    x={node.x} y={node.y + node.r + 14}
                    textAnchor="middle" fontSize="9.5"
                    fill={node.main ? "#12366b" : "#64748b"}
                    fontWeight={node.main ? "800" : "600"}
                  >
                    {node.label}
                  </text>
                )}
              </g>
            ))}
          </g>
        </svg>

        {/* Hover tooltip */}
        {hoveredNode && (
          <div
            className="absolute pointer-events-none bg-white border border-slate-200 shadow-lg rounded-lg px-3 py-2 z-10"
            style={{
              left: `${(hoveredNode.x / W) * 100}%`,
              top: `${(hoveredNode.y / H) * 100}%`,
              transform: "translate(-50%, -130%)",
            }}
          >
            <p className="text-[11px] font-bold text-slate-800 whitespace-nowrap">
              {hoveredNode.label ?? `Collaborator ${hoveredNode.id}`}
            </p>
            <p className="text-[10px] text-slate-500 whitespace-nowrap">
              Co-authorship weight: <span className="font-bold text-slate-700">{hoveredNode.weight}</span>
            </p>
            <p className="text-[10px] text-slate-500 whitespace-nowrap">
              Affiliation: <span className="font-bold text-slate-700">{hoveredNode.aff}</span>
            </p>
          </div>
        )}

        {/* Zoom controls */}
        <div className="absolute bottom-1 right-0 flex bg-white border border-slate-200 rounded-lg overflow-hidden divide-x divide-slate-200 shadow-sm">
          <button
            onClick={() => setScale((s) => Math.min(2, s + 0.2))}
            className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-sm leading-none"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={() => setScale((s) => Math.max(0.6, s - 0.2))}
            className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-sm leading-none"
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            aria-label="Fullscreen"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4-4l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ResearcherProfilePage() {
  const navigate = useNavigate();
  const [topicsExpanded, setTopicsExpanded] = useState(false);

  const visibleTopics = topicsExpanded ? allTopics : allTopics.slice(0, 6);
  const hiddenCount = allTopics.length - 6;

  return (
    <div className="bg-[#f1f5f9] min-h-screen">

      {/* ── Sub-header: back + share ── */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/researchers")}
          className="flex items-center gap-2 text-[13px] font-medium text-slate-600 hover:text-navy transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Researchers Directory
        </button>
        <button className="flex items-center gap-2 bg-white border border-slate-200/70 shadow-sm rounded-lg px-4 py-2 text-[13px] font-bold text-slate-700 hover:text-navy transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share Profile
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pb-14 space-y-6">

        {/* ── Profile Card ── */}
        <div className="bg-gradient-to-r from-white to-slate-50 rounded-2xl border border-slate-100 shadow-sm p-7">
          <div className="flex items-start gap-7">
            {/* Photo */}
            <img
              src={researcher.photo}
              alt={researcher.name}
              className="w-[120px] h-[120px] rounded-full object-cover flex-shrink-0 bg-slate-200"
            />

            {/* Info */}
            <div className="flex-1 min-w-0 pt-1">
              <h1 className="text-[28px] font-extrabold text-slate-900 leading-tight mb-3">
                {researcher.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-slate-100 text-slate-700 text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-md">
                  {researcher.role}
                </span>
                <span className="bg-slate-100 text-slate-700 text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-md flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {researcher.faculty}
                </span>
              </div>
              <div className="border-t border-slate-200 max-w-md pt-3.5">
                <div className="flex flex-wrap gap-2">
                  <a href={researcher.orcid} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors">
                    ORCID
                  </a>
                  <a href={researcher.scopus} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors">
                    Scopus
                  </a>
                  <a href={researcher.openalex} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors">
                    OpenAlex
                  </a>
                  <a href={researcher.googleScholar} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                    Google Scholar
                  </a>
                </div>
              </div>
            </div>

            {/* H-Index + CTA */}
            <div className="flex flex-col items-stretch gap-2.5 flex-shrink-0 pt-2">
              <div className="bg-navy text-white text-sm font-bold px-6 py-2.5 rounded-lg text-center">
                H-Index: {researcher.hindex}
              </div>
              <button className="flex items-center justify-center gap-2 bg-[#f5b919] hover:bg-[#e0a80f] text-navy-dark text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact &amp; Collaborate
              </button>
            </div>
          </div>
        </div>

        {/* ── Publication & Project stat cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#e8f1fb] rounded-xl p-6">
            <p className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: ACCENT }}>
              Publications
            </p>
            <p className="text-[28px] font-extrabold text-navy leading-none mb-4">{researcher.publications}</p>
            <div className="h-14">
              <Sparkline color="#1d6fa8" fill="rgba(29,111,168,0.18)" points={pubPoints} />
            </div>
            <div className="flex justify-between text-xs text-slate-500 font-medium mt-2">
              <span>{researcher.pubYears[0]}</span>
              <span>{researcher.pubYears[1]}</span>
            </div>
          </div>
          <div className="bg-[#e8f7ee] rounded-xl p-6">
            <p className="text-[11px] font-bold tracking-widest uppercase mb-1 text-[#27ae60]">
              Projects
            </p>
            <p className="text-[28px] font-extrabold text-navy leading-none mb-4">{researcher.projects}</p>
            <div className="h-14">
              <Sparkline color="#27ae60" fill="rgba(39,174,96,0.16)" points={projPoints} />
            </div>
            <div className="flex justify-between text-xs text-slate-500 font-medium mt-2">
              <span>{researcher.projYears[0]}</span>
              <span>{researcher.projYears[1]}</span>
            </div>
          </div>
        </div>

        {/* ── Lower: Sidebar + Right column ── */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── Similar Researchers Sidebar ── */}
          <div className="w-full lg:w-[292px] flex-shrink-0 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-1.5">
              <h2 className="text-[15px] font-bold text-slate-900">Similar Researchers</h2>
              <button className="text-slate-400 hover:text-slate-600" aria-label="About similar researchers">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Faculty with overlapping research topics &amp; co-citations.
            </p>

            <div className="space-y-3">
              {similarResearchers.map((r) => (
                <div
                  key={r.id}
                  className="bg-slate-100 rounded-xl p-3.5 hover:bg-slate-200/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-0.5 gap-2">
                    <p className="text-[13px] font-bold text-slate-800 leading-snug flex-1">{r.name}</p>
                    <span className="text-[11px] font-bold whitespace-nowrap" style={{ color: ACCENT }}>
                      {r.match}% Match
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mb-2">{r.faculty}</p>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span><span className="font-bold text-slate-700">{r.pubs}</span> Pubs</span>
                    <span className="text-slate-300">•</span>
                    <span>H-Index: <span className="font-bold text-slate-700">{r.hindex}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* SDG Alignment */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <svg className="w-5 h-5" fill="none" stroke={ACCENT} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-[15px] font-bold text-slate-900">Sustainable Development Goals (SDG) Alignment</h2>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-3.5">
                {sdgGoals.map((g) => (
                  <SdgTile key={g.id} goal={g} />
                ))}
              </div>
            </div>

            {/* Key Research Topics */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <svg className="w-5 h-5" fill="none" stroke={ACCENT} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 4v4m0 0v2m0-2H7m5 0h5M7 8v2m10-2v2M5 12h4m6 0h4M7 12v2m10-2v2m-12 0h4v4H5zm10 0h4v4h-4z" />
                </svg>
                <h2 className="text-[15px] font-bold text-slate-900">Key Research Topics</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                {visibleTopics.map((t) => (
                  <div
                    key={t}
                    className="bg-slate-100 rounded-lg px-4 py-3 text-[13px] font-semibold text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
                  >
                    {t}
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setTopicsExpanded((v) => !v)}
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/70 text-[13px] font-bold text-slate-700 rounded-lg px-5 py-2.5 transition-colors"
                >
                  {topicsExpanded ? "Show less topics" : `Show more topics (${hiddenCount}+)`}
                  <svg className={`w-3.5 h-3.5 transition-transform ${topicsExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Collaboration Network */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <svg className="w-5 h-5" fill="none" stroke={ACCENT} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8.5 14.5L15 18m-6.5-3.5L15 6m-6.5 8.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm9-8.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm0 12a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <h2 className="text-[15px] font-bold text-slate-900">Collaboration Network</h2>
                </div>
                <span className="flex items-center gap-1.5 bg-blue-50 rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENT }} />
                  <span className="text-[11px] font-bold" style={{ color: ACCENT }}>Live Synced Graph</span>
                </span>
              </div>
              <CollaborationNetwork />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
