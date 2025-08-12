import { createRouter, createWebHistory } from 'vue-router'
import InicioVista from '../views/InicioVista.vue'
import ContactoVista from '../views/ContactoVista.vue'  

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: InicioVista,
    },
    {
      path: '/contacto',
      name: 'Contacto',
      component: ContactoVista,
    }
    
  ],

})

export default router
