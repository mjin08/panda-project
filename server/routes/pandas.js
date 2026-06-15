/**
 * Panda Program Routes
 *
 * Maps HTTP endpoints to panda controller methods.
 * Mounted at /api/pandas in server/index.js.
 */

const express = require('express');
const router  = express.Router();
const pandaController = require('../controllers/pandaController');

router.get('/',          pandaController.getAll);
router.get('/:id',       pandaController.getById);

module.exports = router;