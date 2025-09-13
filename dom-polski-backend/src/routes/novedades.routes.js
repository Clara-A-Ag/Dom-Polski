import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = Router();

// Obtener todas las novedades
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('Novedad')
    .select('*')
    .order('fechaPublicacion', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Obtener novedades destacadas
router.get('/destacadas', async (req, res) => {
  const { data, error } = await supabase
    .from('Novedad')
    .select('*')
    .eq('destacada', true)
    .order('fechaPublicacion', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
