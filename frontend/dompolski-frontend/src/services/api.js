import axios from 'axios';

// URL del backend desde variable de entorno
// En desarrollo: VITE_API_URL=http://localhost:3000
const API_URL = import.meta.env.VITE_API_URL;

// Función genérica para obtener datos
const fetchData = async (endpoint) => {
  try {
    const res = await axios.get(`${API_URL}${endpoint}`);
    return res.data;
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error);
    throw error;
  }
};

// Funciones específicas para cada recurso
export const getNovedades = () => fetchData('/novedades');
export const getActividades = () => fetchData('/actividades');
export const getHistoria = () => fetchData('/historia');
export const getMiembros = () => fetchData('/miembros');
export const getRecetas = () => fetchData('/recetas');
