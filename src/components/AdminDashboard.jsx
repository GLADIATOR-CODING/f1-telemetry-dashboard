import { useState, useEffect } from "react";
import {
  FiSave,
  FiRotateCcw,
  FiLogOut,
  FiExternalLink,
  FiDownload,
  FiUpload,
  FiUser,
  FiFolder,
  FiBriefcase,
  FiCpu,
  FiHeart,
  FiRadio,
  FiShare2,
  FiCheckCircle,
  FiAlertTriangle,
  FiServer,
} from "react-icons/fi";
import { FaFlagCheckered } from "react-icons/fa6";
import { usePortfolioStore } from "../stores/usePortfolioStore";

import AdminLogin from "./AdminLogin";
import IdentityTab from "./tabs/IdentityTab";
import ProjectsTab from "./tabs/ProjectsTab";
import ExperienceTab from "./tabs/ExperienceTab";
import SkillsTab from "./tabs/SkillsTab";
import PassionsTab from "./tabs/PassionsTab";
import AiTab from "./tabs/AiTab";
import SocialsTab from "./tabs/SocialsTab";
import "./AdminDashboard.css";

const TABS = [
  { id: "identity", label: "Driver Identity", icon: FiUser },
  { id: "projects", label: "Projects Garage", icon: FiFolder },
  { id: "experience", label: "Parc Fermé (Experience)", icon: FiBriefcase },
  { id: "skills", label: "Telemetry & Skills", icon: FiCpu },
  { id: "passions", label: "Paddock Passions", icon: FiHeart },
  { id: "ai", label: "AI Race Engineer & FAQs", icon: FiRadio },
  { id: "socials", label: "Comms & Links", icon: FiShare2 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("identity");
  const [toastMessage, setToastMessage] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const data = usePortfolioStore((s) => s.data);
  const updateData = usePortfolioStore((s) => s.updateData);
  const savePortfolio = usePortfolioStore((s) => s.savePortfolio);
  const resetToDefaults = usePortfolioStore((s) => s.resetToDefaults);
  const isSaving = usePortfolioStore((s) => s.isSaving);
  const source = usePortfolioStore((s) => s.source);
  const isAuthenticated = usePortfolioStore((s) => s.isAuthenticated);
  const isDemoMode = usePortfolioStore((s) => s.isDemoMode);
  const apiTarget = usePortfolioStore((s) => s.apiTarget);
  const verifySession = usePortfolioStore((s) => s.verifySession);
  const logout = usePortfolioStore((s) => s.logout);
  const fetchPortfolio = usePortfolioStore((s) => s.fetchPortfolio);

  useEffect(() => {
    verifySession();
    fetchPortfolio();
  }, [verifySession, fetchPortfolio]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSave = async () => {
    try {
      const res = await savePortfolio();
      setHasUnsavedChanges(false);
      showToast(res?.message || "Telemetry persisted & AI Race Engineer synchronized!");
    } catch (err) {
      showToast(`Save failed: ${err.message}`);
    }
  };

  const handleReset = async () => {
    if (
      window.confirm(
        "CRITICAL WARNING: This will reset all your portfolio details and AI knowledge back to factory defaults. Proceed?"
      )
    ) {
      try {
        await resetToDefaults();
        setHasUnsavedChanges(false);
        showToast(isDemoMode ? "Sandbox reset to baseline." : "Telemetry reset to factory baseline.");
      } catch (err) {
        showToast(`Reset failed: ${err.message}`);
      }
    }
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-telemetry-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Telemetry backup downloaded.");
  };

  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        if (parsed && typeof parsed === "object") {
          updateData(parsed);
          setHasUnsavedChanges(true);
          showToast("JSON imported! Remember to click 'Save Telemetry'.");
        }
      } catch (err) {
        alert("Invalid JSON configuration file: " + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // If not authenticated, render Login terminal
  if (!isAuthenticated) {
    return (
      <div className="admin-viewport">
        <AdminLogin onLoginSuccess={() => fetchPortfolio()} />
      </div>
    );
  }

  return (
    <div className="admin-viewport">
      {/* Top Telemetry Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <div className="admin-brand">
            <div className="admin-brand-icon">
              <FaFlagCheckered />
            </div>
            <div className="admin-brand-text">
              <h1>
                PIT WALL <span>TELEMETRY</span>
              </h1>
              <p>RACE DIRECTOR CONTROL ROOM</p>
            </div>
          </div>

          <div
            className={`admin-telemetry-status ${
              isDemoMode
                ? "demo"
                : source === "offline-fallback"
                ? "offline"
                : ""
            }`}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: isDemoMode
                  ? "#f59e0b"
                  : source === "offline-fallback"
                  ? "#ef4444"
                  : "#10b981",
              }}
            />
            <span>
              {isDemoMode
                ? "SHOWCASE SANDBOX (DEMO)"
                : source === "redis"
                ? "UPSTASH REDIS LIVE"
                : source === "offline-fallback"
                ? "OFFLINE FALLBACK"
                : "SERVER SYNCED"}
            </span>
          </div>

          {/* Server target badge */}
          {!isDemoMode && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "#94a3b8",
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono, monospace)",
              }}
              title={`Connected to: ${apiTarget}`}
            >
              <FiServer size={12} color="#00f0ff" />
              <span>{apiTarget.replace(/^https?:\/\//, "")}</span>
            </div>
          )}

          {hasUnsavedChanges && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "#ffb800",
                fontSize: "0.75rem",
                fontFamily: "monospace",
              }}
            >
              <FiAlertTriangle size={14} />
              <span>Unsaved Changes</span>
            </div>
          )}
        </div>

        <div className="admin-header-right">
          {/* Export / Import */}
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            style={{ padding: "0.5rem 0.8rem", fontSize: "0.75rem" }}
            onClick={handleExportJson}
            title="Download JSON telemetry backup"
          >
            <FiDownload size={14} />
            <span className="hidden sm:inline">Export</span>
          </button>

          <label
            className="admin-btn admin-btn-secondary"
            style={{ padding: "0.5rem 0.8rem", fontSize: "0.75rem", cursor: "pointer", margin: 0 }}
            title="Import JSON telemetry configuration"
          >
            <FiUpload size={14} />
            <span className="hidden sm:inline">Import</span>
            <input
              type="file"
              accept=".json"
              style={{ display: "none" }}
              onChange={handleImportJson}
            />
          </label>

          {/* Reset button */}
          <button
            type="button"
            className="admin-btn admin-btn-danger"
            style={{ padding: "0.5rem 0.8rem", fontSize: "0.75rem" }}
            onClick={handleReset}
            title="Reset to original template data"
          >
            <FiRotateCcw size={14} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Save Telemetry Button */}
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            style={{ width: "auto", padding: "0.55rem 1.25rem" }}
            disabled={isSaving}
            onClick={handleSave}
          >
            <FiSave size={15} />
            <span>
              {isSaving
                ? "Synchronizing..."
                : isDemoMode
                ? "Simulate Save"
                : "Save Telemetry"}
            </span>
          </button>

          {/* Live Circuit Link */}
          <a
            href="https://kshitizlo.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            style={{ padding: "0.5rem 0.8rem", textDecoration: "none" }}
            title="Open live public portfolio in new tab"
          >
            <FiExternalLink size={14} />
            <span className="hidden sm:inline">Live Circuit</span>
          </a>

          {/* Logout */}
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            style={{ padding: "0.5rem 0.8rem" }}
            onClick={logout}
            title="Lock Cockpit & Logout"
          >
            <FiLogOut size={14} />
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="admin-nav-bar" aria-label="Admin Navigation Tabs">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`admin-nav-tab ${isActive ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
              {tab.id === "projects" && (
                <span className="admin-nav-tab-badge">
                  {data.projects?.length || 0}
                </span>
              )}
              {tab.id === "ai" && (
                <span className="admin-nav-tab-badge">
                  {data.aiKnowledge?.faqs?.length || 0} FAQs
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main className="admin-content">
        {activeTab === "identity" && (
          <IdentityTab
            identity={data.identity}
            onChange={(newIdentity) => {
              updateData({ identity: newIdentity });
              setHasUnsavedChanges(true);
            }}
          />
        )}

        {activeTab === "projects" && (
          <ProjectsTab
            projects={data.projects}
            onChange={(newProjects) => {
              updateData({ projects: newProjects });
              setHasUnsavedChanges(true);
            }}
          />
        )}

        {activeTab === "experience" && (
          <ExperienceTab
            experience={data.experience}
            education={data.education}
            onChangeExperience={(newExp) => {
              updateData({ experience: newExp });
              setHasUnsavedChanges(true);
            }}
            onChangeEducation={(newEdu) => {
              updateData({ education: newEdu });
              setHasUnsavedChanges(true);
            }}
          />
        )}

        {activeTab === "skills" && (
          <SkillsTab
            skills={data.skills}
            certifications={data.certifications}
            onChangeSkills={(newSkills) => {
              updateData({ skills: newSkills });
              setHasUnsavedChanges(true);
            }}
            onChangeCertifications={(newCerts) => {
              updateData({ certifications: newCerts });
              setHasUnsavedChanges(true);
            }}
          />
        )}

        {activeTab === "passions" && (
          <PassionsTab
            passions={data.passions}
            onChange={(newPassions) => {
              updateData({ passions: newPassions });
              setHasUnsavedChanges(true);
            }}
          />
        )}

        {activeTab === "ai" && (
          <AiTab
            aiKnowledge={data.aiKnowledge}
            onChange={(newAi) => {
              updateData({ aiKnowledge: newAi });
              setHasUnsavedChanges(true);
            }}
          />
        )}

        {activeTab === "socials" && (
          <SocialsTab
            socials={data.socials}
            onChange={(newSocials) => {
              updateData({ socials: newSocials });
              setHasUnsavedChanges(true);
            }}
          />
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast">
          <FiCheckCircle color="#00f0ff" size={18} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
