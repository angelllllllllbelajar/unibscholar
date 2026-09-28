import React, { useState } from "react";

// ─── Mock Data ─────────────────────────────────────────────────────────────
const faculties = [
  { id: "FKIK", label: "FKIK", count: 94120 },
  { id: "FT",   label: "FT",   count: 32450 },
  { id: "FMIPA",label: "FMIPA",count: 14100 },
  { id: "FEB",  label: "FEB",  count: 6810  },
  { id: "FKIP", label: "FKIP", count: 4247  },
];

const topics = [
  { id: "ai",   label: "Artificial Intelligence", count: 312 },
  { id: "nano", label: "Nanotechnology",           count: 92  },
  { id: "re",   label: "Renewable Energy",         count: 98  },
  { id: "gen",  label: "Genomics",                 count: 67  },
];

const sdgs = [
  { id: "sdg1", label: "GOAL 1: No Poverty",              count: 312 },
  { id: "sdg2", label: "GOAL 2: Zero Hunger",             count: 92  },
  { id: "sdg3", label: "GOAL 3: Good Health and Well-Being", count: 98 },
  { id: "sdg4", label: "GOAL 4: Quality Education",       count: 67  },
];

const networks = [
  { id: "ui",  label: "Universitas Indonesia",   count: 420 },
  { id: "upj", label: "Universitas Padjajaran",  count: 28  },
  { id: "ugm", label: "Universitas Gajah Mada",  count: 215 },
  { id: "uns", label: "Universitas Sebelas Maret",count: 189 },
];

const researchers = [
  { id: 1, name: "Prof. Dr. Eleanor Vance, Ph.D.", role: "Proffesor (Guru Besar)", dept: "Fakultas Teknik", hindex: 48, pubs: 248, projects: 18, citations: 4890 },
  { id: 2, name: "Prof. Dr. Eleanor Vance, Ph.D.", role: "Proffesor (Guru Besar)", dept: "Fakultas Teknik", hindex: 48, pubs: 248, projects: 18, citations: 4890 },
  { id: 3, name: "Prof. Dr. Eleanor Vance, Ph.D.", role: "Proffesor (Guru Besar)", dept: "Fakultas Teknik", hindex: 48, pubs: 248, projects: 18, citations: 4890 },
  { id: 4, name: "Prof. Dr. Eleanor Vance, Ph.D.", role: "Proffesor (Guru Besar)", dept: "Fakultas Teknik", hindex: 48, pubs: 248, projects: 18, citations: 4890 },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

/** Collapsible filter section */
function FilterSection({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-sm font-bold text-gray-700 mb-0"
      >
        <span className="flex items-center gap-2">{icon}{title}</span>
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

/** Source badge pill */
const badgeStyles = {
  ORCID:         "border border-gray-300 text-gray-600",
  Scopus:        "border border-orange-300 text-orange-600 bg-orange-50",
  OpenAlex:      "border border-blue-300 text-blue-600 bg-blue-50",
  "Google Scholar": "border border-sky-300 text-sky-600 bg-sky-50",
};

function SourceBadge({ label }) {
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeStyles[label] ?? "border border-gray-200 text-gray-500"}`}>
      {label}
    </span>
  );
}

/** Researcher card */
function ResearcherCard({ researcher }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
      {/* Top row: photo + h-index badge */}
      <div className="flex items-start justify-between">
        <img
          src="/researcher-placeholder.jpg"
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

      {/* Source badges */}
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
      <button className="w-full bg-navy hover:bg-navy-dark text-white font-semibold text-sm py-2.5 rounded-xl transition-colors duration-150">
        View Full Profile
      </button>
    </div>
  );
}

// ─── Filter icons (tiny inline SVGs) ─────────────────────────────────────────
const FacultyIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
const TopicsIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
  </svg>
);
const SdgIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
  </svg>
);
const NetworkIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ResearchersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [topicSearch, setTopicSearch] = useState("");
  const [checkedFaculties, setCheckedFaculties] = useState({ FKIK: true });
  const [checkedTopics, setCheckedTopics] = useState({});
  const [checkedSdgs, setCheckedSdgs] = useState({});
  const [checkedNetworks, setCheckedNetworks] = useState({});
  const [sortBy, setSortBy] = useState("Most Recent");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 493;

  const toggleCheck = (setter, id) =>
    setter((prev) => ({ ...prev, [id]: !prev[id] }));

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
                placeholder="Search researchers..."
                className="flex-1 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />
            </div>
            <button className="bg-navy hover:bg-navy-dark text-white font-bold text-sm px-7 py-3 rounded-xl transition-colors duration-150 flex-shrink-0">
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
                <button className="text-xs font-semibold" style={{ color: "rgba(0, 99, 152, 1)" }}>
                  Reset filters
                </button>
              </div>

              {/* Faculty */}
              <FilterSection title="Faculty" icon={<FacultyIcon />}>
                {faculties.map((f) => (
                  <CheckRow
                    key={f.id}
                    label={f.label}
                    count={f.count}
                    checked={!!checkedFaculties[f.id]}
                    onChange={() => toggleCheck(setCheckedFaculties, f.id)}
                  />
                ))}
                <button className="mt-2 text-xs font-semibold" style={{ color: "rgba(0, 99, 152, 1)" }}>
                  Show More
                </button>
              </FilterSection>

              {/* Topics */}
              <FilterSection title="Topics" icon={<TopicsIcon />}>
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
                {topics.map((t) => (
                  <CheckRow
                    key={t.id}
                    label={t.label}
                    count={t.count}
                    checked={!!checkedTopics[t.id]}
                    onChange={() => toggleCheck(setCheckedTopics, t.id)}
                  />
                ))}
                <button className="mt-2 text-xs font-semibold" style={{ color: "rgba(0, 99, 152, 1)" }}>
                  Show More
                </button>
              </FilterSection>

              {/* SDG */}
              <FilterSection title="SDG" icon={<SdgIcon />}>
                {sdgs.map((s) => (
                  <CheckRow
                    key={s.id}
                    label={s.label}
                    count={s.count}
                    checked={!!checkedSdgs[s.id]}
                    onChange={() => toggleCheck(setCheckedSdgs, s.id)}
                  />
                ))}
                <button className="mt-2 text-xs font-semibold" style={{ color: "rgba(0, 99, 152, 1)" }}>
                  Show More
                </button>
              </FilterSection>

              {/* Network */}
              <FilterSection title="Network" icon={<NetworkIcon />} defaultOpen={true}>
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
                  <option>Most Recent</option>
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

                {/* Page numbers: 1, 2, 3, ..., 493 */}
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
