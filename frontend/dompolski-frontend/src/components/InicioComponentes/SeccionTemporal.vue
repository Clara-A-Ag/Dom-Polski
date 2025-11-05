<template>
  <section class="seccion-temporal">
    <div 
      v-for="suceso in sucesos" 
      :key="suceso.id" 
      class="suceso-item"
    >
      <h3>¡Aviso Importante! — {{ suceso.titulo }}</h3>
      <p>{{ suceso.descripcionCorta }}</p>
      <router-link :to="'/novedades/' + suceso.id" class="ver-mas-link">
        Leer más...
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';

// 1. Definimos el 'prop' que este componente espera
defineProps({
  sucesos: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.seccion-temporal {
  /* Estilos de banner de alerta */
  background-color: #fffbeb; /* Un amarillo pálido */
  border: 1px solid #fd4747; /* Borde amarillo más oscuro */
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem auto;
  max-width: 1000px; /* O el ancho de tu contenido */
}

.suceso-item h3 {
  color: #b40909; /* Un color oscuro para la alerta */
  margin-top: 0;
  font-size: 1.25rem;
}

.suceso-item p {
  color: #7f6000;
  margin-bottom: 0.5rem;
}

.ver-mas-link {
  color: #b45309;
  font-weight: bold;
  text-decoration: none;
}
.ver-mas-link:hover {
  text-decoration: underline;
}
</style>