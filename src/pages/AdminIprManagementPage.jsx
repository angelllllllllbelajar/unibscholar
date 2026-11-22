import React, { useMemo, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import ApprovalDashboard from "../components/admin/ApprovalDashboard";
import IprFormModal from "../components/admin/IprFormModal";
import ConfirmDialog from "../components/admin/ConfirmDialog";
import { useAdminAuth } from "../context/adminAuthContext";
import { useAdminData } from "../context/adminDataContext";
import { SDG_LABELS, SDG_STYLES } from "../data/adminPublicationsData";
import { facultyAbbrev } from "../data/adminProjectsData";
import {
  IPR_TOTAL,
  iprStats,
  IPR_YEAR_OPTIONS,
  IPR_TYPE_OPTIONS,
  IPR_STATUS_OPTIONS,
} from "../data/adminIprData";
import "../styles/pages/admin-dashboard.css";
import "../styles/pages/admin-projects.css";

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

const PlusIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const UploadIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V4m0 0l-4 4m4-4l4 4" />
  </svg>
);

const DownloadIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const FlaskIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3h6m-5 0v6.5L4.8 18a2 2 0 001.7 3h11a2 2 0 001.7-3L14 9.5V3m-4 10h4" />
  </svg>
);

const CardIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h2m5 0h4M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
  </svg>
);

const DocIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6M9 8h2m8 13H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

const STAT_ICONS = { flask: FlaskIcon, card: CardIcon, doc: DocIcon };
const SDG_STYLE_FALLBACK = { bg: "#e2e8f0", border: "#cbd5e1", text: "#334155", dot: "#64748b" };
const statusSlug = (status) => status.toLowerCase().replace(/\s+/g, "");
const HONORIFICS = new Set(["prof.", "dr.", "ph.d.", "phd", "ir.", "drs."]);

const initialsOf = (name) => {
  const words = name
    .replace(/\(.*\)/, "")
    .split(/[\s,]+/)
    .filter((word) => word && !HONORIFICS.has(word.toLowerCase()));
  return words.slice(0, 2).map((word) => word[0].toUpperCase()).join("") || "IP";
};

export default function AdminIprManagementPage() {
  const { isOperator, isAdmin, user } = useAdminAuth();
  const { records, submit } = useAdminData();
  const rows = records.ipr;

  const [query, setQuery] = useState("");
  const [year, setYear] = useState("All");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [formModal, setFormModal] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const filtersActive = query.trim() !== "" || year !== "All" || type !== "All" || status !== "All";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (q) {
        const haystack = [row.title, row.code, row.creator.name, row.regNo].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (year !== "All" && row.year !== Number(year)) return false;
      if (type !== "All" && row.type !== type) return false;
      if (status !== "All" && row.status !== status) return false;
      return true;
    });
  }, [rows, query, year, type, status]);

  const displayTotal = filtersActive ? filtered.length : IPR_TOTAL;

  const resetFilters = () => {
    setQuery("");
    setYear("All");
    setType("All");
    setStatus("All");
  };

  const buildPayload = (form) => {
    const editing = formModal?.mode === "edit" ? rows.find((r) => r.id === formModal.id) : null;
    const abbrev = facultyAbbrev(form.faculty);
    const creatorName = form.creator.replace(/\(.*\)/, "").trim();
    return {
      code: form.code,
      title: form.title,
      type: form.type,
      regNo: form.regNo,
      year: Number(form.year) || 2026,
      faculty: abbrev,
      creator: {
        initials: initialsOf(creatorName),
        name: creatorName,
        faculty: abbrev,
        metric: editing?.creator.metric ?? "h-index: —",
      },
      sdgs: form.sdgs,
      status: form.status === "Pending Examination" ? "Pending" : form.status,
    };
  };

  const requestSave = (form) => setConfirm({ type: "save", form });
  const requestDelete = (row) => setConfirm({ type: "delete", row });

  const handleConfirm = () => {
    if (confirm?.type === "save") {
      const payload = buildPayload(confirm.form);
      const isEdit = formModal?.mode === "edit";
      submit("ipr", isEdit ? "edit" : "add", {
        targetId: isEdit ? formModal.id : null,
        payload,
        label: payload.title,
        by: user?.name,
      });
      setFormModal(null);
    }
    if (confirm?.type === "delete") {
      submit("ipr", "delete", {
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
        entity="ipr"
        title="Intellectual Property Rights Dashboard"
        tableTitle="Pending IP Records for Approval"
        searchPlaceholder="Search IP title, code, inventor, or operator..."
      />
    );
  }

  return (
    <div className="ad-root">
      <div className="ad-shell">
        <AdminSidebar />

        <div className="ad-main">
          <AdminTopbar />

          <div className="ad-content">
            <div className="ad-head">
              <div>
                <h1 className="ad-head__title">Intellectual Property Rights Management</h1>
                <p className="ad-head__sub">
                  Manage patents, copyrights, trademarks, and other institutional IP assets.
                </p>
              </div>
              <div className="rp-headactions">
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
                    className="rp-add"
                    onClick={() => setFormModal({ mode: "add" })}
                  >
                    <PlusIcon />
                    Add IP Record
                  </button>
                )}
              </div>
            </div>

            {isOperator && (
              <p className="rp-rolenote">
                Operator mode: additions, edits, and deletions are queued for Admin approval.
              </p>
            )}

            <div className="rp-stats">
              {iprStats.map((stat) => {
                const Icon = STAT_ICONS[stat.icon];
                return (
                  <div className="rp-stat" key={stat.label}>
                    <p className="rp-stat__label">{stat.label}</p>
                    <span className={`rp-stat__icon rp-stat__icon--${stat.tint}`}>
                      <Icon />
                    </span>
                    <p className="rp-stat__value">
                      {stat.value}{" "}
                      <span className={stat.stacked ? "rp-stat__unit--stacked" : undefined}>
                        {stat.unit}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="rp-filtercard">
              <div className="rp-searchfield">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search IP title, code, inventor, or registration no..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="rp-filterselects">
                <div className="rp-filterrow">
                  <span className="rp-selectwrap">
                    <select
                      className="rp-select"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      aria-label="Filter by year"
                    >
                      <option value="All">Year: All</option>
                      {IPR_YEAR_OPTIONS.map((y) => (
                        <option key={y} value={y}>Year: {y}</option>
                      ))}
                    </select>
                    <ChevronDown />
                  </span>

                  <span className="rp-selectwrap">
                    <select
                      className="rp-select"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      aria-label="Filter by type"
                    >
                      <option value="All">All IP Types</option>
                      {IPR_TYPE_OPTIONS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown />
                  </span>
                </div>

                <div className="rp-filterrow">
                  <span className="rp-selectwrap">
                    <select
                      className="rp-select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      aria-label="Filter by status"
                    >
                      <option value="All">All Statuses</option>
                      {IPR_STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown />
                  </span>
                  <button type="button" className="rp-resetfilters" onClick={resetFilters}>
                    Reset filters
                  </button>
                </div>
              </div>
            </div>

            <div className="ad-tablecard">
              <div className="ad-tablewrap">
                <table className="rp-table">
                  <thead>
                    <tr>
                      <th>IP Code &amp; Title</th>
                      <th>Inventor / Creator</th>
                      <th>Type</th>
                      <th>Registration No</th>
                      <th>Year</th>
                      <th>SDGs / Goals</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <span className="rp-code">{row.code}</span>
                          <p className="rp-title">{row.title}</p>
                        </td>
                        <td>
                          <div className="rp-pi">
                            <div>
                              <p className="rp-pi__name">{row.creator.name}</p>
                              <div className="rp-pi__sub">
                                <span className="rp-pi__chip">{row.creator.faculty}</span>
                                <span className="rp-pi__metric">{row.creator.metric}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="rp-funder">{row.type}</p>
                        </td>
                        <td>
                          <p className="rp-meta">
                            <CalendarIcon />
                            <span className="rp-meta__period">{row.regNo}</span>
                          </p>
                        </td>
                        <td>
                          <span className="rp-code">{row.year}</span>
                        </td>
                        <td>
                          <div className="rp-sdgs">
                            {row.sdgs.map((goal) => {
                              const style = SDG_STYLES[goal] ?? SDG_STYLE_FALLBACK;
                              return (
                                <span
                                  key={goal}
                                  className="rp-sdg"
                                  style={{ background: style.bg, borderColor: style.border, color: style.text }}
                                >
                                  <span className="rp-sdg__dot" style={{ background: style.dot }} />
                                  {SDG_LABELS[goal] ?? `SDG ${goal}`}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td>
                          <span className={`rp-status rp-status--${statusSlug(row.status)}`}>
                            <span className="rp-status__dot" />
                            {row.status}
                          </span>
                        </td>
                        <td>
                          {isOperator ? (
                            <div className="rp-rowactions">
                              <button
                                type="button"
                                className="rp-iconbtn"
                                title="Edit IP record"
                                onClick={() => setFormModal({ mode: "edit", id: row.id })}
                              >
                                <PencilIcon />
                              </button>
                              <button
                                type="button"
                                className="rp-iconbtn rp-iconbtn--danger"
                                title="Delete IP record"
                                onClick={() => requestDelete(row)}
                              >
                                <TrashIcon />
                              </button>
                            </div>
                          ) : (
                            <span className="rp-readonly">Admin (review only)</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={8}>
                          <p className="rp-empty">No IP records match the current filters.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rp-footcard">
              <div className="ad-tablefoot">
                <p className="ad-tablefoot__info">
                  Showing <strong>1-{filtered.length}</strong> of{" "}
                  <strong>{displayTotal}</strong> IP assets
                </p>
                <div className="ad-tablefoot__nav">
                  <button type="button" className="ad-pagebtn" disabled aria-label="Previous page">
                    <ChevronLeft />
                  </button>
                  <button type="button" className="ad-pagebtn rp-pagebtn--active">1</button>
                  <button type="button" className="ad-pagebtn ad-pagebtn--plain">2</button>
                  <button type="button" className="ad-pagebtn ad-pagebtn--plain">3</button>
                  <span className="rp-ellipsis">…</span>
                  <button type="button" className="ad-pagebtn">
                    Next
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {formModal && (
        <IprFormModal
          mode={formModal.mode}
          ipr={rows.find((row) => row.id === formModal.id) ?? null}
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
          message={`You are requesting to remove "${confirm.row.label ?? confirm.row.title}". The Admin must approve this deletion before it is applied.`}
          confirmLabel="Yes, Request Deletion"
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}
