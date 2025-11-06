import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = Router();

// Todas las actividades
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('Actividad')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Actividad por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('Actividad')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});
// Ejemplo de rutas/actividadesDetalles.routes.js (PARA LA TARJETA DE DETALLES)
router.get('/detalles/:id', async (req, res) => {
    const { id } = req.params;
    
    // NOTA CRÍTICA: La tabla 'Idioma' ahora actúa como tu tabla genérica de detalles.
    const { data, error } = await supabase
        .from('Idioma') // <-- Usamos el nombre de tu tabla actual
        .select('horarios, niveles, edades, contacto') 
        .eq('id', id) // <-- Asume que la ID de la fila de detalles es la misma que Actividad.id
        .single(); 

    if (error && error.code !== 'PGRST116') { return res.status(500).json(error); }
    
    const details = data ? {
        schedule: data.horarios,
        levels: data.niveles,
        ageGroup: data.edades,
        contactInfo: data.contacto,
    } : {};

    res.json(details);
});
export default router;
