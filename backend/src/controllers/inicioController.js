// src/controllers/inicioController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getInicioContent = async (req, res) => {
  try {
    const contenido = await prisma.contenidoInicio.findMany();
    res.json(contenido);
  } catch (error) {
    console.error('Error al obtener el contenido de inicio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};