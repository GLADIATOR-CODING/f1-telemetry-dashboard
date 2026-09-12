import { useState } from "react";
import { FiPlus, FiTrash2, FiBriefcase, FiBookOpen, FiArrowUp, FiArrowDown } from "react-icons/fi";

export default function ExperienceTab({ experience = [], education = [], onChangeExperience, onChangeEducation }) {
  const [newHighlightInputs, setNewHighlightInputs] = useState({});

  // Experience Handlers
  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: "Company Name",
      role: "Software Engineer",
      period: "2025 — Present",
      highlights: [
        "Architected scalable backend microservices reducing latency",
        "Engineered real-time features supporting high user concurrency"
      ]
    };
    onChangeExperience([newExp, ...experience]);
  };

  const updateExperience = (idx, field, value) => {
    const updated = [...experience];
    updated[idx] = { ...updated[idx], [field]: value };
    onChangeExperience(updated);
  };

  const removeExperience = (idx) => {
    if (window.confirm("Remove this experience record?")) {
      onChangeExperience(experience.filter((_, i) => i !== idx));
    }
  };

  const updateHighlight = (expIdx, hIdx, value) => {
    const exp = experience[expIdx];
    const updatedHighlights = [...(exp.highlights || [])];
    updatedHighlights[hIdx] = value;
    updateExperience(expIdx, "highlights", updatedHighlights);
  };

  const moveHighlight = (expIdx, hIdx, direction) => {
    const exp = experience[expIdx];
    const updatedHighlights = [...(exp.highlights || [])];
    const targetIdx = hIdx + direction;
    if (targetIdx < 0 || targetIdx >= updatedHighlights.length) return;
    const temp = updatedHighlights[hIdx];
    updatedHighlights[hIdx] = updatedHighlights[targetIdx];
    updatedHighlights[targetIdx] = temp;
    updateExperience(expIdx, "highlights", updatedHighlights);
  };

  const addHighlight = (expIdx) => {
    const text = newHighlightInputs[expIdx] || "";
    if (!text.trim()) return;
    const exp = experience[expIdx];
    const updatedHighlights = [...(exp.highlights || []), text.trim()];
    updateExperience(expIdx, "highlights", updatedHighlights);
    setNewHighlightInputs({ ...newHighlightInputs, [expIdx]: "" });
  };

  const removeHighlight = (expIdx, hIdx) => {
    const exp = experience[expIdx];
    const updatedHighlights = (exp.highlights || []).filter((_, i) => i !== hIdx);
    updateExperience(expIdx, "highlights", updatedHighlights);
  };

  // Education Handlers
  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      institution: "University / Institute",
      degree: "B.Tech in Computer Science",
      period: "2022 — 2026",
      details: "Algorithms, distributed systems, web architectures.",
      gpa: "8.5 / 10"
    };
    onChangeEducation([...education, newEdu]);
  };

  const updateEducation = (idx, field, value) => {
    const updated = [...education];
    updated[idx] = { ...updated[idx], [field]: value };
    onChangeEducation(updated);
  };

  const removeEducation = (idx) => {
    if (window.confirm("Remove this education entry?")) {
      onChangeEducation(education.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="admin-tab-content">
      <div className="admin-section-header">
        <h2 className="admin-section-title">
          <span>PARC FERMÉ: CAREER & EDUCATION</span>
        </h2>
        <p className="admin-section-desc">
          Manage your career chronology, internship stints, accomplishments, and degree details.
        </p>
      </div>

      {/* Experience Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            fontFamily: "var(--font-display)",
          }}
        >
          <FiBriefcase color="var(--accent-cyan)" /> Professional Experience
        </h3>
        <button type="button" className="admin-btn admin-btn-secondary" onClick={addExperience}>
          <FiPlus size={13} /> Add Position
        </button>
      </div>

      {/* Timeline */}
      <div className="admin-timeline">
        {experience.map((exp, idx) => (
          <div key={exp.id || idx} className="admin-timeline-item">
            <div className="admin-timeline-dot" />
            <div className="admin-panel" style={{ marginBottom: "var(--space-4)" }}>
              <div className="admin-item-header" style={{ position: "relative", zIndex: 1 }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: "1rem", color: "#fff", fontWeight: 700 }}>
                    {exp.role}{" "}
                    <span style={{ color: "var(--accent-cyan)", fontWeight: 500 }}>@ {exp.company}</span>
                  </h4>
                  <span className="admin-period-badge" style={{ marginTop: "0.35rem", display: "inline-flex" }}>
                    {exp.period}
                  </span>
                </div>
                <button
                  type="button"
                  className="admin-btn admin-btn-danger"
                  style={{ padding: "0.25rem 0.45rem" }}
                  onClick={() => removeExperience(idx)}
                  title="Remove"
                >
                  <FiTrash2 size={13} />
                </button>
              </div>

              <div className="admin-grid-3" style={{ position: "relative", zIndex: 1 }}>
                <div className="admin-form-group">
                  <label className="admin-label">Role Title</label>
                  <input
                    type="text"
                    className="admin-input admin-input-plain"
                    value={exp.role || ""}
                    onChange={(e) => updateExperience(idx, "role", e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Company / Organization</label>
                  <input
                    type="text"
                    className="admin-input admin-input-plain"
                    value={exp.company || ""}
                    onChange={(e) => updateExperience(idx, "company", e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Period</label>
                  <input
                    type="text"
                    className="admin-input admin-input-plain"
                    value={exp.period || ""}
                    placeholder="e.g. May 2025 — Aug 2025"
                    onChange={(e) => updateExperience(idx, "period", e.target.value)}
                  />
                </div>
              </div>

              {/* Highlights */}
              <div className="admin-form-group" style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <label className="admin-label" style={{ margin: 0 }}>Key Highlights & Impact</label>
                  <span className="admin-skill-count">
                    {(exp.highlights || []).length} points
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "0.6rem" }}>
                  {(exp.highlights || []).map((h, hIdx) => (
                    <div
                      key={hIdx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                        padding: "0.4rem 0.5rem",
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      <span style={{ color: "var(--accent-f1)", fontSize: "0.85rem", marginTop: "0.3rem", userSelect: "none" }}>▸</span>
                      <textarea
                        className="admin-textarea"
                        rows={2}
                        style={{
                          flex: 1,
                          minHeight: "38px",
                          fontSize: "0.82rem",
                          padding: "0.35rem 0.55rem",
                          background: "rgba(0, 0, 0, 0.3)",
                          border: "1px solid var(--border-subtle)",
                        }}
                        value={h}
                        onChange={(e) => updateHighlight(idx, hIdx, e.target.value)}
                        placeholder="Achievement with quantifiable metric..."
                      />
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                        <button
                          type="button"
                          className="admin-btn admin-btn-secondary"
                          style={{ padding: "0.2rem 0.35rem" }}
                          disabled={hIdx === 0}
                          onClick={() => moveHighlight(idx, hIdx, -1)}
                        >
                          <FiArrowUp size={10} />
                        </button>
                        <button
                          type="button"
                          className="admin-btn admin-btn-secondary"
                          style={{ padding: "0.2rem 0.35rem" }}
                          disabled={hIdx === (exp.highlights || []).length - 1}
                          onClick={() => moveHighlight(idx, hIdx, 1)}
                        >
                          <FiArrowDown size={10} />
                        </button>
                        <button
                          type="button"
                          className="admin-btn admin-btn-danger"
                          style={{ padding: "0.2rem 0.35rem" }}
                          onClick={() => removeHighlight(idx, hIdx)}
                        >
                          <FiTrash2 size={10} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "0.4rem" }}>
                  <input
                    type="text"
                    className="admin-input admin-input-plain"
                    placeholder="Add achievement (e.g. Reduced API latency by 35%)..."
                    value={newHighlightInputs[idx] || ""}
                    onChange={(e) => setNewHighlightInputs({ ...newHighlightInputs, [idx]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addHighlight(idx);
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={() => addHighlight(idx)}
                  >
                    <FiPlus size={13} /> Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "var(--space-10) 0 var(--space-4)" }}>
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            fontFamily: "var(--font-display)",
          }}
        >
          <FiBookOpen color="var(--accent-amber)" /> Academic Credentials
        </h3>
        <button type="button" className="admin-btn admin-btn-secondary" onClick={addEducation}>
          <FiPlus size={13} /> Add Degree
        </button>
      </div>

      {education.map((edu, idx) => (
        <div key={edu.id || idx} className="admin-panel">
          <div className="admin-item-header" style={{ position: "relative", zIndex: 1 }}>
            <div>
              <h4 style={{ margin: 0, fontSize: "1rem", color: "#fff", fontWeight: 700 }}>
                {edu.degree}{" "}
                <span style={{ color: "var(--accent-amber)", fontWeight: 500 }}>— {edu.institution}</span>
              </h4>
              <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "0.3rem" }}>
                <span className="admin-period-badge" style={{ borderColor: "rgba(255, 170, 0, 0.2)", background: "var(--accent-amber-subtle)", color: "var(--accent-amber)" }}>
                  {edu.period}
                </span>
                {edu.gpa && (
                  <span className="admin-period-badge" style={{ borderColor: "rgba(255, 170, 0, 0.2)", background: "var(--accent-amber-subtle)", color: "var(--accent-amber)" }}>
                    GPA: {edu.gpa}
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              className="admin-btn admin-btn-danger"
              style={{ padding: "0.25rem 0.45rem" }}
              onClick={() => removeEducation(idx)}
            >
              <FiTrash2 size={13} />
            </button>
          </div>

          <div className="admin-grid-2" style={{ position: "relative", zIndex: 1 }}>
            <div className="admin-form-group">
              <label className="admin-label">Institution</label>
              <input
                type="text"
                className="admin-input admin-input-plain"
                value={edu.institution || ""}
                onChange={(e) => updateEducation(idx, "institution", e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Degree / Branch</label>
              <input
                type="text"
                className="admin-input admin-input-plain"
                value={edu.degree || ""}
                onChange={(e) => updateEducation(idx, "degree", e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Period</label>
              <input
                type="text"
                className="admin-input admin-input-plain"
                value={edu.period || ""}
                onChange={(e) => updateEducation(idx, "period", e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">GPA / Score</label>
              <input
                type="text"
                className="admin-input admin-input-plain"
                value={edu.gpa || ""}
                placeholder="e.g. 8.5 / 10"
                onChange={(e) => updateEducation(idx, "gpa", e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group" style={{ position: "relative", zIndex: 1 }}>
            <label className="admin-label">Curriculum / Key Focus</label>
            <input
              type="text"
              className="admin-input admin-input-plain"
              value={edu.details || ""}
              placeholder="e.g. Focus on algorithms, systems design, and AI/ML"
              onChange={(e) => updateEducation(idx, "details", e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
