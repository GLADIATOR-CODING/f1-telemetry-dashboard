import { useState } from "react";
import { FiPlus, FiTrash2, FiArrowUp, FiArrowDown, FiExternalLink, FiGithub } from "react-icons/fi";

const ACCENT_COLOR_PRESETS = [
  { label: "Cyan", value: "var(--accent-cyan)", preview: "#00f0ff" },
  { label: "Purple", value: "var(--accent-purple)", preview: "#a855f7" },
  { label: "Amber", value: "var(--accent-amber)", preview: "#f59e0b" },
  { label: "F1 Red", value: "var(--accent-f1)", preview: "#e10600" },
  { label: "Emerald", value: "#10b981", preview: "#10b981" },
];

export default function ProjectsTab({ projects = [], onChange }) {
  const [techInputs, setTechInputs] = useState({});

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

  return (
    <div className="admin-tab-content">
      <div className="admin-section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 className="admin-section-title">
            <span>PROJECTS GARAGE (SECTOR 2)</span>
          </h2>
          <p className="admin-section-desc">
            Manage your featured projects. All changes render in both 3D Desktop Full Throttle and Mobile views.
          </p>
        </div>
        <button type="button" className="admin-btn admin-btn-primary" onClick={addProject}>
          <FiPlus /> Deploy New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="admin-panel" style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ color: "#64748b" }}>No projects parked in the garage yet.</p>
          <button type="button" className="admin-btn admin-btn-secondary" style={{ marginTop: "1rem" }} onClick={addProject}>
            <FiPlus /> Add Your First Project
          </button>
        </div>
      ) : (
        projects.map((proj, idx) => (
          <div key={proj.id || idx} className="admin-panel">
            <div className="admin-item-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: proj.accentColor?.startsWith("var(") ? "#00f0ff" : proj.accentColor || "#00f0ff",
                  }}
                />
                <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#fff" }}>
                  {proj.name || "Untitled Project"}
                </h3>
                <span className="admin-tag-pill" style={{ color: "#00f0ff" }}>
                  {proj.category || "PROJECT"}
                </span>
              </div>

              <div className="admin-item-actions">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  style={{ padding: "0.35rem 0.6rem" }}
                  disabled={idx === 0}
                  onClick={() => moveProject(idx, -1)}
                  title="Move Up"
                >
                  <FiArrowUp size={14} />
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  style={{ padding: "0.35rem 0.6rem" }}
                  disabled={idx === projects.length - 1}
                  onClick={() => moveProject(idx, 1)}
                  title="Move Down"
                >
                  <FiArrowDown size={14} />
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-danger"
                  style={{ padding: "0.35rem 0.6rem" }}
                  onClick={() => removeProject(idx)}
                  title="Decommission Project"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>

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
                  placeholder="e.g. WEB APP, DEV TOOL, MOBILE APP, CLI TOOL"
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

            <div className="admin-form-group">
              <label className="admin-label">Key Metric / Highlight</label>
              <input
                type="text"
                className="admin-input admin-input-plain"
                value={proj.highlight || ""}
                placeholder="e.g. Handles 500+ concurrent users with sub-50ms latency"
                onChange={(e) => updateProject(idx, "highlight", e.target.value)}
              />
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
                <label className="admin-label">Key Technical Challenge (For AI & Dossier)</label>
                <input
                  type="text"
                  className="admin-input admin-input-plain"
                  value={proj.challenge || ""}
                  placeholder="e.g. Operational transform for real-time concurrency"
                  onChange={(e) => updateProject(idx, "challenge", e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">System Architecture</label>
                <input
                  type="text"
                  className="admin-input admin-input-plain"
                  value={proj.architecture || ""}
                  placeholder="e.g. Containerized FastAPI with Redis Pub/Sub"
                  onChange={(e) => updateProject(idx, "architecture", e.target.value)}
                />
              </div>
            </div>

            {/* Links */}
            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <FiExternalLink /> Live Demo URL
                </label>
                <input
                  type="url"
                  className="admin-input admin-input-plain"
                  value={proj.links?.demo || ""}
                  placeholder="https://your-demo.com (optional)"
                  onChange={(e) => updateProjectLinks(idx, "demo", e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <FiGithub /> GitHub Repository URL
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

            {/* Accent Color Preset Selector */}
            <div className="admin-form-group">
              <label className="admin-label">Card Accent Color</label>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                {ACCENT_COLOR_PRESETS.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.35rem 0.75rem",
                      background: proj.accentColor === p.value ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)",
                      border: `1px solid ${proj.accentColor === p.value ? p.preview : "rgba(255, 255, 255, 0.1)"}`,
                      borderRadius: 6,
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                    }}
                    onClick={() => updateProject(idx, "accentColor", p.value)}
                  >
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: p.preview }} />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="admin-form-group">
              <label className="admin-label">Tech Stack Tags</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
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
                      title="Remove technology"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
