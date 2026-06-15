/**
 * Country Routes
 *
 * Maps HTTP endpoints to country controller methods.
 * Mounted at /api/countries in server/index.js.
 */

const express = require('express');
const router  = express.Router();
const countryController = require('../controllers/countryController');

router.get('/',          countryController.getAll);
router.get('/:id',       countryController.getById);

module.exports = router;