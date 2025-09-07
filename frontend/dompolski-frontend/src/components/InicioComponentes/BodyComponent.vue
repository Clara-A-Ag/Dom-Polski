<template>
  <div class="carousel-container" :style="{ height: slideHeight }">
    <div class="carousel-track" :style="trackStyle">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="carousel-slide"
      >
        <img :src="image.src" :alt="image.alt" />
        <div class="overlay"></div>
      </div>
    </div>

    <!-- Texto dinámico con fade -->
    <transition name="fade" mode="out-in">
      <div class="welcome-text" :key="currentIndex">
        <h1>{{ images[currentIndex].title }}</h1>
        <p>{{ images[currentIndex].description }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { src: '/imagenes/dompofrente.JPG', alt: 'Imagen de Dom Polski Frente', title: 'Bienvenido a Dom Polski', description: 'Un lugar para celebrar la cultura polaca' },
        { src: '/imagenes/flag-792067.jpg', alt: 'Imagen de la bandera polaca', title: 'Nuestra Historia', description: 'Orgullosos de nuestras raíces y tradiciones' },
        { src: '/imagenes/dompocartel.JPG', alt: 'Imagen de Dom Polski Cartel', title: 'Eventos y Actividades', description: 'Vení a compartir momentos únicos' },
        { src: '/imagenes/wawel-3683040.jpg', alt: 'Imagen del Castillo de Wawel', title: 'Conexión con Polonia', description: 'Descubrí la belleza y cultura de nuestro país' },
        { src: '/imagenes/haciendopierogi.jpeg', alt: 'Imagen de Dom Polski haciendo Pierogi', title: 'Gastronomía Tradicional', description: 'Sabores que cuentan historias' },
        { src: '/imagenes/old-town-5062333.jpg', alt: 'Ciudad Polaca', title: 'Arquitectura y Encanto', description: 'Un paseo por las calles de Polonia' },
        { src: '/imagenes/IMG_9846.jpeg', alt: 'Imagen del Ballet Aguila Blanca', title: 'Arte y Danza', description: 'Expresiones culturales que nos unen' },
      ],
      currentIndex: 0,
      intervalId: null,
      headerHeight: 0
    };
  },
  computed: {
    trackStyle() {
      return {
        transform: `translateX(-${this.currentIndex * 100}%)`
      };
    },
    slideHeight() {
      return `calc(100vh - ${this.headerHeight}px)`;
    }
  },
  mounted() {
    this.updateHeaderHeight();
    window.addEventListener("resize", this.updateHeaderHeight);
    this.startCarousel();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateHeaderHeight);
    this.stopCarousel();
  },
  methods: {
    updateHeaderHeight() {
      const header = document.querySelector(".main-header");
      this.headerHeight = header ? header.offsetHeight : 0;
    },
    startCarousel() {
      this.intervalId = setInterval(this.nextSlide, 6000);
    },
    stopCarousel() {
      clearInterval(this.intervalId);
    },
    nextSlide() {
      this.currentIndex =
        this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
    }
  }
};
</script>

<style scoped>
.carousel-container {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  scroll-snap-align: start; /* encaje al inicio */
  flex-shrink: 0; /* evita que se encoja */
}

.carousel-track {
  display: flex;
  transition: transform 1s ease-in-out;
}

.carousel-slide {
  position: relative;
  min-width: 100%;
}

.carousel-slide img {
  width: 100%;
  height: 100%; /* usa el alto del contenedor dinámico */
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
}

.welcome-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  text-shadow: 0 3px 8px rgba(0, 0, 0, 0.8);
  padding: 0 20px;
}

.welcome-text h1 {
  font-size: 4.5rem;
  margin-bottom: 1rem;
}

.welcome-text p {
  font-size: 1.8rem;
}

/* Fade más lento */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Ajustes para móviles */
@media (max-width: 768px) {
  .welcome-text h1 {
    font-size: 2.5rem;
  }
  .welcome-text p {
    font-size: 1.2rem;
  }
}
</style>
