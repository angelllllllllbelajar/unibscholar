import React, { useEffect } from "react";

const SaveIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const TrashIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CloseIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function StudyCenterConfirmModal({
  tone = "save",
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}) {
  const isDelete = tone === "delete";

  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div className="scc-backdrop" onClick={onCancel}>
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        className="scc-dialog"
        onClick={e => e.stopPropagation()}
      >
        <div className="scc-accent" />

        <div className="scc-header">
          <span className={`scc-header__icon ${isDelete ? "scc-header__icon--red" : "scc-header__icon--amber"}`}>
            {isDelete ? <TrashIcon /> : <SaveIcon />}
          </span>
          <h2 className="scc-header__title">{title}</h2>
          <button type="button" className="scc-close" aria-label="Close" onClick={onCancel}>
            <CloseIcon />
          </button>
        </div>

        <p className="scc-message">{message}</p>

        <div className="scc-footer">
          <button type="button" className="scc-cancel" onClick={onCancel}>Cancel</button>
          <button
            type="button"
            className={`scc-confirm ${isDelete ? "scc-confirm--red" : ""}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
