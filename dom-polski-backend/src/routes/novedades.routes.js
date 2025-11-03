import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = Router();

// Endpoint 1: Obtener Novedades (con soporte para ?limit=X)
// (Lo usaremos para "Mini Novedades")
router.get('/', async (req, res) => {
  const { limit } = req.query; // Leemos el query param

  let query = supabase
    .from('Novedad')
    .select('*')
    // Filtramos para que no traiga las temporales
    .eq('esTemporal', false) 
    .order('fechaPublicacion', { ascending: false });

  if (limit) {
    query = query.limit(parseInt(limit));
  }

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Endpoint 2: Obtener Novedades Temporales (Sucesos)
// (NUEVO ENDPOINT)
router.get('/temporales', async (req, res) => {
  const { data, error } = await supabase
    .from('Novedad')
    .select('*')
    // 1. Filtramos solo las que son temporales
    .eq('esTemporal', true)
    // 2. (Opcional pero recomendado) Filtramos las que ya expiraron
    // .gte('fechaExpiracion', new Date().toISOString()) 
    .order('fechaPublicacion', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});


// Endpoint 3: Obtener destacadas (este queda igual)
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