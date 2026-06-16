# Phase 2 Module README — Backend Database & API

**Phase:** 2 of N
**Status:** Complete ✅
**Date:** 2026-06-16

---

## Phase 2 Purpose

Build the **server-side data layer** — relational SQLite schema, model files, seed script with verified historical data, and REST API endpoints for countries. The frontend does not change in this phase; all work is server-side.

---

## Schema Design Breakdown

### Countries Table

| Column | Type | Constraints | Purpose |
|---|---|---|---|
| `id` | INTEGER | PK AUTOINCREMENT | Unique identifier |
| `country_name` | TEXT | NOT NULL UNIQUE | Full English name |
| `iso_code` | TEXT | NOT NULL UNIQUE | ISO 3166-1 alpha-2 (e.g. US, JP) |
| `diplomatic_baseline` | TEXT | NOT NULL DEFAULT '' | Summary of baseline bilateral relations |
| `created_at` | TEXT | DEFAULT datetime('now') | Timestamp |

### PandaPrograms Table (FK → countries.id)

| Column | Type | Constraints | Purpose |
|---|---|---|---|
| `id` | INTEGER | PK AUTOINCREMENT | Unique identifier |
| `country_id` | INTEGER | NOT NULL, FK → countries(id) ON DELETE CASCADE | Links program to host country |
| `male_panda_name` | TEXT | NOT NULL DEFAULT '' | Male panda name |
| `female_panda_name` | TEXT | NOT NULL DEFAULT '' | Female panda name |
| `cub_names_json` | TEXT | DEFAULT '[]' | JSON array: `[{name, birth_year, repatriation_date}]` |
| `loan_start_date` | TEXT | NOT NULL | When pandas arrived (YYYY-MM-DD or YYYY) |
| `lease_end_date` | TEXT | nullable | Contract end; null = open-ended / active |
| `panda_return_date` | TEXT | nullable | Actual physical return date (may differ from lease end) |
| `loan_purpose` | TEXT | CHECK IN ('conservation','cultural','diplomatic_thaw') | Official reason for loan |
| `recall_reason` | TEXT | CHECK IN ('Lease Expiry','Conservation Policy','Political Tension','Zoo Funding Shortfall') | Why pandas were recalled |
| `diplomacy_era` | TEXT | CHECK IN ('Gift Era (1957-1982)','Short Lease Era (1982-1994)','Modern Conservation Lease Era (1994-Present)') | Historical era tag |
| `status_tag` | TEXT | NOT NULL CHECK IN ('Active','Returned','Early Politically Recalled') | Current program status |
| `bilateral_context` | TEXT | NOT NULL DEFAULT '' | Free-text diplomatic backdrop |
| `created_at` | TEXT | DEFAULT datetime('now') | Timestamp |

### Foreign Key Reasoning

- **`country_id` → `countries.id` with `ON DELETE CASCADE`**: A panda program cannot exist without a host country. Deleting a country (e.g. if data was entered in error) automatically removes all its associated programs, preventing orphan rows.
- **Why not a separate cubs table?** Cub data is bounded (typically 0–4 cubs per program) and always accessed alongside its parent program. A JSON array within the programs row avoids an unnecessary 3rd table and JOIN for a small, nested dataset. This is a **deliberate denormalization trade-off** — documented here for portfolio review.

### Indexes

| Index | Column | Purpose |
|---|---|---|
| `idx_programs_country` | `country_id` | Fast lookup of all programs for a given country |
| `idx_programs_era` | `diplomacy_era` | Fast filter by era (common query) |
| `idx_programs_status` | `status_tag` | Fast filter by status (common query) |

---

## Seeded Data Summary

### 9 Countries

| # | Country | ISO | Key Context |
|---|---|---|---|
| 1 | United States | US | Nixon thaw, trade war, 2024 re-loan |
| 2 | Japan | JP | 1972 normalization, Ueno Zoo |
| 3 | United Kingdom | GB | Edinburgh Zoo, returned 2023 amid tensions |
| 4 | France | FR | Beauval Zoo, stable relations |
| 5 | Germany | DE | Berlin Zoo, EU-China investment talks |
| 6 | South Korea | KR | Everland Zoo, THAAD tensions didn't affect pandas |
| 7 | Austria | AT | Schönbrunn Zoo, most successful EU breeding |
| 8 | Russia (USSR) | RU | 1957 — first panda ever given abroad |
| 9 | Mexico | MX | 1975 gift — Xin Xin still there (last gift-era panda outside China) |

### 12 Panda Programs (full bilateral context in seed)

| Country | Pandas | Era | Status |
|---|---|---|---|
| US | Hsing-Hsing & Ling-Ling | Gift Era | Returned |
| US | Tian Tian & Mei Xiang | Modern Conservation | Early Politically Recalled |
| US | Bao Li & Qing Bao | Modern Conservation | Active |
| Japan | Kang Kang & Lan Lan | Gift Era | Returned |
| Japan | Ri Ri & Shin Shin | Modern Conservation | Active |
| UK | Yang Guang & Tian Tian | Modern Conservation | Early Politically Recalled |
| France | Yuan Zai & Huan Huan | Modern Conservation | Active |
| Germany | Jiao Qing & Meng Meng | Modern Conservation | Active |
| South Korea | Le Bao & Ai Bao | Modern Conservation | Active |
| Austria | Long Hui & Yang Yang | Modern Conservation | Active |
| Russia | An An & Ping Ping | Gift Era | Returned |
| Mexico | Pe Pe & Ying Ying | Gift Era | Returned |

---

## REST API Endpoints (Phase 2)

| Method | Endpoint | Description | Parameters |
|---|---|---|---|
| GET | `/api/health` | Server health check | — |
| GET | `/api/countries` | All countries (alphabetical) | — |
| GET | `/api/countries/:id` | Single country by ID | — |
| GET | `/api/pandas` | All panda programs (with country join) | `?era=`, `?status=`, `?country_id=` |
| GET | `/api/pandas/:id` | Single program by ID | — |

---

## How to Re-Seed / Edit Data

### Reset the entire database:
```bash
cd server
npm run seed
```
This is **idempotent** — it deletes the existing `.db` file and recreates everything from scratch.

### Add a new country:
1. Open `server/database/seed.js`
2. Add an object to the `countries` array:
   ```js
   { country_name: 'Thailand', iso_code: 'TH', diplomatic_baseline: '...' }
   ```
3. Re-run `npm run seed`

### Add a new panda program:
1. Open `server/database/seed.js`
2. Add an object to the `programs` array with the correct `country_id`
3. Re-run `npm run seed`

### Modify the schema:
1. Edit `server/database/schema.sql`
2. Delete the existing `.db` file (or just re-run seed, which auto-deletes it)
3. Re-run `npm run seed`

---

## Backend Launch Commands

```bash
# First time: install dependencies + seed database
cd server
npm install
npm run seed

# Every time after: start the API
npm run dev
# → http://localhost:3001
# → Test: http://localhost:3001/api/health
```

---

## Portfolio CS Value

This phase demonstrates:

1. **Relational Database Design** — Foreign keys, CHECK constraints, indexed columns, deliberate denormalization trade-off (cubs as JSON)
2. **MVC Architecture** — Models encapsulate SQL, controllers handle HTTP, routes define URL mapping. No layer crosses concerns.
3. **REST API Design** — Consistent response shapes (`{ count, data }`), query parameter filtering, proper HTTP status codes
4. **Idempotent Seed Scripts** — Database can be destroyed and rebuilt identically, supporting CI/CD and team workflows
5. **Data Integrity** — `ON DELETE CASCADE` prevents orphans, `CHECK` constraints prevent invalid enum values at the DB level