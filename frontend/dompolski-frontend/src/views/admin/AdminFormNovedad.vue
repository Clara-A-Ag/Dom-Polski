<template>
  <div class="form-container">
    <h1>{{ modoEdicion ? 'Editar Noticia' : 'Crear Nueva Noticia' }}</h1>

    <div v-if="cargando" class="loading">Cargando datos...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <form v-if="!cargando" @submit.prevent="handleSubmit" class="admin-form">
      
      <div class="form-group">
        <label for="titulo">Título</label>
        <input type="text" id="titulo" v-model="noticia.titulo" required />
      </div>

      <div class="form-group">
        <label for="descripcionCorta">Descripción Corta (para tarjetas)</label>
        <textarea id="descripcionCorta" v-model="noticia.descripcionCorta" rows="3" required></textarea>
      </div>

      <div class="form-group">
        <label for="contenido">Contenido Completo (Fase 2: Editor de Texto)</label>
        <textarea id="contenido" v-model="noticia.contenido" rows="10" required></textarea>
      </div>

      <div class="form-group">
        <label for="imagenUrl">URL de Imagen (Fase 2: Uploader)</label>
        <input type="text" id="imagenUrl" v-model="noticia.imagenUrl" placeholder="/imagenes/mi-foto.jpg" />
      </div>

      <div class="form-row">
        <div class="form-group-check">
          <input type="checkbox" id="destacada" v-model="noticia.destacada" />
          <label for="destacada">¿Es Destacada?</label>
        </div>
        <div class="form-group-check">
          <input type="checkbox" id="esTemporal" v-model="noticia.esTemporal" />
          <label for="esTemporal">¿Es Temporal (Suceso)?</label>
        </div>
      </div>

      <div v-if="noticia.esTemporal" class="form-group">
        <label for="fechaExpiracion">Fecha de Expiración</label>
        <input type="date" id="fechaExpiracion" v-model="noticia.fechaExpiracion" />
      </div>
      
      <div class="form-actions">
        <router-link to="/admin/novedades" class="btn btn-secondary">Cancelar</router-link>
        <button type="submit" class="btn btn-primary" :disabled="procesando">
          {{ procesando ? 'Guardando...' : 'Guardar Noticia' }}
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
const noticia = ref({
  titulo: '',
  descripcionCorta: '',
  contenido: '',
  imagenUrl: '',
  destacada: false,
  esTemporal: false,
  fechaExpiracion: null
});
const cargando = ref(false); // Para cargar los datos en modo "Editar"
const procesando = ref(false); // Para el botón "Guardar"
const error = ref(null);

// --- Lógica del Router ---
const route = useRoute(); // Para leer la URL
const router = useRouter(); // Para redirigir
const noticiaId = route.params.id; // Cogemos el ID de la URL
const modoEdicion = ref(!!noticiaId); // Si hay ID, estamos en modo "Editar"

// --- LÓGICA DE CARGA (para modo "Editar") ---
async function fetchNoticiaData() {
  if (!modoEdicion.value) return; // Si estamos en "Crear", no hay nada que cargar
  
  cargando.value = true;
  try {
    // Usamos el endpoint que ya existe
    const response = await apiClient.get(`/novedades/${noticiaId}`);
    // Rellenamos el formulario con los datos de la API
    noticia.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = 'Error: No se pudo cargar la noticia para editar.';
  } finally {
    cargando.value = false;
  }
}

// --- LÓGICA DE GUARDADO (Crear o Editar) ---
async function handleSubmit() {
  procesando.value = true;
  error.value = null;

  try {
    // 1. Pedimos el "Pase VIP" (el token)
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) throw new Error('Error de autenticación.');

    const headers = {
      Authorization: `Bearer ${session.access_token}`
    };
    
    // 2. Preparamos el "paquete" de datos
    const payload = noticia.value;

    // 3. Decidimos si CREAR o ACTUALIZAR
    if (modoEdicion.value) {
      // MODO EDICIÓN (PUT)
      await apiClient.put(`/novedades/${noticiaId}`, payload, { headers });
    } else {
      // MODO CREAR (POST)
      await apiClient.post('/novedades', payload, { headers });
    }
    
    // 4. ¡Éxito! Redirigimos a la lista.
    router.push('/admin/novedades');

  } catch (err) {
    console.error(err);
    error.value = 'Error al guardar la noticia: ' + (err.response?.data?.error || err.message);
  } finally {
    procesando.value = false;
  }
}

// --- Hook de Carga ---
onMounted(() => {
  fetchNoticiaData(); // Intenta cargar datos si estamos en modo "Editar"
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
.form-group input[type="date"],
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.form-row {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}
.form-group-check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.form-group-check input {
  width: 20px;
  height: 20px;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
}

/* Botones genéricos (copiados de la vista de tabla) */
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