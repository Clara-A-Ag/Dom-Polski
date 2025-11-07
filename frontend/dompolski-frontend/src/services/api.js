// dom-polski-frontend/src/api.js (o donde lo tengas)

import axios from 'axios';

// 1. URL del backend (¡esto ya lo tenías perfecto!)
const API_URL = import.meta.env.VITE_API_URL;

// 2. ¡LA MEJORA! Creamos la "instancia" de Axios
// Este es nuestro cliente de API centralizado
const apiClient = axios.create({
  baseURL: API_URL, // <-- La magia está aquí
  headers: {
    'Content-Type': 'application/json'
  }
});

// 3. (PARA EL FUTURO - Fase 1 del Admin):
// Aquí es donde, más adelante, le diremos a apiClient
// que añada el token de Supabase a CADA petición.
// apiClient.interceptors.request.use( ... )

// 4. Exportamos el cliente para usarlo en TODOS lados
export default apiClient;