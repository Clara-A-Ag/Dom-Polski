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


// 2. ENDPOINT: GET /actividades/detalles/:id (Detalles para GeneralActCard)
router.get('/detalles/:id', async (req, res) => {
    const actividadId = req.params.id;
    
    try {
        // Se busca en detalleACT por el actividadId de la actividad
        const { data, error } = await supabase
            .from('detalleACT')
            .select('nombre, horarios, niveles, edades, contacto')
            .eq('actividadId', actividadId)
            .maybeSingle(); // Usamos maybeSingle ya que asumimos 1 detalle por actividad

        if (error) {
            console.error("Error al obtener detalles:", error);
            return res.status(500).json({ error: error.message });
        }
        
        // Si no se encuentra, devolvemos un objeto vacío para evitar errores
        if (!data) {
            return res.json({});
        }

        // Mapeamos los campos de la BD a los nombres de props de Vue (GeneralActCard)
        const mappedDetails = {
            detailName: data.nombre,
            schedule: data.horarios,
            levels: data.niveles,
            ageGroup: data.edades,
            contactInfo: data.contacto,
        };

        return res.json(mappedDetails);

    } catch (e) {
        console.error("Excepción al obtener detalles:", e);
        return res.status(500).json({ error: 'Excepción interna.' });
    }
});

export default router;