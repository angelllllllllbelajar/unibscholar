import React from "react";
import { YEAR_MIN, YEAR_MAX } from "../../data/publicationsData";

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export default function ProjectTimeline({ yearStart, yearEnd, setYearStart, setYearEnd }) {
  // Percentages are clamped to 0–100 so the fill/thumbs stay inside the track
  // even when the typed year is outside MIN–MAX; the inputs still show the real values.
  const pctStart = clamp(((Number(yearStart) - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100, 0, 100);
  const pctEnd = clamp(((Number(yearEnd) - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100, 0, 100);

  return (
    <section className="filter-card">
      <div className="timeline__header">
        <span className="timeline__title">Project Timeline</span>
        <span className="timeline__range">
          <span className="timeline__range-start">{yearStart}</span>
          {" – "}
          <span className="timeline__range-end">{yearEnd}</span>
        </span>
      </div>

      <div className="timeline__slider">
        <div className="timeline__track" />
        <div
          className="timeline__fill"
          style={{ left: `${pctStart}%`, width: `${Math.max(0, pctEnd - pctStart)}%` }}
        />

        <input
          type="range"
          min={YEAR_MIN}
          max={YEAR_MAX}
          step={1}
          value={yearStart}
          onChange={(e) => setYearStart(Math.min(Number(e.target.value), yearEnd - 1))}
          className="timeline__input"
          style={{ zIndex: yearStart > YEAR_MAX - 5 ? 5 : 3 }}
          aria-label="Start year"
        />
        <input
          type="range"
          min={YEAR_MIN}
          max={YEAR_MAX}
          step={1}
          value={yearEnd}
          onChange={(e) => setYearEnd(Math.max(Number(e.target.value), yearStart + 1))}
          className="timeline__input"
          style={{ zIndex: 4 }}
          aria-label="End year"
        />

        <div
          className="timeline__thumb timeline__thumb--start"
          style={{ left: `clamp(0px, calc(${pctStart}% - 8px), calc(100% - 16px))` }}
        />
        <div
          className="timeline__thumb timeline__thumb--end"
          style={{ left: `clamp(0px, calc(${pctEnd}% - 8px), calc(100% - 16px))` }}
        />
      </div>

      <div className="timeline__years">
        <input
          type="number"
          value={yearStart}
          onChange={(e) => setYearStart(e.target.value)}
          className="timeline__year"
          min={YEAR_MIN}
          max={YEAR_MAX}
        />
        <span className="timeline__to">to</span>
        <input
          type="number"
          value={yearEnd}
          onChange={(e) => setYearEnd(e.target.value)}
          className="timeline__year"
          min={YEAR_MIN}
          max={YEAR_MAX}
        />
      </div>

      <button type="button" className="timeline__apply">Filter Year</button>
    </section>
  );
}
