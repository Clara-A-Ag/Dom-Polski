<template>
  <div class="form-container">
    <h1>{{ modoEdicion ? 'Editar Miembro' : 'Añadir Nuevo Miembro' }}</h1>

    <div v-if="cargando" class="loading">Cargando datos...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <form v-if="!cargando" @submit.prevent="handleSubmit" class="admin-form">
      
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" v-model="miembro.nombre" required />
      </div>
      <div class="form-group">
        <label for="apellido">Apellido</label>
        <input type="text" id="apellido" v-model="miembro.apellido" />
      </div>
      <div class="form-group">
        <label for="cargo">Cargo (ej. "Presidente", "Vocal Titular")</label>
        <input type="text" id="cargo" v-model="miembro.cargo" required />
      </div>

      <div class="form-group">
        <label for="area">Área</label>
        <select id="area" v-model="miembro.area" required>
          <option disabled value="">Seleccione un área...</option>
          <option value="Comisión Directiva">Comisión Directiva</option>
          <option value="Audiovisuales">Audiovisuales</option>
          <option value="Ballet">Ballet</option>
          </select>
      </div>

      <div class="form-group">
        <label for="orden">Orden (ej. 1, 2, 3...)</label>
        <input type="number" id="orden" v-model.number="miembro.orden" />
      </div>

      <div class="form-group">
        <label for="foto">Foto del Miembro</label>
        <input type="file" id="foto" @change="handleFileChange" accept="image/*" />
        
        <div v-if="modoEdicion && miembro.fotoUrl" class="foto-actual">
          <p>Foto actual:</p>
          <img :src="miembro.fotoUrl" alt="Foto actual" />
          <small>Sube un nuevo archivo para reemplazarla.</small>
        </div>
      </div>
      
      <div class="form-actions">
        <router-link to="/admin/miembros" class="btn btn-secondary">Cancelar</router-link>
        <button type="submit" class="btn btn-primary" :disabled="procesando">
          {{ procesando ? 'Guardando...' : 'Guardar Miembro' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '@/services/api';
import { supabase } from '@/supabaseClient';

// --- Estado del Componente ---
const miembro = ref({
  nombre: '',
  apellido: '',
  cargo: '',
  area: '',
  fotoUrl: null,
  orden: 100
});
const fotoFile = ref(null); // ¡NUEVO! Aquí guardamos el archivo
const cargando = ref(false);
const procesando = ref(false);
const error = ref(null);

// --- Lógica del Router ---
const route = useRoute();
const router = useRouter();
const miembroId = route.params.id;
const modoEdicion = ref(!!miembroId);

// --- LÓGICA DE CARGA (para modo "Editar") ---
async function fetchMiembroData() {
  if (!modoEdicion.value) return; 
  
  cargando.value = true;
  try {
    // ¡MUCHO MEJOR! Llama al nuevo endpoint
    // (Asegúrate de haber hecho la Misión 3 Opcional)
    const response = await apiClient.get(`/miembros/${miembroId}`);
    miembro.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = 'Error: No se pudo cargar el miembro para editar.';
  } finally {
    cargando.value = false;
  }
}

// --- LÓGICA DE ARCHIVOS ---
function handleFileChange(event) {
  // Guardamos el archivo seleccionado
  fotoFile.value = event.target.files[0];
}

// --- LÓGICA DE GUARDADO (Crear o Editar) ---
// REEMPLAZA ESTA FUNCIÓN COMPLETA
async function handleSubmit() {
  procesando.value = true;
  error.value = null;

  try {
    // 1. Pedimos el "Pase VIP" (token)
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) throw new Error('Error de autenticación.');

    // 2. Preparamos el "paquete" de datos
    // Usamos FormData porque vamos a enviar un ARCHIVO
    const formData = new FormData();
    formData.append('nombre', miembro.value.nombre);
    formData.append('apellido', miembro.value.apellido || '');
    formData.append('cargo', miembro.value.cargo);
    formData.append('area', miembro.value.area);
    formData.append('orden', miembro.value.orden);
    
    // Si el usuario seleccionó un archivo nuevo
    if (fotoFile.value) {
      formData.append('foto', fotoFile.value);
    }
    
    // 3. ¡LA CORRECCIÓN ESTÁ AQUÍ!
    // Creamos las cabeceras. Esta vez, le *decimos*
    // que es 'multipart/form-data' para anular
    // el 'application/json' de nuestro apiClient.
    const headers = {
      Authorization: `Bearer ${session.access_token}`,
      'Content-Type': 'multipart/form-data'
    };

    // 4. Decidimos si CREAR o ACTUALIZAR
    if (modoEdicion.value) {
      // MODO EDICIÓN (PUT)
      // (Nota: El método PUT con FormData puede ser quisquilloso en algunos backends,
      // pero Express/Multer deberían manejarlo bien.)
      await apiClient.put(`/miembros/${miembroId}`, formData, { headers });
    } else {
      // MODO CREAR (POST)
      await apiClient.post('/miembros', formData, { headers });
    }
    
    // 5. ¡Éxito! Redirigimos a la lista.
    router.push('/admin/miembros');

  } catch (err) {
    console.error(err);
    error.value = 'Error al guardar el miembro: ' + (err.response?.data?.error || err.message);
  } finally {
    procesando.value = false;
  }
}

// --- Hook de Carga ---
onMounted(() => {
  fetchMiembroData(); // Intenta cargar datos si estamos en modo "Editar"
});
</script>

<style scoped>
/* Estilos simples para el formulario */
.form-container {
  max-width: 800px;
}
.admin-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="file"],
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.foto-actual img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
  border: 1px solid #ddd;
}
.foto-actual small {
  display: block;
  color: #666;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
}

/* (El resto de los estilos de botones y errores son iguales) */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
}
.btn-primary {
  background-color: #007bff;
  color: white;
}
.btn-secondary {
  background-color: #6c757d;
  color: white;
}
.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.loading, .error {
  text-align: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}
.error {
  background-color: #f8d7da;
  color: #721c24;
}
</style>