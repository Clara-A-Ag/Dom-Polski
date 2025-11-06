<template>
  <h2>Ballet Aguila Blanca</h2>
  <div class="carousel-container">
    <div class="carousel-slides">
      <div 
        v-for="(slide, index) in slidesData" 
        :key="index" 
        class="slide"
        :class="{ active: index === currentSlideIndex }"
      >
        <img 
          v-if="slide.type === 'image'" 
          :src="slide.src" 
          :alt="slide.alt" 
        />
        <video 
          v-else-if="slide.type === 'video'" 
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

    <button class="prev-button" @click="prevSlide">Anterior</button>
    <button class="next-button" @click="nextSlide">Siguiente</button>
  </div>
</template>

<script>
export default {
  name: 'MediaCarousel',
  data() {
    return {
      // 1. Estado para rastrear la diapositiva actual
      currentSlideIndex: 0,
      
      // 2. Datos de las diapositivas
      slidesData: [
        { type: 'image', src: '/assets/ballet adulto.JPEG', alt: 'Traje típico 1' },
{ type: 'image', src: '/assets/ballet niños.JPEG', alt: 'Traje típico 2' },
{ type: 'image', src: '/assets/ballet adulto2.JPEG', alt: 'Traje típico 3' },
{ type: 'image', src: '/assets/ballet niños1.jpeg', alt: 'Traje típico 4' },
{ type: 'image', src: '/assets/ballet adulto1.JPEG', alt: 'Foto de ballet' }
  
      ],
    };
  },
  computed: {
    // 3. Propiedad calculada para obtener el número total de diapositivas
    totalSlides() {
      return this.slidesData.length;
    }
  },
  methods: {
    // 4. Método para avanzar a la siguiente diapositiva
    nextSlide() {
      // Usamos el operador módulo (%) para envolver el índice:
      // (actual + 1) % total -> Si llega al final, vuelve a 0.
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.totalSlides;
      this.$nextTick(this.handleMediaPlayback); // Asegura que el DOM se actualice antes de manejar la reproducción
    },

    // 5. Método para retroceder a la diapositiva anterior
    prevSlide() {
      // Manejamos el caso negativo para volver a la última diapositiva.
      this.currentSlideIndex = (this.currentSlideIndex - 1 + this.totalSlides) % this.totalSlides;
      this.$nextTick(this.handleMediaPlayback);
    },

    // 6. Lógica de reproducción/pausa de video (adaptada a Vue)
    handleMediaPlayback() {
        // En Vue, es mejor usar referencias para acceder al DOM directamente,
        // pero podemos usar querySelectorAll si es un componente autocontenido.
        const slides = this.$el.querySelectorAll('.slide');

        slides.forEach((slideEl, index) => {
            const video = slideEl.querySelector('video');

            if (video) {
                if (index === this.currentSlideIndex) {
                    // Si es la diapositiva activa, intentar reproducir
                    video.play().catch(error => {
                        console.warn("Error al reproducir video:", error);
                    });
                } else {
                    // Si no es la activa, pausar y rebobinar
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }
  },
  // Opcional: Ejecutar al montar para asegurar que el primer video se reproduzca si lo hay
  mounted() {
      this.handleMediaPlayback();
  }
};
</script>

<style scoped>
h2 {
    text-align: center;
    padding-top: 25px;
    padding-bottom: 6px;
    font-size: 50px;
    color: #333;
}
.carousel-container {
    position: relative;
    max-width: 800px;
    margin: 50px auto;
    overflow: hidden;
    border: 1px solid #ccc;
    border-radius: 25px;
}

.carousel-slides {
    position: relative;
    height: 450px;
}

.slide {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

/* La clave de Vue: la clase 'active' se añade reactivamente */
.slide.active {
    opacity: 1; 
    /* Importante: para videos, asegúrate que 'video.play()' se ejecuta 
       al aplicar esta clase, lo cual manejamos en `handleMediaPlayback`. */
}

.slide img, .slide video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.prev-button, .next-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px 15px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    cursor: pointer;
    z-index: 10;
}

.prev-button { left: 10px; }
.next-button { right: 10px; }
</style>
  