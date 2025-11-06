<template>
   <h2 class="carousel-title">Ballet Aguila Blanca</h2>
  <div class="carousel-container">

    <div v-if="slidesData.length > 0" class="carousel-slides" ref="carouselContainer">
      <div 
        v-for="(slide, index) in slidesData" 
        :key="index" 
        class="slide"
        :class="{ active: index === currentSlideIndex }"
      >
        <img v-if="slide.type === 'image'" :src="slide.src" :alt="slide.alt" />
        <video v-else-if="slide.type === 'video'" controls muted autoplay loop playsinline :src="slide.src">
          Tu navegador no soporta el tag de video.
        </video>
      </div>

      <template v-if="slidesData.length > 1">
        <button class="prev-button" @click="prevSlide">Anterior</button>
        <button class="next-button" @click="nextSlide">Siguiente</button>
      </template>
    </div>
    
    <div v-else class="empty-message">
      No hay elementos multimedia definidos en el frontend.
    </div>
  </div>
</template>

<script>
export default {
  name: 'BalletVue',
  data() {
    return {
      currentSlideIndex: 0,
      // *** 1. DEFINIMOS LOS DATOS AQUÍ DIRECTAMENTE ***
      slidesData: [
        { type: 'image', src: '/assets/ballet adulto.JPEG',alt: 'Foto de adultos de ballet' },
        { type: 'image', src: '/assets/ballet niños.JEPG', alt: 'Foto de niños de ballet' },
        { type: 'video',  src: '/frontend/dompolski-frontend/public/assets/ballet adulyto4.MP4', alt: 'Video promocional' },
        { type: 'image', src: '/assets/ballet niños1.JEPG', alt: 'Foto de niños de ballet' },
        { type: 'image', src: '/assets/ballet.JEPG', alt: 'Foto de niños con trajes' },
        { type: 'image', src: '/assets/ballet adulto1.JEPG', alt: 'Foto de adultos de ballet' },
        { type: 'image', src: '/assets/ballet adulto2.JEPG', alt: 'Foto de adultos de ballet' },
      ],
    };
  },
  computed: {
    totalSlides() {
      return this.slidesData.length;
    }
  },
  methods: {
    nextSlide() {
      if (this.totalSlides === 0) return;
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.totalSlides;
      this.handleMediaPlayback();
    },

    prevSlide() {
      if (this.totalSlides === 0) return;
      this.currentSlideIndex = (this.currentSlideIndex - 1 + this.totalSlides) % this.totalSlides;
      this.handleMediaPlayback();
    },

    // La función handleMediaPlayback también se mantiene igual
    handleMediaPlayback() {
      const container = this.$refs.carouselContainer; 

    // Verificamos si la referencia existe antes de intentar consultarla
    if (!container) {
        // Esto puede ocurrir si el componente aún no se ha renderizado
        console.warn("Advertencia: El contenedor del carrusel no está disponible.");
        return; 
    }

    // Ahora usamos el contenedor referenciado para la consulta
    const slides = container.querySelectorAll('.slide');

    slides.forEach((slideEl, index) => {
            const video = slideEl.querySelector('video');
            if (video) {
                if (index === this.currentSlideIndex) {
                    video.play().catch(error => {
                        console.warn("Advertencia: No se pudo reproducir el video automáticamente.", error);
                    });
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
                const video = slideEl.querySelector('video');
            }
        });
    },
  },
  // *** 2. Usamos el hook created para inicializar, o mounted ***
  mounted() {
    this.handleMediaPlayback();
  }
};
</script>

<style scoped>
/* Estilos del contenedor principal */
.carousel-container {
    position: relative;
    max-width: 800px; /* Ajusta según tu diseño */
    margin: 50px auto;
    padding: 0;
    overflow: hidden; 
    border: 1px solid #e0e0e0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
}

.carousel-title {
    text-align: center;
    padding-top: 20px;
    font-family: 'Ubuntu', sans-serif;
    font-size: 2rem;
}

/* Contenedor de diapositivas */
.carousel-slides {
    position: relative;
    height: 450px; /* Altura fija, ajusta según necesidad */
}

/* Estilo de cada diapositiva */
.slide {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease-in-out; /* Efecto de fundido */
    display: flex; /* Asegura que el contenido se centre/ajuste */
    justify-content: center;
    align-items: center;
}

/* Clase activa (muestra la diapositiva) */
.slide.active {
    opacity: 1; 
    z-index: 1;
}

/* Estilos de contenido multimedia */
.slide img, .slide video {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Recorta si es necesario para cubrir el área */
}

/* Estilos de los botones de navegación */
.prev-button, .next-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px 15px;
    background: rgba(139, 0, 0, 0.7); /* Rojo adaptado a tu diseño */
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    z-index: 10;
    transition: background-color 0.2s;
    border-radius: 10px;
}

.prev-button:hover, .next-button:hover {
    background: rgba(139, 0, 0, 0.9);
}

.prev-button {
    left: 10px;
}

.next-button {
    right: 10px;
}

/* Mensajes de estado */
.loading-message, .error-message, .empty-message {
    text-align: center;
    padding: 20px;
    font-size: 1.1em;
    height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
}
.error-message {
    color: darkred;
    background-color: #ffe0e0;
    border: 1px solid darkred;
}
</style>