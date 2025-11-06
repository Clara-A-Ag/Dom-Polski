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
        <component :is="activeComponent.component" v-bind="activeComponent.props || {}"></component>
      </div>
    </div>
  </section>
</template>

<script>
import Idioma from './Idioma.vue';
import Cocina from './Cocina.vue';
import GeneralActCard from './GeneralActCard.vue';

export default {
  name: 'ActividadesSection',
  components: { Idioma, Cocina, GeneralActCard},
  data() {
    return {
      activities: [], 
      activeTab: null,
      
      
      componentMap: {
        'Idioma': Idioma,
        'Cocina': Cocina,
      },
      API_BASE_URL: 'http://localhost:3000',
    };
  },
  computed: {
    activeComponent() {
        const activeActivity = this.activities.find(a => a.id === this.activeTab);
        if (!activeActivity) return { component: null, props: {} };

        const activityName = activeActivity.name;
        
        const activityDescription = activeActivity.descripcion || 'No hay descripción detallada.';

        // 1. Determinar qué componente usar (especial o genérico)
        let ComponentToRender = this.componentMap[activityName];
        
        // Si NO está mapeado, usar el genérico. Esto incluye a Ballet y futuras actividades.
        if (!ComponentToRender) {
            ComponentToRender = GeneralActCard;
        }

        // 2. Si es la plantilla genérica, devolver la configuración con props.
        if (ComponentToRender === GeneralActCard) {
            return {
                component: ComponentToRender,
                props: {
                    activityId: activeActivity.id, 
                    activityName: activityName,
                    activityDescription: activityDescription,
                }
            };
        }
        
        // 3. Devolver el componente especial (Idioma o Cocina)
        return { component: ComponentToRender, props: {} }; 
    }
  },
  methods: {
    selectTab(activityId) {
      this.activeTab = activityId;
    },
   
    
    async fetchActivitiesFromBSDS() {
    
      try {
        const ENDPOINT = '/actividades';

        const response = await fetch(this.API_BASE_URL + ENDPOINT); 

        if (!response.ok) {
          throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        
        const dbActivities = await response.json(); 
        this.activities = dbActivities;

        if (this.activities.length > 0) {
          if (!this.activeTab || !this.activities.some(a => a.id === this.activeTab)) {
            this.activeTab = this.activities[0].id;
          }
        }
      } catch (error) {
        console.error("Error al obtener las actividades:", error);
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