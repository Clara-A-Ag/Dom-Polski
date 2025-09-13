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

export default router;
