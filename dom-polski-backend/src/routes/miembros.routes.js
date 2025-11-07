import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import multer from 'multer';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- GET / --- (Sin cambios)
router.get('/', async (req, res) => {
  // ... (tu código de GET /) ...
  const { data: miembros, error } = await supabase.from('Miembro').select('*').order('orden', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  const miembrosConFotos = await Promise.all(
    miembros.map(async (miembro) => {
      if (miembro.fotoUrl) {
        const { data, error: urlError } = await supabase.storage.from('fotos_miembros').createSignedUrl(miembro.fotoUrl, 3600);
        if (!urlError) {
          miembro.fotoUrl = data.signedUrl;
        }
      }
      return miembro;
    })
  );
  res.json(miembrosConFotos);
});

// --- GET /:id --- (Sin cambios)
router.get('/:id', async (req, res) => {
  // ... (tu código de GET /:id) ...
  const { id } = req.params;
  const { data: miembro, error } = await supabase.from('Miembro').select('*').eq('id', id).single();
  if (error) {
    return res.status(404).json({ error: 'Miembro no encontrado' });
  }
  if (miembro && miembro.fotoUrl) {
    const { data, error: urlError } = await supabase.storage.from('fotos_miembros').createSignedUrl(miembro.fotoUrl, 3600);
    if (!urlError) {
      miembro.fotoUrl = data.signedUrl;
    }
  }
  res.json(miembro);
});

// --- POST / --- (Sin cambios)
router.post('/', authMiddleware, upload.single('foto'), async (req, res) => {
  // ... (tu código de POST /) ...
  const { nombre, apellido, cargo, area, orden } = req.body;
  const fotoFile = req.file;
  if (!nombre || !cargo || !area) {
    return res.status(400).json({ error: 'Nombre, cargo y área son obligatorios.' });
  }
  let fotoPath = null;
  if (fotoFile) {
    const fileName = `${Date.now()}_${fotoFile.originalname}`;
    const { data: uploadData, error: uploadError } = await supabase.storage.from('fotos_miembros').upload(fileName, fotoFile.buffer, { contentType: fotoFile.mimetype });
    if (uploadError) {
      return res.status(500).json({ error: 'Error al subir la foto: ' + uploadError.message });
    }
    fotoPath = uploadData.path;
  }
  const { data, error } = await supabase.from('Miembro').insert([{ nombre, apellido, cargo, area, fotoUrl: fotoPath, orden }]).select();
  if (error) {
    return res.status(500).json({ error: 'Error al crear el miembro: ' + error.message });
  }
  res.status(201).json(data[0]);
});

// --- PUT /:id (CON ESPÍAS) ---
router.put('/:id', authMiddleware, upload.single('foto'), async (req, res) => {
  console.log(`[DEBUG] PUT /miembros/${req.params.id} iniciado.`);
  
  const { id } = req.params;
  const { nombre, apellido, cargo, area, orden } = req.body;
  const fotoFile = req.file;

  if (!nombre || !cargo || !area) {
    console.error('[DEBUG] CRASH: Faltan campos obligatorios.');
    return res.status(400).json({ error: 'Nombre, cargo y área son obligatorios.' });
  }
  
  try {
    console.log('[DEBUG] 1. Buscando miembro actual...');
    const { data: miembroActual, error: findError } = await supabase
      .from('Miembro')
      .select('fotoUrl')
      .eq('id', id)
      .single();

    if (findError) {
      console.error('[DEBUG] CRASH: Miembro no encontrado.', findError);
      return res.status(404).json({ error: 'Miembro no encontrado para obtener foto actual.' });
    }
    console.log('[DEBUG] 1. Miembro encontrado. fotoUrl antigua:', miembroActual.fotoUrl);

    let fotoPath = miembroActual.fotoUrl; // Mantenemos la fotoUrl (path) existente

    if (fotoFile) {
      console.log('[DEBUG] 2. Hay un archivo nuevo. Subiendo...');
      const fileName = `${Date.now()}_${fotoFile.originalname}`;
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('fotos_miembros')
        .upload(fileName, fotoFile.buffer, { contentType: fotoFile.mimetype });

      if (uploadError) {
        console.error('[DEBUG] CRASH: Error al subir la foto nueva.', uploadError);
        return res.status(500).json({ error: 'Error al subir la nueva foto: ' + uploadError.message });
      }
      fotoPath = uploadData.path;
      console.log('[DEBUG] 2. Foto nueva subida. Path:', fotoPath);
      
      if (miembroActual.fotoUrl) {
        console.log('[DEBUG] 3. Borrando foto antigua:', miembroActual.fotoUrl);
        const { error: deleteError } = await supabase.storage.from('fotos_miembros').remove([miembroActual.fotoUrl]);
        if (deleteError) {
          console.error('[DEBUG] ADVERTENCIA: No se pudo borrar la foto antigua.', deleteError.message);
          // No detenemos la operación por esto, es una advertencia
        } else {
          console.log('[DEBUG] 3. Foto antigua borrada.');
        }
      }
    } else {
      console.log('[DEBUG] 2. No hay archivo nuevo, se mantiene fotoPath:', fotoPath);
    }

    console.log('[DEBUG] 4. Actualizando la base de datos...');
    const { data, error } = await supabase
      .from('Miembro')
      .update({ nombre, apellido, cargo, area, fotoUrl: fotoPath, orden })
      .eq('id', id)
      .select();

    if (error) {
      console.error('[DEBUG] CRASH: Error al actualizar la DB.', error);
      return res.status(500).json({ error: 'Error al actualizar el miembro: ' + error.message });
    }
    
    console.log('[DEBUG] 5. ¡Éxito! Miembro actualizado.');
    res.status(200).json(data[0]);

  } catch (err) {
    console.error('[DEBUG] CRASH: Error inesperado en el bloque PUT.', err);
    res.status(500).json({ error: 'Error interno del servidor: ' + err.message });
  }
});

// --- DELETE /:id --- (Sin cambios)
router.delete('/:id', authMiddleware, async (req, res) => {
  // ... (tu código de DELETE /:id) ...
  const { id } = req.params;
  const { data: miembro, error: findError } = await supabase.from('Miembro').select('fotoUrl').eq('id', id).single();
  if (miembro && miembro.fotoUrl) {
    await supabase.storage.from('fotos_miembros').remove([miembro.fotoUrl]);
  }
  const { error } = await supabase.from('Miembro').delete().eq('id', id);
  if (error) {
    return res.status(500).json({ error: 'Error al borrar el miembro: ' + error.message });
  }
  res.status(204).send();
});

export default router;