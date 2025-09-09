<template>
  <section class="section">
    <h2 class="title">NUESTRA SEDE</h2>
    <div class="content-container">
      <p class="text">
        El 6 de mayo de 1951, inauguramos nuestra nueva sede en Aristóbulo del Valle 5444, donde funcionamos actualmente. Aquí, nuestra comunidad prospera con diversas actividades que enriquecen nuestra cultura.
        Contamos con la Escuela de Idioma Polaco, a cargo de nuestra maestra nativa Renata Kuprop, y con el grupo de baile típico polaco "Águila Blanca", que tiene secciones de niños y adultos dirigidas por Hugo Gutiérrez. Además, ofrecemos talleres de arte polaco como Wycinanki y Pisanki, y talleres de cocina.
        Para mantener informada a nuestra comunidad, contamos con una biblioteca que publica un boletín mensual virtual llamado "Dom Polski - Órgano oficial de la Colectividad Polaca en Santa Fe". Este boletín no solo difunde nuestras actividades, sino también notas de interés cultural. Finalmente, nuestro grupo de audiovisuales, liderado por Rita Regginelli y Virginia Cottier, se encargan de gestionar nuestras redes sociales para estar más cerca de todos.
      </p>
      <div class="image-grid">
        <img src="/imagenes/SantaFe14.jpg" alt="Fachada de la sede Dom Polski" class="grid-img">
        <img src="/imagenes/IMG_7274.jpg" alt="Logo de Dom Polski" class="grid-img logo">
        <img src="/imagenes/vir-cla-iara.jpg" alt="Interior de la sede durante un evento" class="grid-img large">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NuestraSede'
}
</script>

<style scoped>
.section {
  background-color: #ffffff;
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
  display: flex;
  max-width: 1000px;
  margin: 0 auto;
  gap: 30px;
  align-items: flex-start;
}

.text {
  flex: 1;
  font-size: 1.2em;
  font-family: 'ubuntu', sans-serif;
  line-height: 1.6;
  color: #555;
  text-align: left;
}

.image-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;/* Espacio entre imagenes */
}

.grid-img {
  width: 100%;
  max-width: 100%;   /* Asegura que no crezcan más allá de su tamaño original */
  height: 200px;     /* O define una altura mínima si quieres mantener consistencia visual */
  object-fit: cover; /* Recorta para llenar el espacio sin deformar */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.grid-img.logo {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  align-self: center;
  justify-self: center;
}

.grid-img.large {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
}
</style>