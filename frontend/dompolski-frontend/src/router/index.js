import { createRouter, createWebHistory } from 'vue-router'
import InicioVista from '../components/HeaderComponent.vue'

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
