import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FeriadoView from "../views/FeriadoView.vue"
import SitemapComponent from '../components/SitemapComponent.vue'

const router = createRouter({   scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { top: 0 }
  }
},
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Proximo Feriado Argentino', sitemap:true }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'Acerca De | Proximo Feriado Argentino', sitemap:true }
    },
    {
      path:"/:id",
      name:"car",
      component: FeriadoView
    }
  ]
})

export default router
