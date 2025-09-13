<template>
  <div>
    <SobreNosotros />
    <CelebrandoNuestrasRaices />
    <NuestraSede />
    <NuestosMiembros />
  </div>
</template>

<script>
import SobreNosotros from '@/components/NuestraHistoriaComponente/SobreNosotros.vue';
import CelebrandoNuestrasRaices from '@/components/NuestraHistoriaComponente/CelebrandoNuestrasRaices.vue';
import NuestraSede from '@/components/NuestraHistoriaComponente/NuestraSede.vue';
import NuestosMiembros from '@/components/NuestraHistoriaComponente/NuestrosMiembros.vue'; 
export default {
  name: 'NuestraHistoria',
  components: {
    SobreNosotros,
    CelebrandoNuestrasRaices,
    NuestraSede,
    NuestosMiembros
  }
};
</script>

<style scoped>

</style>