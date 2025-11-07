import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';

// --- 1. IMPORTAMOS NUESTRO BOUNCER ---
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// --- ENDPOINTS PÚBLICOS (LECTURA) ---

// SÚPER ENDPOINT (GET /)
router.get('/', async (req, res) => {
  // 1. Leemos los nuevos query params
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5; 
  const search = req.query.search || ''; 
  const scope = req.query.scope || 'public'; // <-- ¡NUEVA LÍNEA! (default: 'public')
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('Novedad')
    .select('*', { count: 'exact' }) 
    .order('fechaPublicacion', { ascending: false });

  // 2. ¡EL CAMBIO DE LÓGICA!
  // Solo ocultamos las temporales si el scope es 'public'
  if (scope === 'public') {
    query = query.eq('esTemporal', false); 
  }
  // Si scope es 'admin', no se aplica el filtro. ¡Vemos todo!

  if (search) {
    query = query.or(`titulo.ilike.%${search}%,descripcionCorta.ilike.%${search}%`);
  }
  
  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ data: data, totalCount: count });
});

// GET /temporales
router.get('/temporales', async (req, res) => {
  const { limit } = req.query;
  let query = supabase
    .from('Novedad')
    .select('*')
    .eq('esTemporal', true)
    .order('fechaPublicacion', { ascending: false });
  if (limit) {
    query = query.limit(parseInt(limit));
  }
  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data); 
});

// GET /destacadas
router.get('/destacadas', async (req, res) => {
  const { limit } = req.query;
  let query = supabase
    .from('Novedad')
    .select('*')
    .eq('destacada', true)
    .order('fechaPublicacion', { ascending: false });
  if (limit) {
    query = query.limit(parseInt(limit));
  }
  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data); 
});

// GET /:id (Obtener UNA noticia)
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


// --- ENDPOINTS PROTEGIDOS (ESCRITURA) ---
// Aquí es donde usamos el Bouncer.

// Endpoint 5: CREAR una nueva noticia
// Fíjate cómo 'authMiddleware' va en el medio.
// Nadie llega a (req, res) sin pasar por el Bouncer.
router.post('/', authMiddleware, async (req, res) => {
  // El middleware ya validó el token.
  // ¡Incluso nos da el 'user' en req.user si lo necesitamos!
  
  const { 
    titulo, 
    contenido, 
    imagenUrl, 
    descripcionCorta, 
    destacada, 
    esTemporal, 
    fechaExpiracion 
  } = req.body;

  // Validación simple (puedes añadir más)
  if (!titulo || !contenido || !descripcionCorta) {
    return res.status(400).json({ error: 'Título, contenido y descripción corta son obligatorios.' });
  }

  const { data, error } = await supabase
    .from('Novedad')
    .insert([
      { 
        titulo, 
        contenido, 
        imagenUrl, 
        descripcionCorta, 
        destacada, 
        esTemporal, 
        fechaExpiracion,
        usuarioId: req.user.id // ¡Vinculamos la noticia al admin que la creó!
      }
    ])
    .select(); // .select() hace que devuelva el objeto creado

  if (error) {
    return res.status(500).json({ error: 'Error al crear la noticia: ' + error.message });
  }
  
  res.status(201).json(data[0]); // 201 = Creado. Devolvemos la nueva noticia.
});


// Endpoint 6: ACTUALIZAR una noticia
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { 
    titulo, 
    contenido, 
    imagenUrl, 
    descripcionCorta, 
    destacada, 
    esTemporal, 
    fechaExpiracion 
  } = req.body;

  if (!titulo || !contenido || !descripcionCorta) {
    return res.status(400).json({ error: 'Título, contenido y descripción corta son obligatorios.' });
  }

  const { data, error } = await supabase
    .from('Novedad')
    .update({ 
        titulo, 
        contenido, 
        imagenUrl, 
        descripcionCorta, 
        destacada, 
        esTemporal, 
        fechaExpiracion
        // No actualizamos el usuarioId, se queda el original
    })
    .eq('id', id)
    .select();

  if (error) {
    return res.status(500).json({ error: 'Error al actualizar la noticia: ' + error.message });
  }
  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'Noticia no encontrada para actualizar.' });
  }
  
  res.status(200).json(data[0]); // 200 = OK. Devolvemos la noticia actualizada.
});


// Endpoint 7: BORRAR una noticia
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('Novedad')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: 'Error al borrar la noticia: ' + error.message });
  }
  
  res.status(204).send(); // 204 = Sin Contenido. (La operación fue un éxito)
});


export default router;