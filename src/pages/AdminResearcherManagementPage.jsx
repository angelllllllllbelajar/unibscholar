import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import ProfileInfoCard from "../components/admin/ProfileInfoCard";
import ResearchTopicsCard from "../components/admin/ResearchTopicsCard";
import SdgAlignmentCard from "../components/admin/SdgAlignmentCard";
import AssignedPublicationsCard from "../components/admin/AssignedPublicationsCard";
import ConfirmDialog from "../components/admin/ConfirmDialog";
import { editingResearcher } from "../data/adminResearcherData";
import { adminUser } from "../data/adminData";
import "../styles/pages/admin-dashboard.css";
import "../styles/pages/admin-researcher.css";
import "../styles/pages/admin-study-center.css";

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

const UploadIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
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

const TrashIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export default function AdminResearcherManagementPage() {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(null);
  const [query, setQuery] = useState("");

  const ask = (cfg) => setConfirm(cfg);

  const requestCreate = () => navigate("/admin/researchers/new");

  const requestSaveAll = () =>
    ask({
      tone: "save",
      title: "Save All Changes?",
      message: `You are about to save all staged changes for ${editingResearcher.name}. This action will update the researcher profile across the repository.`,
      confirmLabel: "Yes, Save Changes",
    });

  const requestDeleteResearcher = () =>
    ask({
      tone: "delete",
      title: "Delete Researcher?",
      message: `You are about to permanently delete ${editingResearcher.name} (ID: ${editingResearcher.id}). All publications, projects, and topic links will be removed.`,
      confirmLabel: "Yes, Delete Researcher",
    });

  return (
    <div className="ad-root">
      <div className="ad-shell">
        <AdminSidebar />

        <div className="ad-main">
          {/* Top bar */}
          <div className="ad-topbar">
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
                  <UploadIcon />
                  Export List (CSV)
                </button>
                <button type="button" className="ad-export">
                  <DownloadIcon />
                  Import List (CSV)
                </button>
                <button type="button" className="ar-addnew" onClick={requestCreate}>
                  <PlusIcon />
                  Add New Researcher
                </button>
              </div>
            </div>

            {/* Currently-editing bar */}
            <div className="ar-editbar">
              <p className="ar-editbar__text">
                Currently Editing: <strong>{editingResearcher.name}</strong>
              </p>
              <span className="ar-editbar__id">(ID: {editingResearcher.id})</span>
              <div className="ar-editbar__search">
                <div className="ad-searchfield">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search researchers"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <button type="button" className="ad-searchbtn">Search</button>
              </div>
            </div>

            {/* Two-column editor */}
            <div className="ar-grid">
              <ProfileInfoCard ask={ask} />

              <div className="ar-col">
                <ResearchTopicsCard ask={ask} />
                <SdgAlignmentCard ask={ask} />
                <AssignedPublicationsCard ask={ask} query={query} />
              </div>
            </div>

            {/* Sticky save bar */}
            <div className="ar-savebar">
              <p className="ar-savebar__note">
                <span className="ar-savebar__check"><CheckCircleIcon /></span>
                Changes are staged locally until saved.
              </p>
              <div className="ar-savebar__actions">
                <button type="button" className="ar-delete" onClick={requestDeleteResearcher}>
                  <TrashIcon />
                  Delete Researcher
                </button>
                <button type="button" className="ar-saveall" onClick={requestSaveAll}>
                  <SaveIcon />
                  Save All Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {confirm && (
        <ConfirmDialog
          tone={confirm.tone}
          title={confirm.title}
          message={confirm.message}
          confirmLabel={confirm.confirmLabel}
          onConfirm={() => {
            confirm.onConfirm?.();
            setConfirm(null);
          }}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}
