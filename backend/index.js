// backend/index.js
require('dotenv').config(); // Cargar variables de entorno al inicio

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors'); // Para permitir comunicación entre frontend y backend en diferentes puertos

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000; // Puerto para el backend

app.use(express.json()); // Para parsear JSON en las solicitudes
app.use(cors()); // Habilitar CORS para que el frontend pueda conectarse

// Ruta de prueba para obtener contenido de inicio
app.get('/api/inicio', async (req, res) => {
  try {
    const contenido = await prisma.contenidoInicio.findMany();
    res.json(contenido);
  } catch (error) {
    console.error('Error al obtener contenido de inicio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Opcional: Ruta para insertar un dato de prueba
app.post('/api/inicio', async (req, res) => {
    try {
        const { titulo, descripcion, imagenUrl } = req.body;
        const nuevoContenido = await prisma.contenidoInicio.create({
            data: {
                titulo,
                descripcion,
                imagenUrl
            }
        });
        res.status(201).json(nuevoContenido);
    } catch (error) {
        console.error('Error al crear contenido de inicio:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});