<template>
  <div class="hero vh-100 d-flex align-items-center">
    <div class="container-hero">
      <div class="row">
        <div class="col-lg-7 mx-auto text-center">
          <h1 class="text-white">Sitio Web creado por Agustín Motta</h1>
          <Timer />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.hero {

  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  position: relative;
  z-index: 2;
  justify-content: center;
}

.hero::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(34, 100, 136, 0.671);
  z-index: -1;

}

img {
  max-height: 600px;
}

/* Container holding the image and the text */
.container {
  position: relative;
  text-align: center;
  color: white;
  width: 100vw;
  margin: 0;
  margin-right: 0;
  padding: 0;
}

/* Bottom left text */
.bottom-left {
  position: absolute;
  bottom: 8px;
  left: 16px;
}

/* Top left text */
.top-left {
  position: absolute;
  top: 8px;
  left: 16px;
}

/* Top right text */
.top-right {
  position: absolute;
  top: 8px;
  right: 16px;
}

/* Bottom right text */
.bottom-right {
  position: absolute;
  bottom: 8px;
  right: 16px;
}

/* Centered text */
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.timer {
  align-items: center;
}
</style>
