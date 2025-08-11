<template>
<div class="carousel-container">
    <div class="carousel-track" :style="trackStyle">
<img v-for="(image, index) in images" :key="index" :src="image.src" :alt="image.alt"> //v-for itera sobre el arreglo de images para renderizar cada imagen.
    </div>
<h1 class="carrusel-title">Dom Polski - Santa Fe</h1>
</div>
<div class="Descripcion">
  <a>¡Bienvenidos a Dom Polski Santa Fe! Somos una asociación civil sin fines de lucro que busca promover la cultura polaca en Argentina. Nuestro objetivo es preservar y difundir las tradiciones, costumbres y valores de la comunidad polaca en Santa Fe y sus alrededores.</a>
  <li>En Dom Polski, organizamos eventos culturales, clases de idioma polaco, talleres de cocina tradicional y actividades recreativas para todas las edades. Nuestro espacio está abierto a todos aquellos interesados en conocer más sobre la rica herencia cultural polaca.</li>
  <li>¡Únete a nosotros y descubre la magia de la cultura polaca en Santa Fe!</li>
  <a href="https://share.google/c6dt38SD54IBFe4TN">Av. Aristóbulo del Valle 5444, Santa Fe, Argentina, 3000</a>
  <li>Sociedad Cultural y Deportiva; Union Polaca y Seccion Ex Combatientes</li>

</div>

</template>

<script>
export default {
  data() {
    return {
      images: [
      {src: '/imagenes/dompofrente.JPG', alt: 'Imagen de Dom Polski Frente'},  
      { src: '/imagenes/flag-792067.jpg', alt:'Imagen de la bandera polaca' },
      {src: '/imagenes/bandargentina.jpg', alt: 'Imagen de la bandera Argentina'},
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
.carrusel-title{
  position: absolute; /* Posicionamiento absoluto para colocar el título sobre las imágenes. */
  top: 75%; /* Ajusta según sea necesario */
  left: 50%;
  transform: translateX(-50%);
  color: white;
 text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Sombra para mejorar la legibilidad */
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 24px;
  text-align: center;
  z-index: 10; /* Asegura que el título esté por encima de las imágenes */
}
.Descripcion {
  margin: 20px auto;
  padding: 20px;
  background-color: #a7c1e3;
  border-radius: 8px;
  font-style: 'lora', serif;
  font-weight: solid;
}
</style>