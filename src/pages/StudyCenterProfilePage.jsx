import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import UnitMemberCard from "../components/studycenter/UnitMemberCard";
import { units } from "../data/studyCenterData";
import "../styles/pages/study-center.css";

const BackIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const ShareIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const BuildingIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const SendIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const MailIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LinkIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const PersonIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6-4a3 3 0 11-3-3" />
  </svg>
);

const GlobeIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TopicIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const MembersIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6-4a3 3 0 11-3-3" />
  </svg>
);

const SearchMiniIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

function TrendChart({ stroke, fill, points }) {
  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const area = `${line} L100,40 L0,40 Z`;
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
      <path d={area} fill={fill} />
      <path d={line} fill="none" stroke={stroke} strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function StudyCenterProfilePage() {
  const { id } = useParams();
  const unit = units.find((u) => u.id === Number(id)) || units[0];

  const [memberSearch, setMemberSearch] = useState("");

  const members = unit.members.filter((m) =>
    m.name.toLowerCase().includes(memberSearch.toLowerCase())
  );

  return (
    <div className="page-root">
      <div className="page-container">
        {/* Top bar */}
        <div className="scp-topbar">
          <Link to="/study-center" className="scp-back">
            <BackIcon />
            Back to Study Center
          </Link>
          <button type="button" className="scp-share">
            <ShareIcon />
            Share Unit Profile
          </button>
        </div>

        {/* Header card */}
        <div className="scp-header">
          <div className="scp-header__row">
            <div className="scp-header__id">
              <div className="scp-header__icon">
                <BuildingIcon />
              </div>
              <div>
                <h1 className="scp-header__title">{unit.title}</h1>
              </div>
            </div>
            <button type="button" className="scp-contact-btn">
              <SendIcon />
              Contact Unit Administration
            </button>
          </div>

          <div className="scp-header__bar">
            <span className="scp-bar-item">
              <MailIcon />
              <span className="scp-bar-link">{unit.detailEmail}</span>
            </span>
            <span className="scp-bar-item">
              <LinkIcon />
              <span className="scp-bar-link">{unit.detailUrl}</span>
            </span>
            <span className="scp-bar-item scp-bar-item--person">
              <PersonIcon />
              <span className="scp-bar-text">Kepala Pusat Studi: {unit.kepalaFull}</span>
            </span>
          </div>
        </div>

        {/* Stat cards */}
        <div className="scp-stats">
          <div className="scp-stat scp-stat--pubs">
            <p className="scp-stat__label">Publications</p>
            <p className="scp-stat__value">{unit.pubs}</p>
            <div className="scp-stat__chart">
              <TrendChart
                stroke="#2563eb"
                fill="#bfdbfe"
                points={[[0, 34], [20, 30], [40, 24], [60, 18], [80, 12], [100, 8]]}
              />
            </div>
            <div className="scp-stat__years">
              <span>{unit.pubYears[0]}</span>
              <span>{unit.pubYears[1]}</span>
            </div>
          </div>

          <div className="scp-stat scp-stat--projects">
            <p className="scp-stat__label">Projects</p>
            <p className="scp-stat__value">{unit.projects}</p>
            <div className="scp-stat__chart">
              <TrendChart
                stroke="#10b981"
                fill="#a7f3d0"
                points={[[0, 34], [20, 26], [40, 20], [60, 17], [80, 15], [100, 12]]}
              />
            </div>
            <div className="scp-stat__years">
              <span>{unit.projYears[0]}</span>
              <span>{unit.projYears[1]}</span>
            </div>
          </div>
        </div>

        {/* SDG alignment */}
        <div className="scp-sdg">
          <div className="scp-sdg__header">
            <GlobeIcon />
            Sustainable Development Goals (SDG) Alignment
          </div>
          <div className="scp-sdg__grid">
            {unit.sdgIds.map((g) => (
              <img key={g} src={encodeURI(`/sdg-image/GOAL${g}.png`)} alt={`SDG Goal ${g}`} />
            ))}
          </div>
        </div>

        {/* Research topics */}
        <div className="scp-section-header">
          <h2 className="scp-section-title">
            <TopicIcon />
            Research Topics
          </h2>
          <button type="button" className="scp-link">Show More</button>
        </div>
        <div className="scp-topics">
          {unit.researchTopics.map((t) => (
            <div key={t.title} className="scp-topic">
              <h3 className="scp-topic__title">{t.title}</h3>
              <p className="scp-topic__desc">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Members */}
        <div className="scp-section-header">
          <h2 className="scp-section-title">
            <MembersIcon />
            Members ({unit.members.length} Researchers)
          </h2>
        </div>
        <div className="scp-members">
          {members.map((m) => (
            <UnitMemberCard key={m.id} member={m} />
          ))}
        </div>
      </div>
    </div>
  );
}
