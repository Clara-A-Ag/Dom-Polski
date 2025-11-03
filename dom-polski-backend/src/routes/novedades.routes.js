import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = Router();

// --- SÚPER ENDPOINT PARA LA VISTA DE "NOVEDADES" ---
// Acepta: ?page=X&limit=Y&search=Z
router.get('/', async (req, res) => {
  // 1. Leemos los query params (con valores por defecto)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5; // 5 noticias por página
  const search = req.query.search || ''; // Término de búsqueda
  
  // 2. Calculamos el rango para Supabase
  // (Página 1, Límite 5) -> Rango 0 al 4
  // (Página 2, Límite 5) -> Rango 5 al 9
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // 3. Construimos la consulta base
  let query = supabase
    .from('Novedad')
    .select('*', { count: 'exact' }) // ¡Pedimos el conteo total!
    .order('fechaPublicacion', { ascending: false });

  // Opcional: Si no quieres que las temporales salgan en la lista general
  query = query.eq('esTemporal', false); 

  // 4. Añadimos el filtro de BÚSQUEDA (si 'search' no está vacío)
  if (search) {
    // Busca 'search' en 'titulo' O 'descripcionCorta'
    // 'ilike' no distingue mayúsculas/minúsculas
    query = query.or(`titulo.ilike.%${search}%,descripcionCorta.ilike.%${search}%`);
  }
  
  // 5. Añadimos el filtro de PAGINACIÓN
  query = query.range(from, to);

  // 6. Ejecutamos la consulta
  const { data, error, count } = await query;

  if (error) return res.status(500).json({ error: error.message });

  // 7. Enviamos la respuesta con los datos y el conteo total
  res.json({
    data: data,           // Los 5 resultados de esta página
    totalCount: count     // El número total de noticias que coincidieron
  });
});


// --- ENDPOINTS ADICIONALES (para InicioVista, etc.) ---

// Endpoint 2: Obtener Novedades Temporales (Sucesos)
router.get('/temporales', async (req, res) => {
  const { data, error } = await supabase
    .from('Novedad')
    .select('*')
    .eq('esTemporal', true)
    // .gte('fechaExpiracion', new Date().toISOString()) // Descomentar para filtrar expiradas
    .order('fechaPublicacion', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data); // Nota: Esto devuelve un Array, no un objeto {data, totalCount}
});


// Endpoint 3: Obtener destacadas
router.get('/destacadas', async (req, res) => {
  const { data, error } = await supabase
    .from('Novedad')
    .select('*')
    .eq('destacada', true)
    .order('fechaPublicacion', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data); // Nota: Esto devuelve un Array
});

export default router;