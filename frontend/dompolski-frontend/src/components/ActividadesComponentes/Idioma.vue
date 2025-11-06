<template>
  <section class="activity-section">
    <h2 class="activity-title">Clases de Idioma</h2>
    
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
            :alt="'Foto de clases de idioma'" 
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

    <h3 class="subsection-title">Oferta Educativa</h3>
    
    <div v-if="isLoading" class="loading-message">
      Cargando información de idiomas...
    </div>
    <div v-else-if="error" class="error-message">
      Error al cargar idiomas: {{ error }}.
    </div>

    <div v-else class="language-cards-list">
      <div v-for="lang in offeredLanguages" :key="lang.id" class="language-card-dynamic">
        <div class="language-box-dynamic">
          <h3>{{ lang.name || 'Idioma Desconocido' }}</h3>
        </div>
        <div class="language-details-dynamic">
          <p><strong>Horarios disponibles:</strong> {{ lang.schedule || 'Consultar' }}</p>
          <p><strong>Niveles:</strong> {{ lang.levels || 'Básico, Intermedio, Avanzado' }}</p>
          <p><strong>Edades:</strong> {{ lang.ageGroup || 'Todas las edades' }}</p>
          <p><strong>Contacto:</strong> {{ lang.contactInfo || 'info@dominio.com' }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'IdiomaComponent',
  data() {
    return {
      // Data para el carrusel principal
      currentSlideIndex: 0,
      mediaSlides: [], 
      autoScrollInterval: null,
      // Data para la lista de idiomas
      offeredLanguages: [],
      isLoading: true,
      error: null,
      API_BASE_URL: 'http://localhost:3000', 
      // ID de la Actividad Idioma (DEBE OBTENERSE DE TU TABLA ACTIVIDAD)
      // Asumiremos 'idiomaId' = 1 para el ejemplo.
      IDIOMA_ACTIVIDAD_ID: 1, 
    };
  },
  computed: {
    totalSlides() {
      return this.mediaSlides.length;
    }
  },
  methods: {
    // === LÓGICA DEL CARRUSEL ===
    startAutoScroll() {
      if (this.totalSlides <= 1) return;
      this.autoScrollInterval = setInterval(() => {
        this.nextSlide();
      }, 5000); // 5 segundos
    },
    stopAutoScroll() {
      clearInterval(this.autoScrollInterval);
    },
    nextSlide() {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.totalSlides;
    },
    prevSlide() {
      this.currentSlideIndex = (this.currentSlideIndex - 1 + this.totalSlides) % this.totalSlides;
    },
    
    // === CARGA DE DATOS ===
    // 1. Cargar Multimedia para el Carrusel General
    async fetchMainMultimedia() {
      try {
        const MULTIMEDIA_URL = 
          `${this.API_BASE_URL}/multimedia/Actividad/${this.IDIOMA_ACTIVIDAD_ID}`;
        const response = await axios.get(MULTIMEDIA_URL);
        this.mediaSlides = response.data;
      } catch (err) {
        console.error("Error al obtener la multimedia principal:", err);
      }
    },
    
    // 2. Cargar la Oferta de Idiomas
    async fetchOfferedLanguages() {
      try {
        // Asumiendo que montaste el router de idiomas en '/idiomas'
        const IDIOMAS_URL = `${this.API_BASE_URL}/idiomas`; 
        const response = await axios.get(IDIOMAS_URL);
        this.offeredLanguages = response.data;
      } catch (err) {
        throw new Error(err.message || 'Error al conectar con el servidor de idiomas.');
      }
    },

    // 3. Función de Carga Principal
    async loadContent() {
      this.isLoading = true;
      this.error = null;
      try {
        await Promise.all([
          this.fetchMainMultimedia(),
          this.fetchOfferedLanguages() 
        ]);
        this.startAutoScroll(); // Inicia el carrusel automático
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.loadContent();
  },
  beforeUnmount() {
    this.stopAutoScroll(); // Limpia el intervalo al salir del componente
  },
  // Reestablece el auto-scroll si las slides cambian (aunque no debería pasar aquí)
  watch: {
    mediaSlides: 'startAutoScroll' 
  }
};
</script>

<style scoped>
/* Estilos del carrusel */
.main-carousel-wrapper {
    position: relative;
    max-width: 900px;
    height: 400px; 
    margin: 0 auto 2rem; /* Margen inferior para separarlo de la lista */
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
.prev-button, .next-button {
    position: absolute; top: 50%; transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.6); color: white; border: none;
    padding: 10px; cursor: pointer; z-index: 10; border-radius: 4px;
}
.prev-button { left: 10px; }
.next-button { right: 10px; }


/* Estilos de la Sección de Idiomas */
.activity-section {
    margin-bottom: 40px;
}
.activity-title {
    text-align: center;
    font-size: 2.5em;
    color: #333;
    margin-bottom: 20px;
}
.subsection-title {
    text-align: center;
    font-size: 2em;
    color: #555;
    margin-bottom: 30px;
}
.separator {
    border: 0;
    height: 1px;
    background-color: #eee;
    margin: 2rem 0;
}

/* 2. Estilos de la Lista de Idiomas (Apiladas verticalmente) */
.language-cards-list {
    display: flex;
    flex-direction: column; /* Apila las tarjetas verticalmente */
    align-items: center; /* Centra las tarjetas */
    gap: 30px;
}

.language-card-dynamic {
    display: flex;
    align-items: flex-start;
    gap: 30px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    max-width: 800px; /* Ancho máximo para la tarjeta */
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.language-box-dynamic {
    background-color: #f1c40f; /* Color amarillo */
    min-width: 150px;
    height: 150px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 1.4em;
    color: white;
    flex-shrink: 0;
}

.language-details-dynamic p {
    margin: 0 0 10px 0;
    color: #555;
    line-height: 1.4;
}
.language-details-dynamic strong {
    color: #333;
}
</style>