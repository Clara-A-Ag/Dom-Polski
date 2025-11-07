import { createRouter, createWebHistory } from 'vue-router'

// --- 1. IMPORTAMOS EL CLIENTE DE SUPABASE ---
// Lo necesitamos para que el "Bouncer" sepa si estás logueado.
import { supabase } from '@/supabaseClient' 

// --- 2. IMPORTAMOS LAS VISTAS PÚBLICAS ---
// (Estas ya las tenías)
import InicioVista from '../views/InicioVista.vue'
import ContactoVista from '../views/ContactoVista.vue' 
import Historia from '../views/NuestraHistoriaVista.vue'
import Actividades from '../views/ActividadesVista.vue'
import Novedades from '../views/NovedadesVista.vue'

// --- 3. IMPORTAMOS LAS NUEVAS VISTAS DE ADMIN ---
import LoginVista from '../views/LoginVista.vue' // La Puerta
import AdminLayout from '../layouts/AdminLayout.vue' // El Cascarón

// --- 4. DEFINIMOS LAS "HABITACIONES" DEL ADMIN ---
// Usamos "Lazy Loading" (carga diferida) para todo el admin.
// Esto hace que tu sitio público cargue más rápido.
const AdminDashboardVista = () => import('../views/admin/AdminDashboardVista.vue')
const AdminNovedadesVista = () => import('../views/admin/AdminNovedadesVista.vue')
const AdminActividadesVista = () => import('../views/admin/AdminActividadesVista.vue')
const AdminMiembrosVista = () => import('../views/admin/AdminMiembrosVista.vue')
const AdminFormNovedad = () => import('../views/admin/AdminFormNovedad.vue');
// (Sí, estos archivos aún no existen, los crearemos. Esto es el plan.)


const routes =[
  // --- Rutas Públicas (sin cambios) ---
  {
    path: '/',
    name: 'Inicio',
    component: InicioVista,
  },
  {
    path: '/contacto',
    name: 'Contacto',
    component: ContactoVista,
  },
  {
    path: '/nuestrahistoria',
    name: 'Nuestra Historia',
    component: Historia
  },
  {
    path: '/actividades',
    name: 'Actividades',
    component: Actividades
  },
  {
    path: '/novedades',
    name: 'Novedades',
    component: Novedades
  },
  {
    path: '/novedades/:id',
    name: 'NovedadDetalle',
    component: () => import('../views/NovedadDetalleVista.vue')
  },

  // --- 5. NUEVAS RUTAS DE AUTENTICACIÓN ---
  {
    path: '/login',
    name: 'Login',
    component: LoginVista,
    meta: { requiresAuth: false } // Le decimos al bouncer que esta es PÚBLICA
  },

  // --- 6. ¡LA RUTA DEL FUERTE! (Ruta Anidada) ---
  {
    path: '/admin',
    name: 'Admin',
    component: AdminLayout, // <-- El "Cascarón"
    meta: { requiresAuth: true }, // <-- ¡El Bouncer vigila esta!
    children: [
      // Aquí van todas las páginas que se cargan DENTRO del cascarón
      {
        path: '', // La raíz de /admin (ej. un Dashboard)
        name: 'AdminDashboard',
        component: AdminDashboardVista
      },
      {
        path: 'novedades', // Se accede con /admin/novedades
        name: 'AdminNovedades',
        component: AdminNovedadesVista
      },
      {
        path: 'novedades/nuevo', // Ruta para crear
        name: 'AdminNovedadCrear',
        component: AdminFormNovedad
      },
      {
        path: 'novedades/editar/:id', // Ruta para editar (con ID)
        name: 'AdminNovedadEditar',
        component: AdminFormNovedad
      },
      {
        path: 'actividades', // Se accede con /admin/actividades
        name: 'AdminActividades',
        component: AdminActividadesVista // (La que tendrá el "En Construcción")
      },
      {
        path: 'miembros', // Se accede con /admin/miembros
        name: 'AdminMiembros',
        component: AdminMiembrosVista
      }
      // Aquí pondremos /admin/novedades/nuevo, etc.
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// --- 7. ¡EL BOUNCER! (Corregido) ---
// Esto se ejecuta ANTES de cargar cualquier página.
router.beforeEach(async (to, from, next) => {
  
  // ¡CAMBIO IMPORTANTE AQUÍ!
  // Usamos getSession() en lugar de getUser().
  // getSession() es más estricto y comprueba si el token ha expirado.
  const { data: { session } } = await supabase.auth.getSession();

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // ¡CAMBIO IMPORTANTE AQUÍ!
  // Comprobamos si existe la 'session', no el 'user'.
  if (requiresAuth && !session) {
    // 1. Si la ruta requiere auth Y NO hay sesión válida...
    // ...lo pateamos a la puerta de login.
    next('/login');
  } else if (to.path === '/login' && session) {
    // 2. Si el usuario YA tiene sesión Y va a /login...
    // ...¿para qué? Lo mandamos adentro del fuerte.
    next('/admin');
  } else {
    // 3. Caso normal (ruta pública, o ruta protegida con sesión válida)
    // ¡Adelante!
    next();
  }
});

export default router;