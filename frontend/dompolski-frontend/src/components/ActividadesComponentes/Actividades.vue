<template>
  <section class="section">
    <div class="sidebar-wrapper">
    <h2 class="title">Secciones</h2>
    
    <div class="sidebar"> 
      
      <ul class="sidebar__list"> 
        
        <li class="sidebar__item" :class="{ 'is-active': activeTab === 'idioma' }">
          <a href="#idioma" @click.prevent="activeTab = 'idioma'">
            <span class="material-symbols-outlined icon">language</span>
            <span>Idioma</span>
          </a>
        </li>

        <li class="sidebar__item" :class="{ 'is-active': activeTab === 'ballet' }">
          <a href="#ballet" @click.prevent="activeTab = 'ballet'">
            <span class="material-symbols-outlined icon">theater_comedy</span>
            <span>Ballet</span>
          </a>
        </li>
        
        <li class="sidebar__item" :class="{ 'is-active': activeTab === 'cocina' }">
          <a href="#cocina" @click.prevent="activeTab = 'cocina'">
            <span class="material-symbols-outlined icon">dinner_dining</span>
            <span>Cocina</span>
          </a>
        </li>

      </ul>
    </div>
    </div>
    <div class="content">
      <Idioma v-if="activeTab === 'idioma'" id="idioma" />
      <Ballet v-if="activeTab === 'ballet'" id="ballet" />
      <Cocina v-if="activeTab === 'cocina'" id="cocina" />
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
      activeTab: 'idioma' // Pestaña activa por defecto
    };
  }
}
</script>
<style scoped>
/*  Contenedor vertical para el título y el menú */
.sidebar-wrapper {
    /* CLAVE: Esto asegura que este contenedor solo ocupe el ancho del menú */
    display: flex;
    flex-direction: column; 
    
    /* Elimina el margen superior que empuja el título */
    padding-top: 0; 
    
    /* Separación a la derecha del contenido */
    margin-right: var(--espacio-separacion); 
}
/* --------------------
    Variables de Diseño y Colores
   -------------------- */
:root {
    --color-primario: #d90022; /* Rojo para la barra activa e íconos */
    --color-texto: #333;
    --item-height: 3.5rem; 
    --borde-radio: 0.5rem;
    --padding-contenido: 2rem; /* Relleno para separación general */
    --espacio-separacion: 3rem; /* Espacio horizontal entre menú y contenido */
}

/* --------------------
    Maquetación Principal y Fuente
   -------------------- */
.section {

    font-family: 'Ubuntu', sans-serif; 
    display:flex;
    position: relative;
    align-items: flex-start; /* Alinea los elementos al inicio (arriba) */
    /* Asegura que la sección de actividades tenga una altura mínima */
    min-height: auto; 
    padding: 0 var(--padding-contenido); /* Padding horizontal, 0 vertical */

}
.title {
    margin:0;
    padding: var(--padding-contenido)0.5rem; 
    text-transform: uppercase;
    font-size: 1.8rem;
}

/* --------------------
   Estilos del Menú Lateral (.sidebar)
   -------------------- */
   .sidebar {
    /* CLAVE: Cambiamos de width fijo a min-content, que usa el ancho mínimo necesario
              para mostrar todo el contenido. */
    width: min-content; 
    min-width: 150px; /* Ancho mínimo para que se vea bien, ajusta si es necesario */ 
    padding: var(--padding-contenido) 0; 
    padding: 0.5rem 0;
    margin-right: var(--espacio-separacion); 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); 
    border-radius: var(--borde-radio);
    background-color: #fff;
    height: auto;
}

.sidebar__list {
    list-style: none;
    margin: 0;
    padding: 0;
}

/* --------------------
    Estilos de los Ítems (<li> y <a>)
   -------------------- */
.sidebar__item {
    height: var(--item-height);
    margin: 0.25rem 0;
    transition: background-color 0.2s;
}

.sidebar__item a {
    display: flex;
    align-items: center; /* Centrado vertical */
    height: 100%;
    text-decoration: none;
    color: var(--color-texto);
    font-size: 1.1rem;
    padding: 0 0.8rem;
    text-transform: capitalize; /* SOLO la primera letra en mayúscula */
    font-weight: 500; 
}

/* --------------------
    Estilos de Íconos (Ícono a la izquierda)
   -------------------- */
.icon {
    font-size: 1.5rem;
    color: #a0a0a0; 
    order: -1; /* Mueve el ícono a la izquierda */
    margin-right: 0.6rem; 
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* --------------------
    Estilo del Estado ACTIVO (Barra Roja)
   -------------------- */
.sidebar__item.is-active {
    background-color: #fcebeb; /* Fondo rosado/rojo muy ligero */
    font-weight: 700; 
}

/* BARRA LATERAL ROJA */
.sidebar__item.is-active a {
    border-left: 5px solid var(--color-primario); 
    padding-left: calc(0.8rem - 5px); 
    color: var(--color-texto);
}

/* Colorea el ícono del ítem activo de rojo */
.sidebar__item.is-active .icon {
    color: var(--color-primario); 
    font-variation-settings: 'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 24;
}

/* --------------------
    Contenedor del Contenido
   -------------------- */
.content {
    flex-grow: 1; 
    padding: var(--padding-contenido); 
    background-color: #fff; 
    border-radius: var(--borde-radio);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); 
height: auto;
}

/* Efectos de Interacción (Hover) */
.sidebar__item:hover {
    background-color: #f0f0f0; 
    cursor: pointer;
}
</style>