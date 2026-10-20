import React, { useState } from "react";
import { pendingPublications, PENDING_COUNT, PENDING_SHOWN } from "../../data/adminData";

const FunnelIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 8h12M9 12h6M12 16h0" />
  </svg>
);

const CheckIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const TrashIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

function SourceIcon({ icon }) {
  if (icon === "scopus") {
    return (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10m0-7h6m-6 3h6m10-6v10m0-7h-6m6 3h-6" />
      </svg>
    );
  }
  if (icon === "node") {
    return (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 8v4m8-8h-4M8 12H4m12.5-3.5l-2.8 2.8m-3.4 3.4l-2.8 2.8m9-0l-2.8-2.8m-3.4-3.4L7.5 8.5" />
      </svg>
    );
  }
  if (icon === "scholar") {
    return (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
      </svg>
    );
  }
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const FILTER_OPTIONS = [
  { id: "all", label: "All Statuses" },
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
];

export default function PendingTable() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const visibleRows = pendingPublications.filter(
    (row) => statusFilter === "all" || row.status === statusFilter
  );

  return (
    <div className="ad-tablecard">
      <div className="ad-tablecard__head">
        <div className="ad-tablecard__title">
          Pending Publications and Projects for Approval
          <span className="ad-pill-pending">{PENDING_COUNT} Pending</span>
        </div>
        <div className="ad-tablecard__actions">
          <div className="ad-filterwrap">
            <button
              type="button"
              className="ad-filterbtn"
              onClick={() => setFilterOpen((v) => !v)}
            >
              <FunnelIcon />
              Filter
            </button>
            {filterOpen && (
              <div className="ad-filtermenu">
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`ad-filtermenu__item ${statusFilter === opt.id ? "ad-filtermenu__item--active" : ""}`}
                    onClick={() => {
                      setStatusFilter(opt.id);
                      setFilterOpen(false);
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="ad-tablewrap">
        <table className="ad-table">
          <thead>
            <tr>
              <th>Title &amp; Venue</th>
              <th>Lead Author &amp; ID</th>
              <th>Date Submitted</th>
              <th>Indexing Source</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr key={row.id}>
                <td>
                  <p className="ad-cell-title">{row.title}</p>
                  <p className="ad-cell-sub">
                    <span>{row.venue}</span>
                    <span className="ad-cell-sub__dot">•</span>
                    <span>{row.qualifier}</span>
                  </p>
                </td>
                <td>
                  <p className="ad-cell-author">{row.author}</p>
                  <p className="ad-cell-id">ID: {row.authorId}</p>
                </td>
                <td>
                  <span className="ad-cell-date">{row.date}</span>
                </td>
                <td>
                  <span className={`ad-src ad-src--${row.source.variant}`}>
                    <SourceIcon icon={row.source.icon} />
                    {row.source.label}
                  </span>
                </td>
                <td>
                  <span className={`ad-status ad-status--${row.status}`}>
                    <i className="ad-status__dot" />
                    {row.status === "pending" ? "Pending" : "Approved"}
                  </span>
                </td>
                <td>
                  {row.status === "pending" ? (
                    <div className="ad-actions">
                      <button type="button" className="ad-approve">
                        <CheckIcon />
                        Approve
                      </button>
                      <button type="button" className="ad-reject">
                        <TrashIcon />
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="ad-actions">
                      <span className="ad-completed">
                        <CheckIcon />
                        Completed
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ad-tablefoot">
        <p className="ad-tablefoot__info">
          Showing 1-{PENDING_SHOWN} of {PENDING_COUNT} items
        </p>
        <div className="ad-tablefoot__nav">
          <button type="button" className="ad-pagebtn" disabled>
            <ChevronLeft />
            Previous
          </button>
          <button type="button" className="ad-pagebtn ad-pagebtn--plain">1</button>
          <button type="button" className="ad-pagebtn">
            Next
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
