<template>
  <div class="formulario-container">
    <form @submit.prevent="enviarFormulario">
      <h2>Formulario de Contacto</h2>

      <div v-if="exito" class="mensaje exito">
        ¡Mensaje enviado con éxito! Te responderemos pronto.
      </div>
      <div v-if="error" class="mensaje error">
        Hubo un error al enviar el mensaje: {{ error }}
      </div>

      <select v-model="sector" required>
        <option disabled value="">-- Seleccionar sector --</option>
        <option value="oficial">Consulta Oficial</option>
        <option value="artistico">Consultas Audiovisuales</option>
      </select>

      <div class="form-input">
        <input type="text" v-model="nombre" placeholder="Nombre Completo" required />
      </div>
      <div class="form-input">
        <input type="email" v-model="email" placeholder="Tu Email" required />
      </div>
      <div class="form-input">
        <textarea v-model="mensaje" placeholder="Mensaje" required></textarea>
      </div>

      <button type="submit" :disabled="cargando">
        {{ cargando ? 'Enviando...' : 'Enviar' }}
      </button>
    </form>
  </div>
</template>

<script setup>
// 1. CAMBIO: Importamos 'ref' (Composition API) y 'axios'
import { ref } from 'vue';
import axios from 'axios';

// 2. CAMBIO: Usamos 'ref' en lugar de 'data()'
//    v-model="tipo" -> v-model="sector"
const sector = ref("");
const nombre = ref("");
const email = ref("");
const mensaje = ref("");

// 3. CAMBIO: Añadimos estados de UX
const cargando = ref(false);
const exito = ref(false);
const error = ref(null);

// 4. CAMBIO: Convertimos 'methods' a una función de 'setup'
async function enviarFormulario() {
  // Reseteamos estados
  cargando.value = true;
  exito.value = false;
  error.value = null;

  try {
    // 5. CAMBIO: Usamos axios, la URL y puerto correctos,
    //    y enviamos 'sector' en lugar de 'tipo'.
    const response = await axios.post('http://localhost:3000/contacto', {
      sector: sector.value,
      nombre: nombre.value,
      email: email.value,
      mensaje: mensaje.value
    });

    // 6. CAMBIO: Manejo de éxito (sin alert)
    if (response.status === 201) {
      exito.value = true;
      // Reseteamos el formulario
      sector.value = "";
      nombre.value = "";
      email.value = "";
      mensaje.value = "";
    }
    
  } catch (err) {
    // 7. CAMBIO: Manejo de error (sin alert)
    console.error(err);
    error.value = err.response?.data?.error || "Error de conexión con el servidor.";
  } finally {
    // 8. Pase lo que pase, dejamos de cargar
    cargando.value = false;
  }
}
</script>

<style scoped>
/* 9. CAMBIO CRÍTICO: ¡Añadido 'scoped'! 
   Esto evita que los estilos se escapen.
*/

/* Cambié 'body' por una clase contenedora para no afectar
   al 'body' de toda la aplicación.
*/
.formulario-container {
  background-color: #ffefef;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem; /* Añadimos padding */
  font-family: Arial, sans-serif;
  width: 100%; /* Ocupa el ancho de su contenedor en la vista */
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  text-transform: uppercase;
}

form {
  background-color: #fff;
  padding: 30px;
  max-width: 500px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-input, select {
  width: 100%;
  margin-bottom: 15px;
}

input, textarea, select {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #9d1414;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

button:hover {
  background-color: #7b1010;
}

/* Estilo para el botón deshabilitado */
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Estilos para los mensajes de estado */
.mensaje {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
}
.exito {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}
.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>