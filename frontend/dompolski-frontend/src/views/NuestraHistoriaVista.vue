<template>
  <div>
    <SobreNosotros />
    <CelebrandoNuestrasRaices />
    <NuestraSede />
  </div>
</template>

<script>
import SobreNosotros from '@/components/NuestraHistoriaComponente/SobreNosotros.vue';
import CelebrandoNuestrasRaices from '@/components/NuestraHistoriaComponente/CelebrandoNuestrasRaices.vue';
import NuestraSede from '@/components/NuestraHistoriaComponente/NuestraSede.vue';

export default {
  name: 'NuestraHistoria',
  components: {
    SobreNosotros,
    CelebrandoNuestrasRaices,
    NuestraSede
  }
};
</script>

<style scoped>
/* Estilos específicos para esta vista si los necesitas */
</style>