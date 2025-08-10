import { createRouter, createWebHistory } from 'vue-router'
import InicioVista from '../views/InicioVista.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: InicioVista,
    },
    
  ],
})

export default router
