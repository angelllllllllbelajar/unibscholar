import React from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import ProfileInfoCard from "../components/admin/ProfileInfoCard";
import ResearchTopicsCard from "../components/admin/ResearchTopicsCard";
import SdgAlignmentCard from "../components/admin/SdgAlignmentCard";
import AssignedPublicationsCard from "../components/admin/AssignedPublicationsCard";
import { editingResearcher } from "../data/adminResearcherData";
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

const DownloadIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const PlusIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
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

export default function AdminResearcherManagementPage() {
  const navigate = useNavigate();

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
              <span className="ad-topbar__chev">
                <ChevronDown />
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="ad-content">
            <div className="ad-head">
              <div>
                <h1 className="ad-head__title">Researcher Profile Management</h1>
                <p className="ad-head__sub">
                  Create, update, and manage faculty member profiles, affiliations, and external scholarly IDs.
                </p>
              </div>
              <div className="ar-headactions">
                <button type="button" className="ad-export">
                  <DownloadIcon />
                  Export List (CSV)
                </button>
                <button type="button" className="ar-addnew" onClick={() => navigate("/admin/researchers/new")}>
                  <PlusIcon />
                  Add New Researcher
                </button>
              </div>
            </div>

            {/* Currently-editing bar */}
            <div className="ar-editbar">
              <span className="ar-editbar__avatar">{editingResearcher.initials}</span>
              <p className="ar-editbar__text">
                Currently Editing: <strong>{editingResearcher.name}</strong>
              </p>
              <span className="ar-editbar__id">(ID: {editingResearcher.id})</span>

              <div className="ar-editbar__right">
                <div className="ar-editbar__search">
                  <SearchIcon />
                  <input type="text" placeholder="Search name..." />
                </div>
                <button type="button" className="ar-changebtn">
                  Change Researcher
                  <ChevronDown />
                </button>
              </div>
            </div>

            {/* Two-column editor */}
            <div className="ar-grid">
              <ProfileInfoCard />

              <div className="ar-col">
                <ResearchTopicsCard />
                <SdgAlignmentCard />
                <AssignedPublicationsCard />
              </div>
            </div>

            {/* Sticky save bar */}
            <div className="ar-savebar">
              <p className="ar-savebar__note">
                <span className="ar-savebar__check"><CheckCircleIcon /></span>
                Changes are staged locally until saved.
              </p>
              <div className="ar-savebar__actions">
                <button type="button" className="ar-cancel">Cancel</button>
                <button type="button" className="ar-saveall">
                  <SaveIcon />
                  Save All Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
