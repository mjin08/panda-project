/**
 * Panda Program Controller
 *
 * Handles HTTP request/response logic for panda program endpoints.
 * Delegates data access to PandaProgram model — no SQL here.
 *
 * CS Note: This separation (controller → model) is the core of MVC.
 * Controllers handle HTTP concerns; models handle data concerns.
 */

const PandaProgram = require('../models/PandaProgram');

const pandaController = {
  /**
   * GET /api/pandas
   * Fetch all panda programs. Supports optional query filters:
   *   ?era=...      — filter by diplomacy era
   *   ?status=...   — filter by status tag
   *   ?country_id=... — filter by country
   */
  getAll(req, res) {
    try {
      const { era, status, country_id } = req.query;

      // Apply first matching filter (Phase 2: compound filters)
      let programs;
      if (era) {
        programs = PandaProgram.getByEra(era);
      } else if (status) {
        programs = PandaProgram.getByStatus(status);
      } else if (country_id) {
        programs = PandaProgram.getByCountryId(parseInt(country_id));
      } else {
        programs = PandaProgram.getAll();
      }

      res.json({ count: programs.length, data: programs });
    } catch (err) {
      console.error('[pandaController.getAll]', err.message);
      res.status(500).json({ error: 'Failed to fetch panda programs' });
    }
  },

  /**
   * GET /api/pandas/:id
   * Fetch a single panda program by ID.
   */
  getById(req, res) {
    try {
      const program = PandaProgram.getById(parseInt(req.params.id));
      if (!program) {
        return res.status(404).json({ error: 'Panda program not found' });
      }
      res.json({ data: program });
    } catch (err) {
      console.error('[pandaController.getById]', err.message);
      res.status(500).json({ error: 'Failed to fetch panda program' });
    }
  }
};

module.exports = pandaController;