const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors"); /* Permitir solicitudes desde el frontend */
const PORT = process.env.PORT || 3000;
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "TU_CORREO_ENVIO@gmail.com",
    pass: "TU_CONTRASEÑA_APP"
  }
});

app.post("/enviar", async (req, res) => {
  const { tipo, nombre, email, mensaje } = req.body;

  const correos = {
    oficial: "dompolski.santafe@gmail.com",
    artistico: "audiovisualesdomp@gmail.com"
  };

  try {
    // --- 1) Enviar correo ---
    await transporter.sendMail({
      from: `"Formulario Web" <${email}>`,
      to: correos[tipo],
      subject: `Nuevo mensaje de ${nombre}`,
      html: `<p><strong>Nombre:</strong> ${nombre}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Mensaje:</strong> ${mensaje}</p>`
    });

    // --- 2) Guardar en la base con Prisma ---
    await prisma.contacto.create({
      data: {
        nombre,
        email,
        mensaje
      }
    });

    res.json({ ok: true, message: "Correo enviado y guardado en la BD" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error al enviar/guardar mensaje" });
  }
});

app.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000");
});

// --- ENDPOINTS DE LA API ---

// 1. OBTENER TODOS LOS MIEMBROS
// Puedes filtrar por grupo y ordenar por 'orden'
app.get('/api/miembros', async (req, res) => {
  const { grupo, orderBy } = req.query;
  try {
    const miembros = await prisma.miembro.findMany({
      where: grupo ? { grupo: grupo } : {},
      orderBy: orderBy === 'orden' ? { orden: 'asc' } : { id: 'asc' },
    });
    res.json(miembros);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener la lista de miembros.' });
  }
});

// 2. AGREGAR UN NUEVO MIEMBRO
app.post('/api/miembros', async (req, res) => {
  const { nombre, cargo, grupo, fotoUrl, orden } = req.body;
  try {
    const nuevoMiembro = await prisma.miembro.create({
      data: { nombre, cargo, grupo, fotoUrl, orden },
    });
    res.status(201).json(nuevoMiembro);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el miembro.' });
  }
});

// 3. ACTUALIZAR UN MIEMBRO
app.put('/api/miembros/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, cargo, grupo, fotoUrl, orden } = req.body;
  try {
    const miembroActualizado = await prisma.miembro.update({
      where: { id: parseInt(id) },
      data: { nombre, cargo, grupo, fotoUrl, orden },
    });
    res.json(miembroActualizado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el miembro.' });
  }
});

// 4. ELIMINAR UN MIEMBRO
app.delete('/api/miembros/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.miembro.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el miembro.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de API corriendo en el puerto ${PORT}`);
});