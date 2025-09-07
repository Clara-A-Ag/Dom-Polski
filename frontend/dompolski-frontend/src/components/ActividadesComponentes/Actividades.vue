<template>
  <section class="section">
    <h2 class="title">ACTIVIDADES</h2>
    <div class="sidebar">
      <ul>
        <li><a href="#idioma">Idioma</a></li>
        <li><a href="#ballet">Ballet</a></li>
        <li><a href="#cocina">Cocina</a></li>
      </ul>
    </div>
    <div class="content">
      <Idioma id="idioma" />
      <Ballet id="ballet" />
      <Cocina id="cocina" />
    </div>
  </section>
</template>

<script>
import Idioma from './Idioma.vue';
import Ballet from './Ballet.vue';
import Cocina from './Cocina.vue';

export default {
  name: 'ActividadesSection',
  components: {
    Idioma,
    Ballet,
    Cocina
  }
}
</script>

<style scoped>
.section {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: 30px;
  padding: 40px 20px;
}

.title {
  display: none; /* Se usará el título en cada subcomponente para mayor claridad */
}

.sidebar {
  width: 200px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: 10px;
}

.sidebar a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 1.1em;
  transition: color 0.3s ease;
}

.sidebar a:hover {
  color: #9d1414;
}

.content {
  flex: 1;
}
</style>