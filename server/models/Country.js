/**
 * Country Model
 *
 * Data access layer for the countries table.
 * All SQL is contained here — controllers never write raw SQL.
 *
 * Phase 1: basic read methods. Phase 2+: filters, joins.
 */

const { getDb } = require('./db');

const Country = {
  /**
   * Fetch all countries, ordered alphabetically.
   * @returns {Array} country rows
   */
  getAll() {
    const db = getDb();
    return db.prepare('SELECT * FROM countries ORDER BY country_name ASC').all();
  },

  /**
   * Fetch a single country by its ID.
   * @param {number} id
   * @returns {object|null}
   */
  getById(id) {
    const db = getDb();
    return db.prepare('SELECT * FROM countries WHERE id = ?').get(id);
  },

  /**
   * Fetch a country by ISO code.
   * @param {string} isoCode — e.g. 'US', 'JP'
   * @returns {object|null}
   */
  getByIso(isoCode) {
    const db = getDb();
    return db.prepare('SELECT * FROM countries WHERE iso_code = ?').get(isoCode);
  }
};

module.exports = Country;