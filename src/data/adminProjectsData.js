// ─── Mock data for the Admin Projects Management table ──────────────────────

export const PROJECT_TOTAL = 95;

export const projectStats = [
  {
    label: "Total Active Grants",
    value: "95",
    unit: "Proposals",
    stacked: false,
    icon: "flask",
    tint: "blue",
  },
  {
    label: "Committed Funds",
    value: "$2.48M",
    unit: "USD",
    stacked: false,
    icon: "card",
    tint: "blue",
  },
  {
    label: "Pending Institutional Review",
    value: "14",
    unit: "Submissions",
    stacked: true,
    icon: "doc",
    tint: "amber",
  },
];

export const managedProjects = [
  {
    id: 1,
    code: "FMIPA.PPMI-1-23-2026",
    title: "Integrated MPS Framework for Liquid Cooled Reactor System Analysis",
    period: "Jan 2026 - Dec 2026",
    field: "Nuclear & Energy Systems",
    activeYears: [2026],
    scheme: "iTB PPMI",
    pi: {
      initials: "AP",
      name: "Dr. Asril Pramutadi Andi Mustari",
      faculty: "FT",
      metric: "Scopus ID: 5719...",
    },
    funder: "PNBP/BLU UNIB",
    faculty: "FT",
    sdgs: [7, 9],
    budgetUsd: "$15,000 USD",
    budgetIdr: "Rp 235,000,000",
    status: "Ongoing",
    fiscalYear: 2026,
    coInvestigators: "Dr. Hanni Garminia, Prof. Trio Adiono",
  },
  {
    id: 2,
    code: "UNIB.RESEARCH-2026-04",
    title: "Water Quality Monitoring Using IoT Sensors and Distributed Neural Processing",
    period: "Mar 2026 - Nov 2026",
    field: "Environmental Intelligence",
    activeYears: [2026],
    scheme: "Kemdiktisaintek",
    pi: {
      initials: "EV",
      name: "Prof. Dr. Eleanor Vance",
      faculty: "FMIPA",
      metric: "ORCID: 0000-0002...",
    },
    funder: "Penelitian Fundamental Unib",
    faculty: "FMIPA",
    sdgs: [6, 14, 13],
    budgetUsd: "$22,000 USD",
    budgetIdr: "Rp 350,000,000",
    status: "Pending Review",
    fiscalYear: 2026,
    coInvestigators: "Dr. Asril Pramutadi, Dr. Hanni Garminia",
  },
  {
    id: 3,
    code: "DRI.PN-14-113-2026",
    title: "AI-Powered Audio DSP Microprocessor for Edge Smart Hearing Devices",
    period: "Feb 2026 - Nov 2026",
    field: "Microchip VLSI Design",
    activeYears: [2026],
    scheme: "Kemdiktisaintek",
    pi: {
      initials: "TA",
      name: "Prof. Trio Adiono, Ph.D.",
      faculty: "FT",
      metric: "h-index: 24",
    },
    funder: "Penelitian Terapan (PT-Unib)",
    faculty: "FT",
    sdgs: [3, 9],
    budgetUsd: "$30,000 USD",
    budgetIdr: "Rp 470,000,000",
    status: "Ongoing",
    fiscalYear: 2026,
    coInvestigators: "Prof. Dr. Brian Yuliarto, Dr. Eleanor Vance",
  },
  {
    id: 4,
    code: "LPDP.RISPRO-2025-08",
    title: "High-Efficiency Perovskite Solar Cell Sensitizers for Tropical Climates",
    period: "Oct 2024 - Jan 2026",
    field: "Renewable Energy Materials",
    activeYears: [2024, 2025, 2026],
    scheme: "LPDP",
    pi: {
      initials: "BY",
      name: "Prof. Dr. Brian Yuliarto",
      faculty: "FMIPA",
      metric: "h-index: 38",
    },
    funder: "PKDN-Unib",
    faculty: "FMIPA",
    sdgs: [7, 13],
    budgetUsd: "$48,000 USD",
    budgetIdr: "Rp 750,000,000",
    status: "Completed",
    fiscalYear: 2025,
    coInvestigators: "Dr. Eleanor Vance, Prof. Trio Adiono",
  },
];

export const PROJECT_YEAR_OPTIONS = [2026, 2025, 2024];
export const PROJECT_SCHEME_OPTIONS = ["iTB PPMI", "Kemdiktisaintek", "LPDP"];
export const PROJECT_STATUS_OPTIONS = ["Ongoing", "Pending Review", "Completed"];

// ─── Form (modal) options ────────────────────────────────────────────────────

export const PROJECT_TOPIC_FORM_OPTIONS = [
  "Nuclear & Reactor Physics, Operator Algebras",
  "Machine Learning, Environmental Sensing",
  "VLSI Design, Edge AI",
  "Nuclear & Energy Systems",
  "Environmental Intelligence",
  "Microchip VLSI Design",
  "Renewable Energy Materials",
];

export const PROJECT_FISCAL_YEAR_OPTIONS = [
  "2026 (Active Fiscal Year)",
  "2025",
  "2024",
  "2023",
];

export const PROJECT_SCHEME_FORM_OPTIONS = [
  "Penelitian Fundamental Unib",
  "Penelitian Terapan (PT-Unib)",
  "PNBP/BLU UNIB",
  "PKDN-Unib",
  "iTB PPMI",
  "Kemdiktisaintek",
  "LPDP RISPRO",
];

export const UNIB_FACULTY_FULL_OPTIONS = [
  "Faculty of Teacher Training & Education (FKIP)",
  "Faculty of Law (FH)",
  "Faculty of Economics & Business (FEB)",
  "Faculty of Social & Political Sciences (FISIP)",
  "Faculty of Agriculture (Faperta)",
  "Faculty of Mathematics & Natural Sciences (FMIPA)",
  "Faculty of Engineering (FT)",
  "Faculty of Medicine & Health Sciences (FKIK)",
];

export const PROJECT_STATUS_FORM_OPTIONS = [
  "Pending Institutional Review",
  "Ongoing",
  "Completed",
];

export const facultyAbbrev = (value) => {
  const match = value.match(/\(([^)]+)\)\s*$/);
  return match ? match[1] : value.trim();
};

export const facultyFullName = (abbrev) =>
  UNIB_FACULTY_FULL_OPTIONS.find((option) => option.endsWith(`(${abbrev})`)) ?? abbrev;
