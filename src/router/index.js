import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FeriadoView from "../views/FeriadoView.vue"


const router = createRouter({ 
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
  ],
  scrollBehavior (to, from, savedPosition){
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        if (savedPosition){
          console.log(savedPosition)
          return resolve({left:savedPosition.left,top:savedPosition.top,behavior: 'instant'})
        }
        else
        {
          return resolve({top:0,behavior:'instant'});
        }
      },1)
    })
  }
})

export default router
