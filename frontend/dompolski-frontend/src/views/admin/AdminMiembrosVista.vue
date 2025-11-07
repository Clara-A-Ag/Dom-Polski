<template>
  <div class="admin-miembros-container">
    <div class="header">
      <h1>Gestionar Miembros</h1>
      <router-link to="/admin/miembros/nuevo" class="btn btn-primary">
        + Añadir Nuevo Miembro
      </router-link>
    </div>

    <div v-if="cargando" class="loading">Cargando miembros...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <table v-if="miembros.length > 0" class="miembros-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cargo</th>
          <th>Área</th>
          <th>Orden</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="miembro in miembros" :key="miembro.id">
          <td class="miembro-celda">
            <img 
              v-if="miembro.fotoUrl" 
              :src="miembro.fotoUrl" 
              alt="Foto de {{ miembro.nombre }}" 
              class="miembro-avatar"
            />
            <span v-else class="avatar-placeholder">
              {{ miembro.nombre ? miembro.nombre[0] : '?' }}
            </span>
            <span>{{ miembro.nombre }} {{ miembro.apellido || '' }}</span>
          </td>
          <td>{{ miembro.cargo }}</td>
          <td>{{ miembro.area }}</td>
          <td>{{ miembro.orden }}</td>
          <td class="acciones">
            <router-link :to="`/admin/miembros/editar/${miembro.id}`" class="btn btn-secondary">
              Editar
            </router-link>
            <button @click="borrarMiembro(miembro.id)" class="btn btn-danger">
              Borrar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div v-else-if="!cargando" class="empty-state">
      <p>No hay miembros para mostrar. ¡Añade el primero!</p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router'; 
import apiClient from '@/services/api'; // Nuestro cliente Axios
import { supabase } from '@/supabaseClient'; // Nuestro cliente Supabase

// --- ESTADO ---
const miembros = ref([]);
const cargando = ref(true);
const error = ref(null);

// --- LÓGICA DE DATOS (LEER) ---
async function fetchMiembros() {
  cargando.value = true;
  error.value = null;
  try {
    // 1. Llamamos al endpoint que ya existía
    const response = await apiClient.get('/miembros');
    miembros.value = response.data; // Este endpoint devuelve un array plano
  } catch (err) {
    console.error(err);
    error.value = 'Error al cargar los miembros.';
  } finally {
    cargando.value = false;
  }
}

// --- LÓGICA DE DATOS (BORRAR) ---
// (Copiada de Novedades y adaptada)
async function borrarMiembro(id) {
  if (!window.confirm('¿Estás seguro de que quieres borrar a este miembro?')) {
    return;
  }

  try {
    // 1. Pedimos el "Pase VIP" (token)
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      throw new Error('Error de autenticación. Vuelve a iniciar sesión.');
    }

    // 2. Llamamos al endpoint DELETE (¡con el guion bajo!)
    await apiClient.delete(`/miembros/${id}`, {
      headers: {
        // ¡ACCESS_TOKEN! ¡NO LO OLVIDAREMOS ESTA VEZ!
        Authorization: `Bearer ${session.access_token}` 
      }
    });

    // 3. Éxito: Volvemos a cargar la lista (para que desaparezca)
    await fetchMiembros(); 

  } catch (err) {
    console.error(err);
    alert('Error al borrar el miembro: ' + (err.response?.data?.error || err.message));
  }
}

// --- Hook de Carga ---
onMounted(() => {
  fetchMiembros();
});
</script>

<style scoped>
/* ¡REUTILIZACIÓN!
  Estos estilos son una copia de AdminNovedadesVista.
  Para un producto final, los moveríamos a un CSS global.
  Por ahora, esto es rápido y funcional.
*/
.admin-miembros-container {
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

.miembros-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.miembros-table th,
.miembros-table td {
  border: 1px solid #ddd;
  padding: 0.75rem 1rem;
  text-align: left;
  vertical-align: middle;
}

.miembros-table th {
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
.miembro-celda {
  display: flex;
  align-items: center;
  gap: 15px;
}
.miembro-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%; /* Círculo */
  object-fit: cover;
  background-color: #eee;
}
.avatar-placeholder {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #ccc;
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>