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
        <component :is="activeComponent"></component>
      </div>
    </div>
  </section>
</template>

<script>
import Idioma from './Idioma.vue';
import Ballet from './Ballet.vue';
import Cocina from './Cocina.vue';

export default {
  name: 'ActividadesSection',
  components: { Idioma, Ballet, Cocina },
  data() {
    return {
      activities: [], 
      activeTab: null,
      // Mapeo de nombres de actividades a los componentes de Vue
      componentMap: {
        'Idioma': Idioma,
        'Ballet': Ballet,
        'Cocina': Cocina,
      }
    };
  },
  computed: {
    // Computa dinámicamente qué componente mostrar
    activeComponent() {
      const activeActivity = this.activities.find(a => a.id === this.activeTab);
      if (activeActivity && this.componentMap[activeActivity.name]) {
        return this.componentMap[activeActivity.name];
      }
      return null;
    }
  },
  methods: {
    selectTab(activityId) {
      this.activeTab = activityId;
    },
    
    // Función para obtener datos de la Base de Datos 
    async fetchActivitiesFromBSDS() {
      try {
        
        const API_BASE_URL = 'http://localhost:3000'; // puerto backend
        const ENDPOINT = '/dom-polski-backend/src/routes/actividades.routes.js'; //  ruta 
        
        const response = await fetch(API_BASE_URL + ENDPOINT); 
        
        if (!response.ok) {
          throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        
        const dbActivities = await response.json(); 
        
        // Asumiendo que tu backend devuelve un array de objetos con { id, name, iconName }
        this.activities = dbActivities;

        if (this.activities.length > 0) {
          this.activeTab = this.activities[0].id;
        }
      } catch (error) {
        console.error("Error al obtener las actividades:", error);
        // Fallback: Si falla, puedes usar datos estáticos para desarrollo
        this.activities = [
            { id: 'idioma', name: 'Idioma', iconName: 'language' },
            { id: 'ballet', name: 'Ballet', iconName: 'theater_comedy' },
            { id: 'cocina', name: 'Cocina', iconName: 'dinner_dining' },
        ];
        if (this.activities.length > 0) {
            this.activeTab = this.activities[0].id;
        }
      }
    }
  },
  created() {
    this.fetchActivitiesFromBSDS();
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
    --fondo-menu: #efedd6; /* Color de fondo del menú */
    --fondo-activo: #efedd6; /* Color de fondo del ítem activo */
}

/* --------------------
   2. Maquetación Principal y Fuente
   -------------------- */
.section {
    font-family: 'Ubuntu', sans-serif; 
    display: block; 
    position: relative;
    min-height: auto; 
    padding: 0;
}

/* Contenedor Flexbox principal: alinea sidebar-wrapper y content en fila */
.main-content-area {
    display: flex;
    align-items: flex-start;
    padding: var(--padding-base); /* Padding para toda la sección de contenido */
    width: 100%;
}

/* --------------------
   3. Contenedor del Menú (sidebar-wrapper)
   -------------------- */
.sidebar-wrapper {
  background-color: #efedd6;
    display: flex;
    flex-direction: column; /* Alinea Título y Menú en columna */
    margin-right: var(--espacio-separacion); 
}

/* Estilo del Título 'SECCIONES' */
.title {
  background-color: #efedd6;
    margin: 0; 
    padding: 4.5px; 
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 700;
}

/* --------------------
   4. Estilos del Menú Lateral (.sidebar)
   -------------------- */
.sidebar {
    width: min-content; /* Ocupa solo el ancho necesario */
    min-width: 150px; 
    background-color: var(--fondo-menu); 
    padding: 0.5rem 0; 
    
    border: 1px solid #d0c8b3; 
    border-radius: var(--borde-radio);
    
    height: auto; 
}

.sidebar__list {
    list-style: none;
    margin: 0;
    padding: 0;
}

/* --------------------
   5. Estilos de los Ítems (<li> y <a>)
   -------------------- */
.sidebar__item {
    height: var(--item-height);
    transition: background-color 0.2s;
    padding-bottom: 5px;
    padding-top: 3px;
}

.sidebar__item a {
    display: flex;
    align-items: center; 
    height: 100%;
    text-decoration: none;
    color: var(--color-texto);
    font-size: 1.1rem;
    padding: 0 0.8rem; /* Padding lateral más estrecho */
    text-transform: capitalize; 
    font-weight: 500; 
}

/* --------------------
   6. Estilo del Estado ACTIVO (Barra Roja)
   -------------------- */
.sidebar__item:hover {
    background-color: #efedd6; 
    cursor: pointer;
}

.sidebar__item.is-active {
    background-color: var(--fondo-activo); 
    font-weight: 700; 
}

/* BARRA LATERAL ROJA */
.sidebar__item.is-active a {
    border-left: 5px solid var(--color-primario); 
    padding-left: calc(0.8rem - 5px); 
    color: var(--color-texto);
}

/* Colorea el ícono del ítem activo */
.sidebar__item.is-active .icon {
    color: var(--color-texto);
    font-variation-settings: 'FILL' 0, 'wght' 600, 'GRAD' 0, 'opsz' 24;
}

/* --------------------
   7. Estilos de Íconos
   -------------------- */
.icon {
    font-size: 1.5rem;
    color: #c00606; 
    order: -1; 
    margin-right: 0.6rem; 
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* --------------------
   8. Contenedor del Contenido
   -------------------- */
.content {
    flex-grow: 1; 
    padding: var(--padding-base); 
    background-color: #fff; 
    height: auto;
}
</style>