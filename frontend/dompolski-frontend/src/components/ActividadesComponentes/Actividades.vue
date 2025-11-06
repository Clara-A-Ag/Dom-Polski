<template>
  <section class="section">
    <div class="main-content-area">
        
      <div class="sidebar-wrapper"> 
        <h2 class="title" @click="toggleSidebar">
          Cultural:
          <span class="material-symbols-outlined expand-icon">
            {{ isExpanded ? 'chevron_left' : 'menu' }}
          </span>
        </h2>
        
        <div class="sidebar" :class="{ 'is-expanded': isExpanded }"> 
          <ul class="sidebar__list"> 
            
            <li class="sidebar__item" 
                v-for="activity in activities" 
                :key="activity.id"
                :class="{ 'is-active': activeTab === activity.id }">
              
              <a href="#" @click.prevent="selectTab(activity.id)">
                <span class="material-symbols-outlined icon">{{ activity.iconName }}</span>
                <span :class="{ 'name-text': !isExpanded }">{{ activity.name }}</span>
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
// Importa SOLO los componentes con lógica especial y el componente genérico
import Idioma from './Idioma.vue';
import Cocina from './Cocina.vue';
import GenericActivityCard from './GenericActivityCard.vue'; // Renombré 'GeneralActCard' a 'GenericActivityCard'

export default {
  name: 'ActividadesSection',
  components: { Idioma, Cocina, GenericActivityCard },
  data() {
    return {
      activities: [], 
      activeTab: null,
      isExpanded: true, // Iniciar desplegado para mostrar el texto al inicio

      // Mapeo solo para componentes que tienen una estructura única (Idioma y Cocina)
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
        
        // El campo 'descripcion' viene de la tabla Actividad
        const activityDescription = activeActivity.descripcion || 'No hay descripción detallada.';

        // 1. Determinar qué componente usar (especial o genérico)
        let ComponentToRender = this.componentMap[activityName];
        
        // Si NO está mapeado (ej: Ballet o cualquier actividad futura), usar el genérico.
        if (!ComponentToRender) {
            ComponentToRender = GenericActivityCard;
        }

        // 2. Si se usa la plantilla genérica, devolver la configuración con props.
        if (ComponentToRender === GenericActivityCard) {
            return {
                component: ComponentToRender,
                props: {
                    // activityId debe coincidir con el ID de la fila en tu tabla de detalles ('Idioma')
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
      // Opcional: Colapsar el menú al seleccionar una opción
      // this.isExpanded = false; 
    },
    toggleSidebar() {
        this.isExpanded = !this.isExpanded;
    },
    
    async fetchActivitiesFromBSDS() {
      try {
        const ENDPOINT = '/routes/actividades'; // Asumo que esta es la ruta para obtener tu lista de Actividades

        const response = await fetch(this.API_BASE_URL + ENDPOINT); 

        if (!response.ok) {
          throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        
        const dbActivities = await response.json(); 
        this.activities = dbActivities;

        if (this.activities.length > 0) {
          // Si el ID activo no es válido, selecciona la primera pestaña.
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
    /* Asegura que el borde no se aplique al título si no tiene el mismo fondo */
}

.title {
    background-color: #efedd6;
    margin: 0; 
    padding: 0.5rem 0.8rem;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-texto);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d0c8b3; /* Separador */
}

.expand-icon {
    font-size: 1.2rem;
    color: #c00606;
    transition: transform 0.3s;
}

/* --------------------
   4. Estilos del Menú Lateral (.sidebar) - EFECTO EXPANDIBLE
   -------------------- */
.sidebar {
    /* Estado Plegado */
    width: 60px; /* Ancho solo para el ícono y padding */
    overflow: hidden; 
    transition: width 0.3s ease-out; /* Animación de expansión */
    
    background-color: var(--fondo-menu); 
    padding: 0.5rem 0; 
    
    height: auto; 
}

/* Estado Desplegado */
.sidebar.is-expanded {
    width: 200px; /* Ancho para mostrar el texto (Ajusta este valor si es necesario) */
}

.sidebar__list { list-style: none; margin: 0; padding: 0; }

/* Ocultar el texto en el estado plegado */
.sidebar:not(.is-expanded) .sidebar__item a .name-text {
    display: none;
}

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
    padding: 0 0.5rem; /* Ajuste el padding para la transición */
    text-transform: capitalize; 
    font-weight: 500; 
}

.sidebar__item.is-active { background-color: var(--fondo-activo); font-weight: 700; }

/* BARRA LATERAL ROJA del activo */
.sidebar__item.is-active a {
    border-left: 5px solid var(--color-primario); 
    padding-left: calc(0.5rem - 5px); 
    color: var(--color-texto);
}

.icon {
    font-size: 1.5rem;
    color: #c00606; 
    margin-right: 0.6rem; 
    flex-shrink: 0; /* Evita que el ícono se encoja */
}

/* --------------------
   6. Contenedor del Contenido
   -------------------- */
.content {
    flex-grow: 1; 
    padding: var(--padding-base); 
    background-color: #fff; 
    min-width: 0; /* Importante para el layout flexible */
}
</style>