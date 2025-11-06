<template>
  <section class="section">
    <h2 class="title">NUESTRA SEDE</h2>
    
    <div class="content-container">
      <p class="text">
        El 6 de mayo de 1951, inauguramos nuestra nueva sede en Aristóbulo del Valle 5444, donde funcionamos actualmente. Aquí, nuestra comunidad prospera con diversas actividades que enriquecen nuestra cultura.
        Contamos con la Escuela de Idioma Polaco, a cargo de nuestra maestra nativa Renata Kuprop, y con el grupo de baile típico polaco "Águila Blanca", que tiene secciones de niños y adultos dirigidas por Hugo Gutiérrez. Además, ofrecemos talleres de arte polaco como Wycinanki y Pisanki, y talleres de cocina.
        Para mantener informada a nuestra comunidad, contamos con una biblioteca que publica un boletín mensual virtual llamado "Dom Polski - Órgano oficial de la Colectividad Polaca en Santa Fe". Este boletín no solo difunde nuestras actividades, sino también notas de interés cultural. Finalmente, nuestro grupo de audiovisuales, liderado por Rita Regginelli y Virginia Cottier, se encargan de gestionar nuestras redes sociales para estar más cerca de todos.
      </p>

      <div class="carrusel-container">
        <div class="carrusel-track" :style="{ transform: `translateX(-${indiceActual * 100}%)` }">
          <div v-for="slide in slides" :key="slide.src" class="carrusel-slide">
            <img 
              v-if="slide.type === 'image'" 
              :src="slide.src" 
              :alt="slide.alt"
            >
          </div>
        </div>
        <button @click="anterior" class="carrusel-boton prev">&lt;</button>
        <button @click="siguiente" class="carrusel-boton next">&gt;</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// 3. ¡EL ÚNICO CAMBIO REAL!
// Actualizamos el array 'slides' con las imágenes de la Sede.
const slides = ref([
  { type: 'image', src: '/imagenes/SantaFe14.jpg', alt: 'Fachada de la sede Dom Polski' },
  { type: 'image', src: '/imagenes/IMG_7274.jpg', alt: 'Logo de Dom Polski en la sede' },
  { type: 'image', src: '/imagenes/vir-cla-iara.jpg', alt: 'Interior de la sede durante un evento' }
]);

// 4. Lógica 100% reutilizada
const indiceActual = ref(0);

function siguiente() {
  if (indiceActual.value < slides.value.length - 1) {
    indiceActual.value++;
  } else {
    indiceActual.value = 0;
  }
}

function anterior() {
  if (indiceActual.value > 0) {
    indiceActual.value--;
  } else {
    indiceActual.value = slides.value.length - 1;
  }
}
</script>

<style scoped>
/* 5. ESTILOS DE CONTENIDO ADAPTADOS */
.section {
  background-color: #ffffff; /* Fondo blanco como lo tenías */
  padding: 40px 20px;
  text-align: center;
}

.title {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
  font-family: 'ubuntu', sans-serif;
  border-bottom: 3px solid #9d1414;
  display: inline-block;
  padding-bottom: 5px;
}

/* Layout de 1 columna (Texto arriba, carrusel abajo) */
.content-container {
  max-width: 900px;
  margin: 0 auto;
}

.text {
  font-size: 1.2em;
  font-family: 'ubuntu', sans-serif;
  line-height: 1.6;
  color: #555;
  margin-bottom: 30px;
  text-align: left; /* Lo dejamos justificado a la izq */
}

/* --- 6. ESTILOS DEL CARRUSEL 100% REUTILIZADOS --- */
.carrusel-container {
  position: relative;
  max-width: 800px; 
  margin: 0 auto;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.carrusel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.carrusel-slide {
  flex: 0 0 100%;
  min-width: 100%;
}

.carrusel-slide img {
  width: 100%;
  height: 450px; 
  object-fit: cover;
  display: block;
}

.carrusel-boton {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 10;
}

.carrusel-boton:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.carrusel-boton.prev {
  left: 10px;
}

.carrusel-boton.next {
  right: 10px;
}
</style>