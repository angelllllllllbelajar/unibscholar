import React, { useState } from "react";
import { TOTAL, TOTAL_PAGES, PER_PAGE } from "../../data/publicationsData";

/**
 * Left-anchored token list so that after jumping to a page the window starts at
 * that page, e.g. current 26 → [26,27,"...",15173]. Near the end it slides back
 * to include the last page, e.g. [15172,15173].
 */
function buildPages(current, total) {
  if (total <= 4) return Array.from({ length: total }, (_, i) => i + 1);

  let start = current;
  let end = current + 1;

  if (end > total) {
    end = total;
    start = Math.max(1, total - 1);
  }

  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  if (end < total) {
    if (end < total - 1) pages.push("...");
    pages.push(total);
  }

  return pages;
}

export default function Pagination({ current, total, onChange }) {
  const [openSide, setOpenSide] = useState(null); // null | "left" | "right"
  const [dotValue, setDotValue] = useState("");

  const pages = buildPages(current, total);

  const commitJump = () => {
    const n = parseInt(dotValue, 10);
    if (!isNaN(n) && n >= 1 && n <= total) onChange(n);
    setOpenSide(null);
    setDotValue("");
  };

  let dotCount = 0;

  return (
    <div className="pub-pagination">
      <p className="pub-pagination__info">
        Displaying 1 – {PER_PAGE} of {TOTAL.toLocaleString()} publications &nbsp;•&nbsp; Page {current} of{" "}
        {TOTAL_PAGES.toLocaleString()}
      </p>

      <nav className="pub-pagination__nav">
        <button
          type="button"
          onClick={() => {
            if (current > 1) onChange(current - 1);
          }}
          disabled={current === 1}
          className="pub-page-arrow"
        >
          &lt; Previous
        </button>

        {pages.map((p) => {
          if (p === "...") {
            dotCount++;
            const side = dotCount === 1 ? "left" : "right";
            const isOpen = openSide === side;

            return isOpen ? (
              <span key={`dot-input-${side}`} className="pub-pagination__nav">
                <input
                  autoFocus
                  type="number"
                  min={1}
                  max={total}
                  value={dotValue}
                  onChange={(e) => setDotValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitJump();
                    if (e.key === "Escape") {
                      setOpenSide(null);
                      setDotValue("");
                    }
                  }}
                  onBlur={commitJump}
                  placeholder="pg"
                  className="pub-page-jump"
                />
              </span>
            ) : (
              <button
                key={`dot-btn-${side}`}
                type="button"
                onClick={() => {
                  setOpenSide(side);
                  setDotValue("");
                }}
                title="Jump to page…"
                className="pub-page-btn"
              >
                …
              </button>
            );
          }

          return (
            <button
              key={`page-${p}`}
              type="button"
              onClick={() => onChange(p)}
              className={`pub-page-btn ${p === current ? "pub-page-btn--active" : ""}`}
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => {
            if (current < total) onChange(current + 1);
          }}
          disabled={current === total}
          className="pub-page-arrow"
        >
          Next &gt;
        </button>
      </nav>
    </div>
  );
}
