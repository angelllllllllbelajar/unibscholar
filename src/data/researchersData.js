// ─── Mock data & constants for the Researchers directory page ────────────────

export const RESULT_TOTAL = 1561;
export const FACULTY_TOTAL = 1969;
export const TOTAL_PAGES = 493;
export const SDG_INITIAL_COUNT = 4;

export const faculties = [
  { id: "FKIK",  label: "FKIK",  count: 941 },
  { id: "FT",    label: "FT",    count: 324 },
  { id: "FMIPA", label: "FMIPA", count: 141 },
  { id: "FEB",   label: "FEB",   count: 681 },
  { id: "FKIP",  label: "FKIP",  count: 357 },
  { id: "FH",    label: "FH",    count: 427 },
  { id: "FISIP", label: "FISIP", count: 429 },
  { id: "FP",    label: "FP",    count: 654 },
];

export const topics = [
  { id: "ai",   label: "Artificial Intelligence", count: 312 },
  { id: "nano", label: "Nanotechnology",           count: 92  },
  { id: "re",   label: "Renewable Energy",         count: 98  },
  { id: "gen",  label: "Genomics",                 count: 67  },
];

export const sdgFilters = [
  { id: "sdg1",  label: "GOAL 1: No Poverty",                    count: 312 },
  { id: "sdg2",  label: "GOAL 2: Zero Hunger",                   count: 92  },
  { id: "sdg3",  label: "GOAL 3: Good Health and Well-Being",    count: 98  },
  { id: "sdg4",  label: "GOAL 4: Quality Education",             count: 67  },
  { id: "sdg5",  label: "GOAL 5: Gender Equality",               count: 54  },
  { id: "sdg6",  label: "GOAL 6: Clean Water and Sanitation",    count: 43  },
  { id: "sdg7",  label: "GOAL 7: Affordable and Clean Energy",   count: 78  },
  { id: "sdg8",  label: "GOAL 8: Decent Work and Economic Growth", count: 61 },
  { id: "sdg9",  label: "GOAL 9: Industry, Innovation and Infrastructure", count: 55 },
  { id: "sdg10", label: "GOAL 10: Reduced Inequalities",         count: 38  },
  { id: "sdg11", label: "GOAL 11: Sustainable Cities and Communities", count: 47 },
  { id: "sdg12", label: "GOAL 12: Responsible Consumption and Production", count: 33 },
  { id: "sdg13", label: "GOAL 13: Climate Action",               count: 89  },
  { id: "sdg14", label: "GOAL 14: Life Below Water",             count: 26  },
  { id: "sdg15", label: "GOAL 15: Life on Land",                 count: 41  },
  { id: "sdg16", label: "GOAL 16: Peace, Justice and Strong Institutions", count: 29 },
  { id: "sdg17", label: "GOAL 17: Partnerships for the Goals",   count: 18  },
];

export const networks = [
  { id: "ui",  label: "Universitas Indonesia",    count: 420 },
  { id: "upj", label: "Universitas Padjajaran",   count: 28  },
  { id: "ugm", label: "Universitas Gajah Mada",   count: 215 },
  { id: "uns", label: "Universitas Sebelas Maret", count: 189 },
];

export const researchers = [
  { id: 1, name: "Prof. Dr. Eleanor Vance, Ph.D.", role: "Proffesor (Guru Besar)", dept: "Fakultas Teknik", hindex: 48, pubs: 248, projects: 18, citations: 4890 },
  { id: 2, name: "Prof. Dr. Eleanor Vance, Ph.D.", role: "Proffesor (Guru Besar)", dept: "Fakultas Teknik", hindex: 48, pubs: 248, projects: 18, citations: 4890 },
  { id: 3, name: "Prof. Dr. Eleanor Vance, Ph.D.", role: "Proffesor (Guru Besar)", dept: "Fakultas Teknik", hindex: 48, pubs: 248, projects: 18, citations: 4890 },
  { id: 4, name: "Prof. Dr. Eleanor Vance, Ph.D.", role: "Proffesor (Guru Besar)", dept: "Fakultas Teknik", hindex: 48, pubs: 248, projects: 18, citations: 4890 },
  { id: 5, name: "Prof. Dr. Eleanor Vance, Ph.D.", role: "Proffesor (Guru Besar)", dept: "Fakultas Teknik", hindex: 48, pubs: 248, projects: 18, citations: 4890 },
  { id: 6, name: "Prof. Dr. Eleanor Vance, Ph.D.", role: "Proffesor (Guru Besar)", dept: "Fakultas Teknik", hindex: 48, pubs: 248, projects: 18, citations: 4890 },
];

export const sourceBadges = [
  { label: "ORCID",            url: "https://orcid.org",          variant: "orcid" },
  { label: "Scopus",           url: "https://www.scopus.com",     variant: "scopus" },
  { label: "OpenAlex",         url: "https://openalex.org",       variant: "openalex" },
  { label: "Google Scholar",   url: "https://scholar.google.com", variant: "gs" },
];
