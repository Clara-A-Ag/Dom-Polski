<template>
  <nav class="paginacion-nav">
    <ul class="paginacion-lista">
      <li class="paginacion-item">
        <button 
          @click="cambiarPagina(paginaActual - 1)" 
          :disabled="paginaActual === 1"
          class="paginacion-boton"
        >
          &laquo; </button>
      </li>

      <li 
        class="paginacion-item" 
        v-for="pagina in paginasVisibles" 
        :key="pagina"
      >
        <button 
          v-if="typeof pagina === 'number'"
          @click="cambiarPagina(pagina)"
          :class="['paginacion-boton', { 'activo': pagina === paginaActual }]"
        >
          {{ pagina }}
        </button>
        <span v-else class="paginacion-puntos">{{ pagina }}</span>
      </li>

      <li class="paginacion-item">
        <button 
          @click="cambiarPagina(paginaActual + 1)" 
          :disabled="paginaActual === totalPaginas"
          class="paginacion-boton"
        >
          &raquo; </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

// --- PROPS ---
// Los datos que recibe desde 'NovedadesVista'
const props = defineProps({
  totalPaginas: {
    type: Number,
    required: true,
    default: 1
  },
  paginaActual: {
    type: Number,
    required: true,
    default: 1
  },
  // Cuántos números mostrar alrededor de la pág actual
  maxPaginasVisibles: { 
    type: Number,
    default: 5 
  }
});

// --- EMITS ---
// Lo que "grita" hacia arriba cuando el usuario hace clic
const emit = defineEmits(['cambiar-pagina']);

// --- MÉTODOS ---
function cambiarPagina(nuevaPagina) {
  // Validamos que no se vaya de los límites
  if (nuevaPagina < 1 || nuevaPagina > props.totalPaginas) {
    return;
  }
  // "Gritamos" el evento
  emit('cambiar-pagina', nuevaPagina);
}

// --- COMPUTED (La Lógica) ---
// Aquí generamos el array de páginas visibles (ej. [1, '...', 4, 5, 6, '...', 10])
const paginasVisibles = computed(() => {
  const { totalPaginas, paginaActual, maxPaginasVisibles } = props;
  if (totalPaginas <= maxPaginasVisibles) {
    // Si hay pocas páginas, las mostramos todas
    return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  const paginas = [];
  const mitad = Math.floor(maxPaginasVisibles / 2);
  let inicio = Math.max(1, paginaActual - mitad);
  let fin = Math.min(totalPaginas, paginaActual + mitad);

  if (paginaActual - mitad <= 1) {
    fin = maxPaginasVisibles;
  }
  if (paginaActual + mitad >= totalPaginas) {
    inicio = totalPaginas - maxPaginasVisibles + 1;
  }

  // Siempre mostrar la página 1
  if (inicio > 1) {
    paginas.push(1);
    if (inicio > 2) {
      paginas.push('...');
    }
  }

  // Los números del medio
  for (let i = inicio; i <= fin; i++) {
    paginas.push(i);
  }

  // Siempre mostrar la última página
  if (fin < totalPaginas) {
    if (fin < totalPaginas - 1) {
      paginas.push('...');
    }
    paginas.push(totalPaginas);
  }

  return paginas;
});

</script>

<style scoped>
.paginacion-nav {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}
.paginacion-lista {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}
.paginacion-item:not(:first-child) {
  border-left: 1px solid #ddd;
}
.paginacion-boton {
  background: #fff;
  border: none;
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  color: #007bff; /* Un color de acento */
  transition: background-color 0.2s, color 0.2s;
}
.paginacion-boton:hover:not(:disabled) {
  background-color: #f4f4f4;
}
.paginacion-boton:disabled {
  color: #aaa;
  cursor: not-allowed;
}
.paginacion-boton.activo {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}
.paginacion-puntos {
  padding: 0.75rem 1rem;
  color: #aaa;
}
</style>