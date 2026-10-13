// ─── Mock data for the Admin Researcher Profile Management page ──────────────

export const editingResearcher = {
  initials: "EV",
  name: "Prof. Dr. Eleanor Vance, Ph.D.",
  id: "0014028201",
  photo: "/researcher-placeholder.png",
};

export const profileFields = [
  { label: "Full Name & Academic Titles",    value: "Prof. Dr. Eleanor Vance, Ph.D.",              mono: false },
  { label: "Academic Title / Rank",          value: "Full Professor (Guru Besar)",                 mono: false },
  { label: "Employee / Faculty ID (NIDN)",   value: "0014028201",                                  mono: true  },
  { label: "Faculty",                        value: "Faculty of Electrical Engineering & Informatics", mono: false },
  { label: "Official University Email",      value: "eleanor.vance@university.ac.id",              mono: false },
];

export const externalIds = [
  { label: "ORCID ID",         value: "0000-0002-1825-0097" },
  { label: "Scopus Author ID", value: "7004182910"          },
  { label: "Google Scholar ID", value: "vance_e_2026"      },
];

export const researchTopics = [
  "Autonomous Computing",
  "Deep Reinforcement Learning",
  "Smart Grid Systems",
  "Edge Robotics",
  "Cyber-Physical Security",
];

export const sdgAssignments = [
  { num: "07", label: "Affordable & Clean Energy",      pubs: 19, color: "#f59e0b" },
  { num: "09", label: "Industry, Innovation & Infrast", pubs: 24, color: "#ea580c" },
  { num: "11", label: "Sustainable Cities & Commur",    pubs: 12, color: "#f97316" },
  { num: "13", label: "Climate Action",                 pubs: 8,  color: "#16a34a" },
];

export const assignedPublications = [
  {
    id: 1,
    title: "Deep Multi-Agent Reinforcement Learning for Distributed Smart Grids",
    venue: "IEEE",
    year: 2025,
    verified: true,
  },
  {
    id: 2,
    title: "Consensus-Based Distributed Control in Islanded",
    venue: "IEEE Transactions on Power Systems",
    year: 2025,
    doi: "10.1109/TPS.2024.1209",
  },
  {
    id: 3,
    title: "Neural Architecture Search for Real-Time Edge Ro",
    venue: "ACM Trans. Embedded Comput. Syst.",
    year: 2024,
    citations: 38,
  },
  {
    id: 4,
    title: "Deep Multi-Agent Reinforcement Learning for Distributed Smart Grids",
    venue: "IEEE",
    year: 2025,
    verified: true,
  },
];

export const assignedProjects = [
  {
    id: 1,
    title: "Decentralized Smart Grid Control Testbed",
    venue: "Kemdiktisaintek",
    year: 2026,
    verified: true,
  },
  {
    id: 2,
    title: "Edge Robotics Navigation Consortium",
    venue: "BRIN",
    year: 2025,
    doi: "10.1109/TPS.2024.1209",
  },
  {
    id: 3,
    title: "Hybrid Energy Storage Materials Lab",
    venue: "LPDP",
    year: 2024,
    citations: 38,
  },
];

export const PUB_TOTAL     = 42;
export const PROJECT_TOTAL = 18;
