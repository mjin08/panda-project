/**
 * Panda Diplomacy Database — Schema Definition
 *
 * Relational design: Countries (1) → (N) PandaPrograms
 *
 * CS Architecture Notes:
 * - Foreign key with ON DELETE CASCADE: deleting a country removes its programs
 * - CHECK constraints enforce enum validity on recall_reason, loan_purpose, era, status
 * - Date fields use ISO 8601 TEXT (SQLite convention for date storage)
 * - Cub data stored as JSON array within PandaPrograms row (1:N within a single
 *   program — avoids a 3rd table for a bounded, small dataset)
 */

-- Countries table: one row per host nation
CREATE TABLE IF NOT EXISTS countries (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  country_name    TEXT    NOT NULL UNIQUE,
  iso_code        TEXT    NOT NULL UNIQUE,       -- ISO 3166-1 alpha-2
  diplomatic_baseline TEXT NOT NULL DEFAULT '',  -- baseline diplomatic relation summary
  created_at      TEXT    DEFAULT (datetime('now'))
);

-- PandaPrograms table: one row per panda loan program at a host country
CREATE TABLE IF NOT EXISTS panda_programs (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  country_id        INTEGER NOT NULL,
  male_panda_name   TEXT    NOT NULL DEFAULT '',
  female_panda_name TEXT    NOT NULL DEFAULT '',
  cub_names_json    TEXT    DEFAULT '[]',         -- JSON array: [{name, birth_year, repatriation_date}]
  loan_start_date   TEXT    NOT NULL,             -- YYYY-MM-DD or YYYY
  lease_end_date    TEXT,                         -- null = open-ended / still active
  panda_return_date TEXT,                         -- actual return, may differ from lease_end
  loan_purpose      TEXT    NOT NULL CHECK(loan_purpose IN ('conservation', 'cultural', 'diplomatic_thaw')),
  recall_reason     TEXT    CHECK(recall_reason IN (
    'Lease Expiry',
    'Conservation Policy',
    'Political Tension',
    'Zoo Funding Shortfall'
  )),
  diplomacy_era     TEXT    NOT NULL CHECK(diplomacy_era IN (
    'Gift Era (1957-1982)',
    'Short Lease Era (1982-1994)',
    'Modern Conservation Lease Era (1994-Present)'
  )),
  status_tag        TEXT    NOT NULL CHECK(status_tag IN ('Active', 'Returned', 'Early Politically Recalled')),
  bilateral_context TEXT    NOT NULL DEFAULT '',  -- free-text diplomatic backdrop
  created_at        TEXT    DEFAULT (datetime('now')),

  FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE
);

-- Index for common query: filter programs by country
CREATE INDEX IF NOT EXISTS idx_programs_country ON panda_programs(country_id);

-- Index for common query: filter programs by era
CREATE INDEX IF NOT EXISTS idx_programs_era ON panda_programs(diplomacy_era);

-- Index for common query: filter programs by status
CREATE INDEX IF NOT EXISTS idx_programs_status ON panda_programs(status_tag);