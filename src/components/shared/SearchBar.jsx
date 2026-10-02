import React from "react";
import "../../styles/components/search-bar.css";

const SearchIcon = () => (
  <svg className="search-bar__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export default function SearchBar({ value, onChange, placeholder = "Search...", onSubmit }) {
  return (
    <div className="page-container search-bar-wrap">
      <div className="search-bar">
        <div className="search-bar__field">
          <SearchIcon />
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
                onSubmit?.();
              }
            }}
            className="search-bar__input"
          />
        </div>
        <button type="button" className="search-bar__button" onClick={() => onSubmit?.()}>
          Search
        </button>
      </div>
    </div>
  );
}
