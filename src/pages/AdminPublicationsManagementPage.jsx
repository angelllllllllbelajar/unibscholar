import React, { useMemo, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import ApprovalDashboard from "../components/admin/ApprovalDashboard";
import PublicationFormModal from "../components/admin/PublicationFormModal";
import ConfirmDialog from "../components/admin/ConfirmDialog";
import { useAdminAuth } from "../context/adminAuthContext";
import { useAdminData } from "../context/adminDataContext";
import {
  ADMIN_PUB_TOTAL,
  SDG_LABELS,
  SDG_STYLES,
} from "../data/adminPublicationsData";
import "../styles/pages/admin-dashboard.css";
import "../styles/pages/admin-publications.css";

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

const UploadIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V4m0 0l-4 4m4-4l4 4" />
  </svg>
);

const PlusIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const PencilIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const TrashIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const SDG_STYLE_FALLBACK = { bg: "#e2e8f0", border: "#cbd5e1", text: "#334155", dot: "#64748b" };

export default function AdminPublicationsManagementPage() {
  const { isOperator, isAdmin, user } = useAdminAuth();
  const { records, submit } = useAdminData();
  const rows = records.publications;

  const [query, setQuery] = useState("");
  const [year, setYear] = useState("All");
  const [faculty, setFaculty] = useState("All");
  const [status, setStatus] = useState("All");
  const [checked, setChecked] = useState({});
  const [formModal, setFormModal] = useState(null);
  // null | { type: "save", form } | { type: "delete", row }
  const [confirm, setConfirm] = useState(null);

  const filtersActive =
    query.trim() !== "" || year !== "All" || faculty !== "All" || status !== "All";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (q) {
        const haystack = [row.title, row.author, row.doi].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (year !== "All" && row.year !== Number(year)) return false;
      if (faculty !== "All" && row.faculty !== faculty) return false;
      if (status !== "All" && row.status !== status) return false;
      return true;
    });
  }, [rows, query, year, faculty, status]);

  const yearOptions = useMemo(
    () => [...new Set(rows.map((row) => row.year))].sort((a, b) => b - a),
    [rows]
  );
  const facultyOptions = useMemo(() => [...new Set(rows.map((row) => row.faculty))], [rows]);

  const displayTotal = filtersActive ? filtered.length : ADMIN_PUB_TOTAL;

  const allChecked = filtered.length > 0 && filtered.every((row) => checked[row.id]);

  const toggleAll = () => {
    setChecked((prev) => {
      const next = { ...prev };
      if (allChecked) filtered.forEach((row) => { delete next[row.id]; });
      else filtered.forEach((row) => { next[row.id] = true; });
      return next;
    });
  };

  const toggleRow = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const resetFilters = () => {
    setQuery("");
    setYear("All");
    setFaculty("All");
    setStatus("All");
  };

  const requestDelete = (row) => setConfirm({ type: "delete", row });
  const requestSave = (form) => setConfirm({ type: "save", form });

  const buildPayload = (form) => ({
    title: form.title,
    doi: form.doi,
    author: form.authors,
    year: Number(form.year) || 2026,
    journal: form.journal,
    faculty: form.faculty,
    type: form.type,
    topics: form.topics,
    volume: form.volume,
    pages: form.pages,
    sdgs: form.sdgs,
    status: form.status === "Verified" ? "Verified" : "Pending",
  });

  const handleConfirm = () => {
    if (confirm?.type === "save") {
      const payload = buildPayload(confirm.form);
      const isEdit = formModal?.mode === "edit";
      submit("publications", isEdit ? "edit" : "add", {
        targetId: isEdit ? formModal.id : null,
        payload: isEdit ? payload : { nidn: "—", ...payload },
        label: payload.title,
        by: user?.name,
      });
      setFormModal(null);
    }
    if (confirm?.type === "delete") {
      submit("publications", "delete", {
        targetId: confirm.row.id,
        label: confirm.row.title,
        by: user?.name,
      });
    }
    setConfirm(null);
  };

  if (isAdmin) {
    return (
      <ApprovalDashboard
        entity="publications"
        title="Publications Dashboard"
        tableTitle="Pending Publications for Approval"
        searchPlaceholder="Search publications, authors, or operator..."
      />
    );
  }

  return (
    <div className="ad-root">
      <div className="ad-shell">
        <AdminSidebar />

        <div className="ad-main">
          <AdminTopbar />

          {/* Content */}
          <div className="ad-content">
            <div className="ad-head">
              <div>
                <h1 className="ad-head__title">Publications Management</h1>
                <p className="ad-head__sub">
                  Manage, edit, verify, or auto-import scholarly papers and articles.
                </p>
              </div>
              <div className="ap-headactions">
                <button type="button" className="ad-export">
                  <UploadIcon />
                  Export List (CSV)
                </button>
                <button type="button" className="ad-export">
                  <DownloadIcon />
                  Import List (CSV)
                </button>
                {isOperator && (
                  <button
                    type="button"
                    className="ap-add"
                    onClick={() => setFormModal({ mode: "add" })}
                  >
                    <PlusIcon />
                    Add Publication
                  </button>
                )}
              </div>
            </div>

            {isOperator && (
              <p className="ap-rolenote">
                Operator mode: additions, edits, and deletions are queued for Admin approval.
              </p>
            )}

            {/* Filter card */}
            <div className="ap-filtercard">
              <div className="ap-filterrow">
                <div className="ap-searchfield">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search by title, author name, or DOI..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                <span className="ap-selectwrap">
                  <select
                    className="ap-select"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    aria-label="Filter by year"
                  >
                    <option value="All">Filter by Year (All)</option>
                    {yearOptions.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <ChevronDown />
                </span>

                <span className="ap-selectwrap">
                  <select
                    className="ap-select"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    aria-label="Filter by faculty"
                  >
                    <option value="All">Filter by Faculty (All)</option>
                    {facultyOptions.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                  <ChevronDown />
                </span>

                <span className="ap-selectwrap">
                  <select
                    className="ap-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    aria-label="Filter by status"
                  >
                    <option value="All">Filter by Status (All)</option>
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <ChevronDown />
                </span>
              </div>

              <div className="ap-filterfoot">
                <button type="button" className="ap-reset" onClick={resetFilters}>
                  Reset filters
                </button>
              </div>
            </div>

            {/* Table card */}
            <div className="ad-tablecard">
              <div className="ad-tablewrap">
                <table className="ap-table">
                  <thead>
                    <tr>
                      <th className="ap-checkcol">
                        <input
                          type="checkbox"
                          className="ap-check"
                          checked={allChecked}
                          onChange={toggleAll}
                          aria-label="Select all publications"
                        />
                      </th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Year</th>
                      <th>Journal / Venue</th>
                      <th>SDGs</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row) => (
                      <tr key={row.id}>
                        <td className="ap-checkcol">
                          <input
                            type="checkbox"
                            className="ap-check"
                            checked={!!checked[row.id]}
                            onChange={() => toggleRow(row.id)}
                            aria-label={`Select ${row.title}`}
                          />
                        </td>
                        <td>
                          <p className="ap-title">{row.title}</p>
                          <p className="ap-doi">DOI: {row.doi}</p>
                        </td>
                        <td>
                          <p className="ap-author">{row.author}</p>
                          <p className="ap-nidn">NIDN: {row.nidn}</p>
                        </td>
                        <td>
                          <span className="ap-year">{row.year}</span>
                        </td>
                        <td>
                          <p className="ap-journal">{row.journal}</p>
                        </td>
                        <td>
                          <div className="ap-sdgs">
                            {row.sdgs.map((goal) => {
                              const style = SDG_STYLES[goal] ?? SDG_STYLE_FALLBACK;
                              return (
                                <span
                                  key={goal}
                                  className="ap-sdg"
                                  style={{ background: style.bg, borderColor: style.border, color: style.text }}
                                >
                                  <span className="ap-sdg__dot" style={{ background: style.dot }} />
                                  {SDG_LABELS[goal] ?? `SDG ${goal}`}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td>
                          <span className={`ap-status ap-status--${row.status.toLowerCase()}`}>
                            <span className="ap-status__dot" />
                            {row.status}
                          </span>
                        </td>
                        <td>
                          {isOperator ? (
                            <div className="ap-rowactions">
                              <button
                                type="button"
                                className="ap-iconbtn"
                                title="Edit publication"
                                onClick={() => setFormModal({ mode: "edit", id: row.id })}
                              >
                                <PencilIcon />
                              </button>
                              <button
                                type="button"
                                className="ap-iconbtn ap-iconbtn--danger"
                                title="Delete publication"
                                onClick={() => requestDelete(row)}
                              >
                                <TrashIcon />
                              </button>
                            </div>
                          ) : (
                            <span className="ap-readonly">Admin (review only)</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={8}>
                          <p className="ap-empty">
                            No publications match the current filters.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer card */}
            <div className="ap-footcard">
              <div className="ad-tablefoot">
                <p className="ad-tablefoot__info">
                  Showing <strong>1</strong> to <strong>{filtered.length}</strong> of{" "}
                  <strong>{displayTotal.toLocaleString()}</strong> results
                </p>
                <div className="ad-tablefoot__nav">
                  <button type="button" className="ad-pagebtn" disabled>
                    Previous
                  </button>
                  <button type="button" className="ad-pagebtn ap-pagebtn--active">1</button>
                  <button type="button" className="ad-pagebtn ad-pagebtn--plain">2</button>
                  <button type="button" className="ad-pagebtn ad-pagebtn--plain">3</button>
                  <span className="ap-ellipsis">…</span>
                  <button type="button" className="ad-pagebtn">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {formModal && (
        <PublicationFormModal
          mode={formModal.mode}
          publication={rows.find((row) => row.id === formModal.id) ?? null}
          onClose={() => setFormModal(null)}
          onSave={requestSave}
          suspendEscape={confirm !== null}
        />
      )}

      {confirm?.type === "save" && (
        <ConfirmDialog
          tone="save"
          title="Submit for Approval?"
          message="This change will be queued and sent to the Admin for approval. It will not appear in the repository until approved."
          confirmLabel="Yes, Submit to Admin"
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      {confirm?.type === "delete" && (
        <ConfirmDialog
          tone="delete"
          title="Request Deletion?"
          message={`You are requesting to remove "${confirm.row.title}". The Admin must approve this deletion before it is applied.`}
          confirmLabel="Yes, Request Deletion"
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}
