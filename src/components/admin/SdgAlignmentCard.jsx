import React, { useState } from "react";
import { sdgAssignments } from "../../data/adminResearcherData";

const GlobeIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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

export default function SdgAlignmentCard({ ask }) {
  const [sdgs, setSdgs] = useState(sdgAssignments);

  const removeSdg = (num) => setSdgs((prev) => prev.filter((s) => s.num !== num));

  const requestRemoveSdg = (num) =>
    ask({
      tone: "delete",
      title: "Remove SDG Alignment?",
      message: `You are about to unlink SDG Goal ${num} from this researcher profile. Linked publication counts will no longer appear under this goal.`,
      confirmLabel: "Yes, Remove",
      onConfirm: () => removeSdg(num),
    });

  const requestAssignSdg = () =>
    ask({
      tone: "save",
      title: "Assign SDG Goal?",
      message: "You are about to map the selected UN Sustainable Development Goal to this researcher profile.",
      confirmLabel: "Yes, Assign",
    });

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
        <div className="ar-sdgs">
          {sdgs.map((s) => (
            <div key={s.num} className="ar-sdg">
              <span className="ar-sdg__num" style={{ background: s.color }}>{s.num}</span>
              <span className="ar-sdg__text">
                <span className="ar-sdg__label">{s.label}</span>
                <span className="ar-sdg__pubs">{s.pubs} Publications linked</span>
              </span>
              <button
                type="button"
                className="ar-sdg__x"
                aria-label={`Remove SDG ${s.num}`}
                onClick={() => requestRemoveSdg(s.num)}
              >
                <XIcon />
              </button>
            </div>
          ))}
        </div>

        <div className="ar-sdgrow">
          <select className="ar-input ar-select" defaultValue="">
            <option value="" disabled>Select UN Sustainable Development Goal to map...</option>
            <option>GOAL 1: No Poverty</option>
            <option>GOAL 2: Zero Hunger</option>
            <option>GOAL 3: Good Health and Well-Being</option>
            <option>GOAL 4: Quality Education</option>
            <option>GOAL 5: Gender Equality</option>
            <option>GOAL 6: Clean Water and Sanitation</option>
          </select>
          <button type="button" className="ar-assignsdg" onClick={requestAssignSdg}>
            <PlusIcon />
            Assign SDG Goal
          </button>
        </div>
      </div>
    </section>
  );
}
