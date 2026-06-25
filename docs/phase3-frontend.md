# Phase 3 Module README — Frontend Base Layout & Components

**Phase:** 3 of N
**Status:** Complete ✅
**Date:** 2026-06-16

---

## Phase 3 Purpose

Build the **Vue frontend component architecture** — proper reusable component stubs, Axios API client, museum layout structure, and filter bar. The backend remains unchanged from Phase 2. This phase establishes the component tree that all future phases will fill with live data.

---

## Component Architecture

```
App.vue (root layout + modal state)
  ├── SiteHeader.vue           — Museum entrance marquee (styled, complete)
  ├── ExhibitBanner.vue        — Curatorial introduction (styled, complete)
  ├── FilterBar.vue            — Era/Status/Recall filter controls (stub — disabled selects)
  ├── TimelineSidebar.vue      — Sidebar with era markers + API health check (stub)
  │     ├── Placeholder slots for Era Navigator, Country Index, Recall Categories
  │     ├── Color-coded era dots (sienna = Gift, gold = Short Lease, green = Modern)
  │     └── Live API health check (Axios → GET /api/health)
  ├── MapContainer.vue         — Leaflet mount point (stub — placeholder overlay)
  ├── CountryInfoModal.vue     — Vintage museum info bubble (stub — accepts props)
  ├── FactBubble.vue           — Static "Did You Know?" popup (styled, complete)
  └── SiteFooter.vue           — Museum credit placard (styled, complete)
```

### Component Roles & Future Data Flow

| Component | Current Role | Phase 4+ Role |
|---|---|---|
| `App.vue` | Layout composition, holds modal state | Will delegate state to Vue composable |
| `FilterBar.vue` | Static disabled selects | Emits filter changes → parent calls API with params |
| `TimelineSidebar.vue` | Era labels + API health check | Clickable eras filter map + program list |
| `MapContainer.vue` | Placeholder overlay | Leaflet map with color-coded country markers |
| `CountryInfoModal.vue` | Accepts `visible` + `countryName` props | Fetches full country + program data from API |
| `FactBubble.vue` | Static fact text | Dynamic facts sourced from dataset |

---

## API Client Setup (Axios)

### Why Axios over fetch()

| Feature | fetch() | Axios |
|---|---|---|
| Automatic JSON parsing | Manual (`.json()`) | ✅ Built-in |
| Request/response interceptors | Manual wrapper | ✅ Built-in |
| Timeout configuration | AbortController | ✅ Built-in (`timeout: 8000`) |
| Error normalization | Manual `.ok` check | ✅ Interceptor normalizes all errors |
| Base URL configuration | Manual concatenation | ✅ `axios.create({ baseURL: '/api' })` |

### Configuration (`client/src/services/api.js`)

- **Base URL:** `/api` — Vite proxy forwards to `http://localhost:3001` during development
- **Timeout:** 8 seconds
- **Response interceptor:** Unwraps `response.data` so callers get the API JSON directly
- **Error interceptor:** Normalizes errors to a consistent `Error` object with message

### Available API Functions

```js
import { fetchHealth, fetchCountries, fetchCountry, fetchPandas, fetchPanda } from './services/api.js';

// Health check
const health = await fetchHealth();        // { status: 'ok', ... }

// Countries
const all     = await fetchCountries();    // { count: 9, data: [...] }
const one     = await fetchCountry(1);     // { data: { id: 1, ... } }

// Panda programs
const all     = await fetchPandas();                          // { count: 12, data: [...] }
const filtered = await fetchPandas({ era: 'Gift Era (1957-1982)' });
const byStatus = await fetchPandas({ status: 'Active' });
const byCountry = await fetchPandas({ country_id: 1 });
```

---

## Split of UI vs Data Logic

This project enforces a strict separation:

| Concern | Lives Where | Example |
|---|---|---|
| **SQL queries** | `server/models/` | `SELECT * FROM panda_programs WHERE country_id = ?` |
| **HTTP routing** | `server/routes/` + `server/controllers/` | `GET /api/pandas?status=Active` |
| **API calls** | `client/src/services/api.js` | `fetchPandas({ status: 'Active' })` |
| **Component state** | `client/src/components/*.vue` | `const programs = ref([])` |
| **DOM rendering** | `client/src/components/*.vue` | `<template>` blocks |

**Rule:** Vue components never write SQL. Express never renders HTML. The `api.js` service is the only bridge.

---

## Frontend Dev Server Launch Steps

```bash
# 1. Make sure the backend is running (Terminal 1)
cd ~/Desktop/panda-project/server
npm run dev
# → http://localhost:3001

# 2. Start the Vue dev server (Terminal 2)
cd ~/Desktop/panda-project/client
npm run dev
# → http://localhost:5173

# 3. Open in browser
# http://localhost:5173
```

### First-time setup (if node_modules are missing):
```bash
cd ~/Desktop/panda-project/client
npm install
npm run dev
```

### Verifying the API connection:
- The sidebar shows a live **"✓ Backend connected"** or **"✗ Backend unreachable"** indicator
- Or visit `http://localhost:3001/api/health` directly in your browser

---

## Component File Map

| File | Purpose | Phase Added |
|---|---|---|
| `src/App.vue` | Root layout, modal state | 1 (updated 3) |
| `src/main.js` | Vue app bootstrap | 1 |
| `src/style.css` | Tailwind layers + museum components | 1 |
| `src/services/api.js` | Axios API client | 1 (rewritten 3: fetch → axios) |
| `src/components/SiteHeader.vue` | Museum entrance marquee | 1 |
| `src/components/ExhibitBanner.vue` | Curatorial introduction | 1 |
| `src/components/SiteFooter.vue` | Museum credit placard | 1 |
| `src/components/FactBubble.vue` | Vintage info popup | 1 |
| `src/components/Sidebar.vue` | Legacy sidebar (deprecated) | 1 (superseded by TimelineSidebar) |
| `src/components/TimelineSidebar.vue` | Era timeline + API health | 3 |
| `src/components/MapContainer.vue` | Leaflet mount point | 3 |
| `src/components/CountryInfoModal.vue` | Museum info bubble modal | 3 |
| `src/components/FilterBar.vue` | Era/Status/Recall filters | 3 |
| `src/components/MapPlaceholder.vue` | Old map placeholder (superseded) | 1 |
| `src/components/TimelinePlaceholder.vue` | Old timeline placeholder (superseded) | 1 |

---

## Edit Guide

### To wire up a component with API data:
1. Import the API function: `import { fetchPandas } from '../services/api.js'`
2. Create a reactive ref: `const programs = ref([])`
3. Fetch on mount: `onMounted(async () => { programs.value = (await fetchPandas()).data })`
4. Render in template: `<div v-for="p in programs">{{ p.male_panda_name }}</div>`

### To add a new filter to FilterBar:
1. Add a `<select>` with `v-model` binding
2. `defineEmits(['filter-change'])`
3. `watch` the model and emit the new filter value
4. Parent (App.vue) listens and calls the API with updated params

### To add a new component:
1. Create `client/src/components/ComponentName.vue`
2. Import and register in `client/src/App.vue`
3. Add it to the template in the correct layout position