import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import multer from 'multer';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- NOTA DE TAREAS PENDIENTES ---
// 1. Necesitamos un bucket 'fotos_actividades'.
// 2. Necesitamos las políticas RLS para ese bucket.
// 3. Este archivo solo tiene el C.R.U.D. para las "Carpetas" (Categorias)
//    y la lectura de los "Cursos".
// ---------------------------------


// --- ENDPOINTS PÚBLICOS (LECTURA) ---

// ENDPOINT 1: Obtener las "Carpetas" (Ej: "Idioma Polaco", "Danza")
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('Categorias_Actividad')
    .select('*')
    .order('orden', { ascending: true });

  if (error) {
    console.error("Error al obtener Categorias_Actividad:", error);
    return res.status(500).json({ error: error.message });
  }

  // (Lógica de URL Firmada, igual que en Miembros)
  const categoriasConFotos = await Promise.all(
    data.map(async (categoria) => {
      if (categoria.fotoUrl) {
        const { data: urlData, error: urlError } = await supabase
          .storage
          .from('fotos_actividades') // ¡Asume que este bucket existe!
          .createSignedUrl(categoria.fotoUrl, 3600); 

        if (!urlError) {
          categoria.fotoUrl = urlData.signedUrl;
        }
      }
      return categoria;
    })
  );

  res.json(categoriasConFotos);
});

// ENDPOINT 2: Obtener los "Archivos" de una Carpeta (Ej: "Niños" y "Adultos")
router.get('/:id/cursos', async (req, res) => {
  const categoriaId = req.params.id;
  
  const { data, error } = await supabase
    .from('Cursos_Horarios')
    .select('*')
    .eq('categoria_id', categoriaId) // <-- ¡La conexión!
    .order('orden', { ascending: true });

  if (error) {
    console.error("Error al obtener Cursos_Horarios:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// --- ENDPOINTS DE ADMIN (CRUD para las "Carpetas") ---
// (Esto es un C.R.U.D. copiado y pegado de "Miembros", pero para 'Categorias_Actividad')

// CREAR una Categoría (Carpeta)
router.post('/', authMiddleware, upload.single('foto'), async (req, res) => {
  const { nombre, descripcion, orden } = req.body;
  const fotoFile = req.file;

  if (!nombre) {
    return res.status(400).json({ error: 'Nombre es obligatorio.' });
  }

  let fotoPath = null;
  if (fotoFile) {
    const fileName = `${Date.now()}_${fotoFile.originalname}`;
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('fotos_actividades') // ¡Asume que este bucket existe!
      .upload(fileName, fotoFile.buffer, { contentType: fotoFile.mimetype });

    if (uploadError) return res.status(500).json({ error: 'Error al subir la foto: ' + uploadError.message });
    fotoPath = uploadData.path;
  }

  const { data, error } = await supabase
    .from('Categorias_Actividad')
    .insert([{ nombre, descripcion, fotoUrl: fotoPath, orden }])
    .select();

  if (error) return res.status(500).json({ error: 'Error al crear la categoría: ' + error.message });
  res.status(201).json(data[0]);
});

// ACTUALIZAR una Categoría (Carpeta)
router.put('/:id', authMiddleware, upload.single('foto'), async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, orden } = req.body;
  const fotoFile = req.file;

  if (!nombre) {
    return res.status(400).json({ error: 'Nombre es obligatorio.' });
  }

  const { data: itemActual, error: findError } = await supabase.from('Categorias_Actividad').select('fotoUrl').eq('id', id).single();
  if (findError) return res.status(404).json({ error: 'Categoría no encontrada.' });

  let fotoPath = itemActual.fotoUrl;
  if (fotoFile) {
    const fileName = `${Date.now()}_${fotoFile.originalname}`;
    const { data: uploadData, error: uploadError } = await supabase.storage.from('fotos_actividades').upload(fileName, fotoFile.buffer, { contentType: fotoFile.mimetype });
    if (uploadError) return res.status(500).json({ error: 'Error al subir la foto nueva: ' + uploadError.message });
    fotoPath = uploadData.path;
    if (itemActual.fotoUrl) {
      await supabase.storage.from('fotos_actividades').remove([itemActual.fotoUrl]);
    }
  }

  const { data, error } = await supabase
    .from('Categorias_Actividad')
    .update({ nombre, descripcion, fotoUrl: fotoPath, orden })
    .eq('id', id)
    .select();

  if (error) return res.status(500).json({ error: 'Error al actualizar la categoría: ' + error.message });
  res.status(200).json(data[0]);
});

// BORRAR una Categoría (Carpeta)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  
  // (Nota: Esto fallará si hay "Cursos" que dependen de esta "Categoría")
  // (Primero tendríamos que borrar los cursos, pero eso es Triage v3.0)
  
  const { data: item, error: findError } = await supabase.from('Categorias_Actividad').select('fotoUrl').eq('id', id).single();
  if (item && item.fotoUrl) {
    await supabase.storage.from('fotos_actividades').remove([item.fotoUrl]);
  }

  const { error } = await supabase.from('Categorias_Actividad').delete().eq('id', id);
  if (error) return res.status(500).json({ error: 'Error al borrar la categoría: ' + error.message });
  
  res.status(204).send();
});

export default router;