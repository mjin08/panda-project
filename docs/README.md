# Phase 1 Module README — Structural Skeleton

**Phase:** 1 of N
**Status:** Complete ✅
**Date:** 2026-06-15

---

## Phase 1 Purpose

Build the **empty museum-style base page shell** — the structural foundation upon which every future phase layers interactive content. No maps, no data, no timelines, no facts are rendered yet. This phase verifies:

- Folder structure is correct and navigable
- Museum visual identity (palette, typography, layout) is established
- Grid layout (sidebar + main content area) renders correctly
- Placeholder containers exist for every major component
- Fact bubble UI mechanism works (show/close animation)
- The site opens from a local file with zero server installs

---

## Architecture Breakdown

### File Tree

```
panda-project/
├── index.html              ← Entry point. Museum shell: header, sidebar, map placeholder, timeline placeholder, fact bubble, footer
├── css/
│   └── style.css           ← All museum exhibit styles. CSS custom properties for palette, typography, spacing. Responsive grid.
├── js/
│   └── main.js             ← PandaTracker app object. Phase 1: init + fact bubble show/close. Future phases add map, timeline, data modules here.
├── data/
│   └── schema.json         ← Dataset schema definition. Documents all mandatory tracking fields. No actual panda data yet (Phase 3).
├── assets/                  ← Empty. Future: panda illustrations, map marker icons, vintage textures.
└── docs/
    └── README.md            ← This file.
```

### Component Slots (Placeholder → Future Phase)

| Placeholder Location | HTML Element | CSS Class | Filled In Phase |
|---|---|---|---|
| Sidebar: Era Navigator | `<div class="sidebar__placeholder">` | `.sidebar__placeholder` | Phase 2 |
| Sidebar: Country Index | `<div class="sidebar__placeholder">` | `.sidebar__placeholder` | Phase 3 |
| Sidebar: Recall Categories | `<div class="sidebar__placeholder">` | `.sidebar__placeholder` | Phase 4 |
| Interactive World Map | `<div class="map-container__placeholder">` | `.map-container__placeholder` | Phase 3 |
| Historical Timeline | `<div class="timeline-container__placeholder">` | `.timeline-container__placeholder` | Phase 2 |
| Fact Bubble Content | `<div id="fact-bubble">` | `.fact-bubble` | Phase 4 (dynamic) |

---

## Data Logic — Schema Defined (No Data Yet)

Phase 1 defines the **schema** in `data/schema.json` so future phases know exactly what fields each country/panda record must contain:

| Field Group | Fields | Purpose |
|---|---|---|
| **Dates** | `loan_start_date`, `lease_end_date`, `physical_return_date` | Track the full lifecycle of each panda loan |
| **Names** | `pair_names`, `cubs[].cub_name`, `cubs[].repatriation_date` | Identify individual pandas and cub repatriation |
| **Loan Reason** | `official_loan_reason` | Cultural / Conservation / Diplomatic Thaw |
| **Recall Reason** | `recall_reason` | Lease Expiry / Wild Panda Conservation Policy / Bilateral Political Tension / Zoo Funding Failure |
| **Context** | `bilateral_context` | Free-text diplomatic background (e.g. Nixon thaw, trade war) |
| **Era Tag** | `era_tag` | Gift Era (1957–1982) / Short Lease Era (1982–1994) / Modern Conservation Lease Era (1994–Present) |

---

## Panda Diplomacy Facts Source

All historical data in this project is sourced from verified panda diplomacy records covering:

- **United States:** 1972 Nixon-era gift (Ling-Ling & Hsing-Hsing) through 2024 return and post-2024 thaw (Bao Li & Qing Bao)
- **Japan:** Multiple loan cycles, Ueno Zoo history
- **South Korea:** Ai Bao & Le Bao at Everland Zoo
- **United Kingdom:** Tian Tian & Yang Guang at Edinburgh Zoo
- **France:** Yuan Zi & Huan Huan at Beauval Zoo
- **Austria:** Yang Yang & Long Hui at Schönbrunn Zoo
- **Other EU nations** as applicable

Cross-referenced against: Chinese National Forestry and Grassland Administration announcements, host zoo press releases, bilateral diplomatic statements, and reputable journalism.

---

## Museum UX Design Notes

### Visual Identity Established in Phase 1

- **Palette:** Muted earth/forest tones — bamboo greens, parchment, aged paper, gold-leaf accents, burnt sienna highlights
- **Typography:** Playfair Display (headings), Lora (body), Source Serif 4 (placard text) — all serif, all museum-appropriate
- **Layout:** CSS Grid — fixed sidebar (280px) + fluid main area
- **Fact Bubbles:** Fixed-position vintage popup with fade-in animation, close button
- **Responsive:** Collapses to single-column below 900px

---

## Edit Guide

### To modify the museum palette:
Edit CSS custom properties in `css/style.css` → `:root` block. All color references use `var(--name)` so changing a property updates the entire site.

### To add a new placeholder section:
1. Add the HTML block in `index.html` inside the appropriate container
2. Add the CSS class in `css/style.css` following `.sidebar__placeholder` pattern
3. Document it in the Component Slots table above

### To add JavaScript behavior:
Extend the `PandaTracker` object in `js/main.js`. Create a new method (e.g. `_initTimeline()`) and call it from `init()`.

---

## Bug Notes

| ID | Description | Status |
|---|---|---|
| — | No bugs identified in Phase 1 skeleton | — |

---

## Future Expansion Notes

- **Phase 2:** Timeline module will replace `.timeline-container__placeholder` with an interactive horizontal/vertical era timeline. Sidebar "Era Navigator" becomes clickable.
- **Phase 3:** Leaflet world map replaces `.map-container__placeholder`. Country hotspots rendered from `data/pandas.json`. Sidebar "Country Index" populated.
- **Phase 4:** Fact bubbles become dynamic (sourced from dataset, appear on country click). Recall category filter panel activates in sidebar.
- **Phase 5+:** Chart.js statistics panel, search functionality, era comparison views.

---

## Quick Launch Recap

1. Open your file browser and navigate to your Desktop
2. Open the `panda-project` folder
3. Double-click `index.html` — it opens in your default browser
4. You should see the museum-styled skeleton with green header, sidebar placeholders, and a "Did You Know?" fact bubble that fades in after ~1 second

> **Alternative:** In a terminal at `~/Desktop/panda-project`, run `open index.html` (macOS) or `xdg-open index.html` (Linux/WSL) or `start index.html` (Windows Command Prompt).