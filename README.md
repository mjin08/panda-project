# 🐼 Panda Diplomacy Global Tracker

**A Full-Stack Digital Museum Exhibit — Interactive Panda Loan Tracking Across the World**

[![Stack](https://img.shields.io/badge/Stack-Vue_3_+Express_+SQLite-c9a84c)]() [![Phase](https://img.shields.io/badge/Phase-3_Frontend_Complete-6b8f71)]() [![License](https://img.shields.io/badge/Portfolio_Project-2026-2d4a3e)]()

---

## Mission Statement

Panda Diplomacy Global Tracker is a full-stack interactive digital museum exhibit that maps, timelines, and contextualizes every giant panda loan China has made to foreign nations since 1957. It reveals the hidden diplomatic currents beneath each panda transfer — from Cold War friendship gifts to modern conservation leases shaped by geopolitical tensions, trade wars, and bilateral thaws.

Built as a **Computer Science portfolio piece**, the project demonstrates: MVC architecture, REST API design, relational database schema design with foreign keys and constraints, SPA componentization, and separated frontend/backend concerns.

---

## Museum UX Design Mission

Every pixel follows a **museum exhibit aesthetic**:

| Principle | Implementation |
|---|---|
| **Vintage, not modern** | Muted earth/forest palette (bamboo greens, parchment, aged paper, gold-leaf accents). No neon, no glassmorphism. |
| **Museum placard typography** | Serif fonts exclusively: Playfair Display (headings), Lora (body), Source Serif 4 (placard text). |
| **Info bubbles, not tooltips** | Vintage museum-style popup bubbles with "Did You Know?" labels. |
| **Interactive like an exhibit** | Clickable country hotspots on a world map, synced vertical timeline, filter panels — the visitor explores. |
| **Placard text styling** | Exhibit descriptions read like museum wall text: authoritative, contextual, archival. |

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Vue 3 + Vite | SPA with reusable components |
| **Styling** | Tailwind CSS v3 | Utility-first museum palette |
| **Map** | Leaflet.js | Interactive world map with country hotspots |
| **Charts** | Chart.js | Statistical visualizations |
| **Backend** | Node.js + Express | REST API serving filtered/sorted data |
| **Database** | SQLite (better-sqlite3) | Persistent relational data, zero server config |
| **API Pattern** | MVC | Models → Controllers → Routes separation |

> **No Postgres. No MySQL server. No Docker.** SQLite file DB keeps the project portable on any desktop.

---

## Project Structure

```
panda-project/
├── README.md                    ← This file
├── .gitignore
├── setup.sh                     ← macOS/Linux/WSL setup script
├── setup.bat                    ← Windows setup script
│
├── server/                      ← Express REST API (MVC)
│   ├── package.json
│   ├── .env.example             ← Environment template (copy to .env)
│   ├── .env                     ← Port, DB path, CORS config (gitignored)
│   ├── index.js                 ← Server entry point
│   ├── database/
│   │   ├── schema.sql           ← DDL: countries + panda_programs tables
│   │   └── seed.js              ← Idempotent seed: 9 countries, 12 programs
│   ├── models/
│   │   ├── db.js                ← SQLite connection singleton
│   │   ├── Country.js           ← Countries data access layer
│   │   └── PandaProgram.js      ← Panda programs data access layer
│   ├── controllers/
│   │   ├── countryController.js ← Countries request handlers
│   │   └── pandaController.js   ← Panda programs request handlers
│   └── routes/
│       ├── countries.js         ← GET /api/countries endpoints
│       └── pandas.js            ← GET /api/pandas endpoints
│
├── client/                      ← Vue 3 + Vite SPA
│   ├── package.json
│   ├── vite.config.js           ← Dev server + API proxy config
│   ├── tailwind.config.js       ← Custom museum palette tokens
│   ├── postcss.config.js
│   ├── index.html               ← SPA shell
│   └── src/
│       ├── main.js              ← Vue app bootstrap
│       ├── style.css            ← Tailwind layers + museum components
│       ├── App.vue              ← Root layout component
│       ├── services/
│       │   └── api.js           ← Axios API client (baseURL: /api, interceptors)
│       └── components/
│           ├── SiteHeader.vue
│           ├── ExhibitBanner.vue
│           ├── Sidebar.vue       ← Legacy (deprecated — see TimelineSidebar)
│           ├── TimelineSidebar.vue ← Era markers + API health check
│           ├── MapContainer.vue  ← Leaflet map mount point
│           ├── CountryInfoModal.vue ← Museum info bubble modal
│           ├── FilterBar.vue     ← Era/Status/Recall filter controls
│           ├── MapPlaceholder.vue
│           ├── TimelinePlaceholder.vue
│           ├── FactBubble.vue
│           └── SiteFooter.vue
│
└── docs/
    ├── README.md                ← Phase 1 Module README
    ├── phase2-backend.md        ← Phase 2 Backend Database README
    └── phase3-frontend.md       ← Phase 3 Frontend Components README
```

---

## Relational Database Schema

### Countries Table

| Column | Type | Constraints |
|---|---|---|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT |
| `country_name` | TEXT | NOT NULL UNIQUE |
| `iso_code` | TEXT | NOT NULL UNIQUE (ISO 3166-1 alpha-2) |
| `diplomatic_baseline` | TEXT | NOT NULL DEFAULT '' |
| `created_at` | TEXT | DEFAULT datetime('now') |

### PandaPrograms Table (FK → countries.id)

| Column | Type | Constraints |
|---|---|---|
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT |
| `country_id` | INTEGER | NOT NULL, FK → countries(id) ON DELETE CASCADE |
| `male_panda_name` | TEXT | NOT NULL DEFAULT '' |
| `female_panda_name` | TEXT | NOT NULL DEFAULT '' |
| `cub_names_json` | TEXT | DEFAULT '[]' (JSON array of cub objects) |
| `loan_start_date` | TEXT | NOT NULL |
| `lease_end_date` | TEXT | nullable (open-ended / still active) |
| `panda_return_date` | TEXT | nullable (may differ from lease_end) |
| `loan_purpose` | TEXT | CHECK IN ('conservation','cultural','diplomatic_thaw') |
| `recall_reason` | TEXT | CHECK IN ('Lease Expiry','Conservation Policy','Political Tension','Zoo Funding Shortfall') |
| `diplomacy_era` | TEXT | CHECK IN ('Gift Era (1957-1982)','Short Lease Era (1982-1994)','Modern Conservation Lease Era (1994-Present)') |
| `status_tag` | TEXT | NOT NULL CHECK IN ('Active','Returned','Early Politically Recalled') |
| `bilateral_context` | TEXT | NOT NULL DEFAULT '' |
| `created_at` | TEXT | DEFAULT datetime('now') |

**Indexes:** `idx_programs_country`, `idx_programs_era`, `idx_programs_status`

---

## Phase Roadmap

| Phase | Deliverable | Status |
|---|---|---|
| **1** | Full-stack skeleton: Express API + Vue SPA shell + museum styling + setup scripts + READMEs | ✅ Complete |
| **2** | Backend database: SQLite schema, models, seed data (9 countries, 12 programs), REST API endpoints for countries | ✅ Complete |
| **3** | Frontend base: Vue component architecture (MapContainer, TimelineSidebar, CountryInfoModal, FilterBar), Axios API client, museum layout | ✅ Complete |
| **4** | World map: Leaflet map with clickable country hotspots, color-coded by status, data-driven from API | ⬜ Pending |
| **3** | World map: Leaflet map with clickable country hotspots, color-coded by status, data-driven from API | ⬜ Pending |
| **4** | Fact bubbles + filters: dynamic info popups on country click, 4-category recall filter panel | ⬜ Pending |
| **5** | Statistics panel: Chart.js visualizations (loans by era, recall breakdown, context clusters) | ⬜ Pending |
| **6+** | Search, comparison views, era deep-dives, accessibility audit, deployment guide | ⬜ Pending |

---

## Local Startup Instructions

> **Prerequisites:** Node.js 18+ installed (https://nodejs.org). No other tools needed.

### Quick Start (automated)

**macOS / Linux / WSL:**
```bash
cd ~/Desktop/panda-project
bash setup.sh
```

**Windows:**
```cmd
cd %USERPROFILE%\Desktop\panda-project
setup.bat
```

### Manual Start (step by step)

Open **two terminal windows** — one for the backend, one for the frontend.

**Terminal 1 — Backend API:**
```bash
# 1. Install server dependencies (first time only)
cd ~/Desktop/panda-project/server
npm install

# 2. Seed the database (first time only, or to reset data)
npm run seed

# 3. Start the API server
npm run dev
# → Runs at http://localhost:3001
# → Test: open http://localhost:3001/api/health in browser
```

**Terminal 2 — Frontend SPA:**
```bash
# 1. Install client dependencies (first time only)
cd ~/Desktop/panda-project/client
npm install

# 2. Start the Vue dev server
npm run dev
# → Runs at http://localhost:5173
# → Open this URL in your browser
```

**To view the site:** Open **http://localhost:5173** in your browser.

### Verifying the API Works

Open these URLs directly in your browser:
- `http://localhost:3001/api/health` — should return `{"status":"ok",...}`
- `http://localhost:3001/api/countries` — should return 9 countries
- `http://localhost:3001/api/pandas` — should return 12 panda programs
- `http://localhost:3001/api/pandas?era=Gift+Era+(1957-1982)` — filtered by era

The Vue app sidebar also shows a live "✓ Backend connected" / "✗ Backend unreachable" indicator.

---

## What You Should See (Phase 1)

When you open **http://localhost:5173**, you will see:

- ✅ Dark green museum header: **"Panda Diplomacy Global Tracker"**
- ✅ Gold subtitle banner: **"The Bamboo Diplomacy Archive"**
- ✅ Left sidebar with three placeholder sections (Era / Country / Recall)
- ✅ Sidebar API status indicator (live health check)
- ✅ Map placeholder (🌏 icon + "arriving Phase 3")
- ✅ Timeline placeholder ("arriving Phase 2")
- ✅ "Did You Know?" fact bubble fades in from bottom-right after ~1 second
- ✅ Museum-styled footer

---

## Data Sources

All historical data sourced from verified panda diplomacy records:
- **United States:** 1972 Nixon gift (Ling-Ling & Hsing-Hsing), 2000 conservation lease (Mei Xiang & Tian Tian), 2024 thaw re-loan (Bao Li & Qing Bao)
- **Japan:** 1972 normalization gift, 2011 Ueno Zoo lease (Shin Shin & Ri Ri)
- **United Kingdom:** 2011 Edinburgh Zoo lease (Tian Tian & Yang Guang), returned 2023
- **France:** 2012 Beauval Zoo lease (Huan Huan & Yuan Zai)
- **Germany:** 2017 Berlin Zoo lease (Meng Meng & Jiao Qing)
- **South Korea:** 2016 Everland Zoo lease (Ai Bao & Le Bao)
- **Austria:** 2003 Schönbrunn Zoo lease (Yang Yang & Long Hui)
- **USSR/Russia:** 1957 gift (An An & Ping Ping) — first panda ever given abroad
- **Mexico:** 1975 gift (Pe Pe & Ying Ying) — last gift-era descendant (Xin Xin) still in Mexico

Cross-referenced against: Chinese National Forestry and Grassland Administration, host zoo press releases, bilateral diplomatic statements, verified journalism.

---

## Changelog

| Phase | Date | Changes |
|---|---|---|
| 1 | 2026-06-15 | Full-stack skeleton: Express MVC API, Vue 3 SPA shell with 7 components, Tailwind museum palette, API health check, dual READMEs, setup scripts |
| 2 | 2026-06-16 | Backend database: SQLite schema (countries + panda_programs with FK/CHECK/indexes), model files (Country, PandaProgram, db), seed script (9 countries, 12 programs), REST routes + controllers, Phase 2 Backend README |
| 3 | 2026-06-16 | Frontend components: MapContainer, TimelineSidebar, CountryInfoModal, FilterBar stubs; Axios API client (replaces fetch); museum layout with filter bar + modal state; Phase 3 Frontend README |

---

*Built with 🐾 and archival care. Portfolio project — Vue 3 · Express · SQLite · MVC · REST*