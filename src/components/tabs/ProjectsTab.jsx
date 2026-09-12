import { useState } from "react";
import { FiPlus, FiTrash2, FiArrowUp, FiArrowDown, FiExternalLink, FiGithub, FiChevronDown } from "react-icons/fi";

const ACCENT_COLOR_PRESETS = [
  { label: "Cyan", value: "var(--accent-cyan)", preview: "#00f0ff" },
  { label: "Purple", value: "var(--accent-purple)", preview: "#a855f7" },
  { label: "Amber", value: "var(--accent-amber)", preview: "#f59e0b" },
  { label: "F1 Red", value: "var(--accent-f1)", preview: "#e10600" },
  { label: "Emerald", value: "#10b981", preview: "#10b981" },
];

export default function ProjectsTab({ projects = [], onChange }) {
  const [techInputs, setTechInputs] = useState({});
  const [expandedProjects, setExpandedProjects] = useState(() => {
    // First project expanded by default
    const initial = {};
    if (projects.length > 0) initial[0] = true;
    return initial;
  });

  const toggleExpand = (idx) => {
    setExpandedProjects((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const updateProject = (idx, field, value) => {
    const updated = [...projects];
    updated[idx] = {
      ...updated[idx],
      [field]: value,
    };
    onChange(updated);
  };

  const updateProjectLinks = (idx, linkKey, value) => {
    const updated = [...projects];
    updated[idx] = {
      ...updated[idx],
      links: {
        ...(updated[idx].links || {}),
        [linkKey]: value || null,
      },
    };
    onChange(updated);
  };

  const addProject = () => {
    const newId = `project-${Date.now()}`;
    const newProj = {
      id: newId,
      name: "New High-Performance Project",
      tagline: "Ultra-fast next generation application",
      category: "WEB APP",
      techStack: ["React", "TypeScript", "Tailwind CSS"],
      highlight: "Sub-10ms response time and high reliability",
      description: "Describe what this project does, why it is innovative, and how it solves real user problems.",
      challenge: "Handling real-time state synchronization",
      architecture: "Modern component architecture",
      links: {
        demo: "https://demo.example.com",
        repo: "https://github.com/example/repo",
      },
      accentColor: "var(--accent-cyan)",
    };
    onChange([newProj, ...projects]);
    setExpandedProjects({ 0: true });
  };

  const removeProject = (idx) => {
    if (window.confirm("Are you sure you want to decommission this project?")) {
      onChange(projects.filter((_, i) => i !== idx));
    }
  };

  const moveProject = (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= projects.length) return;
    const updated = [...projects];
    const [moved] = updated.splice(idx, 1);
    updated.splice(targetIdx, 0, moved);
    onChange(updated);

    // Update expanded state
    setExpandedProjects((prev) => {
      const next = { ...prev };
      const wasExpanded = prev[idx];
      const targetWasExpanded = prev[targetIdx];
      next[targetIdx] = wasExpanded;
      next[idx] = targetWasExpanded;
      return next;
    });
  };

  const addTechTag = (projIdx) => {
    const currentInput = techInputs[projIdx] || "";
    if (!currentInput.trim()) return;
    const project = projects[projIdx];
    const updatedTech = [...(project.techStack || [])];
    if (!updatedTech.includes(currentInput.trim())) {
      updatedTech.push(currentInput.trim());
      updateProject(projIdx, "techStack", updatedTech);
    }
    setTechInputs({ ...techInputs, [projIdx]: "" });
  };

  const removeTechTag = (projIdx, tagToRemove) => {
    const project = projects[projIdx];
    const updatedTech = (project.techStack || []).filter((t) => t !== tagToRemove);
    updateProject(projIdx, "techStack", updatedTech);
  };

  const getAccentPreview = (accentColor) => {
    if (!accentColor) return "#00f0ff";
    const preset = ACCENT_COLOR_PRESETS.find((p) => p.value === accentColor);
    return preset ? preset.preview : accentColor;
  };

  return (
    <div className="admin-tab-content">
      <div className="admin-section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 className="admin-section-title">
            <span>PROJECTS GARAGE</span>
          </h2>
          <p className="admin-section-desc">
            Manage your featured projects. All changes render in both 3D Desktop and Mobile views.
          </p>
        </div>
        <button type="button" className="admin-btn admin-btn-primary" onClick={addProject}>
          <FiPlus size={14} /> Deploy New
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="admin-panel" style={{ textAlign: "center", padding: "3rem", position: "relative", zIndex: 1 }}>
          <p style={{ color: "var(--text-muted)" }}>No projects parked in the garage yet.</p>
          <button type="button" className="admin-btn admin-btn-secondary" style={{ marginTop: "1rem" }} onClick={addProject}>
            <FiPlus size={14} /> Add Your First Project
          </button>
        </div>
      ) : (
        projects.map((proj, idx) => {
          const isExpanded = expandedProjects[idx];
          const previewColor = getAccentPreview(proj.accentColor);

          return (
            <div
              key={proj.id || idx}
              className="admin-panel"
              style={{ borderLeft: `3px solid ${previewColor}`, paddingLeft: "calc(var(--space-6) + 3px)" }}
            >
              {/* Collapsible Header */}
              <div className="admin-project-header" onClick={() => toggleExpand(idx)}>
                <div className="admin-project-header-left">
                  <span
                    className="admin-project-color-dot"
                    style={{ background: previewColor, color: previewColor }}
                  />
                  <span className="admin-project-name">
                    {proj.name || "Untitled Project"}
                  </span>
                  <span className="admin-tag-pill" style={{ color: previewColor, borderColor: `${previewColor}40` }}>
                    {proj.category || "PROJECT"}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <div className="admin-item-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      style={{ padding: "0.25rem 0.45rem" }}
                      disabled={idx === 0}
                      onClick={() => moveProject(idx, -1)}
                      title="Move Up"
                    >
                      <FiArrowUp size={12} />
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      style={{ padding: "0.25rem 0.45rem" }}
                      disabled={idx === projects.length - 1}
                      onClick={() => moveProject(idx, 1)}
                      title="Move Down"
                    >
                      <FiArrowDown size={12} />
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-danger"
                      style={{ padding: "0.25rem 0.45rem" }}
                      onClick={() => removeProject(idx)}
                      title="Decommission"
                    >
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                  <FiChevronDown
                    size={16}
                    className={`admin-project-chevron ${isExpanded ? "expanded" : ""}`}
                  />
                </div>
              </div>

              {/* Collapsible Body */}
              {isExpanded && (
                <div className="admin-project-body">
                  <div className="admin-grid-2">
                    <div className="admin-form-group">
                      <label className="admin-label">Project Name</label>
                      <input
                        type="text"
                        className="admin-input admin-input-plain"
                        value={proj.name || ""}
                        onChange={(e) => updateProject(idx, "name", e.target.value)}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-label">Category</label>
                      <input
                        type="text"
                        className="admin-input admin-input-plain"
                        value={proj.category || ""}
                        placeholder="e.g. WEB APP, DEV TOOL, MOBILE APP"
                        onChange={(e) => updateProject(idx, "category", e.target.value.toUpperCase())}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Tagline (One-liner)</label>
                    <input
                      type="text"
                      className="admin-input admin-input-plain"
                      value={proj.tagline || ""}
                      placeholder="Short punchy tagline"
                      onChange={(e) => updateProject(idx, "tagline", e.target.value)}
                    />
                  </div>

                  {/* Key Metric */}
                  <div
                    className="admin-form-group"
                    style={{
                      background: "var(--accent-cyan-subtle)",
                      border: "1px solid rgba(0, 240, 255, 0.12)",
                      borderRadius: "var(--radius-sm)",
                      padding: "0.75rem",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                      <label className="admin-label" style={{ color: "var(--accent-cyan)", fontWeight: 700, margin: 0 }}>
                        ⚡ Key Metric / Performance Milestone
                      </label>
                    </div>

                    <textarea
                      className="admin-textarea"
                      rows={2}
                      style={{
                        minHeight: "48px",
                        fontSize: "0.82rem",
                        background: "rgba(0, 0, 0, 0.4)",
                        border: "1px solid rgba(0, 240, 255, 0.15)",
                      }}
                      value={proj.highlight || ""}
                      placeholder="e.g. Outperformed baselines using 4-bit QLoRA GRPO"
                      onChange={(e) => updateProject(idx, "highlight", e.target.value)}
                    />

                    {proj.highlight && (
                      <div
                        style={{
                          marginTop: "0.4rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          fontSize: "0.72rem",
                          color: "#38bdf8",
                          background: "rgba(56, 189, 248, 0.06)",
                          padding: "0.3rem 0.6rem",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid rgba(56, 189, 248, 0.15)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        <span style={{ fontWeight: 700, letterSpacing: "0.08em" }}>LIVE:</span>
                        <span style={{ flex: 1 }}>{proj.highlight}</span>
                      </div>
                    )}
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Detailed Description</label>
                    <textarea
                      className="admin-textarea"
                      rows={3}
                      value={proj.description || ""}
                      onChange={(e) => updateProject(idx, "description", e.target.value)}
                      placeholder="2-3 sentences explaining what you built..."
                    />
                  </div>

                  <div className="admin-grid-2">
                    <div className="admin-form-group">
                      <label className="admin-label">Key Technical Challenge</label>
                      <input
                        type="text"
                        className="admin-input admin-input-plain"
                        value={proj.challenge || ""}
                        placeholder="e.g. Real-time concurrency"
                        onChange={(e) => updateProject(idx, "challenge", e.target.value)}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-label">System Architecture</label>
                      <input
                        type="text"
                        className="admin-input admin-input-plain"
                        value={proj.architecture || ""}
                        placeholder="e.g. FastAPI + Redis Pub/Sub"
                        onChange={(e) => updateProject(idx, "architecture", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Links */}
                  <div className="admin-grid-2">
                    <div className="admin-form-group">
                      <label className="admin-label" style={{ gap: "0.35rem" }}>
                        <FiExternalLink size={11} /> Live Demo URL
                      </label>
                      <input
                        type="url"
                        className="admin-input admin-input-plain"
                        value={proj.links?.demo || ""}
                        placeholder="https://your-demo.com"
                        onChange={(e) => updateProjectLinks(idx, "demo", e.target.value)}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-label" style={{ gap: "0.35rem" }}>
                        <FiGithub size={11} /> GitHub Repository
                      </label>
                      <input
                        type="url"
                        className="admin-input admin-input-plain"
                        value={proj.links?.repo || ""}
                        placeholder="https://github.com/..."
                        onChange={(e) => updateProjectLinks(idx, "repo", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div className="admin-form-group">
                    <label className="admin-label">Card Accent</label>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                      {ACCENT_COLOR_PRESETS.map((p) => {
                        const isSelected = proj.accentColor === p.value;
                        return (
                          <button
                            key={p.value}
                            type="button"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.3rem",
                              padding: "0.25rem 0.55rem",
                              background: isSelected ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.03)",
                              border: `1px solid ${isSelected ? p.preview : "var(--border-subtle)"}`,
                              borderRadius: "var(--radius-sm)",
                              color: "#fff",
                              cursor: "pointer",
                              fontSize: "0.68rem",
                              fontFamily: "var(--font-mono)",
                              transition: "all 0.2s",
                            }}
                            onClick={() => updateProject(idx, "accentColor", p.value)}
                          >
                            <span
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: p.preview,
                                boxShadow: isSelected ? `0 0 8px ${p.preview}60` : "none",
                              }}
                            />
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="admin-form-group">
                    <label className="admin-label">Tech Stack Tags</label>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <input
                        type="text"
                        className="admin-input admin-input-plain"
                        placeholder="e.g. Next.js"
                        value={techInputs[idx] || ""}
                        onChange={(e) => setTechInputs({ ...techInputs, [idx]: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTechTag(idx);
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="admin-btn admin-btn-secondary"
                        onClick={() => addTechTag(idx)}
                      >
                        Add
                      </button>
                    </div>

                    <div className="admin-tag-list">
                      {(proj.techStack || []).map((tech) => (
                        <span key={tech} className="admin-tag-pill">
                          <span>{tech}</span>
                          <button
                            type="button"
                            onClick={() => removeTechTag(idx, tech)}
                            title="Remove"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
