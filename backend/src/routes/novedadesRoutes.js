// backend/src/routes/novedadesRoutes.js

const express = require('express');
const router = express.Router();
const novedadesController = require('../controllers/novedadesController');

// Define la ruta GET para '/api/novedades'.
router.get('/api/novedades', novedadesController.getNovedades);

module.exports = router;