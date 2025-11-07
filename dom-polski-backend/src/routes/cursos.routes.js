// routes/cursos.routes.js

import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js'; 

const router = Router();

// Endpoint para obtener todos los detalles de los cursos de Idioma (IDs 1 y 2)
router.get('/idioma', async (req, res) => { 
    // IDs de las actividades de idioma que están en detalleACT (Inglés y Polaco)
    const IDIOMA_ACT_IDS = [3, 4]; 
    
    try {
        // Consultar la tabla detalleACT y filtrar por los IDs 1 y 2.
        const { data: cursos, error } = await supabase
            .from('detalleACT') 
            .select('activityName, horarios, niveles, edades, contacto') 
            .in('actividadId', IDIOMA_ACT_IDS) // Filtra donde actividadId es 1 O 2
            .order('actividadId', { ascending: true }); // Ordena para Inglés antes que Polaco

        if (error) {
            console.error("Error de Supabase al obtener detalles de cursos de idioma:", error);
            return res.status(500).json({ error: error.message }); 
        }
        
        // Devolvemos los datos directamente
        return res.json(cursos); 

    } catch (e) {
        console.error("Excepción en router de cursos de idioma:", e);
        return res.status(500).json({ error: 'Excepción interna no controlada.' });
    }
});

export default router;