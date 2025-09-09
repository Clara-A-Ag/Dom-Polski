<template>
  <div class="member-card">
    <img :src="miembro.fotoUrl" :alt="miembro.nombre" class="member-photo" />
    <h3 class="member-name">{{ miembro.nombre }}</h3>
    <p class="member-role">{{ miembro.cargo }}</p>
  </div>
</template>

<script setup>
// Definimos la propiedad "miembro" que este componente espera recibir.
// Es un objeto que debe contener las propiedades que vamos a mostrar.
const props = defineProps({
  miembro: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.member-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.member-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  border: 2px solid #ddd;
}

.member-name {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.member-role {
  font-size: 1rem;
  color: #666;
}
</style>