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

const app = express();
app.use(cors());
app.use(express.json());

app.use('/novedades', novedadesRoutes);
app.use('/actividades', actividadesRoutes);
app.use('/historia', historiaRoutes);
app.use('/miembros', miembrosRoutes);
app.use('/multimedia', multimediaRoutes);
app.use('/contacto', contactoRoutes);
app.use('/recetas', recetasRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;
