# Phase 1 Module README — Full-Stack Skeleton

**Phase:** 1 of N
**Status:** Complete ✅
**Date:** 2026-06-15

---

## Phase 1 Purpose

Build the **full-stack structural skeleton** — the foundation upon which every future phase layers interactive content. This phase delivers:

- Express MVC backend with health-check endpoint and middleware (CORS, JSON parsing)
- Vue 3 SPA frontend with 7 reusable components, Tailwind museum styling, and API service layer
- Vite dev server configured with API proxy to Express backend
- Museum-styled placeholders for map, timeline, and sidebar sections
- Setup scripts for one-command dependency installation and database seeding
- Dual READMEs with full startup instructions

---

## Architecture Decisions & CS Skill Showcase

### 1. MVC Pattern (server/)

| Layer | Directory | Responsibility |
|---|---|---|
| **Model** | `server/models/` | SQL queries, data access, JSON parsing. No HTTP knowledge. |
| **View** | N/A (SPA frontend) | Vue 3 handles all rendering. Express is API-only. |
| **Controller** | `server/controllers/` | HTTP request/response logic. Calls models, never writes SQL. |
| **Routes** | `server/routes/` | URL → controller mapping. Thin, declarative. |

### 2. SPA Component Architecture (client/src/)

```
App.vue (root layout)
  ├── SiteHeader.vue          — Museum entrance marquee
  ├── ExhibitBanner.vue       — Curatorial introduction
  ├── Sidebar.vue             — Navigation + API health check
  ├── MapPlaceholder.vue      — Map slot (Phase 3)
  ├── TimelinePlaceholder.vue — Timeline slot (Phase 2+)
  ├── FactBubble.vue          — Vintage info popup with Vue Transition
  └── SiteFooter.vue          — Museum credit placard
```

### 3. API Service Layer (client/src/services/api.js)

All fetch calls centralized in one module. Components never call fetch() directly.

### 4. Vite Proxy (client/vite.config.js)

`/api` requests are proxied to `http://localhost:3001` during development. This avoids CORS issues and means the Vue dev server and Express API appear as a single origin to the browser.

---

## How Backend and Frontend Communicate Long-Term

```
SQLite file (panda_diplomacy.db)
  → better-sqlite3 (synchronous driver)
    → Model layer (SQL + JSON parse)
      → Controller (HTTP response shaping)
        → Express route (/api/...)
          → Vite proxy (/api → localhost:3001)
            → api.js service (fetch wrapper)
              → Vue component (renders UI)
```

- **Backend owns all data logic.** The Vue frontend never touches the database or writes SQL.
- **Frontend owns all rendering.** Express never serves HTML — only JSON.
- **Vite proxy bridges them in dev.** In production, both could be served from the same host.
- **Sidebar health check** proves the connection works by calling `GET /api/health` on mount.

---

## Component Slot Map (Placeholder → Future Phase)

| Component | Current State | Replaced In Phase |
|---|---|---|
| `Sidebar.vue` — Era Navigator | Placeholder slot | Phase 3 |
| `Sidebar.vue` — Country Index | Placeholder slot | Phase 3 |
| `Sidebar.vue` — Recall Categories | Placeholder slot | Phase 4 |
| `MapPlaceholder.vue` | Static placeholder | Phase 3 (becomes `MuseumMap.vue`) |
| `TimelinePlaceholder.vue` | Static placeholder | Phase 3 (becomes `EraTimeline.vue`) |
| `FactBubble.vue` | Static fact text | Phase 4 (dynamic content via props) |

---

## Edit Guide

### To add a new API endpoint:
1. Add a method in the relevant **model** (`models/PandaProgram.js` or `models/Country.js`)
2. Add a handler method in the corresponding **controller** (`controllers/pandaController.js`)
3. Add a route mapping in the **route** file (`routes/pandas.js`)
4. Add a fetch function in `client/src/services/api.js`
5. Call it from the Vue component that needs the data

### To modify the museum palette:
Edit `client/tailwind.config.js` → `theme.extend.colors` and `theme.extend.fontFamily`. All Tailwind classes reference these tokens.

### To add a new Vue component:
1. Create `client/src/components/ComponentName.vue`
2. Import and register it in `client/src/App.vue` (or a parent component)
3. Add it to the template

---

## Quick Launch Recap

```bash
# First time setup (installs deps + seeds DB):
cd ~/Desktop/panda-project
bash setup.sh          # or setup.bat on Windows

# Every time after:
# Terminal 1:
cd ~/Desktop/panda-project/server && npm run dev

# Terminal 2:
cd ~/Desktop/panda-project/client && npm run dev

# Open in browser:
# http://localhost:5173
```