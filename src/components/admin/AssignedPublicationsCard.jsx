import React, { useState } from "react";
import {
  assignedPublications,
  assignedProjects,
  PUB_TOTAL,
  PROJECT_TOTAL,
} from "../../data/adminResearcherData";

const BookIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const PencilIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const TrashIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const PlusIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const ChevronLeft = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

function ItemRow({ item }) {
  return (
    <div className="ar-pub">
      <div className="ar-pub__info">
        <p className="ar-pub__title">{item.title}</p>
        <p className="ar-pub__meta">
          <span className="ar-pub__venue">{item.venue}</span>
          <span className="ar-pub__dot">•</span>
          <span>{item.year}</span>
          <span className="ar-pub__dot">•</span>
          {item.verified && (
            <span className="ar-pub__verified">
              <span className="ar-pub__verifieddot" />
              Verified
            </span>
          )}
          {item.doi && <span>DOI: {item.doi}</span>}
          {item.citations && <span>{item.citations} Citations</span>}
        </p>
      </div>
      <div className="ar-pub__actions">
        <button type="button" className="ar-btn-edit">
          <PencilIcon />
          Edit
        </button>
        <button type="button" className="ar-btn-remove">
          <TrashIcon />
          Remove
        </button>
      </div>
    </div>
  );
}

export default function AssignedPublicationsCard() {
  const [tab, setTab] = useState("publications");

  const items = tab === "publications" ? assignedPublications : assignedProjects;
  const total = tab === "publications" ? PUB_TOTAL : PROJECT_TOTAL;
  const noun  = tab === "publications" ? "publications" : "projects";

  return (
    <section className="ar-card">
      <header className="ar-card__head ar-card__head--split">
        <span className="ar-card__headleft">
          <span className="ar-card__icon"><BookIcon /></span>
          <h2 className="ar-card__title">Assigned Publications</h2>
        </span>
        <button type="button" className="ar-assignpub">
          <PlusIcon />
          Assign Publication
        </button>
      </header>

      <div className="ar-tabs">
        <button
          type="button"
          className={`ar-tab ${tab === "publications" ? "ar-tab--active" : ""}`}
          onClick={() => setTab("publications")}
        >
          Publications ({PUB_TOTAL})
        </button>
        <button
          type="button"
          className={`ar-tab ${tab === "projects" ? "ar-tab--active" : ""}`}
          onClick={() => setTab("projects")}
        >
          Projects ({PROJECT_TOTAL})
        </button>
      </div>

      <div className="ar-pubs">
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </div>

      <footer className="ar-pubfoot">
        <p className="ar-pubfoot__info">Showing 1 to {items.length} of {total} {noun}</p>
        <div className="ar-pubfoot__nav">
          <button type="button" className="ar-pagebtn ar-pagebtn--plain" disabled>
            <ChevronLeft />
          </button>
          <button type="button" className="ar-pagebtn ar-pagebtn--active">1</button>
          <button type="button" className="ar-pagebtn">2</button>
          <button type="button" className="ar-pagebtn">3</button>
          <button type="button" className="ar-pagebtn ar-pagebtn--plain">
            <ChevronRight />
          </button>
        </div>
      </footer>
    </section>
  );
}
