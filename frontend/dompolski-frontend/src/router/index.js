import { createRouter, createWebHistory } from 'vue-router'
import InicioVista from '../views/InicioVista.vue'
import ContactoVista from '../views/ContactoVista.vue'  
import Historia from '../views/NuestraHistoriaVista.vue'
import Actividades from '../views/ActividadesVista.vue'

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
    }
  ];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
