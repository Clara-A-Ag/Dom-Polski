<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    
<header>
<div class="Menu">
    <nav>
      <RouterLink to="/" class="logo">DOM POLSKI</RouterLink>
      <div class="nav-links">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/contacto">Contactanos</RouterLink>
        <RouterLink to="/actividades">Actividades</RouterLink>
        <RouterLink to="/nuestrahistoria">Nuestra Historia</RouterLink>
        <RouterLink to="/novedades">Novedades</RouterLink>
        <RouterLink to="/blog">Blog</RouterLink>
        </div>
    </nav>
</div>
</header>
</template>

<style>
.logo img{
    width: 120px;
    height: auto;
    display: block;
    margin: 0;
}
header .logo{
    text-align: left;
}
.Menu{
background-image: url(Dom-Polski\frontend\dompolski-frontend\public\imagenes\argentinian-flag-5350831.jpg);
width:100%;
height: 200px;;
}
</style>