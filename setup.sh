#!/bin/bash
# ===========================================================
# Panda Diplomacy Tracker — Setup & Launch Script (macOS/Linux/WSL)
# Run from panda-project root:  bash setup.sh
# ===========================================================

set -e

echo ""
echo "  🐼  Panda Diplomacy Global Tracker — Setup"
echo "  ─────────────────────────────────────────────"
echo ""

# ── 1. Server setup ──────────────────────────────────────
echo "  [1/4] Installing server dependencies..."
cd server
npm install
echo "  ✅  Server dependencies installed."
cd ..

# ── 2. Client setup ──────────────────────────────────────
echo "  [2/4] Installing client dependencies..."
cd client
npm install
echo "  ✅  Client dependencies installed."
cd ..

# ── 3. Seed database ────────────────────────────────────
echo "  [3/4] Seeding database..."
cd server
node database/seed.js
cd ..

# ── 4. Done ─────────────────────────────────────────────
echo ""
echo "  [4/4] ✅  Setup complete!"
echo ""
echo "  To start the application:"
echo "    Terminal 1:  cd server && npm run dev"
echo "    Terminal 2:  cd client && npm run dev"
echo "    Then open:   http://localhost:5173"
echo ""