import React, { useState } from "react";
import { Link } from "react-router-dom";

// ─── SDG Goals ─────────────────────────────────────────────────────────
const ALL_SDGS = [
  { id: "sdg1",  label: "GOAL 1: No Poverty",                count: 312 },
  { id: "sdg2",  label: "GOAL 2: Zero Hunger",               count: 92  },
  { id: "sdg3",  label: "GOAL 3: Good Health and Well-Being",        count: 98  },
  { id: "sdg4",  label: "GOAL 4: Quality Education",                 count: 67  },
  { id: "sdg5",  label: "GOAL 5: Gender Equality",                   count: 54  },
  { id: "sdg6",  label: "GOAL 6: Clean Water and Sanitation",        count: 43  },
  { id: "sdg7",  label: "GOAL 7: Affordable and Clean Energy",       count: 78  },
  { id: "sdg8",  label: "GOAL 8: Decent Work and Economic Growth",   count: 61  },
  { id: "sdg9",  label: "GOAL 9: Industry, Innovation and Infrastructure", count: 55 },
  { id: "sdg10", label: "GOAL 10: Reduced Inequalities",             count: 38  },
  { id: "sdg11", label: "GOAL 11: Sustainable Cities and Communities", count: 47 },
  { id: "sdg12", label: "GOAL 12: Responsible Consumption and Production", count: 33 },
  { id: "sdg13", label: "GOAL 13: Climate Action",                   count: 89  },
  { id: "sdg14", label: "GOAL 14: Life Below Water",                 count: 26  },
  { id: "sdg15", label: "GOAL 15: Life on Land",                     count: 41  },
  { id: "sdg16", label: "GOAL 16: Peace, Justice and Strong Institutions", count: 29 },
  { id: "sdg17", label: "GOAL 17: Partnerships for the Goals",       count: 18  },
];

const SDG_INITIAL_COUNT = 4;

// ─── Mock Data ─────────────────────────────────────────────────────────────
const faculties = [
  { id: "FKIK",  label: "FKIK",  count: 941 },
  { id: "FT",    label: "FT",    count: 324 },
  { id: "FMIPA", label: "FMIPA", count: 141 },
  { id: "FEB",   label: "FEB",   count: 681 },
  { id: "FKIP",  label: "FKIP",  count: 357 },
  { id: "FH",    label: "FH",    count: 427 },
  { id: "FISIP", label: "FISIP", count: 429 },
  { id: "FP",    label: "FP",    count: 654 },
];

const topics = [
  { id: "ai",   label: "Artificial Intelligence", count: 312 },
  { id: "nano", label: "Nanotechnology",           count: 92  },
  { id: "re",   label: "Renewable Energy",         count: 98  },
  { id: "gen",  label: "Genomics",                 count: 67  },
];

const networks = [
  { id: "ui",  label: "Universitas Indonesia",    count: 420 },
  { id: "upj", label: "Universitas Padjajaran",   count: 28  },
  { id: "ugm", label: "Universitas Gajah Mada",   count: 215 },
  { id: "uns", label: "Universitas Sebelas Maret", count: 189 },
];

const researchers = [
  { id: 1, name: "Prof. Dr. Eleanor Vance, Ph.D.", role: "Proffesor (Guru Besar)", dept: "Fakultas Teknik", hindex: 48, pubs: 248, projects: 18, citations: 4890 },
  { id: 2, name: "Prof. Dr. Eleanor Vance, Ph.D.", role: "Proffesor (Guru Besar)", dept: "Fakultas Teknik", hindex: 48, pubs: 248, projects: 18, citations: 4890 },
  { id: 3, name: "Prof. Dr. Eleanor Vance, Ph.D.", role: "Proffesor (Guru Besar)", dept: "Fakultas Teknik", hindex: 48, pubs: 248, projects: 18, citations: 4890 },
  { id: 4, name: "Prof. Dr. Eleanor Vance, Ph.D.", role: "Proffesor (Guru Besar)", dept: "Fakultas Teknik", hindex: 48, pubs: 248, projects: 18, citations: 4890 },
  { id: 5, name: "Prof. Dr. Eleanor Vance, Ph.D.", role: "Proffesor (Guru Besar)", dept: "Fakultas Teknik", hindex: 48, pubs: 248, projects: 18, citations: 4890 },
  { id: 6, name: "Prof. Dr. Eleanor Vance, Ph.D.", role: "Proffesor (Guru Besar)", dept: "Fakultas Teknik", hindex: 48, pubs: 248, projects: 18, citations: 4890 },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

/** Collapsible filter section */
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-sm font-bold text-gray-700 mb-0"
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

/** Single checkbox row */
function CheckRow({ label, count, checked, onChange }) {
  return (
    <label className="flex items-center justify-between py-1 cursor-pointer group">
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 rounded border-gray-300 accent-navy cursor-pointer"
        />
        <span className="text-sm text-gray-700 group-hover:text-navy transition-colors">{label}</span>
      </span>
      <span className="text-xs text-gray-400 font-medium">{count.toLocaleString()}</span>
    </label>
  );
}

/** Source badge pill — disesuaikan warnanya dengan desain */
const badgeStyles = {
  ORCID:           "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
  Scopus:          "bg-orange-100 text-orange-700 hover:bg-orange-200",
  OpenAlex:        "bg-purple-100 text-purple-700 hover:bg-purple-200",
  "Google Scholar":"bg-blue-100 text-blue-700 hover:bg-blue-200",
};

const badgeUrls = {
  ORCID:           "https://orcid.org",
  Scopus:          "https://www.scopus.com",
  OpenAlex:        "https://openalex.org",
  "Google Scholar":"https://scholar.google.com",
};

function SourceBadge({ label }) {
  return (
    <a
      href={badgeUrls[label] ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-xs font-bold px-3 py-1 rounded-full transition-colors cursor-pointer ${badgeStyles[label] ?? "bg-gray-100 text-gray-600"}`}
    >
      {label}
    </a>
  );
}

/** Researcher card */
function ResearcherCard({ researcher }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
      {/* Top row: photo + h-index badge */}
      <div className="flex items-start justify-between">
        <img
          src="/researcher-placeholder.png"
          alt={researcher.name}
          className="w-16 h-16 rounded-xl object-cover bg-gray-200"
          onError={(e) => {
            e.target.src = "";
            e.target.className = "w-16 h-16 rounded-xl object-cover bg-gradient-to-br from-slate-300 to-slate-500";
          }}
        />
        <span className="bg-navy text-white text-xs font-bold px-3 py-1.5 rounded-full">
          H-Index: {researcher.hindex}
        </span>
      </div>

      {/* Name / role / dept */}
      <div>
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-0.5">{researcher.name}</h3>
        <p className="text-sm font-semibold" style={{ color: "rgba(0, 99, 152, 1)" }}>{researcher.role}</p>
        <p className="text-sm text-gray-500">{researcher.dept}</p>
      </div>

      {/* Source badges — warna baru sesuai desain */}
      <div className="flex flex-wrap gap-1.5">
        {["ORCID", "Scopus", "OpenAlex", "Google Scholar"].map((b) => (
          <SourceBadge key={b} label={b} />
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 text-center">
        {[
          { val: researcher.pubs,      label: "PUBS"      },
          { val: researcher.projects,  label: "PROJECTS"  },
          { val: researcher.citations.toLocaleString(), label: "CITATIONS" },
        ].map(({ val, label }) => (
          <div key={label} className="px-2">
            <p className="font-extrabold text-gray-900 text-base">{val}</p>
            <p className="text-gray-400 text-[10px] font-semibold tracking-wide uppercase mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        to={`/researchers/${researcher.id}`}
        className="w-full bg-navy hover:bg-navy-dark text-white font-semibold text-sm py-2.5 rounded-xl transition-colors duration-150 text-center block"
      >
        View Full Profile
      </Link>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ResearchersPage() {
  const [searchQuery, setSearchQuery]       = useState("");
  const [topicSearch, setTopicSearch]       = useState("");
  const [checkedFaculties, setCheckedFaculties] = useState({ FKIK: true });
  const [checkedTopics, setCheckedTopics]   = useState({});
  const [checkedSdgs, setCheckedSdgs]       = useState({});
  const [checkedNetworks, setCheckedNetworks] = useState({});
  const [sortBy, setSortBy]                 = useState("Most Cited");
  const [currentPage, setCurrentPage]       = useState(1);
  const [sdgExpanded, setSdgExpanded]       = useState(false);
  const totalPages = 493;

  const toggleCheck = (setter, id) =>
    setter((prev) => ({ ...prev, [id]: !prev[id] }));

  const resetFilters = () => {
    setCheckedFaculties({});
    setCheckedTopics({});
    setCheckedSdgs({});
    setCheckedNetworks({});
    setSearchQuery("");
    setSortBy("Most Cited");
    setSdgExpanded(false);
  };

  const visibleSdgs = sdgExpanded ? ALL_SDGS : ALL_SDGS.slice(0, SDG_INITIAL_COUNT);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── Search Bar ── */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden px-4 gap-3">
              <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                placeholder="Search researchers..."
                className="flex-1 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />
            </div>
            <button
              onClick={() => { /* trigger search */ }}
              className="bg-navy hover:bg-navy-dark text-white font-bold text-sm px-7 py-3 rounded-xl transition-colors duration-150 flex-shrink-0"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ── Body: Sidebar + Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-7">

          {/* ──────── Sidebar Filter ──────── */}
          <aside className="w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-1">
                <span className="flex items-center gap-2 font-bold text-gray-800 text-sm">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                  Filter
                </span>
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold transition-colors hover:underline"
                  style={{ color: "rgba(0, 99, 152, 1)" }}
                >
                  Reset filters
                </button>
              </div>

              {/* Faculty — Tanpa tombol Show More */}
              <FilterSection title="Faculty">
                {faculties.map((f) => (
                  <CheckRow
                    key={f.id}
                    label={f.label}
                    count={f.count}
                    checked={!!checkedFaculties[f.id]}
                    onChange={() => toggleCheck(setCheckedFaculties, f.id)}
                  />
                ))}
              </FilterSection>

              {/* Topics — Tanpa tombol Show More */}
              <FilterSection title="Topics">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 mb-3 gap-2">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={topicSearch}
                    onChange={(e) => setTopicSearch(e.target.value)}
                    placeholder="Search topics..."
                    className="flex-1 text-xs text-gray-600 placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>
                {topics
                  .filter((t) => t.label.toLowerCase().includes(topicSearch.toLowerCase()))
                  .map((t) => (
                    <CheckRow
                      key={t.id}
                      label={t.label}
                      count={t.count}
                      checked={!!checkedTopics[t.id]}
                      onChange={() => toggleCheck(setCheckedTopics, t.id)}
                    />
                  ))}
              </FilterSection>

              {/* SDG — Show More tetap ada */}
              <FilterSection title="SDG">
                {visibleSdgs.map((s) => (
                  <CheckRow
                    key={s.id}
                    label={s.label}
                    count={s.count}
                    checked={!!checkedSdgs[s.id]}
                    onChange={() => toggleCheck(setCheckedSdgs, s.id)}
                  />
                ))}
                <button
                  onClick={() => setSdgExpanded((prev) => !prev)}
                  className="mt-2 text-xs font-semibold transition-colors hover:underline"
                  style={{ color: "rgba(0, 99, 152, 1)" }}
                >
                  {sdgExpanded ? "Show Less" : `Show More (${ALL_SDGS.length - SDG_INITIAL_COUNT} more)`}
                </button>
              </FilterSection>

              {/* Network */}
              <FilterSection title="Network" defaultOpen={true}>
                {networks.map((n) => (
                  <CheckRow
                    key={n.id}
                    label={n.label}
                    count={n.count}
                    checked={!!checkedNetworks[n.id]}
                    onChange={() => toggleCheck(setCheckedNetworks, n.id)}
                  />
                ))}
                <button className="mt-2 text-xs font-semibold" style={{ color: "rgba(0, 99, 152, 1)" }}>
                  Show More
                </button>
              </FilterSection>
            </div>
          </aside>

          {/* ──────── Main Content ──────── */}
          <div className="flex-1 min-w-0">

            {/* Results header */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-gray-800 font-semibold text-sm">
                Now showing{" "}
                <span className="font-bold">1– 4</span>{" "}
                of{" "}
                <span className="font-bold">1,561 results</span>
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 outline-none bg-white cursor-pointer"
                >
                  <option>Most Cited</option>
                  <option>Alphabetical</option>
                  <option>H-Index</option>
                </select>
              </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {researchers.map((r) => (
                <ResearcherCard key={r.id} researcher={r} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-700">1 - 4</span>
                {" "}of{" "}
                <span className="font-semibold text-gray-700">1,969 faculty members</span>
              </p>

              <div className="flex items-center gap-1">
                {/* Prev */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-navy hover:text-navy disabled:opacity-40 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page numbers */}
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold border transition-colors
                      ${currentPage === p
                        ? "bg-navy text-white border-navy"
                        : "border-gray-200 text-gray-600 hover:border-navy hover:text-navy"
                      }`}
                  >
                    {p}
                  </button>
                ))}
                <span className="px-1 text-gray-400 text-sm">...</span>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold border transition-colors
                    ${currentPage === totalPages
                      ? "bg-navy text-white border-navy"
                      : "border-gray-200 text-gray-600 hover:border-navy hover:text-navy"
                    }`}
                >
                  {totalPages}
                </button>

                {/* Next */}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-navy hover:text-navy disabled:opacity-40 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}