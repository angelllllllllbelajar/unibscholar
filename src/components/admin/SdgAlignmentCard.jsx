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

const GOAL_OPTIONS = [
  { num: "01", label: "No Poverty", color: "#e11d48" },
  { num: "02", label: "Zero Hunger", color: "#ca8a04" },
  { num: "03", label: "Good Health and Well-Being", color: "#16a34a" },
  { num: "04", label: "Quality Education", color: "#dc2626" },
  { num: "05", label: "Gender Equality", color: "#ea580c" },
  { num: "06", label: "Clean Water and Sanitation", color: "#0891b2" },
];

export default function SdgAlignmentCard({ ask }) {
  const [sdgs, setSdgs] = useState(sdgAssignments);
  const [selected, setSelected] = useState("");

  const removeSdg = (num) => setSdgs((prev) => prev.filter((s) => s.num !== num));

  const requestRemoveSdg = (num) =>
    ask({
      tone: "delete",
      title: "Remove SDG Alignment?",
      message: `You are about to unlink SDG Goal ${num} from this researcher profile. Linked publication counts will no longer appear under this goal.`,
      confirmLabel: "Yes, Remove",
      onConfirm: () => removeSdg(num),
    });

  const assignSdg = () => {
    const chosen = GOAL_OPTIONS.find((g) => g.num === selected);
    if (!chosen || sdgs.some((s) => s.num === chosen.num)) return;
    setSdgs((prev) => [...prev, { ...chosen, pubs: 0 }]);
    setSelected("");
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
          <select
            className="ar-input ar-select"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="" disabled>Select UN Sustainable Development Goal to map...</option>
            {GOAL_OPTIONS.filter((g) => !sdgs.some((s) => s.num === g.num)).map((g) => (
              <option key={g.num} value={g.num}>GOAL {Number(g.num)}: {g.label}</option>
            ))}
          </select>
          <button type="button" className="ar-assignsdg" onClick={assignSdg}>
            <PlusIcon />
            Assign SDG Goal
          </button>
        </div>
      </div>
    </section>
  );
}
