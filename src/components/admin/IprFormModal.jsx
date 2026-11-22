import React, { useEffect, useState } from "react";
import Combobox from "./Combobox";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";
import { SDG_FORM_OPTIONS, SDG_STYLES } from "../../data/adminPublicationsData";
import {
  IPR_TYPE_FORM_OPTIONS,
  IPR_STATUS_FORM_OPTIONS,
  IPR_YEAR_OPTIONS,
} from "../../data/adminIprData";
import { UNIB_FACULTY_FULL_OPTIONS, facultyFullName } from "../../data/adminProjectsData";

const SAMPLE = {
  code: "PT-UNIB-2026-014",
  title: "Hierarchical Porous Metal-Organic Framework for High-Sensitivity Gas Detection",
  type: "Patent",
  regNo: "P00202610431",
  year: "2026",
  creator: "Prof. Dr. Brian Yuliarto (FMIPA - Advanced Materials)",
  faculty: "Faculty of Mathematics & Natural Sciences (FMIPA)",
  status: "Granted",
  sdgs: [7, 9],
};

function initialForm(mode, ipr) {
  if (mode === "edit" && ipr) {
    return {
      ...SAMPLE,
      code: ipr.code,
      title: ipr.title,
      type: ipr.type,
      regNo: ipr.regNo,
      year: String(ipr.year),
      creator: ipr.creator.name,
      faculty: facultyFullName(ipr.faculty),
      status: ipr.status,
      sdgs: [...ipr.sdgs],
    };
  }
  return { ...SAMPLE, sdgs: [...SAMPLE.sdgs] };
}

const CloseIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ShieldIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const HashIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4L8 20m8-16l-2 16M4 9h16M4 15h16" />
  </svg>
);

const UserIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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

export default function IprFormModal({ mode, ipr, onClose, onSave, suspendEscape = false }) {
  const [form, setForm] = useState(() => initialForm(mode, ipr));
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

  const heading = mode === "edit" ? "Edit Intellectual Property" : "Add New Intellectual Property";

  return (
    <div className="pjm-backdrop" onClick={onClose}>
      <div className="pjm-panel" onClick={(e) => e.stopPropagation()}>
        <div className="pjm-accent" />

        <div className="pjm-head">
          <span className="pjm-head__icon">
            <ShieldIcon />
          </span>
          <div>
            <h2 className="pjm-head__title">{heading}</h2>
            <p className="pjm-head__sub">
              Register patents, copyrights, trademarks, and other intellectual property rights.
            </p>
          </div>
          <button type="button" className="pjm-close" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="pjm-body">
          <div className="pjm-codebox">
            <label className="pjm-label" htmlFor="ipr-code">IP Code / Internal Identifier</label>
            <div className="pjm-inputwrap">
              <HashIcon />
              <input
                id="ipr-code"
                className="pjm-input pjm-input--mono"
                type="text"
                value={form.code}
                onChange={set("code")}
                placeholder="PT-UNIB-2026-..."
              />
            </div>
          </div>

          <div className="pjm-field">
            <label className="pjm-label" htmlFor="ipr-title">
              IP Title <span className="pjm-req">*</span>
            </label>
            <input
              id="ipr-title"
              className="pjm-input"
              type="text"
              value={form.title}
              onChange={set("title")}
              placeholder="Enter the full intellectual property title..."
            />
          </div>

          <div className="pjm-grid2">
            <div className="pjm-field">
              <label className="pjm-label" htmlFor="ipr-type">
                IP Type <span className="pjm-req">*</span>
              </label>
              <Combobox
                id="ipr-type"
                inputClass="pjm-input"
                value={form.type}
                options={IPR_TYPE_FORM_OPTIONS}
                placeholder="Select or type IP type..."
                onChange={setValue("type")}
              />
            </div>
            <div className="pjm-field">
              <label className="pjm-label" htmlFor="ipr-regno">Registration / Filing Number</label>
              <input
                id="ipr-regno"
                className="pjm-input pjm-input--mono"
                type="text"
                value={form.regNo}
                onChange={set("regNo")}
                placeholder="P00202610431"
              />
            </div>
          </div>

          <div className="pjm-grid2">
            <div className="pjm-field">
              <label className="pjm-label" htmlFor="ipr-creator">
                Inventor / Creator <span className="pjm-req">*</span>
              </label>
              <div className="pjm-inputwrap">
                <UserIcon />
                <input
                  id="ipr-creator"
                  className="pjm-input"
                  type="text"
                  value={form.creator}
                  onChange={set("creator")}
                  placeholder="Inventor name & affiliation"
                />
              </div>
            </div>
            <div className="pjm-field">
              <label className="pjm-label" htmlFor="ipr-faculty">
                Faculty / Research Cluster <span className="pjm-req">*</span>
              </label>
              <Combobox
                id="ipr-faculty"
                inputClass="pjm-input"
                value={form.faculty}
                options={UNIB_FACULTY_FULL_OPTIONS}
                placeholder="Select or type faculty / cluster..."
                onChange={setValue("faculty")}
              />
            </div>
          </div>

          <div className="pjm-grid2">
            <div className="pjm-field">
              <label className="pjm-label" htmlFor="ipr-year">Filing Year</label>
              <span className="pjm-selectwrap">
                <select id="ipr-year" className="pjm-select" value={form.year} onChange={set("year")}>
                  {IPR_YEAR_OPTIONS.map((y) => (
                    <option key={y} value={String(y)}>{y}</option>
                  ))}
                </select>
                <ChevronDown />
              </span>
            </div>
            <div className="pjm-field">
              <label className="pjm-label" htmlFor="ipr-status">Status</label>
              <span className="pjm-selectwrap">
                <select id="ipr-status" className="pjm-select" value={form.status} onChange={set("status")}>
                  {IPR_STATUS_FORM_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown />
              </span>
            </div>
          </div>

          <div className="pjm-sdghead">
            <GlobeIcon />
            <span>Sustainable Development Goals (SDGs) Mapping</span>
          </div>

          <div className="pjm-chips">
            {form.sdgs.map((id) => (
              <span key={id} className="pjm-chip">
                <span className="pjm-chip__dot" style={{ background: sdgDot(id) }} />
                {sdgLabel(id)}
                <button
                  type="button"
                  className="pjm-chip__x"
                  aria-label={`Remove ${sdgLabel(id)}`}
                  onClick={() => removeSdg(id)}
                >
                  <XSmallIcon />
                </button>
              </span>
            ))}
          </div>

          <div className="pjm-addsdgrow">
            <span className="pjm-selectwrap">
              <select
                className="pjm-select"
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
            <button type="button" className="pjm-addsdg" onClick={addSdg}>
              <PlusIcon />
              Add SDG
            </button>
          </div>
        </div>

        <div className="pjm-foot">
          <button type="button" className="pjm-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="pjm-save" onClick={() => onSave(form)}>
            <CheckIcon />
            Save &amp; Submit IP Record
          </button>
        </div>
      </div>
    </div>
  );
}
