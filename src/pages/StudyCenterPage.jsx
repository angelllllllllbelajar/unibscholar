import React, { useState } from "react";
import SearchBar from "../components/shared/SearchBar";
import UnitCard from "../components/studycenter/UnitCard";
import {
  SC_SHOWN,
  SC_TOTAL,
  SC_PAGES,
  units,
} from "../data/studyCenterData";
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
  const [currentPage, setCurrentPage] = useState(1);

  const visibleUnits = units.slice(0, SC_SHOWN);

  return (
    <div className="page-root">
      <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search study center..." />

      <div className="page-container page-body">
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
