// En dom-polski-backend/src/middlewares/auth.middleware.js

import { supabase } from '../config/supabaseClient.js';

// Este es un "middleware". Es una simple función que se ejecuta
// ANTES de que la petición llegue a tu lógica de ruta.
// Es el "Bouncer" de la API.
export const authMiddleware = async (req, res, next) => {
  // 1. Buscamos el "Pase VIP" (el token) en la cabecera
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No se proveyó un token.' });
  }

  // El token viene como "Bearer [token-largo]"
  // Lo separamos para quedarnos solo con el token
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token malformado.' });
  }

  try {
    // 2. Le preguntamos a Supabase: "¿Este pase VIP es válido?"
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      // Si Supabase dice que hay error (ej. token expirado)
      throw error;
    }

    if (!user) {
      // Si el token es válido pero no corresponde a nadie
      return res.status(401).json({ error: 'Token inválido o usuario no encontrado.' });
    }

    // 3. ¡LUZ VERDE! El pase es bueno.
    // Guardamos el usuario en la petición para uso futuro (opcional)
    req.user = user;
    
    // next() le dice a Express: "Todo bien, deja pasar
    // al siguiente middleware o a la ruta."
    next();

  } catch (error) {
    return res.status(401).json({ error: 'Token no válido: ' + error.message });
  }
};