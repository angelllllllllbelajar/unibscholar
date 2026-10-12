// ─── Mock Publications Data ───────────────────────────────────────────────────
export const TOTAL = 151727;
export const PER_PAGE      = 6;   // grid view items per page
export const PER_PAGE_LIST = 3;   // list view items per page

// ── Prototype result cap ── remove Math.min() when real data/API is wired ────
// Cap the demo to a fixed number of results so grid and list views report the
// same total; each view derives its own page count from its per-page size.
export const DEMO_TOTAL       = 600;
const CAPPED_TOTAL            = Math.min(TOTAL, DEMO_TOTAL);
export const TOTAL_PAGES      = Math.ceil(CAPPED_TOTAL / PER_PAGE);       // 100 (grid)
export const TOTAL_PAGES_LIST = Math.ceil(CAPPED_TOTAL / PER_PAGE_LIST);  // 200 (list)
export const SDG_INITIAL_COUNT = 4;
export const YEAR_MIN = 2006;
export const YEAR_MAX = 2026;

export const publications = [
  {
    id: 1,
    doi: "10.1109/TSG.2025.04",
    date: "Feb 2025",
    volume: "Vol. 42 Issue 2",
    volumeTag: null,
    title: "Deep Multi-Agent Reinforcement Learning for Distributed Smart Grids",
    authors: ["Eleanor Vance", "Marcus Chen", "et al."],
    abstract:
      "We present a novel distributed multi-agent actor-critic paradigm designed to optimize energy distribution across heterogeneous smart grid topologies.",
    citations: 42,
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=80",
    faculty: "FKIK",
  },
  {
    id: 2,
    doi: "10.1038/s41587-025",
    date: "Jan 2025",
    volume: null,
    volumeTag: "Special Issue",
    title: "CRISPR-Cas13 Transcriptome Engineering in Pathogenic Diagnostics",
    authors: ["Dr. Sarah Al-Mansoor", "T. K. Gupta"],
    abstract:
      "Evaluation of targeted sequence cleavage kinetics using programmable RNA-guided nucleases in clinical pathogen detection workflows.",
    citations: 42,
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
    faculty: "FMIPA",
  },
  {
    id: 3,
    doi: "10.1016/j.envres.2024",
    date: "Dec 2024",
    volume: null,
    volumeTag: "Open Repo Net",
    title: "High-Resolution Climate Modeling of Pacific Coastal Micro-ecosystems",
    authors: ["David K. Lindqvist", "Elena Rostova"],
    abstract:
      "A multi-tiered hydrological and atmospheric hydrodynamic coupled model for predicting climate variability in coastal micro-ecosystems.",
    citations: 42,
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80",
    faculty: "FT",
  },
  {
    id: 4,
    doi: "10.1103/PhysRevB.2024",
    date: "Nov 2024",
    volume: "Vol. 110, Issue 18",
    volumeTag: null,
    title: "Topological Quantum States in Quasi-2D Superconductors",
    authors: ["Prof. Aris Thorne", "J. H. Miller"],
    abstract:
      "Experimental spectroscopic confirmation of chiral Majorana zero-mode surface states in van der Waals heterostructures.",
    citations: 42,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
    faculty: "FMIPA",
  },
  {
    id: 5,
    doi: "10.1145/3625412",
    date: "Oct 2024",
    volume: null,
    volumeTag: "Artifact Evaluated",
    title: "Neural Architecture Search for Real-Time Edge Robotics Navigation",
    authors: ["K. Tanaka", "Eleanor Vance"],
    abstract:
      "Demonstration of a hardware-in-the-loop constrained neural search strategy enabling sub-10ms inference on ARM Cortex-M7.",
    citations: 42,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    faculty: "FT",
  },
  {
    id: 6,
    doi: "10.1039/D4GC02981",
    date: "Sep 2024",
    volume: null,
    volumeTag: "Open Science Award",
    title: "Sustainable Bio-composites from Agricultural Lignocellulose Waste",
    authors: ["Maria Santos", "B. Hartono"],
    abstract:
      "A circular biorefinery strategy utilizing ionic liquid dissolution to synthesize high-strength composite panels from rice husk and sugarcane bagasse.",
    citations: 42,
    image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=600&q=80",
    faculty: "FEB",
  },
];

export const faculties = [
  { name: "FKIK",  count: 941, checked: false },
  { name: "FT",    count: 324, checked: false },
  { name: "FMIPA", count: 141, checked: false },
  { name: "FEB",   count: 681, checked: false },
  { name: "FKIP",  count: 357, checked: false },
  { name: "FH",    count: 427, checked: false },
  { name: "FISIP", count: 429, checked: false },
  { name: "FP",    count: 654, checked: false },
];

export const authors = [
  { name: "Prof. Eleanor Vance",  count: 312 },
  { name: "Dr. Aris Thorne",     count: 245 },
  { name: "Prof. Marcus Chen",   count: 198 },
  { name: "Dr. Sarah Al-Mansoor",count: 167 },
];

export const topics = [
  { name: "Nuclear & Reactor Physics", count: 412 },
  { name: "Geophysical Exploration",   count: 331 },
  { name: "Operator Algebras",         count: 218 },
  { name: "Disaster Risk Reduction",   count: 176 },
  { name: "AI Audio DSP & Embedded",   count: 145 },
];

export const sdgGoals = [
  { name: "GOAL 1: No Poverty",                          count: 312 },
  { name: "GOAL 2: Zero Hunger",                         count: 92  },
  { name: "GOAL 3: Good Health and Well-Being",          count: 98  },
  { name: "GOAL 4: Quality Education",                   count: 67  },
  { name: "GOAL 5: Gender Equality",                     count: 54  },
  { name: "GOAL 6: Clean Water and Sanitation",          count: 43  },
  { name: "GOAL 7: Affordable and Clean Energy",         count: 78  },
  { name: "GOAL 8: Decent Work and Economic Growth",     count: 61  },
  { name: "GOAL 9: Industry, Innovation and Infrastructure", count: 55 },
  { name: "GOAL 10: Reduced Inequalities",               count: 38  },
  { name: "GOAL 11: Sustainable Cities and Communities", count: 47  },
  { name: "GOAL 12: Responsible Consumption and Production", count: 33 },
  { name: "GOAL 13: Climate Action",                     count: 89  },
  { name: "GOAL 14: Life Below Water",                   count: 26  },
  { name: "GOAL 15: Life on Land",                       count: 41  },
  { name: "GOAL 16: Peace, Justice and Strong Institutions", count: 29 },
  { name: "GOAL 17: Partnerships for the Goals",         count: 18  },
];

// Mocked "Cited By" references keyed by publication id
export const citedBy = {
  1: [
    { title: "Deep Multi-Agent Integration in Power Systems", year: 2025, authors: "Eleanor Vance, Marcus Chen" },
    { title: "Scalable Frameworks for Decentralized Grids",    year: 2024, authors: "Dr. Sarah Al-Mansoor, dkk." },
    { title: "Resilience Analysis in Smart Microgrids",        year: 2024, authors: "David K. Lindqvist, Elena Rostova" },
  ],
  2: [
    { title: "RNA Editing in Pathogen Surveillance",           year: 2025, authors: "T. K. Gupta, B. Hartono" },
    { title: "Cas13 Off-Target Landscape in Diagnostics",     year: 2024, authors: "Maria Santos, et al." },
    { title: "Single-Cell Transcriptomics in Infection",      year: 2024, authors: "Dr. Sarah Al-Mansoor" },
  ],
  3: [
    { title: "High-Resolution Coastal Dynamics and Sea-Surface Temperature Mapping", year: 2025, authors: "Eleanor Vance, Marcus Chen" },
    { title: "High-Density Elevation Grids for Pacific Coastal Vulnerability",       year: 2025, authors: "Dr. Sarah Al-Mansoor, T. K. Gupta" },
    { title: "Coupled Hydro-Atmospheric Modeling in Regional Ecosystems",            year: 2024, authors: "David K. Lindqvist, Elena Rostova" },
  ],
  4: [
    { title: "Chiral Majorana Signatures in 2D Materials",   year: 2025, authors: "J. H. Miller, et al." },
    { title: "Topological Surface States via ARPES",          year: 2024, authors: "Prof. Aris Thorne" },
    { title: "van der Waals Superconductor Proximity Effect", year: 2024, authors: "Elena Rostova, dkk." },
  ],
  5: [
    { title: "On-Device NAS for Autonomous Vehicles",          year: 2025, authors: "K. Tanaka, et al." },
    { title: "Hardware-Aware NAS Benchmarks",                  year: 2024, authors: "Eleanor Vance, B. Hartono" },
    { title: "FPGA-Based Neural Search Accelerators",          year: 2024, authors: "Prof. Marcus Chen" },
  ],
  6: [
    { title: "Ionic Liquid Applications in Green Chemistry",   year: 2025, authors: "B. Hartono, Maria Santos" },
    { title: "Lignocellulose Pre-treatment Review",            year: 2024, authors: "Dr. Sarah Al-Mansoor" },
    { title: "Circular Economy in Agricultural Biomass",       year: 2024, authors: "David K. Lindqvist" },
  ],
};

// ─── Extended paper details for the "View Paper" modal ───────────────────────
export const paperDetails = {
  1: {
    authors: [
      { name: "Eleanor Vance",     sup: "1"   },
      { name: "Marcus Chen, IEEE", sup: "1,2" },
      { name: "K. Tanaka",         sup: "3"   },
      { name: "Brian Yuliarto",    sup: "4"   },
    ],
    affiliations: [
      { sup: "1", text: "Department of Electrical Engineering & Computer Science, Veritas Institute of Technology" },
      { sup: "2", text: "Laboratory for Autonomous Energy Networks, Zurich" },
      { sup: "3", text: "Department of Applied Cybernetics, Tokyo" },
      { sup: "4", text: "Advanced Energy Conversion Materials Lab, Bandung" },
    ],
    journal: "IEEE Transactions on Smart Grid",
    accepted: "Jan 12, 2025",
    indexed: ["Scopus Indexed", "Web of Science", "CrossRef Synced"],
    sdgs: [
      { label: "SDG 3: Good Health & Well-Being", color: "green"  },
      { label: "SDG 9: Industry & Innovation",    color: "orange" },
      { label: "SDG 4: Quality Education",        color: "red"    },
    ],
    abstract:
      "The massive deployment of distributed energy resources (DERs)—including intermittent rooftop photovoltaics, utility-scale wind farms, and localized battery storage systems—imposes non-stationary stochastic perturbations on modernized electrical distribution infrastructures. Conventional centralized supervisory control and data acquisition (SCADA) and vulnerability to communication delays.",
  },
  2: {
    authors: [
      { name: "Dr. Sarah Al-Mansoor", sup: "1"   },
      { name: "T. K. Gupta",          sup: "1,2" },
    ],
    affiliations: [
      { sup: "1", text: "Institute of Molecular Diagnostics, Dubai" },
      { sup: "2", text: "Center for RNA Therapeutics, Singapore" },
    ],
    journal: "Nature Biotechnology",
    accepted: "Dec 03, 2024",
    indexed: ["Scopus Indexed", "Web of Science", "CrossRef Synced"],
    sdgs: [
      { label: "SDG 3: Good Health & Well-Being", color: "green" },
      { label: "SDG 4: Quality Education",        color: "red"   },
    ],
    abstract:
      "Evaluation of targeted sequence cleavage kinetics using programmable RNA-guided nucleases in clinical pathogen detection workflows. We characterize off-target landscapes and demonstrate single-cell transcriptome resolution for emerging infectious agents.",
  },
  3: {
    authors: [
      { name: "David K. Lindqvist", sup: "1" },
      { name: "Elena Rostova",      sup: "2" },
    ],
    affiliations: [
      { sup: "1", text: "Pacific Climate Observatory, Honolulu" },
      { sup: "2", text: "Institute of Coastal Ecology, Vladivostok" },
    ],
    journal: "Environmental Research",
    accepted: "Nov 20, 2024",
    indexed: ["Scopus Indexed", "Web of Science", "CrossRef Synced"],
    sdgs: [
      { label: "SDG 13: Climate Action",     color: "green"  },
      { label: "SDG 14: Life Below Water",   color: "orange" },
    ],
    abstract:
      "A multi-tiered hydrological and atmospheric hydrodynamic coupled model for predicting climate variability in coastal micro-ecosystems. High-density elevation grids reveal Pacific coastal vulnerability under rising sea-surface temperature scenarios.",
  },
  4: {
    authors: [
      { name: "Prof. Aris Thorne", sup: "1"   },
      { name: "J. H. Miller",      sup: "1,2" },
    ],
    affiliations: [
      { sup: "1", text: "Quantum Materials Laboratory, Cambridge" },
      { sup: "2", text: "Center for Topological Physics, Munich" },
    ],
    journal: "Physical Review B",
    accepted: "Oct 08, 2024",
    indexed: ["Scopus Indexed", "Web of Science", "CrossRef Synced"],
    sdgs: [
      { label: "SDG 9: Industry & Innovation", color: "orange" },
      { label: "SDG 4: Quality Education",     color: "red"    },
    ],
    abstract:
      "Experimental spectroscopic confirmation of chiral Majorana zero-mode surface states in van der Waals heterostructures. Angle-resolved photoemission reveals topological surface states consistent with quasi-two-dimensional superconductivity.",
  },
  5: {
    authors: [
      { name: "K. Tanaka",     sup: "1" },
      { name: "Eleanor Vance", sup: "2" },
    ],
    affiliations: [
      { sup: "1", text: "Robotics & Embedded Systems Lab, Osaka" },
      { sup: "2", text: "Department of Electrical Engineering & Computer Science, Veritas Institute of Technology" },
    ],
    journal: "ACM Transactions on Embedded Computing",
    accepted: "Sep 15, 2024",
    indexed: ["Scopus Indexed", "Web of Science", "CrossRef Synced"],
    sdgs: [
      { label: "SDG 9: Industry & Innovation",    color: "orange" },
      { label: "SDG 3: Good Health & Well-Being", color: "green"  },
    ],
    abstract:
      "Demonstration of a hardware-in-the-loop constrained neural search strategy enabling sub-10ms inference on ARM Cortex-M7. Hardware-aware NAS benchmarks and FPGA-based accelerators validate real-time edge robotics navigation.",
  },
  6: {
    authors: [
      { name: "Maria Santos", sup: "1" },
      { name: "B. Hartono",   sup: "2" },
    ],
    affiliations: [
      { sup: "1", text: "Green Chemistry & Biorefinery Group, Manila" },
      { sup: "2", text: "Center for Circular Materials, Bandung" },
    ],
    journal: "Green Chemistry",
    accepted: "Aug 22, 2024",
    indexed: ["Scopus Indexed", "Web of Science", "CrossRef Synced"],
    sdgs: [
      { label: "SDG 12: Responsible Consumption", color: "green"  },
      { label: "SDG 9: Industry & Innovation",    color: "orange" },
    ],
    abstract:
      "A circular biorefinery strategy utilizing ionic liquid dissolution to synthesize high-strength composite panels from rice husk and sugarcane bagasse. Lignocellulose pre-treatment reviews contextualize the circular economy in agricultural biomass.",
  },
};
