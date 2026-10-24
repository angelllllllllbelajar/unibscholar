import React from "react";
import { Link } from "react-router-dom";
import { sourceBadges } from "../../data/researchersData";
import { MEMBER_DEPT } from "../../data/studyCenterData";

const ArrowRight = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default function UnitMemberCard({ member }) {
  return (
    <div className="m-card">
      <div className="m-card__top">
        <div className="m-card__head">
          <img src="/researcher-placeholder.png" alt={member.name} className="m-card__photo" />
          <div className="m-card__id">
            <p className="m-card__name">{member.name}</p>
            <p className="m-card__role">{member.role}</p>
          </div>
          <span className="m-card__hindex">H-Index: {member.hindex}</span>
        </div>

        <p className="m-card__dept">{MEMBER_DEPT}</p>

        <div className="m-card__badges">
          {sourceBadges.map((b) => (
            <span key={b.label} className={`m-badge m-badge--${b.variant}`}>{b.label}</span>
          ))}
        </div>
      </div>

      <div className="m-card__foot">
        <Link to={`/researchers/${member.id}`} className="m-card__profile">
          View Profile
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
