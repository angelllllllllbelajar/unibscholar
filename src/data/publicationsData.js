// ─── Mock Publications Data ───────────────────────────────────────────────────
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
  { name: "FKIK",  count: 941, checked: true  },
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
