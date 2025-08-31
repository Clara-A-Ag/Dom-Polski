// backend/src/controllers/history.controller.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getHistory = async (req, res) => {
  try {
    // La 'H' debe ser mayúscula para que coincida con el modelo 'Historia' en schema.prisma.
    const historyData = await prisma.Historia.findMany();
    
    res.status(200).json(historyData);
  } catch (error) {
    console.error('Error fetching history data:', error);
    res.status(500).json({ message: 'Error fetching history data' });
  }
};