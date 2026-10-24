import React, { useEffect, useRef, useState } from "react";
import "../../styles/shared/combobox.css";

const ChevronDown = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

/** Dropdown of suggestions that also accepts freely typed values. */
export default function Combobox({ id, value, options, placeholder, onChange, inputClass = "" }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const pick = (option) => {
    onChange(option);
    setOpen(false);
  };

  const shown = options.filter((option) => option !== value);

  return (
    <span className="cmb-wrap" ref={wrapRef}>
      <input
        id={id}
        className={`cmb-input ${inputClass}`.trim()}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-autocomplete="list"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && open) {
            e.stopPropagation();
            setOpen(false);
          }
        }}
      />
      <button
        type="button"
        tabIndex={-1}
        className={`cmb-chev${open ? " cmb-chev--open" : ""}`}
        aria-label="Toggle options"
        onClick={() => setOpen((o) => !o)}
      >
        <ChevronDown />
      </button>
      {open && (
        <div
          id={`${id}-list`}
          className="cmb-list"
          role="listbox"
          onMouseDown={(e) => e.preventDefault()}
        >
          {shown.map((option) => (
            <button
              type="button"
              key={option}
              role="option"
              aria-selected={false}
              className="cmb-opt"
              onClick={() => pick(option)}
            >
              {option}
            </button>
          ))}
          <p className="cmb-hint">Not in the list? Type your own value above.</p>
        </div>
      )}
    </span>
  );
}
