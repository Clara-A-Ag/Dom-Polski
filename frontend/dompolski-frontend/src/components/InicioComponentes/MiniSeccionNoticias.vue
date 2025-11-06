<template>
  <section class="mini-seccion-noticias">
    <h2>Mantente al día</h2>

    <div v-if="destacadas.length > 0" class="sub-seccion">
      <h3>Destacadas</h3>
      <div class="noticias-grid">
        <NovedadCard 
          v-for="noticia in destacadas" 
          :key="noticia.id" 
          :novedad="noticia" 
        />
      </div>
    </div>

    <div v-if="recientes.length > 0" class="sub-seccion">
      <h3>Recientes</h3>
      <div class="noticias-grid">
        <NovedadCard 
          v-for="noticia in recientes" 
          :key="noticia.id" 
          :novedad="noticia" 
        />
      </div>
    </div>

  </section>
</template>

<script setup>
import { defineProps } from 'vue';
// 1. ¡REUTILIZACIÓN! Importamos el componente que ya hicimos.
import NovedadCard from '@/components/NovedadesComponentes/NovedadCard.vue';

// 2. Definimos los dos 'props' que este componente espera
defineProps({
  destacadas: {
    type: Array,
    required: true
  },
  recientes: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.mini-seccion-noticias {
  max-width: 900px; /* O el ancho de tu contenido */
  margin: 2rem auto;
  padding: 1rem;
}

.mini-seccion-noticias h2 {
  text-align: center;
  font-size: 1.75rem;
  margin-bottom: 2rem;
}

.sub-seccion {
  margin-bottom: 2rem;
}

.sub-seccion h3 {
  font-size: 1.4rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.noticias-grid {
  display: grid;
  /* Creamos un grid responsive */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
</style>