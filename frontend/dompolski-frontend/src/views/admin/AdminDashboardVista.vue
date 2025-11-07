<template>
  <div class="dashboard-container">
    <h1>¡Bienvenido al Panel de Administración!</h1>
    <p>
      Este es el centro de control de tu sitio web.
    </p>
    <p>
      Usa el menú de la izquierda para comenzar a gestionar el contenido de las
      diferentes secciones, como "Novedades" o "Miembros".
    </p>
    
    <div class="stats-grid">
      <div class="stat-card placeholder">
        <h3>Próximamente</h3>
        <p>Aquí verás estadísticas rápidas.</p>
      </div>
      <div class="stat-card placeholder">
        <h3>¡En Construcción!</h3>
        <p>Añade nuevas secciones desde el menú.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// ¡Nada! Esta vista es 100% presentación por ahora.
</script>

<style scoped>
.dashboard-container h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.dashboard-container p {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.stat-card.placeholder {
  border: 2px dashed #ccc;
  background-color: #f9f9f9;
  text-align: center;
  color: #888;
}

.stat-card h3 {
  margin-top: 0;
}
</style>