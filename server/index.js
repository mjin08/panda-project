/**
 * Panda Diplomacy API — Express Server Entry Point
 *
 * Architecture: MVC pattern
 *   Models      → server/models/       (database access layer)
 *   Routes      → server/routes/       (endpoint definitions)
 *   Controllers → server/controllers/   (request handling logic)
 */

require('dotenv').config();

const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 3001;

/* ── Middleware ─────────────────────────────────────────── */

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));

app.use(express.json());

/* ── API Routes ────────────────────────────────────────── */

// Health-check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Panda Diplomacy API',
    version: '0.1.0',
    phase: 1,
    timestamp: new Date().toISOString()
  });
});

// Panda program routes
const pandaRoutes = require('./routes/pandas');
app.use('/api/pandas', pandaRoutes);

// Country routes
const countryRoutes = require('./routes/countries');
app.use('/api/countries', countryRoutes);

/* ── 404 Fallback ──────────────────────────────────────── */

app.use('/api', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    hint: 'Available: GET /api/health, GET /api/pandas, GET /api/countries'
  });
});

/* ── Start Server ──────────────────────────────────────── */

app.listen(PORT, () => {
  console.log(`\n🐼  Panda Diplomacy API running at http://localhost:${PORT}`);
  console.log(`    Health check:  http://localhost:${PORT}/api/health`);
  console.log(`    Countries:     http://localhost:${PORT}/api/countries`);
  console.log(`    Panda programs:http://localhost:${PORT}/api/pandas`);
  console.log(`    Environment:   ${process.env.NODE_ENV || 'development'}\n`);
});