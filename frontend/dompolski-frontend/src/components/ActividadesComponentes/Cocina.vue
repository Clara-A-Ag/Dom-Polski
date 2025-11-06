<template>
  <div class="cocina-container">
    <h2 class="section-title">Nuestras Recetas Polacas 🥟</h2>

    <div v-if="mediaSlides.length > 0" class="main-carousel-wrapper">
      <div class="main-carousel" ref="mainCarouselContainer">
        <div 
          v-for="(slide, index) in mediaSlides" 
          :key="index" 
          class="slide"
          :class="{ 'active': index === currentSlideIndex }"
        >
          <img v-if="slide.tipo === 'image'" :src="slide.src" alt="Foto de cocina" />
          <video v-else-if="slide.tipo === 'video'" controls muted autoplay loop :src="slide.src">
            Tu navegador no soporta el tag de video.
          </video>
        </div>
      </div>
      
      <template v-if="mediaSlides.length > 1">
        <button class="prev-button" @click="prevSlide">◀</button>
        <button class="next-button" @click="nextSlide">▶</button>
      </template>
    </div>
    <div v-else-if="!isLoading" class="no-media-placeholder-main">
      Cargando carrusel...
    </div>

    <hr class="separator">

    <h3 class="subsection-title">Platillos Destacados (Haz click en la tarjeta para ver)</h3>

    <div v-if="isLoading" class="loading-message">
      Cargando recetas...
    </div>
    <div v-else-if="error" class="error-message">
      Error al cargar las recetas: {{ error }}.
    </div>

    <div v-else class="recipes-grid-modal"> 
      <div 
        v-for="recipe in mappedRecipes" 
        :key="recipe.id"
        :class="['card-receta', { 'expandida': activeRecipe && activeRecipe.id === recipe.id }]"
        @click="expandir(recipe)"
      >
        <div class="frente">
          <img :src="recipe.imagenUrl" :alt="recipe.nombre" class="foto-receta">
          <h2 class="nombre-receta">{{ recipe.nombre }}</h2>
          <button class="boton-ver" @click.stop="expandir(recipe)">Ver más</button>
        </div>

        </div>
    </div>
  </div>

  <teleport to="body">
    <div v-if="activeRecipe" class="modal-overlay" @click="colapsar"></div>

    <div v-if="activeRecipe" :class="['card-receta', 'expandida']">
        <div class="detalle">
            <h1 class="titulo-expandido">{{ activeRecipe.nombre }}</h1>
            <button class="boton-cerrar" @click.stop="colapsar()">X</button>
            
            <h3>Ingredientes</h3>
            <ul>
                <li v-for="(ingrediente, index) in activeRecipe.ingredientes" :key="index">{{ ingrediente }}</li>
            </ul>

            <h3>Preparación</h3>
            <ol>
                <li v-for="(paso, index) in activeRecipe.preparacion" :key="index">{{ paso }}</li>
            </ol>
        </div>
    </div>
  </teleport>

</template>

<script setup>
defineOptions({ name: 'CocinaComponent' });

import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// --- PROPS Y DATOS BASE ---
const props = defineProps({
  activityId: { type: [String, Number], default: 3 } 
});

const API_BASE_URL = 'http://localhost:3000';

// Data del Carrusel
const currentSlideIndex = ref(0);
const mediaSlides = ref([]); 

// Data de Recetas
const recipes = ref([]);
const isLoading = ref(true);
const error = ref(null);

// 🌟 ESTADO CLAVE PARA EL MODAL 🌟
const activeRecipe = ref(null); // Contiene el objeto de la receta si está expandida

// --- MÉTODOS DE MANEJO DE ESTADO DEL MODAL ---

const expandir = (recipe) => {
    // Al hacer clic en una tarjeta, la establecemos como activa (modal abierto)
    activeRecipe.value = recipe;
};

const colapsar = () => {
    // Cierra el modal (desde el botón X o el overlay)
    activeRecipe.value = null;
};

// --- MÉTODOS DE PROCESAMIENTO DE DATOS ---

// Convierte la cadena de ingredientes (separada por comas) en un Array.
const parseIngredients = (ingredientsString) => {
    if (!ingredientsString || typeof ingredientsString !== 'string') return [];
    return ingredientsString.split(/,\s*/).filter(item => item.length > 0);
};

// Convierte la cadena de instrucciones/preparación en un Array.
const parsePreparation = (instructionsString) => {
    if (!instructionsString || typeof instructionsString !== 'string') return [];
    // Asume que cada paso está separado por un salto de línea (\n)
    return instructionsString.split('\n').map(p => p.trim()).filter(p => p.length > 0);
};

// COMPUTED: Mapea y prepara los datos del backend para el template
const mappedRecipes = computed(() => {
    return recipes.value.map(recipe => ({
        id: recipe.id,
        nombre: recipe.titulo,
        imagenUrl: recipe.imagenUrl || 'url_imagen_por_defecto.jpg', 
        ingredientes: parseIngredients(recipe.ingredientes), 
        preparacion: parsePreparation(recipe.instrucciones), 
    }));
});

// --- MÉTODOS DE CARGA DE DATOS (API) ---

const fetchMainMultimedia = async () => {
    try {
        const MULTIMEDIA_URL = `${API_BASE_URL}/multimedia/Actividad/${props.activityId}`;
        const response = await axios.get(MULTIMEDIA_URL);
        mediaSlides.value = response.data;
    } catch (err) {
        console.error("Error al obtener la multimedia principal de Cocina:", err);
    }
};

const fetchRecipes = async () => {
    try {
        const RECETAS_URL = `${API_BASE_URL}/recetas`; 
        const response = await axios.get(RECETAS_URL);
        recipes.value = response.data;
    } catch (err) {
        throw new Error(`Error de conexión con el servidor de recetas: ${err.message}`);
    }
};

const loadContent = async () => {
    isLoading.value = true;
    error.value = null;
    try {
        await Promise.all([
            fetchMainMultimedia(),
            fetchRecipes() 
        ]);
    } catch (err) {
        error.value = err.message;
    } finally {
        isLoading.value = false;
    }
};

// --- LÓGICA DE NAVEGACIÓN DEL CARRUSEL ---

const totalSlides = computed(() => mediaSlides.value.length);

const nextSlide = () => {
    if (totalSlides.value <= 1) return;
    currentSlideIndex.value = (currentSlideIndex.value + 1) % totalSlides.value;
};

const prevSlide = () => {
    if (totalSlides.value <= 1) return;
    currentSlideIndex.value = (currentSlideIndex.value - 1 + totalSlides.value) % totalSlides.value;
};

// --- CICLO DE VIDA ---
onMounted(() => {
    loadContent();
});
</script>

<style scoped>
/* Estilos Generales */
.cocina-container { padding: 2rem; }
.section-title { text-align: center; color: #333; margin-bottom: 2rem; }
.subsection-title { margin-top: 2rem; margin-bottom: 1.5rem; color: #333; }
.separator { border: 0; height: 1px; background-color: #eee; margin: 3rem 0; }
.loading-message, .error-message { text-align: center; padding: 1rem; color: #888; }
.error-message { color: #d90022; font-weight: bold; }

/* ---------------------------------------------------- */
/* 🌟 ESTILOS DEL MODAL Y TARJETA (Integrado) 🌟 */
/* ---------------------------------------------------- */

/* 1. Contenedor de la lista de tarjetas pequeñas */
.recipes-grid-modal {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px; 
    max-width: 1000px;
    margin: 0 auto;
    padding: 1rem 0;
}

/* 2. ESTADO INICIAL (Tarjeta Pequeña) */
.card-receta {
    width: 300px;
    height: 300px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden; 
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
    position: relative;
    z-index: 10; 
    margin: auto; 
}

.frente {
    text-align: center;
    padding: 5px;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    transition: opacity 0.3s;
}

.foto-receta {
    width: 100%;
    height: 70%;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
}

.boton-ver {
    /* Estilos del botón Ver Receta Completa */
    background-color: #d90022;
    color: white;
    border: none;
    padding: 4px;
    border-radius: 5px;
    cursor: pointer;
    width: 50%;
    height: 25px;
    margin: 0 auto;
    font-weight: bold;

    
}

/* 3. ESTADO EXPANDIDO (CLASE 'expandida') */

/* ⚠️ ATENCIÓN: Esta clase solo se aplica al modal que está fuera del DOM normal ⚠️
   Se aplica en: <div v-if="activeRecipe" :class="['card-receta', 'expandida']"> */
.card-receta.expandida {
  padding-top: 15px;
    width: 600px; 
    height: 600px; 
    max-width: 1000px; 
    max-height: 800px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    /* Fuerza que la tarjeta expandida quede fija y centrada sobre todo lo demás */
    position: fixed; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
}

.detalle {
    /* Contenido que se muestra en el modal */
    width: 100%;
    height: 100%;
    opacity: 1; 
    transform: scale(1);
    pointer-events: auto;
    background-color: white;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto; 
    transition: all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.boton-cerrar {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 1.5em;
    background: #eee;
    border: none;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    line-height: 1;
    cursor: pointer;
    z-index: 110;
}

/* 4. OVERLAY */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7); 
    z-index: 90; 
    transition: opacity 0.3s;
}

/* --- Estilos del Carrusel --- */
/* (Mantén tus estilos de carrusel aquí) */
.main-carousel-wrapper { position: relative; max-width: 900px;  height: 400px; margin: 0 auto; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);}

.main-carousel { position: relative; width: 100%; height: 100%; }
.slide { position: absolute; width: 100%; height: 100%; opacity: 0; transition: opacity 0.5s ease-in-out;}
.slide.active { opacity: 1; z-index: 1; }
.slide img, .slide video { width: 100%; height: 100%; object-fit: cover; }

.prev-button, .next-button {position: absolute; top: 50%; transform: translateY(-50%);background: rgba(0, 0, 0, 0.6); color: white; border: none;padding: 10px; cursor: pointer; z-index: 10; border-radius: 4px;}
.prev-button { left: 10px; }
.next-button { right: 10px; }
</style>