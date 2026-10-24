import React, { useState } from "react";
import { YEAR_MIN, YEAR_MAX } from "../../data/publicationsData";

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export default function ProjectTimeline({ yearStart, yearEnd, setYearStart, setYearEnd }) {
  const [dragging, setDragging] = useState(false); // show tooltip while dragging end thumb

  const num = (v, fallback) => {
    const n = Number(v);
    return String(v).trim() !== "" && Number.isFinite(n) ? n : fallback;
  };
  const ys = num(yearStart, YEAR_MIN);
  const ye = num(yearEnd,   YEAR_MAX);

  // Track expands to the left when yearStart is typed below YEAR_MIN
  const trackMin = Math.min(ys, YEAR_MIN);
  const trackMax = YEAR_MAX;
  const trackRange = trackMax - trackMin;

  // Both thumbs move: start follows ys, end follows ye
  const pctStart = clamp(((ys - trackMin) / trackRange) * 100, 0, 100);
  const pctEnd   = clamp(((ye - trackMin) / trackRange) * 100, 0, 100);

  // End thumb minimum = one step above start — NO YEAR_MIN floor
  const endMin = ys + 1;

  // Commit helpers
  const commitStart = (val) => {
    if (String(val).trim() === "") return;
    const n = Number(val);
    if (Number.isNaN(n)) return;
    setYearStart(Math.min(n, ye - 1));  // no lower bound — user may type below YEAR_MIN
  };
  const commitEnd = (val) => {
    if (String(val).trim() === "") return;
    const n = Number(val);
    if (Number.isNaN(n)) return;
    setYearEnd(clamp(n, endMin, YEAR_MAX));
  };
  const onEnterBlur = (e) => {
    if (e.key === "Enter") e.currentTarget.blur();
  };

  // Visual thumb positions (clamped to stay inside track)
  const thumbStartLeft = `clamp(0px, calc(${pctStart}% - 8px), calc(100% - 16px))`;
  const thumbEndLeft   = `clamp(0px, calc(${pctEnd}%   - 8px), calc(100% - 16px))`;

  return (
    <section className="filter-card">
      {/* Header */}
      <div className="timeline__header">
        <span className="timeline__title">Project Timeline</span>
        <span className="timeline__range">
          <span className="timeline__range-start">{yearStart}</span>
          {" – "}
          <span className="timeline__range-end">{yearEnd}</span>
        </span>
      </div>

      {/* Dual-thumb slider */}
      <div className="timeline__slider">
        {/* Grey track */}
        <div className="timeline__track" />

        {/* Coloured fill between start and end */}
        <div
          className="timeline__fill"
          style={{
            left:  `${pctStart}%`,
            width: `${Math.max(0, pctEnd - pctStart)}%`,
          }}
        />

        {/* ── Hidden range input for END thumb (draggable) ── */}
        <input
          type="range"
          min={endMin}
          max={YEAR_MAX}
          step={1}
          value={ye}
          onChange={(e) => {
            const v = clamp(Number(e.target.value), endMin, YEAR_MAX);
            setYearEnd(v);
          }}
          onMouseDown={() => setDragging(true)}
          onTouchStart={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onTouchEnd={() => setDragging(false)}
          className="timeline__input"
          style={{ zIndex: 4 }}
          aria-label="End year"
        />

        {/* Visual START thumb (fixed-looking, but tracks ys) */}
        <div
          className="timeline__thumb timeline__thumb--start"
          style={{ left: thumbStartLeft }}
        />

        {/* Visual END thumb + drag tooltip */}
        <div
          className="timeline__thumb timeline__thumb--end"
          style={{ left: thumbEndLeft }}
        >
          {/* Tooltip: shown while dragging */}
          {dragging && (
            <div
              style={{
                position: "absolute",
                bottom: "calc(100% + 6px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#1a2b5f",
                color: "#fff",
                fontSize: "11px",
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: "6px",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              {ye}
              {/* Arrow */}
              <span style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: "5px solid #1a2b5f",
              }} />
            </div>
          )}
        </div>
      </div>

      {/* Year number inputs */}
      <div className="timeline__years">
        <input
          type="number"
          value={yearStart}
          onChange={(e) => setYearStart(e.target.value)}
          onBlur={(e) => commitStart(e.target.value)}
          onKeyDown={onEnterBlur}
          className="timeline__year"
          max={YEAR_MAX}
        />
        <span className="timeline__to">to</span>
        <input
          type="number"
          value={yearEnd}
          onChange={(e) => setYearEnd(e.target.value)}
          onBlur={(e) => commitEnd(e.target.value)}
          onKeyDown={onEnterBlur}
          className="timeline__year"
          min={endMin}
          max={YEAR_MAX}
        />
      </div>

      <button type="button" className="timeline__apply">Filter Year</button>
    </section>
  );
}
