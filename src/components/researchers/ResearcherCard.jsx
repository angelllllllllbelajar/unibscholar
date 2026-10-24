import React from "react";
import { Link } from "react-router-dom";
import { sourceBadges } from "../../data/researchersData";

export default function ResearcherCard({ researcher }) {
  return (
    <div className="r-card">
      <div className="r-card__top">
        <img src="/researcher-placeholder.png" alt={researcher.name} className="r-card__photo" />
        <span className="r-card__hindex">H-Index: {researcher.hindex}</span>
      </div>

      <div>
        <h3 className="r-card__name">{researcher.name}</h3>
        <p className="r-card__role">{researcher.role}</p>
        <p className="r-card__dept">{researcher.dept}</p>
      </div>

      <div className="r-card__badges">
        {sourceBadges.map((b) => (
          <a
            key={b.label}
            href={b.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`r-badge r-badge--${b.variant}`}
          >
            {b.label}
          </a>
        ))}
      </div>

      <div className="r-card__stats">
        {[
          { val: researcher.pubs, label: "Pubs" },
          { val: researcher.projects, label: "Projects" },
          { val: researcher.citations.toLocaleString(), label: "Citations" },
        ].map(({ val, label }) => (
          <div key={label} className="r-stat">
            <p className="r-stat__value">{val}</p>
            <p className="r-stat__label">{label}</p>
          </div>
        ))}
      </div>

      <Link to={`/researchers/${researcher.id}`} className="r-card__cta">
        View Full Profile
      </Link>
    </div>
  );
}
