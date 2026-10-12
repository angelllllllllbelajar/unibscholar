// Extra per-publication modal data (affiliations, journal info, SDG tags, index tags)
export const modalDetails = {
  1: {
    authorsFull: [
      { name: "Eleanor Vance",    num: "1,2", orcid: true },
      { name: "Marcus Chen, FIEEE", num: "1,3", orcid: true },
      { name: "K. Tanaka",        num: "3",   orcid: true },
      { name: "Brian Yuliarto",   num: "4",   orcid: true },
    ],
    affiliations: [
      "1 Department of Electrical Engineering & Computer Science, Veritas Institute of Technology",
      "2 Laboratory for Autonomous Energy Networks, Zurich",
      "3 Department of Applied Cybernetics, Tokyo",
      "4 Advanced Energy Conversion Materials Lab, Bandung",
    ],
    journal: "IEEE Transactions on Smart Grid",
    accepted: "Jan 12, 2025",
    indexTags: ["Scopus Indexed", "Web of Science", "CrossRef Synced"],
    sdgTags: [
      { label: "SDG 3: Good Health & Well-Being", color: "#4CAF50" },
      { label: "SDG 9: Industry & Innovation",    color: "#FF9800" },
      { label: "SDG 4: Quality Education",         color: "#F44336" },
    ],
    abstractFull:
      "The massive deployment of distributed energy resources (DERs)—including intermittent rooftop photovoltaics, utility-scale wind farms, and localized battery storage systems—imposes non-stationary stochastic perturbations on modernized electrical distribution infrastructures. Conventional centralized supervisory control and data acquisition (SCADA) and vulnerability to communication delays.",
  },
  2: {
    authorsFull: [
      { name: "Dr. Sarah Al-Mansoor", num: "1",   orcid: true },
      { name: "T. K. Gupta",          num: "1,2", orcid: true },
    ],
    affiliations: [
      "1 Department of Biochemistry & Molecular Medicine, National Health Sciences University",
      "2 Institute for RNA Biology, Singapore",
    ],
    journal: "Nature Biotechnology",
    accepted: "Dec 4, 2024",
    indexTags: ["Scopus Indexed", "Web of Science", "CrossRef Synced"],
    sdgTags: [
      { label: "SDG 3: Good Health & Well-Being", color: "#4CAF50" },
      { label: "SDG 9: Industry & Innovation",    color: "#FF9800" },
    ],
    abstractFull:
      "Evaluation of targeted sequence cleavage kinetics using programmable RNA-guided nucleases in clinical pathogen detection workflows. We demonstrate multiplexed CRISPR-Cas13 arrays capable of identifying 12 concurrent pathogen signatures with femtomolar sensitivity, achieving a 94% clinical concordance rate across 847 patient samples in blinded trials.",
  },
  3: {
    authorsFull: [
      { name: "David K. Lindqvist", num: "1",   orcid: true },
      { name: "Elena Rostova",      num: "1,2", orcid: true },
    ],
    affiliations: [
      "1 Department of Environmental Systems Science, Pacific Coastal Research Center",
      "2 Institute for Atmospheric Modeling, Bergen",
    ],
    journal: "Environmental Research",
    accepted: "Nov 18, 2024",
    indexTags: ["Scopus Indexed", "Web of Science", "CrossRef Synced"],
    sdgTags: [
      { label: "SDG 13: Climate Action",          color: "#009688" },
      { label: "SDG 14: Life Below Water",        color: "#2196F3" },
      { label: "SDG 15: Life on Land",            color: "#8BC34A" },
    ],
    abstractFull:
      "A multi-tiered hydrological and atmospheric hydrodynamic coupled modeling framework designed to simulate high-resolution climate dynamics in Pacific coastal micro-ecosystems. By integrating real-time regional surface temperature data and high-density elevation grids, our model achieves 30-year hindcast RMSE improvements of 18% over existing regional ocean–atmosphere models.",
  },
  4: {
    authorsFull: [
      { name: "Prof. Aris Thorne", num: "1",   orcid: true },
      { name: "J. H. Miller",      num: "1,2", orcid: true },
    ],
    affiliations: [
      "1 Department of Condensed Matter Physics, European Institute for Advanced Study",
      "2 Quantum Materials Laboratory, ETH Zurich",
    ],
    journal: "Physical Review B",
    accepted: "Oct 5, 2024",
    indexTags: ["Scopus Indexed", "Web of Science", "CrossRef Synced"],
    sdgTags: [
      { label: "SDG 9: Industry & Innovation", color: "#FF9800" },
    ],
    abstractFull:
      "Experimental spectroscopic confirmation of chiral Majorana zero-mode surface states in van der Waals heterostructures at millikelvin temperatures. Using angle-resolved photoemission spectroscopy (ARPES) and scanning tunneling microscopy, we map the topological band structure of TaS2/Bi2Te3 bilayers, providing direct evidence for proximity-induced topological superconductivity.",
  },
  5: {
    authorsFull: [
      { name: "K. Tanaka",       num: "1",   orcid: true },
      { name: "Eleanor Vance",   num: "2",   orcid: true },
    ],
    affiliations: [
      "1 Department of Robotics & Autonomous Systems, Tokyo Institute of Technology",
      "2 Embedded AI Laboratory, Veritas Institute of Technology",
    ],
    journal: "ACM Transactions on Embedded Computing Systems",
    accepted: "Sep 1, 2024",
    indexTags: ["Scopus Indexed", "CrossRef Synced"],
    sdgTags: [
      { label: "SDG 9: Industry & Innovation", color: "#FF9800" },
      { label: "SDG 4: Quality Education",     color: "#F44336" },
    ],
    abstractFull:
      "Demonstration of a hardware-in-the-loop constrained neural search strategy enabling sub-10ms inference on ARM Cortex-M7. Our NAS pipeline incorporates latency-aware proxies that reduce search cost by 40× while maintaining top-1 accuracy parity on EdgeBench-v2 relative to manually designed baselines.",
  },
  6: {
    authorsFull: [
      { name: "Maria Santos", num: "1",   orcid: true },
      { name: "B. Hartono",   num: "1,2", orcid: true },
    ],
    affiliations: [
      "1 Department of Green Chemistry & Sustainable Materials, Universitas Bengkulu",
      "2 Centre for Biomass Valorisation, Bandung Institute of Technology",
    ],
    journal: "Green Chemistry",
    accepted: "Aug 20, 2024",
    indexTags: ["Scopus Indexed", "Web of Science", "CrossRef Synced"],
    sdgTags: [
      { label: "SDG 2: Zero Hunger",                  color: "#FFC107" },
      { label: "SDG 12: Responsible Consumption",     color: "#795548" },
      { label: "SDG 13: Climate Action",              color: "#009688" },
    ],
    abstractFull:
      "A circular biorefinery strategy utilizing ionic liquid dissolution to synthesize high-strength composite panels from rice husk and sugarcane bagasse. Tensile strength tests confirm a 35% improvement over conventional particleboard while reducing embodied carbon by 62%, validated against ISO 16983 standards across 5 independent production batches.",
  },
};
