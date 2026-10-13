import React from "react";
import { editingResearcher, profileFields, externalIds } from "../../data/adminResearcherData";

const UserIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CheckIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function ProfileInfoCard() {
  return (
    <section className="ar-card">
      <header className="ar-card__head">
        <span className="ar-card__icon"><UserIcon /></span>
        <h2 className="ar-card__title">Personal &amp; Academic Info</h2>
      </header>

      <div className="ar-card__body">
        <div className="ar-photo">
          <img src={editingResearcher.photo} alt={editingResearcher.name} className="ar-photo__img" />
          <div>
            <p className="ar-photo__label">Profile Photo</p>
            <p className="ar-photo__links">
              <button type="button" className="ar-photo__upload">Upload Photo</button>
              <span className="ar-photo__dot">•</span>
              <button type="button" className="ar-photo__remove">Remove</button>
            </p>
            <p className="ar-photo__hint">JPG, PNG max 2MB</p>
          </div>
        </div>

        {profileFields.map((f) => (
          <div key={f.label} className="ar-field">
            <label className="ar-field__label">{f.label}</label>
            <input
              type="text"
              defaultValue={f.value}
              className={`ar-input ${f.mono ? "ar-input--mono" : ""}`}
            />
          </div>
        ))}

        <hr className="ar-divider" />

        <p className="ar-sublabel">External Academic IDs</p>

        {externalIds.map((f) => (
          <div key={f.label} className="ar-field">
            <label className="ar-field__label">{f.label}</label>
            <input type="text" defaultValue={f.value} className="ar-input ar-input--mono" />
          </div>
        ))}

        <button type="button" className="ar-saveprofile">
          <CheckIcon />
          Save Profile Information
        </button>
      </div>
    </section>
  );
}
