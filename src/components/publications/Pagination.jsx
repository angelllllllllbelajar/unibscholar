import React, { useState } from "react";

/**
 * Page token rules:
 *  - current < total        → [current, current+1?, "...", total]
 *    "…" is ALWAYS present so the jump input is always reachable.
 *  - current >= total (last) → ["...", total-1, total]
 *    Flips to a left-side "…" so the user can still jump backward.
 */
function buildPages(current, total) {
  if (total <= 2) return Array.from({ length: total }, (_, i) => i + 1);

  // ── At the very last page → left-anchored view ───────────────────────────
  if (current >= total) {
    return ["...", total - 1, total];
  }

  // ── Every other page → always include "…" + last ────────────────────────
  const pages = [current];

  // Show the next page for context, if it isn't the last page
  if (current + 1 < total) pages.push(current + 1);

  // "…" is always present (acts as the jump-to-any-page control)
  pages.push("...");

  // Always end with the last page
  pages.push(total);

  return pages;
}


export default function Pagination({ current, total, perPage, onChange }) {
  const [openSide, setOpenSide] = useState(null); // null | "left" | "right"
  const [dotValue, setDotValue] = useState("");

  const pages = buildPages(current, total);

  // Keep the displayed result count consistent with the (demo-capped) page count.
  const totalResults = perPage * total;

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
        Displaying 1 – {perPage} of {totalResults.toLocaleString()} publications &nbsp;•&nbsp; Page {current} of{" "}
        {total.toLocaleString()}
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
