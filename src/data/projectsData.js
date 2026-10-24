// ── Mock Projects Data ────────────────────────────────────────────────────────
export const PROJECTS_TOTAL      = 11144;
export const PROJECTS_PER_PAGE   = 5;
export const MAX_PAGES_DEMO      = 100;
export const PROJECTS_TOTAL_PAGES = Math.min(
  Math.ceil(PROJECTS_TOTAL / PROJECTS_PER_PAGE),
  MAX_PAGES_DEMO
);

export const YEAR_MIN = 2006;
export const YEAR_MAX = 2026;

export const projects = [
  {
    id: 1,
    code: "FMIPA.PPMI-1-23-2026",
    grantType: "RESEARCH GRANT",
    grantStatus: "FUNDED",
    year: 2026,
    title: "Pengembangan Kerangka Terintegrasi Berbasis Moving Particle Semi-Implicit (MPS) untuk Analisis Interaksi Aliran dan Degradasi Material pada Sistem Reaktor Nuklir Generasi IV Berpendingin Cair",
    institution: "Universitas Bengkulu",
    program: "PPMI FMIPA UNIB 2026",
    abstract: "Pengembangan simulasi hidrodinamika partikel terpadu untuk mengevaluasi fenomena degradasi struktural dan perpindahan panas fluida pada teras reaktor Generasi IV. Model ini mengatasi singularitas interaksi batas fluida-padat dalam kondisi ekstrem.",
    leadPI: "Asril Pramutadi Andi Mustari",
    contributors: ["Dwi Irwanto", "Syeliendra Pramuditya"],
    extraCount: 2,
    faculty: "FMIPA",
    topics: ["Nuclear & Reactor Physics"],
    sdgs: ["GOAL 7: Affordable and Clean Energy"],
    fundingScheme: "PNBP/BLU UNIB",
  },
  {
    id: 2,
    code: "FMIPA.PPMI-1-1-2026",
    grantType: "RESEARCH GRANT",
    grantStatus: "FUNDED",
    year: 2026,
    title: "Aljabar-C* Universal Berdimensi Hingga yang Dibangun oleh Suatu Isometri Parsial",
    institution: "Universitas Bengkulu",
    program: "PPMI FMIPA UNIB 2026",
    abstract: "Karakterisasi struktur aljabar operator C* berdimensi hingga melalui representasi isometri parsial tunggal untuk aplikasi pemrosesan informasi kuantum dan pemodelan sistem dinamik non-komutatif.",
    leadPI: "Hanni Garminia Y.",
    contributors: ["Afif Humam", "Pudji Astuti Waluyo"],
    extraCount: 5,
    faculty: "FMIPA",
    topics: ["Operator Algebras"],
    sdgs: ["GOAL 4: Quality Education", "GOAL 9: Industry, Innovation and Infrastructure"],
    fundingScheme: "Penelitian Fundamental Unib",
  },
  {
    id: 3,
    code: "DRI.PN-6-263-2026",
    grantType: "INTERNATIONAL CONSORTIUM",
    grantStatus: "CONFERENCE",
    year: 2026,
    title: "PKI - IDRiM 2026: Resilient Cities in Multi-Hazard Crises: Bridging Innovation, Implementation Science, and Grassroots Action",
    institution: "Universitas Bengkulu",
    program: "Bantuan Penyelenggaraan Konferensi Internasional 2026",
    abstract: "Inisiatif kolaborasi internasional dalam manajemen risiko multi-bencana perkotaan, mengintegrasikan riset kebijakan, sains implementasi, dan pemberdayaan komunitas lokal untuk kesiapsiagaan iklim ekstrem regional.",
    leadPI: "Saut Aritua Hasiholan Sagala",
    contributors: [],
    extraCount: 0,
    faculty: "FT",
    topics: ["Disaster Risk Reduction"],
    sdgs: ["GOAL 11: Sustainable Cities and Communities", "GOAL 13: Climate Action"],
    fundingScheme: "PNBP/BLU UNIB",
  },
  {
    id: 4,
    code: "DRI.PN-14-113-2026",
    grantType: "NATIONAL GRANT",
    grantStatus: "STRATEGIC",
    year: 2026,
    title: "BOPTN - Prosesor Audio DSP Berbasis AI untuk Aplikasi Audio Cerdas",
    institution: "Universitas Bengkulu",
    program: "Penelitian Baru Kemdiktianstek Tahun 2026",
    abstract: "Perancangan arsitektur silikon microchip digital signal processor (DSP) terakselerasi neural network ultra-low power untuk peredam bising adaptif dan pengenalan wicara pada perangkat edge IoT.",
    leadPI: "Trio Adiono",
    contributors: ["Nana Sutisna"],
    extraCount: 0,
    faculty: "FT",
    topics: ["AI Audio DSP & Embedded"],
    sdgs: ["GOAL 9: Industry, Innovation and Infrastructure"],
    fundingScheme: "PNBP/BLU UNIB",
  },
  {
    id: 5,
    code: "FKIK.PPMI-3-7-2025",
    grantType: "RESEARCH GRANT",
    grantStatus: "FUNDED",
    year: 2025,
    title: "Analisis Biomarker Inflamasi pada Pasien COVID-19 dengan Komorbiditas Metabolik di Bengkulu",
    institution: "Universitas Bengkulu",
    program: "PPMI FKIK UNIB 2025",
    abstract: "Identifikasi panel biomarker inflamasi sistemik yang memprediksi keparahan COVID-19 pada populasi dengan diabetes tipe-2 dan hipertensi di wilayah Bengkulu melalui studi kohort prospektif.",
    leadPI: "Dr. Ratna Dewi Puspita Sari",
    contributors: ["Dr. Hendra Kusuma", "Ayu Lestari"],
    extraCount: 3,
    faculty: "FKIK",
    topics: ["Biomedical Sciences"],
    sdgs: ["GOAL 3: Good Health and Well-Being"],
    fundingScheme: "Penelitian Terapan (PT-Unib)",
  },
  {
    id: 6,
    code: "FEB.PKDN-2-19-2025",
    grantType: "NATIONAL GRANT",
    grantStatus: "FUNDED",
    year: 2025,
    title: "Strategi Pengembangan Ekonomi Pesisir Berkelanjutan di Provinsi Bengkulu: Pendekatan Blue Economy",
    institution: "Universitas Bengkulu",
    program: "PKDN-Unib 2025",
    abstract: "Kajian komprehensif potensi dan hambatan implementasi blue economy pada sektor perikanan dan pariwisata bahari Bengkulu, dengan rekomendasi kebijakan berbasis data lapangan dan pemodelan ekonometrik.",
    leadPI: "Prof. Dr. Kamaludin",
    contributors: ["Dr. Febrian Husin", "Marleni Zulhakim"],
    extraCount: 1,
    faculty: "FEB",
    topics: ["Geophysical Exploration"],
    sdgs: ["GOAL 14: Life Below Water", "GOAL 8: Decent Work and Economic Growth"],
    fundingScheme: "PKDN-Unib",
  },
];

export const studyCenters = [
  { name: "FMIPA", count: 2463, checked: false },
  { name: "FEB",   count: 1961, checked: false },
  { name: "FH",    count: 1506, checked: false },
  { name: "FKIK",  count: 1340, checked: false },
  { name: "FT",    count: 982,  checked: false },
  { name: "FISIP", count: 741,  checked: false },
  { name: "FP",    count: 654,  checked: false },
  { name: "FKIP",  count: 530,  checked: false },
];

export const principalInvestigators = [
  { name: "Asril Pramutadi Andi Mustari",  count: 287 },
  { name: "Hanni Garminia Y.",             count: 214 },
  { name: "Saut Aritua Hasiholan Sagala",  count: 176 },
  { name: "Trio Adiono",                   count: 149 },
  { name: "Dr. Ratna Dewi Puspita Sari",   count: 118 },
  { name: "Prof. Dr. Kamaludin",           count: 96  },
];

export const projectTopics = [
  { name: "Nuclear & Reactor Physics", count: 412 },
  { name: "Geophysical Exploration",   count: 331 },
  { name: "Operator Algebras",         count: 218 },
  { name: "Disaster Risk Reduction",   count: 176 },
  { name: "AI Audio DSP & Embedded",   count: 145 },
];

export const fundingSchemes = [
  { name: "PNBP/BLU UNIB",             count: 3810, checked: false },
  { name: "Penelitian Fundamental Unib", count: 2450, checked: false },
  { name: "Penelitian Terapan (PT-Unib)", count: 1120, checked: false },
  { name: "PKDN-Unib",                  count: 540,  checked: false },
  { name: "Hibah Dikti",                count: 312,  checked: false },
  { name: "BOPTN Kemdikbud",            count: 287,  checked: false },
];

export const projectSdgGoals = [
  { name: "GOAL 1: No Poverty",                          count: 312 },
  { name: "GOAL 2: Zero Hunger",                         count: 92  },
  { name: "GOAL 3: Good Health and Well-Being",          count: 98  },
  { name: "GOAL 4: Quality Education",                   count: 67  },
  { name: "GOAL 5: Gender Equality",                     count: 54  },
  { name: "GOAL 6: Clean Water and Sanitation",          count: 43  },
  { name: "GOAL 7: Affordable and Clean Energy",         count: 78  },
  { name: "GOAL 8: Decent Work and Economic Growth",     count: 61  },
  { name: "GOAL 9: Industry, Innovation and Infrastructure", count: 55 },
  { name: "GOAL 11: Sustainable Cities and Communities", count: 47  },
  { name: "GOAL 13: Climate Action",                     count: 89  },
  { name: "GOAL 14: Life Below Water",                   count: 26  },
];

export const SDG_INITIAL_COUNT = 4;
