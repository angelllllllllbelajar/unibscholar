import React, { useState } from "react";
import { researchTopics } from "../../data/adminResearcherData";

const TagIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M7 7h.01M7 3h5a2 2 0 011.414.586l7 7a2 2 0 010 2.828l-5 5a2 2 0 01-2.828 0l-7-7A2 2 0 013 10V5a2 2 0 012-2h2z" />
  </svg>
);

const XIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PlusIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export default function ResearchTopicsCard() {
  const [topics, setTopics] = useState(researchTopics);
  const [draft, setDraft] = useState("");

  const removeTopic = (label) => setTopics((prev) => prev.filter((t) => t !== label));

  const addTopic = () => {
    const value = draft.trim();
    if (!value || topics.includes(value)) return;
    setTopics((prev) => [...prev, value]);
    setDraft("");
  };

  return (
    <section className="ar-card">
      <header className="ar-card__head">
        <span className="ar-card__icon"><TagIcon /></span>
        <h2 className="ar-card__title">Research Topics</h2>
      </header>

      <div className="ar-card__body">
        <div className="ar-tags">
          {topics.map((t) => (
            <span key={t} className="ar-tag">
              {t}
              <button
                type="button"
                className="ar-tag__x"
                aria-label={`Remove ${t}`}
                onClick={() => removeTopic(t)}
              >
                <XIcon />
              </button>
            </span>
          ))}
        </div>

        <div className="ar-tagrow">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addTopic(); }}
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
