<template>
  <div class="placeholder-container">
    <h1>Gestión de Actividades</h1>
    <div class="en-construccion-caja">
      <span class="icono-herramienta">🛠️</span>
      <h2>¡En Construcción!</h2>
      <p>
        Esta sección está siendo desarrollada por tu compañera.
      </p>
      <p>
        ¡Vuelve pronto para gestionar las actividades del club!
      </p>
    </div>
  </div>
</template>

<script setup>
// No necesita lógica, es solo un cartel.
</script>

<style scoped>
.placeholder-container h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
}

.en-construccion-caja {
  background-color: #fff;
  border: 2px dashed #9d1414; /* Borde con tu color de marca */
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.icono-herramienta {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.en-construccion-caja h2 {
  font-size: 2rem;
  color: #333;
  margin-top: 0;
}

.en-construccion-caja p {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
}
</style>