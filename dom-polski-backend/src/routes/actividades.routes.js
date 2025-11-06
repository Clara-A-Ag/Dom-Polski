// routes/actividades.routes.js

import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js'; // Asegúrate que esta ruta es correcta

const router = Router();

// 1. ENDPOINT: GET /actividades (Lista del Menú)
router.get('/', async (req, res) => { 
    try {
        const { data: activities, error } = await supabase
            .from('Actividad')
            .select('id, nombre, descripcion, iconName');
            
        if (error) {
            console.error("Error al obtener lista de actividades:", error);
            return res.status(500).json({ error: error.message });
        }
        
        // Mapeo CLAVE: Transformamos los nombres de la BD (nombre, descripcion)
        // a los nombres que Vue espera (activityName, activityDescription)
        const mappedActivities = activities.map(a => ({
            id: a.id,
            name: a.nombre, // Usado en v-for para mostrar en la lista
            activityName: a.nombre, // Propiedad que se pasa al componente hijo
            activityDescription: a.descripcion, // Propiedad que se pasa al componente hijo
            iconName: a.iconName || 'help',
        }));
        
        return res.json(mappedActivities);

    } catch (e) {
        console.error("Excepción al obtener actividades:", e);
        return res.status(500).json({ error: 'Excepción interna.' });
    }
});
// routes/actividades.routes.js (SEGUNDO ENDPOINT)

router.get('/detalles/:id', async (req, res) => {
    const actividadId = req.params.id;
    
    try {
        // --- 1. VERIFICAR: Nombre de la tabla y filtro 'actividadId' ---
        const { data, error } = await supabase
            .from('detalleACT') // <-- ¡Verifica que la tabla se llame EXACTAMENTE 'detalleACT'!
            .select('nombre, horarios, niveles, edades, contacto') // <-- ¡Verifica los nombres de estas columnas!
            .eq('actividadId', actividadId) // <-- ¡Verifica que la columna se llame EXACTAMENTE 'actividadId'!
            .maybeSingle(); 

        if (error) {
            console.error("Error de Supabase al obtener detalles:", error);
            // Si Supabase devuelve un error, lo enviamos de vuelta con 500
            return res.status(500).json({ error: error.message }); 
        }
        
        // --- 2. VERIFICAR: Caso sin datos ---
        // Si no hay detalles para esa actividad (ej. Ballet ID 3 aún no tiene fila en detalleACT)
        if (!data) {
            // Devolvemos un 200 OK con un objeto vacío (o con valores por defecto)
            // Esto evita que Vue se rompa y lo maneja como "sin detalles"
            return res.status(200).json({
                detailName: "N/A",
                schedule: "Sin información de horarios",
                levels: "N/A",
                ageGroup: "N/A",
                contactInfo: "N/A",
            });
        }

        // --- 3. VERIFICAR: Mapeo de campos a GeneralActCard.vue ---
        const mappedDetails = {
            detailName: data.nombre,
            schedule: data.horarios, // Vue lo espera como activityDetails.schedule
            levels: data.niveles,
            ageGroup: data.edades,
            contactInfo: data.contacto,
        };

        return res.json(mappedDetails);

    } catch (e) {
        // Este catch atrapa errores fuera de Supabase (ej. problema de JSON o excepción de código)
        console.error("Excepción en router de detalles:", e); 
        return res.status(500).json({ error: 'Excepción interna no controlada.' });
    }
});


export default router;