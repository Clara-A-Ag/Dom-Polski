<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="main-header">
    <nav class="header-nav">
      <!-- Logo a la izquierda -->
      <RouterLink to="/" class="logo-container">
        <img src="/imagenes/LogoDom.png" alt="Logo Dom Polski" class="logo-image">
      </RouterLink>

      <!-- Links ocupando casi todo el ancho -->
      <div class="nav-links">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/contacto">Contactanos</RouterLink>
        <RouterLink to="/actividades">Actividades</RouterLink>
        <RouterLink to="/nuestrahistoria">Nuestra Historia</RouterLink>
        <RouterLink to="/novedades">Novedades</RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.main-header {
  background-color: #efedd6; /* Fondo crema */
  border-bottom: 3px solid #ce2323;
  padding: 0 2rem;
  height: 110px;
  box-sizing: border-box;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-nav {
  display: flex;
  align-items: center;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
  gap: 2rem;
}

.logo-container {
  flex-shrink: 0;
  margin-left: 0; /* pegado al borde izquierdo */
}

.logo-image {
  width: 110px; /* más pequeño */
  height: auto;
  display: block;
  transition: transform 0.25s ease;
}

.logo-image:hover {
  transform: scale(1.03); /* hover más sutil */
}

/* Links ocupando casi todo el header */
.nav-links {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-grow: 1;
}

.nav-links a {
  color: #c00606;
  font-weight: bold;
  font-size: 1.5rem;
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav-links a::after {
  content: "";
  position: absolute;
  width: 0%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #c00606;
  transition: width 0.3s ease;
}

.nav-links a:hover {
  color: #b51210;
}

.nav-links a:hover::after {
  width: 100%;
}

/* Responsivo */
@media (max-width: 768px) {
  .header-nav {
    flex-direction: column;
    gap: 1rem;
    height: auto;
    padding: 1rem 0;
  }

  .nav-links {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .logo-image {
    width: 80px;
  }
}

/* Ajustes para pantallas de netbook o baja altura */
@media (max-height: 800px) {
  .main-header {
    height: 90px; /* un poco más bajo */
    padding: 0 1rem;
  }

  .logo-image {
    width: 80px; /* logo más chico */
  }

  .nav-links a {
    font-size: 1.2rem; /* texto más compacto */
    padding: 0.3rem 0;
  }

  .header-nav {
    gap: 1rem; /* menos espacio entre logo y links */
  }
}

</style>

