<template>
  <section class="section">
    <h2 class="title">CELEBRANDO NUESTRAS RAÍCES</h2>
    <div class="content-container">
      <p class="text">
        Desde hace 30 años, participamos anualmente en la Fiesta de las Colectividades de nuestra ciudad. En este evento, compartimos nuestra rica cultura a través de nuestro grupo de baile folclórico "Águila Blanca", exposiciones sobre nuestra historia y tradiciones, y talleres de arte polaco. También deleitamos a los visitantes con degustaciones de nuestra tradicional cocina polaca.
      </p>

      <div class="carrusel-container">
        
        <div class="carrusel-track" :style="{ transform: `translateX(-${indiceActual * 100}%)` }">
          
          <div v-for="slide in slides" :key="slide.src" class="carrusel-slide">
            
            <img 
              v-if="slide.type === 'image'" 
              :src="slide.src" 
              :alt="slide.alt"
            >
            
            <video 
              v-if="slide.type === 'video'" 
              :src="slide.src" 
              controls 
              muted 
              loop
            >
              Tu navegador no soporta videos.
            </video>

          </div>
        </div>

        <button @click="anterior" class="carrusel-boton prev">&lt;</button>
        <button @click="siguiente" class="carrusel-boton next">&gt;</button>

      </div>
    </div>
  </section>
</template>

<script setup>
// 3. LÓGICA (Composition API)
import { ref, computed } from 'vue';

// 4. DATOS:
// Aquí pones todas tus imágenes y videos.
// ¡Añadí un video de ejemplo!
const slides = ref([
  { type: 'image', src: '/imagenes/IMG1.jpg', alt: 'Baile folclórico en un escenario' },
  { type: 'image', src: '/imagenes/IMG2.jpg', alt: "Grupo de baile folclórico 'Águila Blanca' bailando" },
  { type: 'image', src: '/imagenes/header2.png', alt: "Bailarinas de 'Águila Blanca' en escena" },
  // EJEMPLO DE VIDEO: (Asegúrate de tener un video en /public/videos/fiesta.mp4)
  // { type: 'video', src: '/videos/fiesta.mp4', alt: 'Video de la fiesta' }
]);

// 5. ESTADO:
// Esta es la variable que dice "cuál slide estamos viendo"
const indiceActual = ref(0); // Empezamos en el primero (índice 0)

// 6. MÉTODOS (Funciones):
function siguiente() {
  if (indiceActual.value < slides.value.length - 1) {
    indiceActual.value++; // Avanza
  } else {
    indiceActual.value = 0; // Vuelve al principio
  }
}

function anterior() {
  if (indiceActual.value > 0) {
    indiceActual.value--; // Retrocede
  } else {
    indiceActual.value = slides.value.length - 1; // Va al final
  }
}

</script>

<style scoped>
.section {
  background-color: #efedd6;
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
}

/* --- 7. NUEVOS ESTILOS DEL CARRUSEL --- */

/* El contenedor principal. 'overflow: hidden' es la magia */
.carrusel-container {
  position: relative;
  max-width: 800px; /* Ancho máximo del carrusel */
  margin: 0 auto;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* La "tira" que se mueve. Usa flexbox. */
.carrusel-track {
  display: flex;
  transition: transform 0.5s ease; /* La animación de deslizamiento */
}

/* Cada slide ocupa el 100% del contenedor */
.carrusel-slide {
  flex: 0 0 100%;
  min-width: 100%;
}

/* Estilo unificado para imágenes y videos */
.carrusel-slide img,
.carrusel-slide video {
  width: 100%;
  height: 450px; /* Una altura más "panorámica" para un carrusel */
  object-fit: cover; /* Recorta para llenar el espacio sin deformar */
  display: block; /* Quita espacios fantasma */
}

/* Estilo de los botones */
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