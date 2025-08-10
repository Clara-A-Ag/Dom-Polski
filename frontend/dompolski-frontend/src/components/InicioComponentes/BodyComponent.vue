<template>
<div class="carousel-container">
    <div class="carousel-track" :style="trackStyle">
<img v-for="(image, index) in images" :key="index" :src="image.src" :alt="image.alt"> //v-for itera sobre el arreglo de images para renderizar cada imagen.
    </div>
</div>

</template>

<script>
export default {
  data() {
    return {
      images: [
        { src: '/public/imagenes/flag-792067.jpg', alt:'Imagen de la bandera polaca' },
        {src: '/public/imagenes/SantaFe14.jpg', alt: 'Imagen de Dom Polski Frente'},
        { src:'/public/imagenes/wawel-3683040.jpg', alt: 'Imagen del Castillo de Wawel' },
        { src: '/public/imagenes/old-town-5062333.jpg', alt: 'Ciudad Polaca' },
        { src: '/public/imagenes/IMG_9846.jpeg', alt: 'Imagen del Ballet Aguila Blanca'},
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
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-track img {
  width: 100%;
  height: 700px;
  flex-shrink: 0;
}

</style>