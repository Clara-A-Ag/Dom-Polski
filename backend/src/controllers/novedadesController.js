// backend/src/controllers/novedadesController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtiene todas las novedades.
exports.getNovedades = async (req, res) => {
  try {
    const novedadesData = await prisma.novedad.findMany();
    res.status(200).json(novedadesData);
  } catch (error) {
    console.error('Error al obtener datos de novedades:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};