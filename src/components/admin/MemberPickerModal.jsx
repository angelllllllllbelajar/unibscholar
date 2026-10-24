import React, { useEffect, useState } from "react";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";
import { scMemberDirectory } from "../../data/adminStudyCenterData";

const PeopleIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6-4a3 3 0 11-3-3" />
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

export default function MemberPickerModal({ existingNames, onAssign, onClose, suspendEscape = false }) {
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
  const rows = scMemberDirectory.filter((r) =>
    [r.name, r.dept].some((v) => v.toLowerCase().includes(needle))
  );

  const isAssigned = (r) => added.has(r.id) || (existingNames || []).includes(r.name);

  const handleAdd = (r) => {
    if (isAssigned(r)) return;
    onAssign({ id: r.id, name: r.name, role: "" });
    setAdded((prev) => new Set(prev).add(r.id));
  };

  return (
    <div className="scm-backdrop" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Add Member"
        className="scm-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="scm-accent" />

        <div className="scm-header">
          <span className="scm-header__icon"><PeopleIcon /></span>
          <h2 className="scm-header__title">Add Member</h2>
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
                placeholder="Search researchers by name or faculty..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button type="button" className="ad-searchbtn">Search</button>
          </div>

          <p className="arp-count">Showing {rows.length} of {scMemberDirectory.length} researchers</p>

          <div className="arp-list">
            {rows.length === 0 && <p className="arp-empty">No matching researchers found.</p>}
            {rows.map((r) => {
              const assigned = isAssigned(r);
              return (
                <div key={r.id} className="arp-row">
                  <div className="arp-row__info">
                    <p className="arp-row__title">{r.name}</p>
                    <p className="arp-row__meta">{r.dept}</p>
                  </div>
                  <button
                    type="button"
                    className={assigned ? "arp-add arp-add--done" : "arp-add"}
                    onClick={() => handleAdd(r)}
                    disabled={assigned}
                  >
                    {assigned ? <CheckIcon /> : <PlusIcon />}
                    {assigned ? "Added" : "Add"}
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
