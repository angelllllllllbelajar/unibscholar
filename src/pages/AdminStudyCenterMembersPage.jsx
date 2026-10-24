import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import ConfirmDialog from "../components/admin/ConfirmDialog";
import MemberPickerModal from "../components/admin/MemberPickerModal";
import { adminStudyCenters, scUnitMembers } from "../data/adminStudyCenterData";
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

const ArrowLeftIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
  </svg>
);

const PeopleIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6-4a3 3 0 11-3-3" />
  </svg>
);

const PlusIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

export default function AdminStudyCenterMembersPage() {
  const navigate = useNavigate();
  const { unitId } = useParams();
  const unit = adminStudyCenters.find((u) => u.id === Number(unitId));

  const [members, setMembers] = useState(scUnitMembers);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const ask = (cfg) => setConfirm(cfg);
  const goBack = () => navigate("/admin/study-center");

  const updateMember = (id, patch) =>
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const requestRemove = (member) =>
    ask({
      tone: "delete",
      title: "Remove Member?",
      message: `You are about to remove "${member.name}" from ${unit?.title ?? "this study center"}. Their publications and projects will need reassignment.`,
      confirmLabel: "Yes, Remove",
      onConfirm: () => setMembers((prev) => prev.filter((m) => m.id !== member.id)),
    });

  const handleAssign = (member) =>
    setMembers((prev) => [...prev, member]);

  const requestSave = () =>
    ask({
      tone: "save",
      title: "Save Member Changes?",
      message: `You are about to save the member list of ${unit?.title ?? "this study center"}. This action will update the unit membership across the repository.`,
      confirmLabel: "Yes, Save Changes",
    });

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
                <input type="text" placeholder="Search members..." />
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
                <h1 className="ad-head__title">Manage Members</h1>
                <p className="ad-head__sub">
                  {unit ? unit.title : "Study center unit not found."}
                </p>
              </div>
              <button type="button" className="ar-back" onClick={goBack}>
                <ArrowLeftIcon />
                Back to Management
              </button>
            </div>

            <section className="ar-card">
              <header className="ar-card__head">
                <span className="ar-card__icon"><PeopleIcon /></span>
                <h2 className="ar-card__title">
                  Unit Members ({members.length})
                </h2>
              </header>

              <div className="ar-card__body">
                <div className="ascm-list">
                  {members.map((m, i) => (
                    <div key={m.id} className="ascm-row">
                      <span className="ascm-row__index">{i + 1}</span>
                      <span className="ascm-name">{m.name}</span>
                      <input
                        type="text"
                        className="scm-input ascm-row__role"
                        value={m.role}
                        placeholder="Role / rank in this study center..."
                        aria-label="Member role"
                        onChange={(e) => updateMember(m.id, { role: e.target.value })}
                      />
                      <button
                        type="button"
                        className="ascm-remove"
                        aria-label={`Remove ${m.name}`}
                        onClick={() => requestRemove(m)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="ascm-addrow">
                  <p className="ascm-addrow__hint">
                    Pick a researcher from the directory. Only their role / rank in this study center is entered manually.
                  </p>
                  <button type="button" className="ascm-addbtn" onClick={() => setPickerOpen(true)}>
                    <PlusIcon />
                    Add Member
                  </button>
                </div>
              </div>
            </section>

            {/* Save bar */}
            <div className="ar-savebar">
              <p className="ar-savebar__note">
                <span className="ar-savebar__check"><CheckCircleIcon /></span>
                Member changes are staged locally until saved.
              </p>
              <div className="ar-savebar__actions">
                <button type="button" className="ar-saveall" onClick={requestSave}>
                  <SaveIcon />
                  Save Member Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {pickerOpen && (
        <MemberPickerModal
          existingNames={members.map((m) => m.name)}
          onAssign={handleAssign}
          onClose={() => setPickerOpen(false)}
          suspendEscape={confirm !== null}
        />
      )}

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
