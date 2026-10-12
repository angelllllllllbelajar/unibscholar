import React, { useState, useMemo } from "react";
import SearchBar from "../components/shared/SearchBar";
import {
  FilterSidebar,
  FilterSection,
  FilterCheckRow,
  FilterSearch,
  FilterLink,
} from "../components/shared/FilterSidebar";
import ProjectTimeline from "../components/publications/ProjectTimeline";
import Pagination from "../components/publications/Pagination";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectModal from "../components/projects/ProjectModal";
import {
  projects,
  studyCenters,
  projectTopics,
  fundingSchemes,
  projectSdgGoals,
  SDG_INITIAL_COUNT,
  PROJECTS_TOTAL,
  PROJECTS_TOTAL_PAGES,
  PROJECTS_PER_PAGE,
  YEAR_MIN,
  YEAR_MAX,
} from "../data/projectsData";
import "../styles/pages/publications.css"; // reuse same page shell styles

export default function ProjectsPage() {
  const [query,        setQuery]        = useState("");
  const [page,         setPage]         = useState(1);
  const [yearStart,    setYearStart]    = useState(YEAR_MIN);
  const [yearEnd,      setYearEnd]      = useState(YEAR_MAX);
  const [topicsSearch, setTopicsSearch] = useState("");
  const [sdgExpanded,  setSdgExpanded]  = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [checkedCenters, setCheckedCenters] = useState(() =>
    Object.fromEntries(studyCenters.map((s) => [s.name, !!s.checked]))
  );
  const [checkedTopics,  setCheckedTopics]  = useState({});
  const [checkedSchemes, setCheckedSchemes] = useState(() =>
    Object.fromEntries(fundingSchemes.map((f) => [f.name, !!f.checked]))
  );
  const [checkedSdgs, setCheckedSdgs] = useState({});

  const [centerOpen,  setCenterOpen]  = useState(true);
  const [topicsOpen,  setTopicsOpen]  = useState(true);
  const [schemesOpen, setSchemesOpen] = useState(true);
  const [sdgOpen,     setSdgOpen]     = useState(true);

  const toggle = (setter, key) => setter((prev) => ({ ...prev, [key]: !prev[key] }));

  const resetFilters = () => {
    setCheckedCenters(Object.fromEntries(studyCenters.map((s) => [s.name, false])));
    setCheckedTopics({});
    setCheckedSchemes(Object.fromEntries(fundingSchemes.map((f) => [f.name, false])));
    setCheckedSdgs({});
    setTopicsSearch("");
    setQuery("");
    setYearStart(YEAR_MIN);
    setYearEnd(YEAR_MAX);
    setSdgExpanded(false);
    setPage(1);
  };

  // ── Live search + filter against dummy data ────────────────────────────────
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((proj) => {
      // Text search: title, lead PI, contributors, code
      if (q) {
        const haystack = [
          proj.title,
          proj.leadPI,
          proj.code,
          ...proj.contributors,
        ].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      // Study center / faculty filter
      const anyCenter = Object.values(checkedCenters).some(Boolean);
      if (anyCenter && !checkedCenters[proj.faculty]) return false;

      // Funding scheme filter
      const anyScheme = Object.values(checkedSchemes).some(Boolean);
      if (anyScheme && !checkedSchemes[proj.fundingScheme]) return false;

      return true;
    });
  }, [query, checkedCenters, checkedSchemes]);

  const visibleProjects = filtered.slice(0, PROJECTS_PER_PAGE);

  const displayTotal = query ||
    Object.values(checkedCenters).some(Boolean) ||
    Object.values(checkedSchemes).some(Boolean)
    ? filtered.length
    : PROJECTS_TOTAL;

  const selectedCenterCount = Object.values(checkedCenters).filter(Boolean).length;

  const visibleSdgs = sdgExpanded
    ? projectSdgGoals
    : projectSdgGoals.slice(0, SDG_INITIAL_COUNT);

  return (
    <div className="page-root">
      {/* Hero search bar — same component and style as Publications */}
      <SearchBar
        value={query}
        onChange={(v) => { setQuery(v); setPage(1); }}
        onSubmit={() => setPage(1)}
        placeholder="Search projects by title, PI name, or code..."
      />

      <div className="page-container page-body">
        {/* ── SIDEBAR — identical CSS classes to Publications ── */}
        <FilterSidebar onReset={resetFilters}>
          {/* Project Timeline — same component */}
          <ProjectTimeline
            yearStart={yearStart}
            yearEnd={yearEnd}
            setYearStart={setYearStart}
            setYearEnd={setYearEnd}
          />

          {/* Study Center */}
          <FilterSection
            title={
              <span className="flex items-center gap-2">
                Study Center
                {selectedCenterCount > 0 && (
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      background: "var(--color-navy)",
                      color: "#fff",
                      padding: "1px 7px",
                      borderRadius: "999px",
                    }}
                  >
                    {selectedCenterCount} selected
                  </span>
                )}
              </span>
            }
            open={centerOpen}
            onToggle={() => setCenterOpen((v) => !v)}
          >
            <div className="filter-list">
              {studyCenters.map((s) => (
                <FilterCheckRow
                  key={s.name}
                  id={`center-${s.name}`}
                  label={s.name}
                  count={s.count}
                  checked={!!checkedCenters[s.name]}
                  onChange={() => toggle(setCheckedCenters, s.name)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Topics */}
          <FilterSection title="Topics" open={topicsOpen} onToggle={() => setTopicsOpen((v) => !v)}>
            <FilterSearch value={topicsSearch} onChange={setTopicsSearch} />
            <div className="filter-list">
              {projectTopics
                .filter((t) => t.name.toLowerCase().includes(topicsSearch.toLowerCase()))
                .map((t) => (
                  <FilterCheckRow
                    key={t.name}
                    id={`ptopic-${t.name}`}
                    label={t.name}
                    count={t.count}
                    checked={!!checkedTopics[t.name]}
                    onChange={() => toggle(setCheckedTopics, t.name)}
                  />
                ))}
            </div>
          </FilterSection>

          {/* Funding Schemes */}
          <FilterSection title="Funding Schemes" open={schemesOpen} onToggle={() => setSchemesOpen((v) => !v)}>
            <div className="filter-list">
              {fundingSchemes.map((f) => (
                <FilterCheckRow
                  key={f.name}
                  id={`scheme-${f.name}`}
                  label={f.name}
                  count={f.count}
                  checked={!!checkedSchemes[f.name]}
                  onChange={() => toggle(setCheckedSchemes, f.name)}
                />
              ))}
            </div>
          </FilterSection>

          {/* SDG */}
          <FilterSection title="SDG" open={sdgOpen} onToggle={() => setSdgOpen((v) => !v)}>
            <div className="filter-list">
              {visibleSdgs.map((s) => (
                <FilterCheckRow
                  key={s.name}
                  id={`psdg-${s.name}`}
                  label={s.name}
                  count={s.count}
                  checked={!!checkedSdgs[s.name]}
                  onChange={() => toggle(setCheckedSdgs, s.name)}
                />
              ))}
            </div>
            <FilterLink onClick={() => setSdgExpanded((v) => !v)}>
              {sdgExpanded ? "Show Less" : "Show More"}
            </FilterLink>
          </FilterSection>
        </FilterSidebar>

        {/* ── MAIN CONTENT ── */}
        <div className="page-main">
          {/* Results header */}
          <div className="pub-results-header">
            <p className="pub-results-text">
              Now showing{" "}
              <strong>1 – {Math.min(PROJECTS_PER_PAGE, visibleProjects.length)}</strong> of{" "}
              <strong>{displayTotal.toLocaleString()}</strong> research projects
              {query && (
                <span className="text-gray-400 font-normal">
                  {" "}for "<em>{query}</em>"
                </span>
              )}
            </p>
          </div>

          {/* Cards */}
          {visibleProjects.length > 0 ? (
            <div className="flex flex-col gap-4">
              {visibleProjects.map((proj) => (
                <ProjectCard
                  key={proj.id}
                  project={proj}
                  onOpen={() => setSelectedProject(proj)}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-semibold" style={{ color: "var(--color-navy)" }}>
                No projects found
              </p>
              <p className="text-sm mt-1">Try a different keyword or reset the filters.</p>
            </div>
          )}

          {/* Pagination — identical component to Publications */}
          <Pagination
            current={page}
            total={PROJECTS_TOTAL_PAGES}
            perPage={PROJECTS_PER_PAGE}
            onChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
