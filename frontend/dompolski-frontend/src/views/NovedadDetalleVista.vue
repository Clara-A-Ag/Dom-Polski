<template>
  <div class="detalle-container">
    <div v-if="cargando" class="cargando">
      Cargando noticia...
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <router-link to="/novedades" class="volver-link">&laquo; Volver a Novedades</router-link>
    </div>
    
    <article v-else-if="noticia" class="noticia-completa">
      
      <h1>{{ noticia.titulo }}</h1>
      <img 
        :src="noticia.imagenUrl" 
        :alt="noticia.titulo" 
        class="imagen-principal"
        @error="imagenError"
      >
      <p class="fecha-detalle">{{ fechaFormateada }}</p>
      
      <div class="contenido-largo" v-html="noticia.contenido"></div>
      
      <router-link to="/novedades" class="volver-link">&laquo; Volver a Novedades</router-link>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router'; // Hook para leer la URL
import axios from 'axios';

// --- ESTADO ---
const noticia = ref(null);
const cargando = ref(true);
const error = ref(null);

// --- HOOKS ---
const route = useRoute(); // Obtenemos la info de la ruta actual

// 1. Leemos el ID de la URL
const noticiaId = route.params.id;

// 2. Llamamos al endpoint del Paso 1 en cuanto se monta
onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/novedades/${noticiaId}`);
    noticia.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = "Error: No se pudo cargar la noticia o no fue encontrada.";
  } finally {
    cargando.value = false;
  }
});

// --- COMPUTEDS (Ayudantes) ---
const fechaFormateada = computed(() => {
  if (!noticia.value?.fechaPublicacion) return '';
  return new Date(noticia.value.fechaPublicacion).toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
});

function imagenError(event) {
  // Un placeholder por si la imagen de Supabase falla
  event.target.src = 'https://via.placeholder.com/800x400?text=Imagen+no+disponible';
}
</script>

<style scoped>
.detalle-container {
  max-width: 800px; /* Ancho de blog estándar */
  margin: 2rem auto;
  padding: 1rem;
}
.imagen-principal {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}
.fecha-detalle {
  font-style: italic;
  color: #666;
  margin-bottom: 1.5rem;
}
.contenido-largo {
  line-height: 1.7; /* Más legible */
  font-size: 1.1rem;
  color: #333;
}
/* Esto es por si tu 'contenido' tiene <p> o <h2> desde el admin.
  v-html no respeta 'scoped' por sí solo.
*/
.contenido-largo :deep(p) {
  margin-bottom: 1rem;
}
.contenido-largo :deep(h2) {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.volver-link {
  display: inline-block;
  margin-top: 2rem;
  text-decoration: none;
  font-weight: bold;
  color: #007bff;
}
.cargando, .error {
  text-align: center;
  font-size: 1.2rem;
  padding: 3rem;
  color: #666;
}
.error {
  color: #D8000C; /* Rojo error */
}
</style>