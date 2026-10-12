import React from "react";
import "../../styles/components/filter-sidebar.css";

const FunnelIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 8h12M9 12h6M12 16h0" />
  </svg>
);

const CheckIcon = () => (
  <svg className="filter-check__tick" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    className={`filter-section__chevron ${open ? "filter-section__chevron--open" : ""}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const SearchMiniIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

/** Sidebar shell: header with reset action + stacked section cards. */
export function FilterSidebar({ onReset, children }) {
  return (
    <aside className="filter-aside">
      <div className="filter-header">
        <div className="filter-header__title">
          <FunnelIcon />
          Filter
        </div>
        <button type="button" className="filter-reset" onClick={onReset}>
          Reset filters
        </button>
      </div>
      {children}
    </aside>
  );
}

/** One collapsible white card holding a filter group. */
export function FilterSection({ title, collapsible = true, open = true, onToggle, children }) {
  return (
    <section className="filter-card">
      <div
        className={`filter-section__header ${collapsible ? "filter-section__header--collapsible" : ""}`}
        onClick={collapsible ? onToggle : undefined}
      >
        <span className="filter-section__title">{title}</span>
        {collapsible && <ChevronIcon open={open} />}
      </div>
      {open && children}
    </section>
  );
}

/** Checkbox row with label on the left and count on the right. */
export function FilterCheckRow({ id, label, count, checked, onChange }) {
  return (
    <label htmlFor={id} className="filter-check">
      <div className="filter-check__left">
        <div
          id={id}
          role="checkbox"
          aria-checked={checked}
          tabIndex={0}
          onClick={onChange}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              onChange();
            }
          }}
          className={`filter-check__box ${checked ? "filter-check__box--checked" : ""}`}
        >
          {checked && <CheckIcon />}
        </div>
        <span className="filter-check__label">{label}</span>
      </div>
      {count != null && <span className="filter-check__count">{count.toLocaleString()}</span>}
    </label>
  );
}

/** Small inline search input used inside a filter section. */
export function FilterSearch({ value, onChange, placeholder = "Search topics..." }) {
  return (
    <div className="filter-search">
      <SearchMiniIcon />
      <input type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

/** Blue text action link (Show More / Show Less). */
export function FilterLink({ onClick, children }) {
  return (
    <button type="button" className="filter-link" onClick={onClick}>
      {children}
    </button>
  );
}
