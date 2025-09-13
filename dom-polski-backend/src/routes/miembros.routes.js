import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = Router();

// Todos los miembros
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('Miembro')
    .select('*')
    .order('orden', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
