@echo off
REM ===========================================================
REM Panda Diplomacy Tracker — Setup & Launch (Windows)
REM Run from panda-project root:  setup.bat
REM ===========================================================

echo.
echo   🐼  Panda Diplomacy Global Tracker — Setup
echo   ─────────────────────────────────────────────
echo.

REM ── 1. Server setup ──────────────────────────────
echo   [1/4] Installing server dependencies...
cd server
call npm install
echo   ✅  Server dependencies installed.
cd ..

REM ── 2. Client setup ──────────────────────────────
echo   [2/4] Installing client dependencies...
cd client
call npm install
echo   ✅  Client dependencies installed.
cd ..

REM ── 3. Seed database ────────────────────────────
echo   [3/4] Seeding database...
cd server
node database\seed.js
cd ..

REM ── 4. Done ─────────────────────────────────────
echo.
echo   [4/4] ✅  Setup complete!
echo.
echo   To start the application:
echo     Terminal 1:  cd server ^& npm run dev
echo     Terminal 2:  cd client ^& npm run dev
echo     Then open:   http://localhost:5173
echo.
pause