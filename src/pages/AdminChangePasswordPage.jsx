import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/admin-change-password.css";

const LockIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const KeyIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const EyeIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18m-2.943-13.029A9.97 9.97 0 0121.543 12c-1.274 4.057-5.064 7-9.542 7" />
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

const SuccessIcon = () => (
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

export default function AdminChangePasswordPage() {
  const [current, setCurrent] = useState("unibSecure2025#");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [visible, setVisible] = useState({ current: false, next: false, confirm: false });
  const [attempted, setAttempted] = useState(false);
  const [success, setSuccess] = useState(false);

  const rules = [
    { label: "At least 8 characters", ok: next.length >= 8 },
    { label: "At least one number", ok: /[0-9]/.test(next) },
    { label: "At least one symbol", ok: /[^A-Za-z0-9]/.test(next) },
  ];
  const rulesOk = rules.every((r) => r.ok);
  const confirmOk = confirm.length > 0 && confirm === next;

  const errors = {
    current: current.length === 0 ? "Enter your current password." : "",
    next: rulesOk ? "" : "New password must meet all requirements below.",
    confirm: confirmOk ? "" : "Confirmation does not match the new password.",
  };
  const formOk = !errors.current && rulesOk && confirmOk;

  const toggleVisible = (key) => setVisible((v) => ({ ...v, [key]: !v[key] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formOk) {
      setAttempted(true);
      setSuccess(false);
      return;
    }
    setAttempted(false);
    setSuccess(true);
    setCurrent("");
    setNext("");
    setConfirm("");
    setVisible({ current: false, next: false, confirm: false });
  };

  const eyeButton = (key, label) => (
    <button type="button" className="cp-input__eye" aria-label={label} onClick={() => toggleVisible(key)}>
      {visible[key] ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  );

  return (
    <div className="cp-root">
      {/* Top bar */}
      <div className="cp-topbar">
        <div className="cp-topbar__brand">
          <img src="/logo-unib.png" alt="UNIB Logo" className="cp-topbar__logo" />
          <span className="cp-brandtext">
            <span className="cp-brandtext__univ">UNIVERSITAS</span>
            <br />
            <span className="cp-brandtext__name">BENGKULU</span>
          </span>
        </div>
        <span className="cp-topbar__title">ScholarCore Admin</span>
      </div>

      {/* Centered change password card */}
      <div className="cp-body">
        <div className="cp-card">
          <div className="cp-card__brand">
            <img src="/logo-unib.png" alt="UNIB Logo" className="cp-card__logo" />
            <span className="cp-card__brandtext">
              <span className="cp-brandtext__univ">UNIVERSITAS</span>
              <br />
              <span className="cp-brandtext__name">BENGKULU</span>
            </span>
          </div>

          <span className="cp-badge">
            <span className="cp-badge__dot" />
            Secure Credential Update
          </span>

          <h1 className="cp-card__title">Change Password</h1>
          <p className="cp-card__sub">
            Update your administrator password. Choose a strong password you
            haven't used on this account before.
          </p>

          {success && (
            <div className="cp-success" role="status">
              <SuccessIcon />
              Password updated successfully. You can return to your dashboard.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="cp-field">
              <div className="cp-field__labelrow">
                <label htmlFor="cp-current" className="cp-field__label">Current Password</label>
                <span className="cp-field__hint">Staff account</span>
              </div>
              <div className={`cp-input ${attempted && errors.current ? "cp-input--error" : ""}`}>
                <LockIcon />
                <input
                  id="cp-current"
                  type={visible.current ? "text" : "password"}
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  autoComplete="current-password"
                />
                {eyeButton("current", "Toggle current password visibility")}
              </div>
              {attempted && errors.current && <p className="cp-error">{errors.current}</p>}
            </div>

            <div className="cp-field">
              <div className="cp-field__labelrow">
                <label htmlFor="cp-next" className="cp-field__label">New Password</label>
                <span className="cp-field__hint">Min. 8 characters</span>
              </div>
              <div className={`cp-input ${attempted && errors.next ? "cp-input--error" : ""}`}>
                <KeyIcon />
                <input
                  id="cp-next"
                  type={visible.next ? "text" : "password"}
                  value={next}
                  onChange={(e) => setNext(e.target.value)}
                  autoComplete="new-password"
                />
                {eyeButton("next", "Toggle new password visibility")}
              </div>
              {attempted && errors.next && <p className="cp-error">{errors.next}</p>}

              <ul className="cp-rules">
                {rules.map((r) => (
                  <li key={r.label} className={`cp-rules__item ${r.ok ? "cp-rules__item--ok" : ""}`}>
                    <span className={`cp-checkbox ${r.ok ? "" : "cp-checkbox--empty"}`}>
                      {r.ok && <CheckIcon />}
                    </span>
                    {r.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="cp-field">
              <div className="cp-field__labelrow">
                <label htmlFor="cp-confirm" className="cp-field__label">Confirm New Password</label>
                <span className={`cp-field__hint ${confirmOk ? "cp-field__hint--ok" : ""}`}>
                  {confirmOk ? "Passwords match" : "Must match new password"}
                </span>
              </div>
              <div
                className={`cp-input ${attempted && errors.confirm ? "cp-input--error" : ""} ${confirmOk ? "cp-input--ok" : ""}`}
              >
                <LockIcon />
                <input
                  id="cp-confirm"
                  type={visible.confirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                />
                {eyeButton("confirm", "Toggle confirmation password visibility")}
              </div>
              {attempted && errors.confirm && <p className="cp-error">{errors.confirm}</p>}
            </div>

            <div className="cp-row">
              <Link to="/admin" className="cp-back">
                <BackIcon />
                Back to Dashboard
              </Link>
              <span className="cp-ssl">
                <ShieldIcon />
                256-bit SSL
              </span>
            </div>

            <button type="submit" className="cp-submit">
              <KeyIcon />
              Update Password
            </button>
          </form>

          <p className="cp-help">
            Need help updating your password? Contact Academic Helpdesk<br />
            <a href="mailto:support@unib.ac.id">
              (support@unib.ac.id) <ExtIcon />
            </a>
          </p>

          <div className="cp-legal">
            <span>Privacy Policy</span>
            <span className="cp-legal__dot">•</span>
            <span>Security Standards</span>
            <span className="cp-legal__dot">•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="cp-footer">
        <p className="cp-footer__left">
          <strong>Academic Research Portal</strong> &nbsp;•&nbsp; Repository Governance &amp; Institutional Intelligence
        </p>
        <p className="cp-footer__right">© 2026 Office of Research Affairs. All institutional rights reserved.</p>
      </div>
    </div>
  );
}
