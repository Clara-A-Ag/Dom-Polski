<template>
  <div class="bodymiembro">
    <h1 class="title">Nuestros Miembros</h1>

    <div class="miembros-content-container">

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

        <h2>Audiovisuales</h2>
        <div class="members-grid">
          <MiembroCard
            v-for="miembro in audiovisuales"
            :key="miembro.id"
            :miembro="miembro"
          />
        </div>

        <h2>Ballet</h2>
        <div class="members-grid">
          <MiembroCard
            v-for="miembro in ballet"
            :key="miembro.id"
            :miembro="miembro"
          />
        </div>
      </div>
      
    </div> </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MiembroCard from '@/components/AdministradorComponentes/MiembroCard.vue';

// 1. CAMBIO: Importamos la *nueva* herramienta 'apiClient'
import apiClient from '@/services/api.js'; 
// (Asumo que está en '@/services/api.js', si no, ajusta la ruta)

const comisionDirectiva = ref([]);
const audiovisuales = ref([]);
const ballet = ref([]);
const loading = ref(true);

const fetchMiembros = async () => {
  try {
    // 2. CAMBIO: Usamos la nueva herramienta
    // En lugar de: const miembros = await getMiembros();
    // Hacemos:
    const response = await apiClient.get('/miembros');
    const miembros = response.data; // Los datos están en response.data

    // (El resto de tu lógica de filtrado está perfecta)
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
.bodymiembro{
  background-color: #efedd6;
}
h1.title { /* Sé más específico */
  text-align: center;
  padding-top: 10px;
  padding-bottom: 5px;
  font-family: 'ubuntu';
  color:#333;
}
h2{
  margin-top: 40px;
  font-family: 'ubuntu';
  color:#555;
  text-align: center;

}
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  justify-items: center;
}
.miembros-content-container {
  max-width: 1000px;  /* O el ancho que prefieras (ej. 900px, 1100px) */
  margin: 0 auto;     /* <-- ¡La magia del centrado! */
  padding: 0 20px;    /* Un respiro para que no se pegue a los bordes en móvil */
}
</style>
