// ─── Mock data & constants for the admin Study Center Management page ────────

export const SC_ADMIN_SHOWN = 6;
export const SC_ADMIN_TOTAL = 10;
export const SC_ADMIN_PAGES = [1, 2];

// Only the first unit renders the full actions row (Edit / Manage Members /
// Delete) in the design; the rest stay compact.
export const adminStudyCenters = [
  {
    id: 1,
    expanded: true,
    title: "Pusat SDG'S dan Renper",
    faculty: "Fakultas Pertanian (FAPERTA)",
    head: "Prof. Dr. Eleanor Vance",
    url: "https://unib.ac.id/energy",
    email: "energy@unib.ac.id",
    stats: { members: 12, publications: 45, projects: 8 },
    sdgs: [
      { num: 7, label: "Affordable & Clean Energy", dot: "blue" },
      { num: 9, label: "Industry, Innovation & Infrastructure", dot: "blue" },
      { num: 11, label: "Sustainable Cities & Communities", dot: "green" },
    ],
  },
  {
    id: 2,
    title: "Pusat Studi Mitigasi Bencana, Energi, dan Geospasial",
    faculty: "Fakultas Teknik (FT)",
    head: "Prof. Dr. Drs. Mukhammad Farid, MS",
    url: "https://unib.ac.id/mitigasi",
    email: "mitigasi@unib.ac.id",
    stats: { members: 9, publications: 31, projects: 5 },
    sdgs: [
      { num: 11, label: "Sustainable Cities & Communities", dot: "green" },
      { num: 13, label: "Climate Action", dot: "green" },
    ],
  },
  {
    id: 3,
    title:
      "Pusat Studi Pengembangan Inovasi, Kekayaan Intelektual (HAKI), dan Pengembangan Inkubator Bisnis",
    faculty: "Fakultas Teknik (FT)",
    head: "Dr. Ir. Budhi Prihartono, DEA",
    url: "https://unib.ac.id/inovasi",
    email: "inovasi@unib.ac.id",
    stats: { members: 14, publications: 52, projects: 11 },
    sdgs: [
      { num: 9, label: "Industry, Innovation & Infrastructure", dot: "blue" },
      { num: 8, label: "Decent Work & Economic Growth", dot: "orange" },
    ],
  },
  {
    id: 4,
    title: "Pusat Pengelolaan Kawasan Hutan Dengan Tujuan Khusus (KHDTK)",
    faculty: "Fakultas Teknik (FT)",
    head: "Dr. Ir. Enggar Apriyanto, M.Sc.",
    url: "https://unib.ac.id/khdtk",
    email: "khdtk@unib.ac.id",
    stats: { members: 7, publications: 24, projects: 4 },
    sdgs: [
      { num: 15, label: "Life on Land", dot: "green" },
      { num: 13, label: "Climate Action", dot: "green" },
    ],
  },
  {
    id: 5,
    title: "Pusat Studi Budaya, Sosial, Humaniora dan Literasi",
    faculty: "Fakultas Teknik (FT)",
    head: "Prof. Dr. Drs. Sarwit Sarwono, M.Hum.",
    url: "https://unib.ac.id/budaya",
    email: "budaya@unib.ac.id",
    stats: { members: 11, publications: 38, projects: 6 },
    sdgs: [
      { num: 4, label: "Quality Education", dot: "red" },
      { num: 11, label: "Sustainable Cities & Communities", dot: "green" },
    ],
  },
  {
    id: 6,
    title: "Pusat Studi Pengelolaan Kawasan Pesisir dan Kelautan",
    faculty: "Fakultas Teknik (FT)",
    head: "Dr. Ir. Deddy Bakhtiar, M. Si",
    url: "https://unib.ac.id/pesisir",
    email: "pesisir@unib.ac.id",
    stats: { members: 8, publications: 27, projects: 5 },
    sdgs: [
      { num: 14, label: "Life Below Water", dot: "blue" },
      { num: 13, label: "Climate Action", dot: "green" },
    ],
  },
];

// Members shown in the "Manage Members" editor page for a study center unit.
export const scUnitMembers = [
  { id: 1, name: "Adityo Pratikno Ramadhan, S.IP., M.Sc., Ph.D.", role: "Head of Study Center" },
  { id: 2, name: "Angga Bakti Pratama, S.T., M.T.",               role: "Senior Researcher" },
  { id: 3, name: "Betseba Br Sibarani, S.Si., M.Sc.",             role: "Researcher" },
  { id: 4, name: "Dimas Taha Maulana, S.T., M.T.",                role: "Researcher" },
  { id: 5, name: "Hendra Grandis, S.T., M.Sc.",                   role: "Assistant Researcher" },
  { id: 6, name: "Heru Berian, S.T., M.T.",                       role: "Assistant Researcher" },
];

// Catalogue offered in the "Select SDG goal to map..." dropdown.
export const sdgCatalogue = [
  { num: 1, label: "No Poverty", dot: "red" },
  { num: 3, label: "Good Health & Well-being", dot: "green" },
  { num: 4, label: "Quality Education", dot: "red" },
  { num: 6, label: "Clean Water & Sanitation", dot: "blue" },
  { num: 7, label: "Affordable & Clean Energy", dot: "orange" },
  { num: 8, label: "Decent Work & Economic Growth", dot: "orange" },
  { num: 9, label: "Industry, Innovation & Infrastructure", dot: "blue" },
  { num: 11, label: "Sustainable Cities & Communities", dot: "green" },
  { num: 13, label: "Climate Action", dot: "green" },
  { num: 14, label: "Life Below Water", dot: "blue" },
  { num: 15, label: "Life on Land", dot: "green" },
];

// Blank form used when opening the "Add New Study Center" modal.
export const emptyUnitForm = {
  name: "",
  head: "",
  url: "",
  email: "",
};
