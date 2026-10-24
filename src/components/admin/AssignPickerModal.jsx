import React, { useEffect, useState } from "react";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";
import { managedPublications } from "../../data/adminPublicationsData";
import { managedProjects } from "../../data/adminProjectsData";

const BookIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const FlaskIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const CloseIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SearchIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const CheckIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

function normalize(type, row) {
  if (type === "publications") {
    return {
      id: row.id,
      title: row.title,
      venue: row.journal,
      year: row.year,
      doi: row.doi,
      verified: row.status === "Verified",
      meta: [row.journal, row.year, row.doi && `DOI: ${row.doi}`].filter(Boolean).join(" • "),
    };
  }
  return {
    id: row.id,
    title: row.title,
    venue: row.funder,
    year: row.fiscalYear,
    verified: false,
    meta: [row.scheme, row.fiscalYear, row.funder].filter(Boolean).join(" • "),
  };
}

export default function AssignPickerModal({ type, existingTitles, onAssign, onClose, suspendEscape = false }) {
  const isPubs = type === "publications";
  const title = isPubs ? "Assign Publications" : "Assign Projects";
  const source = (isPubs ? managedPublications : managedProjects).map((r) => normalize(type, r));

  const [query, setQuery] = useState("");
  const [added, setAdded] = useState(() => new Set());

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (!suspendEscape) window.addEventListener("keydown", onKey);
    lockScroll();
    return () => {
      if (!suspendEscape) window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [onClose, suspendEscape]);

  const needle = query.trim().toLowerCase();
  const rows = source.filter((r) =>
    [r.title, r.venue, r.meta, String(r.year)].some((v) => v.toLowerCase().includes(needle))
  );

  const isAssigned = (r) => added.has(r.id) || (existingTitles || []).includes(r.title);

  const handleAdd = (r) => {
    if (isAssigned(r)) return;
    onAssign({ id: r.id, title: r.title, venue: r.venue, year: r.year, verified: r.verified, doi: r.doi });
    setAdded((prev) => new Set(prev).add(r.id));
  };

  return (
    <div className="scm-backdrop" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="scm-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="scm-accent" />

        <div className="scm-header">
          <span className="scm-header__icon">{isPubs ? <BookIcon /> : <FlaskIcon />}</span>
          <h2 className="scm-header__title">{title}</h2>
          <button type="button" className="scm-close" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="scm-body">
          <div className="arp-search">
            <div className="ad-searchfield">
              <SearchIcon />
              <input
                type="text"
                placeholder={isPubs ? "Search publications by title, journal, DOI..." : "Search projects by title, scheme, funder..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button type="button" className="ad-searchbtn">Search</button>
          </div>

          <p className="arp-count">
            Showing {rows.length} of {source.length} {isPubs ? "publications" : "projects"}
          </p>

          <div className="arp-list">
            {rows.length === 0 && (
              <p className="arp-empty">No matching {isPubs ? "publications" : "projects"} found.</p>
            )}
            {rows.map((r) => {
              const assigned = isAssigned(r);
              return (
                <div key={r.id} className="arp-row">
                  <div className="arp-row__info">
                    <p className="arp-row__title">{r.title}</p>
                    <p className="arp-row__meta">{r.meta}</p>
                  </div>
                  <button
                    type="button"
                    className={assigned ? "arp-add arp-add--done" : "arp-add"}
                    onClick={() => handleAdd(r)}
                    disabled={assigned}
                  >
                    {assigned ? <CheckIcon /> : <PlusIcon />}
                    {assigned ? "Assigned" : "Add"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="scm-footer">
          <button type="button" className="scm-cancel" onClick={onClose}>Cancel</button>
          <button type="button" className="scm-save" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
