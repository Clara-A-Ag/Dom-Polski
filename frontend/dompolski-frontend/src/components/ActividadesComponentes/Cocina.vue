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
          <img 
            v-if="slide.tipo === 'image'" 
            :src="slide.src" 
            :alt="'Foto de cocina'" 
          />
          <video 
            v-else-if="slide.tipo === 'video'" 
            controls 
            muted 
            autoplay 
            loop
            :src="slide.src"
          >
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

    <h3 class="subsection-title">Platillos Destacados</h3>

    <div v-if="isLoading" class="loading-message">
      Cargando recetas...
    </div>
    <div v-else-if="error" class="error-message">
      Error al cargar las recetas: {{ error }}.
    </div>

    <div v-else class="recipes-grid">
      <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
        <div class="recipe-image-placeholder">
          <img v-if="recipe.imagenUrl" :src="recipe.imagenUrl" :alt="'Imagen de ' + recipe.titulo">
          <span v-else>📸 

[Image of Recipe]
</span>
        </div>
        <h4 class="recipe-title-card">{{ recipe.titulo }}</h4>
        <p class="recipe-description">{{ recipe.descripcion }}</p>
        <p class="recipe-ingredients">**Ingredientes:** {{ recipe.ingredientes }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CocinaVue',
  data() {
    return {
      // Data para el carrusel principal
      currentSlideIndex: 0,
      mediaSlides: [], 
      // Data para la lista de recetas
      recipes: [],
      isLoading: true,
      error: null,
      API_BASE_URL: 'http://localhost:3000', // *** AJUSTA ESTA URL BASE ***
      // ID de la Actividad Cocina (DEBE OBTENERSE DE TU TABLA ACTIVIDAD)
      // Asumiremos 'cocinaId' para el ejemplo. Revisa tu BD.
      COCINA_ACTIVIDAD_ID: 3, 
    };
  },
  computed: {
    totalSlides() {
      return this.mediaSlides.length;
    }
  },
  methods: {
    // 1. Cargar Multimedia para el Carrusel General de Cocina
    async fetchMainMultimedia() {
      try {
        // Obtenemos la multimedia asociada a la actividad 'Cocina'
       
        const MULTIMEDIA_URL = 
          `${this.API_BASE_URL}/multimedia/Actividad/${this.COCINA_ACTIVIDAD_ID}`;
        
        const response = await axios.get(MULTIMEDIA_URL);
        this.mediaSlides = response.data;
        
      } catch (err) {
        console.error("Error al obtener la multimedia principal de Cocina:", err);
        // Si falla, el carrusel queda vacío.
      }
    },
    
    // 2. Cargar Recetas para la Lista de Abajo
    async fetchRecipes() {
      try {
        const RECETAS_URL = `${this.API_BASE_URL}/recetas`; 
        const response = await axios.get(RECETAS_URL);
        this.recipes = response.data;
      } catch (err) {
        throw new Error(err.message || 'Error de conexión con el servidor de recetas.');
      }
    },

    // 3. Lógica de Navegación del Carrusel Principal
    nextSlide() {
      if (this.totalSlides <= 1) return;
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.totalSlides;
    },
    prevSlide() {
      if (this.totalSlides <= 1) return;
      this.currentSlideIndex = (this.currentSlideIndex - 1 + this.totalSlides) % this.totalSlides;
    },

    // 4. Función de Carga Principal
    async loadContent() {
      this.isLoading = true;
      this.error = null;
      try {
        await Promise.all([
          this.fetchMainMultimedia(),
          this.fetchRecipes() 
        ]);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.loadContent();
  }
};
</script>

<style scoped>
/* Estilos Generales */
.cocina-container { padding: 2rem; }
.section-title { text-align: center; color: #333; margin-bottom: 2rem; }
.subsection-title { margin-top: 2rem; margin-bottom: 1.5rem; color: #333; }
.separator { border: 0; height: 1px; background-color: #eee; margin: 3rem 0; }

/* Estilos del Carrusel Principal (Igual que Ballet) */
.main-carousel-wrapper {
    position: relative;
    max-width: 900px; /* Ancho para el carrusel principal */
    height: 400px; 
    margin: 0 auto;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.main-carousel { position: relative; width: 100%; height: 100%; }
.slide {
    position: absolute; width: 100%; height: 100%;
    opacity: 0; transition: opacity 0.5s ease-in-out;
}
.slide.active { opacity: 1; z-index: 1; }
.slide img, .slide video { width: 100%; height: 100%; object-fit: cover; }
.no-media-placeholder-main { text-align: center; padding: 2rem; color: #999; }

/* Botones del Carrusel Principal */
.prev-button, .next-button {
    position: absolute; top: 50%; transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.6); color: white; border: none;
    padding: 10px; cursor: pointer; z-index: 10; border-radius: 4px;
}
.prev-button { left: 10px; }
.next-button { right: 10px; }

/* Estilos de la Lista de Recetas */
.recipes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}
.recipe-card {
    background: #fff;
    border: 1px solid #d0c8b3;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.recipe-image-placeholder {
    height: 150px;
    background-color: #ffc107; /* Color de la plantilla que mostraste */
    border-radius: 4px;
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.recipe-image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.recipe-image-placeholder span { color: #555; font-weight: bold; }
.recipe-title-card { color: #d90022; font-size: 1.2rem; margin: 0.5rem 0; }
.recipe-description { font-size: 0.95rem; color: #555; }
.recipe-ingredients { font-size: 0.9rem; margin-top: 0.5rem; color: #777; }
</style>