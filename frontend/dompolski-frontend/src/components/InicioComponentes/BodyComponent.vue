<template>
<div>
<div class="carousel-container">
    <div class="carousel-track" :style="trackStyle">
<img v-for="(image, index) in images" :key="index" :src="image.src" :alt="image.alt"> //v-for itera sobre el arreglo de images para renderizar cada imagen.
    </div>

</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      images: [
      {src: '/imagenes/dompofrente.JPG', alt: 'Imagen de Dom Polski Frente'},  
      { src: '/imagenes/flag-792067.jpg', alt:'Imagen de la bandera polaca' },
        {src: '/imagenes/dompocartel.JPG', alt: 'Imagen de Dom Polski Cartel'},
      { src:'/imagenes/wawel-3683040.jpg', alt: 'Imagen del Castillo de Wawel' },
      {src: '/imagenes/haciendopierogi.jpeg', alt: 'Imagen de Dom Polski haciendo Pierogi'},
        { src: '/imagenes/old-town-5062333.jpg', alt: 'Ciudad Polaca' },
        { src: '/imagenes/IMG_9846.jpeg', alt: 'Imagen del Ballet Aguila Blanca'},
      ],
      currentIndex: 0,
      intervalId: null,
    };
  },
  computed: {
    trackStyle() {
      return {
        transform: `translateX(-${this.currentIndex * 100}%)`,
      };
    },
  },
  mounted() {
    this.startCarousel();
  },
  beforeUnmount() {
    this.stopCarousel();
  },
  methods: {
    startCarousel() {
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, 3000); // Cambia la imagen cada 3 segundos
    },
    stopCarousel() {
      clearInterval(this.intervalId);
    },
    nextSlide() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0; // Vuelve al inicio
      }
    },
  },
};

</script>

<style scoped>
.carousel-container {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative; /* ¡IMPORTANTE! Posicionamiento relativo para que los hijos absolutos se posicionen con respecto a este contenedor. */
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-track img {
  width: 100%;
  height: 600px;
  flex-shrink: 0;
  object-fit: cover;
  
}
div{
  background-color: #aad7f7;
}
</style>