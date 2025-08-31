const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function crearAdmin() {
  const passwordSinEncriptar = 'Dompolski2025sentey'; // CAMBIA ESTO
  const emailAdmin = 'claraagv54@gmail.com';

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(passwordSinEncriptar, salt);

  try {
    const admin = await prisma.usuario.create({
      data: {
        nombre: 'Admin',
        apellido: 'DomPolski',
        email: emailAdmin,
        password: hashedPassword,
        rol: "administrador",
      },
    });
    console.log('🎉 Usuario administrador creado exitosamente:', admin);
  } catch (e) {
    if (e.code === 'P2002') {
      console.error('❌ Error: Ya existe un usuario con este correo electrónico.');
    } else {
      console.error('❌ Error al crear el usuario administrador:', e);
    }
  } finally {
    await prisma.$disconnect();
  }
}

crearAdmin();