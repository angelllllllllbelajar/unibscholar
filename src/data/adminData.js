// ─── Mock data for the Admin dashboard ──────────────────────────────────────

export const adminStats = {
  researchers: 1204,
  publications: 450,
  grants: 95,
  funds: "$2.48M total funds",
};

export const pendingPublications = [
  {
    id: 1,
    title: "Deep Multi-Agent...",
    venue: "IEEE Trans. on Smart Grid",
    qualifier: "DOI: 10.1109/TSG.2025.3218",
    author: "Prof. Eleanor Vance",
    authorId: "0014028201",
    date: "Feb 12, 2026",
    source: { label: "Scopus API", variant: "blue", icon: "scopus" },
    status: "pending",
  },
  {
    id: 2,
    title: "Development of MPS...",
    venue: "Journal of Mechanical Engineering",
    qualifier: "SINTA 1 Accredited",
    author: "Asril Pramutadi, Ph.D.",
    authorId: "0022097904",
    date: "Feb 10, 2026",
    source: { label: "National Node", variant: "gray", icon: "node" },
    status: "pending",
  },
  {
    id: 3,
    title: "Nanomaterial Biosensors...",
    venue: "Biosensors & Bioelectronics",
    qualifier: "Impact Factor: 12.6",
    author: "Prof. Dr. Brian Yuliarto",
    authorId: "0019057503",
    date: "Feb 08, 2026",
    source: { label: "Scholar Node", variant: "gray", icon: "scholar" },
    status: "pending",
  },
  {
    id: 4,
    title: "Circular Economy in Agro-",
    venue: "Journal of Cleaner Production",
    qualifier: "Scopus Q1",
    author: "Dr. Ir. Budhi Prihartono",
    authorId: "0004116802",
    date: "Feb 05, 2026",
    source: { label: "WoS Core", variant: "blue", icon: "wos" },
    status: "approved",
  },
];

export const PENDING_COUNT = 14;
export const PENDING_SHOWN = 4;

export const adminUser = {
  name: "Dr. Eleanor Vance",
  role: "Admin",
  photo: "/researcher-placeholder.png",
};
