import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = Router();

// Multimedia filtrada por relación
router.get('/:relacion/:idRelacionado', async (req, res) => {
  const { relacion, idRelacionado } = req.params;
  const { data, error } = await supabase
    .from('Multimedia')
    .select('*')
    .eq('relacionadoCon', relacion)
    .eq('idRelacionado', idRelacionado);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});
// Ejemplo de rutas/multimedia.routes.js (PARA EL CARRUSEL)
router.get('/Actividad/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('Multimedia')
        .select('*')
        .eq('relacionadoCon', 'Actividad')
        .eq('idRelacionado', id);
    if (error) return res.status(500).json(error);
    res.json(data);
});
export default router;
