<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="main-header">
    <nav class="header-nav">
      <RouterLink to="/" class="logo-container">
        <img src="/imagenes/LogoDom.png" alt="Logo Dom Polski" class="logo-image">
      </RouterLink>

      <div class="nav-links-container">
        <div class="nav-links">
          <RouterLink to="/">Inicio</RouterLink>
          <RouterLink to="/contacto">Contactanos</RouterLink>
          <RouterLink to="/actividades">Actividades</RouterLink>
          <RouterLink to="/nuestrahistoria">Nuestra Historia</RouterLink>
          <RouterLink to="/novedades">Novedades</RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* Estilos del encabezado principal */
.main-header {
  background-color: #ffffff;
  background-size: 350px;
  border-bottom: 1px solid #000000;
  padding: 0 2rem; 
  height: 100px;  
  box-sizing: border-box; 
  width: 100%;
}

/* Estilos de la barra de navegación */
.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}

/* Estilos del contenedor del logo */

.logo-image {
  width: 100px;
  height: auto;
  display: block;
}

/* Contenedor para los enlaces de navegación */
.nav-links-container {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
}

/* Estilos de los enlaces de navegación */
.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: #c00606;
  text-shadow: #b7b4b4 1px 1px 2px;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-links a:hover {
  color: white;
  background-color: #c00606;
}

</style>