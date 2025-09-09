<template>
  <div>
    <h1 class="title">Nuestros Miembros</h1>

    <hr> <h2>Comisión Directiva</h2>
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MiembroCard from '@/components/MiembroCard.vue';

const comisionDirectiva = ref([]);
const audiovisuales = ref([]);
const ballet = ref([]);

// Función para obtener los miembros de la API del backend
const fetchMiembros = async () => {
  try {
    // Obtener la Comisión Directiva (ordenada)
    const resComision = await fetch('/api/miembros?grupo=Comisión Directiva&orderBy=orden');
    comisionDirectiva.value = await resComision.json();
    
    // Obtener los de Audiovisuales
    const resAudiovisuales = await fetch('/api/miembros?grupo=Audiovisuales');
    audiovisuales.value = await resAudiovisuales.json();

    // Obtener los de Ballet
    const resBallet = await fetch('/api/miembros?grupo=Ballet');
    ballet.value = await resBallet.json();
    
  } catch (error) {
    console.error('Error al obtener los miembros:', error);
  }
};

// Llamamos a la función al cargar el componente
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