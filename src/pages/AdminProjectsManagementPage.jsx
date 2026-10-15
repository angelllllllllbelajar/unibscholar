import React, { useMemo, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import ProjectFormModal from "../components/admin/ProjectFormModal";
import { adminUser } from "../data/adminData";
import { SDG_LABELS, SDG_STYLES } from "../data/adminPublicationsData";
import {
  PROJECT_TOTAL,
  projectStats,
  managedProjects,
  PROJECT_YEAR_OPTIONS,
  PROJECT_SCHEME_OPTIONS,
  PROJECT_STATUS_OPTIONS,
  facultyAbbrev,
} from "../data/adminProjectsData";
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

const BookIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
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

const STAT_ICONS = { flask: FlaskIcon, card: CardIcon, doc: DocIcon, book: BookIcon };

const SDG_STYLE_FALLBACK = { bg: "#e2e8f0", border: "#cbd5e1", text: "#334155", dot: "#64748b" };

const statusSlug = (status) => status.toLowerCase().replace(/\s+/g, "");

const HONORIFICS = new Set(["prof.", "dr.", "ph.d.", "phd", "ir.", "drs."]);

const initialsOf = (name) => {
  const words = name
    .replace(/\(.*\)/, "")
    .split(/[\s,]+/)
    .filter((word) => word && !HONORIFICS.has(word.toLowerCase()));
  return words.slice(0, 2).map((word) => word[0].toUpperCase()).join("") || "PI";
};

const parseYear = (text) => Number((text.match(/(19|20)\d{2}/) || [])[0]) || null;

const yearRange = (start, end) => {
  const first = parseYear(start);
  const last = parseYear(end) || first;
  if (!first) return [];
  const out = [];
  for (let y = first; y <= last; y += 1) out.push(y);
  return out;
};

export default function AdminProjectsManagementPage() {
  const [rows, setRows] = useState(managedProjects);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("2026");
  const [scheme, setScheme] = useState("All");
  const [status, setStatus] = useState("All");
  const [formModal, setFormModal] = useState(null);

  const filtersActive =
    query.trim() !== "" || year !== "2026" || scheme !== "All" || status !== "All";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (q) {
        const haystack = [row.title, row.code, row.pi.name].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (!row.activeYears.includes(Number(year))) return false;
      if (scheme !== "All" && row.scheme !== scheme) return false;
      if (status !== "All" && row.status !== status) return false;
      return true;
    });
  }, [rows, query, year, scheme, status]);

  const displayTotal = filtersActive ? filtered.length : PROJECT_TOTAL;

  const confirmDelete = (row) => {
    if (
      window.confirm(
        `Delete this research project?\n\n"${row.title}"\n\nThis action cannot be undone.`
      )
    ) {
      setRows((prev) => prev.filter((item) => item.id !== row.id));
    }
  };

  const confirmEdit = (row) => {
    if (window.confirm(`Edit this research project?\n\n"${row.title}"`)) {
      setFormModal({ mode: "edit", id: row.id });
    }
  };

  const handleSave = (form) => {
    const editing = formModal?.mode === "edit" ? rows.find((r) => r.id === formModal.id) : null;
    const abbrev = facultyAbbrev(form.faculty);
    const piName = form.pi.replace(/\(.*\)/, "").trim();
    const range = yearRange(form.start, form.end);
    const fiscal = parseYear(form.year) || editing?.fiscalYear || 2026;
    const usd = form.funding.match(/\$[\d,.]+/);
    const idr = form.funding.split("(")[0].trim();

    const payload = {
      code: form.code,
      title: form.title,
      field: form.topics,
      funder: form.scheme,
      fiscalYear: fiscal,
      period: form.end.trim() ? `${form.start.trim()} - ${form.end.trim()}` : form.start.trim(),
      activeYears: range.length ? range : [fiscal],
      pi: {
        initials: initialsOf(piName),
        name: piName,
        faculty: abbrev,
        metric: editing?.pi.metric ?? "h-index: —",
      },
      coInvestigators: form.coInvestigators,
      faculty: abbrev,
      sdgs: form.sdgs,
      budgetIdr: `Rp ${idr}`,
      budgetUsd: usd ? `${usd[0]} USD` : editing?.budgetUsd ?? "—",
      status: form.status === "Pending Institutional Review" ? "Pending Review" : form.status,
      scheme:
        PROJECT_SCHEME_OPTIONS.find((option) => form.scheme.includes(option)) ??
        editing?.scheme ??
        form.scheme,
    };

    if (editing) {
      setRows((prev) => prev.map((row) => (row.id === editing.id ? { ...row, ...payload } : row)));
    } else {
      setRows((prev) => [{ id: Date.now(), ...payload }, ...prev]);
    }
    setFormModal(null);
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
                <input type="text" placeholder="Search research units..." />
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
                <h1 className="ad-head__title">Research Projects Management</h1>
                <p className="ad-head__sub">
                  Manage institutional grants, research proposals, active contracts, and funding disbursements.
                </p>
              </div>
              <div className="rp-headactions">
                <button
                  type="button"
                  className="rp-add"
                  onClick={() => setFormModal({ mode: "add" })}
                >
                  <PlusIcon />
                  Add Manual Project
                </button>
              </div>
            </div>

            {/* Stat cards */}
            <div className="rp-stats">
              {projectStats.map((stat) => {
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

            {/* Filter card */}
            <div className="rp-filtercard">
              <div className="rp-searchfield">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search project title, grant code, or PI..."
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
                      {PROJECT_YEAR_OPTIONS.map((y) => (
                        <option key={y} value={y}>Year: {y}</option>
                      ))}
                    </select>
                    <ChevronDown />
                  </span>

                  <span className="rp-selectwrap">
                    <select
                      className="rp-select"
                      value={scheme}
                      onChange={(e) => setScheme(e.target.value)}
                      aria-label="Filter by scheme"
                    >
                      <option value="All">All Schemes (iTB PPMI, Kemdiktisaintek, LPDP)</option>
                      {PROJECT_SCHEME_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
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
                      <option value="All">All Statuses (Ongoing, Pending Review, Completed)</option>
                      {PROJECT_STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown />
                  </span>
                </div>
              </div>
            </div>

            {/* Table card */}
            <div className="ad-tablecard">
              <div className="ad-tablewrap">
                <table className="rp-table">
                  <thead>
                    <tr>
                      <th>Project Code &amp; Title</th>
                      <th>Principal Investigator (PI)</th>
                      <th>Funder &amp; Scheme</th>
                      <th>SDGs / Goals</th>
                      <th>Budget</th>
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
                          <p className="rp-meta">
                            <CalendarIcon />
                            <span className="rp-meta__period">{row.period}</span>
                            <span className="rp-meta__dot">•</span>
                            <span className="rp-meta__field">{row.field}</span>
                          </p>
                        </td>
                        <td>
                          <div className="rp-pi">
                            <span className="rp-pi__avatar">{row.pi.initials}</span>
                            <div>
                              <p className="rp-pi__name">{row.pi.name}</p>
                              <div className="rp-pi__sub">
                                <span className="rp-pi__chip">{row.pi.faculty}</span>
                                <span className="rp-pi__metric">{row.pi.metric}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="rp-funder">{row.funder}</p>
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
                          <p className="rp-budget">{row.budgetUsd}</p>
                          <p className="rp-budget__idr">{row.budgetIdr}</p>
                        </td>
                        <td>
                          <span className={`rp-status rp-status--${statusSlug(row.status)}`}>
                            <span className="rp-status__dot" />
                            {row.status}
                          </span>
                        </td>
                        <td>
                          <div className="rp-rowactions">
                            <button
                              type="button"
                              className="rp-iconbtn"
                              title="Edit project"
                              onClick={() => confirmEdit(row)}
                            >
                              <PencilIcon />
                            </button>
                            <button
                              type="button"
                              className="rp-iconbtn rp-iconbtn--danger"
                              title="Delete project"
                              onClick={() => confirmDelete(row)}
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={7}>
                          <p className="rp-empty">
                            No research projects match the current filters.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer card */}
            <div className="rp-footcard">
              <div className="ad-tablefoot">
                <p className="ad-tablefoot__info">
                  Showing <strong>1-{filtered.length}</strong> of{" "}
                  <strong>{displayTotal}</strong> research grants
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
        <ProjectFormModal
          mode={formModal.mode}
          project={rows.find((row) => row.id === formModal.id) ?? null}
          onClose={() => setFormModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
