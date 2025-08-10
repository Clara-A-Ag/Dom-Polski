<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
  <header class="main-header">
    <nav class="header-nav">
      <RouterLink to="/" class="logo-container">
        <img src="C:\Users\agust\OneDrive\Escritorio\Projecto Dom Polski\Dom-Polski\frontend\dompolski-frontend\public\imagenes\logo dp mas.png" alt="Logo Dom Polski" class="logo-image">
      </RouterLink>

      <div class="nav-links">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/contacto">Contactanos</RouterLink>
        <RouterLink to="/actividades">Actividades</RouterLink>
        <RouterLink to="/nuestrahistoria">Nuestra Historia</RouterLink>
        <RouterLink to="/novedades">Novedades</RouterLink>
        <RouterLink to="/blog">Blog</RouterLink>
      </div>
    </nav>
  </header>
</template>



<style scoped>
/* Estilos del encabezado principal */
.main-header {
  background-image: url(Dom-Polski\frontend\dompolski-frontend\public\imagenes\argentinian-flag-5350831.jpg); /* Un color de fondo claro, puedes ajustarlo */
  background-size: cover;
  border-bottom: 1px solid #ddd; /* Una línea en la parte inferior para separarlo del contenido */
}

/* Estilos de la barra de navegación */
.header-nav {
  display: flex; /* Habilitamos Flexbox */
  justify-content: space-between; /* El logo se va a la izquierda y los enlaces a la derecha */
  align-items: center; /* Centramos verticalmente todos los elementos */
  max-width: 1200px; /* Ancho máximo para el contenido, puedes ajustarlo */
  margin: 0 auto; /* Centramos la barra de navegación en la página */
}

/* Estilos del contenedor del logo */
.logo-image {
  width: 120px;
  height: auto;
  display: block;
}

/* Estilos de los enlaces de navegación */
.nav-links {
  display: flex;
  gap: 1.5rem; /* Espacio entre los enlaces */
}

.nav-links a {
  color: #333; /* Color del texto del enlace */
  text-decoration: none; /* Quitamos el subrayado */
  font-weight: bold;
  font-size: 1rem;
}

.nav-links a:hover {
  color: #c00; /* Color al pasar el mouse por encima */
}
</style>