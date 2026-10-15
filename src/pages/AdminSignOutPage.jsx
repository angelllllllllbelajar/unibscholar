import React, { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/adminAuthContext";
import { adminUser } from "../data/adminData";
import "../styles/pages/admin-sign-out.css";

const HONORIFICS = ["Dr.", "Prof.", "Ir.", "Ph.D.", "M.Sc.", "M.Kom.", "S.Kom."];

const initials = adminUser.name
  .split(" ")
  .filter((word) => !HONORIFICS.includes(word))
  .slice(0, 2)
  .map((word) => word[0])
  .join("")
  .toUpperCase();

const SignOutIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BackIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const ExtIcon = () => (
  <svg className="inline w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default function AdminSignOutPage() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Batch both updates in one transition so RequireAdmin never renders
    // its login redirect between the logout and the navigation.
    startTransition(() => {
      logout();
      navigate("/");
    });
  };

  return (
    <div className="so-root">
      {/* Top bar */}
      <div className="so-topbar">
        <div className="so-topbar__brand">
          <img src="/logo-unib.png" alt="UNIB Logo" className="so-topbar__logo" />
          <span className="so-brandtext">
            <span className="so-brandtext__univ">UNIVERSITAS</span>
            <br />
            <span className="so-brandtext__name">BENGKULU</span>
          </span>
        </div>
        <span className="so-topbar__title">ScholarCore Admin</span>
      </div>

      {/* Centered sign out confirmation card */}
      <div className="so-body">
        <div className="so-card">
          <div className="so-card__brand">
            <img src="/logo-unib.png" alt="UNIB Logo" className="so-card__logo" />
            <span className="so-card__brandtext">
              <span className="so-brandtext__univ">UNIVERSITAS</span>
              <br />
              <span className="so-brandtext__name">BENGKULU</span>
            </span>
          </div>

          <span className="so-badge">
            <SignOutIcon />
            Session Termination
          </span>

          <h1 className="so-card__title">Sign Out Confirmation</h1>
          <p className="so-card__sub">
            Are you sure you want to sign out from your administrative session?
            You will need your credentials to log back in.
          </p>

          <div className="so-session">
            <div className="so-session__row">
              <span className="so-avatar">{initials}</span>
              <div className="so-session__who">
                <p className="so-session__name">{adminUser.name}</p>
                <p className="so-session__role">{adminUser.title}</p>
              </div>
              <span className="so-session__pill">{adminUser.role}</span>
            </div>

            <div className="so-sync">
              <CheckCircleIcon />
              All recent project updates and reviewer scores have been safely
              synced.
            </div>
          </div>

          <button type="button" className="so-confirm" onClick={handleConfirm}>
            <SignOutIcon />
            Confirm &amp; Log Out
          </button>

          <button type="button" className="so-cancel" onClick={() => navigate("/admin")}>
            <BackIcon />
            Cancel &amp; Return to Dashboard
          </button>

          <div className="so-divider" />

          <p className="so-help">
            Need help signing out? Contact Academic Helpdesk<br />
            <a href="mailto:support@unib.ac.id">
              (support@unib.ac.id) <ExtIcon />
            </a>
          </p>

          <div className="so-legal">
            <span>Privacy Policy</span>
            <span className="so-legal__dot">•</span>
            <span>Security Standards</span>
            <span className="so-legal__dot">•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="so-footer">
        <p className="so-footer__left">
          <strong>Academic Research Portal</strong> &nbsp;•&nbsp; Repository Governance &amp; Institutional Intelligence
        </p>
        <p className="so-footer__right">© 2026 Office of Research Affairs. All institutional rights reserved.</p>
      </div>
    </div>
  );
}
