<template>
<div>
  <BodyComponent />
  <BodyComponent2 />

  </div>
</template>

<script>
// Dejamos solo los imports de los componentes estáticos
import BodyComponent from '@/components/InicioComponentes/BodyComponent.vue';
import BodyComponent2 from '@/components/InicioComponentes/BodyComponent2.vue';

export default {
  name: 'InicioVista',
  components: { BodyComponent, BodyComponent2 },
  
  // El 'setup' ahora está limpio, listo para la lógica REAL
  setup() {
    // ... aquí cargaremos las Novedades y Sucesos
  }
};
</script>

<style scoped>
</style>