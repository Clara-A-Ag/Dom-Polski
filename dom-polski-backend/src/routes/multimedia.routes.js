import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = Router();

// =========================================================================
// RUTA 1: Multimedia filtrada por relación e ID (La ruta general: /multimedia/:relacion/:idRelacionado)
// =========================================================================

router.get('/:relacion/:idRelacionado', async (req, res) => {
  const { relacion, idRelacionado } = req.params;

  // 🛑 USAMOS 'idRelacionado' (con R mayúscula), según tu esquema de tabla
  const ID_COL_NAME = 'idRelacionado'; 
  const id = String(idRelacionado);

  console.log(`Buscando multimedia para Tipo=${relacion}, ID=${id} en columna ${ID_COL_NAME}.`);

  try {
    const { data, error } = await supabase
      .from('Multimedia')
      .select('*')
      // Filtramos ÚNICAMENTE por el ID numérico en la columna correcta.
      .eq(ID_COL_NAME, id); 

    if (error) {
      console.error(`🔴 ERROR Supabase [Ruta General]:`, error.message);
      return res.status(500).json({ error: error.message, detail: "Error en la consulta a la BD. Revisa el log del backend para el error exacto." });
    }
    
    res.json(data);

  } catch (e) {
    console.error("🔴 EXCEPCIÓN en Ruta General de Multimedia:", e);
    res.status(500).json({ error: 'Fallo interno del servidor.', exception: e.message })
  }
});

// =========================================================================
// RUTA 2: Multimedia específica para el Carrusel de Actividades (/multimedia/Actividad/:id)
// =========================================================================

router.get('/Actividad/:id', async (req, res) => {
  const { id } = req.params;
  // 🛑 USAMOS 'idRelacionado' (con R mayúscula), según tu esquema de tabla
  const ID_COL_NAME = 'idRelacionado'; 
  const idAsString = String(id);
  
  try {
    const { data, error } = await supabase
      .from('Multimedia')
      .select('tipo, url, descripcion')
      // Aquí solo filtramos por el ID numérico.
      .eq(ID_COL_NAME, idAsString); 

    if (error) {
      console.error("🔴 ERROR Supabase en Carrusel Multimedia:", error.message);
      return res.status(500).json({ error: error.message, detail: "Fallo al obtener datos de Supabase." });
    }

    // Procesamiento (Mapeo a 'src' para el carrusel)
    const slides = data.map(item => ({
      tipo: item.tipo,
      src: item.url, 
      alt: item.descripcion || item.tipo,
    }));

    res.json(slides);
  } catch (e) {
    console.error("🔴 EXCEPCIÓN en Carrusel Multimedia router:", e);
    res.status(500).json({ error: 'Fallo interno del servidor.', exception: e.message });
  }
});

export default router;