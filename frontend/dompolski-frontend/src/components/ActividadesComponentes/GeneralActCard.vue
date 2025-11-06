<template>
  <div class="generic-activity-container">
    <h2 class="activity-name-title">{{ activityName }}</h2>
    
    <div v-if="isLoading" class="loading-state">Cargando detalles de {{ activityName }}...</div>
    <div v-else-if="error" class="error-state">Error al cargar los detalles de la actividad: {{ error }}.</div>
    
    <div v-else class="activity-content-wrapper">
      
      <div v-if="mediaSlides.length > 0" class="main-carousel-wrapper">
        <div class="main-carousel">
          <div 
            v-for="(slide, index) in mediaSlides" 
            :key="index" 
            class="slide"
            :class="{ 'active': index === currentSlideIndex }"
          >
            <img v-if="slide.tipo === 'image'" :src="slide.src" :alt="'Foto de ' + activityName" />
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
      <div v-else class="no-media-placeholder-main">No hay galería disponible para esta actividad.</div>

      <hr class="separator">
      
      <div class="details-card">
          <h3 class="card-section-title">Información de Clases</h3>
          
          <p class="description-area">{{ activityDescription }}</p>

          <div class="info-grid">
              <div class="info-group">
                  <h4 class="info-title">⏰ Horarios:</h4>
                  <p>{{ activityDetails.schedule || 'Consultar en contacto' }}</p>
              </div>
              <div class="info-group">
                  <h4 class="info-title">📚 Niveles:</h4>
                  <p>{{ activityDetails.levels || 'General' }}</p>
              </div>
              <div class="info-group">
                  <h4 class="info-title">👦 Edades:</h4>
                  <p>{{ activityDetails.ageGroup || 'Todas las edades' }}</p>
              </div>
              <div class="info-group">
                  <h4 class="info-title">👤 Contacto:</h4>
                  <p class="contact-email">{{ activityDetails.contactInfo || 'N/A' }}</p>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GeneralActCard',
  props: {
    activityId: { type: [String, Number], required: true },
    activityName: { type: String, required: true }, // Esto debe coincidir con lo que recibe del padre
    activityDescription: { type: String, default: 'No hay descripción disponible para esta actividad.' }
  },
  data() {
    return {
      isLoading: true,
      error: null,
      API_BASE_URL: 'http://localhost:3000',
      activityDetails: {},
      mediaSlides: [],
      currentSlideIndex: 0,
    };
  },
  computed: {
    totalSlides() { return this.mediaSlides.length; }
  },
  methods: {
    // === LÓGICA DEL CARRUSEL ===
    nextSlide() {
      if (this.totalSlides <= 1) return;
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.totalSlides;
    },
    prevSlide() {
      if (this.totalSlides <= 1) return;
      this.currentSlideIndex = (this.currentSlideIndex - 1 + this.totalSlides) % this.totalSlides;
    },

    // === CARGA DE DATOS ===
    async fetchActivityData() {
      this.isLoading = true;
      this.error = null;
      
      const DETAIL_ROW_ID = this.activityId;
      
      try {
        // ENDPOINT 1: Carga los detalles estructurados (Horarios, Niveles, Contacto)
        // CORRECCIÓN: Usa '/actividades/detalles/'
        const DETAILS_URL = `${this.API_BASE_URL}/actividades/detalles/${DETAIL_ROW_ID}`; 
        
        // ENDPOINT 2: Carga la Multimedia (Carrusel)
        // CORRECCIÓN: Usa '/multimedia/Actividad/'
        const MEDIA_URL = `${this.API_BASE_URL}/multimedia/Actividad/${this.activityId}`; 
        
        // Usamos axios para manejar la respuesta JSON
        const [detailsResponse, mediaResponse] = await Promise.all([
          axios.get(DETAILS_URL),
          axios.get(MEDIA_URL)
        ]);

        this.activityDetails = detailsResponse.data;
        this.mediaSlides = mediaResponse.data;
        this.currentSlideIndex = 0;
        
      } catch (err) {
        console.error(`Error al cargar datos para ${this.activityName}:`, err);
        this.error = 'No se pudo cargar la información detallada de la actividad.';
      } finally {
        this.isLoading = false;
      }
    }
  },
  watch: {
    activityId: { immediate: true, handler: 'fetchActivityData' }
  }
};
</script>

<style scoped>
/* (Estilos CSS omitidos por brevedad, se mantiene el estilo original) */
/* Estilos del Carrusel */
.main-carousel-wrapper { position: relative; max-width: 900px; height: 400px; margin: 0 auto; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 10px rgba(0)}
.main-carousel { position: relative; width: 100%; height: 100%; }
.slide { position: absolute; width: 100%; height: 100%; opacity: 0; transition: opacity 0.5s ease-in-out; }
.slide.active { opacity: 1; z-index: 1; }
.slide img, .slide video { width: 100%; height: 100%; object-fit: cover; }
.no-media-placeholder-main { text-align: center; padding: 2rem; color: #999; border: 1px dashed #ccc; border-radius: 8px; max-width: 900px; margin: 0 auto; }
.prev-button, .next-button { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0, 0, 0, 0.6); color: white; border: none; padding: 10p}
.prev-button { left: 10px; }
.next-button { right: 10px; }

/* Estilos de la Tarjeta de Detalles */
.generic-activity-container { padding: 2rem; };
.activity-name-title { text-align: center; font-size: 2.5em; color: #333; margin-bottom: 20px; }
.separator { border: 0; height: 1px; background-color: #eee; margin: 2rem 0; }
.description-area { font-size: 1.1em; line-height: 1.6; color: #555; margin: 1rem 0 2rem; padding: 0 1rem; text-align: center; }
.details-card { padding: 30px; margin: 0 auto; max-width: 900px; border: 1px solid #d0c8b3; border-radius: 10px; background-color: #fff; box-shadow: 0 4px 8px }
.card-section-title { text-align: center; color: #d90022; margin-bottom: 25px; font-size: 1.5em; border-bottom: 2px solid #eee; padding-bottom: 10px; }
.info-grid { display: flex; flex-wrap: wrap; gap: 20px; justify-content: space-between; }
.info-group { flex-basis: 48%; }
.info-title { font-size: 1.1em; color: #444; margin-bottom: 5px; font-weight: 600; }
.info-group p { margin: 0; color: #555; }
.contact-email { font-weight: bold; color: #007bff; }
</style>