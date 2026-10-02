import React, { useState } from "react";
import FilterSidebar from "../components/publications/FilterSidebar";
import PublicationCard from "../components/publications/PublicationCard";
import { publications } from "../data/publicationsData";

const TOTAL = 151727;
const TOTAL_PAGES = 15173;
const PER_PAGE = 6;

// ── Icons ─────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const GridIcon = ({ active }) => (
  <svg className={`w-4 h-4 ${active ? "text-navy" : "text-gray-400"}`} viewBox="0 0 20 20" fill="currentColor">
    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ListIcon = ({ active }) => (
  <svg className={`w-4 h-4 ${active ? "text-navy" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

// ── Pagination helpers ─────────────────────────────────────────────────────────
/**
 * Builds a left-anchored token list so that after jumping to a page the window
 * starts at that page, e.g. current 26 → [26,27,"...",15173].
 * Near the end it slides back to include the last page, e.g. [15172,15173].
 */
function buildPages(current, total) {
  if (total <= 4) return Array.from({ length: total }, (_, i) => i + 1);

  let start = current;
  let end   = current + 1;

  // If the window runs past the last page, slide it back so the last page shows.
  if (end > total) {
    end   = total;
    start = Math.max(1, total - 1);
  }

  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  // Ellipsis (jump control) + last page when there is a real gap.
  if (end < total) {
    if (end < total - 1) pages.push("...");
    pages.push(total);
  }

  return pages;
}

// ── Pagination ────────────────────────────────────────────────────────────────
function Pagination({ current, total, onChange }) {
  const [openSide, setOpenSide] = React.useState(null); // null | "left" | "right"
  const [dotValue, setDotValue] = React.useState("");

  const pages = buildPages(current, total);

  const commitJump = () => {
    const n = parseInt(dotValue, 10);
    if (!isNaN(n) && n >= 1 && n <= total) onChange(n);
    setOpenSide(null);
    setDotValue("");
  };

  let dotCount = 0; // track which "..." we're on

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mt-8 pt-4 border-t border-gray-100">
      <p className="text-gray-400 text-xs">
        Displaying 1 – {PER_PAGE} of {TOTAL.toLocaleString()} publications
        &nbsp;•&nbsp; Page {current} of {TOTAL_PAGES.toLocaleString()}
      </p>

      <nav className="flex items-center gap-1">
        {/* ← Previous */}
        <button
          onClick={() => { if (current > 1) onChange(current - 1); }}
          disabled={current === 1}
          className="px-3 py-1.5 text-xs text-gray-500 hover:text-navy disabled:opacity-40 font-medium transition-colors"
        >
          &lt; Previous
        </button>

        {pages.map((p) => {
          if (p === "...") {
            dotCount++;
            const side   = dotCount === 1 ? "left" : "right";
            const isOpen = openSide === side;

            return isOpen ? (
              <span key={`dot-input-${side}`} className="flex items-center">
                <input
                  autoFocus
                  type="number"
                  min={1}
                  max={total}
                  value={dotValue}
                  onChange={e => setDotValue(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter")  commitJump();
                    if (e.key === "Escape") { setOpenSide(null); setDotValue(""); }
                  }}
                  onBlur={commitJump}
                  placeholder="pg"
                  className="w-14 h-8 text-center text-xs border-2 border-navy rounded-lg outline-none"
                />
              </span>
            ) : (
              <button
                key={`dot-btn-${side}`}
                onClick={() => { setOpenSide(side); setDotValue(""); }}
                title="Jump to page…"
                className="min-w-[32px] h-8 flex items-center justify-center text-xs rounded-lg font-medium text-gray-400 hover:bg-gray-100 hover:text-navy transition-colors"
              >
                …
              </button>
            );
          }

          return (
            <button
              key={`page-${p}`}
              onClick={() => onChange(p)}
              className={`min-w-[32px] h-8 flex items-center justify-center text-xs rounded-lg font-medium transition-colors
                ${p === current
                  ? "bg-navy text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {p}
            </button>
          );
        })}

        {/* Next → */}
        <button
          onClick={() => { if (current < total) onChange(current + 1); }}
          disabled={current === total}
          className="px-3 py-1.5 text-xs text-gray-500 hover:text-navy disabled:opacity-40 font-medium transition-colors"
        >
          Next &gt;
        </button>
      </nav>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PublicationsPage() {
  const [query,    setQuery]    = useState("");
  const [sortBy,   setSortBy]   = useState("Most Recent");
  const [viewMode, setViewMode] = useState("grid");   // "grid" | "list"
  const [page,     setPage]     = useState(1);
  const [yearStart, setYearStart] = useState(2006);
  const [yearEnd,   setYearEnd]   = useState(2026);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero Search Bar ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="flex items-center gap-5 bg-white rounded-2xl shadow-sm p-4">
          <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-xl px-4">
            <SearchIcon />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search publications..."
              className="flex-1 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>
          <button className="bg-navy hover:bg-navy-dark active:bg-navy-dark text-white font-bold text-sm px-10 py-3 rounded-xl transition-colors duration-150 flex-shrink-0">
            Search
          </button>
        </div>
      </div>

      {/* ── Main Layout ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6 items-start">

          {/* Sidebar */}
          <FilterSidebar
            yearStart={yearStart}
            yearEnd={yearEnd}
            setYearStart={setYearStart}
            setYearEnd={setYearEnd}
          />

          {/* Results Panel */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <p className="text-navy font-semibold text-sm">
                Now showing{" "}
                <span className="font-extrabold text-base">1 – {PER_PAGE}</span>{" "}
                of{" "}
                <span className="font-extrabold text-base">{TOTAL.toLocaleString()}</span>{" "}
                results
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-xs font-medium">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value)}
                      className="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-xs font-medium text-navy outline-none focus:border-navy bg-white"
                    >
                      <option>Most Recent</option>
                      <option>Most Cited</option>
                      <option>Oldest First</option>
                      <option>Title A–Z</option>
                    </select>
                    <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {/* View toggle */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 transition-colors ${viewMode === "grid" ? "bg-gray-100" : "bg-white hover:bg-gray-50"}`}
                    title="Grid view"
                  >
                    <GridIcon active={viewMode === "grid"} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 transition-colors ${viewMode === "list" ? "bg-gray-100" : "bg-white hover:bg-gray-50"}`}
                    title="List view"
                  >
                    <ListIcon active={viewMode === "list"} />
                  </button>
                </div>
              </div>
            </div>

            {/* Cards Grid */}
            <div className={viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
              : "flex flex-col gap-5"
            }>
              {publications.map(pub => (
                <PublicationCard key={pub.id} pub={pub} viewMode={viewMode} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination current={page} total={TOTAL_PAGES} onChange={setPage} />
          </div>

        </div>
      </div>
    </div>
  );
}
