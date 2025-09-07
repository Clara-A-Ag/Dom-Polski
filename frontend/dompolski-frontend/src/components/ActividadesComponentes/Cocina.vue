<template>
  <section class="activity-section">
    <h2 class="activity-title">COCINA</h2>
    <div class="recipe-gallery">
      <div class="recipe-card" v-for="n in 3" :key="n">
        <div class="photo-placeholder">foto</div>
        <p class="recipe-info">Nombre receta e ingredientes</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CocinaSection'
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

.recipe-gallery {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.recipe-card {
  text-align: center;
}

.photo-placeholder {
  background-color: #f1c40f;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
}

.recipe-info {
  margin-top: 10px;
  color: #555;
}
</style>