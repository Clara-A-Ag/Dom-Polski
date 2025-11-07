<template>
  <div class="idioma-curso-container">
    <h2 class="section-title">Nuestros Cursos de Idioma 🌐</h2>

    <div v-if="mediaSlides.length > 0" class="main-carousel-wrapper">
      <div class="main-carousel">
        <div 
          v-for="(slide, index) in mediaSlides" 
          :key="index" 
          class="slide"
          :class="{ 'active': index === currentSlideIndex }"
        >
          <img v-if="slide.tipo === 'imagen'" :src="slide.url" alt="Foto de clase de idioma" />
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
    <div v-else-if="isLoading" class="no-media-placeholder-main">
      Cargando carrusel...
    </div>

    <hr class="separator">

    <h3 class="subsection-title">Cursos Disponibles</h3>

    <div v-if="isLoading" class="loading-message">
      Cargando detalles de cursos...
    </div>
    <div v-else-if="error" class="error-message">
      Error al cargar cursos: {{ error }}
    </div>

    <div v-else class="courses-list">
        <div v-for="course in courses" :key="course.id" class="course-card">
            <h4 class="course-title">{{ course.nombre }}</h4>
            <div class="course-details-grid">
                <div class="detail-item">
                    <span class="detail-icon">📅</span>
                    <p><strong>Horarios:</strong> {{ course.horarios || 'N/A' }}</p>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">🎓</span>
                    <p><strong>Niveles:</strong> {{ course.niveles || 'N/A' }}</p>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">👶</span>
                    <p><strong>Edades:</strong> {{ course.edades || 'N/A' }}</p>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">📧</span>
                    <p><strong>Contacto:</strong> <a :href="'mailto:' + course.contacto">{{ course.contacto || 'N/A' }}</a></p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

defineOptions({ name: 'IdiomaComponent' });

// ID CLAVE: Usaremos el ID de Idioma principal (1) para buscar multimedia general
const ACTIVITY_ID_PRINCIPAL = 1; 
const API_BASE_URL = 'http://localhost:3000'; 

// --- Estados del Componente ---
const currentSlideIndex = ref(0);
const mediaSlides = ref([]); 
const courses = ref([]); // Almacena los detalles de los cursos (Idioma-Inglés, Idioma-Polaco)
const isLoading = ref(true);
const error = ref(null);

const totalSlides = computed(() => mediaSlides.value.length);

// --- Métodos de Carga de Datos ---

// 1. Carga la Multimedia (Mismo endpoint que Cocina)
const fetchMainMultimedia = async () => {
    try {
        const MULTIMEDIA_URL = `${API_BASE_URL}/multimedia/Actividad/${ACTIVITY_ID_PRINCIPAL}`;
        const response = await axios.get(MULTIMEDIA_URL);
        mediaSlides.value = response.data;
    } catch (err) {
        console.error("Error al obtener la multimedia principal de Idioma:", err);
    }
};

// 2. Carga los detalles de los sub-cursos (Horarios, Niveles)
const fetchCourseDetails = async () => {
    try {
        // Usaremos un endpoint nuevo para obtener detalles por ID de Actividad (no de detalleACT)
        // Necesitamos un router que obtenga los detalles de detalleACT
        const DETAILS_URL = `${API_BASE_URL}/cursos/idioma`; 
        
        // Dado que Idioma tiene dos cursos (ID 1 y 2), necesitamos un endpoint que traiga ambos.
        // Por ahora, asumiremos que un nuevo router '/cursos/idioma' nos devuelve un array de los detalles.
        const response = await axios.get(DETAILS_URL);
        
        // Filtrar solo los que realmente son de idioma, si el backend devuelve más:
        // courses.value = response.data.filter(c => IDIOMA_SUB_IDS.includes(c.actividadId));
        courses.value = response.data; // Asumimos que el backend solo trae lo de idioma.
        
    } catch (err) {
        throw new Error(`Error de conexión al cargar cursos: ${err.message}`);
    }
};

// Lógica de Navegación del Carrusel
const nextSlide = () => {
    if (totalSlides.value <= 1) return;
    currentSlideIndex.value = (currentSlideIndex.value + 1) % totalSlides.value;
};

const prevSlide = () => {
    if (totalSlides.value <= 1) return;
    currentSlideIndex.value = (currentSlideIndex.value - 1 + totalSlides.value) % totalSlides.value;
};


// Carga todo el contenido al montar el componente
const loadContent = async () => {
    isLoading.value = true;
    error.value = null;
    try {
        await Promise.all([
            fetchMainMultimedia(),
            fetchCourseDetails()
        ]);
    } catch (err) {
        error.value = err.message;
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    loadContent();
});
</script>
<style scoped>
/* --- Estilos Generales --- */
.idioma-container { padding: 2rem; max-width: 900px; margin: auto; }
.section-title { text-align: center; color: #333; margin-bottom: 2rem; }
.subsection-title { color: #d90022; margin-bottom: 1.5rem; border-bottom: 2px solid #eee; padding-bottom: 5px; }
.separator { border: 0; height: 1px; background-color: #eee; margin: 3rem 0; }

/* --- Estilos del Carrusel (Mantener de Cocina/Ballet) --- */
.main-carousel-wrapper { position: relative; max-width: 900px;  height: 400px; margin: 0 auto; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);}
.main-carousel { position: relative; width: 100%; height: 100%; }
.slide { position: absolute; width: 100%; height: 100%; opacity: 0; transition: opacity 0.5s ease-in-out;}
.slide.active { opacity: 1; z-index: 1; }
.slide img, .slide video { width: 100%; height: 100%; object-fit: cover; }
.prev-button, .next-button { position: absolute; top: 50%; transform: translateY(-50%);background: rgba(0, 0, 0, 0.6); color: white; border: none;padding: 10px; cursor: pointer; z-index: 10; border-radius:4px; }
.prev-button { left: 10px; }
.next-button { right: 10px; }


/* --- Estilos de la Lista de Cursos --- */
.courses-list {display: grid;gap: 30px;}
.course-card {border: 1px solid #d0c8b3;border-radius: 8px;padding: 20px;background-color: #fcfcfc;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);}
.course-title {
color: #333;
font-size: 1.5rem;
margin-top: 0;
margin-bottom: 15px;
border-bottom: 2px solid #d90022;
padding-bottom: 5px;
}
.course-details-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;
}
.detail-item {display: flex;align-items: center;gap: 10px;}
.detail-item strong {color: #555;}
.detail-item p { margin: 0;}
.detail-icon {font-size: 1.5rem;color: #d90022;}
</style>