import { Router } from 'express';
import { supabase } from '../config/supabaseClient.js';

const router = Router();

// Obtener todos los mensajes de contacto
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('Contacto')
    .select('*')
    .order('fechaEnvio', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Guardar un nuevo mensaje de contacto
router.post('/', async (req, res) => {
  const { nombre, email, mensaje, sector } = req.body;
  const { data, error } = await supabase
    .from('Contacto')
    .insert([{ nombre, email, mensaje, sector }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

export default router;
