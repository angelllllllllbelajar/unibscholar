import React, { useEffect, useState } from "react";
import Combobox from "./Combobox";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";
import { SDG_FORM_OPTIONS, SDG_STYLES } from "../../data/adminPublicationsData";
import {
  PROJECT_TOPIC_FORM_OPTIONS,
  PROJECT_FISCAL_YEAR_OPTIONS,
  PROJECT_SCHEME_FORM_OPTIONS,
  UNIB_FACULTY_FULL_OPTIONS,
  PROJECT_STATUS_FORM_OPTIONS,
  facultyFullName,
} from "../../data/adminProjectsData";

const SAMPLE = {
  code: "PRJ-UNIB-2026-KMT-0419",
  title: "Hierarchical Porous Metal-Organic Frameworks for High-Sensitivity Gas Detection",
  topics: "Nuclear & Reactor Physics, Operator Algebras",
  scheme: "Penelitian Terapan (PT-Unib)",
  year: "2026 (Active Fiscal Year)",
  pi: "Prof. Dr. Brian Yuliarto (FTI - Advanced Materials)",
  coInvestigators: "Dr. Eleanor Vance, Dr. Asril Pramutadi",
  funding: "350,000,000 (≈ $22,000 USD)",
  faculty: "Faculty of Mathematics & Natural Sciences (FMIPA)",
  start: "Mar 2026",
  end: "Nov 2026",
  status: "Pending Institutional Review",
  sdgs: [7, 9, 11],
};

function initialForm(mode, project) {
  if (mode === "edit" && project) {
    const [start = "", end = ""] = project.period.split(" - ");
    return {
      ...SAMPLE,
      code: project.code,
      title: project.title,
      topics: project.field,
      scheme: project.funder,
      year: String(project.fiscalYear ?? project.activeYears[project.activeYears.length - 1] ?? 2026),
      pi: project.pi.name,
      coInvestigators: project.coInvestigators ?? "",
      funding: `${project.budgetIdr.replace(/^Rp\s*/, "")} (≈ ${project.budgetUsd.replace(/ USD$/, "")} USD)`,
      faculty: facultyFullName(project.faculty),
      start,
      end,
      status: project.status === "Pending Review" ? "Pending Institutional Review" : project.status,
      sdgs: [...project.sdgs],
    };
  }
  return { ...SAMPLE, sdgs: [...SAMPLE.sdgs] };
}

const CloseIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const FolderPlusIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 5V5a2 2 0 012-2h3.93a2 2 0 011.66.9l.82 1.2a2 2 0 001.66.9H19a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
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

export default function ProjectFormModal({ mode, project, onClose, onSave, suspendEscape = false }) {
  const [form, setForm] = useState(() => initialForm(mode, project));
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

  const heading = mode === "edit" ? "Edit Project" : "Add New Project";

  return (
    <div className="pjm-backdrop" onClick={onClose}>
      <div className="pjm-panel" onClick={(e) => e.stopPropagation()}>
        <div className="pjm-accent" />

        <div className="pjm-head">
          <span className="pjm-head__icon">
            <FolderPlusIcon />
          </span>
          <div>
            <h2 className="pjm-head__title">{heading}</h2>
            <p className="pjm-head__sub">
              Register institutional grants, research proposals, active contracts, and funding disbursements.
            </p>
          </div>
          <button type="button" className="pjm-close" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="pjm-body">
          {/* Grant code box */}
          <div className="pjm-codebox">
            <label className="pjm-label" htmlFor="pjm-code">Project Code / Grant Identifier</label>
            <div className="pjm-inputwrap">
              <HashIcon />
              <input
                id="pjm-code"
                className="pjm-input pjm-input--mono"
                type="text"
                value={form.code}
                onChange={set("code")}
                placeholder="PRJ-UNIB-2026-..."
              />
            </div>
          </div>

          <div className="pjm-grid2">
            <div className="pjm-field">
              <label className="pjm-label" htmlFor="pjm-title">
                Project Title <span className="pjm-req">*</span>
              </label>
              <input
                id="pjm-title"
                className="pjm-input"
                type="text"
                value={form.title}
                onChange={set("title")}
                placeholder="Enter the full project title..."
              />
            </div>
            <div className="pjm-field">
              <label className="pjm-label" htmlFor="pjm-topics">
                Topics &amp; Field Areas <span className="pjm-req">*</span>
              </label>
              <Combobox
                id="pjm-topics"
                inputClass="pjm-input"
                value={form.topics}
                options={PROJECT_TOPIC_FORM_OPTIONS}
                placeholder="Select or type topics & field areas..."
                onChange={setValue("topics")}
              />
            </div>
          </div>

          <div className="pjm-grid2">
            <div className="pjm-field">
              <label className="pjm-label" htmlFor="pjm-scheme">
                Grant Scheme / Funder Category <span className="pjm-req">*</span>
              </label>
              <Combobox
                id="pjm-scheme"
                inputClass="pjm-input"
                value={form.scheme}
                options={PROJECT_SCHEME_FORM_OPTIONS}
                placeholder="Select or type grant scheme / funder..."
                onChange={setValue("scheme")}
              />
            </div>
            <div className="pjm-field">
              <label className="pjm-label" htmlFor="pjm-year">
                Fiscal Year / Cycle <span className="pjm-req">*</span>
              </label>
              <Combobox
                id="pjm-year"
                inputClass="pjm-input"
                value={form.year}
                options={PROJECT_FISCAL_YEAR_OPTIONS}
                placeholder="Select or type fiscal year..."
                onChange={setValue("year")}
              />
            </div>
          </div>

          <div className="pjm-grid2">
            <div className="pjm-field">
              <label className="pjm-label" htmlFor="pjm-pi">
                Principal Investigator (PI) <span className="pjm-req">*</span>
              </label>
              <div className="pjm-inputwrap">
                <UserIcon />
                <input
                  id="pjm-pi"
                  className="pjm-input"
                  type="text"
                  value={form.pi}
                  onChange={set("pi")}
                  placeholder="PI name & affiliation"
                />
              </div>
            </div>
            <div className="pjm-field">
              <label className="pjm-label" htmlFor="pjm-co">Co-Investigators &amp; Affiliations</label>
              <div className="pjm-inputwrap">
                <UsersIcon />
                <input
                  id="pjm-co"
                  className="pjm-input"
                  type="text"
                  value={form.coInvestigators}
                  onChange={set("coInvestigators")}
                  placeholder="Comma-separated co-investigators"
                />
              </div>
            </div>
          </div>

          <div className="pjm-grid2">
            <div className="pjm-field">
              <label className="pjm-label" htmlFor="pjm-funding">
                Total Funding Value (USD / IDR) <span className="pjm-req">*</span>
              </label>
              <div className="pjm-inputwrap">
                <span className="pjm-prefix">Rp</span>
                <input
                  id="pjm-funding"
                  className="pjm-input"
                  type="text"
                  value={form.funding}
                  onChange={set("funding")}
                  placeholder="350,000,000 (≈ $22,000 USD)"
                />
              </div>
            </div>
            <div className="pjm-field">
              <label className="pjm-label" htmlFor="pjm-faculty">
                Faculty / Research Cluster <span className="pjm-req">*</span>
              </label>
              <Combobox
                id="pjm-faculty"
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
              <label className="pjm-label" htmlFor="pjm-start">Project Duration (Start &amp; End)</label>
              <div className="pjm-durrow">
                <input
                  id="pjm-start"
                  className="pjm-input"
                  type="text"
                  value={form.start}
                  onChange={set("start")}
                  placeholder="Mar 2026"
                />
                <input
                  id="pjm-end"
                  className="pjm-input"
                  type="text"
                  value={form.end}
                  onChange={set("end")}
                  placeholder="Nov 2026"
                />
              </div>
            </div>
            <div className="pjm-field">
              <label className="pjm-label" htmlFor="pjm-status">Initial Project Status</label>
              <span className="pjm-selectwrap">
                <select
                  id="pjm-status"
                  className="pjm-select"
                  value={form.status}
                  onChange={set("status")}
                >
                  {PROJECT_STATUS_FORM_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown />
              </span>
            </div>
          </div>

          {/* SDG mapping */}
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
            Save &amp; Submit Project
          </button>
        </div>
      </div>
    </div>
  );
}
