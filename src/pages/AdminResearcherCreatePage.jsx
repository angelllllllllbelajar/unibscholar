import React from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import ResearcherCreateForm from "../components/admin/ResearcherCreateForm";
import { adminUser } from "../data/adminData";
import "../styles/pages/admin-dashboard.css";
import "../styles/pages/admin-researcher.css";

const SearchIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ChevronDown = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SaveIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

export default function AdminResearcherCreatePage() {
  const navigate = useNavigate();
  const goBack = () => navigate("/admin/researchers");

  return (
    <div className="ad-root">
      <div className="ad-shell">
        <AdminSidebar />

        <div className="ad-main">
          {/* Top bar */}
          <div className="ad-topbar">
            <div className="ad-topbar__search">
              <div className="ad-searchfield">
                <SearchIcon />
                <input type="text" placeholder="Search researchers..." />
              </div>
              <button type="button" className="ad-searchbtn">Search</button>
            </div>

            <div className="ad-topbar__user">
              <img src={adminUser.photo} alt={adminUser.name} />
              <div className="ad-topbar__meta">
                <p className="ad-topbar__name">{adminUser.name}</p>
                <p className="ad-topbar__role">{adminUser.role}</p>
              </div>
              <span className="ad-topbar__chev"><ChevronDown /></span>
            </div>
          </div>

          {/* Content */}
          <div className="ad-content">
            <div className="ad-head">
              <div>
                <h1 className="ad-head__title">Add New Researcher</h1>
                <p className="ad-head__sub">
                  Create a new faculty member profile with affiliations and external scholarly IDs.
                </p>
              </div>
              <button type="button" className="ar-back" onClick={goBack}>
                <ArrowLeftIcon />
                Back to Management
              </button>
            </div>

            <ResearcherCreateForm />

            {/* Save bar */}
            <div className="ar-savebar">
              <p className="ar-savebar__note">
                <span className="ar-savebar__check"><CheckCircleIcon /></span>
                New researcher will be created in a pending-verification state.
              </p>
              <div className="ar-savebar__actions">
                <button type="button" className="ar-cancel" onClick={goBack}>Cancel</button>
                <button type="button" className="ar-saveall" onClick={goBack}>
                  <SaveIcon />
                  Create Researcher
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
