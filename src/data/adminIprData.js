// ─── Mock data for the Admin Intellectual Property Rights (IPR) table ────────

export const IPR_TOTAL = 62;

export const iprStats = [
  { label: "Total IP Assets", value: "62", unit: "Records", stacked: false, icon: "doc", tint: "blue" },
  { label: "Granted / Registered", value: "38", unit: "Certified", stacked: false, icon: "card", tint: "green" },
  { label: "Pending Examination", value: "11", unit: "Filings", stacked: true, icon: "flask", tint: "amber" },
];

export const managedIpr = [
  {
    id: 1,
    code: "PT-UNIB-2026-014",
    title: "Hierarchical Porous Metal-Organic Framework for High-Sensitivity Gas Detection",
    type: "Patent",
    regNo: "P00202610431",
    year: 2026,
    faculty: "FMIPA",
    creator: { initials: "BY", name: "Prof. Dr. Brian Yuliarto", faculty: "FMIPA", metric: "h-index: 38" },
    sdgs: [7, 9],
    status: "Granted",
  },
  {
    id: 2,
    code: "CR-UNIB-2026-088",
    title: "ScholarCore Repository Analytics Dashboard Software",
    type: "Copyright",
    regNo: "EC00202601188",
    year: 2026,
    faculty: "FT",
    creator: { initials: "EV", name: "Prof. Dr. Eleanor Vance", faculty: "FT", metric: "ORCID: 0000-0002..." },
    sdgs: [4, 9],
    status: "Registered",
  },
  {
    id: 3,
    code: "PT-UNIB-2025-031",
    title: "Edge AI Audio DSP Microprocessor Architecture for Smart Hearing Devices",
    type: "Patent (Simple)",
    regNo: "S00202509912",
    year: 2025,
    faculty: "FT",
    creator: { initials: "TA", name: "Prof. Trio Adiono, Ph.D.", faculty: "FT", metric: "h-index: 24" },
    sdgs: [3, 9],
    status: "Pending",
  },
  {
    id: 4,
    code: "TM-UNIB-2025-007",
    title: "UNIB Scholar Portal Institutional Service Mark",
    type: "Trademark",
    regNo: "J00202505540",
    year: 2025,
    faculty: "FEB",
    creator: { initials: "AP", name: "Dr. Asril Pramutadi", faculty: "FMIPA", metric: "Scopus ID: 5719..." },
    sdgs: [8],
    status: "Draft",
  },
];

export const IPR_YEAR_OPTIONS = [2026, 2025, 2024];
export const IPR_TYPE_OPTIONS = ["Patent", "Patent (Simple)", "Copyright", "Trademark", "Industrial Design", "Plant Variety"];
export const IPR_STATUS_OPTIONS = ["Granted", "Registered", "Pending", "Draft"];

// ─── Form (modal) options ────────────────────────────────────────────────────

export const IPR_TYPE_FORM_OPTIONS = [
  "Patent",
  "Patent (Simple)",
  "Copyright",
  "Trademark",
  "Industrial Design",
  "Plant Variety Protection",
];

export const IPR_STATUS_FORM_OPTIONS = [
  "Granted",
  "Registered",
  "Pending Examination",
  "Draft",
];
