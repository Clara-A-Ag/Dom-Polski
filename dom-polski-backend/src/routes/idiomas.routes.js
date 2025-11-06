import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = Router();

/**
 * @route GET /idiomas
 * @desc Obtener toda la oferta de idiomas disponibles.
 */
router.get('/', async (req, res) => {
    // 1. Consulta la tabla que contiene los detalles de los idiomas.
    const { data, error } = await supabase
        .from('OfertaIdioma')
        .select('*'); // Selecciona todas las columnas (id, nombre, horarios, niveles, etc.)

    if (error) {
        console.error("Error de Supabase al obtener idiomas:", error);
        // Devuelve un error 500 si hay un fallo en la base de datos.
        return res.status(500).json({ 
            error: "Error interno del servidor al obtener la oferta de idiomas.",
            details: error.message 
        });
    }
    
    // 2. Devuelve los datos de los idiomas como un array JSON.
    res.json(data);
});

export default router;