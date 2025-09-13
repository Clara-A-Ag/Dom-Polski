// Cargar variables de entorno
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Leer las variables desde .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Validar que existan
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan variables SUPABASE_URL o SUPABASE_KEY en el archivo .env');
}

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
