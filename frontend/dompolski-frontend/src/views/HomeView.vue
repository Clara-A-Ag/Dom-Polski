<template>
  <div class="home">
    <h1>Bienvenido a la Comunidad Polaca</h1>
    <p>Contenido del Inicio:</p>
    <div v-if="contenidoInicio.length === 0">
      <p>Cargando contenido o no hay elementos para mostrar...</p>
    </div>
    <ul>
      <li v-for="item in contenidoInicio" :key="item.id">
        <h2>{{ item.titulo }}</h2>
        <p>{{ item.descripcion }}</p>
        <img v-if="item.imagenUrl" :src="item.imagenUrl" :alt="item.titulo" style="max-width: 200px; margin: 10px;">
      </li>
    </ul>
  </div>
</template>

<script setup>
// ref: Una función de Vue para crear "referencias reactivas".
// Cuando el valor de contenidoInicio.value cambia, Vue automáticamente actualiza la interfaz.
import { ref, onMounted } from 'vue';
// Importamos Axios para hacer las peticiones HTTP
import axios from 'axios';

// Definimos una variable reactiva llamada contenidoInicio, inicialmente un array vacío.
const contenidoInicio = ref([]);

// onMounted: Es un "hook" del ciclo de vida de Vue.
// El código dentro de onMounted se ejecuta AUTOMÁTICAMENTE cuando el componente
// ha sido montado en el DOM (es decir, cuando ya está visible en la página).
onMounted(async () => {
  try {
    // Hacemos la petición GET a nuestro backend.
    // await: Espera a que la petición se complete antes de pasar a la siguiente línea.
    const response = await axios.get('http://localhost:3000/api/inicio');

    // response.data contiene los datos JSON que nos envió el backend.
    // Actualizamos la variable reactiva contenidoInicio. Vue detectará este cambio
    // y automáticamente volverá a renderizar la lista <ul> con los nuevos datos.
    contenidoInicio.value = response.data;
  } catch (error) {
    // Si algo sale mal (ej. el backend no está corriendo, error de red),
    // capturamos el error y lo mostramos en la consola del navegador.
    console.error('Error al cargar el contenido de inicio:', error);
  }
});
</script>

<style scoped>
/* Aquí van tus estilos. Recuerda que con 'scoped', estos estilos solo afectarán a este componente. */
/* Si usas Styled Components (la librería para Vue), la sintaxis será diferente aquí */
/* Ejemplo básico de CSS scoped: */
.home {
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #f0f0f0;
  margin: 10px auto;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  max-width: 600px;
}

h2 {
    color: #333;
}

img {
    border-radius: 4px;
}
</style>