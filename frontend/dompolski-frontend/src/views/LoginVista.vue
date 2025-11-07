<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleLogin">
      <h2>Acceso de Administrador</h2>
      
      <p>Bienvenido. Por favor, identifíquese.</p>
      
      <div class="form-input">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required placeholder="tu@email.com" />
      </div>
      
      <div class="form-input">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password" required placeholder="••••••••" />
      </div>
      
      <div v-if="errorMsg" class="error-mensaje">
        {{ errorMsg }}
      </div>

      <button type="submit" :disabled="cargando">
        {{ cargando ? 'Ingresando...' : 'Ingresar' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Para redirigir al usuario

// --- IMPORTANTE ---
// Asumo que tienes un cliente de Supabase para el frontend.
// Si tu archivo está en otra ruta, ajústala.
import { supabase } from '@/supabaseClient'; // O '@/config/supabaseClient' o como lo llames

// --- Estado del Formulario ---
const email = ref('');
const password = ref('');
const cargando = ref(false);
const errorMsg = ref(null);

// --- Lógica de Router ---
const router = useRouter(); // Instancia del router

// --- Función de Login ---
async function handleLogin() {
  cargando.value = true;
  errorMsg.value = null; // Resetea el error
  
  try {
    // 1. Llamamos a Supabase para que haga la magia
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) throw error; // Si hay error, salta al catch

    // 2. ¡ÉXITO!
    cargando.value = false;
    
    // 3. Redirigimos al admin a la página principal del panel
    // (Aún no existe, pero la crearemos en el Paso 3)
    router.push('/admin'); 

  } catch (error) {
    // 4. ¡FALLO!
    cargando.value = false;
    errorMsg.value = "Error: " + (error.message || "Email o contraseña incorrectos.");
    console.error(error);
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh; /* Ocupa casi toda la pantalla */
  background-color: #f4f4f4; /* Un fondo neutro */
  font-family: Arial, sans-serif;
}

.login-form {
  background: #fff;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-form h2 {
  text-align: center;
  color: #333;
  margin-top: 0;
  margin-bottom: 0.5rem;
}
.login-form p {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.form-input {
  margin-bottom: 1.5rem;
}

.form-input label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}

.form-input input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Importante para que el padding no rompa el ancho */
}

.error-mensaje {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  padding: 0.75rem;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 1rem;
}

button {
  width: 100%;
  padding: 0.85rem;
  background-color: #9d1414; /* Tu color de marca */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #7b1010;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>