import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = Router();

/**
 * @route GET /actividades/detalles/:id
 * @desc Obtiene los detalles (horarios, niveles, contacto) de una actividad específica.
 */
router.get('/detalles/:id', async (req, res) => {
    const actividadIdEnviada = req.params.id; // Este es 3 para Ballet

    // CAMBIO CLAVE: Cambia la consulta para usar 'actividadId'
    const { data, error } = await supabase
        .from('detalleACT') // Usar el nombre de tu tabla de detalles
        .select('horarios, niveles, edades, contacto') // Selecciona solo las columnas necesarias
        // Busca usando la columna 'actividadId' y no el 'id' primario de la fila
        .eq('actividadId', actividadIdEnviada); 
        // Nota: Removimos .single() porque podrías tener múltiples detalles (ej: Ballet Adulto, Ballet Niños)

    if (error) {
        console.error("Error al obtener detalles:", error);
        return res.status(500).json({ error: "Error de servidor al obtener detalles.", details: error.message });
    }
    
    // Si tienes múltiples detalles (ej: Ballet Adulto y Ballet Niños)
    if (data && data.length > 0) {
        // Por ahora, solo tomamos el primer resultado (o deberías adaptarlo para mostrar todos)
        const firstDetail = data[0]; 
        const details = {
            schedule: firstDetail.horarios,
            levels: firstDetail.niveles,
            ageGroup: firstDetail.edades,
            contactInfo: firstDetail.contacto,
            // Aquí puedes añadir el nombre si fuera relevante: name: firstDetail.nombre
        };
        return res.json(details);
    }

    res.json({}); // Devuelve un objeto vacío si no se encuentra nada
});

export default router;

