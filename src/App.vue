<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <header>

    <div class="nav-container">
      <nav class="navmain navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
          <a class="navbar-brand" href="#">Proximo feriado Argentino</a>
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
</template>

<style scoped>
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
.container{
  justify-content: space-around;
}
.collapse{
  justify-content: flex-end;
}
</style>
