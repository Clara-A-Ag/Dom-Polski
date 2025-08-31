// src/routes/inicioRoutes.js
const express = require('express');
const router = express.Router();
const inicioController = require('../controllers/inicioController');

router.get('/api/inicio', inicioController.getInicioContent);

module.exports = router;