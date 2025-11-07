<template>
  <section class="section">
    <div class="main-content-area">
        
      <div class="sidebar-wrapper"> 
        <h2 class="title">Cultural:</h2>
        
        <div class="sidebar"> 
          <ul class="sidebar__list"> 
            
            <li class="sidebar__item" 
                v-for="activity in activities" 
                :key="activity.id"
                :class="{ 'is-active': activeTab === activity.id }">
              
              <a href="#" @click.prevent="selectTab(activity.id)">
                <span class="material-symbols-outlined icon">{{ activity.iconName }}</span>
                <span>{{ activity.name }}</span>
              </a>
            </li>

          </ul>
        </div>
      </div>
        
      <div class="content">
        <!-- El componente activo ahora está marcado como 'raw', eliminando el warning de Vue -->
        <component :is="activeComponent.component" v-bind="activeComponent.props || {}"></component>
      </div>
    </div>
  </section>
</template>

<script>
import { markRaw } from 'vue';
import Idioma from './Idioma.vue';
import Cocina from './Cocina.vue';
import GeneralActCard from './GeneralActCard.vue';

// 1. ¡NUESTRO CLIENTE API!
import apiClient from '@/services/api'; // Asumiendo que está en @/api.js o @/api/index.js

export default {
  name: 'ActividadesSection',
  components: { Idioma, Cocina, GeneralActCard }, // Los componentes especiales
  
  data() {
    return {
      activities: [], // La lista para la barra lateral (ahora con el formato correcto)
      activeTab: null,
      
      // 2. ¡MAPA CORREGIDO!
      // Las llaves (keys) AHORA deben coincidir EXACTAMENTE
      // con el 'nombre' que pusiste en tu tabla 'Categorias_Actividad'
      componentMap: {
        'Idioma Polaco': markRaw(Idioma),
        'Cocina': markRaw(Cocina),
        // Si 'Ballet' es el nombre en tu DB, también puedes mapearlo:
        // 'Ballet': markRaw(GeneralActCard), // (Aunque el genérico ya lo agarra)
      },
    };
  },
  
  computed: {
    activeComponent() {
      // 3. BUSCAMOS LA ACTIVIDAD (¡Ajustado a 'nombre'!)
      const activeActivity = this.activities.find(a => a.id === this.activeTab);
      if (!activeActivity) return { component: null, props: {} };

      // Usamos el 'nombre' de la DB (ej. "Idioma Polaco")
      const activityName = activeActivity.nombre; 
      
      // 4. BUSCAMOS EN EL MAPA
      let ComponentToRender = this.componentMap[activityName];
      
      if (!ComponentToRender) {
          ComponentToRender = markRaw(GeneralActCard); // El componente genérico
      }

      // 5. PASAMOS LOS PROPS CORRECTOS
      // El componente 'GeneralActCard' espera 'activityName' y 'activityDescription'
      // Se los pasamos desde nuestra nueva estructura.
      if (ComponentToRender === GeneralActCard) {
          return {
              component: ComponentToRender,
              props: {
                  activityId: activeActivity.id, 
                  activityName: activeActivity.nombre, // Pasamos el 'nombre'
                  activityDescription: activeActivity.descripcion, // Pasamos la 'descripcion'
                  fotoUrl: activeActivity.fotoUrl // <-- Se la pasamos al hijo
              }
          };
      }
      
      // Es un componente especial (Idioma, Cocina), no necesita props
      return { component: ComponentToRender, props: {} }; 
    }
  },
  
  methods: {
    selectTab(activityId) {
      this.activeTab = activityId;
    },
    
    // 6. ¡MÉTODO DE FETCH RECONSTRUIDO!
    async fetchActivitiesFromAPI() { // Renombrado para más claridad
      try {
        // Usamos nuestro apiClient (adiós 'fetch' y 'API_BASE_URL')
        const response = await apiClient.get('/actividades'); 
        
        // La API nos da: [{ id, nombre, descripcion, fotoUrl, orden }]
        const apiCategorias = response.data;
        
        // 7. ¡EL MAPEO! (La traducción)
        // El template espera: { id, name, iconName }
        // Hacemos la traducción:
        this.activities = apiCategorias.map(categoria => ({
          id: categoria.id,
          name: categoria.nombre,
          descripcion: categoria.descripcion,
          nombre: categoria.nombre,
          // ¡AÑADE ESTA LÍNEA SI NO ESTÁ!
          fotoUrl: categoria.fotoUrl, // <-- Guardamos la URL de la foto principal
          iconName: this.getIconFor(categoria.nombre) 
        }));

        // Seleccionamos el primero si no hay nada seleccionado
        if (this.activities.length > 0) {
          if (!this.activeTab || !this.activities.some(a => a.id === this.activeTab)) {
            this.activeTab = this.activities[0].id;
          }
        }
      } catch (error) {
        console.error("Error al obtener las actividades:", error);
      }
    },

    // 8. (Opcional) Un pequeño ayudante para los íconos
    getIconFor(activityName) {
      if (activityName.toLowerCase().includes('idioma')) return 'translate';
      if (activityName.toLowerCase().includes('cocina')) return 'restaurant_menu';
      if (activityName.toLowerCase().includes('ballet')) return 'person_celebrate';
      return 'help'; // Ícono por defecto
    }
  },
  
  created() {
    // 9. Llamamos al nuevo método
    this.fetchActivitiesFromAPI();
  }
}
</script>

<style scoped>
/* --------------------
    1. Variables de Diseño y Colores
    -------------------- */
:root {
    --color-primario: #d90022; 
    --color-texto: #333;
    --item-height: 3.5rem; 
    --borde-radio: 0.5rem;
    --padding-base: 2rem; 
    --espacio-separacion: 3rem;
    --fondo-menu: #efedd6;
    --fondo-activo: #efedd6;
}

/* --------------------
    2. Maquetación Principal y Fuente
    -------------------- */
.section { display: block; position: relative; padding: 0; }
.main-content-area {
    display: flex;
    align-items: flex-start;
    padding: var(--padding-base);
    width: 100%;
}

/* --------------------
    3. Contenedor del Menú (sidebar-wrapper)
    -------------------- */
.sidebar-wrapper {
    background-color: #efedd6;
    display: flex;
    flex-direction: column;
    margin-right: var(--espacio-separacion); 
    border: 1px solid #d0c8b3;
    border-radius: var(--borde-radio);
}

.title {
    background-color: #efedd6;
    margin: 0; 
    padding: 0.5rem 0.8rem;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-texto);
    /* Se elimina la lógica de expansión del título */
    border-bottom: 1px solid #d0c8b3; 
}

/* --------------------
    4. Estilos del Menú Lateral (.sidebar) - ANCHO FIJO
    -------------------- */
.sidebar {
    /* Estado FIJO, ancho suficiente para texto e ícono */
    width: 200px; 
    overflow: hidden; 
    
    background-color: var(--fondo-menu); 
    padding: 0.5rem 0; 
    
    height: auto; 
}

.sidebar__list { list-style: none; margin: 0; padding: 0; }

/* --------------------
    5. Estilos de Ítems y Activo
    -------------------- */
.sidebar__item {
    height: var(--item-height);
    transition: background-color 0.2s;
}

.sidebar__item a {
    display: flex;
    align-items: center; 
    height: 100%;
    text-decoration: none;
    color: var(--color-texto);
    font-size: 1.1rem;
    padding: 0 0.8rem; /* Padding original para el menú visible */
    text-transform: capitalize; 
    font-weight: 500; 
}

.sidebar__item.is-active { background-color: var(--fondo-activo); font-weight: 700; }

/* BARRA LATERAL ROJA del activo */
.sidebar__item.is-active a {
    border-left: 5px solid var(--color-primario); 
    padding-left: calc(0.8rem - 5px); /* Ajuste basado en el nuevo padding */
    color: var(--color-texto);
}

.icon {
    font-size: 1.5rem;
    color: #c00606; 
    margin-right: 0.6rem; 
    flex-shrink: 0; 
}

/* --------------------
    6. Contenedor del Contenido
    -------------------- */
.content {
    flex-grow: 1; 
    padding: var(--padding-base); 
    background-color: #fff; 
    min-width: 0; 
}
</style>