# 🐼 Panda Diplomacy Global Tracker

**A Digital Museum Exhibit — Interactive Panda Loan Tracking Across the World**

[![Phase](https://img.shields.io/badge/Phase-1_Skeleton-6b8f71)]() [![Tech](https://img.shields.io/badge/Stack-HTML5_+Tailwind_+Vanilla_JS-c9a84c)]() [![Status](https://img.shields.io/badge/Status-Phase_1_Complete-2d4a3e)]()

---

## Mission Statement

Panda Diplomacy Global Tracker is an interactive digital museum exhibit that maps, timelines, and contextualizes every giant panda loan China has made to foreign nations since 1957. It reveals the hidden diplomatic currents beneath each panda transfer — from Cold War friendship gifts to modern conservation leases shaped by geopolitical tensions, trade wars, and bilateral thaws.

This is not a zoo directory. This is a **diplomatic archive** — presented in the visual language of a natural history museum exhibit.

---

## Museum UX Design Mission

Every pixel of this project follows a **museum exhibit aesthetic**:

| Principle | Implementation |
|---|---|
| **Vintage, not modern** | Muted earth/forest palette (bamboo greens, parchment, aged paper, gold-leaf accents). No neon, no glassmorphism, no rounded-card SaaS look. |
| **Museum placard typography** | Serif fonts exclusively: Playfair Display (headings), Lora (body), Source Serif 4 (placard/label text). No sans-serif UI fonts. |
| **Info bubbles, not tooltips** | Vintage museum-style popup bubbles with "Did You Know?" labels — not sterile dev tooltips. |
| **Interactive like an exhibit** | Clickable country hotspots on a world map, embedded timeline, filter panels — the visitor explores, they don't just scroll. |
| **Placard text styling** | Exhibit descriptions read like museum wall text: authoritative, contextual, archival. |

---

## Tech Stack Glossary

| Technology | Version | Purpose | How Loaded |
|---|---|---|---|
| **HTML5** | Living standard | Semantic page structure | Local file |
| **Tailwind CSS** | v3 (CDN) | Utility-first layout assistance | `<script src="https://cdn.tailwindcss.com">` — zero install |
| **Vanilla JavaScript** | ES6+ | Application logic, DOM interaction, data rendering | Local `js/main.js` |
| **Chart.js** | v4 (CDN) — Phase 5+ | Statistical charts (era comparison, recall breakdown) | CDN `<script>` tag — not yet loaded |
| **Leaflet.js** | v1.9 (CDN) — Phase 3+ | Interactive world map with country hotspots | CDN `<script>` + `<link>` — not yet loaded |
| **Google Fonts** | CDN | Playfair Display, Lora, Source Serif 4 | `@import` in `css/style.css` |

> **No React. No frameworks. No build tools. No backend. No npm install.** Open `index.html` in a browser and the exhibit opens.

---

## Project Phase Roadmap

| Phase | Deliverable | Status |
|---|---|---|
| **1** | Structural skeleton — folder structure, museum-styled base page, placeholders, schema definition, dual READMEs | ✅ Complete |
| **2** | Timeline module — interactive historical era timeline (Gift Era → Short Lease → Modern Conservation), sidebar era navigator | ⬜ Pending |
| **3** | World map + country data — Leaflet map with clickable hotspots, full panda dataset (`data/pandas.json`), sidebar country index | ⬜ Pending |
| **4** | Fact bubbles + recall filters — dynamic info popups on country click, 4-category recall filter panel in sidebar | ⬜ Pending |
| **5** | Statistics panel — Chart.js visualizations (loans by era, recall reasons breakdown, diplomatic context clusters) | ⬜ Pending |
| **6+** | Search, comparison views, era deep-dives, additional countries, accessibility audit | ⬜ Pending |

---

## Dataset Definition

Every country/panda record in this project must include these **mandatory tracking fields**:

### 1. Date Tracking
| Field | Format | Example |
|---|---|---|
| `loan_start_date` | YYYY-MM-DD or YYYY | `1972-04-16` |
| `lease_end_date` | YYYY-MM-DD or YYYY or null | `2014-04-16` |
| `physical_return_date` | YYYY-MM-DD or null | `2023-11-08` |

### 2. Panda Names
| Field | Format | Example |
|---|---|---|
| `pair_names` | String | `"Ling-Ling & Hsing-Hsing"` |
| `cubs[].cub_name` | String | `"Tai Shan"` |
| `cubs[].repatriation_date` | YYYY-MM-DD or null | `"2010-02-04"` |

### 3. Official Loan Reason
| Value | Meaning |
|---|---|
| `cultural` | Cultural exchange / friendship gesture |
| `conservation` | Species conservation / breeding research |
| `diplomatic_thaw` | Signal of improving bilateral relations |

### 4. Panda Recall / Withdrawal Reason (4 Mandatory Categories)
| Category | Description |
|---|---|
| **Lease Expiry** | Contract term ended naturally; pandas returned on schedule |
| **Wild Panda Conservation Policy** | China recalled pandas to support wild population reintegration programs |
| **Bilateral Political Tension** | Pandas withdrawn as a diplomatic signal during deteriorating relations |
| **Zoo Funding Failure** | Host zoo could not meet financial or care standards; pandas recalled |

### 5. Bilateral Relation Context
Free-text field documenting the diplomatic backdrop: trade wars, state visits, diplomatic freezes, thawing relations, etc.

### 6. Era Tag
| Era | Period | Characteristic |
|---|---|---|
| **Gift Era** | 1957–1982 | Pandas given as permanent diplomatic gifts |
| **Short Lease Era** | 1982–1994 | Short-term loans began; ownership retained by China |
| **Modern Conservation Lease Era** | 1994–Present | Long-term conservation leases with breeding requirements and fees |

---

## Full Local Startup Launch Steps

> **Zero install required.** No Node.js, no Python, no server. Just a web browser.

### Option A — Double-Click (Simplest)

1. Open your computer's file browser (Finder on Mac, Explorer on Windows, Files on Linux)
2. Navigate to your **Desktop**
3. Open the **`panda-project`** folder
4. **Double-click `index.html`**
5. Your default browser opens the exhibit. Done.

### Option B — Browser File Menu

1. Open Chrome, Firefox, Edge, or Safari
2. Press **Ctrl+O** (Windows/Linux) or **Cmd+O** (Mac)
3. Navigate to `Desktop/panda-project/index.html`
4. Select it and click Open

### Option C — Terminal / Command Line

```bash
# Navigate to the project folder
cd ~/Desktop/panda-project

# Open in default browser (choose your OS):
# macOS:
open index.html

# Windows (Command Prompt or PowerShell):
start index.html

# Linux / WSL2:
xdg-open index.html
```

### Option D — VS Code Live Server (Optional, for hot-reload during editing)

1. Open the `panda-project` folder in VS Code
2. Install the "Live Server" extension (by Ritwick Dey)
3. Right-click `index.html` → "Open with Live Server"
4. Site opens at `http://127.0.0.1:5500` with auto-refresh on file saves

> **Note on WSL2:** If you're running from WSL2, the project folder is at `/mnt/c/Users/<your-username>/Desktop/panda-project/`. Use `explorer.exe index.html` or open it from the Windows side.

---

## What You Should See (Phase 1)

When you open `index.html`, you will see:

- ✅ Dark green museum header: **"Panda Diplomacy Global Tracker"**
- ✅ Gold subtitle banner: **"The Bamboo Diplomacy Archive"**
- ✅ Left sidebar with three labeled placeholder sections (Era Navigator, Country Index, Recall Categories)
- ✅ Main area with map placeholder (🌏 icon + "Interactive World Map — Phase 3")
- ✅ Timeline placeholder below map ("Historical Timeline — Phase 2")
- ✅ A "Did You Know?" fact bubble that fades in from the bottom-right after ~1 second
- ✅ Museum-styled footer with phase credit

---

## Changelog

| Phase | Date | Changes |
|---|---|---|
| 1 | 2026-06-15 | Initial skeleton: folder structure, museum styles, placeholder layout, schema definition, dual READMEs |

---

*Built with 🐾 and archival care.*