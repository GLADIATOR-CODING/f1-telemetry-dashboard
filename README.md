# 🏁 F1 Pit Wall Telemetry & Content Management Cockpit

> **Race Director Telemetry Dashboard & Custom CMS** for [Kshitiz's 3D F1 Circuit Portfolio](https://kshitizlo.vercel.app).

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-5-brown.svg)](https://zustand-demo.pmnd.rs/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An independent, motorsport-inspired cockpit engineered to manage live portfolio data, dynamic F1 driver supercards, project dossiers, career timelines, and AI Race Engineer knowledge bases in real time.

---

## 🏎️ Architecture & Security Model

This dashboard operates as a **Decoupled Headless CMS**:

```
┌─────────────────────────────────────────┐          ┌─────────────────────────────────────────┐
│     F1 Telemetry Cockpit (Client)       │          │       Main Portfolio (Vercel API)       │
│  - Standalone React 19 + Vite app       │          │  - Public Read-Only Portfolio Frontend   │
│  - Runs on localhost:5174 / 3000 / demo │          │  - Serverless Telemetry API (/api/*)    │
│  - In-memory Showcase Sandbox mode      │          │  - Upstash Redis Cloud Cache/Storage    │
└────────────────────┬────────────────────┘          └────────────────────▲────────────────────┘
                     │                                                    │
                     │  POST /api/portfolio (Bearer HMAC Session Token)   │
                     │  CORS-Guarded (Authorized Localhost & Origins)     │
                     └────────────────────────────────────────────────────┘
```

### Security Highlights
- **Zero Exposure on Public Portfolio**: The deployed portfolio (`link`) contains no admin bundle, UI routes, or login forms.
- **Strict CORS Origin Whitelisting**: Serverless functions only accept mutation calls from authorized localhost ports and verified origins.
- **Constant-Time Cryptographic Passkey Verification**: Secured with bcrypt and SHA-256 constant-time comparisons (`crypto.timingSafeEqual`).
- **Cryptographically Signed Session Tokens**: Employs timestamped, nonce-salted HMAC-SHA256 tokens with automated 14-day expiry.

---

## 🛠️ Features

- **7 Dedicated Pit Wall Tabs**:
  1. **Driver Identity**: Car number, team name, card styling, live driver ratings (EXP, COD, SYS, PAC), and biography dossier.
  2. **Projects Garage**: Reorder, add, or decommission featured projects, edit metrics, architecture notes, demo/GitHub links.
  3. **Parc Fermé (Experience & Education)**: Career chronology, milestone bullets, academic credentials, and GPA.
  4. **Telemetry & Skills**: Language matrix, frameworks, cloud tools, system design concepts, and verified certificates.
  5. **Paddock Passions**: Off-track dossiers, cinema favorites, music soundscapes, hot takes, and custom vector icons.
  6. **AI Race Engineer Tuning**: Curate FAQs and custom lore, plus a live interactive Gemini radio test bench.
  7. **Pit Wall Comms**: Social telemetry handles, GitHub, LinkedIn, email, and resume downloads.
- **Export & Import Backups**: Single-click JSON telemetry backup export and hot-reloading file import.
- **Showcase Sandbox Mode**: Recruiters and reviewers can explore all tabs and edit inputs without mutating the live production database.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Target Backend
By default, the dashboard connects to `http://localhost:3000` (when running alongside `vercel dev`).
To connect to your live production portfolio, copy `.env.example` to `.env`:

```env
VITE_PORTFOLIO_API_URL=https:"link"
```
*(You can also change the target server directly from the login screen in the UI).*

### 3. Launch Development Server
```bash
npm run dev
```
Open `http://localhost:5174` in your browser.

---

## 📦 Pushing to a New GitHub Repository

To showcase this project on your GitHub profile:

```bash
git init
git add .
git commit -m "feat: initial commit for F1 Telemetry Admin Cockpit"
git branch -M main
git remote add origin https://github.com/GLADIATOR-CODING/f1-telemetry-dashboard.git
git push -u origin main
```

---

## 📄 License
MIT © [Kshitiz Loharuka](https://kshitizlo.vercel.app)
