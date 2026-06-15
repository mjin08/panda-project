/**
 * PandaProgram Model
 *
 * Data access layer for the panda_programs table.
 * Handles JSON parsing for cub_names_json on read.
 *
 * Phase 1: basic reads. Phase 2+: filtered queries, aggregation.
 */

const { getDb } = require('./db');

const PandaProgram = {
  /**
   * Fetch all programs, with country name joined.
   * @returns {Array} program rows with country_name field
   */
  getAll() {
    const db = getDb();
    const rows = db.prepare(`
      SELECT p.*, c.country_name, c.iso_code
      FROM panda_programs p
      JOIN countries c ON p.country_id = c.id
      ORDER BY p.loan_start_date ASC
    `).all();
    return rows.map(row => ({
      ...row,
      cub_names: JSON.parse(row.cub_names_json)
    }));
  },

  /**
   * Fetch programs for a specific country.
   * @param {number} countryId
   * @returns {Array}
   */
  getByCountryId(countryId) {
    const db = getDb();
    const rows = db.prepare(`
      SELECT p.*, c.country_name, c.iso_code
      FROM panda_programs p
      JOIN countries c ON p.country_id = c.id
      WHERE p.country_id = ?
      ORDER BY p.loan_start_date ASC
    `).all(countryId);
    return rows.map(row => ({
      ...row,
      cub_names: JSON.parse(row.cub_names_json)
    }));
  },

  /**
   * Fetch a single program by ID.
   * @param {number} id
   * @returns {object|null}
   */
  getById(id) {
    const db = getDb();
    const row = db.prepare(`
      SELECT p.*, c.country_name, c.iso_code
      FROM panda_programs p
      JOIN countries c ON p.country_id = c.id
      WHERE p.id = ?
    `).get(id);
    if (!row) return null;
    return {
      ...row,
      cub_names: JSON.parse(row.cub_names_json)
    };
  },

  /**
   * Fetch programs filtered by diplomacy era.
   * @param {string} era — one of the 3 valid era strings
   * @returns {Array}
   */
  getByEra(era) {
    const db = getDb();
    const rows = db.prepare(`
      SELECT p.*, c.country_name, c.iso_code
      FROM panda_programs p
      JOIN countries c ON p.country_id = c.id
      WHERE p.diplomacy_era = ?
      ORDER BY p.loan_start_date ASC
    `).all(era);
    return rows.map(row => ({
      ...row,
      cub_names: JSON.parse(row.cub_names_json)
    }));
  },

  /**
   * Fetch programs filtered by status tag.
   * @param {string} status — Active | Returned | Early Politically Recalled
   * @returns {Array}
   */
  getByStatus(status) {
    const db = getDb();
    const rows = db.prepare(`
      SELECT p.*, c.country_name, c.iso_code
      FROM panda_programs p
      JOIN countries c ON p.country_id = c.id
      WHERE p.status_tag = ?
      ORDER BY p.loan_start_date ASC
    `).all(status);
    return rows.map(row => ({
      ...row,
      cub_names: JSON.parse(row.cub_names_json)
    }));
  }
};

module.exports = PandaProgram;