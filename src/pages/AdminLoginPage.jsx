import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/adminAuthContext";
import "../styles/pages/admin-login.css";

const PersonIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LockIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="al-input__eye" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const ShieldIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const LoginIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const ExtIcon = () => (
  <svg className="inline w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default function AdminLoginPage() {
  const { isAdmin, login } = useAdminAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("G1A024045");
  const [password, setPassword] = useState("unibSecure2025#");
  const [remember, setRemember] = useState(true);

  if (isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate("/admin");
  };

  return (
    <div className="al-root">
      {/* Top bar */}
      <div className="al-topbar">
        <div className="al-topbar__brand">
          <img src="/logo-unib.png" alt="UNIB Logo" className="al-topbar__logo" />
          <span className="al-brandtext">
            <span className="al-brandtext__univ">UNIVERSITAS</span>
            <br />
            <span className="al-brandtext__name">BENGKULU</span>
          </span>
        </div>
        <span className="al-topbar__title">ScholarCore Admin</span>
      </div>

      {/* Centered login card */}
      <div className="al-body">
        <div className="al-card">
          <div className="al-card__brand">
            <img src="/logo-unib.png" alt="UNIB Logo" className="al-card__logo" />
            <span className="al-card__brandtext">
              <span className="al-brandtext__univ">UNIVERSITAS</span>
              <br />
              <span className="al-brandtext__name">BENGKULU</span>
            </span>
          </div>

          <span className="al-gateway">
            <span className="al-gateway__dot" />
            Secure Administrative Gateway
          </span>

          <h1 className="al-card__title">UNIB Scholar Portal</h1>
          <p className="al-card__sub">
            Enter your Username and Password to access administrative services.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="al-field">
              <div className="al-field__labelrow">
                <label htmlFor="al-username" className="al-field__label">Username</label>
                <span className="al-field__hint">Staff ID</span>
              </div>
              <div className="al-input">
                <PersonIcon />
                <input
                  id="al-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="al-field">
              <div className="al-field__labelrow">
                <label htmlFor="al-password" className="al-field__label">Password</label>
                <button type="button" className="al-field__hint al-field__hint--link">
                  Forgot Password?
                </button>
              </div>
              <div className="al-input">
                <LockIcon />
                <input
                  id="al-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <EyeIcon />
              </div>
            </div>

            <div className="al-row">
              <label className="al-remember" htmlFor="al-remember">
                <span
                  id="al-remember"
                  role="checkbox"
                  aria-checked={remember}
                  tabIndex={0}
                  onClick={() => setRemember((v) => !v)}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      setRemember((v) => !v);
                    }
                  }}
                  className={`al-checkbox ${remember ? "" : "al-checkbox--empty"}`}
                >
                  {remember && <CheckIcon />}
                </span>
                Keep me signed in
              </label>
              <span className="al-ssl">
                <ShieldIcon />
                256-bit SSL
              </span>
            </div>

            <button type="submit" className="al-submit">
              <LoginIcon />
              Sign In
            </button>
          </form>

          <p className="al-help">
            Need help signing in? Contact Academic Helpdesk<br />
            <a href="mailto:support@unib.ac.id">
              (support@unib.ac.id) <ExtIcon />
            </a>
          </p>

          <div className="al-legal">
            <span>Privacy Policy</span>
            <span className="al-legal__dot">•</span>
            <span>Security Standards</span>
            <span className="al-legal__dot">•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="al-footer">
        <p className="al-footer__left">
          <strong>Academic Research Portal</strong> &nbsp;•&nbsp; Repository Governance &amp; Institutional Intelligence
        </p>
        <p className="al-footer__right">© 2026 Office of Research Affairs. All institutional rights reserved.</p>
      </div>
    </div>
  );
}
