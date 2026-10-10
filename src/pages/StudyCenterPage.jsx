import React, { useState } from "react";
import SearchBar from "../components/shared/SearchBar";
import {
  FilterSidebar,
  FilterSection,
  FilterCheckRow,
  FilterSearch,
  FilterLink,
} from "../components/shared/FilterSidebar";
import UnitCard from "../components/studycenter/UnitCard";
import {
  SC_SHOWN,
  SC_TOTAL,
  SC_PAGES,
  units,
} from "../data/studyCenterData";
import { topics, sdgFilters, SDG_INITIAL_COUNT } from "../data/researchersData";
import "../styles/pages/study-center.css";

const ChevronLeft = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function StudyCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [topicSearch, setTopicSearch] = useState("");
  const [checkedTopics, setCheckedTopics] = useState({});
  const [checkedSdgs, setCheckedSdgs] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sdgExpanded, setSdgExpanded] = useState(false);

  const [topicsOpen, setTopicsOpen] = useState(true);
  const [sdgOpen, setSdgOpen] = useState(true);

  const toggleCheck = (setter, id) => setter((prev) => ({ ...prev, [id]: !prev[id] }));

  const resetFilters = () => {
    setCheckedTopics({});
    setCheckedSdgs({});
    setSearchQuery("");
    setTopicSearch("");
    setSdgExpanded(false);
  };

  const visibleSdgs = sdgExpanded ? sdgFilters : sdgFilters.slice(0, SDG_INITIAL_COUNT);
  const visibleUnits = units.slice(0, SC_SHOWN);

  return (
    <div className="page-root">
      <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search study center..." />

      <div className="page-container page-body">
        <FilterSidebar onReset={resetFilters}>
          <FilterSection title="Topics" open={topicsOpen} onToggle={() => setTopicsOpen((v) => !v)}>
            <FilterSearch value={topicSearch} onChange={setTopicSearch} />
            <div className="filter-list">
              {topics
                .filter((t) => t.label.toLowerCase().includes(topicSearch.toLowerCase()))
                .map((t) => (
                  <FilterCheckRow
                    key={t.id}
                    id={`sc-topic-${t.id}`}
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
                  id={`sc-sdg-${s.id}`}
                  label={s.label}
                  count={s.count}
                  checked={!!checkedSdgs[s.id]}
                  onChange={() => toggleCheck(setCheckedSdgs, s.id)}
                />
              ))}
            </div>
            <FilterLink onClick={() => setSdgExpanded((v) => !v)}>
              {sdgExpanded ? "Show Less" : "Show More"}
            </FilterLink>
          </FilterSection>
        </FilterSidebar>

        <div className="page-main">
          <div className="sc-grid">
            {visibleUnits.map((u) => (
              <UnitCard key={u.id} unit={u} />
            ))}
          </div>

          <div className="sc-pagination">
            <p className="sc-pagination__info">
              Showing <strong>1 - {SC_SHOWN}</strong> of <strong>{SC_TOTAL}</strong> study center
            </p>

            <div className="sc-pagination__nav">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="sc-page-btn"
              >
                <ChevronLeft />
                Previous
              </button>

              {[1, 2].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`sc-page-btn ${currentPage === p ? "sc-page-btn--active" : ""}`}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(SC_PAGES, p + 1))}
                disabled={currentPage === SC_PAGES}
                className="sc-page-btn sc-page-btn--box"
              >
                Next
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
