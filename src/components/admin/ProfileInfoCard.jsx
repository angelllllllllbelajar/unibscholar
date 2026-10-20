import React from "react";
import { editingResearcher, profileFields, externalIds, facultyOptions } from "../../data/adminResearcherData";

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

const ChevronDown = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function ProfileInfoCard({ ask }) {
  const requestUploadPhoto = () =>
    ask({
      tone: "save",
      title: "Upload Profile Photo?",
      message: "You are about to upload a new profile photo (JPG/PNG, max 2MB). The current photo will be replaced.",
      confirmLabel: "Yes, Upload",
    });

  const requestRemovePhoto = () =>
    ask({
      tone: "delete",
      title: "Remove Profile Photo?",
      message: "You are about to remove the current profile photo. The profile will fall back to the default placeholder.",
      confirmLabel: "Yes, Remove",
    });

  const requestSaveProfile = () =>
    ask({
      tone: "save",
      title: "Save Profile Information?",
      message: `You are about to save the personal & academic information for ${editingResearcher.name}. This action will update the profile across the repository.`,
      confirmLabel: "Yes, Save",
    });

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
              <button type="button" className="ar-photo__upload" onClick={requestUploadPhoto}>Upload Photo</button>
              <span className="ar-photo__dot">•</span>
              <button type="button" className="ar-photo__remove" onClick={requestRemovePhoto}>Remove</button>
            </p>
            <p className="ar-photo__hint">JPG, PNG max 2MB</p>
          </div>
        </div>

        {profileFields.map((f) => (
          <div key={f.label} className="ar-field">
            <label className="ar-field__label">{f.label}</label>
            {f.select ? (
              <div className="ar-selectwrap">
                <select defaultValue={f.value} className="ar-input ar-select">
                  {facultyOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <span className="ar-selectwrap__chev"><ChevronDown /></span>
              </div>
            ) : (
              <input
                type="text"
                defaultValue={f.value}
                className={`ar-input ${f.mono ? "ar-input--mono" : ""}`}
              />
            )}
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

        <button type="button" className="ar-saveprofile" onClick={requestSaveProfile}>
          <CheckIcon />
          Save Profile Information
        </button>
      </div>
    </section>
  );
}
