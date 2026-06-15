/**
 * Database Connection Module
 *
 * Provides a singleton better-sqlite3 connection used by all models.
 * Reads DB_PATH from .env; falls back to default path.
 *
 * CS Note: better-sqlite3 is synchronous by design — avoids callback
 * hell and is faster for SQLite's local-file access pattern.
 */

require('dotenv').config();
const path     = require('path');
const Database = require('better-sqlite3');

// __dirname = server/models/ — go up to server/, then into database/
const DB_PATH = path.resolve(__dirname, '../database/panda_diplomacy.db');

let db = null;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
  }
  return db;
}

module.exports = { getDb };