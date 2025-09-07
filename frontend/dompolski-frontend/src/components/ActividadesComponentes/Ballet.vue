<template>
  <section class="activity-section">
    <h2 class="activity-title">Ballet Águila Blanca</h2>
    <div class="ballet-container">
      <div class="main-content">
        <div class="image-placeholder">
          <p>Fotos de trajes y videos de bailes</p>
        </div>
        <p class="description">Descripción de baile típico y traje típico</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BalletComponent'
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

.ballet-container {
  display: flex;
  justify-content: center;
}

.main-content {
  text-align: center;
  width: 70%;
}

.image-placeholder {
  background-color: #ccc;
  min-height: 400px;
  width: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #555;
  font-size: 1.5em;
}

.description {
  margin-top: 20px;
  font-size: 1.2em;
  color: #555;
}
</style>