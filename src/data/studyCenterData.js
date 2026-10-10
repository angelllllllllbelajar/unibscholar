// ─── Mock data & constants for the Study Center pages ───────────────────────

export const SC_SHOWN = 7;
export const SC_TOTAL = 10;
export const SC_PAGES = 2;

export const unitMembers = [
  { id: 1, name: "Aldila Rizkiana, S.T., M.T.",         role: "Asisten Ahli",                hindex: 3,  pubs: 6,  projects: 3  },
  { id: 2, name: "Anggita Leviastuti, S.T., M.Sc.",     role: "Asisten Ahli",                hindex: 2,  pubs: 3,  projects: 1  },
  { id: 3, name: "Dr. Ir. Budhi Prihartono, DEA",       role: "Lektor Kepala",               hindex: 7,  pubs: 35, projects: 8  },
  { id: 4, name: "Prof. Dr. Ir. Hasrini Sari, M.T.",    role: "Guru Besar (Full Professor)", hindex: 5,  pubs: 45, projects: 12 },
  { id: 5, name: "Dr. Ir. Indryati Sunaryo, M.Sc.",     role: "Lektor Kepala",               hindex: 8,  pubs: 25, projects: 1  },
  { id: 6, name: "Dr. Rajesri Govindaraju, S.T., M.T.", role: "Lektor Kepala",               hindex: 9,  pubs: 41, projects: 9  },
  { id: 7, name: "Dr. Eng. Ir. Rina Wati, S.T., M.T.",  role: "Lektor Kepala",               hindex: 6,  pubs: 28, projects: 5  },
  { id: 8, name: "Ir. Bagus Setiawan, S.T., M.Sc.",     role: "Asisten Ahli",                hindex: 4,  pubs: 9,  projects: 2  },
  { id: 9, name: "Dr. Ir. Siti Maryam, M.T.",           role: "Guru Besar (Full Professor)", hindex: 10, pubs: 52, projects: 14 },
];

export const MEMBER_DEPT = "Industrial Management, Faculty of Industrial Technology";

export const unitResearchTopics = [
  {
    title: "Understanding Human Competence at Work",
    desc: "Ergonomics, behavioral competency modeling, cognitive workload evaluation, and human-machine interaction in smart factories.",
  },
  {
    title: "Innovation in Management Practices and Strategies",
    desc: "Agile organizational strategies, circular supply chain orchestration, corporate sustainability metrics, and lean operations.",
  },
  {
    title: "Management Information System in Business and Technology",
    desc: "Enterprise architecture, decision support ecosystems, AI-driven process mining, and IT governance for manufacturing sectors.",
  },
];

export const unitSdgIds = [1, 3, 4, 6, 7, 8, 9];

const sharedDetail = {
  sdgIds: unitSdgIds,
  researchTopics: unitResearchTopics,
  members: unitMembers,
};

export const units = [
  {
    id: 1,
    featured: true,
    badge: "Fakultas Pertanian",
    badgeIcon: "cap",
    title: "Pusat SDG'S dan Renper",
    email: "fti@unib.ac.id",
    url: "fti.unib.ac.id/fisika-teknik",
    kepala: "Adityo Pratikno Ramadhan, S.IP.,M.Sc., Ph.D.",
    stats: { members: 12, publications: 45, projects: 8 },
    memberChips: ["Angga Bakti Pratama", "Betseba Br Sibarani", "Dimas Taha Maulana", "Hendra Grandis", "Heru Berian"],
    moreCount: 3,
    facultyFull: "Fakultas Pertanian (FAPERTA)",
    detailEmail: "faperta@unib.ac.id",
    detailUrl: "faperta.unib.ac.id/fakultas-pertanian",
    kepalaFull: "Adityo Pratikno Ramadhan, S.IP.,M.Sc., Ph.D",
    pubs: 403,
    projects: 95,
    pubYears: [2004, 2026],
    projYears: [2006, 2026],
    ...sharedDetail,
  },
  {
    id: 2, badge: "Fakultas", badgeIcon: "fac",
    title: "Pusat Studi Mitigasi Bencana, Energi, dan Geospasial",
    email: "fti@unib.ac.id", url: "fti.unib.ac.id/fisika-teknik",
    kepala: "Prof. Dr. Drs. Mukhammad Farid, MS",
    facultyFull: "Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)",
    detailEmail: "fmipa@unib.ac.id", detailUrl: "fmipa.unib.ac.id/pusat-studi",
    kepalaFull: "Prof. Dr. Drs. Mukhammad Farid, MS",
    pubs: 187, projects: 41, pubYears: [2006, 2026], projYears: [2008, 2026],
    ...sharedDetail,
  },
  {
    id: 3, badge: "Fakultas", badgeIcon: "fac",
    title: "Pusat Studi Lingkungan dan Kehutanan",
    email: "fti@unib.ac.id", url: "fti.unib.ac.id/fisika-teknik",
    kepala: "Prof. Dr. Ir. Agus Susatya, M. Sc",
    facultyFull: "Fakultas Pertanian (FAPERTA)",
    detailEmail: "faperta@unib.ac.id", detailUrl: "faperta.unib.ac.id/fakultas-pertanian",
    kepalaFull: "Prof. Dr. Ir. Agus Susatya, M. Sc",
    pubs: 231, projects: 52, pubYears: [2005, 2026], projYears: [2007, 2026],
    ...sharedDetail,
  },
  {
    id: 4, badge: "Fakultas", badgeIcon: "fac",
    title: "Pusat Studi Gender, Keluarga, dan Pedesaan",
    email: "fti@unib.ac.id", url: "fti.unib.ac.id/fisika-teknik",
    kepala: "Dra. Yayah Chanafiah, M Hum.",
    facultyFull: "Fakultas Ilmu Sosial dan Ilmu Politik (FISIP)",
    detailEmail: "fisip@unib.ac.id", detailUrl: "fisip.unib.ac.id/pusat-studi",
    kepalaFull: "Dra. Yayah Chanafiah, M Hum.",
    pubs: 142, projects: 30, pubYears: [2007, 2026], projYears: [2009, 2026],
    ...sharedDetail,
  },
  {
    id: 5, badge: "Fakultas", badgeIcon: "fac",
    title: "Pusat Studi Pengelolaan Kawasan Pesisir dan Kelautan",
    email: "fti@unib.ac.id", url: "fti.unib.ac.id/fisika-teknik",
    kepala: "Dr. Ir. Deddy Bakhtiar, M. Si",
    facultyFull: "Fakultas Pertanian (FAPERTA)",
    detailEmail: "faperta@unib.ac.id", detailUrl: "faperta.unib.ac.id/fakultas-pertanian",
    kepalaFull: "Dr. Ir. Deddy Bakhtiar, M. Si",
    pubs: 168, projects: 36, pubYears: [2006, 2026], projYears: [2008, 2026],
    ...sharedDetail,
  },
  {
    id: 6, badge: "Fakultas", badgeIcon: "fac",
    title: "Pusat Studi Budaya, Sosial, Humaniora dan Literasi",
    email: "fti@unib.ac.id", url: "fti.unib.ac.id/fisika-teknik",
    kepala: "Prof. Dr. Drs. Sarwit Sarwono, M.Hum.",
    facultyFull: "Fakultas Ilmu Budaya (FIB)",
    detailEmail: "fib@unib.ac.id", detailUrl: "fib.unib.ac.id/pusat-studi",
    kepalaFull: "Prof. Dr. Drs. Sarwit Sarwono, M.Hum.",
    pubs: 121, projects: 24, pubYears: [2008, 2026], projYears: [2010, 2026],
    ...sharedDetail,
  },
  {
    id: 7, badge: "Fakultas", badgeIcon: "fac",
    title: "Pusat Pengelolaan Kawasan Hutan Dengan Tujuan Khusus (KHDTK)",
    email: "fti@unib.ac.id", url: "fti.unib.ac.id/fisika-teknik",
    kepala: "Dr. Ir. Enggar Apriyanto, M.Sc.",
    facultyFull: "Fakultas Pertanian (FAPERTA)",
    detailEmail: "faperta@unib.ac.id", detailUrl: "faperta.unib.ac.id/fakultas-pertanian",
    kepalaFull: "Dr. Ir. Enggar Apriyanto, M.Sc.",
    pubs: 154, projects: 33, pubYears: [2006, 2026], projYears: [2009, 2026],
    ...sharedDetail,
  },
  {
    id: 8, badge: "Fakultas", badgeIcon: "fac",
    title: "Pusat Studi Ketahanan Pangan dan Gizi",
    email: "fti@unib.ac.id", url: "fti.unib.ac.id/fisika-teknik",
    kepala: "Dr. Ir. Fitri Yulianti, M.Sc.",
    facultyFull: "Fakultas Pertanian (FAPERTA)",
    detailEmail: "faperta@unib.ac.id", detailUrl: "faperta.unib.ac.id/fakultas-pertanian",
    kepalaFull: "Dr. Ir. Fitri Yulianti, M.Sc.",
    pubs: 133, projects: 28, pubYears: [2007, 2026], projYears: [2009, 2026],
    ...sharedDetail,
  },
  {
    id: 9, badge: "Fakultas", badgeIcon: "fac",
    title: "Pusat Studi Energi Terbarukan dan Elektrifikasi Desa",
    email: "fti@unib.ac.id", url: "fti.unib.ac.id/fisika-teknik",
    kepala: "Dr. Eng. Ir. Andi Prasetyo, S.T., M.T.",
    facultyFull: "Fakultas Teknik (FT)",
    detailEmail: "ft@unib.ac.id", detailUrl: "ft.unib.ac.id/pusat-studi",
    kepalaFull: "Dr. Eng. Ir. Andi Prasetyo, S.T., M.T.",
    pubs: 176, projects: 39, pubYears: [2006, 2026], projYears: [2008, 2026],
    ...sharedDetail,
  },
  {
    id: 10, badge: "Fakultas", badgeIcon: "fac",
    title: "Pusat Studi Pariwisata dan Ekonomi Kreatif",
    email: "fti@unib.ac.id", url: "fti.unib.ac.id/fisika-teknik",
    kepala: "Dr. Rina Marlina, S.E., M.M.",
    facultyFull: "Fakultas Ekonomi dan Bisnis (FEB)",
    detailEmail: "feb@unib.ac.id", detailUrl: "feb.unib.ac.id/pusat-studi",
    kepalaFull: "Dr. Rina Marlina, S.E., M.M.",
    pubs: 118, projects: 22, pubYears: [2009, 2026], projYears: [2011, 2026],
    ...sharedDetail,
  },
];
