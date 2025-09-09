<template>
  <section class="section">
    <h2 class="title">CELEBRANDO NUESTRAS RAÍCES</h2>
    <div class="content-container">
      <p class="text">
        Desde hace 30 años, participamos anualmente en la Fiesta de las Colectividades de nuestra ciudad. En este evento, compartimos nuestra rica cultura a través de nuestro grupo de baile folclórico "Águila Blanca", exposiciones sobre nuestra historia y tradiciones, y talleres de arte polaco. También deleitamos a los visitantes con degustaciones de nuestra tradicional cocina polaca.
      </p>
      <div class="image-gallery">
        <img src="/imagenes/IMG1.jpg" alt="Baile folclórico en un escenario" class="gallery-img">
        <img src="/imagenes/IMG2.jpg" alt="Grupo de baile folclórico 'Águila Blanca' bailando" class="gallery-img">
        <img src="/imagenes/header2.png" alt="Bailarinas de 'Águila Blanca' en escena" class="gallery-img">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CelebrandoNuestrasRaices'
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
  font-family: Arial, sans-serif;
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
  line-height: 1.6;
  color: #555;
  margin-bottom: 30px;
}

.image-gallery {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.gallery-img {
  width: 30%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.gallery-img:hover {
  transform: scale(1.05);
}
</style>