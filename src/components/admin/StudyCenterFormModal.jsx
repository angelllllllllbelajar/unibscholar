import React, { useEffect, useState } from "react";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";
import { sdgCatalogue } from "../../data/adminStudyCenterData";

const dotColors = {
  blue: "#2563eb",
  green: "#16a34a",
  orange: "#ea580c",
  red: "#e11d48",
};

const BuildingIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CloseIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronDown = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const GlobeIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const XSmall = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function StudyCenterFormModal({ mode = "add", unit, onClose, onSave, suspendEscape = false }) {
  const isEdit = mode === "edit";
  const title = isEdit ? "Edit Study Center" : "Add New Study Center";

  const [form, setForm] = useState(() => ({
    name: unit?.title || "",
    head: unit?.head || "",
    url: unit?.url || "",
    email: unit?.email || "",
  }));
  const [sdgs, setSdgs] = useState(() => unit?.sdgs || []);
  const [pendingSdg, setPendingSdg] = useState("");

  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    if (!suspendEscape) window.addEventListener("keydown", onKey);
    lockScroll();

    return () => {
      if (!suspendEscape) window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [onClose, suspendEscape]);

  const setField = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const removeSdg = num => setSdgs(list => list.filter(s => s.num !== num));

  const addSdg = () => {
    const chosen = sdgCatalogue.find(s => String(s.num) === pendingSdg);
    if (!chosen || sdgs.some(s => s.num === chosen.num)) return;
    setSdgs(list => [...list, chosen]);
    setPendingSdg("");
  };

  return (
    <div className="scm-backdrop" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="scm-dialog"
        onClick={e => e.stopPropagation()}
      >
        <div className="scm-accent" />

        <div className="scm-header">
          <span className="scm-header__icon"><BuildingIcon /></span>
          <h2 className="scm-header__title">{title}</h2>
          <button type="button" className="scm-close" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="scm-body">
          <div className="scm-grid">
            <div className="scm-field">
              <label className="scm-label">Unit Name <span className="scm-req">*</span></label>
              <input className="scm-input" type="text" value={form.name} onChange={setField("name")} />
            </div>

            <div className="scm-field">
              <label className="scm-label">Head of Unit <span className="scm-req">*</span></label>
              <input className="scm-input" type="text" value={form.head} onChange={setField("head")} />
            </div>

            <div className="scm-field">
              <label className="scm-label">Repository / Web Portal URL</label>
              <input className="scm-input" type="text" value={form.url} onChange={setField("url")} />
            </div>

            <div className="scm-field">
              <label className="scm-label">Official Contact Email</label>
              <input className="scm-input" type="email" value={form.email} onChange={setField("email")} />
            </div>
          </div>

          <hr className="scm-divider" />

          <p className="scm-sdghead">
            <span className="scm-sdghead__icon"><GlobeIcon /></span>
            Sustainable Development Goals (SDGs) Mapping
          </p>

          <div className="scm-sdgpills">
            {sdgs.map(s => (
              <span key={s.num} className="scm-pill">
                <i className="scm-pill__dot" style={{ background: dotColors[s.dot] || dotColors.blue }} />
                SDG {s.num}: {s.label}
                <button type="button" className="scm-pill__x" aria-label={`Remove SDG ${s.num}`} onClick={() => removeSdg(s.num)}>
                  <XSmall />
                </button>
              </span>
            ))}
          </div>

          <div className="scm-sdgrow">
            <div className="scm-selectwrap scm-selectwrap--grow">
              <select className="scm-input scm-select" value={pendingSdg} onChange={e => setPendingSdg(e.target.value)}>
                <option value="">Select SDG goal to map...</option>
                {sdgCatalogue
                  .filter(s => !sdgs.some(x => x.num === s.num))
                  .map(s => <option key={s.num} value={String(s.num)}>SDG {s.num}: {s.label}</option>)}
              </select>
              <span className="scm-selectwrap__chev"><ChevronDown /></span>
            </div>
            <button type="button" className="scm-addsdg" onClick={addSdg}>
              <PlusIcon />
              Add SDG
            </button>
          </div>
        </div>

        <div className="scm-footer">
          <button type="button" className="scm-cancel" onClick={onClose}>Cancel</button>
          <button type="button" className="scm-save" onClick={onSave || onClose}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
