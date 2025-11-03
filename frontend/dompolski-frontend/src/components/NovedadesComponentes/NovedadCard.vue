<template>
  <article class="novedad-card">
    <img 
      :src="novedad.imagenUrl" 
      :alt="novedad.titulo" 
      class="novedad-imagen"
      @error="imagenError" 
    />
    <div class="novedad-contenido">
      <h3>{{ novedad.titulo }}</h3>
      <small class="novedad-fecha">{{ fechaFormateada }}</small>
      <p>{{ novedad.descripcionCorta }}</p>
      
      </div>
  </article>
</template>

<script setup>
import { defineProps, computed } from 'vue';

// 1. Definimos el 'prop' que este componente espera
// 'NovedadesVista' le pasará el objeto 'novedad' aquí
const props = defineProps({
  novedad: {
    type: Object,
    required: true
  }
});

// 2. (Buena Práctica) Creamos una propiedad computada
// para formatear la fecha y no ensuciar el template.
const fechaFormateada = computed(() => {
  if (!props.novedad.fechaPublicacion) return '';
  
  return new Date(props.novedad.fechaPublicacion).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// 3. (Buena Práctica) Manejador de error para imágenes rotas.
// Si no encuentra la imagen, pone un placeholder.
function imagenError(event) {
  event.target.src = 'https://via.placeholder.com/400x200?text=Imagen+no+disponible';
}
</script>

<style scoped>
/* 'scoped' significa que estos estilos SOLO aplican a este componente */
.novedad-card {
  display: flex;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.novedad-card:hover {
  transform: translateY(-5px);
}

.novedad-imagen {
  width: 200px;
  height: auto;
  object-fit: cover;
}

.novedad-contenido {
  padding: 1rem 1.5rem;
}

.novedad-contenido h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #333;
}

.novedad-fecha {
  display: block;
  font-size: 0.85rem;
  color: #777;
  margin-bottom: 0.75rem;
}

.novedad-contenido p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 0;
}
</style>