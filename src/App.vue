<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <header>

    <div class="nav-container">
      <nav style="justify-content: space-evenly;" class="navmain navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
          <a class="navbar-brand" href="#">Proximo Feriado Argentino</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-left" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <RouterLink class="nav-link" to="/">Home</RouterLink>
              <RouterLink class="nav-link" to="/about">About</RouterLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
  <footer>
    <div class="footer-container">
      <div class="flex-item">
        <h3>Mas acerca de mi</h3>
        <p>Soy estudiante de ingeniería en informática el cual esta aprendiendo diversas tecnologias en este caso VueJs</p>
      </div>
      <div class="flex-item">
        <h3 class="">Informacion de contacto</h3>
        <ul>
          <li>
            <p>Agustín Motta</p>
          </li>
          <li>
            <p>motta.agustin6@gmail.com</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      <div class="copyright-container">
        <p class="copyright-text m-0">Copyright 2023</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
h3 {
  font-weight: 300;
}
p{
  margin:0;
}
ul{
  list-style: none;
}

.copyright-text {
  color: #ddd;
}

.footer-container {
  background-color: #131110;
  color: #fff;
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  padding:10px 50px 10px 50px;
}

.flex-item {
  padding: 10px;
  flex:1;
}

.copyright {
  display: flex;
  background-color: #252222;
  width: 100%;
  min-height: 30px;
  align-items: center;
  justify-content: center;
}

.copyright-container {
  height: 100%;
}

:root {
  --background-color-primary: #ebebeb;
  --background-color-secondary: #fafafa;
  --accent-color: #cacaca;
  --text-primary-color: #222;
  --element-size: 4rem;
}

/* Define styles for the root window with dark - mode preference */
:root.dark-theme {
  --background-color-primary: #1e1e1e;
  --background-color-secondary: #2d2d30;
  --accent-color: #3f3f3f;
  --text-primary-color: #ddd;
}

.container {
  justify-content: space-around;
}

.collapse {
  justify-content: flex-end;
}

.navbar-toggler {
  margin: auto;
}</style>
