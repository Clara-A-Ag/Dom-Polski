import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = Router();

// --- SÚPER ENDPOINT PARA LA VISTA DE "NOVEDADES" ---
// (Este ya estaba bien, lo dejamos como está)
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5; 
  const search = req.query.search || ''; 
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('Novedad')
    .select('*', { count: 'exact' }) 
    .order('fechaPublicacion', { ascending: false });

  query = query.eq('esTemporal', false); 

  if (search) {
    query = query.or(`titulo.ilike.%${search}%,descripcionCorta.ilike.%${search}%`);
  }
  
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) return res.status(500).json({ error: error.message });

  res.json({
    data: data,       
    totalCount: count  
  });
});


// --- ENDPOINTS ADICIONALES (para InicioVista, etc.) ---

// Endpoint 2: Obtener Novedades Temporales (Sucesos)
// ¡MODIFICADO CON LIMIT!
router.get('/temporales', async (req, res) => {
  // 1. Leemos el query param 'limit'
  const { limit } = req.query;

  // 2. Construimos la consulta base
  let query = supabase
    .from('Novedad')
    .select('*')
    .eq('esTemporal', true)
    // .gte('fechaExpiracion', new Date().toISOString()) 
    .order('fechaPublicacion', { ascending: false });

  // 3. Si nos pasaron un 'limit', lo añadimos
  if (limit) {
    query = query.limit(parseInt(limit));
  }

  // 4. Ejecutamos
  const { data, error } = await query;

  if (error) return res.status(500).json({ error: error.message });
  res.json(data); 
});


// Endpoint 3: Obtener destacadas
// ¡MODIFICADO CON LIMIT!
router.get('/destacadas', async (req, res) => {
  // 1. Leemos el query param 'limit'
  const { limit } = req.query;

  // 2. Construimos la consulta base
  let query = supabase
    .from('Novedad')
    .select('*')
    .eq('destacada', true)
    .order('fechaPublicacion', { ascending: false });

  // 3. Si nos pasaron un 'limit', lo añadimos
  if (limit) {
    query = query.limit(parseInt(limit));
  }

  // 4. Ejecutamos
  const { data, error } = await query;

  if (error) return res.status(500).json({ error: error.message });
  res.json(data); 
});

// Endpoint 4: Obtener UNA noticia por su ID
// (Este ya estaba bien, lo dejamos como está)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('Novedad')
    .select('*')
    .eq('id', id)
    .single(); 

  if (error) {
    return res.status(404).json({ error: 'Noticia no encontrada' });
  }

  res.json(data);
});

export default router;