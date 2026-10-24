import React, { useState } from "react";
import SearchBar from "../components/shared/SearchBar";
import {
  FilterSidebar,
  FilterSection,
  FilterCheckRow,
  FilterSearch,
  FilterLink,
} from "../components/shared/FilterSidebar";
import ResearcherCard from "../components/researchers/ResearcherCard";
import {
  RESULT_TOTAL,
  FACULTY_TOTAL,
  TOTAL_PAGES,
  SDG_INITIAL_COUNT,
  faculties,
  topics,
  sdgFilters,
  networks,
  researchers,
} from "../data/researchersData";
import "../styles/pages/researchers.css";

export default function ResearchersPage() {
  const [searchQuery, setSearchQuery]         = useState("");
  const [topicSearch, setTopicSearch]         = useState("");
  const [checkedFaculties, setCheckedFaculties] = useState({ FKIK: true });
  const [checkedTopics, setCheckedTopics]     = useState({});
  const [checkedSdgs, setCheckedSdgs]         = useState({});
  const [checkedNetworks, setCheckedNetworks] = useState({});
  const [sortBy, setSortBy]                   = useState("Most Cited");
  const [currentPage, setCurrentPage]         = useState(1);
  const [sdgExpanded, setSdgExpanded]         = useState(false);

  const [facultyOpen, setFacultyOpen]   = useState(true);
  const [topicsOpen, setTopicsOpen]     = useState(true);
  const [sdgOpen, setSdgOpen]           = useState(true);
  const [networkOpen, setNetworkOpen]   = useState(true);

  const toggleCheck = (setter, id) => setter((prev) => ({ ...prev, [id]: !prev[id] }));

  const resetFilters = () => {
    setCheckedFaculties({});
    setCheckedTopics({});
    setCheckedSdgs({});
    setCheckedNetworks({});
    setSearchQuery("");
    setTopicSearch("");
    setSortBy("Most Cited");
    setSdgExpanded(false);
  };

  const visibleSdgs = sdgExpanded ? sdgFilters : sdgFilters.slice(0, SDG_INITIAL_COUNT);

  return (
    <div className="page-root">
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search researchers..."
      />

      <div className="page-container page-body">
        <FilterSidebar onReset={resetFilters}>
          <FilterSection title="Faculty" open={facultyOpen} onToggle={() => setFacultyOpen((v) => !v)}>
            <div className="filter-list">
              {faculties.map((f) => (
                <FilterCheckRow
                  key={f.id}
                  id={`faculty-${f.id}`}
                  label={f.label}
                  count={f.count}
                  checked={!!checkedFaculties[f.id]}
                  onChange={() => toggleCheck(setCheckedFaculties, f.id)}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Topics" open={topicsOpen} onToggle={() => setTopicsOpen((v) => !v)}>
            <FilterSearch value={topicSearch} onChange={setTopicSearch} />
            <div className="filter-list">
              {topics
                .filter((t) => t.label.toLowerCase().includes(topicSearch.toLowerCase()))
                .map((t) => (
                  <FilterCheckRow
                    key={t.id}
                    id={`topic-${t.id}`}
                    label={t.label}
                    count={t.count}
                    checked={!!checkedTopics[t.id]}
                    onChange={() => toggleCheck(setCheckedTopics, t.id)}
                  />
                ))}
            </div>
          </FilterSection>

          <FilterSection title="SDG" open={sdgOpen} onToggle={() => setSdgOpen((v) => !v)}>
            <div className="filter-list">
              {visibleSdgs.map((s) => (
                <FilterCheckRow
                  key={s.id}
                  id={`sdg-${s.id}`}
                  label={s.label}
                  count={s.count}
                  checked={!!checkedSdgs[s.id]}
                  onChange={() => toggleCheck(setCheckedSdgs, s.id)}
                />
              ))}
            </div>
            <FilterLink onClick={() => setSdgExpanded((v) => !v)}>
              {sdgExpanded ? "Show Less" : `Show More (${sdgFilters.length - SDG_INITIAL_COUNT} more)`}
            </FilterLink>
          </FilterSection>

          <FilterSection title="Network" open={networkOpen} onToggle={() => setNetworkOpen((v) => !v)}>
            <div className="filter-list">
              {networks.map((n) => (
                <FilterCheckRow
                  key={n.id}
                  id={`network-${n.id}`}
                  label={n.label}
                  count={n.count}
                  checked={!!checkedNetworks[n.id]}
                  onChange={() => toggleCheck(setCheckedNetworks, n.id)}
                />
              ))}
            </div>
            <FilterLink onClick={() => {}}>Show More</FilterLink>
          </FilterSection>
        </FilterSidebar>

        <div className="page-main">
          <div className="results-header">
            <p className="results-header__text">
              Now showing <strong>1– 4</strong> of <strong>{RESULT_TOTAL.toLocaleString()} results</strong>
            </p>
            <div className="results-header__sort">
              <label htmlFor="researchers-sort">Sort by:</label>
              <select
                id="researchers-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option>Most Cited</option>
                <option>Alphabetical</option>
                <option>H-Index</option>
              </select>
            </div>
          </div>

          <div className="researcher-grid">
            {researchers.map((r) => (
              <ResearcherCard key={r.id} researcher={r} />
            ))}
          </div>

          <div className="r-pagination">
            <p className="r-pagination__info">
              Showing <strong>1 - 4</strong> of <strong>{FACULTY_TOTAL.toLocaleString()} faculty members</strong>
            </p>

            <div className="r-pagination__nav">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="r-page-btn"
                aria-label="Previous page"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {[1, 2, 3].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`r-page-btn ${currentPage === p ? "r-page-btn--active" : ""}`}
                >
                  {p}
                </button>
              ))}
              <span className="r-pagination__ellipsis">...</span>
              <button
                type="button"
                onClick={() => setCurrentPage(TOTAL_PAGES)}
                className={`r-page-btn ${currentPage === TOTAL_PAGES ? "r-page-btn--active" : ""}`}
              >
                {TOTAL_PAGES}
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
                disabled={currentPage === TOTAL_PAGES}
                className="r-page-btn"
                aria-label="Next page"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
