import React, { useMemo, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { useAdminData } from "../../context/adminDataContext";
import { approvalStats } from "../../data/adminApprovalData";
import "../../styles/pages/admin-dashboard.css";

const PAGE_SIZE = 5;

const FILTERS = [
  { id: "all", label: "All Requests" },
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

const ACTION_FALLBACK = {
  add: { label: "Create New", tone: "green" },
  edit: { label: "Update Metadata", tone: "blue" },
  delete: { label: "Deletion Request", tone: "red" },
};

const COLUMNS = {
  researchers: [
    "Researcher & Identifier",
    "Faculty & Department",
    "Request Type & Date",
    "Linked External IDs",
    "Status",
    "Actions",
  ],
  publications: [
    "Title & Venue",
    "Lead Author & Operator",
    "Request Type & Date",
    "Indexing Source",
    "Status",
    "Actions",
  ],
  projects: [
    "Project Code & Title",
    "Lead PI & Operator",
    "Request Type & Date",
    "Funder & Scheme",
    "Budget & Cycle",
    "Status & Actions",
  ],
  ipr: [
    "IPR Code & Title",
    "Inventors & Operator",
    "Request Type & Date",
    "DJKKI Status & Stage",
    "Review Status",
    "Actions",
  ],
};

const SearchIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FilterIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const DownloadIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const CheckIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PersonIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const fmtDate = (ts) =>
  new Date(ts).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

const initialsOf = (name = "") =>
  name
    .replace(/[^A-Za-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

/** Operator submissions carry only the form payload — derive a display shape. */
const deriveDisplay = (entity, request) => {
  const payload = request.payload ?? {};
  const action = ACTION_FALLBACK[request.action] ?? ACTION_FALLBACK.add;
  const date = fmtDate(request.createdAt);
  const by = request.by ?? "Operator";

  if (entity === "publications") {
    return {
      title: payload.title ?? request.label,
      venue: payload.journal ?? "—",
      meta: payload.doi ? `DOI: ${payload.doi}` : "",
      author: payload.author ?? "—",
      authorId: payload.nidn ?? "—",
      operator: by,
      action,
      date,
      source: { label: payload.type ?? "Manual Entry", tone: "slate" },
    };
  }
  if (entity === "projects") {
    return {
      code: payload.code ?? "—",
      title: payload.title ?? request.label,
      scheme: payload.scheme ?? payload.field ?? "—",
      pi: payload.pi?.name ?? "—",
      piId: "—",
      operator: by,
      action,
      date,
      funder: { label: payload.funder ?? "—", sub: payload.scheme ?? "" },
      budget: payload.budgetIdr ?? "—",
      cycle: payload.period ?? "",
    };
  }
  if (entity === "ipr") {
    return {
      title: payload.title ?? request.label,
      code: payload.code ?? "—",
      type: payload.type ?? "—",
      ref: payload.regNo ? `DJKKI Ref: ${payload.regNo}` : "",
      inventor: payload.creator?.name ?? "—",
      nidn: "—",
      operator: by,
      action,
      date,
      stage: { label: payload.status ?? "—", sub: payload.faculty ?? "" },
    };
  }
  return {
    initials: initialsOf(request.label),
    tone: "slate",
    name: request.label,
    nidn: "—",
    staffId: "—",
    submittedBy: by,
    faculty: "—",
    dept: "—",
    action,
    date,
    ids: [],
  };
};

const ActionChip = ({ action }) => (
  <span className={`ad-chip ad-chip--${action.tone}`}>{action.label}</span>
);

const StatusPill = ({ status }) => (
  <span className={`ad-status ad-status--${status}`}>
    <span className="ad-status__dot" />
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
);

const ActionsCell = ({ vm, onApprove, onReject }) => {
  if (vm.status === "pending") {
    return (
      <div className="ad-actions">
        <button type="button" className="ad-approve" onClick={() => onApprove(vm.id)}>
          <CheckIcon />
          Approve
        </button>
        <button type="button" className="ad-reject" onClick={() => onReject(vm.id)}>
          <XIcon />
          Reject
        </button>
      </div>
    );
  }
  if (vm.status === "approved") {
    return (
      <span className="ad-completed">
        <CheckIcon />
        Completed
      </span>
    );
  }
  return (
    <span className="ad-completed ad-completed--rejected">
      <XIcon />
      Rejected
    </span>
  );
};

const RequestTypeCell = ({ display }) => (
  <td>
    <ActionChip action={display.action} />
    <p className="ad-cell-date ad-cell-date--stack">{display.date}</p>
    {display.note && <p className="ad-note">{display.note}</p>}
  </td>
);

const RowCells = ({ entity, vm, onApprove, onReject }) => {
  const d = vm.display;

  if (entity === "researchers") {
    return (
      <>
        <td>
          <div className="ad-cellperson">
            <span className={`ad-avatar ad-avatar--${d.tone}`}>{d.initials}</span>
            <div>
              <p className="ad-cell-author">{d.name}</p>
              <p className="ad-cell-id">
                NIDN: {d.nidn} • Staff ID: {d.staffId}
              </p>
              <p className="ad-cell-sub">
                <PersonIcon />
                Submitted by {d.submittedBy}
              </p>
            </div>
          </div>
        </td>
        <td>
          <p className="ad-cell-faculty">{d.faculty}</p>
          <span className="ad-chip ad-chip--slate">{d.dept}</span>
        </td>
        <RequestTypeCell display={d} />
        <td>
          <div className="ad-chiprow">
            {d.ids.map((id) => (
              <span key={id.label} className={`ad-chip ad-chip--${id.tone}`}>
                {id.label}
              </span>
            ))}
          </div>
        </td>
        <td>
          <StatusPill status={vm.status} />
        </td>
        <td>
          <ActionsCell vm={vm} onApprove={onApprove} onReject={onReject} />
        </td>
      </>
    );
  }

  if (entity === "publications") {
    return (
      <>
        <td>
          <p className="ad-cell-title">{d.title}</p>
          <p className="ad-cell-sub ad-cell-sub--wrap">
            <span>{d.venue}</span>
            {d.badge && (
              <>
                <span className="ad-cell-sub__dot">•</span>
                <span className={`ad-chip ad-chip--${d.badge.tone}`}>{d.badge.label}</span>
              </>
            )}
            {d.meta && (
              <>
                <span className="ad-cell-sub__dot">•</span>
                <span className="ad-mono">{d.meta}</span>
              </>
            )}
          </p>
        </td>
        <td>
          <p className="ad-cell-author">{d.author}</p>
          <p className="ad-cell-id ad-mono">ID: {d.authorId}</p>
          <span className="ad-chip ad-chip--slate ad-chip--mt">Operator: {d.operator}</span>
        </td>
        <RequestTypeCell display={d} />
        <td>
          <span className={`ad-src ad-src--${d.source.tone}`}>{d.source.label}</span>
        </td>
        <td>
          <StatusPill status={vm.status} />
        </td>
        <td>
          <ActionsCell vm={vm} onApprove={onApprove} onReject={onReject} />
        </td>
      </>
    );
  }

  if (entity === "projects") {
    return (
      <>
        <td>
          <p className="ad-code">{d.code}</p>
          <p className="ad-cell-title">{d.title}</p>
          <p className="ad-cell-sub ad-cell-sub--wrap">Scheme: {d.scheme}</p>
        </td>
        <td>
          <p className="ad-cell-author">{d.pi}</p>
          <p className="ad-cell-id">ID: {d.piId}</p>
          <p className="ad-cell-sub">
            <PersonIcon />
            Op: {d.operator}
          </p>
        </td>
        <RequestTypeCell display={d} />
        <td>
          <span className="ad-chip ad-chip--slate ad-chip--block">{d.funder.label}</span>
          <p className="ad-cell-sub ad-cell-sub--wrap">{d.funder.sub}</p>
        </td>
        <td>
          <p className="ad-budget">{d.budget}</p>
          <p className="ad-cell-sub ad-cell-sub--wrap">{d.cycle}</p>
        </td>
        <td>
          <div className="ad-statusactions">
            <StatusPill status={vm.status} />
            <ActionsCell vm={vm} onApprove={onApprove} onReject={onReject} />
          </div>
        </td>
      </>
    );
  }

  // ipr
  const stageTone = /granted|certified/i.test(d.stage.label) ? "green" : "blue";
  return (
    <>
      <td>
        <p className="ad-cell-title">{d.title}</p>
        <p className="ad-cell-sub ad-cell-sub--wrap">
          <span className="ad-chip ad-chip--slate ad-mono">{d.code}</span>
          <span className="ad-cell-sub__dot">•</span>
          <span className="ad-link">{d.type}</span>
        </p>
        {d.ref && <p className="ad-cell-sub">• {d.ref}</p>}
      </td>
      <td>
        <p className="ad-cell-author">{d.inventor}</p>
        <p className="ad-cell-id">NIDN: {d.nidn}</p>
        <p className="ad-cell-sub ad-link">Submitting: Op: {d.operator}</p>
      </td>
      <RequestTypeCell display={d} />
      <td>
        <span className={`ad-src ad-src--${stageTone}`}>{d.stage.label}</span>
        <p className="ad-cell-sub ad-cell-sub--wrap">{d.stage.sub}</p>
      </td>
      <td>
        <StatusPill status={vm.status} />
      </td>
      <td>
        <ActionsCell vm={vm} onApprove={onApprove} onReject={onReject} />
      </td>
    </>
  );
};

/**
 * Admin-only approval dashboard rendered in place of the operator
 * management UI for a given entity.
 */
export default function ApprovalDashboard({ entity, title, tableTitle, searchPlaceholder }) {
  const { requests, resolved, approve, reject } = useAdminData();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  const rows = useMemo(() => {
    const pending = requests
      .filter((r) => r.entity === entity)
      .map((r) => ({ id: r.id, status: "pending", display: r.display ?? deriveDisplay(entity, r) }));
    const done = resolved
      .filter((r) => r.entity === entity)
      .map((r) => ({
        id: r.id,
        status: r.decision === "approved" ? "approved" : "rejected",
        display: r.display ?? deriveDisplay(entity, r),
      }));
    return [...pending, ...done];
  }, [requests, resolved, entity]);

  const pendingCount = rows.filter((row) => row.status === "pending").length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (statusFilter !== "all" && row.status !== statusFilter) return false;
      if (q && !JSON.stringify(row.display).toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rows, query, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const start = filtered.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1;
  const end = Math.min(current * PAGE_SIZE, filtered.length);
  const pageRows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const columns = COLUMNS[entity];

  return (
    <div className="ad-root">
      <div className="ad-shell">
        <AdminSidebar />

        <div className="ad-main">
          <AdminTopbar />

          <div className="ad-content">
            <div className="ad-head">
              <h1 className="ad-head__title">{title}</h1>
              <button type="button" className="ad-export">
                <DownloadIcon />
                Export Report (XLS)
              </button>
            </div>

            <div className="ad-stats">
              {approvalStats.map((stat) => (
                <div className="ad-stat" key={stat.label}>
                  <p className="ad-stat__label">{stat.label}</p>
                  <p className="ad-stat__value">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="ad-tablecard">
              <div className="ad-tablecard__head">
                <div className="ad-tablecard__headleft">
                  <h2 className="ad-tablecard__title">
                    {tableTitle}
                    <span className="ad-pill-pending">{pendingCount} Pending</span>
                  </h2>
                  <div className="ad-tablesearch">
                    <div className="ad-searchfield">
                      <SearchIcon />
                      <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={query}
                        onChange={(e) => {
                          setQuery(e.target.value);
                          setPage(1);
                        }}
                      />
                    </div>
                    <button type="button" className="ad-searchbtn">Search</button>
                  </div>
                </div>

                <div className="ad-tablecard__actions">
                  <div className="ad-filterwrap">
                    <button
                      type="button"
                      className="ad-filterbtn"
                      onClick={() => setFilterOpen((open) => !open)}
                    >
                      <FilterIcon />
                      Filter
                    </button>
                    {filterOpen && (
                      <div className="ad-filtermenu">
                        {FILTERS.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            className={`ad-filtermenu__item ${statusFilter === option.id ? "ad-filtermenu__item--active" : ""}`}
                            onClick={() => {
                              setStatusFilter(option.id);
                              setFilterOpen(false);
                              setPage(1);
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="ad-tablewrap">
                <table className="ad-table">
                  <thead>
                    <tr>
                      {columns.map((column) => (
                        <th key={column}>{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pageRows.map((vm) => (
                      <tr key={vm.id}>
                        <RowCells entity={entity} vm={vm} onApprove={approve} onReject={reject} />
                      </tr>
                    ))}
                    {pageRows.length === 0 && (
                      <tr>
                        <td colSpan={columns.length}>
                          <p className="ad-empty">No approval requests match the current filter.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="ad-tablefoot">
                <p className="ad-tablefoot__info">
                  Showing <strong>{start}</strong> to <strong>{end}</strong> of{" "}
                  <strong>{filtered.length}</strong> pending requests
                </p>
                <div className="ad-tablefoot__nav">
                  <button
                    type="button"
                    className="ad-pagebtn"
                    disabled={current === 1}
                    onClick={() => setPage(current - 1)}
                  >
                    <ChevronLeftIcon />
                    Previous
                  </button>
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`ad-pagebtn ${n === current ? "ad-pagebtn--active" : "ad-pagebtn--plain"}`}
                      onClick={() => setPage(n)}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="ad-pagebtn"
                    disabled={current === pageCount}
                    onClick={() => setPage(current + 1)}
                  >
                    Next
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
