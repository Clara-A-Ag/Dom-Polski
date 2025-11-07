
  import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = Router();

// =========================================================================
// RUTA 1: Multimedia filtrada por relación e ID (La ruta general: /multimedia/Actividad/3)
// Utilizada por GeneralActCard.vue, etc., para obtener multimedia genérica.
// =========================================================================

router.get('/:relacion/:idRelacionado', async (req, res) => {
  const { relacion, idRelacionado } = req.params;

  // Convertir la ID a string para manejar posibles BIGINT de Postgres
  const id = String(idRelacionado);

  // NOTA: El log de error sugiere que la columna en la BD podría ser 'idRelacionado' (camelCase).
  // Por convención de Supabase/Postgres, se usa 'id_relacionado' (snake_case).
  // Si esta corrección falla, la columna real en Supabase es 'idRelacionado'.
  const idColumnName = 'idRelacionado'; // Usamos snake_case por convención

  console.log(`Buscando multimedia para relación: ${relacion}, ID: ${id}`);

  try {
    const { data, error } = await supabase
      .from('Multimedia')
      .select('*')
      .eq('relacionadocon', relacion)
      .eq(idColumnName, id); // <-- Usando la columna correcta

    if (error) {
      console.error(`Error de Supabase [Ruta General] al consultar columna ${idColumnName}:`, error.message);
      return res.status(500).json({ error: error.message, detail: "Error en la consulta a la BD." });
    }

    res.json(data);

  } catch (e) {
    console.error("Excepción en Ruta General de Multimedia:", e);
    res.status(500).json({ error: 'Fallo interno del servidor al procesar la solicitud.', exception: e.message })
  }
});

router.get('/Actividad/:id', async (req, res) => {
  const { id } = req.params;
  const idAsString = String(id);
  const idColumnName = 'idRelacionado'; // Usamos snake_case por convención

  try {
    const { data, error } = await supabase
      .from('Multimedia')
      .select('tipo, url, descripcion')
      .eq(idColumnName, idAsString); // <-- CORRECCIÓN: Ahora filtra por ID de actividad

    if (error) {
      console.error("Error de Supabase en Carrusel Multimedia:", error.message);
      return res.status(500).json({ error: error.message, detail: "Fallo al obtener datos de Supabase." });
    }

    // Procesamiento (Mapeo a 'src')
    const slides = data.map(item => ({
      tipo: item.tipo,
      src: item.url, 
      alt: item.descripcion || item.tipo,
    }));

    res.json(slides);
  } catch (e) {
    console.error("Excepción en Carrusel Multimedia router:", e);
    res.status(500).json({ error: 'Fallo interno del servidor.', exception: e.message });
  }
});

export default router;
