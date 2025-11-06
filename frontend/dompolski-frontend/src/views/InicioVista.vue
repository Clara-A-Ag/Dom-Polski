<template>
  <div>
    <BodyComponent />
    <BodyComponent2 />

    <div v-if="!cargando">
      
      <SeccionTemporal 
        v-if="sucesosTemporales.length > 0"
        :sucesos="sucesosTemporales" 
      />

      <MiniSeccionNoticias 
        :destacadas="noticiasDestacadas" 
        :recientes="noticiasRecientes" 
      />
    
    </div>
    
    <div v-if="cargando" class="cargando-inicio">
      Cargando contenido...
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 1. Importamos los componentes (los 2 viejos y los 2 nuevos)
import BodyComponent from '@/components/InicioComponentes/BodyComponent.vue';
import BodyComponent2 from '@/components/InicioComponentes/BodyComponent2.vue';
import SeccionTemporal from '@/components/InicioComponentes/SeccionTemporal.vue';
import MiniSeccionNoticias from '@/components/InicioComponentes/MiniSeccionNoticias.vue';

export default {
  name: 'InicioVista',
  components: { 
    BodyComponent, 
    BodyComponent2, 
    SeccionTemporal, 
    MiniSeccionNoticias 
  },

  setup() {
    // 2. Creamos las referencias para almacenar los datos
    const sucesosTemporales = ref([]);
    const noticiasDestacadas = ref([]);
    const noticiasRecientes = ref([]);
    const cargando = ref(true); // Para saber cuándo mostrar el contenido

    // 3. Hook 'onMounted' (se ejecuta cuando el componente se carga)
    onMounted(async () => {
      try {
        // 4. Hacemos las 3 llamadas a la API en paralelo (mucho más rápido)
        const [
          resTemporales,
          resDestacadas,
          resNovedades
        ] = await Promise.all([
          // Pedimos el suceso temporal MÁS reciente
          axios.get('http://localhost:3000/novedades/temporales?limit=1'),
          
          // Pedimos las 3 destacadas más recientes
          axios.get('http://localhost:3000/novedades/destacadas?limit=3'),
          
          // Pedimos las 3 noticias "normales" más recientes
          axios.get('http://localhost:3000/novedades?limit=3')
        ]);

        // 5. Guardamos los datos en nuestras referencias
        sucesosTemporales.value = resTemporales.data; // API devuelve un array []
        noticiasDestacadas.value = resDestacadas.data; // API devuelve un array []
        
        // ¡Ojo aquí! El endpoint /novedades devuelve un objeto { data, totalCount }
        // Por eso necesitamos .data.data
        noticiasRecientes.value = resNovedades.data.data; 

      } catch (error) {
        console.error('Error al cargar datos de la página de inicio:', error);
      } finally {
        // 6. Pase lo que pase, decimos que la carga ha terminado
        cargando.value = false;
      }
    });

    // 7. Exponemos las variables al <template>
    return {
      sucesosTemporales,
      noticiasDestacadas,
      noticiasRecientes,
      cargando
    };
  }
};
</script>

<style scoped>
/* (Opcional) Estilo para el indicador de carga */
.cargando-inicio {
  text-align: center;
  padding: 3rem;
  font-style: italic;
  color: #666;
}
</style>