import React from "react";
import { citedBy } from "../../data/publicationsData";

const EyeIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const ChatIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
    />
  </svg>
);

function handleImgError(e) {
  e.target.style.display = "none";
  e.target.parentNode.style.background = "linear-gradient(135deg,#1a2b5f22,#3b82f622)";
}

// ── Grid card (compact) ──
function GridCard({ pub }) {
  return (
    <div className="p-card p-card--grid">
      <div className="p-card__thumb">
        <img src={pub.image} alt={pub.title} onError={handleImgError} />
        <div className="p-card__doi">DOI: {pub.doi}</div>
      </div>
      <div className="p-card__body">
        <div className="p-card__meta">
          <div className="p-card__date">
            <CalendarIcon />
            <span>{pub.date}</span>
          </div>
          {(pub.volume || pub.volumeTag) && (
            <span className="p-card__volume">{pub.volume || pub.volumeTag}</span>
          )}
        </div>
        <h3 className="p-card__title clamp-3">{pub.title}</h3>
        <p className="p-card__authors clamp-1">{pub.authors.join(", ")}</p>
        <p className="p-card__abstract clamp-3">{pub.abstract}</p>
        <div className="p-card__actions">
          <button type="button" className="p-card__view">
            <EyeIcon />
            View Paper
          </button>
          <div className="p-card__cites">{pub.citations} Citations</div>
        </div>
      </div>
    </div>
  );
}

// ── List card (banner + two-column body) ──
function ListCard({ pub }) {
  const refs = citedBy[pub.id] || [];

  return (
    <div className="p-card">
      <div className="p-card__thumb p-card__thumb--banner">
        <img src={pub.image} alt={pub.title} onError={handleImgError} />
        <div className="p-card__doi">DOI: {pub.doi}</div>
      </div>

      <div className="p-card__body p-card__body--list">
        <div className="p-card__main">
          <div className="p-card__meta">
            <div className="p-card__date">
              <CalendarIcon />
              <span>{pub.date}</span>
            </div>
            {(pub.volume || pub.volumeTag) && (
              <span className="p-card__volume p-card__volume--plain">{pub.volume || pub.volumeTag}</span>
            )}
          </div>

          <h3 className="p-card__title p-card__title--list">{pub.title}</h3>
          <p className="p-card__authors p-card__authors--list">{pub.authors.join(", ")}</p>
          <p className="p-card__abstract p-card__abstract--list clamp-4">{pub.abstract}</p>

          <div className="p-card__actions p-card__actions--list">
            <button type="button" className="p-card__view p-card__view--list">
              <EyeIcon />
              View Paper
            </button>
            <div className="p-card__cites p-card__cites--list">
              <ChatIcon />
              {pub.citations} Citations
            </div>
          </div>
        </div>

        <div className="p-card__citedby">
          <h4>Citied By</h4>
          <div className="p-card__refs">
            {refs.map((ref, i) => (
              <div key={i} className="p-ref">
                <p className="p-ref__title clamp-2">{ref.title}</p>
                <p className="p-ref__meta">
                  [{ref.year}] • {ref.authors}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PublicationCard({ pub, viewMode = "grid" }) {
  return viewMode === "list" ? <ListCard pub={pub} /> : <GridCard pub={pub} />;
}
