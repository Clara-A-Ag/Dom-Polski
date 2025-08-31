// backend/src/routes/usuarioRoutes.js

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Solo mantenemos la ruta para el inicio de sesión
router.post('/api/auth/login', usuarioController.loginUsuario);

module.exports = router;