<template>
  <div class="admin-novedades-container">
    <div class="header">
      <h1>Gestionar Novedades</h1>
      <router-link to="/admin/novedades/nuevo" class="btn btn-primary">
        + Crear Nueva Noticia
      </router-link>
    </div>

    <div v-if="cargando" class="loading">Cargando noticias...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <table v-if="novedades.length > 0" class="novedades-table">
        <thead>
            <tr>
            <th>Título</th>
            <th>Publicación</th>
            <th>¿Destacada?</th>
            <th>¿Temporal?</th> <th>Expira</th>     <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="novedad in novedades" :key="novedad.id">
            
            <td>{{ novedad.titulo }}</td>
            
            <td>{{ formatFecha(novedad.fechaPublicacion) }}</td>
            
            <td>
                <span :class="novedad.destacada ? 'tag tag-destacada' : 'tag tag-normal'">
                {{ novedad.destacada ? 'Sí' : 'No' }}
                </span>
            </td>

            <td>
                <span :class="novedad.esTemporal ? 'tag tag-temporal' : 'tag tag-normal'">
                {{ novedad.esTemporal ? 'Sí' : 'No' }}
                </span>
            </td>

            <td>
                {{ formatFecha(novedad.fechaExpiracion) }}
            </td>
            
            <td class="acciones">
                <router-link :to="`/admin/novedades/editar/${novedad.id}`" class="btn btn-secondary">
                Editar
                </router-link>
                <button @click="borrarNovedad(novedad.id)" class="btn btn-danger">
                Borrar
                </button>
            </td>
            </tr>
        </tbody>
    </table>
    
    <div v-else-if="!cargando" class="empty-state">
      <p>No hay novedades para mostrar. ¡Crea la primera!</p>
    </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router'; // Importamos el componente de enlace

// ¡Nuestros clientes! El de API y el de Auth.
import apiClient from '@/services/api'; // Asumiendo que está en @/api.js o @/api/index.js
import { supabase } from '@/supabaseClient';

// --- ESTADO ---
const novedades = ref([]);
const cargando = ref(true);
const error = ref(null);

// --- LÓGICA DE DATOS (LEER) ---
async function fetchNovedades() {
  cargando.value = true;
  error.value = null;
  try {
    // ¡EL CAMBIO DE LÓGICA!
    // Le añadimos el parámetro &scope=admin a la petición
    const response = await apiClient.get('/novedades?page=1&limit=100&scope=admin');
    
    novedades.value = response.data.data;
  } catch (err) {
    console.error(err);
    error.value = 'Error al cargar las novedades.';
  } finally {
    cargando.value = false;
  }
}
// --- LÓGICA DE DATOS (BORRAR) ---
async function borrarNovedad(id) {
  // 1. Confirmación de seguridad
  if (!window.confirm('¿Estás 100% seguro? Esta acción no se puede deshacer.')) {
    return;
  }

  try {
    // 2. Pedimos el "pase VIP"
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      throw new Error('Error de autenticación. Vuelve a iniciar sesión.');
    }

    // 3. ¡LA CORRECCIÓN ESTÁ AQUÍ!
    // Es session.access_token (con guion bajo)
    // NO session.accessToken
    await apiClient.delete(`/novedades/${id}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}` 
      }
    });

    // 4. Éxito: Volvemos a cargar la lista
    await fetchNovedades(); 

  } catch (err) {
    console.error(err);
    // Ahora le pedimos al error que sea más específico
    alert('Error al borrar la noticia: ' + (err.response?.data?.error || err.message));
  }
}

// --- LÓGICA AUXILIAR ---
function formatFecha(fechaISO) {
  if (!fechaISO) return 'N/A';
  return new Date(fechaISO).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// --- Hook de Carga ---
onMounted(() => {
  fetchNovedades();
});
</script>

<style scoped>
/* Un poco de estilo para que no sea tan feo */
.admin-novedades-container {
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: #333;
}

.loading, .error, .empty-state {
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem;
  color: #666;
}
.error {
  color: #D8000C;
}

.novedades-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.novedades-table th,
.novedades-table td {
  border: 1px solid #ddd;
  padding: 0.75rem 1rem;
  text-align: left;
  vertical-align: middle;
}

.novedades-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.acciones {
  display: flex;
  gap: 10px;
}

/* --- Estilos de Botones Genéricos --- */
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  font-size: 0.9rem;
}
.btn-primary {
  background-color: #007bff;
  color: white;
}
.btn-primary:hover {
  background-color: #0056b3;
}
.btn-secondary {
  background-color: #6c757d;
  color: white;
}
.btn-secondary:hover {
  background-color: #5a6268;
}
.btn-danger {
  background-color: #dc3545;
  color: white;
}
.btn-danger:hover {
  background-color: #c82333;
}
</style>