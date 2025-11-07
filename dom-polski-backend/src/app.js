import express from 'express';
import cors from 'cors';
import 'dotenv/config';


import novedadesRoutes from './routes/novedades.routes.js';
import actividadesRoutes from './routes/actividades.routes.js';
import historiaRoutes from './routes/historia.routes.js';
import miembrosRoutes from './routes/miembros.routes.js';
import multimediaRoutes from './routes/multimedia.routes.js';
import contactoRoutes from './routes/contacto.routes.js';
import recetasRoutes from './routes/recetas.routes.js';
import detalleACT from './routes/detalleACT.routes.js';
import cursosRoutes from './routes/cursos.routes.js';


if (typeof BigInt.prototype.toJSON !== 'function') {
  BigInt.prototype.toJSON = function() {
    return this.toString();
  };
}
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

app.use('/detalleACT', detalleACT);
app.use('/novedades', novedadesRoutes);
app.use('/actividades', actividadesRoutes);
app.use('/historia', historiaRoutes);
app.use('/miembros', miembrosRoutes);
app.use('/multimedia', multimediaRoutes);
app.use('/contacto', contactoRoutes);
app.use('/recetas', recetasRoutes);
app.use('/cursos', cursosRoutes); 

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});

export default app;
