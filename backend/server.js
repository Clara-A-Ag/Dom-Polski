const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
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
    oficial: "tu_gmail_oficial@gmail.com",
    artistico: "tu_gmail_artistico@gmail.com"
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
