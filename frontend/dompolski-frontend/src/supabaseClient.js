// En dom-polski-frontend/src/supabaseClient.js

import { createClient } from '@supabase/supabase-js'

// 1. Lee las variables VITE_ del archivo .env del frontend
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 2. Valida que existan
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan variables VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el .env del frontend');
}

// 3. Crea y exporta el cliente de Supabase para el NAVEGADOR
// (Usa la clave ANÓNIMA, que es segura)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)