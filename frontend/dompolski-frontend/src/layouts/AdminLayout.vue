<template>
  <div class="admin-layout">
    
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <h3>Dom Polski</h3>
        <span>Admin Panel</span>
      </div>
      <nav class="admin-nav">
        <router-link to="/admin/novedades">Gestionar Novedades</router-link>
        <router-link to="/admin/actividades">Gestionar Actividades</router-link>
        <router-link to="/admin/miembros">Gestionar Miembros</router-link>
        </nav>
      <div class="sidebar-footer">
        <button @click="handleLogout" class="logout-button">
          Cerrar Sesión
        </button>
      </div>
    </aside>

    <main class="admin-content">
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { supabase } from '@/supabaseClient'; // Importamos la llave

const router = useRouter();

async function handleLogout() {
  try {
    // 1. Le decimos a Supabase que cierre la sesión
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // 2. Redirigimos al usuario a la página de login
    router.push('/login');

  } catch (error) {
    console.error('Error al cerrar sesión:', error.message);
  }
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f4f7f6;
  font-family: Arial, sans-serif;
}

/* --- Menú Lateral --- */
.admin-sidebar {
  width: 250px;
  background-color: #2c3e50; /* Un color oscuro, profesional */
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
}

.sidebar-header {
  padding: 1.5rem;
  text-align: center;
  border-bottom: 1px solid #34495e;
}
.sidebar-header h3 {
  margin: 0;
  color: #fff;
}
.sidebar-header span {
  font-size: 0.9rem;
  color: #95a5a6;
}

.admin-nav {
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Ocupa el espacio disponible */
  padding-top: 1rem;
}

.admin-nav a {
  padding: 1rem 1.5rem;
  color: #ecf0f1;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s;
}

.admin-nav a:hover {
  background-color: #34495e;
}

/* El estilo de "enlace activo" */
.admin-nav a.router-link-exact-active {
  background-color: #9d1414; /* Tu color de marca */
  color: #fff;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid #34495e;
}

.logout-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #e74c3c; /* Rojo para "salir" */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.logout-button:hover {
  background-color: #c0392b;
}

/* --- Contenido Principal --- */
.admin-content {
  flex-grow: 1;
  /* Dejamos 250px de margen para el sidebar fijo */
  margin-left: 250px; 
}

.content-wrapper {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>