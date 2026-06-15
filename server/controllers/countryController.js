/**
 * Country Controller
 *
 * Handles HTTP request/response logic for country endpoints.
 */

const Country = require('../models/Country');

const countryController = {
  /**
   * GET /api/countries
   * Fetch all countries.
   */
  getAll(req, res) {
    try {
      const countries = Country.getAll();
      res.json({ count: countries.length, data: countries });
    } catch (err) {
      console.error('[countryController.getAll]', err.message);
      res.status(500).json({ error: 'Failed to fetch countries' });
    }
  },

  /**
   * GET /api/countries/:id
   * Fetch a single country by ID.
   */
  getById(req, res) {
    try {
      const country = Country.getById(parseInt(req.params.id));
      if (!country) {
        return res.status(404).json({ error: 'Country not found' });
      }
      res.json({ data: country });
    } catch (err) {
      console.error('[countryController.getById]', err.message);
      res.status(500).json({ error: 'Failed to fetch country' });
    }
  }
};

module.exports = countryController;