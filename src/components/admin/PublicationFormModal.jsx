import React, { useEffect, useState } from "react";
import Combobox from "./Combobox";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";
import {
  SDG_FORM_OPTIONS,
  SDG_STYLES,
  UNIB_FACULTIES,
  FORM_YEAR_OPTIONS,
  TOPIC_OPTIONS,
} from "../../data/adminPublicationsData";

const SAMPLE = {
  doi: "10.1016/j.nucengdes.2026.15421",
  type: "Journal Article",
  year: "2026",
  title: "Hierarchical Porous Metal-Organic Frameworks for High-Sensitivity Gas Detection",
  authors: "Prof. Dr. Brian Yuliarto, Dr. Eleanor Vance",
  journal: "ACS Applied Materials & Interfaces",
  topics: "Nuclear & Reactor Physics, Operator Algebras",
  volume: "Vol. 18, Issue 4",
  pages: "pp. 1420-1435",
  faculty: "FMIPA",
  status: "Pending Review",
  sdgs: [7, 9, 11],
};

function initialForm(mode, pub) {
  if (mode === "edit" && pub) {
    return {
      ...SAMPLE,
      doi: pub.doi,
      title: pub.title,
      authors: pub.author,
      journal: pub.journal,
      year: String(pub.year),
      faculty: pub.faculty,
      type: pub.type ?? SAMPLE.type,
      topics: pub.topics ?? SAMPLE.topics,
      volume: pub.volume ?? SAMPLE.volume,
      pages: pub.pages ?? SAMPLE.pages,
      status: pub.status === "Verified" ? "Verified" : "Pending Review",
      sdgs: [...pub.sdgs],
    };
  }
  return { ...SAMPLE, sdgs: [...SAMPLE.sdgs] };
}

const CloseIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const FingerprintIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3-.5 6-1.5 8.5M12 7a5 5 0 015 5c0 2.5-.25 5-.75 7.25M12 7a5 5 0 00-5 5c0 1.5-.1 3-.4 4.4M12 3.5A8.5 8.5 0 0120.5 12M12 3.5A8.5 8.5 0 003.5 12m5 6.5c.3-2 .5-4.2.5-6.5" />
  </svg>
);

const UsersIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6-4a3 3 0 11-3-3" />
  </svg>
);

const GlobeIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm7.93 9h-3.02a15.7 15.7 0 00-1.1-5.36A8.03 8.03 0 0119.93 11zM12 4.04c.83 1.2 1.64 3.11 1.9 6.96h-3.8c.26-3.85 1.07-5.76 1.9-6.96zM4.07 13h3.02c.1 1.9.47 3.72 1.1 5.36A8.03 8.03 0 014.07 13zm3.02-2H4.07a8.03 8.03 0 014.12-5.36A15.7 15.7 0 007.09 11zM12 19.96c-.83-1.2-1.64-3.11-1.9-6.96h3.8c-.26 3.85-1.07 5.76-1.9 6.96zm3.81-1.6a15.7 15.7 0 001.1-5.36h3.02a8.03 8.03 0 01-4.12 5.36z" clipRule="evenodd" />
  </svg>
);

const ChevronDown = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const PlusIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const XSmallIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function PublicationFormModal({ mode, publication, onClose, onSave, suspendEscape = false }) {
  const [form, setForm] = useState(() => initialForm(mode, publication));
  const [sdgPick, setSdgPick] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (!suspendEscape) window.addEventListener("keydown", onKey);
    lockScroll();
    return () => {
      if (!suspendEscape) window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [onClose, suspendEscape]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const setValue = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const addSdg = () => {
    if (!sdgPick) return;
    const id = Number(sdgPick);
    setForm((f) => (f.sdgs.includes(id) ? f : { ...f, sdgs: [...f.sdgs, id] }));
    setSdgPick("");
  };

  const removeSdg = (id) => setForm((f) => ({ ...f, sdgs: f.sdgs.filter((s) => s !== id) }));

  const sdgLabel = (id) => SDG_FORM_OPTIONS.find((o) => o.id === id)?.label ?? `SDG ${id}`;
  const sdgDot = (id) => SDG_STYLES[id]?.dot ?? "#2563eb";

  const heading = mode === "edit" ? "Edit Publication" : "Add New Publication";

  return (
    <div className="apm-backdrop" onClick={onClose}>
      <div className="apm-panel" onClick={(e) => e.stopPropagation()}>
        <div className="apm-accent" />

        <div className="apm-head">
          <div>
            <h2 className="apm-head__title">{heading}</h2>
            <p className="apm-head__sub">
              Submit or register scholarly article, conference paper, or book chapter
            </p>
          </div>
          <button type="button" className="apm-close" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="apm-body">
          {/* DOI box */}
          <div className="apm-doibox">
            <label className="apm-label" htmlFor="apm-doi">DOI / Identifier</label>
            <div className="apm-inputwrap">
              <FingerprintIcon />
              <input
                id="apm-doi"
                className="apm-input apm-input--mono"
                type="text"
                value={form.doi}
                onChange={set("doi")}
                placeholder="10.xxxx/xxxxx"
              />
            </div>
          </div>

          <div className="apm-grid2 apm-field">
            <div>
              <label className="apm-label" htmlFor="apm-type">
                Publication Type <span className="apm-req">*</span>
              </label>
              <span className="apm-selectwrap">
                <select id="apm-type" className="apm-select" value={form.type} onChange={set("type")}>
                  <option>Journal Article</option>
                  <option>Conference Paper</option>
                  <option>Book Chapter</option>
                </select>
                <ChevronDown />
              </span>
            </div>
            <div>
              <label className="apm-label" htmlFor="apm-year">
                Publication Year <span className="apm-req">*</span>
              </label>
              <Combobox
                id="apm-year"
                inputClass="apm-input"
                value={form.year}
                options={FORM_YEAR_OPTIONS}
                placeholder="Select or type year..."
                onChange={setValue("year")}
              />
            </div>
          </div>

          <div className="apm-field">
            <label className="apm-label" htmlFor="apm-title">
              Title of Paper / Work <span className="apm-req">*</span>
            </label>
            <input
              id="apm-title"
              className="apm-input"
              type="text"
              value={form.title}
              onChange={set("title")}
              placeholder="Enter the full title..."
            />
          </div>

          <div className="apm-field">
            <label className="apm-label" htmlFor="apm-authors">
              Authors &amp; Affiliations <span className="apm-req">*</span>
            </label>
            <div className="apm-inputwrap">
              <UsersIcon />
              <input
                id="apm-authors"
                className="apm-input"
                type="text"
                value={form.authors}
                onChange={set("authors")}
                placeholder="Comma-separated author names"
              />
            </div>
            <p className="apm-help">
              Registered UNIB researchers will be automatically linked to their profiles.
            </p>
          </div>

          <div className="apm-grid2 apm-field">
            <div>
              <label className="apm-label" htmlFor="apm-journal">
                Journal / Conference Venue Name <span className="apm-req">*</span>
              </label>
              <input
                id="apm-journal"
                className="apm-input"
                type="text"
                value={form.journal}
                onChange={set("journal")}
                placeholder="Venue name"
              />
            </div>
            <div>
              <label className="apm-label" htmlFor="apm-topics">
                Topics &amp; Field Areas <span className="apm-req">*</span>
              </label>
              <Combobox
                id="apm-topics"
                inputClass="apm-input"
                value={form.topics}
                options={TOPIC_OPTIONS}
                placeholder="Select or type topics & field areas..."
                onChange={setValue("topics")}
              />
            </div>
          </div>

          <div className="apm-grid2 apm-field">
            <div>
              <label className="apm-label" htmlFor="apm-volume">Volume &amp; Issue</label>
              <input
                id="apm-volume"
                className="apm-input"
                type="text"
                value={form.volume}
                onChange={set("volume")}
                placeholder="Vol., Issue"
              />
            </div>
            <div>
              <label className="apm-label" htmlFor="apm-pages">Page Range</label>
              <input
                id="apm-pages"
                className="apm-input"
                type="text"
                value={form.pages}
                onChange={set("pages")}
                placeholder="pp. ..."
              />
            </div>
          </div>

          <div className="apm-field">
            <label className="apm-label" htmlFor="apm-faculty">
              Faculty / Research Unit <span className="apm-req">*</span>
            </label>
            <Combobox
              id="apm-faculty"
              inputClass="apm-input"
              value={form.faculty}
              options={UNIB_FACULTIES}
              placeholder="Select or type faculty / unit..."
              onChange={setValue("faculty")}
            />
          </div>

          {/* SDG mapping */}
          <div className="apm-sdghead">
            <GlobeIcon />
            <span>Sustainable Development Goals (SDGs) Mapping</span>
          </div>

          <div className="apm-chips">
            {form.sdgs.map((id) => (
              <span key={id} className="apm-chip">
                <span className="apm-chip__dot" style={{ background: sdgDot(id) }} />
                {sdgLabel(id)}
                <button
                  type="button"
                  className="apm-chip__x"
                  aria-label={`Remove ${sdgLabel(id)}`}
                  onClick={() => removeSdg(id)}
                >
                  <XSmallIcon />
                </button>
              </span>
            ))}
          </div>

          <div className="apm-addsdgrow">
            <span className="apm-selectwrap">
              <select
                className="apm-select"
                value={sdgPick}
                onChange={(e) => setSdgPick(e.target.value)}
                aria-label="Select SDG goal to map"
              >
                <option value="">Select SDG goal to map...</option>
                {SDG_FORM_OPTIONS.filter((o) => !form.sdgs.includes(o.id)).map((o) => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
              <ChevronDown />
            </span>
            <button type="button" className="apm-addsdg" onClick={addSdg}>
              <PlusIcon />
              Add SDG
            </button>
          </div>
        </div>

        <div className="apm-foot">
          <button type="button" className="apm-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="apm-save" onClick={() => onSave(form)}>
            <CheckIcon />
            Save &amp; Submit Publication
          </button>
        </div>
      </div>
    </div>
  );
}
