<template>
  <section class="section">
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
/* --------------------
   1. Variables de Diseño y Colores
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
   2. Maquetación Principal y Fuente
   -------------------- */
.section {
 background-color: #efedd6;
    font-family: 'Ubuntu', sans-serif; 
    display:block;
    position: relative;
    align-items: flex-start; /* Alinea los elementos al inicio (arriba) */
    /* Asegura que la sección de actividades tenga una altura mínima */
    min-height: auto; 
    padding: 0 var(--padding-contenido); /* Padding horizontal, 0 vertical */
    padding-left: var(--padding-contenido);

}
.title {
    margin-bottom: 1.5rem; 
    padding-left: var(--padding-contenido); 
    text-transform: uppercase;
}
/* Contenedor que alinea el menú y el contenido */
.page-container {
    display: flex; 
    align-items: flex-start; /* Mantenemos flex-start para alinear arriba si el contenido fuera más alto */
    width: 100%;
}

/* --------------------
   3. Estilos del Menú Lateral (.sidebar)
   -------------------- */
.sidebar {
    width: 200px; 
    background-color: #efedd6; 
    padding: var(--padding-contenido) 0; /* Padding vertical, 0 horizontal */
    margin-right: var(--espacio-separacion); /* Espacio de separación del contenido */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); 
    border-radius: var(--borde-radio);
    height: auto;
}

.sidebar__list {
    list-style: none;
    margin: 0;
    padding: 0;
}

/* --------------------
   4. Estilos de los Ítems (<li> y <a>)
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
    padding: 0 1rem;
    text-transform: capitalize; /* SOLO la primera letra en mayúscula */
    font-weight: 500; 
}

/* --------------------
   5. Estilos de Íconos (Ícono a la izquierda)
   -------------------- */
.icon {
    font-size: 1.5rem;
    color: #a0a0a0; 
    order: -1; /* Mueve el ícono a la izquierda */
    margin-right: 0.75rem; 
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* --------------------
   6. Estilo del Estado ACTIVO (Barra Roja)
   -------------------- */
.sidebar__item.is-active {
    background-color: #fcebeb; /* Fondo rosado/rojo muy ligero */
    font-weight: 700; 
}

/* BARRA LATERAL ROJA */
.sidebar__item.is-active a {
    border-left: 5px solid var(--color-primario); 
    padding-left: calc(1rem - 5px); 
    color: var(--color-texto);
}

/* Colorea el ícono del ítem activo de rojo */
.sidebar__item.is-active .icon {
    color: var(--color-primario); 
    font-variation-settings: 'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 24;
}

/* --------------------
   7. Contenedor del Contenido
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