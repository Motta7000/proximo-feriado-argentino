import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.js'
const app = createApp(App)

app.use(router)
app.use(bootstrap)
app.mount('#app')

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Default Title'; // Set the title to the route's meta title or use a default title
    next();
  });
