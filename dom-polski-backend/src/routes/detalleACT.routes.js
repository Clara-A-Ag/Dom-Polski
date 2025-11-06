import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = Router();

/**
 * @route GET /actividades/detalles/:id
 * @desc Obtiene los detalles (horarios, niveles, contacto) de una actividad específica.
 */
router.get('/detalles/:id', async (req, res) => {
    const { id } = req.params;
    
    // NOTA: Usamos el nombre de tu tabla actual ('Idioma'), pero idealmente se renombra a 'DetalleActividad'.
    const { data, error } = await supabase
        .from('Idioma') // Usamos 'Idioma' por ahora, ¡pero renuévalo!
        // Asumiendo que tu tabla tiene columnas 'horarios', 'niveles', 'edades', 'contacto'
        .select('horarios, niveles, edades, contacto') 
        .eq('id', id) // <--- ASUNCIÓN CRÍTICA: Debes decidir si buscas por el ID del detalle o por el FK del detalle a la Actividad.
        .single(); 

    if (error && error.code !== 'PGRST116') { // PGRST116 es 'no rows found'
        return res.status(500).json({ error: "Error al obtener detalles de actividad.", details: error.message });
    }
    
    // Mapeo de nombres de columna de BD a nombres de campo en el frontend
    const details = data ? {
        schedule: data.horarios,
        levels: data.niveles,
        ageGroup: data.edades,
        contactInfo: data.contacto,
    } : {};

    res.json(details);
});

export default router;

