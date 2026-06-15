# Phase 1 Module README — Full-Stack Skeleton

**Phase:** 1 of N
**Status:** Complete ✅
**Date:** 2026-06-15

---

## Phase 1 Purpose

Build the **full-stack structural skeleton** — the foundation upon which every future phase layers interactive content. This phase delivers:

- Complete Express MVC backend with REST API endpoints
- SQLite relational database with schema, constraints, and seeded data (9 countries, 12 programs)
- Vue 3 SPA frontend with 7 reusable components, Tailwind museum styling, and API service layer
- Zero data visualization yet — placeholders only — but the data pipeline (DB → Model → Controller → Route → API → Vue service → Component) is fully wired

---

## Architecture Decisions & CS Skill Showcase

### 1. MVC Pattern (server/)

| Layer | Directory | Responsibility |
|---|---|---|
| **Model** | `server/models/` | SQL queries, data access, JSON parsing. No HTTP knowledge. |
| **View** | N/A (SPA frontend) | Vue 3 handles all rendering. Express is API-only. |
| **Controller** | `server/controllers/` | HTTP request/response logic. Calls models, never writes SQL. |
| **Routes** | `server/routes/` | URL → controller mapping. Thin, declarative. |

**Why this matters for portfolio:** Demonstrates clean separation of concerns — a core CS design principle. Each layer is independently testable and replaceable.

### 2. Relational Schema Design (server/database/schema.sql)

- **Foreign key with ON DELETE CASCADE** — deleting a country removes its programs automatically
- **CHECK constraints** enforce enum validity (4 recall reasons, 3 loan purposes, 3 eras, 3 status tags)
- **Indexes** on frequently queried columns (country_id, diplomacy_era, status_tag)
- **Cub data as JSON array** within PandaPrograms — avoids a 3rd table for a bounded, small dataset (a deliberate denormalization trade-off, documented)

**Why this matters for portfolio:** Shows understanding of relational integrity, constraint-driven validation, and pragmatic schema design decisions.

### 3. REST API Design (server/routes/)

```
GET /api/health              → API status check
GET /api/countries           → All countries
GET /api/countries/:id       → Single country
GET /api/pandas              → All programs (supports ?era=, ?status=, ?country_id=)
GET /api/pandas/:id          → Single program
```

**Why this matters for portfolio:** Clean RESTful conventions. Query parameters for filtering (not separate endpoints). Consistent JSON response shape `{ count, data }`.

### 4. SPA Component Architecture (client/src/)

```
App.vue (root layout)
  ├── SiteHeader.vue          — Museum entrance marquee
  ├── ExhibitBanner.vue       — Curatorial introduction
  ├── Sidebar.vue             — Navigation + API health check
  ├── MapPlaceholder.vue      — Map slot (Phase 3)
  ├── TimelinePlaceholder.vue — Timeline slot (Phase 2)
  ├── FactBubble.vue          — Vintage info popup with Transition
  └── SiteFooter.vue          — Museum credit placard
```

**Why this matters for portfolio:** Demonstrates component composition, props-free phase 1 (data flows start Phase 2+), Vue `<Transition>` for museum "unveil" effect.

### 5. API Service Layer (client/src/services/api.js)

All fetch calls centralized in one module. Components never call fetch() directly.

**Why this matters for portfolio:** Shows understanding of abstraction layers — swapping the backend or adding auth headers requires changes in exactly one file.

---

## Data Pipeline Verification

The full data flow works end-to-end in Phase 1:

```
SQLite file (panda_diplomacy.db)
  → better-sqlite3 (synchronous driver)
    → PandaProgram model (SQL + JSON parse)
      → pandaController (HTTP response shaping)
        → Express route (/api/pandas)
          → Vite proxy (/api → localhost:3001)
            → api.js service (fetch wrapper)
              → Sidebar.vue (health check uses it)
```

Test it: start both servers, visit `http://localhost:3001/api/pandas` — you'll see all 12 programs with joined country data.

---

## Seeded Data Summary

### Countries (9)

| # | Country | ISO | Programs |
|---|---|---|---|
| 1 | United States | US | 3 (1972 gift, 2000 lease, 2024 thaw) |
| 2 | Japan | JP | 2 (1972 gift, 2011 lease) |
| 3 | United Kingdom | GB | 1 (2011 lease, returned 2023) |
| 4 | France | FR | 1 (2012 lease, active) |
| 5 | Germany | DE | 1 (2017 lease, active) |
| 6 | South Korea | KR | 1 (2016 lease, active) |
| 7 | Austria | AT | 1 (2003 lease, active) |
| 8 | Russia (USSR) | RU | 1 (1957 gift — first ever) |
| 9 | Mexico | MX | 1 (1975 gift, Xin Xin still there) |

### Panda Programs (12)

Full diplomatic context and bilateral notes for each program. Recall reasons populated where applicable (e.g. US 2023 return = "Political Tension", UK 2023 = "Political Tension").

---

## Component Slot Map (Placeholder → Future Phase)

| Component | Current State | Replaced In Phase |
|---|---|---|
| `Sidebar.vue` — Era Navigator | Placeholder slot | Phase 2 |
| `Sidebar.vue` — Country Index | Placeholder slot | Phase 3 |
| `Sidebar.vue` — Recall Categories | Placeholder slot | Phase 4 |
| `MapPlaceholder.vue` | Static placeholder | Phase 3 (becomes `MuseumMap.vue`) |
| `TimelinePlaceholder.vue` | Static placeholder | Phase 2 (becomes `EraTimeline.vue`) |
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

### To reset the database:
```bash
cd server
npm run seed   # Removes old DB and creates fresh seeded copy
```

---

## Bug Notes

| ID | Description | Status |
|---|---|---|
| — | No bugs identified in Phase 1 skeleton | — |

---

## Future Expansion Notes

- **Phase 2:** `TimelinePlaceholder.vue` → `EraTimeline.vue` — interactive vertical timeline with era markers, synced with map. Sidebar "Era Navigator" becomes clickable.
- **Phase 3:** `MapPlaceholder.vue` → `MuseumMap.vue` — Leaflet world map with clickable country hotspots, color-coded by panda status (Active=green, Returned=amber, Recalled=red). Country data fetched from API.
- **Phase 4:** Fact bubbles become dynamic (content from dataset, triggered by country click). Sidebar recall category filter panel activates.
- **Phase 5:** Chart.js statistics panel — era distribution, recall reason breakdown, diplomatic context clusters.

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