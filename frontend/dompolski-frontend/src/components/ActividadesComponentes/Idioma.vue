<template>
  <section class="activity-section">
    <h2 class="activity-title">Idioma</h2>
    <div class="activity-content">
      <div class="language-card">
        <div class="language-box">
          <h3>Polaco</h3>
        </div>
        <div class="language-details">
          <p>Horarios disponibles:</p>
          <p>Niveles:</p>
          <p>Edades:</p>
          <p>Contacto:</p>
        </div>
      </div>
      <div class="language-card">
        <div class="language-box">
          <h3>Inglés</h3>
        </div>
        <div class="language-details">
          <p>Horarios disponibles:</p>
          <p>Niveles:</p>
          <p>Edades:</p>
          <p>Contacto:</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IdiomaComponent'
}
</script>

<style scoped>
.activity-section {
  margin-bottom: 40px;
}

.activity-title {
  text-align: center;
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
}

.activity-content {
  display: flex;
  justify-content: center;
  gap: 50px;
}

.language-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.language-box {
  background-color: #f1c40f;
  width: 150px;
  height: 150px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
  color: white;
}

.language-details p {
  margin: 0 0 10px 0;
  color: #555;
}
</style>