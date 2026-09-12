import { useState } from "react";
import { FiPlus, FiTrash2, FiRadio, FiSend, FiZap } from "react-icons/fi";
import { usePortfolioStore } from "../../stores/usePortfolioStore";

export default function AiTab({ aiKnowledge = {}, onChange }) {
  const [testMessage, setTestMessage] = useState("");
  const [testResponse, setTestResponse] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testError, setTestError] = useState(null);
  const apiTarget = usePortfolioStore((s) => s.apiTarget);
  const isDemoMode = usePortfolioStore((s) => s.isDemoMode);

  const updateFaq = (idx, field, value) => {
    const updated = [...(aiKnowledge.faqs || [])];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange({ ...aiKnowledge, faqs: updated });
  };

  const addFaq = () => {
    const newFaq = {
      q: "New question about me?",
      a: "Detailed answer that the AI Race Engineer will tell curious recruiters.",
    };
    onChange({
      ...aiKnowledge,
      faqs: [...(aiKnowledge.faqs || []), newFaq],
    });
  };

  const removeFaq = (idx) => {
    onChange({
      ...aiKnowledge,
      faqs: (aiKnowledge.faqs || []).filter((_, i) => i !== idx),
    });
  };

  const updateExtraNotes = (value) => {
    onChange({
      ...aiKnowledge,
      extraNotes: value,
    });
  };

  const handleTestChat = async (e) => {
    e.preventDefault();
    if (!testMessage.trim()) return;

    setIsTesting(true);
    setTestError(null);
    setTestResponse(null);

    if (isDemoMode) {
      setTimeout(() => {
        setIsTesting(false);
        setTestResponse(`[DEMO TELEMETRY RADIO]: Copy driver! In sandbox mode: "${testMessage}". Full Gemini model connectivity available in live deployment.`);
      }, 700);
      return;
    }

    try {
      const res = await fetch(`${apiTarget}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: testMessage }],
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to communicate with AI Race Engineer");
      }
      setTestResponse(data.content);
    } catch (err) {
      setTestError(err.message);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="admin-tab-content">
      <div className="admin-section-header">
        <h2 className="admin-section-title">
          <span>AI RACE ENGINEER: BRAIN & FAQ</span>
        </h2>
        <p className="admin-section-desc">
          When visitors talk to your AI via the Radio, it references these FAQs, projects, skills, and background notes.
        </p>
      </div>

      {/* Radio Test Bench */}
      <div className="admin-panel admin-radio-panel">
        <h3
          style={{
            fontSize: "0.88rem",
            fontWeight: 700,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            marginBottom: "var(--space-2)",
            fontFamily: "var(--font-display)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <FiRadio color="var(--accent-cyan)" size={16} /> Live AI Radio Test Bench
        </h3>
        <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "var(--space-4)", position: "relative", zIndex: 1 }}>
          Test what the Gemini Race Engineer answers. Save changes first to sync edits to Redis.
        </p>

        <form onSubmit={handleTestChat} style={{ display: "flex", gap: "0.4rem", position: "relative", zIndex: 1 }}>
          <div style={{ flex: 1, position: "relative" }}>
            <input
              type="text"
              className="admin-input admin-input-plain"
              placeholder="Ask a question (e.g., 'What is your favorite stack?')..."
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              style={{ paddingRight: "3.5rem" }}
            />
            {isTesting && (
              <div className="admin-radio-wave" style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)" }}>
                <span /><span /><span /><span />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="admin-btn admin-btn-accent"
            disabled={isTesting}
            style={{ padding: "0.45rem 0.85rem" }}
          >
            {isTesting ? <FiZap size={14} /> : <FiSend size={14} />}
            <span>{isTesting ? "Radioing..." : "Transmit"}</span>
          </button>
        </form>

        {testError && (
          <div className="admin-error-banner" style={{ marginTop: "var(--space-4)" }}>
            <span>Radio static: {testError}</span>
          </div>
        )}

        {testResponse && (
          <div className="admin-radio-response">
            <div className="admin-radio-label">
              📻 RACE ENGINEER (GEMINI):
            </div>
            {testResponse}
          </div>
        )}
      </div>

      {/* Extra Notes */}
      <div className="admin-panel">
        <h3 className="admin-panel-title">Additional Context & Custom Lore</h3>
        <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "var(--space-3)", position: "relative", zIndex: 1 }}>
          Background details, tone guidelines, or recruiter talking points for the AI.
        </p>
        <textarea
          className="admin-textarea"
          rows={4}
          value={aiKnowledge.extraNotes || ""}
          onChange={(e) => updateExtraNotes(e.target.value)}
          placeholder="e.g. Always emphasize high performance and low latency..."
          style={{ position: "relative", zIndex: 1 }}
        />
      </div>

      {/* FAQ Management */}
      <div className="admin-panel">
        <div className="admin-panel-title">
          <span>Curated Q&A Pairs</span>
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            style={{ padding: "0.3rem 0.6rem", fontSize: "0.7rem" }}
            onClick={addFaq}
          >
            <FiPlus size={12} /> Add FAQ
          </button>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          {(aiKnowledge.faqs || []).map((faq, idx) => (
            <div key={idx} className="admin-item-card">
              <div className="admin-item-header" style={{ marginBottom: "0.4rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-telemetry)",
                      fontSize: "0.72rem",
                      color: "var(--accent-f1)",
                      fontWeight: 700,
                      background: "var(--accent-f1-subtle)",
                      padding: "0.15rem 0.4rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(225, 6, 0, 0.2)",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="admin-label" style={{ margin: 0 }}>FAQ</span>
                </div>
                <button
                  type="button"
                  className="admin-btn admin-btn-danger"
                  style={{ padding: "0.2rem 0.4rem", fontSize: "0.65rem" }}
                  onClick={() => removeFaq(idx)}
                  title="Remove FAQ"
                >
                  <FiTrash2 size={12} />
                </button>
              </div>

              <div className="admin-form-group" style={{ marginBottom: "0.6rem" }}>
                <label className="admin-label">Question</label>
                <input
                  type="text"
                  className="admin-input admin-input-plain"
                  value={faq.q || ""}
                  onChange={(e) => updateFaq(idx, "q", e.target.value)}
                  placeholder="e.g. Are you open to relocation?"
                />
              </div>

              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-label">Answer</label>
                <textarea
                  className="admin-textarea"
                  rows={2}
                  value={faq.a || ""}
                  onChange={(e) => updateFaq(idx, "a", e.target.value)}
                  placeholder="e.g. Yes, open to relocating..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
