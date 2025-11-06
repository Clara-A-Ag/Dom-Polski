<template>
  <section class="section">
    <h2 class="title">SOBRE NOSOTROS:</h2>
    <div class="content-container">
      <p class="text">
        Somos la Asociación Unión Polaca y Sección Ex Combatientes - Dom Polski Santa Fe, fundada el 10 de octubre de 1926. Nuestra primera casa estuvo en Llerena 2674, donde los inmigrantes polacos que llegaron a Argentina encontraron un refugio seguro y contención. Muchos de ellos se afincaron en los barrios de Guadalupe, Jardín Mayoraz, Don Bosco, Escalante y Calchines, y contribuyeron al crecimiento de la ciudad trabajando en el puerto, en los molinos harineros, en la cervecería, en el ferrocarril y en el antiguo puente sobre la Laguna Setúbal.
        A través de los años, nuestra misión ha sido transmitida por cuatro generaciones. Trabajamos para mantener vivo el legado de nuestros fundadores: estrechar los vínculos sociales, culturales, mutuos y deportivos entre los polacos residentes o visitantes, sus descendientes y, por supuesto, los argentinos. Nos esforzamos por transmitir de generación en generación nuestras costumbres, la importancia del trabajo en grupo, la comunión entre pares y la tolerancia, promoviendo siempre la integración con otras culturas.
      </p>
      <div class="image-grid">
        <img src="/imagenes/dompofrente.JPG" alt="Foto histórica de la comunidad polaca" class="grid-img">
        <div class="small-images">
          <img src="/imagenes/bandargentina.jpg" alt="Foto de la comunidad moderna" class="small-img">
          <img src="/imagenes/LogoDom.png" alt="Logo de Dom Polski" class="small-img">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SobreNosotros'
}
</script>

<style scoped>
.section {
  background-color: #fffffe;
  padding: 20px 10px; /* Un poco más de aire */
  text-align: center;
}

.title {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 30px; /* Más espacio */
  font-family: 'ubuntu', sans-serif;
  border-bottom: 3px solid #9d1414;
  display: inline-block;
  padding-bottom: 5px;
}

/* 1. CAMBIO: Mobile-First
  Por defecto, es una columna.
*/
.content-container {
  display: flex;
  flex-direction: column; /* Apilado en móvil */
  max-width: 1000px;
  margin: 0 auto;
  gap: 30px;
}

/* 2. CAMBIO: El texto ahora es 'order: 2'
  (Irá debajo de las imágenes en móvil)
*/
.text {
  font-size: 1.2em;
  line-height: 1.6;
  color: #555;
  text-align: left;
  font-family: 'Ubuntu', sans-serif;
  order: 2; /* Texto debajo */
}

/* 3. CAMBIO: Las imágenes son 'order: 1'
  (Irán arriba en móvil)
*/
.image-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  order: 1; /* Imágenes arriba */
}

.grid-img {
  width: 100%;
  height: 250px; /* Un poco más de altura */
  object-fit: cover; /* Clave para que no se deforme */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.small-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px; /* Más espacio */
}

.small-img {
  width: 100%;
  height: 150px; /* Altura fija para consistencia */
  object-fit: cover; /* Clave para la bandera/logo */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 4. LA MAGIA:
  Cuando la pantalla sea más grande de 768px...
*/
@media (min-width: 768px) {
  .content-container {
    flex-direction: row; /* Volvemos al layout de fila */
    align-items: flex-start;
  }

  .text {
    flex: 2; /* <-- ¡AQUÍ ESTÁ! El texto ocupa 2/3 */
    order: 1; /* Texto a la izquierda */
  }

  .image-grid {
    flex: 1; /* <-- Las imágenes ocupan 1/3 */
    order: 2; /* Imágenes a la derecha */
  }
}
</style>