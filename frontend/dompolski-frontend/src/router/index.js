import { createRouter, createWebHistory } from 'vue-router'
import InicioVista from '../views/InicioVista.vue'
import ContactoVista from '../views/ContactoVista.vue'  
import Historia from '../views/NuestraHistoriaVista.vue'
import Actividades from '../views/ActividadesVista.vue'
import Novedades from '../views/NovedadesVista.vue'

const routes =[
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
      path: '/actividades', // La URL para esta vista
      name: 'Actividades',
      component: Actividades // El componente que se cargará
    },
    {
      path: '/novedades',
      name: 'Novedades',
      component: Novedades
    },
    {
      path: '/novedades/:id', // El ':id' es un parámetro dinámico
      name: 'NovedadDetalle',
      // Buena práctica: "Lazy Loading".
      // No carga el código de esta vista hasta que se visita por primera vez.
      component: () => import('../views/NovedadDetalleVista.vue')
    }
  ];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
