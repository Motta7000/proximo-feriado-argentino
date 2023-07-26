<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { Icon } from '@iconify/vue';

</script>

<template>
  <header>

    <div class="nav-container navbarnew">
      <nav style="justify-content: space-evenly;" class="navmain navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
          <a class="navbar-brand" href="#">Próximo Feriado Argentino (Beta)</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-left" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <RouterLink class="nav-link" to="/">Inicio</RouterLink>
              <RouterLink class="nav-link" to="/about">Acerca de</RouterLink>
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
        <h3>Más acerca de mi</h3>
        <p>Soy estudiante de ingeniería en informática y estoy aprendiendo diversas tecnologías en este caso: VueJs
        </p>
      </div>
      <div class="flex-item">
        <h3 class="">Información de contacto</h3>
        <ul>
          <li>
            <div class="li-container">
              <div class="icon-container">
                <Icon icon="iconamoon:profile" />
              </div>
              <p>Agustín Motta</p>
            </div>
          </li>
          <li>
            <div class="li-container">
              <div class="icon-container">
                <Icon icon="ic:outline-email" />
              </div>
              <p>motta.agustin6@gmail.com</p>
            </div>
          </li>
          <li>
            <a class="anchor" href="https://www.linkedin.com/in/agustin-motta/">
              <div class="li-container">
                <div class="icon-container">
                  <Icon icon="uil:linkedin" />
                </div>
                <p>in/agustin-motta</p>
              </div>
            </a>
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
.navbarnew{
  border-bottom: #645955 solid 1px;
}
.anchor{
  text-decoration: none;
  color:#fff
}

.icon-container {
  padding-right: 0.5rem;
}

ul {
  padding-left: 0;
}

.li-container {
  display: flex;
  align-content: center;
}

h3 {
  font-weight: 300;
}

p {
  margin: 0;
}

ul {
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
  padding: 10px 50px 10px 50px;
}

@media screen and (max-width:500px) {
  .footer-container {
    display: block;
    padding: 0;
  }
}

.flex-item {
  padding: 10px;
  max-width: 500px;
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
}
</style>
