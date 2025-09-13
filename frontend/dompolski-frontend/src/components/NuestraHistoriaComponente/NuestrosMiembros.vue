<template>
  <div>
    <h1 class="title">Nuestros Miembros</h1>

    <div v-if="loading">Cargando miembros...</div>
    <div v-else>
      <hr>
      <h2>Comisión Directiva</h2>
      <div class="members-grid">
        <MiembroCard 
          v-for="miembro in comisionDirectiva"
          :key="miembro.id"
          :miembro="miembro" 
        />
      </div>

      <h2 style="margin-top: 40px;">Audiovisuales</h2>
      <div class="members-grid">
        <MiembroCard
          v-for="miembro in audiovisuales"
          :key="miembro.id"
          :miembro="miembro"
        />
      </div>

      <h2 style="margin-top: 40px;">Ballet</h2>
      <div class="members-grid">
        <MiembroCard
          v-for="miembro in ballet"
          :key="miembro.id"
          :miembro="miembro"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MiembroCard from '@/components/MiembroCard.vue';
import { getMiembros } from '@/services/api.js';

const comisionDirectiva = ref([]);
const audiovisuales = ref([]);
const ballet = ref([]);
const loading = ref(true);

const fetchMiembros = async () => {
  try {
    const miembros = await getMiembros();
    comisionDirectiva.value = miembros.filter(m => m.area === 'Comisión Directiva');
    audiovisuales.value = miembros.filter(m => m.area === 'Audiovisuales');
    ballet.value = miembros.filter(m => m.area === 'Ballet');
  } catch (error) {
    console.error('Error al obtener los miembros:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchMiembros);
</script>

<style scoped>
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  justify-items: center;
}

h2 {
  text-align: center;
  margin-bottom: 25px;
}
</style>
