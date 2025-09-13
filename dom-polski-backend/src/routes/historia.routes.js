import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = Router();

// Todas las entradas históricas
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('Historia')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Entrada histórica por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('Historia')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
