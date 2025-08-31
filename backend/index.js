// backend/index.js

// 1. Cargamos las variables de entorno para usar la configuración de la aplicación.
require('dotenv').config();

// 2. Importamos las librerías necesarias.
// Express: El framework principal para el servidor.
// Cors: Para permitir solicitudes desde el frontend.
const express = require('express');
const cors = require('cors');

// 3. Importamos el archivo de rutas para la página de inicio.
// Esto separa la lógica de las rutas del archivo principal.
const inicioRoutes = require('./src/routes/inicioRoutes');
const historiaRoutes = require('./src/routes/historiaRoutes');
const novedadesRoutes = require('./src/routes/novedadesRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes'); // Importamos las rutas de usuario

// 4. Creamos la instancia de la aplicación Express.
const app = express();

// 5. Definimos el puerto del servidor.
const PORT = process.env.PORT || 3000;

// 6. Configuración de middlewares.
// express.json(): Permite que el servidor entienda datos JSON en las peticiones.
// cors(): Habilita el Intercambio de Recursos de Origen Cruzado.
app.use(express.json());
app.use(cors());

// 7. Conectamos las rutas de la página de inicio a la aplicación.
// Todas las rutas definidas en inicioRoutes.js ahora serán accesibles desde aquí.
app.use(inicioRoutes);
app.use(historiaRoutes);
app.use(novedadesRoutes);
app.use(usuarioRoutes); // Usamos las rutas de usuario
// 8. El servidor escucha en el puerto definido.
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});