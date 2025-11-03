<template>
  <div class="novedades-container">
    <h2>Novedades</h2>

    <div class="busqueda-wrapper">
      <input 
        type="text" 
        v-model="terminoBusqueda" 
        placeholder="Buscar por título o descripción..."
        @keyup.enter="aplicarBusqueda"
      />
      <button @click="aplicarBusqueda">Buscar</button>
    </div>

    <div v-if="cargando" class="cargando">
      Cargando noticias...
    </div>
    <div v-else-if="noticias.length > 0" class="lista-novedades">
      <NovedadCard 
        v-for="novedad in noticias" 
        :key="novedad.id" 
        :novedad="novedad"
        />
    </div>
    <div v-else class="no-resultados">
      No se encontraron novedades.
    </div>

    <div class="paginacion-wrapper">
      <Paginacion 
        :totalPaginas="totalPaginas"
        :paginaActual="paginaActual"
        @cambiar-pagina="cambiarPagina"
        />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';
import NovedadCard from '@/components/NovedadesComponentes/NovedadCard.vue';
import Paginacion from '@/components/common/Paginacion.vue';

// Aún no los creamos, pero los importamos
// import NovedadCard from '@/components/NovedadesComponentes/NovedadCard.vue';
// import Paginacion from '@/components/common/Paginacion.vue';

// --- ESTADO ---
// Almacenamos los datos que vienen de la API
const noticias = ref([]);
const cargando = ref(true);
const totalNoticias = ref(0);
const LIMITE_POR_PAGINA = 5; // Coincide con el default del backend

// Estado de la UI (lo que el usuario controla)
const paginaActual = ref(1);
const terminoBusqueda = ref(''); // El texto en el input
const filtroBusqueda = ref(''); // El texto que se *aplicó* al buscar

// --- PROPIEDAD COMPUTADA ---
// Calcula el total de páginas basado en el conteo total
const totalPaginas = computed(() => {
  return Math.ceil(totalNoticias.value / LIMITE_POR_PAGINA);
});

// --- MÉTODOS ---
// La función "cerebro" que llama a nuestra API
async function fetchNovedades() {
  cargando.value = true;
  try {
    const response = await axios.get('http://localhost:3000/novedades', {
      params: {
        page: paginaActual.value,
        limit: LIMITE_POR_PAGINA,
        search: filtroBusqueda.value 
      }
    });
    
    // El backend devuelve { data: [...], totalCount: X }
    noticias.value = response.data.data;
    totalNoticias.value = response.data.totalCount;
    
  } catch (error) {
    console.error("Error al cargar novedades:", error);
    // Aquí podrías poner un estado de "error"
  } finally {
    cargando.value = false;
  }
}

// Método para cuando el usuario presiona "Buscar"
function aplicarBusqueda() {
  paginaActual.value = 1; // Siempre vuelve a la pág 1 al buscar
  filtroBusqueda.value = terminoBusqueda.value;
  fetchNovedades();
}

// Método para cuando el paginador emite el evento
function cambiarPagina(nuevaPagina) {
  paginaActual.value = nuevaPagina;
}

// --- WATCHERS (Observadores) ---
// Si 'paginaActual' cambia, llamamos a la API de nuevo
// (excepto cuando es por una búsqueda, pero fetchNovedades maneja eso)
watch(paginaActual, fetchNovedades);

// --- HOOK DE CICLO DE VIDA ---
// Llama a la API en cuanto el componente se carga
onMounted(() => {
  fetchNovedades();
});

</script>

<style scoped>
.novedades-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}
.busqueda-wrapper {
  display: flex;
  gap: 10px;
  margin-bottom: 2rem;
}
.busqueda-wrapper input {
  flex-grow: 1;
  padding: 0.5rem;
}
.lista-novedades {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.cargando, .no-resultados {
  text-align: center;
  font-style: italic;
  color: #666;
  padding: 2rem;
}
.paginacion-wrapper {
  margin-top: 2rem;
}
</style>