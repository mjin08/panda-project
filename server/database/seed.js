/**
 * Panda Diplomacy Database — Seed Script
 *
 * Creates the SQLite database file, runs schema.sql, and inserts
 * verified panda diplomacy data for 9 countries.
 *
 * Run:  cd server && npm run seed
 *
 * Data sources: Chinese National Forestry & Grassland Administration,
 * host zoo records, bilateral diplomatic statements, verified journalism.
 */

require('dotenv').config();
const path       = require('path');
const fs         = require('fs');
const Database   = require('better-sqlite3');

/* ── Database file setup ──────────────────────────────── */

// DB_PATH in .env is relative to server/ directory. __dirname is server/database/,
// so we resolve from the parent (server/) to match the .env intent.
const DB_PATH = path.resolve(__dirname, '..', process.env.DB_PATH || './database/panda_diplomacy.db');

// Remove existing DB so seed is idempotent
if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
  console.log('  🗑  Existing database removed.');
}

const db = new Database(DB_PATH);

// Enable foreign key enforcement (off by default in SQLite)
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

/* ── Run schema ───────────────────────────────────────── */

const schemaSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
db.exec(schemaSQL);
console.log('  ✅  Schema created.');

/* ── Insert Countries ─────────────────────────────────── */

const insertCountry = db.prepare(`
  INSERT INTO countries (country_name, iso_code, diplomatic_baseline)
  VALUES (@country_name, @iso_code, @diplomatic_baseline)
`);

const countries = [
  { country_name: 'United States', iso_code: 'US', diplomatic_baseline: 'Major power rival; periods of thaw (1972 Nixon visit) and tension (2018–2023 trade war). Post-2024 re-engagement with new panda loan.' },
  { country_name: 'Japan',         iso_code: 'JP', diplomatic_baseline: 'Complex historical relationship; pandas symbolize friendship despite territorial disputes. Longest continuous panda host in the West.' },
  { country_name: 'United Kingdom', iso_code: 'GB', diplomatic_baseline: 'Strained over Hong Kong, Huawei, human rights; Edinburgh Zoo pandas became symbol of fraying ties when returned 2023.' },
  { country_name: 'France',        iso_code: 'FR', diplomatic_baseline: 'Generally stable relations; Beauval Zoo has had successful breeding program.' },
  { country_name: 'Germany',       iso_code: 'DE', diplomatic_baseline: 'Strong trade ties; Berlin Zoo pandas arrived amid EU-China investment agreement discussions.' },
  { country_name: 'South Korea',   iso_code: 'KR', diplomatic_baseline: 'Cultural proximity but THAAD tensions 2016–2017; Everland Zoo pandas symbolize enduring people-to-people ties.' },
  { country_name: 'Austria',       iso_code: 'AT', diplomatic_baseline: 'Neutral diplomatic posture; Schönbrunn Zoo one of most successful breeding programs in Europe.' },
  { country_name: 'Russia',        iso_code: 'RU', diplomatic_baseline: 'Cold War-era panda gift to USSR in 1957; early symbol of Sino-Soviet solidarity before the split.' },
  { country_name: 'Mexico',        iso_code: 'MX', diplomatic_baseline: 'Received gift-era pandas in 1975; Chapultepec Zoo kept Xin Xin (descendant) long after gift era ended.' },
];

const insertCountries = db.transaction((rows) => {
  for (const row of rows) insertCountry.run(row);
});

insertCountries(countries);
console.log('  ✅  Countries inserted (9).');

/* ── Insert Panda Programs ────────────────────────────── */

const insertProgram = db.prepare(`
  INSERT INTO panda_programs (
    country_id, male_panda_name, female_panda_name, cub_names_json,
    loan_start_date, lease_end_date, panda_return_date,
    loan_purpose, recall_reason, diplomacy_era, status_tag, bilateral_context
  ) VALUES (
    @country_id, @male_panda_name, @female_panda_name, @cub_names_json,
    @loan_start_date, @lease_end_date, @panda_return_date,
    @loan_purpose, @recall_reason, @diplomacy_era, @status_tag, @bilateral_context
  )
`);

const programs = [
  // ── United States ──────────────────────────────
  {
    country_id: 1,
    male_panda_name: 'Hsing-Hsing',
    female_panda_name: 'Ling-Ling',
    cub_names_json: JSON.stringify([
      { name: 'Ling-Ling cub 1', birth_year: 1983, repatriation_date: null, note: 'died in infancy' },
      { name: 'Ling-Ling cub 2', birth_year: 1984, repatriation_date: null, note: 'died in infancy' },
      { name: 'Ling-Ling cub 3', birth_year: 1987, repatriation_date: null, note: 'died in infancy' },
      { name: 'Ling-Ling cub 4', birth_year: 1989, repatriation_date: null, note: 'died in infancy' },
    ]),
    loan_start_date: '1972-04-16',
    lease_end_date: null,
    panda_return_date: null,
    loan_purpose: 'diplomatic_thaw',
    recall_reason: null,
    diplomacy_era: 'Gift Era (1957-1982)',
    status_tag: 'Returned',
    bilateral_context: '1972 Nixon visit to Beijing — pandas given as gesture of diplomatic thaw. Both lived at National Zoo until deaths (Ling-Ling 1992, Hsing-Hsing 1999).'
  },
  {
    country_id: 1,
    male_panda_name: 'Tian Tian',
    female_panda_name: 'Mei Xiang',
    cub_names_json: JSON.stringify([
      { name: 'Tai Shan', birth_year: 2005, repatriation_date: '2010-02-04' },
      { name: 'Bao Bao', birth_year: 2013, repatriation_date: '2017-02-22' },
      { name: 'Bei Bei', birth_year: 2015, repatriation_date: '2019-11-21' },
      { name: 'Xiao Qi Ji', birth_year: 2020, repatriation_date: '2023-11-08' },
    ]),
    loan_start_date: '2000-12-06',
    lease_end_date: '2023-12-07',
    panda_return_date: '2023-11-08',
    loan_purpose: 'conservation',
    recall_reason: 'Political Tension',
    diplomacy_era: 'Modern Conservation Lease Era (1994-Present)',
    status_tag: 'Early Politically Recalled',
    bilateral_context: 'Originally 10-year lease extended multiple times. 2018–2023 US-China trade war and diplomatic freeze. Pandas returned months before lease expiry amid deteriorating relations.'
  },
  {
    country_id: 1,
    male_panda_name: 'Bao Li',
    female_panda_name: 'Qing Bao',
    cub_names_json: JSON.stringify([]),
    loan_start_date: '2024-10-15',
    lease_end_date: '2034-10-15',
    panda_return_date: null,
    loan_purpose: 'diplomatic_thaw',
    recall_reason: null,
    diplomacy_era: 'Modern Conservation Lease Era (1994-Present)',
    status_tag: 'Active',
    bilateral_context: 'Post-2024 US-China diplomatic thaw. New pair sent to Smithsonian National Zoo after November 2023 summit between Biden and Xi. Symbol of renewed engagement.'
  },

  // ── Japan ──────────────────────────────────────
  {
    country_id: 2,
    male_panda_name: 'Kang Kang',
    female_panda_name: 'Lan Lan',
    cub_names_json: JSON.stringify([]),
    loan_start_date: '1972-10-28',
    lease_end_date: null,
    panda_return_date: null,
    loan_purpose: 'diplomatic_thaw',
    recall_reason: null,
    diplomacy_era: 'Gift Era (1957-1982)',
    status_tag: 'Returned',
    bilateral_context: 'Gift following 1972 normalization of Sino-Japanese relations. Both lived at Ueno Zoo until deaths (Lan Lan 1979, Kang Kang 1980).'
  },
  {
    country_id: 2,
    male_panda_name: 'Ri Ri',
    female_panda_name: 'Shin Shin',
    cub_names_json: JSON.stringify([
      { name: 'Xiang Xiang', birth_year: 2017, repatriation_date: '2023-02-21' },
      { name: 'Twin cubs', birth_year: 2021, repatriation_date: null, note: 'one survived — Xiao Xiao' },
    ]),
    loan_start_date: '2011-02-11',
    lease_end_date: '2031-02-11',
    panda_return_date: null,
    loan_purpose: 'conservation',
    recall_reason: null,
    diplomacy_era: 'Modern Conservation Lease Era (1994-Present)',
    status_tag: 'Active',
    bilateral_context: 'Ueno Zoo lease; Xiang Xiang extremely popular, returned 2023. Lease extended. Cubs repatriated per China ownership policy.'
  },

  // ── United Kingdom ─────────────────────────────
  {
    country_id: 3,
    male_panda_name: 'Yang Guang',
    female_panda_name: 'Tian Tian',
    cub_names_json: JSON.stringify([]),
    loan_start_date: '2011-12-04',
    lease_end_date: '2021-12-04',
    panda_return_date: '2023-12-04',
    loan_purpose: 'conservation',
    recall_reason: 'Political Tension',
    diplomacy_era: 'Modern Conservation Lease Era (1994-Present)',
    status_tag: 'Early Politically Recalled',
    bilateral_context: 'Edinburgh Zoo 10-year lease. No cubs produced. UK-China relations deteriorated over Hong Kong, Huawei 5G ban, human rights. Lease extended briefly then pandas returned 2023.'
  },

  // ── France ─────────────────────────────────────
  {
    country_id: 4,
    male_panda_name: 'Yuan Zai',
    female_panda_name: 'Huan Huan',
    cub_names_json: JSON.stringify([
      { name: 'Yuan Meng', birth_year: 2017, repatriation_date: '2024' },
    ]),
    loan_start_date: '2012-01-15',
    lease_end_date: '2027-01-15',
    panda_return_date: null,
    loan_purpose: 'conservation',
    recall_reason: null,
    diplomacy_era: 'Modern Conservation Lease Era (1994-Present)',
    status_tag: 'Active',
    bilateral_context: 'Beauval Zoo lease. Yuan Meng born 2017, repatriated 2024. France-China relations generally stable despite EU-level tensions over trade.'
  },

  // ── Germany ────────────────────────────────────
  {
    country_id: 5,
    male_panda_name: 'Jiao Qing',
    female_panda_name: 'Meng Meng',
    cub_names_json: JSON.stringify([
      { name: 'Pit', birth_year: 2019, repatriation_date: '2023-12' },
      { name: 'Paul', birth_year: 2019, repatriation_date: '2023-12' },
    ]),
    loan_start_date: '2017-06-24',
    lease_end_date: '2037-06-24',
    panda_return_date: null,
    loan_purpose: 'conservation',
    recall_reason: null,
    diplomacy_era: 'Modern Conservation Lease Era (1994-Present)',
    status_tag: 'Active',
    bilateral_context: 'Berlin Zoo 20-year lease. Twin cubs Pit and Paul born 2019, repatriated late 2023. Arrived during EU-China investment agreement discussions.'
  },

  // ── South Korea ────────────────────────────────
  {
    country_id: 6,
    male_panda_name: 'Le Bao',
    female_panda_name: 'Ai Bao',
    cub_names_json: JSON.stringify([
      { name: 'Fu Bao', birth_year: 2020, repatriation_date: '2024-04-03' },
    ]),
    loan_start_date: '2016-03-03',
    lease_end_date: '2036-03-03',
    panda_return_date: null,
    loan_purpose: 'conservation',
    recall_reason: null,
    diplomacy_era: 'Modern Conservation Lease Era (1994-Present)',
    status_tag: 'Active',
    bilateral_context: 'Everland Zoo 15-year lease. Fu Bao born 2020, hugely popular, repatriated 2024 per China policy. THAAD tensions 2016–2017 did not affect panda program.'
  },

  // ── Austria ────────────────────────────────────
  {
    country_id: 7,
    male_panda_name: 'Long Hui',
    female_panda_name: 'Yang Yang',
    cub_names_json: JSON.stringify([
      { name: 'Fu Long', birth_year: 2007, repatriation_date: '2010' },
      { name: 'Fu Hu', birth_year: 2010, repatriation_date: '2013' },
      { name: 'Fu Bao', birth_year: 2013, repatriation_date: '2015' },
      { name: 'Twin cubs', birth_year: 2016, repatriation_date: '2018' },
    ]),
    loan_start_date: '2003-03-21',
    lease_end_date: null,
    panda_return_date: null,
    loan_purpose: 'conservation',
    recall_reason: null,
    diplomacy_era: 'Modern Conservation Lease Era (1994-Present)',
    status_tag: 'Active',
    bilateral_context: 'Schönbrunn Zoo lease. One of Europe\'s most successful breeding programs. Long Hui died 2016. All cubs repatriated per China policy. Austria\'s neutral diplomacy has kept program stable.'
  },

  // ── Russia (USSR) ──────────────────────────────
  {
    country_id: 8,
    male_panda_name: 'An An',
    female_panda_name: 'Ping Ping',
    cub_names_json: JSON.stringify([]),
    loan_start_date: '1957',
    lease_end_date: null,
    panda_return_date: null,
    loan_purpose: 'cultural',
    recall_reason: null,
    diplomacy_era: 'Gift Era (1957-1982)',
    status_tag: 'Returned',
    bilateral_context: 'First panda ever given to a foreign nation. Gift to USSR as symbol of socialist solidarity during Cold War. Preceded the Sino-Soviet split. Both lived at Moscow Zoo.'
  },

  // ── Mexico ─────────────────────────────────────
  {
    country_id: 9,
    male_panda_name: 'Pe Pe',
    female_panda_name: 'Ying Ying',
    cub_names_json: JSON.stringify([
      { name: 'Xin Xin', birth_year: 1990, repatriation_date: null, note: 'descendant still at Chapultepec Zoo — last gift-era panda outside China' },
    ]),
    loan_start_date: '1975-09-10',
    lease_end_date: null,
    panda_return_date: null,
    loan_purpose: 'cultural',
    recall_reason: null,
    diplomacy_era: 'Gift Era (1957-1982)',
    status_tag: 'Returned',
    bilateral_context: 'Gift-era pandas to Mexico. Xin Xin (granddaughter of original pair) remains at Chapultepec Zoo — the last gift-era panda still outside China, as gift-era cubs were not subject to repatriation.'
  },
];

const insertPrograms = db.transaction((rows) => {
  for (const row of rows) insertProgram.run(row);
});

insertPrograms(programs);
console.log('  ✅  Panda programs inserted (12).');

/* ── Verify ───────────────────────────────────────────── */

const countryCount = db.prepare('SELECT COUNT(*) AS count FROM countries').get();
const programCount = db.prepare('SELECT COUNT(*) AS count FROM panda_programs').get();

console.log(`\n  📊  Database summary:`);
console.log(`      Countries:      ${countryCount.count}`);
console.log(`      Panda programs: ${programCount.count}`);
console.log(`      DB location:    ${DB_PATH}\n`);

db.close();
console.log('  🐼  Seed complete. Database ready.\n');