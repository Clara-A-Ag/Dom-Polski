<script setup>
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
  
  
  <div id="main-layout">
    <HeaderComponent></HeaderComponent>
    
    <main class="content-wrapper">
      <RouterView />
    </main>
    <FooterComponent></FooterComponent>
  </div>


</template>

<style>
html, body {
  height: 100%; /* Asegura que la página ocupe toda la altura de la ventana */
  margin: 0;
}

#main-layout {
  display: flex; /* Habilita Flexbox */
  flex-direction: column; /* Apila los elementos (Header, main, Footer) verticalmente */
  min-height: 100vh; /* La clave: asegura que el contenedor tenga al menos la altura de la pantalla */
}

.content-wrapper {
  flex-grow: 1; /* Esta es la propiedad mágica: hace que el contenido se estire para llenar el espacio */
}
/* Estilos específicos para el contenedor de la aplicación */
*{
  margin: 0;
  padding: 0;
  
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
