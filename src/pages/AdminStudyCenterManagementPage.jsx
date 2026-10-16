import React, { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import StudyCenterUnitCard from "../components/admin/StudyCenterUnitCard";
import StudyCenterFormModal from "../components/admin/StudyCenterFormModal";
import StudyCenterConfirmModal from "../components/admin/StudyCenterConfirmModal";
import {
  adminStudyCenters,
  SC_ADMIN_TOTAL,
  SC_ADMIN_PAGES,
} from "../data/adminStudyCenterData";
import { adminUser } from "../data/adminData";
import "../styles/pages/admin-dashboard.css";
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

const ChevronLeft = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function AdminStudyCenterManagementPage() {
  // null | "add" | { mode: "edit", unit }
  const [modal, setModal] = useState(null);
  // null | { type: "save" } | { type: "delete", unit }
  const [confirm, setConfirm] = useState(null);
  const [units, setUnits] = useState(adminStudyCenters);
  const [page, setPage] = useState(1);

  const openAdd = () => setModal("add");
  const openEdit = unit => setModal({ mode: "edit", unit });
  const closeModal = () => setModal(null);

  const removedCount = adminStudyCenters.length - units.length;
  const shownTotal = SC_ADMIN_TOTAL - removedCount;

  const requestSave = () => setConfirm({ type: "save" });
  const requestDelete = unit => setConfirm({ type: "delete", unit });

  const handleConfirm = () => {
    if (confirm?.type === "delete") {
      setUnits(prev => prev.filter(u => u.id !== confirm.unit.id));
    }
    setConfirm(null);
    setModal(null);
  };

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
                <input type="text" placeholder="Search study center..." />
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
                <h1 className="ad-head__title">Study Center Management</h1>
                <p className="ad-head__sub">
                  Manage academic faculties, research groups, and university study centers.
                </p>
              </div>
              <button type="button" className="asc-addnew" onClick={openAdd}>
                <PlusIcon />
                Add New Unit
              </button>
            </div>

            {/* Count + export bar */}
            <div className="asc-countbar">
              <p className="asc-countbar__text">
                Showing <strong>{units.length}</strong> of <strong>{shownTotal}</strong> Study Center
              </p>
              <button type="button" className="asc-export">
                <DownloadIcon />
                Export CSV
              </button>
            </div>

            {/* Unit grid */}
            <div className="asc-grid">
              {units.map(unit => (
                <StudyCenterUnitCard
                  key={unit.id}
                  unit={unit}
                  onEdit={() => openEdit(unit)}
                  onDelete={() => requestDelete(unit)}
                />
              ))}
            </div>

            {/* Pagination footer */}
            <div className="asc-pager">
              <p className="asc-pager__info">Showing 1 to {units.length} of {shownTotal} results</p>
              <div className="asc-pager__nav">
                <button
                  type="button"
                  className="asc-pagebtn asc-pagebtn--plain"
                  disabled={page === 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                >
                  <ChevronLeft />
                  Previous
                </button>
                {SC_ADMIN_PAGES.map(n => (
                  <button
                    key={n}
                    type="button"
                    className={`asc-pagebtn${n === page ? " asc-pagebtn--active" : ""}`}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  className="asc-pagebtn asc-pagebtn--plain"
                  disabled={page === SC_ADMIN_PAGES.length}
                  onClick={() => setPage(p => Math.min(SC_ADMIN_PAGES.length, p + 1))}
                >
                  Next
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal === "add" && <StudyCenterFormModal mode="add" onClose={closeModal} />}
      {modal && modal !== "add" && (
        <StudyCenterFormModal
          mode="edit"
          unit={modal.unit}
          onClose={closeModal}
          onSave={requestSave}
          suspendEscape={confirm !== null}
        />
      )}

      {confirm?.type === "save" && (
        <StudyCenterConfirmModal
          tone="save"
          title="Save Changes?"
          message="You are about to save the changes made to this study center unit. This action will update the unit profile across the repository."
          confirmLabel="Yes, Save Changes"
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      {confirm?.type === "delete" && (
        <StudyCenterConfirmModal
          tone="delete"
          title="Delete Study Center?"
          message={`You are about to permanently remove "${confirm.unit.title}". All members, publications, and projects linked to this unit will be unassigned.`}
          confirmLabel="Yes, Delete Unit"
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}
