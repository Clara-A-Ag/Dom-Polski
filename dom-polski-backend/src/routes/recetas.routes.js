import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = Router();

// Obtener todas las recetas
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('Receta')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Obtener recetas por actividad
router.get('/actividad/:idActividad', async (req, res) => {
  const { idActividad } = req.params;
  const { data, error } = await supabase
    .from('Receta')
    .select('*')
    .eq('actividadId', idActividad);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Crear una receta (opcional, si querés agregar desde backend)
router.post('/', async (req, res) => {
  const { titulo, descripcion, imagenUrl, ingredientes, actividadId } = req.body;
  const { data, error } = await supabase
    .from('Receta')
    .insert([{ titulo, descripcion, imagenUrl, ingredientes, actividadId }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

export default router;
