import React, { useState, useMemo } from "react";
import SearchBar from "../components/shared/SearchBar";
import {
  FilterSidebar,
  FilterSection,
  FilterCheckRow,
  FilterSearch,
  FilterLink,
} from "../components/shared/FilterSidebar";
import ProjectTimeline from "../components/publications/ProjectTimeline";
import PublicationCard from "../components/publications/PublicationCard";
import PaperModal from "../components/publications/PaperModal";
import Pagination from "../components/publications/Pagination";
import {
  TOTAL,
  TOTAL_PAGES,
  TOTAL_PAGES_LIST,
  PER_PAGE,
  PER_PAGE_LIST,
  SDG_INITIAL_COUNT,
  YEAR_MIN,
  YEAR_MAX,
  publications,
  faculties,
  authors,
  topics,
  sdgGoals,
} from "../data/publicationsData";
import "../styles/pages/publications.css";

const GridIcon = ({ active }) => (
  <svg className={`view-toggle__icon ${active ? "view-toggle__icon--active" : ""}`} viewBox="0 0 20 20" fill="currentColor">
    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ListIcon = ({ active }) => (
  <svg className={`view-toggle__icon ${active ? "view-toggle__icon--active" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

export default function PublicationsPage() {
  const [query,    setQuery]    = useState("");
  const [sortBy,   setSortBy]   = useState("Most Recent");
  const [viewMode, setViewMode] = useState("grid");
  const [page,     setPage]     = useState(1);
  const [yearStart, setYearStart] = useState(YEAR_MIN);
  const [yearEnd,   setYearEnd]   = useState(YEAR_MAX);

  const [authorSearch, setAuthorSearch] = useState("");
  const [topicsSearch, setTopicsSearch] = useState("");

  const [checkedFaculties, setCheckedFaculties] = useState(() =>
    Object.fromEntries(faculties.map((f) => [f.name, !!f.checked]))
  );
  const [checkedAuthors, setCheckedAuthors] = useState({});
  const [checkedTopics,  setCheckedTopics]  = useState({});
  const [checkedSdgs,    setCheckedSdgs]    = useState({});

  const [facultyOpen, setFacultyOpen] = useState(true);
  const [authorOpen,  setAuthorOpen]  = useState(true);
  const [topicsOpen,  setTopicsOpen]  = useState(true);
  const [sdgOpen,     setSdgOpen]     = useState(true);
  const [sdgExpanded, setSdgExpanded] = useState(false);

  const [selectedPub, setSelectedPub] = useState(null);

  const toggleCheck = (setter, key) => setter((prev) => ({ ...prev, [key]: !prev[key] }));

  const resetFilters = () => {
    setCheckedFaculties(Object.fromEntries(faculties.map((f) => [f.name, false])));
    setCheckedAuthors({});
    setCheckedTopics({});
    setCheckedSdgs({});
    setAuthorSearch("");
    setTopicsSearch("");
    setQuery("");
    setYearStart(YEAR_MIN);
    setYearEnd(YEAR_MAX);
    setSdgExpanded(false);
    setPage(1);
  };

  // ── Search + filter against dummy data ──────────────────────────────────────
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications.filter((pub) => {
      // Text search: title, authors, abstract
      if (q) {
        const haystack = [
          pub.title,
          pub.abstract,
          ...pub.authors,
        ].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      // Faculty filter (any checked faculty must match)
      const anyFaculty = Object.values(checkedFaculties).some(Boolean);
      if (anyFaculty && !checkedFaculties[pub.faculty]) return false;

      return true;
    });
  }, [query, checkedFaculties]);

  // ── View-mode derived values ──────────────────────────────────────────────
  const perPage    = viewMode === "list" ? PER_PAGE_LIST : PER_PAGE;
  const totalPages = viewMode === "list" ? TOTAL_PAGES_LIST : TOTAL_PAGES;

  const switchView = (mode) => {
    if (mode !== viewMode) { setViewMode(mode); setPage(1); }
  };

  // Slice filtered results to perPage (in real app: server-side pagination)
  const visiblePubs = filtered.slice(0, perPage);

  // Result count: use real filtered count if query active, else full TOTAL
  const displayTotal = query || Object.values(checkedFaculties).some(Boolean)
    ? filtered.length
    : TOTAL;

  const visibleSdgs = sdgExpanded ? sdgGoals : sdgGoals.slice(0, SDG_INITIAL_COUNT);

  return (
    <div className="page-root">
      <SearchBar
        value={query}
        onChange={(v) => { setQuery(v); setPage(1); }}
        onSubmit={() => setPage(1)}
        placeholder="Search publications..."
      />

      <div className="page-container page-body">
        <FilterSidebar onReset={resetFilters}>
          <ProjectTimeline
            yearStart={yearStart}
            yearEnd={yearEnd}
            setYearStart={setYearStart}
            setYearEnd={setYearEnd}
          />

          <FilterSection title="Faculty" open={facultyOpen} onToggle={() => setFacultyOpen((v) => !v)}>
            <div className="filter-list">
              {faculties.map((f) => (
                <FilterCheckRow
                  key={f.name}
                  id={`faculty-${f.name}`}
                  label={f.name}
                  count={f.count}
                  checked={!!checkedFaculties[f.name]}
                  onChange={() => toggleCheck(setCheckedFaculties, f.name)}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Author" open={authorOpen} onToggle={() => setAuthorOpen((v) => !v)}>
            <FilterSearch value={authorSearch} onChange={setAuthorSearch} />
            <div className="filter-list">
              {authors
                .filter((a) => a.name.toLowerCase().includes(authorSearch.toLowerCase()))
                .map((a) => (
                  <FilterCheckRow
                    key={a.name}
                    id={`author-${a.name}`}
                    label={a.name}
                    count={a.count}
                    checked={!!checkedAuthors[a.name]}
                    onChange={() => toggleCheck(setCheckedAuthors, a.name)}
                  />
                ))}
            </div>
          </FilterSection>

          <FilterSection title="Topics" open={topicsOpen} onToggle={() => setTopicsOpen((v) => !v)}>
            <FilterSearch value={topicsSearch} onChange={setTopicsSearch} />
            <div className="filter-list">
              {topics
                .filter((t) => t.name.toLowerCase().includes(topicsSearch.toLowerCase()))
                .map((t) => (
                  <FilterCheckRow
                    key={t.name}
                    id={`topic-${t.name}`}
                    label={t.name}
                    count={t.count}
                    checked={!!checkedTopics[t.name]}
                    onChange={() => toggleCheck(setCheckedTopics, t.name)}
                  />
                ))}
            </div>
          </FilterSection>

          <FilterSection title="SDG" open={sdgOpen} onToggle={() => setSdgOpen((v) => !v)}>
            <div className="filter-list">
              {visibleSdgs.map((s) => (
                <FilterCheckRow
                  key={s.name}
                  id={`sdg-${s.name}`}
                  label={s.name}
                  count={s.count}
                  checked={!!checkedSdgs[s.name]}
                  onChange={() => toggleCheck(setCheckedSdgs, s.name)}
                />
              ))}
            </div>
            <FilterLink onClick={() => setSdgExpanded((v) => !v)}>
              {sdgExpanded ? "Show Less" : "Show More"}
            </FilterLink>
          </FilterSection>
        </FilterSidebar>

        <div className="page-main">
          <div className="pub-results-header">
            <p className="pub-results-text">
              Now showing <strong>1 – {Math.min(perPage, visiblePubs.length)}</strong> of{" "}
              <strong>{displayTotal.toLocaleString()}</strong> results
              {query && (
                <span className="text-gray-400 font-normal">
                  {" "}for "<em>{query}</em>"
                </span>
              )}
            </p>
            <div className="pub-results-controls">
              <div className="pub-sort">
                <span className="pub-sort__label">Sort by:</span>
                <div className="pub-sort__wrap">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pub-sort__select"
                  >
                    <option>Most Recent</option>
                    <option>Most Cited</option>
                    <option>Oldest First</option>
                    <option>Title A–Z</option>
                  </select>
                  <svg className="pub-sort__chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="view-toggle">
                <button
                  type="button"
                  onClick={() => switchView("grid")}
                  className={`view-toggle__btn ${viewMode === "grid" ? "view-toggle__btn--active" : ""}`}
                  title="Grid view"
                >
                  <GridIcon active={viewMode === "grid"} />
                </button>
                <button
                  type="button"
                  onClick={() => switchView("list")}
                  className={`view-toggle__btn ${viewMode === "list" ? "view-toggle__btn--active" : ""}`}
                  title="List view"
                >
                  <ListIcon active={viewMode === "list"} />
                </button>
              </div>
            </div>
          </div>

          {visiblePubs.length > 0 ? (
            <div className={viewMode === "grid" ? "pub-grid" : "pub-list"}>
              {visiblePubs.map((pub) => (
                <PublicationCard
                  key={pub.id}
                  pub={pub}
                  viewMode={viewMode}
                  onOpen={() => setSelectedPub(pub)}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-semibold text-navy">No publications found</p>
              <p className="text-sm mt-1">Try a different keyword or reset the filters.</p>
            </div>
          )}

          <Pagination
            current={page}
            total={totalPages}
            perPage={perPage}
            onChange={setPage}
          />
        </div>
      </div>

      {selectedPub && (
        <PaperModal pub={selectedPub} onClose={() => setSelectedPub(null)} />
      )}
    </div>
  );
}
