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
          <span>AI RACE ENGINEER: BRAIN &amp; FAQ TUNING</span>
        </h2>
        <p className="admin-section-desc">
          When visitors talk to your AI Race Engineer via the Radio, it references these FAQs, your projects, skills, and background notes to answer accurately and with motorsport flair.
        </p>
      </div>

      {/* Interactive AI Test Bench */}
      <div
        className="admin-panel"
        style={{
          borderLeft: "3px solid #00f0ff",
          background: "linear-gradient(135deg, rgba(0, 240, 255, 0.05) 0%, rgba(14, 15, 20, 0.8) 100%)",
        }}
      >
        <h3
          style={{
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <FiRadio color="#00f0ff" /> Live AI Telemetry Radio Test Bench
        </h3>
        <p style={{ fontSize: "0.82rem", color: "#94a3b8", marginBottom: "1rem" }}>
          Test what the Gemini Race Engineer answers using the target server knowledge base. (Click &apos;Save Changes&apos; in the top bar first to sync new edits to Redis).
        </p>

        <form onSubmit={handleTestChat} style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            className="admin-input admin-input-plain"
            placeholder="Ask a question (e.g., 'What is your favorite stack?' or 'Tell me about ShinChan Simulator')..."
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
          />
          <button
            type="submit"
            className="admin-btn admin-btn-accent"
            disabled={isTesting}
          >
            {isTesting ? <FiZap className="animate-spin" /> : <FiSend />}
            <span>{isTesting ? "Radioing..." : "Transmit"}</span>
          </button>
        </form>

        {testError && (
          <div className="admin-error-banner" style={{ marginTop: "1rem" }}>
            <span>Radio static: {testError}</span>
          </div>
        )}

        {testResponse && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(0, 240, 255, 0.2)",
              borderRadius: 8,
              fontFamily: "monospace",
              fontSize: "0.88rem",
              lineHeight: 1.6,
              color: "#e2e8f0",
            }}
          >
            <div
              style={{
                color: "#00f0ff",
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                marginBottom: "0.4rem",
              }}
            >
              📻 RACE ENGINEER (GEMINI):
            </div>
            {testResponse}
          </div>
        )}
      </div>

      {/* Extra Notes & Lore */}
      <div className="admin-panel">
        <h3 className="admin-panel-title">Additional Context &amp; Custom Lore</h3>
        <p style={{ fontSize: "0.82rem", color: "#94a3b8", marginBottom: "0.75rem" }}>
          Include any specific background details, tone guidelines, recruiter talking points, or facts you want the AI to remember.
        </p>
        <textarea
          className="admin-textarea"
          rows={4}
          value={aiKnowledge.extraNotes || ""}
          onChange={(e) => updateExtraNotes(e.target.value)}
          placeholder="e.g. Always emphasize high performance and low latency. Open to full-stack and distributed systems roles..."
        />
      </div>

      {/* FAQ Management */}
      <div className="admin-panel">
        <div className="admin-panel-title">
          <span>Curated Question &amp; Answer Pairs</span>
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}
            onClick={addFaq}
          >
            <FiPlus /> Add FAQ Pair
          </button>
        </div>

        {(aiKnowledge.faqs || []).map((faq, idx) => (
          <div key={idx} className="admin-item-card">
            <div className="admin-item-header" style={{ marginBottom: "0.5rem" }}>
              <span className="admin-label" style={{ margin: 0 }}>
                FAQ #{idx + 1}
              </span>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                style={{ padding: "0.25rem 0.5rem", fontSize: "0.7rem" }}
                onClick={() => removeFaq(idx)}
                title="Remove FAQ"
              >
                <FiTrash2 />
              </button>
            </div>

            <div className="admin-form-group" style={{ marginBottom: "0.75rem" }}>
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
                placeholder="e.g. Yes, open to relocating for the right opportunity..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
