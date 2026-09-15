import { create } from "zustand";

const INITIAL_PORTFOLIO_DATA = {
  identity: {
    name: "KSHITIZ",
    role: "Full-Stack Developer",
    roleSub: " & Builder",
    status: "available",
    statusLabel: "OPEN TO OPPORTUNITIES",
    location: "Bangalore , India (open to relocation)",
    yearsCoding: 1,
    projectsBuilt: 3,
    commits: 160,
    repos: 17,
    driverNumber: "18",
    driverId: "KSH-01",
    teamName: "GLADIATOR RACING",
    cardColor: "#e10600",
    avatarUrl: "/images/f1-driver-card.png",
    overallRating: 80,
    driverRatings: {
      exp: 70,
      cod: 75,
      sys: 85,
      pac: 86
    },
    bio: [
      "I am a Full-Stack Developer obsessed with building fast, scalable, and visually stunning digital experiences. I believe that great engineering isn't just about clean code but also about creating an interface that feels alive.",
      "When I'm not breaking my head over coding, you'll usually find me spending downtime with loved ones, gaming, or binge-watching a series. Travelling and exploring new cuisines are two things I hold close to my heart. And always remember: \"When life gives you lemonade, make lemons. Life will be all like, 'Whaaaat?'\""
    ],
    techHighlights: ["JAVA", "PYTHON", "MERN", "THREE.JS", "JAVASCRIPT"]
  },
  projects: [
    {
      id: "project-1",
      name: "ShinChan Life Simulator",
      tagline: "Multi-turn social RL environment teaching LLMs character alignment via TRL GRPO",
      category: "RL / AGENTS",
      techStack: ["OpenEnv", "TRL GRPO", "Hugging Face", "QloRA", "Python", "Docker", "PyTorch", "FastAPI"],
      highlight: "Outperformed random baselines using 4-bit QLoRA GRPO on Qwen-0.6B with dense multi-term rewards",
      description: "An OpenEnv-compliant reinforcement learning environment engineered for the Meta OpenEnv AI Hackathon. An LLM agent roleplays as Shin-chan navigating sequential social dilemmas across home, school, and neighborhood environments.",
      challenge: "Balancing persona consistency with ethical outcomes in short-horizon dilemmas without reward hacking",
      architecture: "OpenEnv MCP/HTTP server (FastAPI/Uvicorn) with TRL GRPOTrainer, Qwen-0.6B QLoRA, and a custom Gradio/Crayon UI",
      links: {
        demo: "https://gladiator-codes-sinchan-env.hf.space/play",
        repo: "https://github.com/Sarthaks-24/sinchan_env"
      },
      accentColor: "var(--accent-f1)"
    },
    {
      id: "project-2",
      name: "VibeMatch Beta",
      tagline: "Futuristic 3D destination intelligence pairing luxury global icons with high-value dupes",
      category: "WEB3D / CREATIVE TECH",
      techStack: ["Three.js", "Globe.gl", "WebGL", "JavaScript", "HTML5 Canvas", "Vercel"],
      highlight: "30+ global destination mappings rendering interactive 3D geospatial arcs & radar metrics at 60 FPS",
      description: "A futuristic 3D travel discovery engine that identifies affordable 'dupes' for high-cost global destinations with holographic data visualizations.",
      challenge: "Smoothly coordinating Three.js camera animations and dynamic geospatial arc rendering without WebGL frame drops.",
      architecture: "Client-side WebGL engine built on Three.js & Globe.gl with HTML5 Canvas radar visualizations.",
      links: {
        demo: "https://vibe-gamma-murex.vercel.app",
        repo: "https://github.com/GLADIATOR-CODING/vibe"
      },
      accentColor: "var(--accent-cyan)"
    },
    {
      id: "project-3",
      name: "NeonBreach Beta",
      tagline: "60 FPS cyber shmup with procedural synth audio, modular ships, and wave drafting",
      category: "GAMEDEV / WEBGL",
      techStack: ["Canvas Api", "Web Audio Api", "JavaScript", "HTML5 Canvas"],
      highlight: "Canvas engine with runtime procedural Web Audio and zero dependencies",
      description: "A fast-paced cyber arcade shooter built with pure HTML5 Canvas and JavaScript. Features 3 ships, bullet-hell patterns, and rogue-lite perk drafting.",
      challenge: "Synthesizing dynamic procedural audio purely at runtime via Web Audio API oscillators.",
      architecture: "Pure Canvas render loop, Web Audio API procedural synthesis, unified pointer/touch controls.",
      links: {
        demo: "https://neon-breach.vercel.app",
        repo: "https://github.com/GLADIATOR-CODING/neon-breach"
      },
      accentColor: "var(--accent-amber)"
    }
  ],
  experience: [
    {
      company: "Independent Engineer",
      role: "Full-Stack Developer",
      period: "2024 — Present",
      description: "Building production-grade distributed web applications, interactive WebGL 3D systems, and high-performance algorithms."
    }
  ],
  education: [
    {
      institution: "Bachelor of Technology",
      field: "Computer Science & Engineering",
      period: "2022 — 2026",
      details: "Focus on distributed systems, data structures, algorithms, and human-computer interfaces."
    }
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "Rust", "SQL", "HTML/CSS"],
    frameworks: ["React", "Next.js", "Node.js", "FastAPI", "React Native"],
    tools: ["Git", "Docker", "PostgreSQL", "Redis", "Firebase", "Figma"],
    concepts: ["System Design", "REST & GraphQL", "CI/CD", "Testing", "Agile"]
  },
  certifications: [
    {
      name: "Full Stack Software Engineering",
      issuer: "Advanced Engineering Program",
      date: "2024"
    }
  ],
  passions: [
    {
      id: "p1",
      category: "Racing & Motorsport",
      title: "Formula 1 Strategy & Telemetry",
      description: "Fascinated by tire degradation telemetry, pit strategy under safety cars, and aerodynamic ground-effects.",
      color: "#e10600",
      icon: "racing"
    },
    {
      id: "p2",
      category: "Cinema & Stories",
      title: "Psychological Thrillers & Sci-Fi",
      description: "Appreciating complex narratives, worldbuilding, and meticulous cinematography.",
      color: "#00f0ff",
      icon: "film"
    },
    {
      id: "p3",
      category: "Music & Sound",
      title: "Synthwave & Ambient Soundscapes",
      description: "Sound design and synth frequencies that power late-night coding flow states.",
      color: "#a855f7",
      icon: "music"
    },
    {
      id: "p4",
      category: "Global Exploration",
      title: "Travel & Culinary Culture",
      description: "Sampling street cuisines and exploring architectural landmarks around the globe.",
      color: "#10b981",
      icon: "globe"
    }
  ],
  socials: [
    {
      id: "github",
      href: "https://github.com/GLADIATOR-CODING",
      label: "GitHub",
      username: "@GLADIATOR-CODING",
      color: "var(--text-primary)"
    },
    {
      id: "linkedin",
      href: "https://www.linkedin.com/in/kshitiz-loharuka-479553377",
      label: "LinkedIn",
      username: "in/kshitiz-loharuka",
      color: "#0A66C2"
    },
    {
      id: "calendly",
      href: "https://calendly.com/loharukakshitiz",
      label: "Calendly",
      username: "Book a Call",
      color: "#006BFF"
    },
    {
      id: "twitter",
      href: "https://x.com/KshitizLoharuka",
      label: "X",
      username: "@KshitizLoharuka",
      color: "#ffffff"
    },
    {
      id: "email",
      href: "mailto:loharukakshitiz@gmail.com",
      label: "Email",
      username: "loharukakshitiz@gmail.com",
      color: "var(--accent-cyan)"
    },
    {
      id: "resume",
      href: "/resume.pdf",
      label: "Resume",
      username: "Download PDF",
      color: "var(--accent-amber)"
    }
  ],
  aiKnowledge: {
    faqs: [
      {
        q: "Are you open to relocation?",
        a: "Yes, open to relocating for the right opportunity. Currently based in India."
      },
      {
        q: "What's your favorite tech stack?",
        a: "React + Node.js + PostgreSQL for web. Rust for systems and CLI tools. Python for ML and scripting."
      },
      {
        q: "Who's the GOAT F1 driver?",
        a: "Statistically Hamilton or Schumacher, but my heart says Senna for raw talent and Verstappen for current era dominance."
      }
    ],
    extraNotes: "Motorsport mentality: Fast response times, clean architecture, high precision."
  }
};

const TOKEN_KEY = "f1_admin_telemetry_token";
const TARGET_API_KEY = "f1_admin_api_target";

export const usePortfolioStore = create((set, get) => ({
  data: INITIAL_PORTFOLIO_DATA,
  isLoading: false,
  isSaving: false,
  error: null,
  source: "initial",
  token: typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) || "" : "",
  isAuthenticated: false,
  isDemoMode: false,
  apiTarget: typeof window !== "undefined"
    ? localStorage.getItem(TARGET_API_KEY) || import.meta.env.VITE_PORTFOLIO_API_URL || "http://localhost:3000"
    : "http://localhost:3000",

  setApiTarget: (target) => {
    const clean = target.trim().replace(/\/+$/, "");
    localStorage.setItem(TARGET_API_KEY, clean);
    set({ apiTarget: clean });
  },

  setDemoMode: (isDemo) => {
    set({
      isDemoMode: isDemo,
      isAuthenticated: isDemo,
      source: isDemo ? "demo-sandbox" : "initial"
    });
  },

  // Initialize and fetch live portfolio data
  fetchPortfolio: async () => {
    const { apiTarget, isDemoMode } = get();
    if (isDemoMode) return;

    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${apiTarget}/api/portfolio`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();

      if (json.data) {
        set({
          data: {
            ...INITIAL_PORTFOLIO_DATA,
            ...json.data,
            identity: { ...INITIAL_PORTFOLIO_DATA.identity, ...json.data.identity },
            skills: { ...INITIAL_PORTFOLIO_DATA.skills, ...json.data.skills },
            aiKnowledge: { ...INITIAL_PORTFOLIO_DATA.aiKnowledge, ...json.data.aiKnowledge }
          },
          source: json.source || "api",
          isLoading: false
        });
      }
    } catch (err) {
      console.warn("Using offline portfolio fallback data:", err.message);
      set({ isLoading: false, source: "offline-fallback" });
    }
  },

  // Save current data state to backend and sync AI
  savePortfolio: async () => {
    const { data, token, apiTarget, isDemoMode } = get();

    if (isDemoMode) {
      set({ isSaving: true });
      await new Promise((r) => setTimeout(r, 600));
      set({ isSaving: false, source: "demo-sandbox" });
      return {
        success: true,
        message: "DEMO MODE: Telemetry updated in sandbox session (no live DB overwrite).",
        data
      };
    }

    if (!token) {
      throw new Error("Authentication required to update telemetry.");
    }

    set({ isSaving: true, error: null });
    try {
      const res = await fetch(`${apiTarget}/api/portfolio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ data })
      });

      const text = await res.text();
      let resJson;
      try {
        resJson = JSON.parse(text);
      } catch {
        throw new Error(`Server returned unexpected response (${res.status})`);
      }

      if (!res.ok) {
        throw new Error(resJson.message || resJson.error || "Failed to save portfolio data");
      }

      set({ isSaving: false, source: "redis" });
      return resJson;
    } catch (err) {
      set({ isSaving: false, error: err.message });
      throw err;
    }
  },

  // Reset data to defaults
  resetToDefaults: async () => {
    const { token, apiTarget, isDemoMode } = get();

    if (isDemoMode) {
      set({ data: INITIAL_PORTFOLIO_DATA, source: "demo-reset" });
      return;
    }

    if (!token) throw new Error("Authentication required.");
    set({ isSaving: true, error: null });
    try {
      const res = await fetch(`${apiTarget}/api/portfolio/reset`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to reset portfolio data");
      if (json.data) {
        set({ data: json.data, isSaving: false, source: "reset" });
      }
    } catch (err) {
      set({ isSaving: false, error: err.message });
      throw err;
    }
  },

  // Admin login
  login: async (password) => {
    const { apiTarget, isDemoMode } = get();
    set({ error: null });

    if (isDemoMode) {
      set({ isAuthenticated: true });
      return { success: true, message: "Entered Showcase Demo Mode" };
    }

    try {
      const res = await fetch(`${apiTarget}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error(`Server returned invalid response (${res.status})`);
      }

      if (!res.ok) {
        throw new Error(json.message || json.error || "Login rejected");
      }

      if (json.token) {
        localStorage.setItem(TOKEN_KEY, json.token);
        set({ token: json.token, isAuthenticated: true, error: null });
      }
      return json;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  },

  // Admin logout
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ token: "", isAuthenticated: false, isDemoMode: false });
  },

  // Verify token on load
  verifySession: async () => {
    const { token, apiTarget, isDemoMode } = get();
    if (isDemoMode) return true;

    if (!token) {
      set({ isAuthenticated: false });
      return false;
    }
    try {
      const res = await fetch(`${apiTarget}/api/admin/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        set({ isAuthenticated: true });
        return true;
      } else {
        localStorage.removeItem(TOKEN_KEY);
        set({ token: "", isAuthenticated: false });
        return false;
      }
    } catch {
      return false;
    }
  },

  // Mutate data locally
  updateData: (updater) => {
    set((state) => {
      const nextData = typeof updater === "function" ? updater(state.data) : { ...state.data, ...updater };
      return { data: nextData };
    });
  }
}));
