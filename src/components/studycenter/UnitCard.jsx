import React from "react";
import { Link } from "react-router-dom";

const MailIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ExtIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const PersonIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6-4a3 3 0 11-3-3" />
  </svg>
);

const ArrowIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

function ContactBox({ unit }) {
  return (
    <div className="sc-contact">
      <div className="sc-contact__row">
        <MailIcon />
        <span className="sc-contact__mono sc-contact__email">{unit.email}</span>
      </div>
      <div className="sc-contact__row">
        <ExtIcon />
        <span className="sc-contact__mono sc-contact__link">{unit.url}</span>
      </div>
      <div className="sc-contact__row">
        <PersonIcon />
        <span className="sc-contact__text">Kepala: {unit.kepala}</span>
      </div>
    </div>
  );
}

export default function UnitCard({ unit }) {
  if (!unit.featured) {
    return (
      <Link to={`/study-center/${unit.id}`} className="sc-card">
        <h3 className="sc-card__title">{unit.title}</h3>
        <ContactBox unit={unit} />
      </Link>
    );
  }

  return (
    <div className="sc-card sc-card--featured">
      <h3 className="sc-card__title">{unit.title}</h3>

      <div className="sc-stats">
        <div className="sc-stat">
          <p className="sc-stat__value">{unit.stats.members}</p>
          <p className="sc-stat__label">Members</p>
        </div>
        <div className="sc-stat">
          <p className="sc-stat__value">{unit.stats.publications}</p>
          <p className="sc-stat__label">Publications</p>
        </div>
        <div className="sc-stat">
          <p className="sc-stat__value">{unit.stats.projects}</p>
          <p className="sc-stat__label">Projects</p>
        </div>
      </div>

      <ContactBox unit={unit} />

      <div>
        <p className="sc-members-label">Members &amp; Principal Investigators:</p>
        <div className="sc-chips">
          {unit.memberChips.map((m) => (
            <span key={m} className="sc-chip">{m}</span>
          ))}
          <span className="sc-chip sc-chip--more">+{unit.moreCount} more</span>
        </div>
      </div>

      <Link to={`/study-center/${unit.id}`} className="sc-cta">
        View Unit Profile
        <ArrowIcon />
      </Link>
    </div>
  );
}
