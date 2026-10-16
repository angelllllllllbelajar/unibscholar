import React, { useState } from "react";
import {
  facultyOptions,
  rankOptions,
  createProfileFields,
  createExternalIds,
  sdgGoalOptions,
} from "../../data/adminResearcherData";

const UserIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const TagIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M7 7h.01M7 3h5a2 2 0 011.414.586l7 7a2 2 0 010 2.828l-5 5a2 2 0 01-2.828 0l-7-7A2 2 0 013 10V5a2 2 0 012-2h2z" />
  </svg>
);

const GlobeIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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

const XIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function SelectField({ label, required, options, placeholder }) {
  return (
    <div className="ar-field">
      <label className="ar-field__label">
        {label}
        {required && <span className="ar-req"> *</span>}
      </label>
      <div className="ar-selectwrap">
        <select className="ar-input ar-select" defaultValue="">
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <span className="ar-selectwrap__chev"><ChevronDown /></span>
      </div>
    </div>
  );
}

function ProfileCard() {
  return (
    <section className="ar-card">
      <header className="ar-card__head">
        <span className="ar-card__icon"><UserIcon /></span>
        <h2 className="ar-card__title">Personal &amp; Academic Info</h2>
      </header>

      <div className="ar-card__body">
        <div className="ar-photo">
          <span className="ar-photo__img ar-photo__img--empty"><UserIcon /></span>
          <div>
            <p className="ar-photo__label">Profile Photo</p>
            <p className="ar-photo__links">
              <button type="button" className="ar-photo__upload">Upload Photo</button>
            </p>
            <p className="ar-photo__hint">JPG, PNG max 2MB</p>
          </div>
        </div>

        {createProfileFields.map(f => (
          <div key={f.key} className="ar-field">
            <label className="ar-field__label">
              {f.label}
              {f.required && <span className="ar-req"> *</span>}
            </label>
            <input
              type="text"
              placeholder={f.placeholder}
              className={`ar-input ${f.mono ? "ar-input--mono" : ""}`}
            />
          </div>
        ))}

        <SelectField label="Academic Title / Rank" required options={rankOptions} placeholder="Select rank..." />
        <SelectField label="Faculty" required options={facultyOptions} placeholder="Select faculty..." />

        <hr className="ar-divider" />

        <p className="ar-sublabel">External Academic IDs</p>

        {createExternalIds.map(f => (
          <div key={f.key} className="ar-field">
            <label className="ar-field__label">{f.label}</label>
            <input type="text" placeholder={f.placeholder} className="ar-input ar-input--mono" />
          </div>
        ))}
      </div>
    </section>
  );
}

function TopicsCard() {
  const [topics, setTopics] = useState([]);
  const [draft, setDraft] = useState("");

  const addTopic = () => {
    const value = draft.trim();
    if (!value || topics.includes(value)) return;
    setTopics(prev => [...prev, value]);
    setDraft("");
  };

  return (
    <section className="ar-card">
      <header className="ar-card__head">
        <span className="ar-card__icon"><TagIcon /></span>
        <h2 className="ar-card__title">Research Topics</h2>
      </header>

      <div className="ar-card__body">
        {topics.length === 0 ? (
          <p className="ar-empty">No research topics added yet.</p>
        ) : (
          <div className="ar-tags">
            {topics.map(t => (
              <span key={t} className="ar-tag">
                {t}
                <button
                  type="button"
                  className="ar-tag__x"
                  aria-label={`Remove ${t}`}
                  onClick={() => setTopics(prev => prev.filter(x => x !== t))}
                >
                  <XIcon />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="ar-tagrow">
          <input
            type="text"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") addTopic(); }}
            placeholder="Enter new topic..."
            className="ar-input"
          />
          <button type="button" className="ar-addtag" onClick={addTopic}>
            <PlusIcon />
            Add Tag
          </button>
        </div>
      </div>
    </section>
  );
}

function SdgCard() {
  const [sdgs, setSdgs] = useState([]);
  const [pending, setPending] = useState("");

  const assign = () => {
    const chosen = sdgGoalOptions.find(s => s.num === pending);
    if (!chosen || sdgs.some(s => s.num === chosen.num)) return;
    setSdgs(prev => [...prev, chosen]);
    setPending("");
  };

  return (
    <section className="ar-card">
      <header className="ar-card__head">
        <span className="ar-card__icon"><GlobeIcon /></span>
        <h2 className="ar-card__title">
          Sustainable Development Goals (SDGs)
          <br />
          Alignment
        </h2>
      </header>

      <div className="ar-card__body">
        {sdgs.length === 0 ? (
          <p className="ar-empty">No SDG goals mapped yet.</p>
        ) : (
          <div className="ar-sdgs">
            {sdgs.map(s => (
              <div key={s.num} className="ar-sdg">
                <span className="ar-sdg__num" style={{ background: s.color }}>{s.num}</span>
                <span className="ar-sdg__text">
                  <span className="ar-sdg__label">{s.label}</span>
                  <span className="ar-sdg__pubs">0 Publications linked</span>
                </span>
                <button
                  type="button"
                  className="ar-sdg__x"
                  aria-label={`Remove SDG ${s.num}`}
                  onClick={() => setSdgs(prev => prev.filter(x => x.num !== s.num))}
                >
                  <XIcon />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="ar-sdgrow">
          <div className="ar-selectwrap ar-selectwrap--grow">
            <select
              className="ar-input ar-select"
              value={pending}
              onChange={e => setPending(e.target.value)}
            >
              <option value="">Select UN Sustainable Development Goal to map...</option>
              {sdgGoalOptions
                .filter(s => !sdgs.some(x => x.num === s.num))
                .map(s => <option key={s.num} value={s.num}>GOAL {s.num}: {s.label}</option>)}
            </select>
            <span className="ar-selectwrap__chev"><ChevronDown /></span>
          </div>
          <button type="button" className="ar-assignsdg" onClick={assign}>
            <PlusIcon />
            Assign SDG Goal
          </button>
        </div>
      </div>
    </section>
  );
}

export default function ResearcherCreateForm() {
  return (
    <div className="ar-grid">
      <ProfileCard />
      <div className="ar-col">
        <TopicsCard />
        <SdgCard />
      </div>
    </div>
  );
}
