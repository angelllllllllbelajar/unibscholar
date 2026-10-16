import React from "react";

const BuildingIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const PencilIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const PeopleIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6-4a3 3 0 11-3-3" />
  </svg>
);

const TrashIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export default function StudyCenterUnitCard({ unit, onEdit, onDelete }) {
  const { title, faculty, stats, expanded } = unit;

  return (
    <div className="asc-card">
      <h3 className="asc-card__title">{title}</h3>

      <p className="asc-card__faculty">
        <span className="asc-card__facultyicon"><BuildingIcon /></span>
        {faculty}
      </p>

      {expanded ? (
        <>
          <div className="asc-card__stats">
            <span className="asc-stat"><i className="asc-dot" />{stats.members} Members</span>
            <span className="asc-stat"><i className="asc-dot" />{stats.publications} Publications</span>
            <span className="asc-stat asc-stat--green"><i className="asc-dot" />{stats.projects} Active Projects</span>
          </div>

          <div className="asc-card__actions">
            <button type="button" className="asc-btn asc-btn--edit" onClick={onEdit}>
              <PencilIcon />
              Edit Unit
            </button>
            <button type="button" className="asc-btn asc-btn--members">
              <PeopleIcon />
              Manage Members
            </button>
            <button type="button" className="asc-btn asc-btn--trash" aria-label="Delete unit" onClick={onDelete}>
              <TrashIcon />
            </button>
          </div>
        </>
      ) : (
        <div className="asc-card__actions asc-card__actions--compact">
          <button type="button" className="asc-btn asc-btn--edit" onClick={onEdit}>
            <PencilIcon />
            Edit Unit
          </button>
          <button type="button" className="asc-btn asc-btn--trash" aria-label="Delete unit" onClick={onDelete}>
            <TrashIcon />
          </button>
        </div>
      )}
    </div>
  );
}
