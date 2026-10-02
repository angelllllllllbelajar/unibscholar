import React, { useState } from "react";
import { faculties, authors, topics, sdgGoals } from "../../data/publicationsData";

// ── tiny helpers ──────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

function Checkbox({ id, label, count, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex items-center justify-between cursor-pointer group py-0.5">
      <div className="flex items-center gap-2.5">
        <div
          onClick={onChange}
          className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors
            ${checked ? "bg-navy border-navy" : "bg-white border-gray-300 group-hover:border-navy"}`}
        >
          {checked && <CheckIcon />}
        </div>
        <span className="text-sm text-gray-700 leading-tight">{label}</span>
      </div>
      <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{count?.toLocaleString()}</span>
    </label>
  );
}

function SectionHeader({ title, collapsible = false, open, onToggle }) {
  return (
    <div
      className={`flex items-center justify-between mb-3 ${collapsible ? "cursor-pointer" : ""}`}
      onClick={collapsible ? onToggle : undefined}
    >
      <div className="flex items-center gap-2 text-navy font-semibold text-sm">
        {title}
      </div>
      {collapsible && (
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
export default function FilterSidebar({ yearStart, yearEnd, setYearStart, setYearEnd }) {
  const [facultyOpen, setFacultyOpen] = useState(true);
  const [authorOpen, setAuthorOpen]   = useState(true);
  const [topicsOpen, setTopicsOpen]   = useState(true);
  const [sdgOpen, setSdgOpen]         = useState(true);

  const [facultyState, setFacultyState] = useState(faculties);
  const [authorState,  setAuthorState]  = useState(authors.map(a => ({ ...a, checked: false })));
  const [topicsState,  setTopicsState]  = useState(topics.map(t => ({ ...t, checked: false })));
  const [sdgState,     setSdgState]     = useState(sdgGoals.map(s => ({ ...s, checked: false })));

  const [showMoreSdg,     setShowMoreSdg]     = useState(false);

  const [authorSearch, setAuthorSearch]   = useState("");
  const [topicsSearch, setTopicsSearch]   = useState("");

  const toggle = (arr, setArr, idx) => {
    const next = [...arr];
    next[idx] = { ...next[idx], checked: !next[idx].checked };
    setArr(next);
  };

  const visibleSdg       = showMoreSdg     ? sdgState     : sdgState.slice(0, 4);

  return (
    <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-navy font-bold text-base">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4h18M6 8h12M9 12h6M12 16h0" />
          </svg>
          Filter
        </div>
        <button className="text-xs text-blue-500 hover:text-blue-700 font-medium">
          Reset<br/>filters
        </button>
      </div>

      {/* ── Project Timeline ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-3">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-navy font-semibold text-sm">
            Project Timeline
          </div>
          <span className="text-xs text-gray-400 font-medium">
            <span className="text-navy font-bold">{yearStart}</span>
            {" – "}
            <span className="text-blue-600 font-bold">{yearEnd}</span>
          </span>
        </div>

        {/* Dual-thumb range slider */}
        {(() => {
          const MIN = 2006, MAX = 2026;
          const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
          // Percentages are clamped to 0–100 so the fill/thumbs stay inside the
          // track even when the typed year is outside the MIN–MAX range; the
          // labels/number inputs still show the real typed values.
          const pctStart = clamp(((Number(yearStart) - MIN) / (MAX - MIN)) * 100, 0, 100);
          const pctEnd   = clamp(((Number(yearEnd)   - MIN) / (MAX - MIN)) * 100, 0, 100);
          return (
            <div className="relative mb-4" style={{ height: "28px" }}>
              {/* Grey full track */}
              <div className="absolute top-1/2 left-0 right-0 h-1.5 -translate-y-1/2 bg-gray-200 rounded-full pointer-events-none" />
              {/* Coloured fill between the two thumbs */}
              <div
                className="absolute top-1/2 h-1.5 -translate-y-1/2 bg-navy rounded-full pointer-events-none"
                style={{ left: `${pctStart}%`, width: `${Math.max(0, pctEnd - pctStart)}%` }}
              />

              {/* START thumb — sits below END thumb in z-order */}
              <input
                type="range"
                min={MIN} max={MAX} step={1}
                value={yearStart}
                onChange={e => {
                  const v = Math.min(Number(e.target.value), yearEnd - 1);
                  setYearStart(v);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ zIndex: yearStart > MAX - 5 ? 5 : 3 }}
              />
              {/* END thumb */}
              <input
                type="range"
                min={MIN} max={MAX} step={1}
                value={yearEnd}
                onChange={e => {
                  const v = Math.max(Number(e.target.value), yearStart + 1);
                  setYearEnd(v);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ zIndex: 4 }}
              />

              {/* Visual thumbs — clamp() keeps them inside the track at both edges */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-navy rounded-full shadow pointer-events-none"
                style={{
                  left: `clamp(0px, calc(${pctStart}% - 8px), calc(100% - 16px))`,
                  zIndex: 6,
                }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow pointer-events-none"
                style={{
                  left: `clamp(0px, calc(${pctEnd}% - 8px), calc(100% - 16px))`,
                  zIndex: 6,
                }}
              />
            </div>
          );
        })()}

        {/* Year number inputs */}
        <div className="flex items-center gap-2 mb-3">
          <input
            type="number"
            value={yearStart}
            onChange={e => setYearStart(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center outline-none focus:border-navy"
            min={2006} max={2026}
          />
          <span className="text-gray-400 text-sm flex-shrink-0">to</span>
          <input
            type="number"
            value={yearEnd}
            onChange={e => setYearEnd(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center outline-none focus:border-navy"
            min={2006} max={2026}
          />
        </div>
        <button className="w-full bg-navy hover:bg-navy-dark text-white text-sm font-semibold rounded-lg py-2 transition-colors">
          Filter Year
        </button>
      </div>

      {/* ── Faculty ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-3">
        <SectionHeader
          title="Faculty"
          collapsible
          open={facultyOpen}
          onToggle={() => setFacultyOpen(v => !v)}
        />
        {facultyOpen && (
          <div className="space-y-1.5">
            {facultyState.map((f, i) => (
              <Checkbox
                key={f.name}
                id={`faculty-${f.name}`}
                label={f.name}
                count={f.count}
                checked={f.checked}
                onChange={() => toggle(facultyState, setFacultyState, i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Author ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-3">
        <SectionHeader
          title="Author"
          collapsible
          open={authorOpen}
          onToggle={() => setAuthorOpen(v => !v)}
        />
        {authorOpen && (
          <>
            <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1.5 mb-2 gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search topics..."
                value={authorSearch}
                onChange={e => setAuthorSearch(e.target.value)}
                className="text-xs outline-none flex-1 placeholder-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              {authorState
                .filter(a => a.name.toLowerCase().includes(authorSearch.toLowerCase()))
                .map((a, i) => (
                  <Checkbox
                    key={a.name}
                    id={`author-${a.name}`}
                    label={a.name}
                    count={a.count}
                    checked={a.checked}
                    onChange={() => toggle(authorState, setAuthorState, i)}
                  />
                ))}
            </div>
          </>
        )}
      </div>

      {/* ── Topics ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-3">
        <SectionHeader
          title="Topics"
          collapsible
          open={topicsOpen}
          onToggle={() => setTopicsOpen(v => !v)}
        />
        {topicsOpen && (
          <>
            <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1.5 mb-2 gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search topics..."
                value={topicsSearch}
                onChange={e => setTopicsSearch(e.target.value)}
                className="text-xs outline-none flex-1 placeholder-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              {topicsState
                .filter(t => t.name.toLowerCase().includes(topicsSearch.toLowerCase()))
                .map((t, i) => (
                  <Checkbox
                    key={t.name}
                    id={`topic-${t.name}`}
                    label={t.name}
                    count={t.count}
                    checked={t.checked}
                    onChange={() => toggle(topicsState, setTopicsState, i)}
                  />
                ))}
            </div>
          </>
        )}
      </div>

      {/* ── SDG ── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-3">
        <SectionHeader
          title="SDG"
          collapsible
          open={sdgOpen}
          onToggle={() => setSdgOpen(v => !v)}
        />
        {sdgOpen && (
          <div className="space-y-1.5">
            {visibleSdg.map((s, i) => (
              <Checkbox
                key={s.name}
                id={`sdg-${s.name}`}
                label={s.name}
                count={s.count}
                checked={s.checked}
                onChange={() => toggle(sdgState, setSdgState, i)}
              />
            ))}
            <button
              onClick={() => setShowMoreSdg(v => !v)}
              className="text-xs text-blue-500 hover:text-blue-700 font-medium mt-1"
            >
              {showMoreSdg ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
