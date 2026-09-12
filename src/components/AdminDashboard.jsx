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
  FiMenu,
  FiX,
  FiActivity,
  FiChevronLeft,
  FiChevronRight,
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
import AnalyticsTab from "./tabs/AnalyticsTab";
import MiniRaceEngineer from "./MiniRaceEngineer";
import "./AdminDashboard.css";

const TABS = [
  { id: "identity", label: "Driver Identity", icon: FiUser },
  { id: "projects", label: "Projects Garage", icon: FiFolder },
  { id: "experience", label: "Parc Fermé", icon: FiBriefcase },
  { id: "skills", label: "Telemetry & Skills", icon: FiCpu },
  { id: "passions", label: "Paddock Passions", icon: FiHeart },
  { id: "ai", label: "AI Race Engineer", icon: FiRadio },
  { id: "socials", label: "Comms & Links", icon: FiShare2 },
  { id: "analytics", label: "Performance Telemetry", icon: FiActivity },
];

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="admin-header-clock">{time}</span>;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("identity");
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState("success"); // success | error | warning
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem("isSidebarCollapsed") === "true";
  });
  const [isMascotEnabled, setIsMascotEnabled] = useState(() => {
    return localStorage.getItem("isMascotEnabled") !== "false";
  });

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem("isSidebarCollapsed", newState);
  };

  const toggleMascot = () => {
    const newState = !isMascotEnabled;
    setIsMascotEnabled(newState);
    localStorage.setItem("isMascotEnabled", newState);
  };

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

  const showToast = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
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
      showToast(`Save failed: ${err.message}`, "error");
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
        showToast(`Reset failed: ${err.message}`, "error");
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
          showToast("JSON imported! Remember to click 'Save Telemetry'.", "warning");
        }
      } catch (err) {
        showToast("Invalid JSON configuration file: " + err.message, "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileNavOpen(false);
  };

  // If not authenticated, render Login terminal
  if (!isAuthenticated) {
    return (
      <div className="admin-viewport">
        <div className="admin-grid-bg" />
        <div className="admin-vignette" />
        <AdminLogin onLoginSuccess={() => fetchPortfolio()} />
      </div>
    );
  }

  return (
    <div className="admin-viewport">
      {/* Ambient layers */}
      <div className="admin-grid-bg" />
      <div className="admin-vignette" />
      <div className="admin-corner-marker tl" />
      <div className="admin-corner-marker tr" />
      <div className="admin-corner-marker bl" />
      <div className="admin-corner-marker br" />

      {/* ═══ HEADER — Race Control Command Bar ═══ */}
      <header className="admin-header">
        <div className="admin-header-left">
          {/* Mobile menu toggle */}
          <button
            type="button"
            className="admin-btn admin-btn-secondary admin-mobile-menu-btn"
            style={{ padding: "0.4rem" }}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle navigation"
          >
            {mobileNavOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>

          <div className="admin-brand">
            <div className="admin-brand-icon">
              <FaFlagCheckered />
            </div>
            <div className="admin-brand-text">
              <h1>
                PIT WALL <span>TELEMETRY</span>
              </h1>
              <p>Race Director Control</p>
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
              className="admin-status-dot"
              style={{
                background: isDemoMode
                  ? "#f59e0b"
                  : source === "offline-fallback"
                  ? "#ef4444"
                  : "#00ff66",
                boxShadow: `0 0 8px ${
                  isDemoMode
                    ? "rgba(245, 158, 11, 0.5)"
                    : source === "offline-fallback"
                    ? "rgba(239, 68, 68, 0.5)"
                    : "rgba(0, 255, 102, 0.5)"
                }`,
              }}
            />
            <span>
              {isDemoMode
                ? "SANDBOX"
                : source === "redis"
                ? "REDIS LIVE"
                : source === "offline-fallback"
                ? "OFFLINE"
                : "SYNCED"}
            </span>
          </div>

          {/* Server target badge */}
          {!isDemoMode && (
            <div
              className="admin-hide-mobile"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                color: "var(--text-muted)",
                fontSize: "0.65rem",
                fontFamily: "var(--font-mono)",
              }}
              title={`Connected to: ${apiTarget}`}
            >
              <FiServer size={11} color="var(--accent-cyan)" />
              <span>{apiTarget.replace(/^https?:\/\//, "")}</span>
            </div>
          )}

          {hasUnsavedChanges && (
            <div className="admin-unsaved-bar">
              <FiAlertTriangle size={12} />
              <span>Unsaved</span>
            </div>
          )}
        </div>

        <div className="admin-header-right">
          <LiveClock />

          <button
            type="button"
            className="admin-btn admin-btn-secondary admin-hide-mobile"
            style={{ padding: "0.4rem 0.65rem", fontSize: "0.7rem" }}
            onClick={handleExportJson}
            title="Download JSON telemetry backup"
          >
            <FiDownload size={13} />
          </button>

          <label
            className="admin-btn admin-btn-secondary admin-hide-mobile"
            style={{ padding: "0.4rem 0.65rem", fontSize: "0.7rem", cursor: "pointer", margin: 0 }}
            title="Import JSON telemetry configuration"
          >
            <FiUpload size={13} />
            <input
              type="file"
              accept=".json"
              style={{ display: "none" }}
              onChange={handleImportJson}
            />
          </label>

          <button
            type="button"
            className="admin-btn admin-btn-danger admin-hide-mobile"
            style={{ padding: "0.4rem 0.65rem", fontSize: "0.7rem" }}
            onClick={handleReset}
            title="Reset to factory defaults"
          >
            <FiRotateCcw size={13} />
          </button>

          {/* Save Telemetry Button */}
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            style={{ padding: "0.45rem 1rem", fontSize: "0.72rem" }}
            disabled={isSaving}
            onClick={handleSave}
          >
            <FiSave size={14} />
            <span>
              {isSaving
                ? "Syncing..."
                : isDemoMode
                ? "Simulate"
                : "Save"}
            </span>
          </button>

          <a
            href="https://kshitizlo.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary admin-hide-mobile"
            style={{ padding: "0.4rem 0.65rem", textDecoration: "none" }}
            title="Open live public portfolio"
          >
            <FiExternalLink size={13} />
          </a>

          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            style={{ padding: "0.4rem 0.65rem" }}
            onClick={logout}
            title="Lock Cockpit & Logout"
          >
            <FiLogOut size={13} />
          </button>
        </div>
      </header>

      {/* ═══ BODY (Sidebar + Content) ═══ */}
      <div className="admin-body">
        {/* Mobile overlay */}
        {mobileNavOpen && (
          <div
            className="admin-sidebar-overlay"
            onClick={() => setMobileNavOpen(false)}
          />
        )}

        {/* Sidebar Navigation — F1 Timing Tower */}
        <nav
          className={`admin-sidebar ${mobileNavOpen ? "mobile-open" : ""} ${isSidebarCollapsed ? "collapsed" : ""}`}
          aria-label="Admin Navigation"
        >
          <div className="admin-sidebar-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 var(--space-2)' }}>
            {!isSidebarCollapsed && <div className="admin-sidebar-label" style={{ marginBottom: 0 }}>Navigation</div>}
            <button 
              type="button"
              onClick={toggleSidebar} 
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px', margin: isSidebarCollapsed ? '0 auto' : '0' }}
              title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isSidebarCollapsed ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
            </button>
          </div>

          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileNavOpen(false);
                }}
                className={`admin-nav-tab ${isActive ? "active" : ""}`}
                title={isSidebarCollapsed ? tab.label : ""}
              >
                <span className="admin-nav-tab-icon">
                  <Icon size={16} />
                </span>
                {!isSidebarCollapsed && <span>{tab.label}</span>}
                
                {!isSidebarCollapsed && tab.id === "projects" && (
                  <span className="admin-nav-tab-badge">
                    {data.projects?.length || 0}
                  </span>
                )}
                {!isSidebarCollapsed && tab.id === "ai" && (
                  <span className="admin-nav-tab-badge">
                    {data.aiKnowledge?.faqs?.length || 0}
                  </span>
                )}
              </button>
            );
          })}

          <div style={{ flex: 1 }} />
          
          <button 
            type="button"
            className="admin-nav-tab" 
            style={{ 
              marginTop: 'auto', 
              borderLeftColor: isMascotEnabled ? 'var(--accent-cyan)' : 'transparent', 
              color: isMascotEnabled ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              justifyContent: isSidebarCollapsed ? 'center' : 'flex-start'
            }}
            onClick={toggleMascot}
            title={isSidebarCollapsed ? `Pit Droid: ${isMascotEnabled ? "ON" : "OFF"}` : ""}
          >
            <span className="admin-nav-tab-icon">
              <FiRadio size={16} />
            </span>
            {!isSidebarCollapsed && <span>Pit Droid: {isMascotEnabled ? "ON" : "OFF"}</span>}
          </button>
        </nav>

        {/* Main Content Area */}
        <main className="admin-content" key={activeTab}>
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

          {activeTab === "analytics" && (
            <AnalyticsTab />
          )}
        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`admin-toast ${toastType === "error" ? "toast-error" : toastType === "warning" ? "toast-warning" : ""}`}>
          <FiCheckCircle className="admin-toast-icon" size={18} />
          <span className="admin-toast-text">{toastMessage}</span>
        </div>
      )}

      {/* Floating Pixel Mascot */}
      {isMascotEnabled && <MiniRaceEngineer activeTab={activeTab} />}
    </div>
  );
}
