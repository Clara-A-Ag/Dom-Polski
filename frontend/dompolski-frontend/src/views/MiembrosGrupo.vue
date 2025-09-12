<template>
  <div>
    <h2>{{ tituloGrupo }}</h2>
    <div class="miembros-grid">
      <div v-for="miembro in miembros" :key="miembro.id" class="miembro-card">
        <img :src="miembro.fotoUrl" alt="Foto del miembro" class="miembro-foto" />
        <h3>{{ miembro.nombre }}</h3>
        <p>{{ miembro.cargo }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  grupo: {
    type: String,
    required: true
  },
  tituloGrupo: {
    type: String,
    required: true
  },
  ordenarPor: {
    type: String,
    default: null
  }
});

const miembros = ref([]);

const fetchMiembros = async () => {
  try {
    let url = `/api/miembros?grupo=${props.grupo}`;
    if (props.ordenarPor) {
      url += `&orderBy=${props.ordenarPor}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    miembros.value = data;
  } catch (error) {
    console.error('Error al obtener los miembros:', error);
  }
};

onMounted(() => {
  fetchMiembros();
});
</script>

<style scoped>
.miembros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
.miembro-card {
  text-align: center;
}
.miembro-foto {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
}
</style>