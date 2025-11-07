<template>
  <div class="generic-activity-container">
    <h2 class="activity-name-title">{{ activityName }}</h2>
    
    <div v-if="mediaSlides.length > 0" class="main-carousel-wrapper">
      <div class="main-carousel">
        <div 
          v-for="(slide, index) in mediaSlides" 
          :key="index" 
          class="slide"
          :class="{ 'active': index === currentSlideIndex }"
        >
          <img v-if="slide.tipo === 'imagen'" :src="slide.url" :alt="'Foto de ' + activityName" />
          <video v-else-if="slide.tipo === 'video'" controls muted autoplay loop :src="slide.url">
            Tu navegador no soporta el tag de video.
          </video>
        </div>
      </div>
      
      <template v-if="mediaSlides.length > 1">
        <button class="prev-button" @click="prevSlide">◀</button>
        <button class="next-button" @click="nextSlide">▶</button>
      </template>

      </div>
    <div v-else class="no-media-placeholder-main">
      {{ isLoading ? 'Cargando...' : 'No hay galería disponible.' }}
    </div>

    <hr class="separator">
    
    <div class="details-card">
      <h3 class="card-section-title">Información de Cursos</h3>
      
      <p class="description-area">{{ activityDescription }}</p>

      <div v-if="isLoading" class="loading-state">Cargando detalles...</div>
      <div v-else-if="error" class="error-state">{{ error }}</div>

      <div v-else-if="cursos.length > 0" class="cursos-grid">
        
        <div v-for="curso in cursos" :key="curso.id" class="curso-item">
          
          <h4 class="curso-nombre">{{ curso.nombre_curso }}</h4>
          
          <div class="info-grid">
            <div class="info-group">
              <h4 class="info-title">⏰ Horarios:</h4>
              <p>{{ curso.horarios || 'Consultar' }}</p>
            </div>
            <div class="info-group">
              <h4 class="info-title">📚 Niveles:</h4>
              <p>{{ curso.niveles || 'General' }}</p>
            </div>
            <div class="info-group">
              <h4 class="info-title">👦 Edades:</h4>
              <p>{{ curso.edades || 'Todas' }}</p>
            </div>
            <div class="info-group">
              <h4 class="info-title">👤 Contacto:</h4>
              <p class="contact-email">{{ curso.contacto || 'N/A' }}</p>
            </div>
          </div>
        </div>

      </div>
      
      <div v-else class="empty-state">
        <p>Próximamente... Aún no hay cursos o detalles cargados para esta actividad.</p>
      </div>
    </div>
  </div>
</template>
<script>
// ¡YA NO IMPORTAMOS 'axios'!
// Solo importamos nuestro cliente centralizado.
import apiClient from '@/services/api'; 

export default {
  name: 'GeneralActCard',
  props: {
    activityId: { type: [String, Number], required: true },
    activityName: { type: String, required: true },
    activityDescription: { type: String, default: 'No hay descripción disponible.' },
    // Esta prop la recibe del padre (Actividades.vue)
    fotoUrl: { type: String, default: null } 
  },
  data() {
    return {
      isLoading: true,
      error: null,
      
      cursos: [], // Para la información (horarios, niveles...)
      
      mediaSlides: [], // Para el carrusel
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

    // === CARGA DE DATOS (EL MOTOR LIMPIO) ===
    async fetchActivityData() {
      this.isLoading = true;
      this.error = null;
      
      try {
        // 1. ENDPOINT DE LOS CURSOS (el que hicimos nosotros)
        const cursosPromise = apiClient.get(`/actividades/${this.activityId}/cursos`);
        
        // 2. ENDPOINT DEL CARRUSEL (el que usa Cocina)
        // (Este endpoint '/multimedia' debe estar definido en tu app.js)
        const mediaPromise = apiClient.get(`/multimedia/Actividad/${this.activityId}`);
        
        // 3. Ejecutamos ambas llamadas en paralelo
        const [cursosResponse, mediaResponse] = await Promise.all([
          cursosPromise,
          mediaPromise
        ]);

        // 4. LÓGICA DE CURSOS (la que ya funcionaba)
        // (Muestra todos los cursos, no solo el primero)
        this.cursos = cursosResponse.data;

        // 5. LÓGICA DE CARRUSEL (¡RESUCITADA!)
        // (Copiada de 'Cocina.vue')
        this.mediaSlides = mediaResponse.data;
        this.currentSlideIndex = 0;
        
      } catch (err) {
        console.error(`Error al cargar datos para ${this.activityName}:`, err.message);
        // Si una de las dos llamadas falla (ej. /multimedia no existe), 
        // el Promise.all completo fallará.
        this.error = `No se pudo cargar la información detallada de la actividad.`;
      } finally {
        this.isLoading = false;
      }
    }
  },
  watch: {
    // Esto está perfecto, recarga los datos si el ID cambia.
    activityId: { immediate: true, handler: 'fetchActivityData' }
  }
};
</script>


<style scoped>
/* Estilos del Carrusel */
.main-carousel-wrapper { position: relative; max-width: 900px;  height: 400px; margin: 0 auto; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);}
.main-carousel { position: relative; width: 100%; height: 100%; }
.slide { position: absolute; width: 100%; height: 100%; opacity: 0; transition: opacity 0.5s ease-in-out;}
.slide.active { opacity: 1; z-index: 1; }
.slide img, .slide video { width: 100%; height: 100%; object-fit: cover; }
.prev-button, .next-button { position: absolute; top: 50%; transform: translateY(-50%);background: rgba(0, 0, 0, 0.6); color: white; border: none;padding: 10px; cursor: pointer; z-index: 10; border-radius:4px; }
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

.cursos-grid {
  display: flex;
  flex-direction: column;
  gap: 2.5rem; /* Espacio entre cada sub-curso */
}

.curso-item {
  border: 1px solid #eee;
  padding: 1.5rem;
  border-radius: 8px;
  background: #fdfdfd;
}

.curso-nombre {
  font-size: 1.5rem;
  color: #c00606; /* Color de acento */
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.empty-state, .loading-state {
  text-align: center;
  font-style: italic;
  color: #666;
  padding: 2rem;
}
</style>