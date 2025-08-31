// backend/src/routes/history.routes.js

const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historiaController'); // Importamos el controlador

// Definimos una ruta GET en '/api/history'.
// Cuando alguien haga una solicitud a esta URL, Express llamará a la función getHistory del controlador.
router.get('/api/Historia', historyController.getHistory);

// Exportamos el router para que el archivo principal (app.js) pueda usarlo.
module.exports = router;